"use client";

import YobDesc from "../ui/YobDesc";
import YobPayForm from "../ui/YobForm";

const YobPaySetUpPage = () => {
  return (
    <div className="flex w-full gap-10">
      <div className="flex-1 flex items-center justify-end  min-h-screen">
        <YobDesc />
      </div>

      <div className="flex-1 flex items-center justify-start  min-h-screen px-10 ">
        <YobPayForm />
      </div>
    </div>
  );
};

export default YobPaySetUpPage;
