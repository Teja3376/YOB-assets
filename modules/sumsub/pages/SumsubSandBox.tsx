"use client";

import { useEffect } from "react";
import SumsubWebSdk from "@sumsub/websdk";

export default function SumsubSandBox() {
    const token = "_act-sbx-jwt-eyJhbGciOiJub25lIn0.eyJqdGkiOiJfYWN0LXNieC00NGRkODdhMy03MWFkLTQ0ZTQtYTZjYi01ZWEwMGYzNDhhYzUtdjIiLCJ1cmwiOiJodHRwczovL2FwaS5zdW1zdWIuY29tIn0.-v2";
    useEffect(() => {
    const sdk = SumsubWebSdk.init(token, async () => {
      return token;
    })
      .withConf({
        lang: "en",
        theme: "dark",
      })
      .withOptions({
        adaptIframeHeight: true,
      })
      .on("idCheck.onStepCompleted", (payload) => {
        console.log("Step completed", payload);
      })
      .on("idCheck.onError", (error) => {
        console.log("Error", error);
      })
      .build();

    sdk.launch("#sumsub-container");

    return () => sdk.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-[#1B1B1F] flex justify-center">
      <div className="w-full max-w-5xl px-4 py-8">
        <div id="sumsub-container" className="w-full" />
      </div>
    </div>
  );
}
