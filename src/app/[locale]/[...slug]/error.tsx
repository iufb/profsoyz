"use client"; // Error boundaries must be Client Components

import { Button } from "@/shared/ui";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  const t = useTranslations();
  return (
    <div className="h-72 grid place-items-center border border-slate-300 rounded-md bg-slate-100">
      <div className="bg-red-500 w-24 h-24 rounded-full grid place-items-center">
        <X color="white" size={64} />
      </div>
      <h2 className="text text-3xl text-red-500">{t("error.message")}</h2>
      <Button
        className="bg-base2 font-bold"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        {t("error.btn")}
      </Button>
    </div>
  );
}
