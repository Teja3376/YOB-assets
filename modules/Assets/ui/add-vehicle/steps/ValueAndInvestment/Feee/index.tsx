import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { useFee } from "@/hooks/asset/useFee";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formConfig } from "@/modules/Assets/form-config/AssetInformation/feeconfig";
import FeeTable from "./FeeTable";
import FeeDialog from "./FeeDialog";
import DeleteFeeDialog from "./DeleteFeeDialog";
import { useAddFee } from "@/modules/Assets/hooks/vehicle/useAddFee";
import { useUpdateFee } from "@/modules/Assets/hooks/vehicle/useUpdateFee";
import useDeleteFee from "@/modules/Assets/hooks/vehicle/useDeleteFee";
import { toast } from "sonner";
import { feeConfig } from "@/modules/Assets/form-config/Vehicles/ValueInvestment/feeConfig";

const Index = () => {
  // const { createFee, updateFee, deleteFee } = useFee();
  // const [createFee, setCreateFee] = useState<any>(null);
  const { mutate: createFee, isPending: isCreatePending } = useAddFee();
  const { mutate: updateFee, isPending: isUpdatePending } = useUpdateFee();
  const { mutate: deleteFee, isPending: isDeletePending } = useDeleteFee();
  const { assetId = null } = useParams<{ assetId?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
    watch,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "fees",
    keyName: "fr_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleAdd = () => {
    setIndex(-1);
  };

 const onSubmit = async () => {
    const valid = await trigger(`fees.${index}`);

    if (!valid) return;

    const data = formGetValues();
    console.log("Submitting fee data:", data.fees);

    const values = data.fees[index ?? -1];
    console.log("Submitting fee values:", values);

    // EDIT MODE
    if (isEdit && index !== null) {
      const { assetId, issuerId, createdAt, updatedAt, __v, _id, ...feeData } =
        values;
      updateFee(
        {
          feeData: { ...feeData},
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
        feeData: { ...values },
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
    setDeleteIndex(null);
    const data = formGetValues();
    const values = data.fees[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteFee(values._id);
    }
  };

  const startingValue = formGetValues("investmentStats.startingValue");
  // const pricePerSft = formGetValues("pricePerSft");

  return (
    <div className="flex flex-col w-full">
      <div className="space-y-2 mt-2">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-2" className="bg-gray-100 rounded-md">
            <AccordionTrigger className="p-4 text-lg font-bold text-gray-800">
              Fees
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
                disabled={!startingValue}
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
        formConfig={feeConfig}
        onSubmit={onSubmit}
        onCancel={onOpenChange}
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
