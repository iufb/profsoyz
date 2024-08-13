import { customFetch } from "@/shared/api";
import { Visit } from "@/shared/lib/types";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const createVisit = () => {
  return customFetch({ method: "POST", path: "vizit/" });
};

export const getVisits = (days: number): Promise<Visit[]> => {
  return customFetch({ method: "GET", path: "vizit/", query: { days } });
};
