import { notificationApi } from "@service/notificationApi";
import { Stomp } from "@stomp/stompjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SockJS from "sockjs-client";

export const useNotificationSocket = (userEmail) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userEmail) return;
    const ws = new SockJS("http://localhost:8080/ws", null, {
      withCredentials: true,
    });
    const socketClient = Stomp.over(ws);
    socketClient.connect({}, () => {
      console.log("✅ Connected websocket from BE successfully");
      socketClient.subscribe(`/user/${userEmail}/notifications`, (message) => {
        const notification = JSON.parse(message.body);
        console.log("📩 New notification received:", notification);

        dispatch(
          notificationApi.util.invalidateTags({
            type: "Notifications",
            id: "List",
          }),
        );
      });
    });
    return () => {
      socketClient?.disconnect(() => {
        console.log("🛑 WebSocket disconnected");
      });
    };
  }, [userEmail, dispatch]);
};

export default useNotificationSocket;
