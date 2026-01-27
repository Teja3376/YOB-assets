import { useState } from "react";
import { StructureTable } from "./StructureTable";
import { structureFormConfig } from "@/modules/Assets/form-config/Issue&Due/structureFormConfig";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "next/navigation";
// import { useStructure } from "@/hooks/asset/useStructure";
import StructureDialog from "./StructureDialog";
import DeleteStructureDialog from "./DeleteStructureDialog";
import StructureHeader from "./StructureHeader";
import { useCreateStructure } from "@/modules/Assets/hooks/Issuer&Due/DueDiligence/Structure/useCreateStructure";
import { useUpdateStructure } from "@/modules/Assets/hooks/Issuer&Due/DueDiligence/Structure/useUpdateStructure";
import useDeleteStructure from "@/modules/Assets/hooks/Issuer&Due/DueDiligence/Structure/useDeleteStructure";
import { toast } from "sonner";

const Index = () => {
  // const { createStructure, updateStructure, deleteStructure } = useStructure();
  const { mutate: createStructure, isPending: isCreating } =
    useCreateStructure();
  const { mutate: updateStructure, isPending: isUpdating } =
    useUpdateStructure();
  const { mutate: deleteStructure, isPending: isDeleting } =
    useDeleteStructure();
  const { assetId } = useParams<{ assetId?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "dueDiligence.structure",
    keyName: "structure_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const isOpen = index !== null;
  const isEdit = index !== -1;

  const handleAdd = () => {
    setIndex(-1);
  };

  const onSubmit = async () => {
    const valid = await trigger(`dueDiligence.structure.${index}`);
    if (!valid) return;
    const data = formGetValues();
    console.log("Submitting legal data:", data.dueDiligence.structure);
    const values = data.dueDiligence.structure[index ?? -1];
    if (isEdit && index !== null) {
      const { structure_id, ...data } = values;
      updateStructure(
        { structureData: data, structureId: data._id },
        {
          onSuccess: (res: any) => {
            console.log("Structure updated successfully:", res);
            update(index ?? -1, { ...values });
            toast.success("Structure updated successfully");
            clearErrors();
            setIndex(null);
          },
          onError: (error: any) => {
            console.error("Error updating structure:", error);
            toast.error(
              error?.response?.data?.message || "Failed to update structure",
            );
          },
        },
      );
    } else {
      createStructure(
        { structureData: values, assetId: assetId ?? "" },
        {
          onSuccess: (res: any) => {
            console.log("Structure created successfully:", res);
            append({ ...values, _id: res._id });
            toast.success("Structure created successfully");
            clearErrors();
            setIndex(null);
          },
          onError: (error: any) => {
            console.error("Error creating structure:", error);
            toast.error(
              error?.response?.data?.message || "Failed to create structure",
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
    const values = data.dueDiligence.structure[deleteIndex];

    deleteStructure(values._id ?? "", {
      onSuccess: (res: any) => {
        remove(deleteIndex);
        setIndex(null);
        setDeleteIndex(null);
        toast.success("Structure deleted successfully");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            "Failed to delete structure. Please try again.",
        );
      },
    });
  };

  return (
    <div className="flex flex-col w-full">
      <StructureHeader onAdd={handleAdd} />
      <div className="space-y-2 mt-2">
        <StructureTable
          fields={fields}
          setIndex={setIndex}
          setDeleteIndex={setDeleteIndex}
        />
      </div>
      <StructureDialog
        isOpen={isOpen}
        isEdit={isEdit}
        index={index}
        formConfig={structureFormConfig}
        onSubmit={onSubmit}
        onOpenChange={onOpenChange}
        isLoading={isCreating || isUpdating}
      />
      <DeleteStructureDialog
        deleteIndex={deleteIndex}
        onCancel={() => setDeleteIndex(null)}
        onDelete={handleOnDelete}
      />
    </div>
  );
};

export default Index;
