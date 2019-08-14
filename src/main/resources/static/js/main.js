// 初始化准备
$(document).ready(function(){
    var urlPrefix ='ws://localhost:8080/chat-room/';
    var ws = null;
    $('#user_join').click(function(){
        var username = $('#in_user_name').val();
        if(username==''){
            alert("请输入用户名！");
            return;
        }
        // 拼接地址
        var url = urlPrefix + username;
        ws = new WebSocket(url);
        ws.onopen = function () {
            console.log("建立 websocket 连接...");
        };
        ws.onmessage = function(event){
            //服务端发送的消息
            $('#message_content').append(event.data+'\n');
        };
        ws.onclose = function(){
            $('#message_content').append('用户['+username+'] 已经离开聊天室! \n');
            console.log("关闭 websocket 连接...");
        }
    });
    //客户端发送消息到服务器
    $('#user_send_all').click(function(){
        var msg = $('#in_room_msg').val();
        if(msg==''){
            alert("请填写消息！");
            return;
        }
        if(ws && msg!=''){
            ws.send(msg);
        }
    });
    // 退出聊天室
    $('#user_exit').click(function(){
        if(ws){
            ws.close();
        }
    });
})