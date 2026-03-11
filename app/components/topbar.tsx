"use client";
import { useRouter } from "next/navigation";
import { AuthService } from "@/app/service/login/authService";

const Topbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    AuthService.logout();           
    router.push("/");             
  };

  return (
    <header className="topbar">
      <div />
      <div className="top-actions">
        <span>🔔</span>
        <button className="logout" onClick={handleLogout}>Log out</button>
      </div>
    </header>
  );
};

export default Topbar;