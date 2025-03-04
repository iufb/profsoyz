"use client";
import { cn } from "@/shared/lib/utils";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Card, CardProps } from "./Card";

export interface CardsProps {
    title: string;
    variant: "base" | "horizontal";
    items: Omit<CardProps, "variant">[];
}
function CardsClient({ title, variant, items }: CardsProps) {
    const [max, setMax] = useState(3);
    const t = useTranslations();
    const params = useParams();

    const forNews =
        title.includes("жаңалықтар") ||
        title.includes("новости") ||
        params.slug.includes("home");

    return (
        <>
            <section
                className={clsx("flex scrollbar flex-col gap-3 ", forNews && "")}
            >
                <h2 className="text-2xl text-base2 font-bold">{title}</h2>
                <div
                    className={cn(
                        variant == "base"
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-10 "
                            : "flex flex-col gap-2",
                    )}
                >
                    {items.reverse().slice(0, max).map((i, idx) => (
                        <Card key={idx} variant={variant} {...i} />
                    ))}
                </div>
            </section>
            {forNews && (
                <div className="flex justify-center text-base2 gap-10">
                    {max > 3 && <button onClick={() => setMax(3)}>{t("less")}</button>}
                    {items.length > items.slice(0, max).length && (
                        <button
                            onClick={() =>
                                setMax((prev) => {
                                    if (items.length <= items.slice(0, max).length) {
                                        return prev;
                                    }

                                    return prev + 3;
                                })
                            }
                        >
                            {t("more")}
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
export default CardsClient;
