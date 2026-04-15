import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const initial = {
  name: '',
  email: '',
  phone: '',
  userType: '',
  plan: '',
  files: [],
};

const labelsByLanguage = {
  vi: {
    fullName: 'Họ và tên',
    fullNamePlaceholder: 'Nguyễn Văn A',
    email: 'Email',
    phone: 'Số điện thoại',
    phonePlaceholder: '+84 123 456 789',

    userType: 'Loại người dùng',
    userTypePlaceholder: 'Chọn loại người dùng',
    buyer: 'Người mua',
    seller: 'Người bán',
    distributor: 'Nhà phân phối',

    plan: 'Gói đăng ký',
    planPlaceholder: 'Chọn gói',
    basic: 'BASIC - 50$',
    premium: 'PREMIUM - 100$',
    enterprise: 'ENTERPRISE - 200$',

    file: 'Tải file PDF (tối đa 3 file)',
    submit: 'Đăng ký ngay',
    loading: 'Đang gửi...',
    success: 'Đăng ký thành công!',
    error: 'Có lỗi xảy ra!',
    fileLimit: 'Chỉ được chọn tối đa 3 file',
    invalidFile: 'Chỉ chấp nhận file PDF',
    remove: 'Xóa',
  },

  en: {
    fullName: 'Full name',
    fullNamePlaceholder: 'John Doe',
    email: 'Email',
    phone: 'Phone number',
    phonePlaceholder: '+84 123 456 789',

    userType: 'User type',
    userTypePlaceholder: 'Select user type',
    buyer: 'Buyer',
    seller: 'Seller',
    distributor: 'Distributor',

    plan: 'Subscription Plan',
    planPlaceholder: 'Select plan',
    basic: 'BASIC - 50$',
    premium: 'PREMIUM - 100$',
    enterprise: 'ENTERPRISE - 200$',

    file: 'Upload PDF (max 3 files)',
    submit: 'Register now',
    loading: 'Submitting...',
    success: 'Success!',
    error: 'Error occurred!',
    fileLimit: 'Max 3 files allowed',
    invalidFile: 'Only PDF allowed',
    remove: 'Remove',
  },

  km: {
    fullName: 'ឈ្មោះពេញ',
    fullNamePlaceholder: 'សុខ ដារ៉ា',
    email: 'អ៊ីមែល',
    phone: 'លេខទូរស័ព្ទ',
    phonePlaceholder: '+855 12 345 678',

    userType: 'ប្រភេទអ្នកប្រើ',
    userTypePlaceholder: 'ជ្រើសរើស',
    buyer: 'អ្នកទិញ',
    seller: 'អ្នកលក់',
    distributor: 'អ្នកចែកចាយ',

    plan: 'កញ្ចប់',
    planPlaceholder: 'ជ្រើសរើសកញ្ចប់',
    basic: 'BASIC - 50$',
    premium: 'PREMIUM - 100$',
    enterprise: 'ENTERPRISE - 200$',

    file: 'បញ្ចូល PDF (អតិបរមា 3)',
    submit: 'ចុះឈ្មោះ',
    loading: 'កំពុងផ្ញើ...',
    success: 'ជោគជ័យ!',
    error: 'មានកំហុស!',
    fileLimit: 'អាចបញ្ចូលបានតែ 3 file',
    invalidFile: 'ត្រូវជា PDF ប៉ុណ្ណោះ',
    remove: 'លុប',
  },
};

export default function LeadCaptureForm({ language = 'vi' }) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const labels = labelsByLanguage[language] || labelsByLanguage.vi;

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  //  MULTI FILE HANDLER 
  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // limit 3
    if (form.files.length + selectedFiles.length > 3) {
      alert(labels.fileLimit);
      return;
    }

    // validate PDF
    const validFiles = selectedFiles.filter(
      (file) => file.type === 'application/pdf'
    );

    if (validFiles.length !== selectedFiles.length) {
      alert(labels.invalidFile);
      return;
    }

    setForm((prev) => ({
      ...prev,
      files: [...prev.files, ...validFiles],
    }));

    e.target.value = null;
  };

  const removeFile = (index) => {
    setForm((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('userType', form.userType);
      formData.append('plan', form.plan);

      //  MULTIPLE FILES
      form.files.forEach((file) => {
        formData.append('files[]', file);
      });

      const res = await fetch('/api.php', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setForm(initial);
        setDone(true);
        setTimeout(() => setDone(false), 2500);
      } else {
        alert(data.message || labels.error);
      }
    } catch (err) {
      alert(labels.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6">

      {/* Name */}
      <div>
        <Label>{labels.fullName}</Label>
        <Input
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder={labels.fullNamePlaceholder}
          required
        />
      </div>

      {/* Email */}
      <div>
        <Label>{labels.email}</Label>
        <Input
          type="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />
      </div>

      {/* Phone */}
      <div>
        <Label>{labels.phone}</Label>
        <Input
          value={form.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder={labels.phonePlaceholder}
          required
        />
      </div>

      {/* User Type */}
      <div>
        <Label>{labels.userType}</Label>
        <Select onValueChange={(v) => handleChange('userType', v)}>
          <SelectTrigger>
            <SelectValue placeholder={labels.userTypePlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="buyer">{labels.buyer}</SelectItem>
            <SelectItem value="seller">{labels.seller}</SelectItem>
            <SelectItem value="distributor">{labels.distributor}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Plan */}
      <div>
        <Label>{labels.plan}</Label>
        <Select onValueChange={(v) => handleChange('plan', v)}>
          <SelectTrigger>
            <SelectValue placeholder={labels.planPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basic">{labels.basic}</SelectItem>
            <SelectItem value="premium">{labels.premium}</SelectItem>
            <SelectItem value="enterprise">{labels.enterprise}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* file upload */}
      <div>
        <Label>{labels.file}</Label>
        <Input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFilesChange}
        />

        {/* preview */}
        <div className="mt-2 space-y-1">
          {form.files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm bg-muted px-3 py-2 rounded"
            >
              <span>📄 {file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-500 text-xs"
              >
                {labels.remove}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button disabled={loading || done} className="w-full">
        {loading ? labels.loading : done ? labels.success : labels.submit}
      </Button>
    </form>
  );
}