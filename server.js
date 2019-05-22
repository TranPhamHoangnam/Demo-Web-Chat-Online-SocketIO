var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(3030);

// mảng data;
var mangUsers = [];

io.on('connection', function(socket){
    console.log("connect: " + socket.id);
    
    // nhận usernam từ client gửi lên
    socket.on("client-send-username", function(data){
        console.log(data);
        if(mangUsers.indexOf(data) >= 0)
        {
            // tìm thấy user => đăng ký thất bại
            socket.emit("sever-send-dk-thatbai", data);
            // socket emit là ai gửi lên server thì server gửi về người đó
        }
        else{
            // không tìm thấy user => đăng ký thành công
            mangUsers.push(data); // push user vào mảng
            socket.Username = data; // socket.Username tự tạo nhé (tự tạo thêm biến username)
            socket.emit("sever-send-dk-thanhcong", data);

            // phát mảng user cho tất cả mọi người
            io.sockets.emit("server-send-danhsach-user", mangUsers);
        }
    });

    // lắng nghe sự kiện có người logout
    socket.on("logout", function(){
        // xóa user name khỏi mảng
        mangUsers.splice(
            mangUsers.indexOf(socket.Username), 1 
        );
        // đi vô mảng user tìm thằng user và cắt ra khỏi mảng
        // xóa 1 thằng 

        // phát cho mọi người biết (cập nhật)
        socket.broadcast.emit("server-send-danhsach-user", mangUsers); // broadcast để cập nhật lại
    });

    // lắng nghe người chat
    socket.on("user-send-message", function(data){
        // phát message về tất cả mọi người
        io.sockets.emit("server-send-message", { nguoigui: socket.Username, noidung: data });
        // truyền JSON ==> useranem của người chat và nội dung chat
    })

    // ============ lắng nghe người đang gõ chữ
    socket.on("toi-dang-go-chu", function(){
        var s = socket.Username + " đang nhập";
        io.sockets.emit("ai-do-dang-go-chu", s);
    })
    // ============ lắng nghe người gõ chữ xong rồi
    socket.on("toi-stop-go-chu", function(){
        io.sockets.emit("ai-do-stop-go-chu");
    })

})

app.get("/", function(req, res){
    res.render("trangchu");
})