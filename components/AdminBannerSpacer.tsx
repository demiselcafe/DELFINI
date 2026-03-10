"use client";

import { useAdmin } from "@/contexts/AdminContext";

export function AdminBannerSpacer() {
  const { isAdmin, isEditMode } = useAdmin();
  if (!isAdmin || !isEditMode) return null;
  return <div className="h-8 flex-shrink-0" aria-hidden />;
}
