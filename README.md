# Demo Web Chat Online SocketIO

### Ví dụ đơn giản

Gửi cho người gửi và không ai khác
`socket.emit('hello', msg);`
> Gửi cho mọi người kể cả người gửi (nếu người gửi ở trong phòng) trong phòng "phòng của tôi"

`io.to('my room').emit('hello', msg);`
> Gửi cho mọi người ngoại trừ người gửi (nếu người gửi ở trong phòng) trong phòng "phòng của tôi"

`socket.broadcast.to('my room').emit('hello', msg);`
> Gửi cho mọi người trong mỗi phòng, kể cả người gửi

`io.emit('hello', msg); // short version`

`io.sockets.emit('hello', msg);`
> Chỉ gửi đến ổ cắm cụ thể (trò chuyện riêng)

`socket.broadcast.to(otherSocket.id).emit('hello', msg);`
