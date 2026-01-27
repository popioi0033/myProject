"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menu = [
    { label: "Dashboard", href: "/page/dashboard/" },
    { label: "Officers", href: "/page/officers" },
    { label: "Students loan", href: "/page/students-loan" },
    { label: "Remaining students", href: "/remaining" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-circle">KBU</div>
        <span>KASEM BUNDIT</span>
      </div>

      <nav className="menu">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`menu-item ${
              pathname === item.href ? "active" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
