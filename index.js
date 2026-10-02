const WebSocket = require('ws');
const port = process.env.PORT || 10000;
const wss = new WebSocket.Server({ port });

let clients = [];

wss.on('connection', (ws) => {
  clients.push(ws);
  console.log("客户端已连接");

  ws.on('message', (msg) => {
    clients.forEach(client => {
      if(client !== ws && client.readyState === WebSocket.OPEN){
        client.send(msg.toString());
      }
    })
  });

  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
    console.log("客户端断开连接");
  })
})
console.log(`WebSocket server running on port ${port}`);
