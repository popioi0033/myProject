import {Notification} from "./notificationsType";

const BASE_URL = "http://localhost:3001/api";

export const NotificationService = {
  getNotifications: async (): Promise<{ data: Notification[] }> => {
    const res = await fetch(`${BASE_URL}/loan-period/notifications`);
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Get notifications failed");
    }
    return res.json();
  },
};