"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MediaLibraryModal } from "@/components/MediaLibraryModal";

interface EditImageBarProps {
  label: string;
  slot: string;
  currentUrl?: string;
  onSave: (url: string) => Promise<void>;
}

export function EditImageBar({ label, slot, currentUrl, onSave }: EditImageBarProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleSelect = async (url: string) => {
    await onSave(url);
    router.refresh();
  };

  const handleUpload = async (file: File): Promise<string> => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/uploads", { method: "POST", body: form });
    const data = await res.json();
    if (!data.url) throw new Error("Upload failed");
    await onSave(data.url);
    router.refresh();
    return data.url;
  };

  return (
    <>
      <div className="mt-2 flex flex-wrap items-center gap-2 py-2 px-3 bg-amber-500/15 border border-amber-500/40 text-xs uppercase tracking-wider">
        <span className="text-ink/80">{label}</span>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="bg-ink text-white px-3 py-1.5 hover:bg-ink/90"
        >
          Choisir ou téléverser
        </button>
      </div>
      <MediaLibraryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelect}
        onUpload={handleUpload}
      />
    </>
  );
}
