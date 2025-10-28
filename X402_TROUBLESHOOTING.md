# X402 Payment Server - Hướng dẫn cấu hình

## 🚨 Lỗi 402 Payment Required - Nguyên nhân và cách sửa

### Nguyên nhân chính:
1. **Thiếu biến môi trường PAY_TO**: Đây là địa chỉ ví để nhận thanh toán
2. **Cấu hình network không đúng**: Phải là "base", "ethereum", hoặc "solana"
3. **Facilitator URL không hợp lệ**: URL của dịch vụ facilitator

### Cách sửa lỗi:

#### 1. Tạo file .env trong thư mục gốc:
```bash
# X402 Payment Configuration
PAY_TO=0x1234567890123456789012345678901234567890
NETWORK=base
FACILITATOR_URL=https://facilitator.x402.com
PORT=4021
```

#### 2. Hoặc set biến môi trường trực tiếp:
```bash
# Windows PowerShell
$env:PAY_TO="0x1234567890123456789012345678901234567890"
$env:NETWORK="base"
$env:FACILITATOR_URL="https://facilitator.x402.com"
$env:PORT="4021"

# Linux/Mac
export PAY_TO="0x1234567890123456789012345678901234567890"
export NETWORK="base"
export FACILITATOR_URL="https://facilitator.x402.com"
export PORT="4021"
```

### Chạy server:

#### Server Hono (port 4021):
```bash
npm run start
# hoặc
yarn start
```

#### Server Express (port 4022):
```bash
npx tsx src/ok.ts
```

### Test endpoints:

#### Health check (không cần thanh toán):
```bash
curl http://localhost:4021/health
curl http://localhost:4022/health
```

#### Weather endpoint (cần thanh toán $0.001):
```bash
curl http://localhost:4021/weather
```

#### Mint endpoint (cần thanh toán $0.001):
```bash
curl http://localhost:4022/mint
```

### Logs quan trọng để debug:

Khi server khởi động, bạn sẽ thấy:
```
🔧 Environment Configuration:
   PAY_TO: 0x1234...7890
   NETWORK: base
   FACILITATOR_URL: https://facilitator.x402.com
   PORT: 4021

🔐 Setting up payment middleware...
✅ Payment middleware configured successfully

🚀 Starting X402 Payment Server...
   Server will run on: http://localhost:4021
   Weather endpoint: http://localhost:4021/weather
   Health check: http://localhost:4021/health
   Payment required: $0.001 USDC

✅ Server started successfully!
   Listening on: http://localhost:4021
   Ready to accept payments via X402 protocol
```

### Nếu vẫn gặp lỗi 402:

1. **Kiểm tra PAY_TO có đúng format không**: Phải là địa chỉ Ethereum hợp lệ (0x...)
2. **Kiểm tra network**: Phải là "base", "ethereum", hoặc "solana"
3. **Kiểm tra facilitator URL**: Phải là URL hợp lệ
4. **Kiểm tra kết nối mạng**: Server có thể truy cập facilitator không

### Troubleshooting:

```bash
# Kiểm tra biến môi trường
echo $PAY_TO
echo $NETWORK
echo $FACILITATOR_URL

# Test kết nối facilitator
curl -I https://facilitator.x402.com

# Kiểm tra port có bị chiếm không
netstat -an | grep 4021
```
