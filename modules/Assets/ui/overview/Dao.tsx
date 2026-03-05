import React from "react";
import { Check } from "lucide-react";
interface GovernanceRights {
  votingRights: boolean;
  proposalCreation: boolean;
  adminVotePower: boolean;
}

interface VotingPeriod {
  days: number;
  hours: number;
}
interface DaoType {
  daoName: string;
  tokenSymbol: string;
  blockchain: string;
  governanceModel: string;
  decisionType: string;
  governanceRights?: GovernanceRights;
  proposalThresholdPercent: number;
  quorumPercent: number;
  votingPeriod?: VotingPeriod;
  issuerRepSignature?: boolean;
}

interface DaoProps {
  dao?: DaoType;
}

const Dao = ({ dao }:DaoProps) => {
  const rights = [
    { label: "Voting Rights", value: dao?.governanceRights?.votingRights },
    { label: "Proposal Creation", value: dao?.governanceRights?.proposalCreation },
    { label: "Admin Vote Power", value: dao?.governanceRights?.adminVotePower },
    { label: "Issuer Rep Signature", value: dao?.issuerRepSignature },
  ];

  return (
    <div className="rounded-md border shadow-sm overflow-hidden">
      <div className="bg-primary/10 px-4 py-3">
        <h1 className="font-medium">DAO Governance</h1>
        <p className="text-xs text-muted-foreground">
          Decentralized organization structure and voting parameters
        </p>
      </div>

      <div className="p-4 space-y-4">

        <div className="border rounded-md p-4">
          <h2 className="text-sm font-medium mb-3">DAO Identity</h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">DAO Name</p>
              <p className="font-medium">{dao?.daoName}</p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Token Symbol</p>
              <p className="font-medium">{dao?.tokenSymbol}</p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Blockchain</p>
              <p className="font-medium">{dao?.blockchain}</p>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h2 className="text-sm font-medium mb-3">Governance Model</h2>

          <p className="font-medium text-sm">{dao?.governanceModel}</p>
          <p className="text-xs text-muted-foreground">
            Decision Type: {dao?.decisionType}
          </p>
        </div>

        <div className="border rounded-md p-4">
          <h2 className="text-sm font-medium mb-3">Governance Rights</h2>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {rights.map(
              (item) =>
                item.value && (
                  <div key={item.label} className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span>{item.label}</span>
                  </div>
                )
            )}
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h2 className="text-sm font-medium mb-3">Governance Parameters</h2>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Proposal Threshold</p>
              <p className="font-medium">{dao?.proposalThresholdPercent}%</p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Quorum</p>
              <p className="font-medium">{dao?.quorumPercent}%</p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Voting Period</p>
              <p className="font-medium">
                {dao?.votingPeriod?.days}d {dao?.votingPeriod?.hours}h
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dao;