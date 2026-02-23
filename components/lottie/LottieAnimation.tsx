"use client";

import Lottie from "lottie-react";

type LottieAnimationProps = {
  animationData: any;
  loop?: boolean;
  className?: string;
};

const LottieAnimation = ({
  animationData,
  loop = true,
  className,
}: LottieAnimationProps) => {
  return (
    <div className={className}>
      <Lottie animationData={animationData} loop={loop} />
    </div>
  );
};

export default LottieAnimation;
