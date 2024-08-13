"use client";
import { createVisit } from "@/shared/api/visit";
import { getCookie, setCookie } from "cookies-next";
import { useEffect } from "react";

export const VisitChecker = () => {
  useEffect(() => {
    const visitToken = getCookie("visit");
    if (visitToken) return;
    createVisit()
      .then(() => {
        const cookie = Date.now();
        setCookie("visit", cookie, { maxAge: 10800 });
      })
      .catch((e) => console.log(e));
  }, []);
  return <></>;
};
