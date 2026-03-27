"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GetStartedLayout from "@/components/layout/get-started";
import { useUpdateIssuerSubscription } from "@/connection/useUpdateIssuerSubscription";
import { toast } from "sonner";

export default function OnboardingPaymentPage() {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const { mutateAsync: updateSubscription, isPending: isUpdatingSubscription } =
    useUpdateIssuerSubscription();

  const fixedOnboardingUsd = 250;
  const totalFeeUsd = fixedOnboardingUsd;
  /** Must match your backend contract (Postman example used 5000). */
  const paidAmountForApi = 5000;

  const handleMockPay = async () => {
    setProcessing(true);
    try {
      await updateSubscription({
        subscription: true,
        paidAmount: paidAmountForApi,
      });
      sessionStorage.setItem("onboardingFeeMockPaid", "true");
      toast.success("Subscription updated. Continuing to KYB…");
      router.push("/kyb");
    } catch {
      toast.error("Could not update subscription. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const busy = processing || isUpdatingSubscription;

  return (
    <GetStartedLayout>
      <div className="max-w-3xl w-full mx-auto space-y-8">
        <div>
          <p className="text-sm font-medium text-[#FF6B00] mb-2">
            Step before KYB verification
          </p>
          <h2 className="text-3xl font-bold text-gray-900">
            Onboarding &amp; integration fee
          </h2>
          <p className="mt-3 text-gray-600">
            This is a dummy payment screen. No real charge is processed. Use the
            DocuSeal document signature action below to add or remove the
            integration fee line.
          </p>
        </div>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#FF6B00]" />
              What you are paying for
            </CardTitle>
            <CardDescription>
                To access the YOB Assets platform, you need to pay a one-time onboarding and integration fee. This fee covers the costs associated with setting up your account and integrating the YOB Assets platform into your business.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="text-[#FF6B00]">•</span>
                Onboarding to YOB Asset Issuer Platform
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF6B00]">•</span>
                KYB verification
              </li>
            </ul>

            <div className="rounded-lg bg-gray-50 border border-gray-100 p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fixed onboarding (platform)</span>
                <span className="font-medium text-gray-900">
                  ${fixedOnboardingUsd.toFixed(2)}
                </span>
              </div>
              {/* <div className="flex justify-between text-sm">
                <span className="text-gray-600">DocuSeal document signature</span>
                <span className="font-medium text-gray-900">
                  ${docuSealFeeUsd.toFixed(2)}
                </span>
              </div> */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-1">
                {/* <p className="text-xs text-gray-500">
                  {docuSealSignatureAdded
                    ? `DocuSeal signature included — ${DOCUSEAL_INTEGRATION_FEE_USD.toFixed(2)} USD added to total.`
                    : "Add DocuSeal document signature to include the integration fee."}
                </p> */}
                {/* {docuSealSignatureAdded ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="shrink-0 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                    onClick={() => setDocuSealSignatureAdded(false)}
                  >
                    Remove DocuSeal signature
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="shrink-0 border-[#FF6B00]/40 text-[#FF6B00] hover:bg-orange-50"
                    onClick={() => setDocuSealSignatureAdded(true)}
                  >
                    <FileSignature className="mr-2 h-4 w-4" />
                    Add DocuSeal document signature
                  </Button>
                )} */}
              </div>
              <div className="flex justify-between text-sm pt-1 border-t border-gray-200">
                <span className="text-gray-800 font-medium">Total (USD)</span>
                <span className="font-semibold text-gray-900">
                  ${totalFeeUsd.toFixed(2)}
                </span>
              </div>
            
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/otp")}
            className="order-1 sm:order-2  hover:shadow-lg text-black h-12 px-8"
          >
            Back
          </Button>
          <Button
            type="button"
            disabled={busy}
            onClick={handleMockPay}
            className="order-1 sm:order-2 bg-linear-to-r from-[#FF6B00] to-[#FF8A33] hover:shadow-lg text-white h-12 px-8"
          >
            {busy ? "Processing…" : "Pay dummy fee & continue"}
          </Button>
        </div>
      </div>
    </GetStartedLayout>
  );
}
