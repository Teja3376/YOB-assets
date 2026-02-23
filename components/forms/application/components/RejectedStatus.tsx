import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";

interface RejectedStatusProps {
  rejectAnimation: any;
  applicationId: string | null;
  onNewApplication: () => void;
}

export default function RejectedStatus({
  rejectAnimation,
  applicationId,
  onNewApplication,
}: RejectedStatusProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 flex items-center justify-center">
            {rejectAnimation && (
              <Lottie
                animationData={rejectAnimation}
                loop={true}
                style={{ width: 64, height: 64 }}
              />
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-red-900">
              Application Rejected
            </h3>
            <p className="text-sm text-red-700 mt-1">
              Your issuer application was not approved
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-red-200">
          <p className="text-sm text-red-800 leading-relaxed mb-4">
            We&apos;re sorry, but your issuer application has been rejected.
            This could be due to incomplete information, missing documentation,
            or not meeting our requirements.
          </p>
          <p className="text-sm text-red-800 leading-relaxed">
            Please review your application details and feel free to submit a new
            application with updated information. If you have questions, please
            contact our support team.
          </p>
        </div>

        {applicationId && (
          <div className="bg-white rounded-lg p-4 border border-red-200">
            <p className="text-xs font-medium text-red-600 mb-1">
              Application ID
            </p>
            <p className="text-sm font-mono text-red-900">{applicationId}</p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <p className="text-sm font-medium text-gray-900 mb-3">
          Would you like to submit a new application?
        </p>
        <Button
          onClick={onNewApplication}
          className="w-full sm:w-auto bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white"
        >
          Submit New Application
        </Button>
      </div>
    </div>
  );
}
