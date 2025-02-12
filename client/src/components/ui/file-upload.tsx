import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { ImageIcon, UploadIcon } from "lucide-react";

interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  onFileSelected: (file: File) => void;
  accept?: string;
  maxSize?: number;
  uploading?: boolean;
  imageUrl?: string;
}

export function FileUpload({
  onFileSelected,
  accept = "image/*",
  maxSize = 10 * 1024 * 1024, // 10MB
  uploading = false,
  imageUrl,
  className,
  ...props
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const file = e.dataTransfer.files[0];
      if (file) validateAndProcessFile(file);
    },
    [onFileSelected]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndProcessFile(file);
  };

  const validateAndProcessFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > maxSize) {
      alert(`File size should not exceed ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    onFileSelected(file);
  };

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer",
        "hover:bg-muted/50 transition-colors",
        uploading && "opacity-50 cursor-not-allowed",
        className
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => !uploading && fileInputRef.current?.click()}
      {...props}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleFileInput}
        disabled={uploading}
      />

      {imageUrl ? (
        <div className="relative aspect-square w-full max-w-[200px] mx-auto">
          <img
            src={imageUrl}
            alt="Product"
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-md">
            <UploadIcon className="h-8 w-8 text-white" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <ImageIcon className="h-8 w-8" />
          <div>
            <p className="font-medium">
              Drop image here or click to upload
            </p>
            <p className="text-sm">
              PNG, JPG or WebP (max. {maxSize / (1024 * 1024)}MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}