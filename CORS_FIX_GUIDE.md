# X402 Server - CORS và Payment Fix

## ✅ Đã sửa lỗi Cross-Origin-Opener-Policy

### 🔧 **Những gì đã được sửa:**

1. **Thêm CORS Middleware:**
   - ✅ Import `cors` từ `hono/cors`
   - ✅ Cấu hình CORS cho tất cả origins
   - ✅ Thêm headers cần thiết cho Cross-Origin policies

2. **Cải thiện Payment Middleware:**
   - ✅ Thêm try-catch cho error handling
   - ✅ Cấu hình description cho endpoint
   - ✅ Logging chi tiết khi khởi động

3. **Thêm Headers cho CORS:**
   - ✅ `Cross-Origin-Opener-Policy: same-origin`
   - ✅ `Cross-Origin-Embedder-Policy: require-corp`
   - ✅ `Access-Control-Allow-Origin: *`

4. **Cải thiện Error Handling:**
   - ✅ Xử lý lỗi payment verification cụ thể
   - ✅ Thêm CORS headers cho error responses
   - ✅ Trả về status code 402 cho payment errors

### 🚀 **Cách chạy:**

#### **1. Set environment variables:**
```bash
# Windows PowerShell
$env:FACILITATOR_URL="https://facilitator.x402.com"
$env:ADDRESS="0x1234567890123456789012345678901234567890"
$env:NETWORK="base"

# Linux/Mac
export FACILITATOR_URL="https://facilitator.x402.com"
export ADDRESS="0x1234567890123456789012345678901234567890"
export NETWORK="base"
```

#### **2. Chạy server:**
```bash
npm run start
# hoặc
yarn start
```

#### **3. Test endpoints:**

**Health check (không cần payment):**
```bash
curl http://localhost:4021/health
```

**Weather endpoint (cần payment $1):**
```bash
curl http://localhost:4021/weather
```

**Test từ browser:**
```javascript
// Test CORS từ browser console
fetch('http://localhost:4021/health')
  .then(response => response.json())
  .then(data => console.log(data));

// Test payment endpoint
fetch('http://localhost:4021/weather')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Payment required:', error));
```

### 📋 **Logs sẽ hiển thị:**

```
🚀 Server starting with CORS enabled
   PAY_TO: 0x1234...7890
   NETWORK: base
   FACILITATOR_URL: https://facilitator.x402.com
🔐 Setting up payment middleware...
✅ Payment middleware configured successfully

✅ Server started successfully!
   Listening on: http://localhost:4021
   Weather endpoint: http://localhost:4021/weather
   Health check: http://localhost:4021/health
   Payment required: $1 USDC
   CORS enabled for all origins
```

### 🛠️ **Nếu vẫn gặp lỗi:**

1. **Kiểm tra environment variables:**
   ```bash
   echo $FACILITATOR_URL
   echo $ADDRESS
   echo $NETWORK
   ```

2. **Test CORS từ browser:**
   - Mở Developer Tools
   - Chạy fetch request trong Console
   - Kiểm tra Network tab để xem headers

3. **Kiểm tra payment flow:**
   - Health endpoint sẽ hoạt động bình thường
   - Weather endpoint sẽ trả về 402 nếu chưa thanh toán
   - Payment sẽ được xử lý qua X402 protocol

### 🔍 **Debug tips:**

- Server sẽ log mọi request đến weather endpoint
- Error responses sẽ có CORS headers
- Payment verification errors sẽ được xử lý riêng
- Có thể test từ browser mà không gặp CORS issues
