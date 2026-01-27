import "./globals.css";
import Sidebar from "./components/sidbar";
import Topbar from "./components/topbar";

export const metadata = {
  title: "Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app">
          <Sidebar />

          <div className="main">
            <Topbar />
            <div className="content">{children}</div>
          </div>

          <button className="support">🎧 Support</button>
        </div>
      </body>
    </html>
  );
}
