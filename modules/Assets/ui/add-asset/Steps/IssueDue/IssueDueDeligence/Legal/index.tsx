import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "next/navigation";
// import { useLegal } from "@/hooks/asset/useLegal";
import { LegalDialog } from "./LegalDialog";
import { DeleteDialog } from "./DeleteDialog";
import { LegalTable } from "./LegalTable";
import { useCreateLegal } from "@/modules/Assets/hooks/Issuer&Due/DueDiligence/Legal/useCreateLegal";
import { useUpdateLegal } from "@/modules/Assets/hooks/Issuer&Due/DueDiligence/Legal/useUpdateLegal";
import useDeleteLegal from "@/modules/Assets/hooks/Issuer&Due/DueDiligence/Legal/useDeleteLegal";
import { toast } from "sonner";

const Index = () => {
  // const { createLegal, updateLegal, deleteLegal } = useLegal();
  // const [createLegal, setCreateLegal] = useState<any>(null);
  // const [updateLegal, setUpdateLegal] = useState<any>(null);
  // const [deleteLegal, setDeleteLegal] = useState<any>(null);

  const { mutate: createLegal, isPending: createLegalPending } =
    useCreateLegal();
  const { mutate: updateLegal, isPending: updateLegalPending } =
    useUpdateLegal();
  const { mutate: deleteLegal, isPending: deleteLegalPending } =
    useDeleteLegal();
  const { assetId } = useParams<{ assetId?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "dueDiligence.legal",
    keyName: "legal_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const isOpen = index !== null;
  const isEdit = index !== -1;

  const handleAdd = () => {
    setIndex(-1);
  };

  const onSubmit = async () => {
    const valid = await trigger(`dueDiligence.legal.${index}`);
    if (!valid) return;
    const data = formGetValues();
    console.log("Submitting legal data:", data.dueDiligence.legal);
    const values = data.dueDiligence.legal[index ?? -1];
    if (isEdit && index !== null) {
      const { legal_id, ...data } = values;
      console.log("Updating legal with ID:", data);
      updateLegal(
        { legalData: data, legalId: data._id },
        {
          onSuccess: (res: any) => {
            console.log("Legal updated successfully:", res);
            update(index ?? -1, { ...values });
            toast.success("Legal updated successfully");
            clearErrors();
            setIndex(null);
          },
          onError: (error: any) => {
            console.error("Error updating legal:", error);
            toast.error(
              error?.response?.data?.message || "Failed to update legal",
            );
          },
        },
      );
    } else {
      createLegal(
        { legalData: values, assetId: assetId ?? "" },
        {
          onSuccess: (res: any) => {
            console.log("Legal created successfully:", res);
            append({ ...values, _id: res._id });
            toast.success("Legal created successfully");
            clearErrors();
            setIndex(null);
          },
          onError: (error: any) => {
            console.error("Error creating legal:", error);
            toast.error(
              error?.response?.data?.message || "Failed to create legal",
            );
          },
        },
      );
    }
  };
  const onOpenChange = () => {
    const previousValues = index !== null ? fields[index] : {};
    if (index !== null) {
      update(index, previousValues);
    }
    setIndex(null);
  };

  const handleOnDelete = async () => {
    if (deleteIndex === null) return;

    const data = formGetValues();
    const values = data.dueDiligence.legal[deleteIndex];

    deleteLegal(values._id ?? "", {
      onSuccess: (res: any) => {
        remove(deleteIndex);
        setIndex(null);
        setDeleteIndex(null);
        toast.success("Legal deleted successfully");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            "Failed to delete legal. Please try again.",
        );
      },
    });
  };

  return (
    <div className="flex flex-col w-full ">
      <div className="flex justify-between items-center  ">
        <h1 className="text-lg font-bold text-gray-800">Legal</h1>
        <Button
          type="button"
          className=" text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
          onClick={handleAdd}
        >
          <span className="text-lg">+</span>
          <span>Add Legal</span>
        </Button>
      </div>
      <div className="space-y-2 mt-2">
        <LegalTable
          fields={fields}
          setIndex={setIndex}
          setDeleteIndex={setDeleteIndex}
        />
      </div>
      <LegalDialog
        isOpen={isOpen}
        isEdit={isEdit}
        index={index}
        assetId={assetId}
        onSubmit={onSubmit}
        onOpenChange={onOpenChange}
        isLoading={createLegalPending || updateLegalPending}
      />
      <DeleteDialog
        isOpen={deleteIndex !== null}
        onConfirm={handleOnDelete}
        onCancel={() => setDeleteIndex(null)}
      />
    </div>
  );
};

export default Index;
