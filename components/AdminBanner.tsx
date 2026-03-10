"use client";

import { useAdmin } from "@/contexts/AdminContext";

export function AdminBanner() {
  const { isAdmin, isEditMode } = useAdmin();
  if (!isAdmin || !isEditMode) return null;
  return (
    <div className="fixed top-[5.5rem] left-0 right-0 z-[45] bg-amber-500 text-ink text-center py-1.5 text-xs font-medium tracking-wider uppercase md:top-[6rem]">
      Mode paramétrage — vous pouvez modifier les images ci-dessous
    </div>
  );
}
