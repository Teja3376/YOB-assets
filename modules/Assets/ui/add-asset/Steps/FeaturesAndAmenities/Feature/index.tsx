import { useState } from "react";
import { EditIcon, TrashIcon } from "lucide-react";
import TableComponent from "@/common/TableComponent";
import { featureFormConfig } from "@/modules/Assets/form-config/Features&Amenties/featureFormConfig";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "next/navigation";
import { DialogHeader } from "@/components/ui/CustomDialog";
import FormGenerator from "@/components/use-form/FormGenerator";
import { Button } from "@/components/ui/button";
// import { useFeature } from "@/hooks/asset/useFeature";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import useFeature from "@/modules/Assets/hooks/FeaturesAndAmenties/useFeature";

const TenantManagement = () => {
  const { createFeature, updateFeature, deleteFeature } = useFeature();
  const { assetId } = useParams<{ assetId: string }>();
  const {
    watch,
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "features",
    keyName: "features_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleAdd = () => {
    setIndex(-1);
  };
  const action = [
    {
      header: "Edit",
      accessorKey: "edit",
      icon: <EditIcon />,
      onClick: (item: any) => {
        const findIndex = fields.findIndex(
          (field) => field.features_id === item.features_id
        );
        setIndex(findIndex);
      },
    },
    {
      header: "Delete",
      accessorKey: "delete",
      icon: <TrashIcon />,
      onClick: (item: any) => {
        const findIndex = fields.findIndex(
          (field) => field.features_id === item.features_id
        );
        setDeleteIndex(findIndex);
      },
    },
  ];

  const onSubmit = async () => {
    const isValid = await trigger(`features.${index}`);

    if (!isValid) return;

    const data = formGetValues();
    const values = data.features[index ?? -1];

    if (isEdit) {
      if (index !== null) {
        const { name, description, image, status } = values;
        await updateFeature.mutate(
          {
            id: values._id,
            payload: {
              name,
              description,
              image,
              status,
            },
          },
          {
            onSuccess: (res: any) => {
              console.log(res);
              update(index ?? -1, { ...values, _id: res._id });
              toast.success("Feature updated successfully");
              setIndex(null);
            },
            onError: (error: any) => {
              console.log(error);
              toast.error("Failed to update feature");
            },
          }
        );
      }
    } else {
      const payload = {
        name: values.name,
        description: values.description,
        image: values.image || "https://picsum.photos/200/300",
        status: values.status,
      };
      await createFeature.mutate(
        { assetId: assetId ?? "", payload: { ...payload } },
        {
          onSuccess: (res: any) => {
            console.log(res);
            append({ ...values, _id: res._id });
            toast.success("Feature created successfully");
            setIndex(null);
          },
          onError: (error: any) => {
            console.log(error);
            toast.error("Failed to create feature");
          },
        }
      );
    }

    setIndex(null);
    clearErrors();
  };

  const handleStatusChange = async  (e: any, rowData: any) => {
    updateFeature.mutate(
      {
        id: rowData._id,
        payload: {
          name: rowData.name,
          description: rowData.description,
          image: rowData.image,
          status: e,
        },
      },
      {
        onSuccess: (res: any) => {
          console.log(res);
          update(rowData.index, { ...rowData, status: e });
          toast.success("Feature updated successfully status");
        },
        onError: (error: any) => {
          console.log(error);
          toast.error("Failed to update feature status");
        },
      }
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
    const values = data.features[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      await deleteFeature.mutate(values._id, {
        onSuccess: (res: any) => {
          console.log(res);
          remove(deleteIndex);
          toast.success('Feature deleted successfully');
        },
        onError: (error: any) => {
          console.log(error);
          toast.error('Failed to delete feature');
        }
      });
    }
  };

  const columns = [
    {
      header: "Image",
      accessorKey: "image",
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <img
            src={rowData.image}
            alt={rowData.name}
            className="w-16 h-16 rounded-md"
          />
        );
      },
    },

    {
      header: "Feature",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <Switch
            checked={rowData.status}
            onCheckedChange={(e) => handleStatusChange(e, rowData)}
          />
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "action",

      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <div className="flex gap-2">
            {action.map((item) => (
              <Button
                key={item.header}
                type="button"
                variant="outline"
                onClick={() => item.onClick(rowData)}
              >
                {item.icon}
              </Button>
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col w-full ">
      <div className="flex justify-between items-center  ">
        <h1 className="text-lg font-bold text-gray-800">Feature</h1>
        <Button
          type="button"
          className=" text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
          onClick={handleAdd}
        >
          <span className="text-lg">+</span>
          <span>Add Feature</span>
        </Button>
      </div>
      <div className="space-y-2 mt-2">
        <TableComponent columns={columns} data={fields} model="feature" />
      </div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit" : "Add"} Feature</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4">
              {FormGenerator(featureFormConfig(index ?? -1))}
            </div>
            <DialogFooter className="flex justify-end w-full mt-4">
              <Button type="button" variant="outline" onClick={onOpenChange}>
                Cancel
              </Button>
              <Button type="button" onClick={onSubmit}>
                Submit
              </Button>
            </DialogFooter>
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
              Delete Feature
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to delete this Feature?</p>
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
  );
};

export default TenantManagement;
