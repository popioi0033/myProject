"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./sidbar";
import Topbar from "./topbar";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNav = pathname === "/page/login" || pathname === "/login";

  return (
    <div className="app">
      {!hideNav && <Sidebar />}

      <div className="main">
        {!hideNav && <Topbar />}
        <div className="content">{children}</div>
      </div>

      {!hideNav && <button className="support">🎧 Support</button>}
    </div>
  );
}
