import { lazy, Suspense, memo, useState } from "react";
const VerticleTable = lazy(() => import("@/components/ui/VerticleTable"));
import { useFieldArray, useFormContext } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/CustomDialog";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/use-form/FormGenerator";
import { useParams } from "next/navigation";
import { riskFactorFormConfig } from "@/modules/Assets/form-config/AdditionalDetails/riskFactorFormConfig";
import useRiskFactors from "@/modules/Assets/hooks/additionalDetails/useRiskFactors";
import { toast } from "sonner";

const RiskFactor = memo(() => {
  const { assetId = null } = useParams<{ assetId?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();
  const { createRiskFactors, updateRiskFactors, deleteRiskFactors } =
    useRiskFactors();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "riskFactors",
    keyName: "riskFactors_id",
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
    const isValid = await trigger(`riskFactors.${index}`);
    if (isValid) {
      const data = formGetValues();
      const values = data.riskFactors[index ?? -1];
      if (isEdit) {
        if (index !== null) {
          await updateRiskFactors.mutate(
            { id: values._id, payload: { ...values } },
            {
              onSuccess: (res: any) => {
                console.log(res);
                update(index ?? -1, { ...values, _id: res._id });
                toast.success("Risk Factor updated successfully");
              },
              onError: (error: any) => {
                console.log(error);
                toast.error("Failed to update Risk Factor");
              },
            },
          );
        }
        update(index ?? -1, { ...values });
      } else {
        await createRiskFactors.mutate(
          { assetId: assetId ?? "", payload: { ...values } },
          {
            onSuccess: (res: any) => {
              console.log(res);
              append({ ...values, _id: res._id });
              toast.success("Risk Factor created successfully");
            },
            onError: (error: any) => {
              console.log(error);
              toast.error("Failed to create Risk Factor");
            },
          },
        );
      }
      setIndex(null);
      clearErrors();
    }
  };

  const handleOnDelete = async () => {
    setDeleteIndex(null);
    const data = formGetValues();
    const values = data.riskFactors[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteRiskFactors.mutate(values._id, {
        onSuccess: (res: any) => {
          console.log(res);
          toast.success("Risk Factor deleted successfully");
        },
        onError: (error: any) => {
          console.log(error);
          toast.error("Failed to delete Risk Factor");
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
          title={`Risk Factors`}
          addButtonText={`Add Risk Factors`}
          emptyStateMessage={`No Risk Factors found`}
        />
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold p-2">
                {isEdit ? "Edit" : "Add"} Risk Factor
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {FormGenerator(riskFactorFormConfig({ index: index ?? -1 }))}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onOpenChange}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={onSubmit}
                  disabled={
                    createRiskFactors.isPending || updateRiskFactors.isPending
                  }
                >
                  {createRiskFactors.isPending || updateRiskFactors.isPending
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
                Delete Risk Factors
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Are you sure you want to delete this Risk Factors?</p>
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

export default RiskFactor;
