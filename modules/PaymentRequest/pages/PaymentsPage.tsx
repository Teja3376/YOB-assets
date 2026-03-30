"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/modules/Orders/ui/StatusBadge";
import { paymentsMock, updatePaymentStatus } from "../mock/tableData";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { formatCurrencyWithLocale } from "@/lib/format.utils";
import { useState } from "react";
import { PaymentDialog } from "../ui/PaymentTypeDialog";
import { PaymentSuccessDialog } from "../ui/SuccessDialog";
import { PaymentFailedDialog } from "../ui/FailedDialog";

export default function PaymentDetailsPage() {
  const { paymentId } = useParams();
  const router = useRouter();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [failedOpen, setFailedOpen] = useState(false);
  const [payments, setPayments] = useState(paymentsMock);

  const payment = payments.find((p) => p._id === paymentId);

  if (!payment) {
    return <div className="p-6">Payment not found</div>;
  }
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Payment Details</h1>
        <p className="text-sm text-muted-foreground">
          Payments / {payment._id}
        </p>
      </div>

      {/* Card */}
      <div className="border rounded-xl  space-y-6 bg-white shadow-xs">
        {/* Top Info */}
        <div className="flex justify-between items-start px-6 pt-6">
          <div className="flex gap-2 items-start ">
            <p className="text-muted-foreground text-md mt-1">Asset :</p>
            <div className="flex flex-col justify-start">
              <h2 className="text-2xl font-semibold">{payment.assetName}</h2>
              <p className="text-md text-muted-foreground">
                {payment.location}
              </p>
            </div>
          </div>
        </div>

        <p className="text-md px-6 ">
          <span className="text-muted-foreground">Requested On:</span>{" "}
          {payment.createdAt}
        </p>

        {/* Meta */}
        <div className="grid grid-cols-3 gap-4 text-md px-6 ">
          <p className="col-span-1">
            <span className="text-muted-foreground">Requested Fee:</span>{" "}
            {payment.serviceType}
          </p>
          <div className=" flex gap-2 items-center  col-span-1">
            <p className="text-md text-muted-foreground">Status:</p>
            <Badge
              className={clsx(
                "text-md uppercase",
                payment.status === "pending"
                  ? "bg-primary text-white "
                  : payment.status === "paid"
                    ? "bg-green-600 text-white "
                    : payment.status === "failed"
                      ? "bg-red-600 text-white "
                      : "bg-gray-600 text-white ",
              )}
            >
              {payment.status}
            </Badge>
          </div>
          <p className="text-md text-muted-foreground col-span-1">
            <span className="text-muted-foreground">Payment ID:</span>{" "}
            {payment._id}
          </p>
          <hr className="col-span-3 border-gray-200/90" />
        </div>
        <div className="flex items-center gap-2 px-6">
          <p className="text-muted-foreground">Amount:</p>{" "}
          <p className=" text-lg font-medium">
            {formatCurrencyWithLocale(payment.feeAmount)}
          </p>
        </div>
        <hr />

        {/* Reason */}
        <div className="px-6">
          <div className="rounded-md bg-primary/10  flex gap-4">
            <div className=" w-3 rounded-l-md bg-primary" />
            <div className=" py-2">
              <p className="font-medium text-xl">Reason for Fee</p>
            </div>
          </div>
          <div className="py-2 text-sm text-muted-foreground my-3">
            <p className="">{payment.reason}</p>
          </div>
          <hr className="border-gray-200/90" />

          {/* Fee Breakdown */}
          <div className="text-sm space-y-3 mt-2">
            <p>
              <span className="text-muted-foreground">Applicable Tier:</span>{" "}
              {payment.tier}
            </p>
            <p>
              <span className="text-muted-foreground">Minting Fee (%):</span>{" "}
              {payment.feePercent}%
            </p>
            <p>
              <span className="text-muted-foreground">
                Calculated Fee Amount:
              </span>{" "}
              {formatCurrencyWithLocale(payment.feeAmount)}
            </p>
          </div>
        </div>
        <hr />

        {/* Actions */}
        <div className="flex justify-end gap-2  pb-6 px-6">
          <Button variant="outline" onClick={() => router.back()}>
            Close
          </Button>

          {payment.status === "pending" && (
            <Button
              onClick={() => setIsPaymentOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Pay {formatCurrencyWithLocale(payment.feeAmount)}
            </Button>
          )}
        </div>
      </div>
      <PaymentDialog
        open={isPaymentOpen}
        onOpenChange={(open) => setIsPaymentOpen(open)}
        id={payment._id}
        price={payment.feeAmount}
        onPay={() => {
          setIsPaymentOpen(false);
          setPayments((prev) => updatePaymentStatus(prev, payment._id, "paid"));
          setSuccessOpen(true);
        }}
        onCancel={() => {
          setIsPaymentOpen(false);
          setPayments((prev) =>
            updatePaymentStatus(prev, payment._id, "failed"),
          );
          setFailedOpen(true);
        }}
      />
      <PaymentSuccessDialog
        open={successOpen}
        onOpenChange={setSuccessOpen}
        amount={payment.feeAmount}
        onDone={() => setSuccessOpen(false)}
      />

      <PaymentFailedDialog open={failedOpen} onOpenChange={setFailedOpen} />
    </div>
  );
}
