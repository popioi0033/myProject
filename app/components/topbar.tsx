"use client";
import { useRouter } from "next/navigation";
import { AuthService } from "@/app/service/login/authService";
import { NotificationService} from "@/app/service/ืnotification/notificationsService";
import { Notification } from "@/app/service/ืnotification/notificationsType";
import { useState, useEffect, useRef } from "react";

const Topbar = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    try {
      const res = await NotificationService.getNotifications();
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ปิด dropdown เมื่อคลิกนอก
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // fetch ทุก 1 นาที
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    router.push("/");
  };

  return (
    <header className="topbar">
      <div />
      <div className="top-actions">

        {/* Bell + dropdown */}
        <div className="noti-wrapper" ref={dropdownRef}>
          <button
            className="noti-btn"
            onClick={() => setShowDropdown(prev => !prev)}
          >
            🔔
            {notifications.length > 0 && (
              <span className="noti-dot">{notifications.length}</span>
            )}
          </button>

          {showDropdown && (
            <div className="noti-dropdown">
              <p className="noti-title">การแจ้งเตือน</p>
              {notifications.length === 0 ? (
                <p className="noti-empty">ไม่มีการแจ้งเตือน</p>
              ) : (
                notifications.map((n) => (
                  <div key={n.request_id} className="noti-item">
                    <p className="noti-name">
                      {n.first_name} {n.last_name}
                      <span className="noti-code"> • {n.student_code}</span>
                    </p>
                    <p className="noti-detail">{n.period_name}</p>
                    <p className="noti-remaining">
                      เหลือ {Math.ceil(n.days_remaining)} วัน • {n.status}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <button className="logout" onClick={handleLogout}>Log out</button>
      </div>
    </header>
  );
};

export default Topbar;