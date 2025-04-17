const express = require('express');
const app = express();
const PORT = 4000;

// Middleware để giữ process không tắt
const keepAlive = () => {
  console.log('🛡️  Service B đang chạy nền...');
  setTimeout(keepAlive, 1000 * 60 * 5); // Cứ 5 phút log 1 lần
};

app.get('/data', (req, res) => {
  const shouldFail = Math.random() < 0.3;
  
  if (shouldFail) {
    console.log('💥 Service B: Giả lập lỗi');
    res.status(500).json({ error: 'Lỗi ngẫu nhiên' });
  } else {
    console.log('📦 Service B: Phản hồi thành công');
    res.json({ 
      status: 'OK',
      data: 'Hello từ Service B',
      timestamp: new Date() 
    });
  }
});

// Xử lý sự kiện tắt process
process.on('SIGINT', () => {
  console.log('\n🛑 Tắt Service B đúng cách...');
  process.exit(0);
});

const server = app.listen(PORT, () => {
  console.log(`✅ Service B chạy tại http://localhost:${PORT}`);
  keepAlive(); // Kích hoạt cơ chế giữ process
});

// Bắt lỗi toàn cục
process.on('uncaughtException', (err) => {
  console.error('🔥 Lỗi nghiêm trọng:', err);
  server.close(() => process.exit(1));
});