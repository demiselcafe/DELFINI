"use client";

import Image from "next/image";
import { useAdmin } from "@/contexts/AdminContext";
import { EditImageBar } from "@/components/EditImageBar";

async function saveAboutPortrait(url: string) {
  const res = await fetch("/api/admin/overrides");
  const current = await res.json();
  await fetch("/api/admin/overrides", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...current, aboutPortrait: url }),
  });
}

export function AboutPortraitWithAdmin({ portrait }: { portrait: string }) {
  const { isAdmin, isEditMode } = useAdmin();

  return (
    <div className="md:col-span-5">
      <div className="relative aspect-[3/4] max-w-md bg-black/5">
        <Image
          src={portrait}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 40vw"
          unoptimized={portrait.startsWith("/uploads/")}
        />
      </div>
      {isAdmin && isEditMode && (
        <EditImageBar
          label="Portrait"
          slot="aboutPortrait"
          currentUrl={portrait}
          onSave={saveAboutPortrait}
        />
      )}
    </div>
  );
}
