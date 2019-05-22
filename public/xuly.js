var socket = io("http://localhost:3030");

//  bắt sự kiện có người đăng ký trùng
socket.on("sever-send-dk-thatbai", function(data){
    alert(`Sai username! ${data} đã có người đăng ký`);
})

// nhận danh sách người online (ai cũng nhận được hết)
// cập nhật lại danh sách người online khi có người logout
socket.on("server-send-danhsach-user", function(data){
    // duyệt từng phần tử và đổ vào box conten
    $('#boxContent').html(""); // rỗng ruột
    data.forEach(phantu => {
        $('#boxContent').append(`<div class='user'> ${phantu} </div>`);
    });
})


// đăng ký thành công
socket.on("sever-send-dk-thanhcong", function(data){
    $("#currentUser").html(data); // hiện user (hellt user)
    $("#loginForm").hide(2000);  // mất đi trong 2s
    $("#chatForm").show(1000);   // hiện ra trong 1s
})

// ============= lắng nghe chat =============
socket.on("server-send-message", function(data){
    // data là nguyên cặp JSON
    $('#listMessages').append(`<div class="ms"><span> ${data.nguoigui} </span>: ${data.noidung} </div>`);

})

// ============= lắng nghe đang gõ chữ =============
socket.on("ai-do-dang-go-chu", function(data){
    // data là nguyên cặp JSON
    $('#thongbao').html(data);
})
socket.on("ai-do-stop-go-chu", function(){
    // data là nguyên cặp JSON
    $('#thongbao').html("");
})



$(document).ready(function(){
    $("#loginForm").show();
    $("#chatForm").hide();

    // click button gửi username lên server
    $("#btnRegister").click(function(){
        socket.emit("client-send-username", $("#txtUsername").val());
    })

    // bắt sự kiện click logout
    $("#btnLogout").click(function(){
        socket.emit("logout");
        $("#loginForm").show(2000);
        $("#chatForm").hide(1000);
    })

    // bắt sự kiện SendMessage gửi lên sever
    $("#btnSendMessage").click(function(){
        socket.emit("user-send-message", $("#txtMessage").val());

    })

    // bắt sự kiện khi gõ chữ
    $("#txtMessage").focusin(function(){
        socket.emit("toi-dang-go-chu");
    })
    // bắt sự kiện khi KHÔNG gõ chữ
    $("#txtMessage").focusout(function(){
        socket.emit("toi-stop-go-chu");
    })

})