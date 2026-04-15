export const navItemsByLanguage = {
  vi: [
    { name: 'Trang chủ', href: '/' },
    { name: 'Tính năng', href: '/#features' },
    { name: 'Quy trình seller', href: '/#how-it-works' },
    { name: 'Danh mục', href: '/#categories' },
    { name: 'Liên hệ', href: '/#lead-capture' },
  ],
  en: [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'Seller process', href: '/#how-it-works' },
    { name: 'Categories', href: '/#categories' },
    { name: 'Contact', href: '/#lead-capture' },
  ],
  km: [
    { name: 'ទំព័រដើម', href: '/' },
    { name: 'មុខងារ', href: '/#features' },
    { name: 'ដំណើរការ Seller', href: '/#how-it-works' },
    { name: 'ប្រភេទ', href: '/#categories' },
    { name: 'ទំនាក់ទំនង', href: '/#lead-capture' },
  ],
};

export const authLabelsByLanguage = {
  vi: { login: 'Đăng nhập', register: 'Đăng ký' },
  en: { login: 'Login', register: 'Sign up' },
  km: { login: 'ចូលគណនី', register: 'ចុះឈ្មោះ' },
};

export const authLinks = {
  login: 'https://salamass.com/en/login',
  register: 'https://salamass.com/en/register',
};

export const languageOptions = [
  { value: 'vi', label: 'VI', flagClass: 'fi fi-vn rounded-sm' },
  { value: 'en', label: 'EN', flagClass: 'fi fi-us rounded-sm' },
  { value: 'km', label: 'KH', flagClass: 'fi fi-kh rounded-sm' },
];

export const headerTrackedSectionIds = ['features', 'how-it-works', 'categories', 'lead-capture'];