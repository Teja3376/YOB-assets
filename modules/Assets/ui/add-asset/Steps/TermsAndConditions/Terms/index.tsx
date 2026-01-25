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

const Terms = memo(() => {
  const { assetId = null } = useParams<{ assetId?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();
  // const { createTerms, updateTerms, deleteTerms } = useTermsApi();
  const [createTerms, setCreateTerms] = useState<any>(null);
  const [updateTerms, setUpdateTerms] = useState<any>(null);
  const [deleteTerms, setDeleteTerms] = useState<any>(null);
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
    trigger(`termsAndConditions.${index}`).then(async (isValid) => {
      if (isValid) {
        const data = formGetValues();
        const values = data.termsAndConditions[index ?? -1];
        if (isEdit) {
          if (index !== null) {
            await updateTerms(values._id, { ...values });
          }
          update(index ?? -1, { ...values });
        } else {
          await createTerms({ ...values, assetId: assetId }).then((res: any) => {
            append({ ...values, _id: res._id });
          });
        }
        setIndex(null);
        clearErrors();
      }
    });
  };

  const handleOnDelete = async () => {
    setDeleteIndex(null);
    const data = formGetValues();
    const values = data.termsAndConditions[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteTerms(values._id);
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
