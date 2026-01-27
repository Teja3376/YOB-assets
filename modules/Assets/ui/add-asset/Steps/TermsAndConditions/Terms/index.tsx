import { lazy, Suspense, memo, useState } from "react";
const VerticleTable = lazy(() => import("@/components/ui/VerticleTable"));
import { useFieldArray, useFormContext } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/CustomDialog";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/use-form/FormGenerator";
import { useParams } from "next/navigation";
import { termsFormConfig } from "@/modules/Assets/form-config/TermsAndConditions/termsFormConfig";
// import { useTermsApi } from "@/hooks/asset/useTermsApi";
import useTermsAndConditions from "@/modules/Assets/hooks/TermsAndConditions/useTermsAndConditions";
import { toast } from "sonner";

const Terms = memo(() => {
  const { assetId = null } = useParams<{ assetId?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();
  // const { createTerms, updateTerms, deleteTerms } = useTermsApi();
  const { createTermsAndConditions, updateTermsAndConditions, deleteTermsAndConditions } = useTermsAndConditions();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "termsAndConditions",
    keyName: "terms_id",
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
    const isValid = await trigger(`termsAndConditions.${index}`);

    if (!isValid) return;

    const data = formGetValues();
    const values = data.termsAndConditions[index ?? -1];

    if (isEdit && index !== null) {
      await updateTermsAndConditions.mutateAsync(
        { id: values._id, payload: { ...values } },
        {
          onSuccess: (res: any) => {
            console.log(res);
            update(index ?? -1, { ...values, _id: res._id });
            toast.success("Terms and Conditions updated successfully");
          },
          onError: (error: any) => {
            toast.error("Failed to update Terms and Conditions");
            console.log(error);
          },
        }
      );
    } else {
      const res: any = await createTermsAndConditions.mutateAsync(
        {
          assetId: assetId ?? "",
          payload: { ...values },
        },
        {
          onSuccess: (res: any) => {
            console.log(res);
            append({ ...values, _id: res._id });  
            toast.success('Terms and Conditions created successfully');
          },
          onError: (error: any) => {
            toast.error("Failed to Create Terms and Conditions");
            console.log(error);
          },
        }
      );
      
    }

    setIndex(null);
    clearErrors();
  };


  const handleOnDelete = async () => {
    setDeleteIndex(null);
    const data = formGetValues();
    const values = data.termsAndConditions[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteTermsAndConditions.mutate(values._id ?? '', {
        onSuccess: (res: any) => {
          console.log(res);
          toast.success('Terms and Conditions deleted successfully');
        },
        onError: (error: any) => {
          toast.error('Failed to delete Terms and Conditions');
          console.log(error);
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
          title={`Terms and Conditions`}
          addButtonText={`Add Terms and Conditions`}
          emptyStateMessage={`No Terms and Conditions found`}
        />
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold p-2">
                {isEdit ? "Edit" : "Add"} Terms and Conditions
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {FormGenerator(termsFormConfig({ index: index ?? -1 }))}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onOpenChange}>
                  Cancel
                </Button>
                <Button type="button" onClick={onSubmit}>
                  Submit
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
                Delete Terms and Conditions
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Are you sure you want to delete this Terms and conditions?</p>
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

export default Terms;
