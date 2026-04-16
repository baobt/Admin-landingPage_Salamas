import { useState, useEffect } from 'react';
import Login from './components/Login.jsx';
import { LeadsTable } from './components/leads/LeadsTable.jsx';
import { Button } from './components/ui/button.jsx';
import { Input } from './components/ui/input.jsx';
import { EDITABLE_GROUPS } from './config/editableGroups';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const LANG_OPTIONS = ['vi', 'en', 'km'];

/* ================= CONTENT EDITOR ================= */
function ContentEditor({ content, onChange, selectedLanguage }) {
  const selected = content?.[selectedLanguage] || {};

  return (
    <div className="space-y-10">
      {EDITABLE_GROUPS.map((group) => (
        <div key={group.label} className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            {group.label}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.fields.map((field) => (
              <div key={field} className="space-y-1">
                <label className="text-sm font-medium">{field}</label>

                <Input
                  value={selected[field] || ''}
                  onChange={(e) =>
                    onChange(selectedLanguage, field, e.target.value)
                  }
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================= DASHBOARD ================= */
function Dashboard() {
  const [activeTab, setActiveTab] = useState('leads');
  const [leads, setLeads] = useState([]);
  const [content, setContent] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState('vi');
  const [loading, setLoading] = useState(false);

  /* FETCH LEADS */
  const fetchLeads = async () => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_BASE_URL}/api/leads`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  setLeads(data?.data || []);
};

  /* FETCH CONTENT */
  const fetchContent = async () => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_BASE_URL}/api/content`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  setContent(data?.data || {});
};
  useEffect(() => {
    fetchLeads();
    fetchContent();
  }, []);

  /* UPDATE CONTENT */
  const updateContentField = (language, field, value) => {
    setContent((prev) => ({
      ...prev,
      [language]: {
        ...(prev[language] || {}),
        [field]: value,
      },
    }));
  };

  /* SAVE CONTENT */
 const saveContent = async () => {
  setLoading(true);

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/content`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(content),
    });

    const data = await res.json();
    console.log("SAVE RESPONSE:", data);

    // 🔥 QUAN TRỌNG: reload lại data
    await fetchContent();

    alert("Save successful!");
  } catch (err) {
    console.error(err);
    alert("Save failed!");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <header className="bg-teal-700 text-white p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>

      <main className="p-6 space-y-6">
        {/* TABS */}
        <div className="flex gap-2">
          <Button
            onClick={() => setActiveTab('leads')}
            variant={activeTab === 'leads' ? 'default' : 'outline'}
          >
            Leads
          </Button>

          <Button
            onClick={() => setActiveTab('content')}
            variant={activeTab === 'content' ? 'default' : 'outline'}
          >
            Content
          </Button>
        </div>

        {/* LEADS */}
        {activeTab === 'leads' && <LeadsTable leads={leads} />}

        {/* CONTENT */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* LANGUAGE */}
            <div className="flex gap-2">
              {LANG_OPTIONS.map((lang) => (
                <Button
                  key={lang}
                  variant={selectedLanguage === lang ? 'default' : 'outline'}
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </Button>
              ))}
            </div>

            <ContentEditor
              content={content}
              onChange={updateContentField}
              selectedLanguage={selectedLanguage}
            />

            <Button onClick={saveContent} disabled={loading}>
              {loading ? 'Saving...' : 'Save Content'}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

/* ================= APP (LOGIN FLOW) ================= */
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
     !!localStorage.getItem('token')
  );

  const handleLoginSuccess = (token) => {
  localStorage.setItem('token', token);
  setIsLoggedIn(true);
};

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <>
      <button
        onClick={handleLogout}
        className="fixed top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>

      <Dashboard />
    </>
  );
}