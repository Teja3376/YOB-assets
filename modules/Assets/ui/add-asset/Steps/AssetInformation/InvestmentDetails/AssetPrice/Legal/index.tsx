import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "next/navigation";
// import { useFee } from "@/hooks/asset/useFee";
import { formConfig } from "@/modules/Assets/form-config/AssetInformation/feeconfig";
import AccordionComponent from "./AccordionComponent";
import DialogComponent from "./DialogComponent";
import DeleteDialogComponent from "./DeleteDialogComponent";
import { toast } from "sonner";
import { useCreateFee } from "@/modules/Assets/hooks/fees/useCreateFee";
import { useUpdateFee } from "@/modules/Assets/hooks/fees/useUpdateFee";
import useDeleteFee from "@/modules/Assets/hooks/fees/useDeleteFee";

const Index = () => {
  // const { createFee, updateFee, deleteFee } = useFee();
  const { mutate: createFee, isPending: isCreatePending } = useCreateFee();
  const { mutate: updateFee, isPending: isUpdatePending } = useUpdateFee();
  const { mutate: deleteFee, isPending: isDeletePending } = useDeleteFee();
  const { assetId = null } = useParams<{ assetId?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
    reset,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "fees.legal",
    keyName: "fr_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleAdd = () => {
    setIndex(-1);
    reset();
  };

  const onSubmit = async () => {
    const valid = await trigger(`fees.legal.${index}`);

    if (!valid) return;

    const data = formGetValues();
    console.log("Submitting fee data:", data.fees.legal);

    const values = data.fees.legal[index ?? -1];
    console.log("Submitting fee values:", values);

    // EDIT MODE
    if (isEdit && index !== null) {
      const { assetId, issuerId, createdAt, updatedAt, __v, _id, ...feeData } =
        values;
      updateFee(
        {
          feeData: { ...feeData, type: "legal" },
          feeId: values._id ?? "",
        },
        {
          onSuccess: (res: any) => {
            update(index, values);
            setIndex(null);
            clearErrors();
            toast.success("Fee updated successfully");
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message ||
                "Failed to update fee. Please try again.",
            );
          },
        },
      );

      return;
    }

    // CREATE MODE
    createFee(
      {
        feeData: { ...values, type: "legal" },
        assetId: assetId ?? "",
      },
      {
        onSuccess: (res: any) => {
          append({ ...values, _id: res._id });
          setIndex(null);
          clearErrors();
          toast.success("Fee added successfully");
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ||
              "Failed to add fee. Please try again.",
          );
        },
      },
    );
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

  const handleOnDelete = async () => {
    if (deleteIndex === null) return;

    const data = formGetValues();
    const values = data.fees.legal[deleteIndex];

    deleteFee(values._id ?? "", {
      onSuccess: (res: any) => {
        remove(deleteIndex);
        setIndex(null);
        setDeleteIndex(null);
        toast.success("Fee deleted successfully");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            "Failed to delete fee. Please try again.",
        );
      },
    });
  };

  const totalNumberOfSfts = formGetValues("totalNumberOfSfts");
  const pricePerSft = formGetValues("pricePerSft");

  return (
    <div className="flex flex-col w-full ">
      <div className="space-y-2 mt-2">
        <AccordionComponent
          fields={fields}
          update={update}
          setIndex={setIndex}
          setDeleteIndex={setDeleteIndex}
          handleAdd={handleAdd}
          totalNumberOfSfts={totalNumberOfSfts}
          pricePerSft={pricePerSft}
        />
      </div>
      <DialogComponent
        isOpen={isOpen}
        isEdit={isEdit}
        index={index}
        formConfig={formConfig}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      />
      <DeleteDialogComponent
        deleteIndex={deleteIndex}
        setDeleteIndex={setDeleteIndex}
        handleOnDelete={handleOnDelete}
      />
    </div>
  );
};

export default Index;
