import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ApprovedStatusProps {
  successAnimation: any;
  applicationId: string | null;
}

export default function ApprovedStatus({
  successAnimation,
  applicationId,
}: ApprovedStatusProps) {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 flex items-center justify-center">
            {successAnimation && (
              <Lottie
                animationData={successAnimation}
                loop={false}
                style={{ width: 64, height: 64 }}
              />
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-green-900">
              Application Approved!
            </h3>
            <p className="text-sm text-green-700 mt-1">
              Congratulations! Your issuer application has been approved
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-green-200">
          <p className="text-sm text-green-800 leading-relaxed mb-4">
            Great news! Your issuer application has been approved. You now have
            access to the dashboard where you can start tokenizing your assets
            and managing your applications.
          </p>
          <p className="text-sm text-green-800 leading-relaxed">
            Click the button below to continue to your dashboard and begin your
            journey with YOB Assets.
          </p>
        </div>

        {applicationId && (
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <p className="text-xs font-medium text-green-600 mb-1">
              Application ID
            </p>
            <p className="text-sm font-mono text-green-900">{applicationId}</p>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={() => router.push("/dashboard")}
          className="w-full sm:w-auto px-8 h-12 text-base font-semibold bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Continue to Dashboard
        </Button>
      </div>
    </div>
  );
}
