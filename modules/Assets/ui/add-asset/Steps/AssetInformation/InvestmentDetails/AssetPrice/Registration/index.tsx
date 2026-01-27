import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "next/navigation";
import FeeDialog from "./FeeDialog";
import DeleteFeeDialog from "./DeleteFeeDialog";
import FeeTable from "./FeeTable";
import { Button } from "@/components/ui/button";
// import { useFee } from "@/hooks/asset/useFee";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formConfig } from "@/modules/Assets/form-config/AssetInformation/feeconfig";
import { useCreateFee } from "@/modules/Assets/hooks/AssetInformation/fees/useCreateFee";
import { useUpdateFee } from "@/modules/Assets/hooks/AssetInformation/fees/useUpdateFee";
import { toast } from "sonner";
import useDeleteFee from "@/modules/Assets/hooks/AssetInformation/fees/useDeleteFee";

const Index = () => {
  const { mutate: createFee, isPending: isCreatePending } = useCreateFee();

  const { mutate: updateFee, isPending: isUpdatePending } = useUpdateFee();
  const { mutate: deleteFee, isPending: isDeletePending } = useDeleteFee();
  // const [deleteFeeData, setDeleteFeeData] = useState<any>(null);

  const { assetId = null } = useParams<{ assetId?: string }>();
  console.log("Asset ID in Registration Fees:", assetId);
  const { control, getValues, clearErrors, trigger, resetField } =
    useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "fees.registration",
    keyName: "fr_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const isOpen = index !== null;
  const isEdit = index !== -1;

  const handleAdd = () => {
    setIndex(-1);
    resetField("fees.registration");
  };

  const onSubmit = async () => {
    const valid = await trigger(`fees.registration.${index}`);

    if (!valid) return;

    const data = getValues();
    console.log("Submitting fee data:", data.fees.registration);

    const values = data.fees.registration[index ?? -1];
    console.log("Submitting fee values:", values);

    // EDIT MODE
    if (isEdit && index !== null) {
      const { assetId, issuerId, createdAt, updatedAt, __v, _id, ...feeData } =
        values;
      updateFee(
        {
          feeData: { ...feeData, type: "registration" },
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
        feeData: { ...values, type: "registration" },
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

  const onOpenChange = () => {
    if (index !== null) {
      update(index, fields[index]);
    }
    setIndex(null);
  };

  const handleOnDelete = async () => {
    if (deleteIndex === null) return;

    const data = getValues();
    const values = data.fees.registration[deleteIndex];

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

    // TODO: call delete API here
    // await deleteFee(values._id);
  };

  const totalNumberOfSfts = getValues("totalNumberOfSfts");
  const pricePerSft = getValues("pricePerSft");

  return (
    <div className="flex flex-col w-full">
      <div className="space-y-2 mt-2">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-2" className="bg-gray-100 rounded-md">
            <AccordionTrigger className="p-4 text-lg font-bold text-gray-800">
              Registration
            </AccordionTrigger>

            <AccordionContent className="bg-white mx-2 my-3 space-y-2">
              <FeeTable
                fields={fields}
                update={update}
                setIndex={setIndex}
                setDeleteIndex={setDeleteIndex}
              />

              <Button
                type="button"
                disabled={!totalNumberOfSfts || !pricePerSft}
                variant="secondary"
                onClick={handleAdd}
                className="mx-2"
              >
                <span className="text-lg">+</span>
                <span>Add Fee</span>
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <FeeDialog
        isOpen={isOpen}
        isEdit={isEdit}
        index={index}
        formConfig={formConfig}
        onSubmit={onSubmit}
        onCancel={onOpenChange}
        isLoading={isCreatePending || isUpdatePending}
      />

      <DeleteFeeDialog
        isOpen={deleteIndex !== null}
        onDelete={handleOnDelete}
        onCancel={() => setDeleteIndex(null)}
      />
    </div>
  );
};

export default Index;
