"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import LottieAnimation from "@/components/lottie/LottieAnimation";
import successLottie from "../../../public/lottie/success.json";
import errorLottie from "../../../public/lottie/Failure.json";
import axios from "axios";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import useWithdrawYob from "../hooks/useWithdrawYob";
import Loading from "@/components/ui/Loading";

interface WithDrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// 🧠 Zod schema
const withdrawSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => parseFloat(val) > 0, {
      message: "Amount must be greater than 0",
    }),

  destinationAddress: z.string().min(10, "Enter a valid address"),

  paymentReason: z
    .string()
    .min(2)
    .max(200, "Reason must be between 2 and 200 characters"),
});

type WithdrawFormValues = z.infer<typeof withdrawSchema>;

const WithdrawDialogBox = ({ open, onOpenChange }: WithDrawDialogProps) => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const {
    mutate: withdrawCrypto,
    isPending,
    isError,
    isSuccess,
    error,
  } = useWithdrawYob();
  const form = useForm<WithdrawFormValues>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: "0.00",
      destinationAddress: "",
      paymentReason: "",
    },
  });

  const onSubmit = (data: WithdrawFormValues) => {
    console.log("Withdraw Data:", data);
    const { amount, destinationAddress, paymentReason } = data;
    withdrawCrypto(
      { amount, destinationAddress, paymentReason },
      {
        onError: (err: any) => {
          console.error("Withdraw Error:", err);
          // alert("Failed to withdraw: " + (err?.message || "Unknown error"));
        },
      },
    );
  };
  console.log({ error });

  useEffect(() => {
    if (isPending) setStatus("loading");
    if (isSuccess) setStatus("success");
    if (isError) setStatus("error");
  }, [isPending, isSuccess, isError]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {status === "loading" ? (
          <div className="flex items-center justify-center my-10">
            <Loading />
          </div>
        ) : status === "success" ? (
          <div className="flex flex-col items-center justify-center gap-4 py-5">
            {/* 🔥 Replace with Lottie */}
            <div className="h-30 w-30 ">
              <LottieAnimation animationData={successLottie} />
            </div>
            <p className="text-green-600 font-medium">Withdrawal successful</p>

            <Button
              onClick={() => {
                setStatus("idle");
                form.reset();
                onOpenChange(false);
              }}
            >
              Close
            </Button>
          </div>
        ) : status === "error" ? (
          <div className="flex flex-col items-center justify-center gap-4 py-5">
            {/* 🔥 Replace with Lottie */}
            <div className="h-30 w-30 ">
              <LottieAnimation animationData={errorLottie} />
            </div>
            <p className="text-red-600 font-medium">
              {axios.isAxiosError(error)
                ? error.response?.data?.message || "Something went wrong"
                : error?.message || "Something went wrong"}
            </p>

            <Button onClick={() => setStatus("idle")}>Try Again</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Withdraw Crypto</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Amount */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address */}
                <FormField
                  control={form.control}
                  name="destinationAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter wallet address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Reason */}
                <FormField
                  control={form.control}
                  name="paymentReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Reason</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter payment reason" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Processing..." : "Withdraw"}
                </Button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawDialogBox;
