const express = require('express');
const app = express();
const PORT = 4000;

app.get('/data', (req, res) => {
  console.log('📦 Service B: Đã nhận yêu cầu - Trả dữ liệu JSON về cho A!');
  res.json({
    thongBao: 'Xin chào từ Service B 👋!',
    thoiGianPhanHoi: new Date(),
  });
});

app.listen(PORT, () => {
  console.log(`✅ Service B đã khởi động tại http://localhost:${PORT}/data`);
});
