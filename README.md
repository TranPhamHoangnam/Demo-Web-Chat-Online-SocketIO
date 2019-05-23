Demo Web Chat Online SocketIO

Ví dụ đơn giản
Cú pháp là khó hiểu trong socketio. Ngoài ra, mỗi ổ cắm được tự động kết nối với phòng riêng của họ với id socket.id (đây là cách trò chuyện riêng tư hoạt động trong socketio, họ sử dụng phòng).

Gửi cho người gửi và không ai khác

socket.emit('hello', msg);
Gửi cho mọi người kể cả người gửi (nếu người gửi ở trong phòng) trong phòng "phòng của tôi"

io.to('my room').emit('hello', msg);
Gửi cho mọi người ngoại trừ người gửi (nếu người gửi ở trong phòng) trong phòng "phòng của tôi"

socket.broadcast.to('my room').emit('hello', msg);
Gửi cho mọi người trong mỗi phòng, kể cả người gửi

io.emit('hello', msg); // short version

io.sockets.emit('hello', msg);
Chỉ gửi đến ổ cắm cụ thể (trò chuyện riêng)

socket.broadcast.to(otherSocket.id).emit('hello', msg);
