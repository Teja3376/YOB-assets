import FormGenerator from "@/components/use-form/FormGenerator";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    Layers,
    Check,
    Coins,
    Users,
    Star,
    Shield,
    Siren,
    Edit2,
    Files,
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import { daoFormConfig } from "@/modules/SPV/form-config/daoConfig";
import {
    adminVetoPowerConfig,
    governanceConfig,
    proposalCreationConfig,
    votingRightsConfig,
} from "@/modules/SPV/form-config/governaceConfig";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
type DAOCreationProps = {
    onCompleteDao: (options: { skip: boolean }) => void | Promise<void>;
    isCompleting?: boolean;
};

const DAOCreation = ({ onCompleteDao, isCompleting }: DAOCreationProps) => {
    const router = useRouter();
    const { watch, setValue } = useFormContext();
    const { spvId: id } = useParams();
    const blockChain = watch("daoConfiguration.blockchain");
    const governanceModel = watch("daoConfiguration.governanceModel");
    const issuerRepSignature = watch("daoConfiguration.issuerRepSignature");
    const daoSkipped = watch("daoConfiguration.skipped");

    const skippedFromApi = daoSkipped === true;

    const handleChainSelect = (chain: string) => {
        setValue("daoConfiguration.blockchain", chain);
    };

    const handleGovernanceModelSelect = (model: string) => {
        setValue("daoConfiguration.governanceModel", model);
    };

    return (
        <div className="p-4 bg-white border-gray-100">
            <div className="mb-4 flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <Layers className="text-black" />
                    <h1 className="text-xl font-extrabold text-gray-800">
                        DAO Creation
                    </h1>
                </div>
                {
                    skippedFromApi === false && (
                        <Button
                            type="button"
                            variant="default"
                            disabled={isCompleting}
                            onClick={() => onCompleteDao({ skip: true })}
                        >
                            Skip
                        </Button>
                    )}
                    {skippedFromApi === true && (
                        <Button
                            type="button"
                            variant="default"
                            disabled={isCompleting}
                            onClick={() => router.push(`/spv/${id}/review`)}
                        >
                            Review
                        </Button>
                    )
                } 
             
            </div>
            <div>
                <span className="block text-md text-gray-600 mb-6">
                    Create a DAO for the SPV and configure governance setting
                </span>

                <div className="relative min-h-[120px]">
                    <div
                        className={cn(
                            "absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-lg  px-4 py-8 text-center",
                            skippedFromApi
                                ? "border-amber-200/90 bg-black/75 backdrop-blur-[1px]"
                                : "border-gray-200 bg-black/75 opacity-90 backdrop-blur-sm",
                        )}
                    >
                        <p className="max-w-md bg-white height-[150px] width-[400px] rounded-lg p-4 text-sm text-gray-700 drop-shadow-lg">
                            {skippedFromApi ? (
                                <>
                                    <span className="font-medium">
                                        DAO setup was skipped
                                    </span>{" "}
                                    
                                    for this SPV. The fields below are shown for
                                    reference only.
                                </>
                            ) : (
                                <>
                                    DAO setup is optional. Use{" "}
                                   

                                    above to continue without configuring a DAO.
                                    <br />
                                    <Button variant="outline" className="font-medium " onClick={() => onCompleteDao({ skip: true })}>
                                        Skip And Review
                                    </Button>
                                </>
                            )}
                        </p>
                    </div>
                    <div
                        className={cn(
                            "pointer-events-none select-none",
                            skippedFromApi ? "opacity-[01]" : "opacity-40",
                        )}
                    >
                        {/* Main Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {FormGenerator(daoFormConfig())}
                        </div>

                        {/* Blockchain Section */}
                        <div className=" py-4 border-t border-gray-100">
                            <span className="text-black font-medium block mb-3">
                                Block Chain
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {["Ethereum", "Polygon", "XRPL"].map((chain) => (
                                    <Button
                                        key={chain}
                                        variant={
                                            blockChain === chain ? "default" : "outline"
                                        }
                                        className="w-full h-10 justify-center relative"
                                        type="button"
                                        onClick={() => handleChainSelect(chain)}
                                    >
                                        {chain.charAt(0).toUpperCase() + chain.slice(1)}
                                        {blockChain === chain && (
                                            <Check className="absolute right-2 h-4 w-4" />
                                        )}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Governance Model Section */}
                        <div className="py-4 border-t border-gray-100">
                            <span className="text-black font-medium block mb-3">
                                Governance Model
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Button
                                    variant={
                                        governanceModel === "Token-Weighted"
                                            ? "default"
                                            : "outline"
                                    }
                                    className="w-full h-12 justify-start px-4 relative"
                                    type="button"
                                    onClick={() =>
                                        handleGovernanceModelSelect("Token-Weighted")
                                    }
                                >
                                    <Coins className="text-gray-500 mr-2 h-5 w-5" />
                                    <span>Token Weighted</span>
                                    {governanceModel === "Token-Weighted" && (
                                        <Check className="absolute right-3 h-4 w-4" />
                                    )}
                                </Button>

                                <Button
                                    variant={
                                        governanceModel === "Equal-Voting"
                                            ? "default"
                                            : "outline"
                                    }
                                    className="w-full h-12 justify-start px-4 relative"
                                    type="button"
                                    onClick={() =>
                                        handleGovernanceModelSelect("Equal-Voting")
                                    }
                                >
                                    <Users className="text-gray-500 mr-2 h-5 w-5" />
                                    <span>Equal Voting</span>
                                    {governanceModel === "Equal-Voting" && (
                                        <Check className="absolute right-3 h-4 w-4" />
                                    )}
                                </Button>

                                <Button
                                    variant={
                                        governanceModel === "Reputation-Based"
                                            ? "default"
                                            : "outline"
                                    }
                                    className="w-full h-12 justify-start px-4 relative"
                                    type="button"
                                    onClick={() =>
                                        handleGovernanceModelSelect("Reputation-Based")
                                    }
                                >
                                    <Star className="text-gray-500 mr-2 h-5 w-5" />
                                    <span>Reputation Based</span>
                                    {governanceModel === "Reputation-Based" && (
                                        <Check className="absolute right-3 h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Governance Parameters Section */}
                        <div className="py-4 border-t border-gray-100">
                            <span className="text-black font-medium block mb-3">
                                Governance Parameters
                            </span>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {FormGenerator(governanceConfig())}
                            </div>
                        </div>

                        {/* Governance Rights Section */}
                        <div className="py-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 mb-3">
                                <Shield size={16} className="text-gray-500" />
                                <span className="text-black font-medium">
                                    Governance Rights
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="flex items-center justify-between shadow-md border border-gray-100 bg-white rounded-lg p-3">
                                    <div className="flex items-center gap-2">
                                        <Siren size={16} className="text-gray-800" />
                                        <span className="font-medium text-sm">
                                            Voting Rights
                                        </span>
                                    </div>
                                    {FormGenerator(votingRightsConfig())}
                                </div>
                                <div className="flex items-center justify-between shadow-md border border-gray-100 bg-white rounded-lg p-3">
                                    <div className="flex items-center gap-2">
                                        <Edit2 size={16} className="text-gray-800" />
                                        <span className="font-medium text-sm">
                                            Proposal Creation
                                        </span>
                                    </div>
                                    {FormGenerator(proposalCreationConfig())}
                                </div>
                                <div className="flex items-center justify-between shadow-md border border-gray-100 bg-white rounded-lg p-3">
                                    <div className="flex items-center gap-2">
                                        <Shield size={16} className="text-gray-800" />
                                        <span className="font-medium text-sm">
                                            Veto Power
                                        </span>
                                    </div>
                                    {FormGenerator(adminVetoPowerConfig())}
                                </div>
                            </div>
                        </div>

                        {/* Authorized Representatives Section */}
                        <div className="py-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                    <Files size={16} className="text-gray-800" />
                                    <h3 className="text-black font-medium">
                                        Authorized Representatives
                                    </h3>
                                </div>
                                <span className="text-gray-500 text-sm ml-6">
                                    Confirm you are legally authorized to create this DAO
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Switch
                                    checked={issuerRepSignature}
                                    onCheckedChange={(checked) => {
                                        setValue(
                                            "daoConfiguration.issuerRepSignature",
                                            checked,
                                        );
                                    }}
                                />
                                <span className="text-gray-500 text-sm">Confirm</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DAOCreation;
