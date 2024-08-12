"use client";
import { Langs } from "@/shared/lib/types";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PageEditorContent } from "./PageEditorContent";

export const PageEditor = ({ ids }: { ids: Langs }) => {
  const router = useRouter();
  const path = usePathname();
  const t = useTranslations("pages.pageEditor");
  const searchParams = useSearchParams();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            router.push(
              `${path}?ruPageId=${searchParams.get("ruPageId")}&kzPageId=${searchParams.get("kzPageId")}&ruId=${ids.ru}&kzId=${ids.kz}`,
            );
          }}
          size={"sm"}
        >
          {t("btn")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-[90%]  gap-4 ">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("desc")}</DialogDescription>
        </DialogHeader>
        {/* TODO */}
        <PageEditorContent ids={ids} />
        <DialogFooter className=" gap-2 sm:justify-end">
          <DialogClose
            asChild
            onClick={() => {
              router.back();
            }}
          >
            <Button type="button" variant="secondary" className="w-full">
              {t("decline")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
