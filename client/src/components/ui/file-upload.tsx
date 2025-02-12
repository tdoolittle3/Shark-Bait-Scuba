import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { ImageIcon, UploadIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  onFileSelected: (files: File[]) => void;
  onImageDelete?: (url: string) => void;
  accept?: string;
  maxSize?: number;
  uploading?: boolean;
  imageUrls?: string[];
  multiple?: boolean;
}

export function FileUpload({
  onFileSelected,
  onImageDelete,
  accept = "image/*",
  maxSize = 10 * 1024 * 1024, // 10MB
  uploading = false,
  imageUrls = [],
  multiple = true,
  className,
  ...props
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const files = Array.from(e.dataTransfer.files);
      if (files.length) validateAndProcessFiles(files);
    },
    [onFileSelected]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length) validateAndProcessFiles(files);
  };

  const validateAndProcessFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        alert('Please upload only image files');
        return false;
      }

      if (file.size > maxSize) {
        alert(`File size should not exceed ${maxSize / (1024 * 1024)}MB`);
        return false;
      }

      return true;
    });

    if (validFiles.length) {
      onFileSelected(validFiles);
    }
  };

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer",
          "hover:bg-muted/50 transition-colors",
          uploading && "opacity-50 cursor-not-allowed"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          disabled={uploading}
        />

        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <ImageIcon className="h-8 w-8" />
          <div>
            <p className="font-medium">
              Drop image{multiple ? 's' : ''} here or click to upload
            </p>
            <p className="text-sm">
              PNG, JPG or WebP (max. {maxSize / (1024 * 1024)}MB{multiple ? ' each' : ''})
            </p>
          </div>
        </div>
      </div>

      {imageUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {imageUrls.map((url, index) => (
            <div key={url} className="relative aspect-square">
              <img
                src={url}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
              {onImageDelete && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => onImageDelete(url)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}