import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { calculateIRR, calculateMOIC } from "@/modules/Assets/utils/global";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export const formConfig = (): FormFieldConfig[] => {

  const { control, getValues, watch, setValue } = useFormContext();

  // 👉 Watch reactive dependencies instead of only getValues
  const totalNumberOfSfts = watch("totalNumberOfSfts") || 0;
  const vacancyRate = watch("rentalInformation.vacancyRate") || 0;
  const rentPerSft = watch("rentalInformation.rentPerSft") || 0;
  const fields = watch("expenses") || [];
  const totalPropertyValueAfterFees = watch("totalPropertyValueAfterFees") || 0;
  const basePropertyValue = watch("basePropertyValue") || 0;
  const tenants = watch("tenants") || [];
  const reserveFees = watch("fees.reserve") || [];

  // ---- tenants-derived metrics ----
  const tenantArray = Array.isArray(tenants) ? tenants : [];

  const { year1Total, year2Total } = tenantArray.reduce(
    (acc: any, tenant: any) => {
      const sfts = tenant.sftsAllocated || 0;
      const rps = tenant.rentPerSft || 0;
      const esc = (tenant.annualRentEscalation || 0) / 100;
      const year1Rent = rps * sfts * 12;
      const year2Rent = year1Rent * (1 + esc);
      acc.year1Total += year1Rent;
      acc.year2Total += year2Rent;
      return acc;
    },
    { year1Total: 0, year2Total: 0 }
  );

  const avgEscalation =
    year1Total > 0 ? (year2Total - year1Total) / year1Total : 0;

  const totalDeposit = tenantArray.reduce((total: number, t: any) => {
    return total + (t.securityDeposit || 0);
  }, 0);

  const { totalInterest, totalDeposits } = tenantArray.reduce(
    (acc: any, t: any) => {
      const dep = t.securityDeposit || 0;
      const rate = (t.interestOnSecurityDeposit || 0) / 100;
      acc.totalInterest += dep * rate;
      acc.totalDeposits += dep;
      return acc;
    },
    { totalInterest: 0, totalDeposits: 0 }
  );
  const avgInterestOnDeposit =
    totalDeposits > 0 ? totalInterest / totalDeposits : 0;

  // ---- rent & expenses ----
  const rentNumberOfSfts =
    totalNumberOfSfts - (vacancyRate / 100) * totalNumberOfSfts || 0;
  const grossRent = +(rentPerSft * rentNumberOfSfts || 0).toFixed(2);

  const expenses = (fields || []).reduce((total: number, field: any) => {
    if (field?.status && field?.value) {
      return (
        total +
        (field.isPercentage ? (grossRent * field.value) / 100 : field.value)
      );
    }
    return total;
  }, 0);

  const grossAnnualRent = grossRent * 12 || 0;
  const netAnnualRent = +(grossAnnualRent - expenses * 12 || 0).toFixed(2);

  const grossrentalYield = +(
    totalPropertyValueAfterFees && grossAnnualRent
      ? (grossAnnualRent / totalPropertyValueAfterFees) * 100
      : 0
  ).toFixed(2);

  const netRentalYield = +(
    totalPropertyValueAfterFees && netAnnualRent
      ? (netAnnualRent / totalPropertyValueAfterFees) * 100
      : 0
  ).toFixed(2);

  const reserveAmount =
    (reserveFees || []).reduce((acc: number, fee: any) => {
      if (fee?.status) {
        return (
          acc +
          (fee.isPercentage
            ? (basePropertyValue * (fee.value || 0)) / 100
            : fee.value || 0)
        );
      }
      return acc;
    }, 0) || 0;

  const irRate =
    (watch("investmentPerformance.interestRateonReserves") || 0) / 100;
  const capGain =
    (watch("investmentPerformance.targetCapitalAppreciation") || 0) / 100;
  const lockIn =
    watch("investmentPerformance.estimatedReturnsAsPerLockInPeriod") || 0;

  const irr = calculateIRR({
    P0: totalPropertyValueAfterFees,
    R0: netAnnualRent,
    e: avgEscalation,
    d: totalDeposit,
    id: avgInterestOnDeposit,
    r: reserveAmount,
    ir: irRate,
    g: capGain,
    T: lockIn,
  });

  const moic = calculateMOIC({
    P0: totalPropertyValueAfterFees,
    R0: netAnnualRent,
    e: avgEscalation,
    d: totalDeposit,
    id: avgInterestOnDeposit,
    r: reserveAmount,
    ir: irRate,
    g: capGain,
    T: lockIn || 1,
  });

  // 👉 Push values whenever dependencies change (no defaultValue for these)
  useEffect(() => {
    setValue("investmentPerformance.netRentalYield", netRentalYield);
    setValue("investmentPerformance.grossRentalYield", grossrentalYield);
    setValue("investmentPerformance.irr", irr * 100);
    setValue("investmentPerformance.moic", moic);

    setValue("assumpationsEsclation", +(avgEscalation * 100).toFixed(2));
    setValue("totalDeposit", totalDeposit);
    setValue(
      "assumptionInterestRateonDeposit",
      +(avgInterestOnDeposit * 100).toFixed(2)
    );
  }, [
    setValue,
    netRentalYield,
    grossrentalYield,
    irr,
    moic,
    avgEscalation,
    totalDeposit,
    avgInterestOnDeposit,
  ]);

  return [
    {
      type: "number",
      name: "totalNumberOfSfts",
      control,
      label: "Total Area (sqft)",
      // placeholder: "Enter Total Area",
      disabled: true,

    },
    {
      type: "number",
      name: "rentalInformation.rentPerSft",
      control,
      label: "Rent per sqft",
      placeholder: "Enter Price per sqft",
      disabled: true,
    },
    {
      type: "number",
      name: "rentalInformation.vacancyRate",
      control,
      label: "Approx Vacancy Rate(%)",
      placeholder: "Enter Vacancy Rate",
      disabled: true,
    },
    {
      type: "number",
      name: "totalPropertyValueAfterFees",
      control,
      label: "Gross Total Property Value",
      disabled: true,
      placeholder: "Gross Total",
      defaultValue: totalPropertyValueAfterFees,
    },
    {
      name: "investmentPerformance.netRentalYield",
      label: "Net Rental Yield (%)",
      type: "text",
      control,
      disabled: true,
    },
    {
      name: "investmentPerformance.grossRentalYield",
      label: "Gross Rental Yield (%)",
      type: "text",
      control,
      disabled: true,
    },
    {
      name: "assumpationsEsclation",
      label: "Average Annual Escalation (%)",
      type: "number",
      control,
      placeholder: "Auto",
      disabled: true, // or use readOnly: true if you want it submitted
    },
    {
      name: "totalDeposit",
      label: "Total Deposit Amount",
      type: "text",
      control,
      placeholder: "Auto",
      disabled: true,
    },
    {
      name: "assumptionInterestRateonDeposit",
      label: "Average Interest Rate on Deposit (%)",
      type: "text",
      control,
      placeholder: "Auto",
      disabled: true,
    },
    {
      name: "investmentPerformance.irr",
      label: "IRR (%)",
      type: "number",
      control,
      disabled: true,
      
    },
    {
      name: "investmentPerformance.moic",
      label: "MOIC ",
      type: "number",
      control,
      disabled: true,
    },
  ];
};

export const expenseFormConfig = (index: number): FormFieldConfig[] => {
  const { control } = useFormContext();
  return [
    {
      type: "text",
      name: `expenses.${index}.name`,
      control,
      label: "Expense Name",
      placeholder: "Enter Expense Name",
      rules: {
        required: "Expense name is required",
      },
    },
    {
      type: "number",
      name: `expenses.${index}.value`,
      control,
      label: "value",
      placeholder: "Enter value",
      rules: {
        required: "Value is required",
        validate: (value: number) => {
          if (value < 0) {
            return "Value cannot be negative";
          }
          return true;
        },
      },
    },
    {
      type: "switch",
      name: `expenses.${index}.isPercentage`,
      control,
      label: "Is Percentage",
      placeholder: "Is Percentage",
    },
    {
      type: "switch",
      name: `expenses.${index}.status`,
      control,
      label: "Status",
      placeholder: "Status",
    },
  ];
};
