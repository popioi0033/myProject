// service/auth/authService.ts

const BASE_URL = "http://localhost:3001/api";

export const AuthService = {
  login: async (username: string, password: string) => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error("Invalid username or password");
    }

    const json = await res.json();

    // เก็บ token ใน cookie
    document.cookie = `token=${json.token}; path=/; max-age=${60 * 60}`; // 1 ชั่วโมง

    return json.user;
  },

  logout: () => {
    document.cookie = "token=; path=/; max-age=0";
  },

  getToken: () => {
    const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
    return match ? match[1] : null;
  },
};