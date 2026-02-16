import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("aqmd_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("aqmd_user");
      }
    }
    setLoading(false);
  }, []);

  function register(userData) {
    const newUser = { ...userData, id: Date.now(), registeredAt: new Date().toISOString() };
    localStorage.setItem("aqmd_user", JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  }

  function login(email, password) {
    const stored = localStorage.getItem("aqmd_user");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.email === email) {
        setUser(parsed);
        return { success: true };
      }
    }
    return { success: false, error: "Invalid email or no account found. Please register first." };
  }

  function logout() {
    localStorage.removeItem("aqmd_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
