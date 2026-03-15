// service/auth/authService.ts

const BASE_URL = "http://localhost:3001/api";

export const AuthService = {
  login: async (username: string, password: string) => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",  // 👈 รับ httpOnly cookie จาก backend
    });

    if (!res.ok) {
      throw new Error("Invalid username or password");
    }

    const json = await res.json();
    return json.user;  // ไม่ต้องจัดการ token เองแล้ว
  },

  logout: async () => {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",  // 👈
    });
  },
};