import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';
import { initDatabase, query, withTransaction } from '../data/mysql.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import defaultContent from '../data/defaultContent.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const uploadsDir = path.join(rootDir, 'uploads');
const PORT = Number(process.env.PORT || 4000);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';


const defaultContent = {
  vi: {
    heroTitle: 'Salamass - Kết nối giao thương xuyên biên giới Việt - Cambodia',
    heroDescription: 'Nền tảng B2C giúp người mua và người bán giao dịch xuyên biên giới nhanh, minh bạch và dễ mở rộng.',

    stats_1_value: 'Mở rộng sang Campuchia',
    stats_1_label: 'Tiếp cận hàng triệu khách hàng mới...',
    stats_2_value: 'Bán hàng đa kênh',
    stats_2_label: 'TMDT, Fanpage...',
    stats_3_value: 'Vận hành & giao hàng nhanh',
    stats_3_label: 'Kho tại Campuchia...',

    leadTitle: 'Sẵn sàng mở rộng kinh doanh tại Cambodia?',
    leadDesc: 'Tham gia Salamass để tiếp cận thị trường Cambodia với giải pháp tích hợp TMĐT, marketing đa kênh và logistics. Chọn vai trò phù hợp với bạn:',

    categoriesTitle: 'Danh Mục Sản Phẩm Đa Dạng',
    categoriesDesc: 'Tập Trung Hàng Tiêu Dùng',


    servicePricingBadge: 'Bảng giá dịch vụ',
    servicePricingTitle: 'Chọn gói phù hợp với nhu cầu của bạn',

    product1Title: 'Nông sản thực phẩm',
    product1Description: 'Tươi, an toàn, chất lượng',
    product1Image: 'https://images.unsplash.com/photo-1542838132-92c53300491e',
    product1Count: '3,156',

    product2Title: 'Thức ăn cho thú cưng',
    product2Description: 'Dinh dưỡng và đa dạng',
    product2Image: '',
    product2Count: '1,184',

    product3Title: 'Thời trang',
    product3Description: 'Xu hướng mới, giá tốt',
    product3Image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
    product3Count: '2,041',

    product4Title: 'Mỹ phẩm',
    product4Description: 'An toàn, uy tín',
    product4Image: '',
    product4Count: '892',

    serviceBasicName: 'BASIC',
    serviceBasicDescription: 'Phù hợp với Seller mới bắt đầu khám phá thị trường Campuchia',
    serviceBasicPrice: '$50',
    serviceBasicPeriod: 'THÁNG',

    servicePremiumName: 'PREMIUM',
    servicePremiumDescription: 'Phù hợp với Seller muốn tăng trưởng mạnh và mở rộng thị phần',
    servicePremiumPrice: '$100',
    servicePremiumPeriod: 'THÁNG',

    serviceEnterpriseName: 'ENTERPRISE',
    serviceEnterpriseDescription: 'Phù hợp với thương hiệu và nhà bán hàng lớn muốn chinh phục thị trường Campuchia',
    serviceEnterprisePrice: '$200',
    serviceEnterprisePeriod: 'THÁNG',

     demo_product_image: 'https://your-default-product-image.jpg',
  demo_dashboard_image: 'https://your-default-dashboard.jpg',
  demo_chat_image: 'https://your-default-chat.jpg',
  },

  en: {
    heroTitle: 'Salamass - Connecting Cross-border Trade Between Vietnam and Cambodia',
    heroDescription: 'A B2C platform helping buyers and sellers trade across borders quickly, transparently, and at scale.',

    stats_1_value: 'Expand to Cambodia',
    stats_1_label: 'Reach millions of new customers...',
    stats_2_value: 'Multi-channel selling',
    stats_2_label: 'E-commerce, Fanpage...',
    stats_3_value: 'Fast operation & delivery',
    stats_3_label: 'Warehouse in Cambodia...',

    leadTitle: 'Ready to grow your business in Cambodia?',
    leadDesc: 'Join Salamass to enter the Cambodia market with an integrated solution of e-commerce, multi-channel marketing, and logistics. Choose your role:',

    categoriesTitle: 'Marketplace Products',
    categoriesDesc: 'Focused on agricultural food products',


    servicePricingBadge: 'Service Pricing',
    servicePricingTitle: 'Choose the package that fits your needs',

    product1Title: 'Agricultural Food Products',
    product1Description: 'Fresh, safe, quality',
    product1Image: 'https://images.unsplash.com/photo-1542838132-92c53300491e',
    product1Count: '3,156',

    product2Title: 'Pet Food',
    product2Description: 'Nutritious and diverse',
    product2Image: '',
    product2Count: '1,184',

    product3Title: 'Fashion',
    product3Description: 'Latest trends, great prices',
    product3Image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
    product3Count: '2,041',

    product4Title: 'Cosmetics',
    product4Description: 'Safe and trusted',
    product4Image: '',
    product4Count: '892',

    serviceBasicName: 'BASIC',
    serviceBasicDescription: 'Suitable for new sellers exploring the Cambodia market',
    serviceBasicPrice: '$50',
    serviceBasicPeriod: 'MONTH',

    servicePremiumName: 'PREMIUM',
    servicePremiumDescription: 'Suitable for sellers who want strong growth and wider market share',
    servicePremiumPrice: '$100',
    servicePremiumPeriod: 'MONTH',

    serviceEnterpriseName: 'ENTERPRISE',
    serviceEnterpriseDescription: 'Suitable for brands and large sellers scaling in Cambodia',
    serviceEnterprisePrice: '$200',
    serviceEnterprisePeriod: 'MONTH',

     demo_product_image: 'https://your-default-product-image.jpg',
  demo_dashboard_image: 'https://your-default-dashboard.jpg',
  demo_chat_image: 'https://your-default-chat.jpg',
  },

  km: {
    heroTitle: 'Salamass - ភ្ជាប់ពាណិជ្ជកម្មឆ្លងដែនរវាងវៀតណាម និងកម្ពុជា',
    heroDescription: 'វេទិកា B2C ជួយអ្នកទិញ និងអ្នកលក់ធ្វើពាណិជ្ជកម្មឆ្លងដែនបានលឿន តម្លាភាព និងពង្រីកបានងាយ។',


    stats_1_value: 'ពង្រីកទៅកម្ពុជា',
    stats_1_label: 'ឈានដល់អតិថិជនរាប់លាន...',
    stats_2_value: 'លក់ច្រើនឆានែល',
    stats_2_label: 'E-commerce, Fanpage...',
    stats_3_value: 'ដឹកជញ្ជូនលឿន',
    stats_3_label: 'ឃ្លាំងនៅកម្ពុជា...',

    leadTitle: 'ត្រៀមពង្រីកអាជីវកម្មរបស់អ្នកនៅកម្ពុជាហើយឬនៅ?',
    leadDesc: 'ចូលរួម Salamass ដើម្បីចូលទីផ្សារកម្ពុជាជាមួយដំណោះស្រាយរួមបញ្ចូល eCommerce, Marketing ច្រើនឆានែល និង Logistics។',

    categoriesTitle: 'ផលិតផលលើទីផ្សារ',
    categoriesDesc: 'ផ្តោតលើកសិផល និងអាហារ',


    servicePricingBadge: 'តម្លៃសេវាកម្ម',
    servicePricingTitle: 'ជ្រើសរើសកញ្ចប់សមស្របតាមតម្រូវការ',

    product1Title: 'ផលិតផលកសិកម្ម និងអាហារ',
    product1Description: 'ស្រស់ សុវត្ថិភាព និងគុណភាព',
    product1Image: 'https://images.unsplash.com/photo-1542838132-92c53300491e',
    product1Count: '3,156',

    product2Title: 'អាហារសត្វចិញ្ចឹម',
    product2Description: 'ជីវជាតិ និងចម្រុះ',
    product2Image: '',
    product2Count: '1,184',

    product3Title: 'ម៉ូតសម្លៀកបំពាក់',
    product3Description: 'និន្នាការថ្មី តម្លៃល្អ',
    product3Image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
    product3Count: '2,041',

    product4Title: 'គ្រឿងសំអាង',
    product4Description: 'សុវត្ថិភាព និងគួរឱ្យទុកចិត្ត',
    product4Image: '',
    product4Count: '892',

    serviceBasicName: 'BASIC',
    serviceBasicDescription: 'សមស្របសម្រាប់អ្នកលក់ថ្មីដែលកំពុងសាកល្បងទីផ្សារកម្ពុជា',
    serviceBasicPrice: '$50',
    serviceBasicPeriod: 'ខែ',

    servicePremiumName: 'PREMIUM',
    servicePremiumDescription: 'សមស្របសម្រាប់អ្នកលក់ដែលចង់ពង្រីកលូតលាស់ខ្លាំង',
    servicePremiumPrice: '$100',
    servicePremiumPeriod: 'ខែ',

    serviceEnterpriseName: 'ENTERPRISE',
    serviceEnterpriseDescription: 'សមស្របសម្រាប់ម៉ាក និងអ្នកលក់ធំដែលចង់ពង្រីកទីផ្សារកម្ពុជា',
    serviceEnterprisePrice: '$200',
    serviceEnterprisePeriod: 'ខែ',

     demo_product_image: 'https://your-default-product-image.jpg',
  demo_dashboard_image: 'https://your-default-dashboard.jpg',
  demo_chat_image: 'https://your-default-chat.jpg',
  },
};

function flattenContent(contentMap) {
  return Object.entries(contentMap).flatMap(([language, entries]) =>
    Object.entries(entries).map(([contentKey, contentValue]) => ({ language, contentKey, contentValue }))
  );
}

function unflattenContent(rows) {
  return rows.reduce((acc, row) => {
    if (!acc[row.language]) acc[row.language] = {};
    acc[row.language][row.content_key] = row.content_value;
    return acc;
  }, {});
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { salt, hash };
}

function verifyPassword(password, expectedHash, salt) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return hash === expectedHash;
}

async function seedAdminAccount() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return;

  const rows = await query(
    'SELECT id FROM admin_accounts WHERE email = ?',
    [ADMIN_EMAIL]
  );

  if (rows.length > 0) return; // ❗ CHỈ CREATE 1 LẦN

  const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);

  await query(
  `INSERT INTO admin_accounts (id, email, password_hash)
   VALUES (?, ?, ?)`,
  [crypto.randomUUID(), ADMIN_EMAIL, hash]
);
}


async function seedDefaultContent() {
  const items = flattenContent(defaultContent);

  await withTransaction(async (connection) => {
    for (const item of items) {
      await connection.execute(
        `INSERT INTO content_entries (language, content_key, content_value)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE content_value = VALUES(content_value)`,
        [item.language, item.contentKey, item.contentValue]
      );
    }
  });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const safeOriginalName = file.originalname.replace(/\s+/g, '-');
    cb(null, `${Date.now()}-${safeOriginalName}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 3,
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      cb(new Error('Only PDF files are allowed'));
      return;
    }
    cb(null, true);
  },
});

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    process.env.CLIENT_URL,
    process.env.ADMIN_URL
  ],
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use('/uploads', express.static(uploadsDir));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/leads', authMiddleware, async (_req, res, next) => {
  try {
    const rows = await query(
      `SELECT
         l.id,
         l.name,
         l.email,
         l.phone,
         l.user_type AS userType,
         l.plan,
         DATE_FORMAT(l.created_at, '%Y-%m-%dT%H:%i:%sZ') AS createdAt,
         lf.file_url AS fileUrl,
         lf.original_name AS fileName,
         lf.mime_type AS mimeType,
         lf.file_size AS fileSize
       FROM leads l
       LEFT JOIN lead_files lf ON lf.lead_id = l.id
       ORDER BY l.created_at DESC`
    );

    const map = new Map();

    for (const row of rows) {
      if (!map.has(row.id)) {
        map.set(row.id, {
          id: row.id,
          name: row.name,
          email: row.email,
          phone: row.phone,
          userType: row.userType,
          plan: row.plan,
          createdAt: row.createdAt,
          files: [],
        });
      }

      if (row.fileUrl) {
        map.get(row.id).files.push({
          url: row.fileUrl,
          name: row.fileName,
          mimetype: row.mimeType,
          size: row.fileSize,
        });
      }
    }

    res.json({ success: true, data: Array.from(map.values()) });
  } catch (error) {
    next(error);
  }
});

app.post('/api/leads', upload.array('files', 3), async (req, res, next) => {
  try {
    const { name, email, phone, userType, plan } = req.body;

    if (!name || !email || !phone || !userType || !plan) {
      res.status(400).json({ success: false, message: 'Missing required fields' });
      return;
    }

    const leadId = crypto.randomUUID();
    const uploadedFiles = (req.files || []).map((file) => ({
      name: file.originalname,
      url: `/uploads/${file.filename}`,
      mimetype: file.mimetype,
      size: file.size,
    }));

    await withTransaction(async (connection) => {
      await connection.execute(
        `INSERT INTO leads (id, name, email, phone, user_type, plan)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [leadId, name, email, phone, userType, plan]
      );

      for (const file of uploadedFiles) {
        await connection.execute(
          `INSERT INTO lead_files (lead_id, original_name, file_url, mime_type, file_size)
           VALUES (?, ?, ?, ?, ?)`,
          [leadId, file.name, file.url, file.mimetype, file.size]
        );
      }
    });

    res.status(201).json({
      success: true,
      data: {
        id: leadId,
        name,
        email,
        phone,
        userType,
        plan,
        files: uploadedFiles,
      },
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const rows = await query(
      'SELECT * FROM admin_accounts WHERE email = ?',
      [email]
    );

    const admin = rows[0];

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      {
        adminId: admin.id,
        email: admin.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      token
    });

  } catch (err) {
    next(err);
  }
});

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: 'No token' });
  }

  try {
    const token = header.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

app.get('/api/content', async (_req, res, next) => {
  try {
    res.set('Cache-Control', 'no-store');

    const rows = await query(`
      SELECT language, content_key, content_value
      FROM content_entries
      ORDER BY language, content_key
    `);

    res.json({
      success: true,
      data: unflattenContent(rows)
    });

    
  } catch (error) {
    next(error);
  }
});

const imageStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `img-${Date.now()}${ext}`);
  },
});

const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files allowed'));
    }
    cb(null, true);
  },
});

app.post('/api/upload-image', authMiddleware, uploadImage.single('file'), (req, res) => {
  res.json({
    success: true,
    url: `/uploads/${req.file.filename}`,
  });
});

app.put('/api/content', async (req, res, next) => {
  try {
    

    await withTransaction(async (conn) => {
      await conn.query("DELETE FROM content_entries");

      for (const [lang, fields] of Object.entries(req.body)) {
        for (const [key, value] of Object.entries(fields)) {
          await conn.query(
            `INSERT INTO content_entries (language, content_key, content_value)
             VALUES (?, ?, ?)`,
            [lang, key, value]
          );
        }
      }
    });

    

    res.json({ success: true });
  } catch (error) {
    
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  const message = error?.message || 'Internal server error';
  res.status(500).json({ success: false, message });
});

async function start() {
  try {
    await fs.mkdir(uploadsDir, { recursive: true });
    await initDatabase();
    await seedDefaultContent();
    await seedAdminAccount();

    app.listen(PORT, () => {
      console.log(`Salamass backend listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error.message);
    process.exit(1);
  }
}

start();