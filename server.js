const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('協作編輯器 WebSocket 服務器運行中');
});

const wss = new WebSocket.Server({ server });

// 存儲所有連接的客戶端
const clients = new Set();
// 存儲當前文檔內容
let currentContent = '';

// 廣播在線人數
function broadcastOnlineUsers() {
  const message = JSON.stringify({
    type: 'onlineUsers',
    count: clients.size
  });
  
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

wss.on('connection', (ws) => {
  // 添加新客戶端
  clients.add(ws);
  console.log('新客戶端已連接');
  
  // 發送當前文檔內容給新連接的客戶端
  if (currentContent) {
    ws.send(JSON.stringify({
      type: 'update',
      content: currentContent
    }));
  }
  
  // 廣播更新後的在線人數
  broadcastOnlineUsers();

  // 處理消息
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      if (data.type === 'update') {
        // 更新當前文檔內容
        currentContent = data.content;
        
        // 廣播更新給所有其他客戶端
        clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'update',
              content: currentContent
            }));
          }
        });
      }
    } catch (error) {
      console.error('處理消息時出錯:', error);
    }
  });

  // 處理斷開連接
  ws.on('close', () => {
    clients.delete(ws);
    console.log('客戶端已斷開連接');
    // 廣播更新後的在線人數
    broadcastOnlineUsers();
  });
});

const port = 1234;
server.listen(port, () => {
  console.log(`WebSocket 服務器運行在端口 ${port}`);
});