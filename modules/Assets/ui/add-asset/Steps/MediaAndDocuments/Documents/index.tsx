import { use, useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "next/navigation";
// import { useAssetDocument } from "@/hooks/asset/useAssetDocument";
import formConfig from "../../../../../form-config/Media&Documents/documentsFormConfig";
import DocumentsDialog from "./DocumentsDialog";
import DeleteDocumentsDialog from "./DeleteDocumentsDialog";
import DocumentsHeader from "./DocumentsHeader";
import DocumentsTable from "./DocumentsTable";
import { useCreateDocument } from "@/modules/Assets/hooks/MediaDocuments/documents/useCreateDocument";
import useDeleteDocument from "@/modules/Assets/hooks/MediaDocuments/documents/useDeleteDocument";
import useUpdateDocument from "@/modules/Assets/hooks/MediaDocuments/documents/useUpdateDocument";
import { toast } from "sonner";

const Index = () => {
  // const { createDocument, updateDocument, deleteDocument } = useAssetDocument();
  // const [createDocument, setCreateDocument] = useState<any>(null);
  // const [updateDocument, setUpdateDocument] = useState<any>(null);
  // const [deleteDocument, setDeleteDocument] = useState<any>(null);

  const { mutate: createDocument, isPending: isCreating } = useCreateDocument();
  const { mutate: deleteDocument, isPending: isDeleting } = useDeleteDocument();
  const { mutate: updateDocument, isPending: isUpdating } = useUpdateDocument();
  const { assetId } = useParams<{ assetId?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "documents",
    keyName: "document_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [updateIndex, setUpdateIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleAdd = () => {
    setIndex(-1);
  };

  const onSubmit = async () => {
    const valid = await trigger(`documents.${index}`);
    if (!valid) return;
    const data = formGetValues();
    console.log("Submitting document data:", data.documents);
    const values = data.documents[index ?? -1];
    if (isEdit && index !== null) {
      const { document_id, ...data } = values;
      updateDocument(
        { documentData: data, documentId: values._id },
        {
          onSuccess: (res: any) => {
            console.log("Document updated successfully:", res);
            update(index ?? -1, { ...values });
            toast.success("Document updated successfully");
            clearErrors();
            setIndex(null);
          },
          onError: (error: any) => {
            console.error("Error updating document:", error);
            toast.error(
              error?.response?.data?.message || "Failed to update document",
            );
          },
        },
      );
    } else {
      // const data = {
      //   name: values.name,
      //   value: values.value,
      //   isPercentage: values.isPercentage ? values.isPercentage : false,
      //   status: values.status ? values.status : false,
      // };
      createDocument(
        { documentData: values, assetId: assetId ?? "" },
        {
          onSuccess: (res: any) => {
            console.log("Document created successfully:", res);
            append({ ...values, _id: res._id });
            toast.success("Document created successfully");
            clearErrors();
            setIndex(null);
          },
          onError: (error: any) => {
            console.error("Error creating document:", error);
            toast.error(
              error?.response?.data?.message || "Failed to create document",
            );
          },
        },
      );
    }
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
    const values = data.documents[deleteIndex];

    deleteDocument(values._id ?? "", {
      onSuccess: (res: any) => {
        remove(deleteIndex);
        setIndex(null);
        setDeleteIndex(null);
        toast.success("Document deleted successfully");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            "Failed to delete document. Please try again.",
        );
      },
    });
  };

  return (
    <div className="flex flex-col w-full">
      <DocumentsHeader onAdd={handleAdd} />
      <div className="space-y-2 mt-2">
        <DocumentsTable
          fields={fields}
          setIndex={setIndex}
          setDeleteIndex={setDeleteIndex}
          update={update}
          setEditIndex={setIndex}
        />
      </div>
      <DocumentsDialog
        isOpen={isOpen}
        isEdit={isEdit}
        index={index}
        formConfig={formConfig}
        onSubmit={onSubmit}
        onOpenChange={onOpenChange}
        isLoading={isCreating || isUpdating}
      />
      <DeleteDocumentsDialog
        deleteIndex={deleteIndex}
        onCancel={() => setDeleteIndex(null)}
        onDelete={handleOnDelete}
      />
    </div>
  );
};

export default Index;
