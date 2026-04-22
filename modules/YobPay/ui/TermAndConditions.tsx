"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type TermsDialogProps = {
  children: React.ReactNode;
  onAccept: () => void;
  title?: string;
  triggerText?: string | React.ReactNode;
};

export default function TermsDialog({
  children,
  onAccept,
  title = "Terms & Conditions",
  triggerText = "View Terms & Conditions",
}: TermsDialogProps) {
  const [open, setOpen] = useState(false);
  const handleAccept = () => {
    onAccept();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="bg-transparent border-0 shadow-none hover:bg-transparent cursor-pointer  p-0 hover:text-black"
        >
          {triggerText}
        </Button>
      </DialogTrigger>

      <DialogContent className="h-130 flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {/* SCROLL AREA */}
        <div className="flex-1 overflow-y-auto text-sm text-gray-600 space-y-2 pr-2">
          {children}
        </div>

        <DialogFooter className="shrink-0">
          <Button type="button" onClick={handleAccept}>
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
