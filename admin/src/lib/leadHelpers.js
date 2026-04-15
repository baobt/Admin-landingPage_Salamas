export const normalize = (str) =>
  (str || "").toString().toLowerCase().trim();

export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "N/A";

export const safeDate = (value) => {
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

//  extract files từ mọi backend format
export const extractFiles = (lead) => {
  if (!lead) return [];

  // case 1: fileUrls
  if (Array.isArray(lead.fileUrls)) return lead.fileUrls;

  // case 2: files raw array
  if (Array.isArray(lead.files)) {
    return lead.files
      .map((item) => (typeof item === "string" ? item : item?.url))
      .filter(Boolean);
  }

  // case 3: single fileUrl
  if (lead.fileUrl) return [lead.fileUrl];

  return [];
};

//  normalize lead data
export const mapLead = (lead, index) => ({
  id: lead?.id ?? `${lead?.email || "unknown"}-${index}`,

  name: lead?.name || lead?.fullName || "N/A",
  email: lead?.email || "N/A",
  phone: lead?.phone || lead?.phoneNumber || "N/A",

  userType: normalize(lead?.userType),
  plan: normalize(lead?.plan),

  createdAt: lead?.createdAt || lead?.submissionTime || null,

  fileUrls: extractFiles(lead),
});

//  search filter
export const matchesSearch = (lead, query) => {
  const q = normalize(query);
  if (!q) return true;

  const fields = [
    lead?.name,
    lead?.email,
    lead?.phone,
    lead?.userType,
    lead?.plan,
  ];

  return fields.some((f) => normalize(f).includes(q));
};