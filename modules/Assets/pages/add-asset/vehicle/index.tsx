"use client";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { FormModeProvider } from "@/components/use-form/FormMode";
import { removeKeyFromObject } from "@/helpers/global";
import StepIndicator from "@/modules/Assets/ui/add-asset/StepIndicator";
import { VEHICLE_STEPS_TABS } from "@/modules/Assets/utils/global";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import VehicleIdentification from "@/modules/Assets/ui/add-vehicle/steps/VehicleIdentification";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, SaveIcon } from "lucide-react";

export default function AddVehicle() {
  const router = useRouter();
  const { assetId } = useParams<{ assetId?: string }>();
  const searchParams = useSearchParams();

  const methods = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      class: "vehicle",
      currency: "INR",
      spvId: "",
    },
    values: removeKeyFromObject({}, [
      "createdAt",
      "updatedAt",
      "__v",
      "status",
      "bookmarks",
    ]),
  });

  const {
    getValues,
    trigger,
    setValue,
    watch,
    formState: { isDirty },
  } = methods;

  const { step, isReadOnly } = useMemo(() => {
    const view = searchParams.get("view") || searchParams.get("mode");
    return {
      step: searchParams.get("step") || "vehicle-identification",
      //   tab: searchParams.get("tab") || "asset-type",
      isReadOnly: view === "true" || view === "1" || view === "view",
    };
  }, [searchParams]);

  const buildUrl = (stepId: string) => {
    const params = new URLSearchParams({ step: stepId });
    // if (tabId) params.set("tab", tabId);
    return `/assets/${assetId ? `edit-asset/${assetId}/vehicle` : "add-asset/vehicle"}?${params}`;
  };

  const disabledSteps = useMemo(
    () => (!assetId ? VEHICLE_STEPS_TABS.slice(1).map((s: any) => s.id) : []),
    [assetId],
  );

  const changeStep = (stepId: string) => {
    if (disabledSteps.includes(stepId)) return;
    const stepObj = VEHICLE_STEPS_TABS.find((s: any) => s.id === stepId);
    if (!stepObj) return;
    router.push(buildUrl(stepObj.id));
  };
  const previousStep = () => {
    if (!assetId) return;
    const idx = VEHICLE_STEPS_TABS.findIndex((s: any) => s.id === step);
    const stepObj = VEHICLE_STEPS_TABS[idx];

    const prev = VEHICLE_STEPS_TABS[idx - 1];
    if (prev) router.push(buildUrl(prev.id));
  };
  const nextTab = () => {
    if (!assetId) return;
    const idx = VEHICLE_STEPS_TABS.findIndex((s: any) => s.id === step);
    const stepObj = VEHICLE_STEPS_TABS[idx];

    const next = VEHICLE_STEPS_TABS[idx + 1];
    if (next) router.push(buildUrl(next.id));
  };
  const formData = watch();

  return (
    <div className="flex items-start gap-3 bg-white p-2">
      <div>
        <StepIndicator
          steps={VEHICLE_STEPS_TABS}
          currentStep={step}
          changeStep={changeStep}
          disabledSteps={disabledSteps}
        />
      </div>
      <FormProvider {...methods}>
        <FormModeProvider isReadOnly={isReadOnly}>
          <form
            className="bg-white rounded-lg ml-2 py-2 px-2 w-full"
            // onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Suspense fallback={<LoadingSpinner />}>
              {{
                "vehicle-identification": <VehicleIdentification asset={{}} />,
              }[step] || null}
            </Suspense>

            <div className="py-4 flex justify-between">
              <Button
                type="button"
                onClick={previousStep}
                disabled={!assetId || isReadOnly}
              >
                <ArrowLeft className="mr-2" /> Back
              </Button>

              <div className="flex gap-4">
                {step !== "marketplace-connectors" && (
                  <Button type="button" onClick={nextTab} disabled={!assetId}>
                    <ArrowRight /> Next
                  </Button>
                )}

                {step !== "smarketplace-connectors" && (
                  <Button type="submit" disabled={!isDirty}>
                    <SaveIcon className="mr-2" />
                    {/* {isUpdating ? "Saving..." : "Save"} */}Save
                  </Button>
                )}
                {step === "marketplace-connectors" && (
                  <Button
                    type="button"
                    // onClick={reviewAndSubmit}
                    disabled={!assetId}
                  >
                    <SaveIcon className="mr-2" />
                    Review & Submit
                  </Button>
                )}
              </div>
            </div>
          </form>
        </FormModeProvider>
      </FormProvider>
    </div>
  );
}
