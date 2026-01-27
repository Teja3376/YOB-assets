import { lazy, Suspense, memo, useState } from "react";
const VerticleTable = lazy(() => import("@/components/ui/VerticleTable"));
import { useFieldArray, useFormContext } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/CustomDialog";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/use-form/FormGenerator";
import { useParams } from "next/navigation";
import { riskDisclosureFormConfig } from "@/modules/Assets/form-config/AdditionalDetails/riskDisclosureFormConfig";
import useRiskDisclosure from "@/modules/Assets/hooks/additionalDetails/useRiskDisclosure";
import { toast } from "sonner";

const RiskDisclosure = memo(() => {
  const { assetId = null } = useParams<{ assetId?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();
  const { createRiskDisclosure, updateRiskDisclosure, deleteRiskDisclosure } =
    useRiskDisclosure();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "riskDisclosures",
    keyName: "riskDisclosures_id",
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
    const isValid = await trigger(`riskDisclosures.${index}`);
    if (!isValid) return;
    const data = formGetValues();
    const values = data.riskDisclosures[index ?? -1];
    if (isEdit) {
      await updateRiskDisclosure.mutate(
        { id: values._id, payload: { ...values } },
        {
          onSuccess: (res: any) => {
            console.log(res);
            update(index ?? -1, { ...values, _id: res._id });
            toast.success("Risk Disclosure updated successfully");
          },
          onError: (error: any) => {
            console.log(error);
            toast.error("Failed to update Risk Disclosure");
          },
        },
      );
    } else {
      await createRiskDisclosure.mutate(
        { assetId: assetId ?? "", payload: { ...values } },
        {
          onSuccess: (res: any) => {
            console.log(res);
            append({ ...values, _id: res._id });
            toast.success("Risk Disclosure created successfully");
          },
          onError: (error: any) => {
            console.log(error);
            toast.error("Failed to create Risk Disclosure");
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
    const values = data.riskDisclosures[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteRiskDisclosure.mutate(values._id, {
        onSuccess: (res: any) => {
          console.log(res);
          toast.success("Risk Disclosure deleted successfully");
        },
        onError: (error: any) => {
          console.log(error);
          toast.error("Failed to delete Risk Disclosure");
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
          title={`Risk Disclosure`}
          addButtonText={`Add Risk Disclosure`}
          emptyStateMessage={`No Risk Disclosure found`}
        />
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold p-2">
                {isEdit ? "Edit" : "Add"} Risk Disclosure
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {FormGenerator(riskDisclosureFormConfig({ index: index ?? -1 }))}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onOpenChange}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={onSubmit}
                  disabled={
                    createRiskDisclosure.isPending ||
                    updateRiskDisclosure.isPending
                  }
                >
                  {createRiskDisclosure.isPending ||
                  updateRiskDisclosure.isPending
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
                Delete Risk Disclosure
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Are you sure you want to delete this Risk Disclosure?</p>
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

export default RiskDisclosure;
