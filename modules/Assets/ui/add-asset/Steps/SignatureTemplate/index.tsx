import { useRouter, useParams } from "next/navigation";
import { Suspense, lazy, memo, useEffect, useState } from "react";
import Loading from "@/components/ui/Loading";
const SignatureInvestor = lazy(() => import("./SignatureTable"));
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import SignatureDialog from "./SignatureDialog";
import DeleteDialog from "./DeleteDialog";
import { useDocumentTemplates } from "@/hooks/documents/useDocusealApi";
import { toast } from "sonner";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface Props {
  tab: string;
  step: string;
}

const COMPONENT_MAP = {
  location: (
    <Suspense fallback={<LoadingSpinner />}>
      <div>Location Component Placeholder</div>
    </Suspense>
  ),
} as const;

const SignatureInvestors = memo(({ tab, step }: Props) => {
  const { assetId } = useParams<{ assetId?: string }>();
  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
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

  const {
    watch,
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();
  const { fields, append, update, remove, replace } = useFieldArray({
    control,
    name: "signatureDocuments",
    keyName: "signatureDocuments_id",
  });

  const {
    fetchTemplates,
    createTemplate,
    updateTemplateById,
    deleteTemplateById,
    isLoading,
    templates,
  } = useDocumentTemplates(assetId as string | undefined);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  // Sync API templates into the form's field array
  useEffect(() => {
    if (templates.length > 0) {
      replace(templates);
    }
  }, [templates, replace]);

  const onSubmit = async () => {
    try {
      const newTemplate = {
        providerTemplateId: formGetValues(
          "signatureDocuments.providerTemplateId"
        ) as string,
        templateName: formGetValues("signatureDocuments.templateName"),
      };

      // create on backend
      const savedTemplate = await createTemplate(newTemplate);

      // push to fieldArray immediately
      append(savedTemplate);
      toast.success("Template added successfully");

      setIndex(null);
    } catch (err) {
      toast.error(`Failed to add template: ${(err as Error).message}`);
      setIndex(null);
    }
  };
  const handleOnDelete = async () => {
    if (deleteIndex !== null) {
      console.log("deleting");
      const values = formGetValues().signatureDocuments[deleteIndex];
      remove(deleteIndex); // remove from form
      await deleteTemplateById(values._id); // remove from backend
      toast.success("Template deleted successfully");
      setDeleteIndex(null);
    }
  };
  const handleOnUpdate = async (
    index: number,
    payload: { templateName: string; providerTemplateId: string }
  ) => {
    const values = fields[index] as any;
    await updateTemplateById(values._id, payload);
    update(index, { ...values, ...payload });
  };

  return (
    <Suspense fallback={<div>Location Information...</div>}>
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-lg font-semibold text-black">
          Document For Investors
        </h1>
        <Button type="button" onClick={handleAdd}>
          <span className="text-lg">+</span>
          <span>Add Template</span>
        </Button>
      </div>
      <div className="mt-4">
        <SignatureInvestor
          fields={fields}
          actionHandlers={{
            onEdit: (item: any) => {
              const findIndex = fields.findIndex(
                (field) =>
                  field.signatureDocuments_id === item.signatureDocuments_id
              );
              setIndex(findIndex);
            },
            onDelete: (item: any) => {
              const findIndex = fields.findIndex(
                (field) =>
                  field.signatureDocuments_id === item.signatureDocuments_id
              );
              setDeleteIndex(findIndex);
            },
          }}
          update={update}
        />
      </div>

      <SignatureDialog
        isOpen={isOpen}
        isEdit={isEdit}
        index={index}
        initialValues={index !== null ? fields[index] : null}
        onClose={onOpenChange}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
      <DeleteDialog
        isOpen={deleteIndex !== null}
        onClose={() => setDeleteIndex(null)}
        onDelete={handleOnDelete}
      />
    </Suspense>
  );
});

SignatureInvestors.displayName = "Investors Signature";

export default SignatureInvestors;
