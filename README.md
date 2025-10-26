# X402 Payment Integration Demo

Dự án demo tích hợp thanh toán X402 với Express và TypeScript.

## 📋 Yêu cầu

- Node.js >= 18
- npm hoặc yarn

## 🚀 Cài đặt

1. Cài đặt các dependencies:
```bash
npm install
```

2. Cấu hình file `.env`:
```env
PAY_TO=0xYourWalletAddressHere
NETWORK=base
```

## 🎯 Chạy dự án

### Development mode (với hot reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

Server sẽ chạy tại: **http://localhost:4022** (hoặc port được set trong biến PORT)

## 📚 API Endpoints

### GET /mint
- **Price**: $1.00 USDC
- **Network**: Base (có thể cấu hình trong `.env`)
- **Description**: Truy cập endpoint sau khi thanh toán 1 USDC

**Response:**
```json
{
  "success": true,
  "message": "💰 Payment verified. Access granted."
}
```

## 🔧 Cấu hình

Trong file `.env`:
- `PAY_TO`: Địa chỉ ví nhận thanh toán (dạng `0x...`)
- `NETWORK`: Blockchain network (`base`, `ethereum`, `polygon`, v.v.)

## 📦 Dependencies

- **express**: Web framework
- **dotenv**: Environment variables
- **x402-express**: X402 payment middleware
- **@coinbase/x402**: X402 facilitator

## 🛠️ DevDependencies

- **tsx**: TypeScript executor
- **typescript**: TypeScript compiler
- **@types/node**: Node.js type definitions
- **@types/express**: Express type definitions

## 🚢 Deploy lên Railway

Xem file [railway-setup.md](railway-setup.md) để biết hướng dẫn chi tiết deploy lên Railway.

### Tóm tắt nhanh:
1. Push code lên GitHub
2. Tạo project mới trên Railway
3. Deploy từ GitHub repo
4. Thêm Environment Variables:
   - `PAY_TO`
   - `NETWORK`
   - `CDP_API_KEY_ID`
   - `CDP_API_KEY_SECRET`
   - `ASSET_ADDRESS`
5. Railway sẽ tự động deploy và cung cấp domain

## 📝 Lưu ý

- Đảm bảo đã cấu hình địa chỉ ví hợp lệ trong file `.env` hoặc Railway Variables
- X402 thanh toán sẽ được xử lý tự động bởi facilitator
- Server tự động listen trên `0.0.0.0` để support Railway deployment

