import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "next/navigation";
// import { useTenant } from "@/hooks/asset/useTenant";
// import { useAssetApi } from "@/hooks/asset/useAssetApi";
import TenantTable from "./TenantTable";
import AddEditTenantDialog from "./AddEditTenantDialog";
import DeleteTenantDialog from "./DeleteTenantDialog";
import { tenantConfig } from "@/modules/Assets/form-config/AssetInformation/tenant-configs/tenantConfig";
import { useWatch } from "react-hook-form";
import { useCreateTenant } from "@/modules/Assets/hooks/tenant/useCreateTenant";
import useDeleteTenant from "@/modules/Assets/hooks/tenant/useDeleteTenant";
import useGetAssetById from "@/modules/Assets/hooks/useGetAssetById";
import useUpdateTenant from "@/modules/Assets/hooks/tenant/useUpdateTenant";
import { toast } from "sonner";

const TenantManagement = () => {
  const { assetId } = useParams<{ assetId: string }>();
  // const { createTenant, updateTenant, deleteTenant } = useTenant();
  const { mutate: createTenant, isPending: isCreatingTenant } =
    useCreateTenant();
  const { mutate: updateTenant, isPending: isUpdatingTenant } =
    useUpdateTenant();
  const { mutate: deleteTenant, isPending: isDeletingTenant } =
    useDeleteTenant();
  // const { getAsset } = useAssetApi();
  const {
    data: asset,
    isPending: gettingAsset,
    refetch: getAsset,
  } = useGetAssetById(assetId ?? "");

  const {
    control,
    getValues: formGetValues,
    clearErrors,
    reset,
    trigger,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "tenants",
    keyName: "tenant_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const logo = useWatch({
    control,
    name: `tenants.${index}.logo`,
  });

  const handleAdd = () => {
    reset();
    setIndex(-1);
  };

  const action = [
    {
      header: "Edit",
      accessorKey: "edit",
      onClick: (item: any) => {
        const findIndex = fields.findIndex(
          (field: any) => field.tenant_id === item.tenant_id,
        );
        setIndex(findIndex);
      },
    },
    {
      header: "Delete",
      accessorKey: "delete",
      onClick: (item: any) => {
        const findIndex = fields.findIndex(
          (field: any) => field.tenant_id === item.tenant_id,
        );
        setDeleteIndex(findIndex);
      },
    },
  ];

  const onSubmit = async () => {
    trigger(`tenants.${index}`).then(async (isValid: boolean) => {
      if (isValid) {
        const data = formGetValues();
        const tenantData = data.tenants[index ?? -1];
        const values = {
          ...tenantData,
          // status: tenantData.status === true ? "active" : "inactive",
          status: tenantData.status ?? "inactive",
        };
        if (isEdit && index !== null) {
          // if () {
          //   await updateTenant(values._id, { ...values });
          // }
          updateTenant(
            { tenantId: values._id, tenantData: { ...values } },
            {
              onSuccess: () => {
                console.log("Tenant updated successfully");
                update(index ?? -1, { ...values });
                toast.success("Tenant updated successfully");
              },
              onError: (error: any) => {
                console.error("Error updating tenant:", error);
                toast.error(
                  error?.response?.data?.message ||
                    "Failed to update tenant. Please try again.",
                );
              },
            },
          );
        } else {
          const data = {
            name: values.name,
            value: values.value,
            // isPercentage: values.isPercentage ? values.isPercentage : false,
            status: values.status,
            annualRentEscalation: values.annualRentEscalation ?? 0,
            type: values.type ?? "",
            startDate: values.startDate ?? new Date(),
            endDate: values.endDate ?? new Date(),
            // otherRequiredField1: values.otherRequiredField1 ?? "",
            // otherRequiredField2: values.otherRequiredField2 ?? "",
            lockInPeriod: values.lockInPeriod ?? 0,
            leasePeriod: values.leasePeriod ?? "",
            securityDeposit: values.securityDeposit ?? 0,
            interestOnSecurityDeposit: values.interestOnSecurityDeposit ?? 0,
            // additionalField1: values.additionalField1 ?? "",
            // additionalField2: values.additionalField2 ?? "",
            agreement: values.agreement ?? "",
            logo: values.logo ?? "",
            sftsAllocated: values.sftsAllocated ?? 0,
            rentPerSft: values.rentPerSft ?? 0,
          };
          // await createTenant({ ...data, assetId: assetId ?? "" }).then(
          //   (res: any) => {
          //     append({ ...data, _id: res._id });
          //   },
          // );

          createTenant(
            { tenantData: data, assetId: assetId ?? "" },
            {
              onSuccess: (res: any) => {
                console.log("Tenant created successfully");
                append({ ...data, _id: res._id });
                toast.success("Tenant created successfully");
              },
              onError: (error: any) => {
                console.error("Error creating tenant:", error);
                toast.error(
                  error?.response?.data?.message ||
                    "Failed to create tenant. Please try again.",
                );
              },
            },
          );
        }
        if (assetId) {
          const response = await getAsset();
          const asset = response?.data;

          if (asset) {
            reset({
              ...asset,
              tenants: (asset.tenants ?? []).map((t: any) => ({
                ...t,
                status: t.status ?? "inactive",
              })),
            });
          }
        }
        setIndex(null);
        clearErrors();
      }
    });
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
    const values = data.tenants[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      deleteTenant(values._id, {
        onSuccess: () => {
          console.log("Tenant deleted successfully");
          toast.success("Tenant deleted successfully");
        },
        onError: (error: any) => {
          console.error("Error deleting tenant:", error);
          toast.error(
            error?.response?.data?.message ||
              "Failed to delete tenant. Please try again.",
          );
        },
      });
    }
  };

  const columns = [
    {
      header: "Tenant Name",
      accessorKey: "name",
      cell: (info: { getValue: () => any }) => info.getValue() || "N/A",
      enableResize: false,
      size: 100,
    },
    {
      header: "Lease Period",
      accessorKey: "leasePeriod",
      cell: (info: { getValue: () => any }) => info.getValue() || "N/A",
      enableResize: true,
      size: 100,
    },
    {
      header: "Tenant Type",
      accessorKey: "type",
      enableResize: true,
      cell: (info: { getValue: () => any }) => info.getValue() || "N/A",
      size: 100,
    },
    {
      header: "Security Deposit",
      accessorKey: "securityDeposit",
      cell: (info: { getValue: () => any }) => info.getValue() || "N/A",
      enableResize: true,
      size: 100,
    },
    {
      header: "Action",
      accessorKey: "action",
      enableResize: false,
      size: 100,
    },
  ];

  return (
    <div className="flex flex-col w-full ">
      <div className="flex justify-between items-center  ">
        <h1 className="text-lg font-bold text-gray-800">Tenant Management</h1>
        <Button
          type="button"
          className=" text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
          onClick={handleAdd}
        >
          <span className="text-lg">+</span>
          <span>Add Tenant</span>
        </Button>
      </div>
      <div className="space-y-2 mt-4">
        <TenantTable
          columns={columns}
          data={fields}
          onEdit={action[0].onClick}
          onDelete={action[1].onClick}
        />
      </div>
      <AddEditTenantDialog
        isOpen={isOpen}
        isEdit={isEdit}
        index={index ?? -1}
        onSubmit={onSubmit}
        onCancel={onOpenChange}
      />
      <DeleteTenantDialog
        isOpen={deleteIndex !== null}
        onConfirm={handleOnDelete}
        onCancel={() => setDeleteIndex(null)}
      />
    </div>
  );
};

export default TenantManagement;
