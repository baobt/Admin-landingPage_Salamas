import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';
import { initDatabase, query, withTransaction } from '../data/mysql.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const uploadsDir = path.join(rootDir, 'uploads');
const PORT = Number(process.env.PORT || 4000);

const defaultContent = {
  vi: {
    heroTitle: 'Salamass - Kết nối giao thương xuyên biên giới Việt - Cambodia',
    heroDescription: 'Nền tảng B2C giúp người mua và người bán giao dịch xuyên biên giới nhanh, minh bạch và dễ mở rộng.',
    leadTitle: 'Sẵn sàng mở rộng kinh doanh tại Cambodia?',
    leadDesc: 'Tham gia Salamass để tiếp cận thị trường Cambodia với giải pháp tích hợp TMĐT, marketing đa kênh và logistics. Chọn vai trò phù hợp với bạn:',
    categoriesTitle: 'Danh Mục Sản Phẩm Đa Dạng',
    faqTitle: '❓ Câu hỏi thường gặp dành cho nhà bán hàng',
  },
  en: {
    heroTitle: 'Salamass - Connecting Cross-border Trade Between Vietnam and Cambodia',
    heroDescription: 'A B2C platform helping buyers and sellers trade across borders quickly, transparently, and at scale.',
    leadTitle: 'Ready to grow your business in Cambodia?',
    leadDesc: 'Join Salamass to enter the Cambodia market with an integrated solution of e-commerce, multi-channel marketing, and logistics. Choose your role:',
    categoriesTitle: 'Marketplace Products',
    faqTitle: '❓ Frequently asked questions for sellers',
  },
  km: {
    heroTitle: 'Salamass - ភ្ជាប់ពាណិជ្ជកម្មឆ្លងដែនរវាងវៀតណាម និងកម្ពុជា',
    heroDescription: 'វេទិកា B2C ជួយអ្នកទិញ និងអ្នកលក់ធ្វើពាណិជ្ជកម្មឆ្លងដែនបានលឿន តម្លាភាព និងពង្រីកបានងាយ។',
    leadTitle: 'ត្រៀមពង្រីកអាជីវកម្មរបស់អ្នកនៅកម្ពុជាហើយឬនៅ?',
    leadDesc: 'ចូលរួម Salamass ដើម្បីចូលទីផ្សារកម្ពុជាជាមួយដំណោះស្រាយរួមបញ្ចូល eCommerce, Marketing ច្រើនឆានែល និង Logistics។',
    categoriesTitle: 'ផលិតផលលើទីផ្សារ',
    faqTitle: '❓ សំណួរញឹកញាប់សម្រាប់អ្នកលក់',
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

async function seedDefaultContentIfEmpty() {
  const countRows = await query('SELECT COUNT(*) AS total FROM content_entries');
  const total = Number(countRows?.[0]?.total || 0);
  if (total > 0) return;

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

app.get('/api/leads', async (_req, res, next) => {
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

app.get('/api/content', async (_req, res, next) => {
  try {
    const rows = await query(
      `SELECT language, content_key, content_value
       FROM content_entries
       ORDER BY language, content_key`
    );

    res.json({ success: true, data: unflattenContent(rows) });
  } catch (error) {
    next(error);
  }
});

app.put('/api/content', async (req, res, next) => {
  try {
    const payload = req.body;

    if (!payload || typeof payload !== 'object') {
      res.status(400).json({ success: false, message: 'Invalid content payload' });
      return;
    }

    const items = flattenContent(payload);

    await withTransaction(async (connection) => {
      await connection.execute('DELETE FROM content_entries');

      for (const item of items) {
        await connection.execute(
          `INSERT INTO content_entries (language, content_key, content_value)
           VALUES (?, ?, ?)
           ON DUPLICATE KEY UPDATE content_value = VALUES(content_value)`,
          [item.language, item.contentKey, item.contentValue]
        );
      }
    });

    res.json({ success: true, data: payload });
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
    await seedDefaultContentIfEmpty();

    app.listen(PORT, () => {
      console.log(`Salamass backend listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error.message);
    process.exit(1);
  }
}

start();