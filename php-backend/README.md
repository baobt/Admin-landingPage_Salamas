# Salamass PHP Backend

Converted 1-to-1 from the original Node.js / Express backend.

## Cấu trúc thư mục

```
php-backend/
├── .env                  # Cấu hình (copy từ .env gốc)
├── .htaccess             # Apache rewrite rules
├── index.php             # Front controller + seed
├── api/
│   ├── health.php        # GET  /api/health
│   ├── leads.php         # GET  /api/leads  (protected)  &  POST /api/leads
│   ├── login.php         # POST /api/login
│   ├── content.php       # GET  /api/content  &  PUT /api/content
│   └── upload-image.php  # POST /api/upload-image (protected)
├── config/
│   ├── env.php           # .env loader + env()
│   ├── database.php      # PDO pool, query(), withTransaction(), initDatabase()
│   ├── auth.php          # JWT sign/verify, requireAuth()
│   └── helpers.php       # CORS, jsonResponse(), requestBody(), uuid4(), flattenContent()
├── data/
│   └── defaultContent.php  # Nội dung mặc định (vi / en / km)
└── uploads/              # File upload destination (auto-created)
```

## Yêu cầu

- PHP ≥ 8.1
- MySQL 5.7+ hoặc MariaDB 10.4+
- Extension: `pdo_mysql`, `fileinfo`, `openssl`

## Cài đặt

### 1. Cấu hình `.env`

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=1234
DB_NAME=salamass

ADMIN_EMAIL=admin@salamass.com
ADMIN_PASSWORD=123456
JWT_SECRET=super_secret_key

CLIENT_URL=https://salamass.com
ADMIN_URL=https://admin.salamass.com
```

### 2. Tạo database MySQL

```sql
CREATE DATABASE IF NOT EXISTS salamass
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

> Tables sẽ được tự động tạo lần đầu gọi bất kỳ API nào.

### 3. Chạy bằng PHP built-in server (dev)

```bash
php -S 0.0.0.0:4000 index.php
```

### 4. Hoặc deploy lên Apache / Nginx

- **Apache**: copy thư mục vào `htdocs/` hoặc VirtualHost. `.htaccess` đã sẵn sàng.
- **Nginx**: thêm `try_files $uri $uri/ /index.php?$query_string;` trong `location /`.

## API Endpoints

| Method | URL               | Auth | Mô tả                        |
|--------|-------------------|------|------------------------------|
| GET    | /api/health       | –    | Health check                 |
| POST   | /api/login        | –    | Đăng nhập admin, trả JWT     |
| GET    | /api/leads        | ✅   | Danh sách leads + files      |
| POST   | /api/leads        | –    | Tạo lead mới (upload PDF)    |
| GET    | /api/content      | –    | Lấy nội dung đa ngôn ngữ     |
| PUT    | /api/content      | –    | Cập nhật toàn bộ nội dung    |
| POST   | /api/upload-image | ✅   | Upload ảnh, trả URL          |

## Ghi chú kỹ thuật

- **JWT**: HS256 thuần PHP — không cần composer, tương thích token từ `jsonwebtoken` Node.js.
- **Bcrypt**: PHP `password_verify()` tương thích hash `$2b$` do Node.js `bcrypt` tạo ra.
- **CORS**: Cho phép các origin trong `CLIENT_URL`, `ADMIN_URL`, `localhost:5173/5174`.
- **Upload**: Giới hạn 3 file PDF, tối đa 5 MB/file (giống bản gốc).
