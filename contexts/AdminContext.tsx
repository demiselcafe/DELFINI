"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

interface AdminContextValue {
  isAdmin: boolean;
  isEditMode: boolean;
  setEditMode: (v: boolean) => void;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  loginModalOpen: boolean;
  setLoginModalOpen: (v: boolean) => void;
}

const defaultContextValue: AdminContextValue = {
  isAdmin: false,
  isEditMode: false,
  setEditMode: () => {},
  login: async () => false,
  logout: async () => {},
  refreshSession: async () => {},
  loginModalOpen: false,
  setLoginModalOpen: () => {},
};

const AdminContext = createContext<AdminContextValue>(defaultContextValue);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      setIsAdmin(!!data.admin);
      if (!data.admin) setEditMode(false);
    } catch {
      setIsAdmin(false);
      setEditMode(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const login = useCallback(
    async (password: string): Promise<boolean> => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });
        const data = await res.json();
        if (!res.ok) return false;
        setIsAdmin(true);
        setEditMode(true);
        return true;
      } catch {
        return false;
      }
    },
    []
  );

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsAdmin(false);
    setEditMode(false);
  }, []);

  const value: AdminContextValue = {
    isAdmin,
    isEditMode,
    setEditMode,
    login,
    logout,
    refreshSession,
    loginModalOpen,
    setLoginModalOpen,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  return useContext(AdminContext);
}
