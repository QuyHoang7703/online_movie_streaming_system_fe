import { BellFilled } from "@ant-design/icons";
import { Badge, Dropdown, notification } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  useGetNotificationsQuery,
  useMarkAllAsSeenMutation,
  useUpdateStatusNotificationMutation,
} from "@service/notificationApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
dayjs.extend(relativeTime);

const NotificationDropdown = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [localNotifications, setLocalNotifications] = useState([]);

  const { data: notificationResponse, refetch } = useGetNotificationsQuery({
    page: 1,
    size: 10,
  });

  useEffect(() => {
    if (notificationResponse?.data?.result) {
      setLocalNotifications(notificationResponse.data.result);
    }
  }, [notificationResponse]);

  useEffect(() => {
    if (!userInfo) return;

    let ws = new SockJS("http://localhost:8080/ws");
    const socketClient = Stomp.over(ws);

    socketClient.connect(
      {},
      () => {
        console.log("✅ Connected to notification websocket");
        socketClient.subscribe(
          `/user/${userInfo.email}/notifications`,
          (message) => {
            const newNotification = JSON.parse(message.body);
            setLocalNotifications((prev) => [newNotification, ...prev]);
            refetch(); // Refresh notification list from server
          },
        );
      },
      (error) => {
        console.error("❌ WebSocket connection error:", error);
      },
    );

    return () => {
      if (socketClient.connected) {
        socketClient.disconnect();
      }
    };
  }, [userInfo, setLocalNotifications, refetch]);

  const [updateSeenStatusForNotification] =
    useUpdateStatusNotificationMutation();
  const handleMarkNotificationAsRead = async (notificationId) => {
    const updatedNotificationResponse =
      await updateSeenStatusForNotification(notificationId);
    console.log({ updatedNotificationResponse });
    if (updatedNotificationResponse?.data?.data) {
      setLocalNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? updatedNotificationResponse.data.data : n,
        ),
      );
    }
  };

  const [markAllAsSeen] = useMarkAllAsSeenMutation();
  const handleMarkAllAsSeen = async () => {
    const response = await markAllAsSeen();

    if (response?.data?.data) {
      setLocalNotifications((prev) => {
        return prev.map((noti) => {
          const updatedNoti = response.data.data.find((u) => u.id == noti.id);
          return updatedNoti ? { ...noti, ...updatedNoti } : noti;
        });
      });
    }
  };

  const dropdownContent = (
    <div className="max-h-[400px] w-96 overflow-y-auto rounded bg-white p-2 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="mb-2 border-b px-2 py-1 font-semibold">Thông báo</div>
        {localNotifications.some((n) => !n.seen) && (
          <button
            onClick={handleMarkAllAsSeen}
            className="text-xs text-blue-500 hover:underline"
          >
            Đánh dấu tất cả là đã đọc
          </button>
        )}
      </div>
      {localNotifications.length === 0 ? (
        <div className="py-4 text-center text-gray-500">Không có thông báo</div>
      ) : (
        localNotifications?.slice(0, 10).map((noti) => (
          <div
            key={noti.id}
            className="flex cursor-pointer items-start gap-3 rounded p-2 transition hover:bg-gray-100"
            onClick={() => handleMarkNotificationAsRead(noti.id)}
          >
            {noti.poster && (
              <img
                src={noti.poster}
                alt="poster"
                className="h-16 w-12 rounded object-cover"
              />
            )}
            <div className="flex flex-1 items-center justify-between">
              <div>
                <div className="text-sm font-medium">{noti.title}</div>
                <div className="text-xs text-gray-600">{noti.message}</div>
                <div className="mt-1 text-[10px] text-gray-400">
                  {dayjs(noti.createdAt).fromNow()}
                </div>
              </div>

              {!noti.seen && (
                <div className="h-2 w-2 rounded-full bg-blue-500" />
              )}
            </div>
          </div>
        ))
      )}
      <div className="mt-2 text-center">
        <a
          href="/notifications"
          className="text-sm text-blue-500 hover:underline"
        >
          Xem tất cả
        </a>
      </div>
    </div>
  );
  const numberUnseenNotification = localNotifications.filter(
    (notification) => !notification.seen,
  ).length;

  return (
    <Dropdown
      overlay={dropdownContent}
      trigger={["click"]}
      placement="bottomRight"
      arrow
    >
      <div className="relative cursor-pointer">
        <Badge count={numberUnseenNotification} size="small" offset={[-2, 2]}>
          <BellFilled className="text-2xl text-blue-500" />
        </Badge>
      </div>
    </Dropdown>
  );
};

export default NotificationDropdown;
