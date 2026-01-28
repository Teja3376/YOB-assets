export enum SPVType {
    LLC = "llc",
    PrivateLimited = "private-limited",
    DAOLLC = "dao-llc",
    Corporation = "corporation",
    PublicEntity = "public-entity",
    Partnership = "partnership",
  }

export const SPV_TYPES = [
    { label: "LLC", value: "LLC" },
    { label: "Private Limited", value: "Private Limited" },
    { label: "DAO LLC", value: "DAO LLC" },
    { label: "Corporation", value: "Corporation" },
    { label: "Public Entity", value: "Public Entity" },
    { label: "Partnership", value: "Partnership" },
  ];
  export const BANK_ACCOUNT_TYPE = [
    { label: "Escrow Bank Account", value: "Escrow" },
    { label: "Current Account", value: "Current" },
    { label: "Corporate Account", value: "Corporate" },
    { label: "Saving Account", value: "Savings" },
  ];

  export interface SpvPayload {
    name: string;
    jurisdiction: string;
    currency: string;
    type: string;  // 'llc' | 'private-limited' | 'dao-llc' | 'corporation' | 'public-entity' | 'partnership'
    formationDate: string;
    businessPurpose: string;
    
    memoAndTerms?: {
      investmentMemorandum: string;
      termsAndConditions: string;
      riskFactor: string;
      investmentStrategy: string;
    };
    escrowBankDetails?: {
      bankName: string;
      accountType: string;
      accountNumber: string;
      routingNumber: string | null;
      ifscCode: string;
      bankStatement: string | null;
    };
    legalDocuments?: {
      llcOperatingAgreement: {
        name: string;
        url: string;
        _id?: string;
        id?: string;
      } | null;
      articlesOfAssociation: {
        name: string;
        url: string;
        _id?: string;
        id?: string;
      } | null;
      memorandumOfAssociation: {
        name: string;
        url: string;
        _id?: string;
        id?: string;
      } | null;
      otherDocuments: any;
    };
    boardOfDirectors?: {
      treasuryManager: {
        name: string | null;
        email: string | null;
        phoneNumber: string | null;
        idNumber: string | null;
        idProof: string | null;
      };
      assetManager: {
        name: string | null;
        email: string | null;
        phoneNumber: string | null;
        idNumber: string | null;
        idProof: string | null;
      };
      additionalBoardMembers?: any[];
    };
    daoConfiguration?: {
      votingPeriod: {
        days: number;
        hours: number;
      };
      governanceRights: {
        votingRights: boolean;
        proposalCreation: boolean;
        adminVotePower: boolean;
      };
      daoName: string;
      tokenSymbol: string | null;
      blockchain: string;
      governanceModel: string;
      proposalThresholdPercent: number;
      quorumPercent: number;
      decisionType: string;
      issuerRepSignature: boolean;
    };
    logo?: string | null;
    _id?: string;
    OnchainAddress?: string;
    blockchainCompanyId?: string | null;
    completedSteps?: any;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    id?: string;
  }
  