# api-test-server

NestJS API server สำหรับทดสอบ (แยกจาก react-vite-template)

## เริ่มต้น

```bash
pnpm install
pnpm run dev
```

Server รันที่ **http://localhost:3001**

## Endpoints

| Method | Path | คำอธิบาย |
|--------|------|----------|
| GET | `/auth/health` | ตรวจสอบสถานะ API |
| POST | `/auth/login` | Login |
| GET | `/profile/me` | ดู profile ของตัวเอง (ต้องส่ง Bearer token) |
| GET | `/profile/:id` | ดู profile ตาม id |

## Mock profiles

| Profile | Email | Password | Role |
|---------|-------|----------|------|
| Admin | `admin@test.com` | `123456` | admin |
| Test User | `user@test.com` | `password` | user |

ข้อมูล mock อยู่ที่ `src/data/mock-profiles.ts`

## ทดสอบด้วย curl

```bash
curl http://localhost:3001/auth/health

curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"123456"}'

# ใช้ accessToken จาก login
curl http://localhost:3001/profile/me \
  -H "Authorization: Bearer <accessToken>"

curl http://localhost:3001/profile/1
```

## เชื่อมกับ Frontend

รัน API server ก่อน แล้วรัน `react-vite-template` — Vite proxy จะ forward `/api/*` ไปที่ `http://localhost:3001`
