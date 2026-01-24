"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/LoadingSpinner";
import { Stepper } from "@/components/ui/long-stepper";
import {
    ArrowLeft,
    ArrowRight,
    Building2,
    ClipboardCheck,
    FileSignature,
    FileText,
    Save,
    Users,
    Wallet2,
} from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import BasicInformation from "./Steps/BasicInformation";
import Memos from "./Steps/Memos";
import EscrowDetails from "./Steps/EscrowDetails";
import LegalDocuments from "./Steps/LegalDocuments";
import BoardMembers from "./Steps/BoardMembers";
import DAOCreation from "./Steps/DAO";
import useCreateSpv from "../../hooks/useCreateSpv";
import useUpdateSpv from "../../hooks/useUpdateSpv";
import useGetSpvWithId from "../../hooks/useGetSpvWithId";
import normalizedSpv from "../../utils/normalizedspv";
const DEFAULT_STEP = "basic-information";

interface SpvFormData {
    completedSteps?: string[];
    [key: string]: any;
}

const SpvFormPage = () => {
    //routers to navigate
    const router = useRouter();
    //getting spv id from url
    const { spvId: id } = useParams();
    //creating spv hooks
    const { createSpv, loading: createLoading, responseData: createResponseData, error: createError } = useCreateSpv();
    //updating spv hooks
    const { updateSpv, status: updateStatus, error: updateError, responseData: updateResponseData } = useUpdateSpv();
    //getting spv with id hooks
    const { getSpvWithId, status: getSpvWithIdStatus, error: getSpvWithIdError, responseData: getSpvWithIdResponseData } = useGetSpvWithId();
    const normalizedSpvData = useMemo(() => normalizedSpv(getSpvWithIdResponseData), [getSpvWithIdResponseData]);
    console.log("normalizedSpvData", normalizedSpvData);
    useEffect(() => {
        const fetchSpv = async () => {
          if (id) {
           
            try {
              await getSpvWithId(id as string);
            } catch (error: any) {
              toast.error(error.response?.data?.message || "Failed to fetch Spv");
            }
          }
        };
        fetchSpv();
      }, [id]);
    
    const methods = useForm<SpvFormData>({
        defaultValues: {
            completedSteps: [],
        },
        mode: "onBlur",
    });

    // Populate form when SPV data is loaded
    useEffect(() => {
        if (normalizedSpvData && Object.keys(normalizedSpvData).length > 0 && id) {
            // Reset form with SPV data
            methods.reset({
                ...normalizedSpvData,
                completedSteps: normalizedSpvData.completedSteps || methods.getValues("completedSteps") || [],
            }, {
                keepDefaultValues: false,
            });
        }
    }, [normalizedSpvData, id, methods]);


    const { watch } = methods;
    const { isDirty } = methods.formState;
    const completedSteps = watch("completedSteps") || [];

    const [step, setStep] = useState(DEFAULT_STEP);
    /** Highest step index reached via Next; used to restrict stepper in create mode */

    const renderStepContent = useMemo(() => {
        switch (step) {
            case "basic-information":
                return <BasicInformation spv={normalizedSpvData} />;
            case "memo-terms":
                return <Memos />;
            case "escrow-bank-details":
                return <EscrowDetails />;
            case "legal-documents":
                return <LegalDocuments />;
            case "board-members":
                return <BoardMembers />;
            case "dao-integration":
                return <DAOCreation />;
            default:
                return null;
        }
    }, [step, normalizedSpvData]);

  
    const steps = useMemo(
        () => [
            {
                id: "basic-information",
                title: "Basic Information",
                description: "Company details",
                icon: <FileText className="h-5 w-5" />,
            },
            {
                id: "memo-terms",
                title: "Memo & Terms",
                description: "Legal agreements",
                icon: <FileSignature className="h-5 w-5" />,
            },
            {
                id: "escrow-bank-details",
                title: "Escrow Bank Details",
                description: "Financial information",
                icon: <Building2 className="h-5 w-5" />,
            },
            {
                id: "legal-documents",
                title: "Legal Documents",
                description: "Required paperwork",
                icon: <ClipboardCheck className="h-5 w-5" />,
            },
            {
                id: "board-members",
                title: "Board Members",
                description: "Leadership team",
                icon: <Users className="h-5 w-5" />,
            },
            {
                id: "dao-integration",
                title: "DAO Integration",
                description: "Blockchain setup",
                icon: <Wallet2 className="h-5 w-5" />,
            },
        ],
        []
    );

    const currentIndex = steps.findIndex((s) => s.id === step);
    const isFirstStep = currentIndex === 0;
    const isLastStep = currentIndex === steps.length - 1;

    const handleBack = () => {
        if (!isFirstStep) {
            setStep(steps[currentIndex - 1].id);
        }
    };

    const handleNext = async () => {
        const isValid = await methods.trigger();
        if (!isValid) return;

        if (step === "board-members") {
            const data = methods.getValues();
            if (
                !data.boardOfDirectors?.additionalBoardMembers?.length
            ) {
                toast.error("Please add at least one board member.");
                return;
            }
        }

        if (!isLastStep) {
            setStep(steps[currentIndex + 1].id);
        }
    };
        //assset submoit logic

    const onSubmit: SubmitHandler<any> = async (data: any) => {
        const payload = { ...data };
        console.log("paylaod is here @##$#", payload);
        try {
          if (id) {
            payload.completedSteps = completedSteps.includes(step)
              ? completedSteps
              : [...completedSteps, step];
            await updateSpv(id as string, payload);
          } else {
            payload.completedSteps = [step];
            await createSpv(payload);
          }
        } catch (error: any) {
          console.error(error.response?.data?.message || "SPV save failed");
        } 
      };

  
    return (
        <div className="container mx-auto   px-6 py-8 space-y-4">
            {createLoading && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <LoadingSpinner size="h-12 w-12" />
                </div>
            )}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {id ? "Update" : "Create"} SPV
                </h1>
                <Button
                    onClick={() => router.push("/spv")}
                    variant="outline"
                    disabled={createLoading}
                >
                    <span className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to SPV List
                    </span>
                </Button>
            </div>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Stepper steps={steps} currentStepId={step} onStepChange={setStep} />

                    <div className="border rounded-lg mt-4 p-4">
                        <Suspense fallback={<Loading />}>
                            {renderStepContent}
                        </Suspense>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isFirstStep}
                            onClick={handleBack}
                        >
                            <ArrowLeft className="mr-2" />
                            Back
                        </Button>

                        <div className="flex gap-3">
                            <Button
                                type="submit"
                                className="px-3 text-white transition-colors duration-200 flex items-center gap-2"
                                disabled={createLoading || !isDirty}
                            >
                                {createLoading ? (
                                    <>
                                        <LoadingSpinner size="h-4 w-4" className="mr-2" />
                                        {id ? "Updating..." : "Creating..."}
                                    </>
                                ) : (
                                    <>
                                        <Save />
                                        {id ? "Update Changes" : "Create Spv"}
                                    </>
                                )}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                disabled={isLastStep}
                                onClick={handleNext}
                            >
                                Next
                                <ArrowRight className="ml-2" />
                            </Button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default SpvFormPage;
