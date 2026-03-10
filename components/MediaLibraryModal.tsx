"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface MediaLibraryModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  onUpload: (file: File) => Promise<string>;
}

export function MediaLibraryModal({ open, onClose, onSelect, onUpload }: MediaLibraryModalProps) {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("/api/admin/uploads")
      .then((r) => r.json())
      .then((data) => {
        setFiles(data.files || []);
      })
      .catch(() => setFiles([]))
      .finally(() => setLoading(false));
  }, [open]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/uploads", { method: "POST", body: form });
      const data = await res.json();
      if (data.url) {
        setFiles((prev) => [...prev, { name: data.name, url: data.url }]);
        onSelect(data.url);
        onClose();
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white max-w-2xl w-full max-h-[80vh] flex flex-col shadow-xl">
        <div className="p-4 border-b border-black/10 flex items-center justify-between">
          <h3 className="font-serif text-lg text-ink">Médiathèque</h3>
          <button type="button" onClick={onClose} className="text-inkMuted hover:text-ink text-sm">
            Fermer
          </button>
        </div>
        <div className="p-4 border-b border-black/10">
          <label className="inline-block bg-ink text-white px-4 py-2 text-xs uppercase tracking-wider cursor-pointer hover:bg-ink/90">
            {uploading ? "Téléversement…" : "Téléverser une image"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
        </div>
        <div className="p-4 overflow-auto flex-1">
          {loading ? (
            <p className="text-sm text-inkMuted">Chargement…</p>
          ) : files.length === 0 ? (
            <p className="text-sm text-inkMuted">Aucune image. Téléversez-en une ci-dessus.</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {files.map((f) => (
                <button
                  key={f.url}
                  type="button"
                  onClick={() => { onSelect(f.url); onClose(); }}
                  className="relative aspect-square overflow-hidden bg-black/5 hover:ring-2 ring-ink"
                >
                  <Image src={f.url} alt="" fill className="object-cover" sizes="120px" unoptimized />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
