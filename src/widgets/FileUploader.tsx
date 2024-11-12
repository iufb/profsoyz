"use client";
import { backendImageUrl } from "@/shared/lib/constants";
import {
  Dialog,
  DialogContent,
  Input,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  Button,
} from "@/shared/ui";
import { default as NextImage } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface FileUploaderProps {
  id?: string;
  file: string;
  field: string;
  label: string;
  writeChanges: (val: {
    id?: string;
    field: string;
    value: File | string | Blob;
  }) => void;
}
export const FileUploader = ({
  id,
  file,
  label,
  writeChanges,
  field,
}: FileUploaderProps) => {
  const [image, setImage] = useState<string | ArrayBuffer | null | Blob>(null);
  useEffect(() => {
    if (file) {
      setImage(`${backendImageUrl}${file}`);
    }
  }, [file]);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {field == "image" && image && (
        <NextImage width={80} height={80} src={image as string} alt="image" />
      )}
      {field == "file" && typeof file === "string" && file.length > 0 && (
        <a
          href={`${backendImageUrl}${file as string}`}
          target="_blank"
          className="text-lg"
        >
          Посмотреть прикрепленный файл
        </a>
      )}
      {image && (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
          <DialogTrigger className="text-left">Редактировать</DialogTrigger>
          <DialogContent className="min-w-full min-h-[800px] max-h-screen">
            <div className=" flex items-center justify-center">
              <ImageCropper
                imageSrc={image as string}
                onSave={async (cropImage) => {
                  const file = await cropImage();
                  if (!file) {
                    console.log("No Cropped File");
                    return;
                  }
                  writeChanges({ id, field, value: file });
                  const image = await fileToImage(file);
                  setImage(image.src);
                  setOpen(false);
                }}
              />
            </div>

            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <Input
        type="file"
        label={label}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function (event) {
              if (event.target) setImage(event.target.result);
            };
            reader.readAsDataURL(file);
            writeChanges({ id, field, value: file });
          }
        }}
      />
    </div>
  );
};

function ImageCropper({
  imageSrc,
  onSave,
}: {
  imageSrc: string;
  onSave: (cropImage: () => Promise<File | undefined>) => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);

  const [crop, setCrop] = useState<Crop>({
    unit: "px", // Can be 'px' or '%'
    x: 0,
    y: 0,
    width: 400,
    height: 400,
  });

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = src;
      image.crossOrigin = "Anonymous"; // Optional, use if needed for CORS

      image.onload = () => {
        resolve(image); // Resolve the Promise with the loaded image
      };

      image.onerror = () => {
        reject(new Error("Image failed to load.")); // Reject if there's an error loading the image
      };
    });
  };
  const cropImage = async () => {
    if (imgRef.current) {
      const image = await loadImage(imageSrc);
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / imgRef.current.width;
      const scaleY = image.naturalHeight / imgRef.current.height;

      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.log("No canvas context");
        return;
      }
      const pixelRatio = window.devicePixelRatio;
      canvas.width = crop.width * pixelRatio;
      canvas.height = crop.height * pixelRatio;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
      );
      return canvasToFile(canvas, "croppedImage");
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <ReactCrop
        crop={crop}
        onChange={(newCrop: Crop) => setCrop(newCrop)}
        locked={true} // Fixes the crop area
      >
        <img ref={imgRef} src={imageSrc} width={700} className="h-auto" />
      </ReactCrop>
      <Button
        onClick={() => {
          onSave(cropImage);
        }}
      >
        Сохранить
      </Button>
    </div>
  );
}

function canvasToFile(
  canvas: HTMLCanvasElement,
  fileName: string,
  mimeType = "image/jpeg",
): Promise<File> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], fileName, { type: mimeType });
        resolve(file);
      } else {
        reject(new Error("Canvas conversion to blob failed."));
      }
    }, mimeType);
  });
}
function fileToImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        resolve(img);
      };

      img.onerror = (error) => {
        reject(new Error("Failed to load image."));
      };
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file."));
    };

    reader.readAsDataURL(file);
  });
}
