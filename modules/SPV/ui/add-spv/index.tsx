"use client";

import { Suspense, useEffect, useMemo } from "react";
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
import { useParams, useRouter, useSearchParams } from "next/navigation";
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

const STEP_IDS = [
    "basic-information",
    "memo-terms",
    "escrow-bank-details",
    "legal-documents",
    "board-members",
    "dao-integration",
] as const;

const SpvFormPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { spvId: id } = useParams();

    const { createSpv, loading: createLoading } = useCreateSpv();
    const { updateSpv, status: updateStatus } = useUpdateSpv();
    const { getSpvWithId, status: getSpvWithIdStatus, responseData: getSpvWithIdResponseData } = useGetSpvWithId();

    const normalizedSpvData = useMemo(() => normalizedSpv(getSpvWithIdResponseData), [getSpvWithIdResponseData]);

    const step = (searchParams.get("step") as (typeof STEP_IDS)[number]) || DEFAULT_STEP;
    const basePath = id ? `/spv/edit-spv/${id}` : "/spv/add-spv";

    useEffect(() => {
        if (id) {
            getSpvWithId(id as string).catch((err: any) => {
                toast.error(err.response?.data?.message || "Failed to fetch SPV");
            });
        }
    }, [id]);

    const methods = useForm<SpvFormData>({
        defaultValues: { completedSteps: [] },
        mode: "onBlur",
    });

    useEffect(() => {
        if (normalizedSpvData && Object.keys(normalizedSpvData).length > 0 && id) {
            methods.reset({
                ...normalizedSpvData,
                completedSteps: normalizedSpvData.completedSteps ?? methods.getValues("completedSteps") ?? [],
            }, { keepDefaultValues: false });
        }
    }, [normalizedSpvData, id, methods]);

    const { watch } = methods;
    const { isDirty } = methods.formState;
    const completedSteps = watch("completedSteps") ?? [];

    const steps = useMemo(
        () => [
            {
                id: "basic-information",
                title: "Basic Information",
                description: "Company details",
                icon: <FileText className="h-5 w-5" />,
                disabled: false,
                completed: !!id,
            },
            {
                id: "memo-terms",
                title: "Memo & Terms",
                description: "Legal agreements",
                icon: <FileSignature className="h-5 w-5" />,
                disabled: !id,
                completed: !!id && completedSteps.includes("memo-terms"),
            },
            {
                id: "escrow-bank-details",
                title: "Escrow Bank Details",
                description: "Financial information",
                icon: <Building2 className="h-5 w-5" />,
                disabled: !id || !completedSteps.includes("memo-terms"),
                completed: completedSteps.includes("escrow-bank-details"),
            },
            {
                id: "legal-documents",
                title: "Legal Documents",
                description: "Required paperwork",
                icon: <ClipboardCheck className="h-5 w-5" />,
                disabled: !id || !completedSteps.includes("escrow-bank-details"),
                completed: completedSteps.includes("legal-documents"),
            },
            {
                id: "board-members",
                title: "Board Members",
                description: "Leadership team",
                icon: <Users className="h-5 w-5" />,
                disabled: !id || !completedSteps.includes("legal-documents"),
                completed: completedSteps.includes("board-members"),
            },
            {
                id: "dao-integration",
                title: "DAO Integration",
                description: "Blockchain setup",
                icon: <Wallet2 className="h-5 w-5" />,
                disabled: !id || !completedSteps.includes("board-members"),
                completed: completedSteps.includes("dao-integration"),
            },
        ],
        [id, completedSteps]
    );

    const currentIndex = steps.findIndex((s) => s.id === step);
    const isFirstStep = currentIndex <= 0;
    const isLastStep = currentIndex >= steps.length - 1;
    const isSaving = createLoading || updateStatus === "loading";

    const changeStep = (stepId: string) => {
        router.push(`${basePath}?step=${stepId}`);
    };

    const handleBack = () => {
        if (!isFirstStep) router.push(`${basePath}?step=${steps[currentIndex - 1].id}`);
    };

    const handleNext = async () => {
        const isValid = await methods.trigger();
        if (!isValid) return;

        if (step === "board-members") {
            const data = methods.getValues();
            if (!data.boardOfDirectors?.additionalBoardMembers?.length) {
                toast.error("Please add at least one board member.");
                return;
            }
        }

        if (isLastStep || !id) return;

        const data = methods.getValues();
        const nextCompleted = completedSteps.includes(step) ? completedSteps : [...completedSteps, step];
        const payload = { ...data, completedSteps: nextCompleted } as any;

        try {
            await updateSpv(id as string, payload);
            methods.setValue("completedSteps", nextCompleted, { shouldDirty: false });
            router.push(`${basePath}?step=${steps[currentIndex + 1].id}`);
        } catch (err: any) {
            console.error(err.response?.data?.message ?? "SPV save failed");
        }
    };

    const onSubmit: SubmitHandler<SpvFormData> = async (data) => {
        const payload = { ...data } as any;
        try {
            if (id) {
                const nextCompleted = completedSteps.includes(step)
                    ? completedSteps
                    : [...completedSteps, step];
                payload.completedSteps = nextCompleted;
                await updateSpv(id as string, payload);
                methods.setValue("completedSteps", nextCompleted, { shouldDirty: false });
            } else {
                payload.completedSteps = [step];
                await createSpv(payload);
            }
        } catch (err: any) {
            console.error(err.response?.data?.message ?? "SPV save failed");
        }
    };

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

    if (getSpvWithIdStatus === "loading" && id) {
        return (
            <div className="container mx-auto px-6 py-8 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <LoadingSpinner/>
                    <p className="mt-4 text-muted-foreground">Loading SPV data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-8 space-y-4">
            {isSaving && (
                <div className="flex items-center justify-center">
                    <LoadingSpinner/>
                </div>
            )}

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {id ? "Update" : "Create"} SPV
                </h1>
                <Button
                    onClick={() => router.push("/spv")}
                    variant="outline"
                    disabled={isSaving}
                >
                    <span className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to SPV List
                    </span>
                </Button>
            </div>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Stepper steps={steps} currentStepId={step} onStepChange={changeStep} />

                    <div className="border rounded-lg mt-4 p-4">
                        <Suspense fallback={<LoadingSpinner />}>{renderStepContent}</Suspense>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isFirstStep || isSaving}
                            onClick={handleBack}
                        >
                            <ArrowLeft className="mr-2" />
                            Back
                        </Button>

                        <div className="flex gap-3">
                            <Button
                                type="submit"
                                className="px-3 text-white transition-colors duration-200 flex items-center gap-2"
                                disabled={isSaving || !isDirty}
                            >
                                {isSaving ? (
                                    <>
                                        {/* <LoadingSpinner/> */}
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
                                disabled={isLastStep || !id  || isSaving}
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
