import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { Percent } from "lucide-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

// export const governanceConfig = ({ spv }: { spv: any }): FormFieldConfig[] => {
export const governanceConfig = (): FormFieldConfig[] => {
  const { control, setValue } = useFormContext<any>();

  // useEffect(() => {
  //   if (spv) {
  //     //
  //     setValue(
  //       "daoConfiguration.decisionType",
  //       spv.daoConfiguration.decisionType || "",
  //       { shouldValidate: true }
  //     );
  //     // setValue("jurisdiction", spv.jurisdiction || "", { shouldValidate: true });
  //   }
  // }, [spv]);
  return [
    {
      label: "Proposal Threshold",
      name: `daoConfiguration.proposalThresholdPercent`,
      type: "number",
      fullWidth: false,
      icon: <Percent size={16} />,
      iconPosition: "right",
      control,
      rules: {
        required: "Proposal Threshold is required",
        min: {
          value: 0,
          message: "Proposal Threshold must be greater than 0",
        },
        max: {
          value: 100,
          message: "Proposal Threshold must be less than 100",
        },
      },
      // disabled: spv?.daoConfiguration?.proposalThresholdPercent ? true : false,
    },
    {
      label: "Quorum",
      name: `daoConfiguration.quorumPercent`,
      type: "number",
      control,
      icon: <Percent size={16} />,
      iconPosition: "right",
      rules: {
        required: "Quorum Percentage is required",
        min: {
          value: 0,
          message: "Proposal Threshold must be greater than 0",
        },
        max: {
          value: 100,
          message: "Proposal Threshold must be less than 100",
        },
      },
      // disabled: spv?.daoConfiguration?.quorumPercent ? true : false,
    },
    {
      label: "Days",
      name: `daoConfiguration.votingPeriod.days`,
      type: "number",
      control,
      icon: <p>D</p>,
      iconPosition: "right",
      rules: {
        required: "Voting Period is required",
        min: {
          value: 0,
          message: "Days must be at least 0",
        },
        max: {
          value: 365,
          message: "Days cannot exceed 365",
        },
      },
      // disabled: spv?.daoConfiguration?.votingPeriod.days ? true : false,
    },
    {
      label: "Hours",
      name: `daoConfiguration.votingPeriod.hours`,
      type: "number",
      control,
      icon: <p>H</p>,
      iconPosition: "right",
      rules: {
        required: "Voting Period is required",
        min: {
          value: 0,
          message: "Proposal Threshold must be greater than 0",
        },
        max: {
          value: 23,
          message: "Proposal Threshold must be less than 24",
        },
      },
      // disabled: spv?.daoConfiguration?.votingPeriod.hours ? true : false,
    },
    {
      label: "Desicion Type",
      name: "daoConfiguration.decisionType",
      type: "select",
      control,
      options: [
        {
          label: "Major Decision Only",
          value: "major-decision-only",
        },
        {
          label: "All Decisions",
          value: "all-decisions",
        },
      ],
      rules: {
        required: "Desicion Type is required",
      },
      // disabled: spv?.daoConfiguration?.decisionType ? true : false,
    },
  ];
};

// export const votingRightsConfig = ({
//   spv,
// }: {
//   spv: any;
// }): FormFieldConfig[] => {
  export const votingRightsConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext<any>();
  return [
    {
      label: "Voting Rights",
      name: "daoConfiguration.governanceRights.votingRights",
      type: "switch",
      control,
      // disabled: spv?.daoConfiguration?.governanceRights.votingRights
        // ? true
        // : false,
    },
  ];
};

// export const proposalCreationConfig = ({
//   spv,
// }: {
//   spv: any;
// }): FormFieldConfig[] => {
  export const proposalCreationConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext<any>();
  return [
    {
      label: "Proposal Rights",
      name: "daoConfiguration.governanceRights.proposalCreation",
      type: "switch",
      control,
      // disabled: spv?.daoConfiguration?.governanceRights?.proposalCreation
      //   ? true
      //   : false,
    },
  ];
};

// export const adminVetoPowerConfig = ({
//   spv,
// }: {
//   spv: any;
// }): FormFieldConfig[] => {
  export const adminVetoPowerConfig = (): FormFieldConfig[] => { 
  const { control } = useFormContext<any>();
  // console.log(
  //   "spv in veto power config",
  //   spv?.daoConfiguration?.governanceRights?.adminVotePower ? true : false
  // );
  return [
    {
      label: "Veto Power",
      name: "daoConfiguration.governanceRights.adminVotePower",
      type: "switch",
      control,
      // disabled: spv?.daoConfiguration?.governanceRights?.adminVotePower
      //   ? true
      //   : false,
    },
  ];
};
