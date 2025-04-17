const express = require('express');
const axios = require('axios');
const retry = require('retry');

const app = express();
const PORT = 3003;
const SERVICE_B_URL = 'http://localhost:4000/data';

// 1. Cơ chế giữ process luôn chạy
const keepAlive = () => {
  console.log('🛡️  Service A đang hoạt động...');
  setTimeout(keepAlive, 60 * 1000); // Log mỗi 1 phút
};

// 2. Hàm retry
function callWithRetry() {
  const operation = retry.operation({
    retries: 3,
    factor: 2,
    minTimeout: 1000,
    maxTimeout: 5000,
    randomize: true
  });

  return new Promise((resolve, reject) => {
    operation.attempt(async (currentAttempt) => {
      try {
        console.log(`🔄 Attempt ${currentAttempt}: Gọi Service B...`);
        const response = await axios.get(SERVICE_B_URL);
        console.log('✅ Thành công sau', currentAttempt, 'lần thử');
        resolve(response.data);
      } catch (error) {
        if (operation.retry(error)) {
          console.log(`⏳ Thử lại sau ${operation.timeouts()}ms...`);
          return;
        }
        console.error('❌ Thất bại sau', currentAttempt, 'lần thử');
        reject(new Error(`Request failed after ${currentAttempt} attempts: ${error.message}`));
      }
    });
  });
}

// 3. Endpoint
app.get('/fetch-from-b', async (req, res) => {
  try {
    const result = await callWithRetry();
    res.json({
      status: 'SUCCESS',
      data: result,
      attempts: 1
    });
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      error: error.message,
      attempts: 3
    });
  }
});

// 4. Xử lý sự kiện tắt server
const server = app.listen(PORT, () => {
  console.log(`Service A (Retry) chạy tại http://localhost:${PORT}`);
  keepAlive(); // Kích hoạt cơ chế giữ process
});

// 5. Bắt lỗi toàn cục
process.on('uncaughtException', (err) => {
  console.error('🔥 Lỗi nghiêm trọng:', err);
  server.close(() => process.exit(1));
});

process.on('SIGINT', () => {
  console.log('\n🛑 Tắt Service A đúng cách...');
  server.close(() => process.exit(0));
});