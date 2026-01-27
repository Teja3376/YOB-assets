import { lazy, Suspense, memo, useState } from "react";
const VerticleTable = lazy(() => import("@/components/ui/VerticleTable"));
import { useFieldArray, useFormContext } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/CustomDialog";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/use-form/FormGenerator";
import { faqFormConfig } from "@/modules/Assets/form-config/TermsAndConditions/faqFormConfig";
// import { useFaqApi } from "@/hooks/asset/useFqsApi";
import { useParams } from "next/navigation";
import useFAQ from "@/modules/Assets/hooks/TermsAndConditions/useFAQ";
import { toast } from "sonner";

const Faq = memo(() => {
  const { assetId = null } = useParams<{ assetId?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();
  const { createFAQ, updateFAQ, deleteFAQ } = useFAQ();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "faqs",
    keyName: "faq_id",
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
    const isValid = await trigger(`faqs.${index}`);

    if (!isValid) return;

    const data = formGetValues();
    const values = data.faqs[index ?? -1];

    if (isEdit) {
      if (index !== null) {
        await updateFAQ.mutateAsync({
          id: values._id ?? "",
          payload: { ...values },
        }, {
          onSuccess: (res: any) => {
            console.log(res);
            update(index ?? -1, { ...values, _id: res._id });
            toast.success('Faq updated successfully');
          },
          onError: (error: any) => {
            console.log(error);
            toast.error('Failed to update Faq');
          }
        });
      }
      update(index ?? -1, { ...values });
    } else {
      const res: any = await createFAQ.mutateAsync({
        assetId: assetId ?? "",
        payload: { ...values },
      }, {
        onSuccess: (res: any) => {
          console.log(res);
          append({ ...values, _id: res._id });
          toast.success('Faq created successfully');
        },
        onError: (error: any) => {
          console.log(error);
          toast.error('Failed to create Faq');
        }
      });
    }

    setIndex(null);
    clearErrors();
  };

  const handleOnDelete = async () => {
    setDeleteIndex(null);
    const data = formGetValues();
    const values = data.faqs[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteFAQ.mutate(values._id ?? '', {
        onSuccess: (res: any) => {
          console.log(res);
          toast.success('Faq deleted successfully');
        },
        onError: (error: any) => {
          console.log(error);
          toast.error('Failed to delete Faq');
        }
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
          title={`FAQ`}
          addButtonText={`Add Faq`}
          emptyStateMessage={`No Faq found`}
        />
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold p-2">
                {isEdit ? "Edit" : "Add"} Faq
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {FormGenerator(faqFormConfig({ index: index ?? -1 }))}
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
                Delete Faq
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Are you sure you want to delete this Faq?</p>
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

export default Faq;
