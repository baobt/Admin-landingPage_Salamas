# Hướng Dẫn Deploy Project Salamass Landing Page

## Tổng Quan Project
Project Salamass là nền tảng landing page B2C kết nối giao thương Việt Nam - Campuchia, gồm 3 phần chính:

### 1. **Salamass/** (Frontend Landing Page)
- **Tech**: React 19 + Vite + Tailwind CSS + Radix UI + React Router
- **Chức năng**: Trang chủ đa ngôn ngữ (VN/EN/KM), form thu leads, demo sản phẩm, pricing.
- **API calls**: `/api/leads` (submit lead + files), `/api/content` (dynamic content).


### 2. **admin/** (Admin Dashboard)
- **Tech**: React 19 + Vite + Tailwind CSS + Tailwind Vite plugin
- **Chức năng**: Xem danh sách leads (với files PDF), edit nội dung đa ngôn ngữ.
- **API**: Proxy đến backend `/api/leads`, `/api/content`.

### 3. **backend/** (API Server)
- **Tech**: Node.js + Express + MySQL + Multer (upload PDF)
- **Port**: 4000 (env: PORT)
- **Database**: MySQL `salamass` (auto-create tables: leads, lead_files, content_entries)
- **Endpoints**:
  | Method | Endpoint     | Mô tả                          |
  |--------|--------------|--------------------------------|
  | GET    | /api/leads   | Lấy tất cả leads + files      |
  | POST   | /api/leads   | Tạo lead + upload PDF (max 3) |
  | GET    | /api/content | Lấy nội dung đa ngôn ngữ      |
  | PUT    | /api/content | Update nội dung               |
  | GET    | /api/health  | Check server                  |
- **Uploads**: `/uploads/` (static serve PDFs)

## Yêu Cầu Hệ Thống
- **Node.js**: >=20
- **MySQL**: 8.0+ (hoặc MariaDB)

- **NPM/Yarn/PNPM**
- **Git** (để clone project)

## Deploy Bước Từng Bước

### 1. **Chuẩn Bị Environment**
```
# Clone project
git clone <repo-url> salamass-project
cd salamass-project

# Copy .env.example nếu có, hoặc tạo .env ở backend/
# Backend .env (quan trọng nhất):
DB_HOST=your-mysql-host
DB_PORT=3306
DB_USER=your-db-user
DB_PASSWORD=your-db-pass
DB_NAME=salamass
PORT=4000  # Backend port
CLIENT_URL=https://your-landing-domain.com
ADMIN_URL=https://your-admin-domain.com

# Salamass/web/.env (nếu cần)
VITE_API_URL=https://your-backend-domain.com
```

### 2. **Deploy Backend (Node.js + MySQL)**
**Khuyến nghị: Render.com, Railway, Heroku (free tier), hoặc VPS (DigitalOcean/AWS)**

**Render.com (dễ nhất):**
```
1. Fork repo hoặc upload zip lên Render.
2. New Web Service > Build: `npm install` > Start: `npm start`
3. New PostgreSQL? Wait, MySQL: Use external MySQL (PlanetScale free).
4. Add env vars (DB_*).
5. Backend URL: https://your-backend.onrender.com
```

**VPS (Ubuntu):**
```bash
# Install Node + PM2 + MySQL
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs mysql-server nginx -y

# MySQL setup
sudo mysql < backend/data/schema.sql
# Update user/pass in .env

# Backend
cd backend
npm install
pm2 start npm --name salamass-backend -- start
pm2 save; pm2 startup

# Nginx reverse proxy (optional)
sudo nano /etc/nginx/sites-available/salamass
```
```
server {
  listen 80;
  server_name your-domain.com;
  location / {
    proxy_pass http://localhost:4000;
  }
}
```
`sudo ln -s /etc/nginx/sites-available/salamass /etc/nginx/sites-enabled/ && sudo nginx -t && sudo systemctl reload nginx`

**Docker (optional):**
```dockerfile
# backend/Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci --only=production
EXPOSE 4000
CMD ["npm", "start"]
```
`docker run -p 4000:4000 --env-file .env your-image`

### 3. **Deploy Frontend Landing Page (Salamass/)**
**Netlify/Vercel (free, static):**
```
cd Salamass
npm install
npm run build  # -> dist/

# Netlify: Drag dist/ folder
# Vercel: vercel --prod
# Build command: npm run build
# Output dir: dist
```
- Update `VITE_API_URL=https://your-backend.com` nếu cần (vite proxy chỉ dev).
- Custom domain + SSL auto.

**Shared Hosting (Hostinger - chỉ frontend static):**
- Upload `dist/` to public_html.
- Lưu ý: Backend Node.js cần VPS; PHP là fallback cũ, không dùng chính.

### 4. **Deploy Admin Dashboard**
```
cd admin
npm install
npm run build  # -> dist/
```
- Deploy tương tự frontend (Netlify/Vercel).
- Update proxy nếu cần (dev chỉ).

### 5. **Setup Database**
```sql
# Chạy trên MySQL client
mysql -u root -p < backend/data/schema.sql
USE salamass;
# Backend auto-seed content vi/en/km khi start đầu.
```

### 6. **Assets & Files**
- Copy `Salamass/images/` (toàn bộ ảnh/video).
- Backend: Tạo thư mục `backend/uploads/` writable.

### 7. **Test Deployment**
```
curl https://your-backend.com/api/health  # {"ok":true}

# Frontend form submit -> check backend leads
# Admin login? No auth yet, direct access.
```

## Các Lỗi Thường Gặp
| Lỗi | Giải pháp |
|-----|-----------|
| CORS | Update `CLIENT_URL`, `ADMIN_URL` in backend .env + restart. |
| DB Connection | Check DB_HOST/USER/PASS, firewall port 3306. |
| Upload fail | `uploads/` writable (chmod 755), PDF only <5MB. |

| Build fail | Node 20+, `npm ci`. |
| Content empty | Backend seed auto, or manual INSERT from server.js. |

## Monitoring & Scale
- **PM2**: `pm2 monit`, logs.
- **DB Backup**: mysqldump salamass > backup.sql
- **CDN**: Cloudflare for images.
- **Analytics**: Google Analytics in React Helmet.

## Cấu Trúc Domain Gợi Ý
```
salamass.com          -> Frontend (Netlify)
admin.salamass.com    -> Admin (Netlify)
api.salamass.com      -> Backend (Render/VPS)
```

Project sẵn sàng production! 🚀

