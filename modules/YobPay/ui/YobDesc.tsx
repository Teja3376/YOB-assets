import clsx from "clsx";
import { Building, Globe, ShieldCheck } from "lucide-react";

const YobDesc = () => {
  const features = [
    {
      title: "Corporate Ready",
      label: "Defaulting to enterprise-grade features",
      icon: Building,
      featureClassName:
        "bg-radial-[at_50%_75%] from-gray-500 via-gray-600 to-gray-700 to-90% text-white",
    },
    {
      title: "Global Rails",
      label: "Access 135+ currencies instantly.",
      icon: Globe,
      featureClassName:
        "bg-radial-[at_50%_75%] from-orange-400 via-orange-500 to-orange-600 to-90% text-white",
    },
    {
      title: "Bank-Grade",
      label: "Secure, compliant, and reliable.",
      icon: ShieldCheck,
      featureClassName:
        "bg-radial-[at_50%_75%] from-primary via-orange-400 to-primary to-90% text-white col-span-2 py-7",
    },
  ];
  return (
    <div className="w-[80%]  flex flex-col items-start justify-center gap-7 px-8 py-12">
      <div className="text-left space-y-3">
        <h1 className="font-bold text-primary text-5xl">Digital Finance</h1>
        <h1 className="font-bold text-black text-5xl">Made Simple.</h1>
      </div>
      <p className="text-black font-normal">
        Join the global network of businesses using Yob Pay to manage treasury,
        issue cards, and scale cross-border.
      </p>

      <div className=" mt-2  rounded-lg grid grid-cols-2 gap-5 ">
        {features.map((feature) => (
          <div
            key={feature.title}
            className={clsx(
              "flex col-span-1 items-center gap-8 px-5 py-3 rounded-xl",
              feature.featureClassName,
            )}
          >
            <div className="h-10 w-10 rounded-xl  flex items-center justify-center">
              <feature.icon />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-sm ">{feature.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YobDesc;
