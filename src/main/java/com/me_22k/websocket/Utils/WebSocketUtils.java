package com.me_22k.websocket.Utils;

import javax.websocket.RemoteEndpoint;
import javax.websocket.Session;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class WebSocketUtils {
//    定义存放全局的用户Session
    public static final Map<String, Session> ONLINE_USER_SESSIONS=new ConcurrentHashMap<>();

    public static void sendMessage(Session session,String message)
    {
        if (session==null)
        {
            return;
        }
//        拿到当前用户的Session
        final RemoteEndpoint.Basic basic=session.getBasicRemote();
        if (basic==null)
        {
            return;
        }
//        发送消息
        try {
            basic.sendText(message);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void sendMessageAll(String message)
    {
//        每当有人发消息就遍历所有在线用户并且发消息给所有用户
        ONLINE_USER_SESSIONS.forEach(
                (sessionId,session)->sendMessage(session,message)
        );
    }
}
