export const normalize = (str) => (str || "").toLowerCase().trim();

export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "N/A";

export const safeDate = (value) => {
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

// 🔥 handle mọi kiểu backend
export const extractFiles = (lead) => {
  if (Array.isArray(lead.fileUrls)) return lead.fileUrls;
  if (Array.isArray(lead.files)) return lead.files;
  if (lead.fileUrl) return [lead.fileUrl];
  return [];
};

// 🎯 map data
export const mapLead = (lead, index) => ({
  id: lead.id ?? `${lead.email || "unknown"}-${index}`,

  name: lead.name || lead.fullName || "N/A",
  email: lead.email || "N/A",
  phone: lead.phone || lead.phoneNumber || "N/A",

  userType: normalize(lead.userType),
  plan: normalize(lead.plan),

  createdAt: lead.createdAt || lead.submissionTime || null,

  fileUrls: extractFiles(lead),
});

// 🔍 search
export const matchesSearch = (lead, query) => {
  const q = normalize(query);

  return (
    normalize(lead.name).includes(q) ||
    normalize(lead.email).includes(q) ||
    normalize(lead.phone).includes(q)
  );
};