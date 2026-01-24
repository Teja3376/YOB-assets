
export const ASSET_STEPS_TABS = [
  {
    id: "asset-information",
    title: "Asset Information",
    tabs: [
      { id: "asset-type", title: "Asset Type" },
      { id: "investment-details", title: "Investment Details" },
      { id: "rent-information", title: "Rent Information" },
      { id: "escrow-legal", title: "Escrow & Legal Details" },
    ],
  },
  {
    id: "token-information",
    title: "Token Information",
  },
  {
    id: "media-documents",
    title: "Media & Documents",
    tabs: [
      { id: "gallery", title: "Asset Gallery" },
      { id: "documents", title: "Asset Documents" },
    ],
  },
  {
    id: "issues-due-diligence",
    title: "Issuer & Due-diligence",
    tabs: [
      { id: "asseet-hosted-by", title: "Asset Hosted By" },
      { id: "asseet-due-diligence", title: "Asset Due Diligence" },
    ],
  },
  {
    id: "features-amenities",
    title: "Features & Amenities",
    tabs: [
      { id: "features", title: "Features" },
      { id: "amenities", title: "Amenities" },
    ],
  },
  {
    id: "location-places",
    title: "Location & Places",
  },
  {
    id: "additional-details",
    title: "Additional Details",
    tabs: [
      { id: "risk-factors", title: "Risk Factors" },
      { id: "exit-opportunities", title: "Exit Opportunities" },
      { id: "risk-disclosure", title: "Risk Disclosure" },
      { id: "additional-tax", title: "Additional Tax" },
    ],
  },
  {
    id: "tandc-faq",
    title: "T&C, FAQ",
    tabs: [
      { id: "terms-and-conditions", title: "Terms & Conditions" },
      { id: "faq", title: "FAQ" },
    ],
  },
  {
    id: "signature-verification",
    title: "Investors Signature",
  },
];
export const ASSET_STYLE = [
  { label: "Tower", value: "tower" },
  { label: "Villa", value: "villa" },
  { label: "Building", value: "building" },
  { label: "Developed Land", value: "developed-land" },
  { label: "Individual Land", value: "individual-land" },
];
export const INSTRUMENT_TYPE = [
  { label: "Equity", value: "equity" },
  { label: "Direct Ownership", value: "direct-ownership" },
  { label: "Debt", value: "debt" },
  { label: "Fund", value: "fund" },
];
export const TENANT_TYPE = [
  { label: "Corporate", value: "corporate" },
  { label: "Individual", value: "individual" },
  { label: "Government", value: "government" },
  { label: "Educational", value: "educational" },
  { label: "Retail", value: "retail" },
  { label: "Other", value: "other" },
];
export const calculateIRR = ({
  P0,
  R0,
  e,
  d,
  id,
  r,
  ir,
  g,
  T,
}: {
  P0: number;
  R0: number;
  e: number;
  d: number;
  id: number;
  r: number;
  ir: number;
  g: number;
  T: number;
}) => {
  const npv = (rate: number) => {
    let total = -P0; // initial investment
    for (let t = 1; t <= T; t++) {
      const rent = R0 * Math.pow(1 + e, t - 1);
      // console.log('Rent for year', t, ':', rent);
      const depositIncome = d * id;
      const reserveIncome = r * ir;

      let cashflow = rent + depositIncome + reserveIncome;

      // Add sale proceeds in final year
      if (t === T) {
        cashflow += P0 * Math.pow(1 + g, T);
      }

      total += cashflow / Math.pow(1 + rate, t);
    }
    return total;
  };

  // Binary search for IRR
  let low = -0.99,
    high = 1,
    mid;
  for (let i = 0; i < 100; i++) {
    mid = (low + high) / 2;
    const val = npv(mid);
    if (Math.abs(val) < 1e-6) break;
    if (val > 0) low = mid;
    else high = mid;
  }
  return mid || 0;
};

export const calculateMOIC = ({
  P0,
  R0,
  e,
  d,
  id,
  r,
  ir,
  g,
  T,
}: {
  P0: number;
  R0: number;
  e: number;
  d: number;
  id: number;
  r: number;
  ir: number;
  g: number;
  T: number;
}) => {
  let totalReturn = 0;

  // Years 1 to T-1
  for (let t = 1; t < T; t++) {
    const rent = R0 * Math.pow(1 + e, t - 1);
    const depositIncome = d * id;
    const reserveIncome = r * ir;
    totalReturn += rent + depositIncome + reserveIncome;
  }

  // Final year (T)
  const rentFinal = R0 * Math.pow(1 + e, T - 1);
  const depositIncomeFinal = d * id;
  const reserveIncomeFinal = r * ir;
  const saleProceeds = P0 * Math.pow(1 + g, T);

  totalReturn +=
    rentFinal + depositIncomeFinal + reserveIncomeFinal + saleProceeds;

  // MOIC = Total returns / Initial investment
  return totalReturn / P0;
};
export enum EInvestorAcreditation {
  OPEN_TO_ALL = "open-to-all",
  ACCREDITED_ONLY = "accredited-only",
  INSTITUTIONAL_ONLY = "institutional-only",
  QUALIFIED = "qualified",
  CUSTOM_APPROVAL = "custom-approval"
}
export const INVESTOR_ACREDITATION = [
  { label: "Open to all", value: EInvestorAcreditation.OPEN_TO_ALL },
  { label: "Accredited only", value: EInvestorAcreditation.ACCREDITED_ONLY, disabled: true },
  { label: "Institutional only", value: EInvestorAcreditation.INSTITUTIONAL_ONLY, disabled: true },
  { label: "Qualified", value: EInvestorAcreditation.QUALIFIED, disabled: true },
  { label: "Custom approval", value: EInvestorAcreditation.CUSTOM_APPROVAL, disabled: true },
];

export enum EKycOrAmlRequirements {
  REQUIRED_FOR_ALL = "required-for-all",
  ACCREDITED_ONLY = "accredited-only",
  ENHANCED = "enhanced",
  OPTIONAL = "optional",
  NONE = "none"
}
export const KYC_OR_AML_REQUIREMENTS = [
  { label: "Required for all", value: EKycOrAmlRequirements.REQUIRED_FOR_ALL, disabled: false },
  { label: "Accredited only", value: EKycOrAmlRequirements.ACCREDITED_ONLY, disabled: true },
  { label: "Enhanced", value: EKycOrAmlRequirements.ENHANCED, disabled: true },
  { label: "Optional", value: EKycOrAmlRequirements.OPTIONAL, disabled: true },
  { label: "None", value: EKycOrAmlRequirements.NONE, disabled: true },
];