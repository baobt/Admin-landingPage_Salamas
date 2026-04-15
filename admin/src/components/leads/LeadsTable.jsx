import { useState, useMemo, useEffect } from "react";
import { Users } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "../ui/empty";

import Filters from "./Filters";
import FileList from "./FileList";
import BadgeCell from "./BadgeCell";

import {
  mapLead,
  matchesSearch,
  safeDate,
} from "../../lib/leadHelpers";

// 🎨 colors
const userTypeColors = {
  buyer: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
  seller: "bg-sky-50 text-sky-700 border-sky-200/80",
  distributor: "bg-amber-50 text-amber-700 border-amber-200/80",
};

const planColors = {
  basic: "bg-slate-50 text-slate-600 border-slate-200/80",
  premium: "bg-violet-50 text-violet-700 border-violet-200/80",
  enterprise: "bg-rose-50 text-rose-700 border-rose-200/80",
};

export function LeadsTable({ leads = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    setPage(1);
  }, [searchQuery, userTypeFilter, planFilter]);

  const normalizedLeads = useMemo(
    () => leads.map(mapLead),
    [leads]
  );

  const filteredLeads = useMemo(() => {
    return normalizedLeads
      .filter(
        (lead) =>
          matchesSearch(lead, searchQuery) &&
          (userTypeFilter === "all" || lead.userType === userTypeFilter) &&
          (planFilter === "all" || lead.plan === planFilter)
      )
      .sort(
        (a, b) =>
          (safeDate(b.createdAt) || 0) -
          (safeDate(a.createdAt) || 0)
      );
  }, [normalizedLeads, searchQuery, userTypeFilter, planFilter]);

  const paginatedLeads = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredLeads.slice(start, start + pageSize);
  }, [filteredLeads, page]);

  const totalPages = Math.ceil(filteredLeads.length / pageSize);

  return (
    <div className="space-y-8">

      {/* Filters */}
      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        userTypeFilter={userTypeFilter}
        setUserTypeFilter={setUserTypeFilter}
        planFilter={planFilter}
        setPlanFilter={setPlanFilter}
      />

      {/* Count */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Users className="size-4" />
        {filteredLeads.length} leads
      </div>

      {/* Table container */}
      <div className="rounded-xl border overflow-hidden">

        {filteredLeads.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia><Users /></EmptyMedia>
              <EmptyTitle>No leads</EmptyTitle>
              <EmptyDescription>Nothing here yet</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <>
            {/* ✅ FIX RESPONSIVE SCROLL */}
            <div className="overflow-x-auto">
              <Table className="min-w-[900px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>User Type</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Files</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>{lead.name}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.phone}</TableCell>

                      <TableCell>
                        <BadgeCell
                          value={lead.userType}
                          colors={userTypeColors}
                        />
                      </TableCell>

                      <TableCell>
                        <BadgeCell
                          value={lead.plan}
                          colors={planColors}
                        />
                      </TableCell>

                      <TableCell>
                        {lead.createdAt || "N/A"}
                      </TableCell>

                      <TableCell>
                        <FileList files={lead.fileUrls} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center p-4">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-sm">
                Page {page} / {totalPages || 1}
              </span>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages || totalPages === 0}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}