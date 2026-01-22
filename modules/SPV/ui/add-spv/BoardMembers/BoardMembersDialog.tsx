"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/use-form/FormGenerator";
import { boardMembersFormConfig } from "@/modules/SPV/form-config/boardMembers";
import { useFormContext } from "react-hook-form";

interface BoardMembersDialogProps {
  index: number | null;
  setIndex: React.Dispatch<React.SetStateAction<number | null>>;
  openBoardMembersDialog: boolean;
  setOpenBoardMembersDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const BoardMembersDialog = ({
  index,
  setIndex,
  openBoardMembersDialog,
  setOpenBoardMembersDialog,
}: BoardMembersDialogProps) => {
  const {
    trigger,
    getValues,
    clearErrors,
  } = useFormContext<any>();

  const isEdit = index !== null && index !== -1;

  const handleClose = () => {
    setIndex(null);
    clearErrors();
    setOpenBoardMembersDialog(false);
  };

  const onSubmit = async () => {
    const isValid = await trigger(
      `boardOfDirectors.additionalBoardMembers.${index ?? -1}`
    );

    if (!isValid) return;

    const data = getValues();
    const values =
      data.boardOfDirectors.additionalBoardMembers[index ?? -1];

    console.log("Static form submit values:", values);

    handleClose();
  };

  return (
    <Dialog open={openBoardMembersDialog} onOpenChange={handleClose}>
      <DialogContent
        className="max-h-[95vh] overflow-y-auto"
        style={{ width: "50vw", maxWidth: "50vw" }}
      >
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit" : "Add"} Director</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Edit the details of this director."
              : "Add a new director to your organization."}
          </DialogDescription>
        </DialogHeader>

        {/* ✅ RHF + Config still used */}
        <div className="grid grid-cols-2 gap-4">
          {FormGenerator(
            boardMembersFormConfig({
              index: index ?? -1,
            })
          )}
        </div>

        <DialogFooter className="flex justify-end mt-6">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BoardMembersDialog;
