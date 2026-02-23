"use client";

import LottieAnimation from "@/components/lottie/LottieAnimation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import successAnimation from "@/public/lottie/success.json";

type KycSuccessCardProps = {
  onGoHome: () => void;
};

const KycSuccessCard = ({ onGoHome }: KycSuccessCardProps) => {
  return (
    <Card className="w-full max-w-[550px] mx-auto">
      <CardContent className="text-sm text-muted-foreground flex flex-col gap-4 py-8">
        <div className="flex flex-col items-center gap-4">
          <div className="w-28 h-28">
            <LottieAnimation animationData={successAnimation} loop={false} />
          </div>
          <h1 className="text-2xl font-semibold text-foreground text-center">
            KYB Verification Completed
          </h1>
          <p>
            Your KYB verification has been completed successfully.You can now
            proceed to the next step.
          </p>
        </div>

        <div className="flex justify-center pt-4">
          <Button
            className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-8"
            onClick={onGoHome}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default KycSuccessCard;
