import { useState } from "react";
import FormGenerator from "@/components/use-form/FormGenerator";
import {
  expenseFormConfig,
  formConfig,
} from "@/modules/Assets/form-config/AssetInformation/expensesConfig";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
// import { useExpenses } from "@/hooks/asset/useExpenses";
import { useParams } from "next/navigation";
import ExpenseDialog from "./ExpenseDialog";
import DeleteDialog from "./DeleteDialog";
import ExpenseTable from "./ExpenseTable";
import { formatCompactNumber } from "@/lib/format.utils";
import Expenses from "./Expenses";
import useCreateExpense from "@/modules/Assets/hooks/AssetInformation/expenses/useCreateExpense";
import { toast } from "sonner";
import useUpdateExpense from "@/modules/Assets/hooks/AssetInformation/expenses/useUpdateExpense";
import useDeleteExpense from "@/modules/Assets/hooks/AssetInformation/expenses/useDeleteExpense";

const index = ({ asset }: { asset?: any }) => {
  const { assetId } = useParams<{ assetId?: string }>();
  // const { updateExpenses, createExpenses, deleteExpenses } = useExpenses();

  const { mutate: createExpense, isPending: isCreating } = useCreateExpense();
  const { mutate: updateExpense, isPending: isUpdating } = useUpdateExpense();
  const { mutate: deleteExpense, isPending: isDeleting } = useDeleteExpense();

  const {
    watch,
    control,
    getValues: formGetValues,
    clearErrors,
    reset,
    trigger,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "expenses",
    keyName: "expense_id",
  });

  const onSubmit = async () => {
    const valid = await trigger(`expenses.${index}`);

    if (!valid) return;
    const data = formGetValues();
    console.log("Submitting expense data:", data.expenses);
    const values = data.expenses[index ?? -1];
    if (isEdit && index !== null) {
      const { expense_id, ...data } = values;
      updateExpense(
        { expenseData: data, expenseId: values._id },
        {
          onSuccess: (res: any) => {
            console.log("Expense updated successfully:", res);
            update(index ?? -1, { ...values });
            toast.success("Expense updated successfully");
            clearErrors();
            setIndex(null);
          },
          onError: (error: any) => {
            console.error("Error updating expense:", error);
            toast.error(
              error?.response?.data?.message || "Failed to update expense",
            );
          },
        },
      );
    } else {
      const data = {
        name: values.name,
        value: values.value,
        isPercentage: values.isPercentage ? values.isPercentage : false,
        status: values.status ? values.status : false,
      };
      createExpense(
        { expenseData: data, assetId: assetId ?? "" },
        {
          onSuccess: (res: any) => {
            console.log("Expense created successfully:", res);
            append({ ...data, _id: res._id });
            toast.success("Expense created successfully");
            clearErrors();
            setIndex(null);
          },
          onError: (error: any) => {
            console.error("Error creating expense:", error);
            toast.error(
              error?.response?.data?.message || "Failed to create expense",
            );
          },
        },
      );
    }
    // trigger(`expenses.${index}`).then(async (isValid) => {
    //   if (isValid) {
    //     const data = formGetValues();
    //     const values = data.expenses[index ?? -1];
    //     if (isEdit) {
    //       if (index !== null) {
    //         await updateExpenses(values._id, { ...values });
    //       }
    //       update(index ?? -1, { ...values });
    //     } else {
    //       const data = {
    //         name: values.name,
    //         value: values.value,
    //         isPercentage: values.isPercentage ? values.isPercentage : false,
    //         status: values.status ? values.status : false,
    //       };
    //       await createExpenses({ ...data, assetId: assetId ?? "" }).then(
    //         (res: any) => {
    //           append({ ...data, _id: res._id });
    //         },
    //       );
    //     }
    //     setIndex(null);
    //     clearErrors();
    //   }
    // });
  };

  const totalNumberOfSfts = watch("totalNumberOfSfts");
  const vacancyRate = watch("rentalInformation.vacancyRate");
  const rentPerSft = watch("rentalInformation.rentPerSft");
  console.log(asset, "asset", asset.currency, "currency");

  let rentNumberOfSfts =
    totalNumberOfSfts - (vacancyRate / 100) * totalNumberOfSfts || 0;

  rentNumberOfSfts = parseFloat(rentNumberOfSfts.toFixed(2));

  let grossRent = rentPerSft * rentNumberOfSfts || 0;
  grossRent = parseFloat(grossRent.toFixed(2));

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleAdd = () => {
    reset();
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

  const handleOnDelete = async () => {
    if (deleteIndex === null) return;

    const data = formGetValues();
    const values = data.expenses[deleteIndex];

    deleteExpense(values._id ?? "", {
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

  const expenses = fields
    .filter((item: any) => {
      if (item.status) {
        return item;
      }
    })
    .map((item: any) => {
      const value = item.isPercentage
        ? (item.value / 100) * grossRent
        : item.value;
      return {
        ...item,
        value: value,
      };
    })
    .reduce((acc: number, item: any) => {
      return acc + item.value;
    }, 0);

  let netRent = grossRent - expenses || 0;
  netRent = parseFloat(netRent.toFixed(2));

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-lg font-semibold text-black">Expenses</h1>
          <Button type="button" onClick={handleAdd}>
            <span className="text-lg">+</span>
            <span>Add Expense</span>
          </Button>
        </div>
        <div className="mt-4">
          <ExpenseTable
            fields={fields}
            actionHandlers={{
              onEdit: (item) => {
                const findIndex = fields.findIndex(
                  (field) => field.expense_id === item.expense_id,
                );
                setIndex(findIndex);
              },
              onDelete: (item) => {
                const findIndex = fields.findIndex(
                  (field) => field.expense_id === item.expense_id,
                );
                setDeleteIndex(findIndex);
              },
            }}
            update={update}
          />
        </div>
        <div className=" mt-5 grid grid-cols-2 gap-4">
          <Expenses
            title="Monthly Rent"
            sqft={rentNumberOfSfts}
            grossRent={formatCompactNumber(grossRent)}
            netRent={formatCompactNumber(netRent)}
            expenses={formatCompactNumber(expenses)}
            currency={asset?.currency}
            extraText="After All Expenses"
          />
          <Expenses
            title="Annual Rent"
            sqft={rentNumberOfSfts}
            grossRent={formatCompactNumber(grossRent * 12)}
            expenses={formatCompactNumber(expenses * 12)}
            netRent={formatCompactNumber(netRent * 12)}
            extraText="Monthly x12"
            currency={asset?.currency ?? ""}
          />
        </div>

        <ExpenseDialog
          isOpen={isOpen}
          isEdit={isEdit}
          index={index}
          onClose={onOpenChange}
          onSubmit={onSubmit}
          formConfig={expenseFormConfig}
          isLoading={isCreating || isUpdating}
        />
        <DeleteDialog
          isOpen={deleteIndex !== null}
          onClose={() => setDeleteIndex(null)}
          onDelete={handleOnDelete}
        />
        <div className="grid grid-cols-3 gap-4 mt-5">
          {FormGenerator(formConfig())}
        </div>
      </div>
    </>
  );
};

export default index;
