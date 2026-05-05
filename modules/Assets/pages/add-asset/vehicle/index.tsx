"use client";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { FormModeProvider } from "@/components/use-form/FormMode";
import { removeKeyFromObject } from "@/helpers/global";
// import EngineAndSpecs from "@/modules/Assets/ui/add-vehicle/steps/EngineAndSpecs";
import StepIndicator from "@/modules/Assets/ui/add-asset/StepIndicator";
import { VEHICLE_STEPS_TABS } from "@/modules/Assets/utils/global";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, SaveIcon } from "lucide-react";
import { toast } from "sonner";
import useCreateVehicle from "@/modules/Assets/hooks/useCreateVehicle";
import useGetVehicleById from "@/modules/Assets/hooks/useGetVehicleById";
import useUpdateVehicle from "@/modules/Assets/hooks/useUpdateVehicle";
import dynamic from "next/dynamic";
import VehicleStages from "@/modules/Assets/ui/add-vehicle/VehicleStages";

const VehicleIdentification = dynamic(
  () => import("../../../ui/add-vehicle/steps/VehicleIdentification"),
);
const EngineAndSpecs = dynamic(
  () => import("../../../ui/add-vehicle/steps/EngineAndSpecs"),
);
const ValueAndInvestment = dynamic(
  () => import("../../../ui/add-vehicle/steps/ValueAndInvestment"),
);
const OwnerShipDocsInfo = dynamic(
  () => import("../../../ui/add-vehicle/steps/OwnerShipDocs"),
);

const toBodyTypeValue = (bodyType: unknown) => {
  if (typeof bodyType !== "string") return "";
  const normalized = bodyType.trim().toLowerCase();
  if (normalized === "berlinitta") return "berlinetta";
  return normalized;
};

const isMongoObjectIdString = (value: string) => /^[a-f\d]{24}$/i.test(value);

const normalizeDocumentPayload = (value: unknown) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const name =
          typeof (item as Record<string, unknown>).name === "string"
            ? (item as Record<string, unknown>).name
            : "";
        const url =
          typeof (item as Record<string, unknown>).url === "string"
            ? (item as Record<string, unknown>).url
            : "";
        if (!name || !url) return null;
        return { name, url };
      })
      .filter(Boolean);
  }

  if (value && typeof value === "object") {
    const doc = value as Record<string, unknown>;
    const name = typeof doc.name === "string" ? doc.name : "";
    const url = typeof doc.url === "string" ? doc.url : "";
    if (!name || !url) return [];
    return [{ name, url }];
  }

  return [];
};

const normalizeDocumentForForm = (value: unknown) => {
  if (Array.isArray(value)) {
    const first = value[0] as Record<string, unknown> | undefined;
    if (!first || typeof first !== "object") return { name: null, url: null };
    return {
      name: typeof first.name === "string" ? first.name : null,
      url: typeof first.url === "string" ? first.url : null,
    };
  }

  if (value && typeof value === "object") {
    const doc = value as Record<string, unknown>;
    return {
      name: typeof doc.name === "string" ? doc.name : null,
      url: typeof doc.url === "string" ? doc.url : null,
    };
  }

  return { name: null, url: null };
};

const buildVehiclePayload = (data: Record<string, any>) => {
  console.log("Form Data for Payload:", data);
  const trimVersion = String(data.trim ?? "").trim();
  const trim = trimVersion;
  const specialVersionName = trimVersion;
  const km = Number(data.odometer);
  const rawSpvId = typeof data.spvId === "string" ? data.spvId.trim() : "";
  const spvId =
    rawSpvId && isMongoObjectIdString(rawSpvId) ? rawSpvId : undefined;

  return {
    brand: data.brand,
    model: data.model,
    trim,
    specialVersionName,
    bodyType: toBodyTypeValue(data.bodyType),
    year: data.year,
    vinNumber: data.vin,
    km: Number.isFinite(km) ? Math.max(0, Math.trunc(km)) : 0,
    exteriorColor: data.exteriorColor,
    interiorColor: data.interiorColor,
    engineDisplacement: data.engineDisplacement,
    cylinders: data.cylinders,
    horsePower: data.horsePower,

    carDescription: data.about,
    investmentStats: data.investmentStats,
    registrationDocuments: normalizeDocumentPayload(data.registrationDocuments),
    omologationDocuments: normalizeDocumentPayload(data.omologationDocuments),
    proofOfOriginDocuments: normalizeDocumentPayload(data.proofOfOriginDocuments),
    Notarised: normalizeDocumentPayload(data.Notarised),
    EvaluationCertificates: normalizeDocumentPayload(data.EvaluationCertificates),
    InsuranceCertificates: normalizeDocumentPayload(data.InsuranceCertificates),
    ...(spvId ? { spvId } : {}),
  };
};

const mapVehicleToFormValues = (vehicle: Record<string, any>) => {
  const payload = removeKeyFromObject(vehicle, [
    "createdAt",
    "updatedAt",
    "__v",
    "status",
    "bookmarks",
  ]) as Record<string, any>;

  return {
    ...payload,
    "trim/version": payload.specialVersionName || payload.trim || "",
    vin: payload.vinNumber || "",
    odometer: payload.km ?? "",
    about: payload.carDescription || "",
    engineDisplacement:
      payload.engineDisplacement || payload.engineDisplacment || "",
    cylinders: payload.cylinders.toString() || "",
    horsePower: payload.horsePower || payload.Horsepower || "",
    registrationDocuments: normalizeDocumentForForm(payload.registrationDocuments),
    omologationDocuments: normalizeDocumentForForm(payload.omologationDocuments),
    proofOfOriginDocuments: normalizeDocumentForForm(payload.proofOfOriginDocuments),
    Notarised: normalizeDocumentForForm(payload.Notarised),
    EvaluationCertificates: normalizeDocumentForForm(payload.EvaluationCertificates),
    InsuranceCertificates: normalizeDocumentForForm(payload.InsuranceCertificates),
  };
};

export default function AddVehicle() {
  const router = useRouter();
  const { assetId } = useParams<{ assetId?: string }>();
  const searchParams = useSearchParams();

  const { mutate: createVehicle, isPending: isCreatingVehicle } =
    useCreateVehicle();
  const { mutate: updateVehicle, isPending: isUpdatingVehicle } =
    useUpdateVehicle();
  const { data: vehicle, isLoading: isLoadingVehicle } = useGetVehicleById(
    assetId!,
  );

  const methods = useForm<Record<string, any>>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      class: "vehicle",
      currency: "INR",
      spvId: "",
    },
  });

  const {
    getValues,
    trigger,
    setValue,
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
    const prev = VEHICLE_STEPS_TABS[idx - 1];
    if (prev) router.push(buildUrl(prev.id));
  };
  const nextTab = () => {
    const idx = VEHICLE_STEPS_TABS.findIndex((s: any) => s.id === step);
    const next = VEHICLE_STEPS_TABS[idx + 1];
    if (next) router.push(buildUrl(next.id));
  };

  useEffect(() => {
    if (!vehicle) return;
    methods.reset(mapVehicleToFormValues(vehicle));
  }, [vehicle, methods]);

  useEffect(() => {
    const fromQuery =
      searchParams.get("spvId")?.trim() ||
      searchParams.get("companyId")?.trim() ||
      "";
    if (!isMongoObjectIdString(fromQuery)) return;
    if (getValues("spvId") === fromQuery) return;
    setValue("spvId", fromQuery, { shouldDirty: false });
  }, [searchParams, getValues, setValue]);

  const onSubmit = (data: Record<string, any>) => {
    const payload = buildVehiclePayload(data);

    if (assetId) {
      updateVehicle(
        { vehicleId: assetId, vehicleData: payload },
        {
          onSuccess: () => {
            toast.success("Vehicle updated successfully");
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message || "Failed to update vehicle",
            );
          },
        },
      );
      return;
    }

    createVehicle(payload, {
      onSuccess: (res: any) => {
        toast.success("Vehicle created successfully");
        const newVehicleId = res?._id || res?.id;
        if (newVehicleId) {
          router.replace(
            `/assets/edit-asset/${newVehicleId}/vehicle?step=vehicle-identification`,
          );
        }
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to create vehicle",
        );
      },
    });
  };

  const handleNext = async () => {
    if (step === "vehicle-identification") {
      const fields = [
        "brand",
        "model",
        "trim/version",
        "bodyType",
        "year",
        "vin",
        "odometer",
        "exteriorColor",
        "interiorColor",
        "about",
      ];
      const isValid = await trigger(fields as any);
      if (!isValid) return;
      //   const data = getValues() as Record<string, any>;
      //   const payload = buildVehiclePayload(data);

      //   if (assetId) {
      //     updateVehicle(
      //       { vehicleId: assetId, vehicleData: payload },
      //       {
      //         onSuccess: () => {
      //           toast.success("Vehicle updated successfully");
      //           nextTab();
      //         },
      //         onError: (error: any) => {
      //           toast.error(
      //             error?.response?.data?.message || "Failed to update vehicle",
      //           );
      //         },
      //       },
      //     );
      //     return;
      //   }

      //   createVehicle(payload, {
      //     onSuccess: (res: any) => {
      //       toast.success("Vehicle created successfully");
      //       const newVehicleId = res?._id || res?.id;
      //       if (newVehicleId) {
      //         router.push(
      //           `/assets/edit-asset/${newVehicleId}/vehicle?step=engine-specs`,
      //         );
      //       }
      //     },
      //     onError: (error: any) => {
      //       toast.error(
      //         error?.response?.data?.message || "Failed to create vehicle",
      //       );
      //     },
      //   });
      //   return;
      // }

      nextTab();
    }

    if (step === "engine-specs") {
      const fields = ["engineDisplacement", "cylinders", "horsePower"];
      const isValid = await trigger(fields as any);
      if (!isValid) return;
      nextTab();
    }
    if (step === "valuation-investment") {
      const fields = [
        "investmentStats.startingValue",
        "investmentStats.targetFinalValue",
        "investmentStats.appreciationExpectedYearly",
        "investmentStats.minReturnToInvestors",
        "investmentStats.investmentPeriod",
        "investmentStats.linkToComparableListing",
      ];
      const isValid = await trigger(fields as any);
      if (!isValid) return;
      nextTab();
    }
  };

  if (isLoadingVehicle && assetId) {
    return (
      <div className="flex items-center justify-center min-h-150">
        <LoadingSpinner />
      </div>
    );
  }
  const formData = methods.watch();

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
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Suspense fallback={<LoadingSpinner />}>
              {{
                "vehicle-identification": (
                  <VehicleIdentification asset={vehicle || {}} />
                ),
                "engine-specs": <EngineAndSpecs asset={vehicle || {}} />,
                "valuation-investment": (
                  <ValueAndInvestment asset={vehicle || {}} />
                ),
                "ownership-documents": (
                  <OwnerShipDocsInfo asset={vehicle || {}} />
                ),
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
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={
                      isReadOnly ||
                      isUpdatingVehicle ||
                      isCreatingVehicle ||
                      isLoadingVehicle
                    }
                  >
                    <ArrowRight /> Next
                  </Button>
                )}

                {step !== "marketplace-connectors" && (
                  <Button
                    type="submit"
                    disabled={
                      !isDirty ||
                      isReadOnly ||
                      isUpdatingVehicle ||
                      isCreatingVehicle ||
                      isLoadingVehicle
                    }
                  >
                    <SaveIcon className="mr-2" />
                    {isCreatingVehicle || isUpdatingVehicle
                      ? "Saving..."
                      : "Save"}
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
      <VehicleStages
        currentStep={step}
        asset={vehicle || {}}
        formData={formData}
      />
    </div>
  );
}
