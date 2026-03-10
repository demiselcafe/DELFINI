"use client";

import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";

export function LoginWidget() {
  const {
    isAdmin,
    isEditMode,
    setEditMode,
    login,
    logout,
    loginModalOpen,
    setLoginModalOpen,
  } = useAdmin();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(password);
    setLoading(false);
    if (ok) {
      setLoginModalOpen(false);
      setPassword("");
    } else {
      setError("Mot de passe incorrect");
    }
  };

  if (isAdmin) {
    return (
      <>
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
          <button
            type="button"
            onClick={() => setEditMode(!isEditMode)}
            className="bg-ink text-white px-4 py-2 text-xs tracking-wider uppercase shadow-lg hover:bg-ink/90"
          >
            {isEditMode ? "Désactiver le paramétrage" : "Paramétrage"}
          </button>
          <button
            type="button"
            onClick={() => logout()}
            className="text-xs text-inkMuted hover:text-ink uppercase tracking-wider"
          >
            Déconnexion
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {loginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white max-w-sm w-full p-6 shadow-xl">
            <h2 className="font-serif text-lg text-ink mb-4">Connexion admin</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full border border-black/20 px-3 py-2 text-sm"
                autoFocus
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setLoginModalOpen(false);
                    setError("");
                    setPassword("");
                  }}
                  className="px-4 py-2 text-sm text-inkMuted hover:text-ink"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-ink text-white px-4 py-2 text-sm uppercase tracking-wider disabled:opacity-50"
                >
                  {loading ? "..." : "Connexion"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
