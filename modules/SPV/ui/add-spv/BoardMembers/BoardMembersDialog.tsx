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
import { useABApi } from "@/hooks/spv/useABApi";
import { useParams } from "next/navigation";

interface BoardMembersDialogProps {
  index: number | null;
  setIndex: React.Dispatch<React.SetStateAction<number | null>>;
  openBoardMembersDialog: boolean;
  setOpenBoardMembersDialog: React.Dispatch<React.SetStateAction<boolean>>;
  fields: any[];
  append: any;
  update: any;
  remove: any;
}

const BoardMembersDialog = ({
  index,
  setIndex,
  openBoardMembersDialog,
  setOpenBoardMembersDialog,
  fields,
  append,
  update,
  remove,
}: BoardMembersDialogProps) => {
  const { createAB, updateAB, status, error } = useABApi();
  const {
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();

  const isOpen = openBoardMembersDialog;
  const isEdit = index !== null && index !== -1;

  const handleClose = () => {
    if (index !== null) {
      // If it's a new item (no _id) and we're closing without saving, remove it
      const currentItem = fields[index];
      if (currentItem && !currentItem._id && !isEdit) {
        remove(index);
      } else if (isEdit) {
        // Restore previous values for edit mode
        const previousValues = fields[index];
        if (previousValues) {
          update(index, previousValues);
        }
      }
    }
    setIndex(null);
    clearErrors();
    setOpenBoardMembersDialog(false);
  };

  const onSubmit = async () => {
    if (index === null) return;
    
    const currentIndex = index;
    trigger(`boardMembers.${currentIndex}`)
      .then(async (isValid) => {
        if (isValid) {
          const data = formGetValues();
          const values = data.boardMembers?.[currentIndex];
          
          if (!values) {
            console.error("Values not found for index:", currentIndex);
            return;
          }

          if (isEdit && values._id) {
            // Update existing board member
            update(currentIndex, { ...values });
            await updateAB(values._id, {
              fullName: values.fullName,
              email: values.email,
              countryCode: values.countryCode,
              phoneNumber: values.phoneNumber,
              idNumber: values.idNumber,
              idProof: values.idProof,
              role: values.role,
            });
          } else {
            // Create new board member
            await createAB({
              fullName: values.fullName,
              email: values.email,
              countryCode: values.countryCode,
              phoneNumber: values.phoneNumber,
              idNumber: values.idNumber,
              idProof: values.idProof,
              role: values.role,
            }).then((res) => {
              // Update the temporary item with the response data
              update(currentIndex, {
                _id: res._id,
                fullName: values.fullName,
                email: values.email,
                countryCode: values.countryCode,
                phoneNumber: values.phoneNumber,
                idNumber: values.idNumber,
                idProof: values.idProof,
                role: values.role,
              });
            });
          }
          setIndex(null);
          clearErrors();
          setOpenBoardMembersDialog(false);
        }
      })
      .catch((error) => {
        console.error("Error during form submission:", error);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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

        <div className="grid grid-cols-2 gap-4">
          {FormGenerator(
            boardMembersFormConfig({
              index: index ?? -1,
            })
          )}
        </div>

        <DialogFooter className="flex justify-end mt-6">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="button" onClick={onSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BoardMembersDialog;
