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
    ArrowLeft,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { daoFormConfig } from "@/modules/SPV/form-config/daoConfig";
import {
    adminVetoPowerConfig,
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
    const [isFormVisible, setIsFormVisible] = useState(false);
    const daoName = watch("daoConfiguration.daoName");
    const issuerRepSignature = watch("daoConfiguration.issuerRepSignature");

    const hasDaoConfiguration =
        Boolean(String(daoName ?? "").trim());

    /** Intro overlay + dimming only when there is no saved DAO data yet */
    const showDraftMask = !isFormVisible && !hasDaoConfiguration;

    useEffect(() => {
        if (hasDaoConfiguration) {
            setIsFormVisible(true);
        }
    }, [hasDaoConfiguration]);

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
                <div className="flex gap-2">
                    {!isFormVisible && !hasDaoConfiguration ? (
                        <>
                            <Button
                                type="button"
                                variant="default"
                                disabled={isCompleting}
                                onClick={() => router.push(`/spv/${id}/review`)}
                            >
                                Skip
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isCompleting}
                                onClick={() => setIsFormVisible(true)}
                            >
                                Create A Doa
                            </Button>
                        </>
                    ) : hasDaoConfiguration ? (
                        <Button
                            type="button"
                            variant="default"
                            disabled={isCompleting}
                            onClick={() => router.push(`/spv/${id}/review`)}
                        >
                            Review the SPV
                        </Button>
                    ) : isFormVisible ? (
                        <Button
                            type="button"
                            variant="ghost"
                            className="flex items-center gap-2"
                            disabled={isCompleting}
                            onClick={() => setIsFormVisible(false)}
                        >
                            <ArrowLeft size={16} />
                            Back
                        </Button>
                    ) : null}
                </div> 
             
            </div>
            <div>
                <span className="block text-md text-gray-600 mb-6">
                    Create a DAO for the SPV and configure governance setting
                </span>

                <div className="relative min-h-[120px]">
                    <div
                        className={cn(
                            "absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-lg  px-4 py-8 text-center",
                            showDraftMask
                                ? "border-amber-200/90 bg-black/75 backdrop-blur-[1px]"
                                : "hidden",
                        )}
                    >
                        <p className="w-full max-w-[400px] min-h-[150px] bg-white rounded-lg p-4 text-sm text-gray-700 drop-shadow-lg">
                            <span className="font-medium">
                                DAO setup - Hidden Form
                            </span>{" "}
                            Click Review button to view and edit the form.
                        </p>
                    </div>
                    <div
                        className={cn(
                            "relative",
                            showDraftMask &&
                                "pointer-events-none select-none opacity-40",
                        )}
                    >
                        {/* Main Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {FormGenerator(daoFormConfig())}
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
