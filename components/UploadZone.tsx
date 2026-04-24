"use client";

import { useCallback, useRef, useState } from "react";

interface UploadZoneProps {
  onUpload: (file: File, dataUrl: string) => void;
  disabled?: boolean;
}

async function svgToPngBlob(svgFile: File): Promise<Blob> {
  const url = URL.createObjectURL(svgFile);
  const img = new Image();
  img.src = url;
  await new Promise<void>((res, rej) => {
    img.onload = () => res();
    img.onerror = () => rej(new Error("Failed to load SVG"));
  });
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth || 800;
  canvas.height = img.naturalHeight || 600;
  canvas.getContext("2d")!.drawImage(img, 0, 0);
  URL.revokeObjectURL(url);
  return new Promise((res) => canvas.toBlob((b) => res(b!), "image/png"));
}

function fileToDataUrl(file: File | Blob): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result as string);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

export function UploadZone({ onUpload, disabled }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(
    async (raw: File) => {
      setError(null);
      const ALLOWED = ["image/png", "image/jpeg", "image/svg+xml"];
      if (!ALLOWED.includes(raw.type)) {
        setError("Only PNG, JPG, and SVG files are supported.");
        return;
      }
      if (raw.size > 5 * 1024 * 1024) {
        setError("File must be under 5MB.");
        return;
      }

      let fileToSend: File | Blob = raw;
      if (raw.type === "image/svg+xml") {
        fileToSend = await svgToPngBlob(raw);
      }

      const dataUrl = await fileToDataUrl(fileToSend);
      const normalizedFile =
        fileToSend instanceof File
          ? fileToSend
          : new File([fileToSend], raw.name.replace(/\.svg$/, ".png"), {
              type: "image/png",
            });
      onUpload(normalizedFile, dataUrl);
    },
    [onUpload]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      if (disabled) return;
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [disabled, processFile]
  );

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-12 cursor-pointer transition-all duration-200
          ${dragging ? "border-[#A3005C] bg-[#A3005C]/10" : "border-[#A3005C]/30 bg-white/[0.03] hover:border-[#A3005C]/60 hover:bg-white/[0.05]"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#7a0044] via-[#A3005C] to-[#c4006f] shadow-lg shadow-[#A3005C]/30">
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold text-white">
            {dragging ? "Drop your logo here" : "Upload your logo"}
          </p>
          <p className="mt-1 text-sm text-white/50">
            Drag & drop or click to browse
          </p>
          <p className="mt-1 text-xs text-white/30">PNG · JPG · SVG · Max 5MB</p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.svg"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) processFile(file);
            e.target.value = "";
          }}
        />
      </div>

      {error && (
        <p className="mt-3 text-center text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
