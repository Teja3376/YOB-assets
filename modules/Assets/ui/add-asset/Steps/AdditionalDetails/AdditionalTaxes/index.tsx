import { lazy, Suspense, memo, useState } from "react";
const VerticleTable = lazy(() => import("@/components/ui/VerticleTable"));
import { useFieldArray, useFormContext } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/CustomDialog";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/use-form/FormGenerator";
import { useParams } from "next/navigation";
import { additionalTaxesFormConfig } from "@/modules/Assets/form-config/AdditionalDetails/additionalTaxesFormConfig";
import useAdditionalTaxes from "@/modules/Assets/hooks/additionalDetails/useAdditionalTaxes";
import { toast } from "sonner";

const AdditionalTaxes = memo(() => {
  const { assetId = null } = useParams<{ assetId?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();
  const {
    createAdditionalTaxes,
    updateAdditionalTaxes,
    deleteAdditionalTaxes,
  } = useAdditionalTaxes();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "additionalTaxes",
    keyName: "additionalTaxes_id",
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
    const isValid = await trigger(`additionalTaxes.${index}`);
    if (!isValid) return;
    if (isValid) {
      const data = formGetValues();
      const values = data.additionalTaxes[index ?? -1];
      if (isEdit) {
        if (index !== null) {
          await updateAdditionalTaxes.mutate(
            { id: values._id, payload: { ...values } },
            {
              onSuccess: (res: any) => {
                console.log(res);
                update(index ?? -1, { ...values, _id: res._id });
                toast.success("Additional Taxes updated successfully");
              },
              onError: (error: any) => {
                console.log(error);
                toast.error("Failed to update Additional Taxes");
              },
            },
          );
        }
      } else {
        await createAdditionalTaxes.mutate(
          { assetId: assetId ?? "", payload: { ...values } },
          {
            onSuccess: (res: any) => {
              console.log(res);
              append({ ...values, _id: res._id });
              toast.success("Additional Taxes created successfully");
            },
            onError: (error: any) => {
              console.log(error);
              toast.error("Failed to create Additional Taxes");
            },
          },
        );
      }
      setIndex(null);
      clearErrors();
    }
  };

  const handleOnDelete = async () => {
    if (deleteIndex === null) return;
    const data = formGetValues();
    const values = data.additionalTaxes[deleteIndex];
    await deleteAdditionalTaxes.mutate(values._id, {
      onSuccess: (res: any) => {
        console.log(res);
        remove(deleteIndex);
        toast.success("Additional Taxes deleted successfully");
      },
      onError: (error: any) => {
        console.log(error);
        toast.error("Failed to delete Additional Taxes");
      },
    });
    setDeleteIndex(null);
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
          title={`Additional Taxes`}
          addButtonText={`Add Additional Taxes`}
          emptyStateMessage={`No Additional Taxes found`}
        />
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold p-2">
                {isEdit ? "Edit" : "Add"} Additional Taxes
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {FormGenerator(additionalTaxesFormConfig({ index: index ?? -1 }))}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onOpenChange}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={onSubmit}
                  disabled={
                    createAdditionalTaxes.isPending ||
                    updateAdditionalTaxes.isPending
                  }
                >
                  {createAdditionalTaxes.isPending ||
                  updateAdditionalTaxes.isPending
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
                Delete Additional Taxes
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Are you sure you want to delete this Additional Taxes?</p>
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

export default AdditionalTaxes;
