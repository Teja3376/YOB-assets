import React from "react";
import clsx from "clsx";

interface DashboardCardProps {
  uptitle?: string;
  title?: string;
  value?: string;
  titleIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  tagline?: string;

  // classNames for customization
  containerClassName?: string;
  uptitleClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  valueClassName?: string;
  taglineClassName?: string;
  leftIconClassName?: string;
  rightIconClassName?: string;
  titleIconClassName?: string;
}

const DashboardCard = ({
  uptitle,
  titleIcon,
  leftIcon,
  rightIcon,
  tagline,
  title,
  value,

  containerClassName,
  uptitleClassName,
  headerClassName,
  titleClassName,
  valueClassName,
  taglineClassName,
  leftIconClassName,
  rightIconClassName,
  titleIconClassName,
}: DashboardCardProps) => {
  return (
    <div
      className={clsx("p-4   bg-white border border-gray-200", containerClassName)}
    >
      <div className=" flex items-center gap-2">
        {titleIcon && (
          <div className={clsx(titleIconClassName)}>{titleIcon}</div>
        )}
        {uptitle && (
          <h1 className={clsx("text-sm text-gray-500", uptitleClassName)}>
            {uptitle}
          </h1>
        )}
      </div>
      <div
        className={clsx(
          "flex items-center justify-between mt-2",
          headerClassName,
        )}
      >
        <div className="flex items-center gap-5 justify-between">
          {leftIcon && (
            <div className={clsx(leftIconClassName)}>{leftIcon}</div>
          )}
          <div className="flex flex-col items-start">
            {value && (
              <p className={clsx("text-2xl font-semibold mt-1", valueClassName)}>
                {value}
              </p>
            )}

            {title && (
              <h2 className={clsx("text-sm text-gray-500", titleClassName)}>
                {title}
              </h2>
            )}
          </div>
        </div>
        {rightIcon && (
          <div className={clsx(rightIconClassName)}>{rightIcon}</div>
        )}
      </div>

      {tagline && (
        <p className={clsx("text-xs text-gray-500 mt-1", taglineClassName)}>
          {tagline}
        </p>
      )}
    </div>
  );
};

export default DashboardCard;
