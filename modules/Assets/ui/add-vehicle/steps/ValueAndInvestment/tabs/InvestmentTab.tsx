import FormGenerator from "@/components/use-form/FormGenerator";
import {
  rental2Config,
  rentalConfig,
} from "@/modules/Assets/form-config/Vehicles/ValueInvestment/rentalConfig";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import ExpenseTable from "../Expenses/ExpenseTable";
import { Button } from "@/components/ui/button";
import ExpenseDialog from "../Expenses/ExpensesDialog";
import useAddExpense from "@/modules/Assets/hooks/vehicle/expenses/useAddExpense";
import useUpdateExpense from "@/modules/Assets/hooks/vehicle/expenses/useUpdateExpense";
import useDeleteExpense from "@/modules/Assets/hooks/vehicle/expenses/useDeleteExpense";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import DeleteDialog from "../Expenses/DeleteDialog";
import { expenseFormConfig } from "../Expenses/expenseConfig";
import Expenses from "../Expenses/Expenses";
import { formatCompactNumber } from "@/lib/format.utils";

export default function InvestmentTab() {
  const { assetId } = useParams<{ assetId?: string }>();

  const {
    watch,
    setValue,
    control,
    reset,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();
  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "expenses",
    keyName: "expense_id",
  });
  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const { mutate: createExpense, isPending: isCreating } = useAddExpense();
  const { mutate: updateExpense, isPending: isUpdating } = useUpdateExpense();
  const { mutate: deleteExpense, isPending: isDeleting } = useDeleteExpense();
  const estRentalPricePerDay = watch("rentalInformation.estRentalPricePerDay");
  const estRentalPeriodInDays = watch(
    "rentalInformation.estRentalPeriodInDays",
  );
  const targetFinalValue = watch("investmentStats.targetFinalValue");
  const currency = watch("company.currency");
  console.log("Estimated Rental Price Per Day:", estRentalPricePerDay);
  console.log("Estimated Rental Period (Days):", estRentalPeriodInDays);
  console.log("Currency:", currency);

  const estTotalRentalIncome = useMemo(() => {
    return (
      Number(estRentalPricePerDay || 0) * Number(estRentalPeriodInDays || 0)
    );
  }, [estRentalPricePerDay, estRentalPeriodInDays]);

  const handleAdd = () => {
    reset();
    setIndex(-1);
  };

  const onOpenChange = () => {
    const previousValues = index !== null ? fields[index] : {};
    if (index !== null) {
      update(index, previousValues);
    }
    setIndex(null);
  };

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

  const expenses = useMemo(() => {
    return fields.reduce((acc: number, item: any) => {
      if (!item.status) return acc;

      const value = item.isPercentage
        ? (item.value / 100) * estTotalRentalIncome
        : item.value;

      return acc + value;
    }, 0);
  }, [fields, estTotalRentalIncome]);

  const netRent = useMemo(() => {
    const calculatedNetRent = estTotalRentalIncome - expenses;
    return calculatedNetRent >= 0 ? calculatedNetRent : 0;
  }, [estTotalRentalIncome, expenses]);

  // const totalYield = useMemo(() => {
  //   if (Number(estTotalRentalIncome) === 0) return "0%";
  //   const yieldValue = (Number(netRent) / Number(targetFinalValue)) * 100;
  //   return formatCompactNumber(yieldValue);
  // }, [netRent, estTotalRentalIncome,targetFinalValue]);

  const totalYield = useMemo(() => {
    if (Number(estTotalRentalIncome) === 0) return 0;

    if (Number(targetFinalValue) <= 0) return 0;
    const value= (Number(netRent) / Number(targetFinalValue))*100;
    return value >= 0 ? value.toFixed(2) : 0;

  }, [netRent, targetFinalValue]);

  console.log("Calculated expenses:", expenses);

  useEffect(() => {
    setValue("rentalInformation.estTotalRentalIncome", estTotalRentalIncome);
    setValue("rentalInformation.totalOperatingCosts", expenses);
    setValue("rentalInformation.netRentalIncome", netRent);
    setValue("rentalInformation.totalYield", totalYield);
  }, [estTotalRentalIncome, expenses, netRent, totalYield, setValue]);

  const isOpen = index !== null;
  const isEdit = index !== -1;

  return (
    <div>
      <div className="grid grid-cols-2 gap-5">
        {FormGenerator(rentalConfig(currency))}
      </div>
      <div className="flex justify-between items-center my-4">
        <h1 className="text-lg font-semibold text-black">Expenses</h1>
        <Button
          disabled={!estRentalPricePerDay && !estRentalPricePerDay}
          type="button"
          onClick={handleAdd}
        >
          <span className="text-lg">+</span>
          <span>Add Expense</span>
        </Button>
      </div>
      <div className="my-4">
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
      </div>
      <div className="grid grid-cols-2 gap-5">
        {FormGenerator(rental2Config(currency))}
      </div>
    </div>
  );
}
