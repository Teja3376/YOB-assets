import { lazy, Suspense, memo, useState } from "react";
const VerticleTable = lazy(() => import("@/components/ui/VerticleTable"));
import { useFieldArray, useFormContext } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/CustomDialog";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/use-form/FormGenerator";
import { useParams } from "next/navigation";
import { exitOpportunityFormConfig } from "@/modules/Assets/form-config/AdditionalDetails/exitOpportunityFormConfig";
import useExitOpportunity from "@/modules/Assets/hooks/additionalDetails/useOppurtunity";
import { toast } from "sonner";

const ExitOpportunity = memo(() => {
  const { assetId = null } = useParams<{ assetId?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();
  const {
    createExitOpportunity,
    updateExitOpportunity,
    deleteExitOpportunity,
  } = useExitOpportunity();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "exitOpportunities",
    keyName: "exitOpportunity_id",
  });
  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const handleEdit = (item: number) => setIndex(item);
  const handleAdd = () => {
    setIndex(-1);
  };

  const isOpen = index !== null;
  const isEdit = index !== -1;

  const onOpenChange = () => {
    const previousValues = index !== null ? fields[index] : {};
    if (index !== null) {
      update(index, previousValues);
    }
    setIndex(null);
  };

  const onSubmit = async () => {
    const isValid = await trigger(`exitOpportunities.${index}`);

    if (!isValid) return;

    const data = formGetValues();
    const values = data.exitOpportunities[index ?? -1];

    if (isEdit && index !== null) {
      updateExitOpportunity.mutate(
        { id: values._id, payload: { ...values } },
        {
          onSuccess: (res: any) => {
            console.log(res);
            update(index ?? -1, { ...values, _id: res._id });
            toast.success("Exit Opportunity updated successfully");
          },
          onError: (error: any) => {
            console.log(error);
            toast.error("Failed to update Exit Opportunity");
          },
        },
      );
    } else {
      createExitOpportunity.mutate(
        { assetId: assetId ?? "", payload: { ...values } },
        {
          onSuccess: (res: any) => {
            console.log(res);
            append({ ...values, _id: res._id });
            toast.success("Exit Opportunity created successfully");
          },
          onError: (error: any) => {
            console.log(error);
            toast.error("Failed to create Exit Opportunity");
          },
        },
      );
    }

    setIndex(null);
    clearErrors();
  };

  const handleOnDelete = async () => {
    setDeleteIndex(null);
    const data = formGetValues();
    const values = data.exitOpportunities[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteExitOpportunity.mutate(values._id, {
        onSuccess: (res: any) => {
          console.log(res);
          toast.success("Exit Opportunity deleted successfully");
        },
        onError: (error: any) => {
          console.log(error);
          toast.error("Failed to delete Exit Opportunity");
        },
      });
    }
  };

  const handleDelete = (item: any) => {
    setDeleteIndex(item);
  };

  return (
    <Suspense fallback={<div>Loading Asset Information...</div>}>
      <div className="asset-information">
        <VerticleTable
          items={fields}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleAdd={handleAdd}
          title={`Exit Opportunity`}
          addButtonText={`Add Exit Opportunity`}
          emptyStateMessage={`No Exit Opportunity found`}
        />
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold p-2">
                {isEdit ? "Edit" : "Add"} Opportunity found
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {FormGenerator(exitOpportunityFormConfig({ index: index ?? -1 }))}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onOpenChange}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={onSubmit}
                  disabled={
                    createExitOpportunity.isPending ||
                    updateExitOpportunity.isPending
                  }
                >
                  {createExitOpportunity.isPending ||
                  updateExitOpportunity.isPending
                    ? isEdit
                      ? "Updating..."
                      : "Submitting..."
                    : isEdit
                      ? "Update"
                      : "Submit"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          open={deleteIndex !== null}
          onOpenChange={() => setDeleteIndex(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold p-2">
                Delete Exit Opportunity
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Are you sure you want to delete this Exit Opportunity?</p>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDeleteIndex(null)}
                >
                  Cancel
                </Button>
                <Button type="button" onClick={handleOnDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Suspense>
  );
});

export default ExitOpportunity;
