import { useEffect, useState } from 'react';
import { LeadsTable } from './components/leads/LeadsTable.jsx';
import { Button } from './components/ui/button.jsx';
import { Input } from './components/ui/input.jsx';
import { EDITABLE_GROUPS } from './config/editableGroups';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const LANG_OPTIONS = ['vi', 'en', 'km'];

function ContentEditor({ content, onChange, onRestoreField, selectedLanguage, selectedVersionId }) {
  const selected = content?.[selectedLanguage] || {};

  return (
    <div className="space-y-10">
      {EDITABLE_GROUPS.map((group) => (
        <div key={group.label} className="space-y-4">

          {/* SECTION HEADER */}
          <h2 className="text-lg font-semibold text-slate-800 border-b pb-2">
            {group.label}
          </h2>

          {/* FIELDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.fields.map((field) => (
              <div key={field} className="space-y-1">

                <label className="block text-sm font-medium text-slate-600">
                  {field}
                </label>

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

export default function App() {
  const [activeTab, setActiveTab] = useState('leads');
  const [leads, setLeads] = useState([]);
  const [content, setContent] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState('vi');
  const [loading, setLoading] = useState(false);

  /* FETCH LEADS */
  const fetchLeads = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/leads`);
      const data = await res.json();
      setLeads(data?.data || []);
    } catch {
      setLeads([]);
    }
  };

  /* FETCH CONTENT */
  const fetchContent = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/content`);
      const data = await res.json();
      setContent(data?.data || {});
    } catch {
      setContent({});
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchContent();
  }, []);

  /* UPDATE FIELD */
  const updateContentField = (language, field, value) => {
    setContent((prev) => ({
      ...prev,
      [language]: {
        ...(prev[language] || []),
        [field]: value,
      },
    }));
  };

  /* SAVE CONTENT */
  const saveContent = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || 'Không thể lưu nội dung');
      } else {
        alert('Lưu content thành công');
      }
    } catch {
      alert('Không thể kết nối backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">

      {/* HEADER */}
      <header className="sticky top-0 z-10 border-b bg-gradient-to-r from-[#2C8C86] to-[#1f6f6a] text-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
          <h1 className="text-3xl font-semibold">Salamass Admin</h1>
          <p className="text-white/80">
            Quản lý submit và content landing page
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 space-y-8">

        {/* TABS */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'leads' ? 'default' : 'outline'}
            onClick={() => setActiveTab('leads')}
          >
            Leads
          </Button>

          <Button
            variant={activeTab === 'content' ? 'default' : 'outline'}
            onClick={() => setActiveTab('content')}
          >
            Content
          </Button>

          <Button variant="outline" onClick={fetchLeads}>
            Reload
          </Button>
        </div>

        {/* LEADS */}
        {activeTab === 'leads' && <LeadsTable leads={leads} />}

        {/* CONTENT */}
        {activeTab === 'content' && (
          <section className="border rounded-xl p-6 space-y-6">

            {/* LANGUAGE SWITCH */}
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

            {/* EDITOR */}
            <ContentEditor
              content={content}
              onChange={updateContentField}
              selectedLanguage={selectedLanguage}
            />

            {/* SAVE */}
            <Button onClick={saveContent} disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu content'}
            </Button>

          </section>
        )}
      </main>
    </div>
  );
}