import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import {
  INVESTOR_ACREDITATION,
  KYC_OR_AML_REQUIREMENTS,
} from "@/modules/Assets/utils/global";
import { useFormContext } from "react-hook-form";

const investorConfig = (): FormFieldConfig[] => {
  const { control, watch, getValues } = useFormContext();
  const totalPropertyValueAfterFees = watch("totalPropertyValueAfterFees");
  const totalNumberOfSfts = watch("totalNumberOfSfts");
  const vacancyRate = watch("rentalInformation.vacancyRate");
  const rentPerSft = watch("rentalInformation.rentPerSft");
  const startDate = watch(
    `investorRequirementsAndTimeline.distributionStartDate`,
  );

  console.log("startDate", getValues("investorRequirementsAndTimeline"));

  const fields = watch("expenses") || [];

  let rentNumberOfSfts =
    totalNumberOfSfts - (vacancyRate / 100) * totalNumberOfSfts || 0;

  rentNumberOfSfts = parseFloat(rentNumberOfSfts.toFixed(2));

  let grossRent = rentPerSft * rentNumberOfSfts || 0;
  grossRent = parseFloat(grossRent.toFixed(2));

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
  const netAnnualRent = netRent * 12 || 0;

  console.log(
    "totalPropertyValueAfterFees",
    totalPropertyValueAfterFees,
    "netAnnualRent",
    netAnnualRent,
  );

  const rentalYield = parseFloat(
    totalPropertyValueAfterFees && netAnnualRent
      ? ((netAnnualRent / totalPropertyValueAfterFees) * 100).toFixed(2)
      : "0",
  );

  return [
    {
      name: "investorRequirementsAndTimeline.investorAcreditation",
      label: "Investor Accredited",
      type: "select",
      control: control,
      options: INVESTOR_ACREDITATION,
    },
    {
      name: "investorRequirementsAndTimeline.kycOrAmlRequirements",
      label: "KYC/AML requirmenets",
      type: "select",
      control: control,
      options: KYC_OR_AML_REQUIREMENTS,
    },
    {
      name: "investorRequirementsAndTimeline.lockupPeriod",
      label: "Lockup Period",
      type: "inputGroup",
      inputType: "number",
      control: control,
      position: "left",
      selectName: "investorRequirementsAndTimeline.lockupPeriodType",
      options: [
        { value: "months", label: "Months" },
        { value: "years", label: "Years" },
      ],
    },
    {
      name: "investorRequirementsAndTimeline.distributionStartDate",
      label: "Listing Start Date",
      type: "date",
      control: control,
    },
    {
      name: "investorRequirementsAndTimeline.distributionEndDate",
      label: "Listing End Date",
      type: "date",
      control: control,
      dayDisabled: (date: Date): boolean => {
        if (!startDate) return false;

        const d = new Date(date);
        d.setHours(0, 0, 0, 0);

        const s = new Date(startDate);
        s.setHours(0, 0, 0, 0);

        return d < s;
      },
      rules: {
        required: "End Date is required",
        validate: (value: Date) => {
          if (!startDate || !value) return true;

          const s = new Date(startDate);
          s.setHours(0, 0, 0, 0);

          const e = new Date(value);
          e.setHours(0, 0, 0, 0);

          if (e < s) return "End date cannot be before start date";
          return true;
        },
      },
    },
  ];
};

export default investorConfig;
