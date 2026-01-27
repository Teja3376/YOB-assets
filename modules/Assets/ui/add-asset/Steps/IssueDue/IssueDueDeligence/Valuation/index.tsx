import { use, useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "next/navigation";
// import { useValuation } from "@/hooks/asset/useValuation";
import ValuationDialog from "./ValuationDialog";
import DeleteValuationDialog from "./DeleteValuationDialog";
import ValuationHeader from "./ValuationHeader";
import ValuationTable from "./ValuationTable";
import { valuationFormConfig } from "@/modules/Assets/form-config/Issue&Due/valuationFormConfig";
import { valuationFormConfigTwo } from "@/modules/Assets/form-config/Issue&Due/valuationFormConfigTwo";
import FormGenerator from "@/components/use-form/FormGenerator";
import { useCreateValuation } from "@/modules/Assets/hooks/Issuer&Due/DueDiligence/Valuation/useCreateValuation";
import { useUpdateValuation } from "@/modules/Assets/hooks/Issuer&Due/DueDiligence/Valuation/useUpdateValuation";
import useDeleteValuation from "@/modules/Assets/hooks/Issuer&Due/DueDiligence/Valuation/useDeleteValuation";
import { toast } from "sonner";

const Index = () => {
  // const { createValuation, updateValuation, deleteValuation } = useValuation();
  const { mutate: createValuation, isPending: isCreating } =
    useCreateValuation();
  const { mutate: updateValuation, isPending: isUpdating } =
    useUpdateValuation();
  const { mutate: deleteValuation, isPending: isDeleting } =
    useDeleteValuation();
  const { assetId } = useParams<{ assetId?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "dueDiligence.valuation",
    keyName: "valuation_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const isOpen = index !== null;
  const isEdit = index !== -1;

  const handleAdd = () => {
    setIndex(-1);
  };

  const onSubmit = async () => {
    const valid = await trigger(`dueDiligence.valuation.${index}`);
    if (!valid) return;
    const data = formGetValues();
    console.log("Submitting legal data:", data.dueDiligence.valuation);
    const values = data.dueDiligence.valuation[index ?? -1];
    if (isEdit && index !== null) {
      const { valuation_id, ...data } = values;
      console.log("Updating legal with ID:", data);
      updateValuation(
        { valuationData: data, valuationId: data._id },
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
      createValuation(
        { valuationData: values, assetId: assetId ?? "" },
        {
          onSuccess: (res: any) => {
            console.log("Valuation created successfully:", res);
            append({ ...values, _id: res._id });
            toast.success("Valuation created successfully");
            clearErrors();
            setIndex(null);
          },
          onError: (error: any) => {
            console.error("Error creating valuation:", error);
            toast.error(
              error?.response?.data?.message || "Failed to create valuation",
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
    const values = data.dueDiligence.valuation[deleteIndex];

    deleteValuation(values._id ?? "", {
      onSuccess: (res: any) => {
        remove(deleteIndex);
        setIndex(null);
        setDeleteIndex(null);
        toast.success("Valuation deleted successfully");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            "Failed to delete valuation. Please try again.",
        );
      },
    });
  };

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (info: any) => info.getValue() || "N/A",
      enableResize: true,
      size: 100,
    },
    {
      header: "Location",
      accessorKey: "location",
      cell: (info: any) => info.getValue() || "N/A",
      enableResize: true,
      size: 100,
    },
    {
      header: "Link",
      accessorKey: "link",
      cell: (info: any) => {
        const value = info.getValue();
        return (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {value}
          </a>
        );
      },
      enableResize: true,
      size: 100,
    },
    {
      header: "Logo",
      accessorKey: "logoUrl",
      cell: (info: any) => {
        const value = info.getValue();
        return value ? (
          <img
            src={value}
            alt="Logo"
            className="w-full h-full object-contain"
          />
        ) : (
          "N/A"
        );
      },
      enableResize: true,
      size: 100,
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <ValuationHeader onAdd={handleAdd} />

      <div className="space-y-2 mt-2">
        <ValuationTable
          fields={fields}
          setIndex={setIndex}
          setDeleteIndex={setDeleteIndex}
        />
      </div>
      <ValuationDialog
        isOpen={isOpen}
        isEdit={isEdit}
        index={index}
        formConfig={valuationFormConfig}
        onSubmit={onSubmit}
        onOpenChange={onOpenChange}
        isLoading={isCreating || isUpdating}
      />
      <DeleteValuationDialog
        deleteIndex={deleteIndex}
        onCancel={() => setDeleteIndex(null)}
        onDelete={handleOnDelete}
      />

      <div className="grid grid-cols-2 gap-4 mt-6">
        {FormGenerator(valuationFormConfigTwo())}
      </div>
    </div>
  );
};

export default Index;
