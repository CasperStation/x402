# Hướng dẫn Deploy lên Railway

## Các bước deploy

### 1. Chuẩn bị
- Đăng ký tài khoản Railway tại: https://railway.app
- Cài đặt Railway CLI (optional): `npm i -g @railway/cli`

### 2. Tạo project trên Railway

#### Cách 1: Deploy từ GitHub
1. Push code lên GitHub repository
2. Đăng nhập Railway
3. Click "New Project"
4. Chọn "Deploy from GitHub repo"
5. Chọn repository của bạn
6. Railway sẽ tự động detect và deploy

#### Cách 2: Deploy từ Railway CLI
```bash
# Login
railway login

# Tạo project mới
railway init

# Deploy
railway up
```

### 3. Cấu hình Environment Variables
1. Vào project trên Railway dashboard
2. Chọn tab "Variables"
3. Thêm các biến môi trường sau:
   ```
   PAY_TO=0x0c9ea23e31F5d5Ef3f0F1834B1041b3666d0ADb4
   NETWORK=base
   CDP_API_KEY_ID=your_api_key_id_here
   CDP_API_KEY_SECRET=your_api_key_secret_here
   ASSET_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54Bda02913
   ```
4. Railway sẽ tự động restart service sau khi thêm variables

### 4. Kiểm tra deployment
1. Vào tab "Deployments" xem trạng thái
2. Click "View Logs" để xem logs
3. Copy domain từ Railway (sẽ có dạng: `xxx.up.railway.app`)

### 5. Test API
```bash
# Test endpoint
curl https://your-app.up.railway.app/mint

# Sẽ nhận được response 402 Payment Required (đúng như mong đợi)
```

## Lưu ý quan trọng

1. **PORT**: Railway tự động cung cấp biến `PORT`, không cần config thủ công
2. **Environment Variables**: Phải config đầy đủ các biến trong Railway dashboard
3. **Logs**: Xem logs trực tiếp trên Railway dashboard
4. **Domain**: Railway cung cấp domain miễn phí với HTTPS
5. **Custom Domain**: Có thể thêm custom domain trong settings

## Troubleshooting

### Lỗi: "Missing PAY_TO address"
- Kiểm tra đã thêm biến `PAY_TO` vào Railway Variables
- Đảm bảo format đúng: `0x...` với đủ ký tự

### Lỗi: "Cannot connect to server"
- Kiểm tra server đã listen trên `0.0.0.0` (đã config trong code)
- Check logs trên Railway dashboard

### Server khởi động nhưng không accessible
- Kiểm tra PORT đã được Railway set
- Xem logs để confirm server đang chạy đúng port
