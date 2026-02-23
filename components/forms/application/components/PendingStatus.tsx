import Lottie from "lottie-react";
import { AlertCircle } from "lucide-react";

interface PendingStatusProps {
  pendingAnimation: any;
  applicationId: string | null;
}

export default function PendingStatus({
  pendingAnimation,
  applicationId,
}: PendingStatusProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-8 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 flex items-center justify-center">
            {pendingAnimation && (
              <Lottie
                animationData={pendingAnimation}
                loop={true}
                style={{ width: 64, height: 64 }}
              />
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-orange-900">
              Application Pending Review
            </h3>
            <p className="text-sm text-orange-700 mt-1">
              Your issuer application is currently under review
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-orange-200">
          <p className="text-sm text-orange-800 leading-relaxed mb-4">
            Thank you for submitting your issuer application. Our team is
            currently reviewing your submission. You will be notified via email
            once a decision has been made.
          </p>
          <p className="text-sm text-orange-800 leading-relaxed">
            If approved, you will be able to access the dashboard and start
            tokenizing your assets. If rejected, you will receive feedback and
            can submit a new application.
          </p>
        </div>

        {applicationId && (
          <div className="bg-white rounded-lg p-4 border border-orange-200">
            <p className="text-xs font-medium text-orange-600 mb-1">
              Application ID
            </p>
            <p className="text-sm font-mono text-orange-900">{applicationId}</p>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-900 mb-2">
              What&apos;s Next?
            </p>
            <p className="text-sm text-blue-800 leading-relaxed">
              Please check your email regularly for updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
