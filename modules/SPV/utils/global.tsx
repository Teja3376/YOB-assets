export enum SPVType {
    LLC = "llc",
    PrivateLimited = "private-limited",
    DAOLLC = "dao-llc",
    Corporation = "corporation",
    PublicEntity = "public-entity",
    Partnership = "partnership",
  }

export const SPV_TYPES = [
    { label: "LLC", value: SPVType.LLC },
    { label: "Private Limited", value: SPVType.PrivateLimited },
    { label: "DAO LLC", value: SPVType.DAOLLC },
    { label: "Corporation", value: SPVType.Corporation },
    { label: "Public Entity", value: SPVType.PublicEntity },
    { label: "Partnership", value: SPVType.Partnership },
  ];
  export const BANK_ACCOUNT_TYPE = [
    { label: "Escrow Bank Account", value: "escrow-bank-account" },
    { label: "Current Account", value: "current-account" },
    { label: "Corporate Account", value: "corporate-account" },
    { label: "Saving Account", value: "savings-account" },
  ];