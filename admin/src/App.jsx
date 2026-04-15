import { LeadsTable } from "./components/leads/LeadsTable.jsx";

// Sample data - replace with your actual data fetching logic
const sampleLeads = [
  {
    id: "1",
    name: "Nguyễn Văn Minh",
    email: "minh.nguyen@gmail.com",
    phone: "+84 912 345 678",
    userType: "buyer",
    plan: "premium",
    createdAt: "2024-01-15T10:30:00Z",
    fileUrl: "https://example.com/files/john-smith-doc.pdf",
  },
  {
    id: "2",
    name: "Trần Thị Ngọc Anh",
    email: "ngocanh.tran@gmail.com",
    phone: "+84 903 456 789",
    userType: "seller",
    plan: "enterprise",
    createdAt: "2024-01-15T09:15:00Z",
    fileUrl: null,
  },
  {
    id: "3",
    name: "Lê Quang Huy",
    email: "huy.le@gmail.com",
    phone: "+84 938 567 890",
    userType: "distributor",
    plan: "basic",
    createdAt: "2024-01-14T16:45:00Z",
    fileUrl: "https://example.com/files/michael-chen-doc.pdf",
  },
  {
    id: "4",
    name: "Phạm Thị Mai",
    email: "mai.pham@gmail.com",
    phone: "+84 976 678 901",
    userType: "buyer",
    plan: "premium",
    createdAt: "2024-01-14T14:20:00Z",
    fileUrl: "https://example.com/files/emily-davis-doc.pdf",
  },
  {
    id: "5",
    name: "Hoàng Minh Tuấn",
    email: "tuan.hoang@gmail.com",
    phone: "+84 989 789 012",
    userType: "seller",
    plan: "enterprise",
    createdAt: "2024-01-14T11:00:00Z",
    fileUrl: null,
  },
  {
    id: "6",
    name: "Đặng Thị Thu Hà",
    email: "ha.dang@gmail.com",
    phone: "+84 905 890 123",
    userType: "distributor",
    plan: "premium",
    createdAt: "2024-01-13T15:30:00Z",
    fileUrl: "https://example.com/files/lisa-anderson-doc.pdf",
  },
  {
    id: "7",
    name: "Võ Thanh Phong",
    email: "phong.vo@gmail.com",
    phone: "+84 977 901 234",
    userType: "buyer",
    plan: "basic",
    createdAt: "2024-01-13T10:45:00Z",
    fileUrl: null,
  },
  {
    id: "8",
    name: "Bùi Thị Lan",
    email: "lan.bui@gmail.com",
    phone: "+84 936 012 345",
    userType: "seller",
    plan: "premium",
    createdAt: "2024-01-12T09:00:00Z",
    fileUrl: "https://example.com/files/jennifer-taylor-doc.pdf",
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-gradient-to-r from-[#2C8C86] to-[#1f6f6a] text-white shadow-sm">
  <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-semibold tracking-tight">
        Leads Management
      </h1>
      <p className="text-white/80 text-base leading-relaxed">
        Track and manage leads from your landing page submissions
      </p>
    </div>
  </div>
</header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
        <LeadsTable leads={sampleLeads} />
      </main>
    </div>
  );
}