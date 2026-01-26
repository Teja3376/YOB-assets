"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import StepIndicator from "./StepIndicator";
import { Button } from "@/components/ui/button";
import {Spinner} from "@/components/ui/spinner";
import AssetStages from "./AssetStages";
import { ASSET_STEPS_TABS } from "@/modules/Assets/utils/global";
// import { useAssetApi } from "@/hooks/asset/useAssetApi";
import { removeKeyFromObject } from "@/helpers/global";
import { ArrowLeft, ArrowRight, SaveIcon } from "lucide-react";
import { FormModeProvider } from "@/components/use-form/FormMode";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Loading from "@/components/ui/Loading";

/* ------------------ Lazy components ------------------ */
const AssetInformation = dynamic(() => import("./Steps/AssetInformation"));
const TokenInformation = dynamic(() => import("./Steps/TokenInformation"));
const MediaAndDocuments = dynamic(() => import("./Steps/MediaAndDocuments"));
const IssueDue = dynamic(() => import("./Steps/IssueDue"));
const FeaturesAndAmenities = dynamic(() => import("./Steps/FeaturesAndAmenities"));
const AdditionalDetails = dynamic(() => import("./Steps/AdditionalDetails"));
const LocationPlaces = dynamic(() => import("./Steps/LocationPlaces"));
const TermsAndConditions = dynamic(() => import("./Steps/TermsAndConditions"));
const SignatureInvestors = dynamic(() => import("./Steps/SignatureTemplate"));

export default function AssetPage() {
  const router = useRouter();
  const params = useParams<{ assetId?: string }>();
  const searchParams = useSearchParams();

  const assetId= params?.assetId ?? null;

  // const {
  //   createAsset,
  //   updateAsset,
  //   getAsset,
  //   asset = {},
  //   status,
  //   isPending,
  // } = useAssetApi();

  const [companyId, setCompanyId] = useState<string | null>(null);
  const [isLoadingAsset, setIsLoadingAsset] = useState(false);

  /* ------------------ Form ------------------ */
  const methods = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      class: "real-estate",
      category: "commercial",
      stage: "under-construction",
      currency: "INR",
      companyId: "",
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

  /* ------------------ Fetch asset ------------------ */
  useEffect(() => {
    if (!assetId) return;

    (async () => {
      setIsLoadingAsset(true);
      try {
        // const res = await getAsset(id);
        methods.reset(
          removeKeyFromObject({}, [
            "createdAt",
            "updatedAt",
            "__v",
            "status",
            "bookmarks",
          ])
        );
      } finally {
        setIsLoadingAsset(false);
      }
    })();
  }, [assetId]);

  /* ------------------ Query params ------------------ */
  useEffect(() => {
    const cid = searchParams.get("companyId");
    if (cid) setCompanyId(cid);
  }, [searchParams]);

  const { step, tab, isReadOnly } = useMemo(() => {
    const view = searchParams.get("view") || searchParams.get("mode");
    return {
      step: searchParams.get("step") || "asset-information",
      tab: searchParams.get("tab") || "asset-type",
      isReadOnly: view === "true" || view === "1" || view === "view",
    };
  }, [searchParams]);

  /* ------------------ Navigation helpers ------------------ */
  const buildUrl = (stepId: string, tabId?: string) => {
    const params = new URLSearchParams({ step: stepId });
    if (tabId) params.set("tab", tabId);
    return `/assets/${assetId ? `edit-asset/${assetId}` : "add-asset"}?${params}`;
  };

  const disabledSteps = useMemo(
    () => (!assetId ? ASSET_STEPS_TABS.slice(1).map((s:any) => s.id) : []),
    [assetId]
  );

  const changeStep = (stepId: string) => {
    if (disabledSteps.includes(stepId)) return;
    const stepObj = ASSET_STEPS_TABS.find((s:any) => s.id === stepId);
    if (!stepObj) return;
    router.push(buildUrl(stepObj.id, stepObj.tabs?.[0]?.id));
  };

  const nextTab = () => {
    if (!assetId) return;
    const idx = ASSET_STEPS_TABS.findIndex((s:any) => s.id === step);
    const stepObj = ASSET_STEPS_TABS[idx];
    const tabs = stepObj?.tabs || [];

    const tabIdx = tabs.findIndex((t:any) => t.id === tab);
    if (tabIdx !== -1 && tabIdx < tabs.length - 1) {
      router.push(buildUrl(stepObj.id, tabs[tabIdx + 1].id));
      return;
    }

    const next = ASSET_STEPS_TABS[idx + 1];
    if (next) router.push(buildUrl(next.id, next.tabs?.[0]?.id));
  };

  const previousStep = () => {
    if (!assetId) return;
    const idx = ASSET_STEPS_TABS.findIndex((s:any) => s.id === step);
    const stepObj = ASSET_STEPS_TABS[idx];
    const tabs = stepObj?.tabs || [];

    const tabIdx = tabs.findIndex((t:any) => t.id === tab);
    if (tabIdx > 0) {
      router.push(buildUrl(stepObj.id, tabs[tabIdx - 1].id));
      return;
    }

    const prev = ASSET_STEPS_TABS[idx - 1];
    if (prev) router.push(buildUrl(prev.id, prev.tabs?.[0]?.id));
  };

  /* ------------------ Submit ------------------ */
  const onSubmit: SubmitHandler<any> = async (data) => {
    const { nearByLocations, ...rest } = data;
    const payload = { ...rest, companyId: companyId || rest.companyId };

    // if (id) {
      // const res = await updateAsset(id, payload);
      // res?.data?.nearByLocations &&
      // setValue("nearByLocations", res.data.nearByLocations);
    // } else {
      // await createAsset(payload);
    // }
  };

  /* ------------------ UI ------------------ */
  if (isLoadingAsset && assetId) {
    return (
      <div className="flex items-center justify-center min-h-150">
        <Loading />
      </div>
    );
  }

  const isUpdating = status === "loading";
  const formData = watch();

  return (
    <div className="p-2 flex gap-2 bg-white">
      <div>
        <h1 className="text-2xl font-bold mb-8">
          {assetId ? "Update" : "Create"} Asset
        </h1>
        <StepIndicator
          steps={ASSET_STEPS_TABS}
          currentStep={step}
          changeStep={changeStep}
          disabledSteps={disabledSteps}
        />
      </div>

      <FormProvider {...methods}>
        <FormModeProvider isReadOnly={isReadOnly}>
          <form
            className="bg-white rounded-lg ml-2 p-2 w-full"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Suspense fallback={<Loading />}>
              {{
                "asset-information": <AssetInformation step={step} tab={tab} asset={[]} />,
                "token-information": <TokenInformation step={step} tab={tab} asset={[]} />,
                "media-documents": <MediaAndDocuments step={step} tab={tab} />,
                "issues-due-diligence": <IssueDue step={step} tab={tab} asset={[]} />,
                "features-amenities": <FeaturesAndAmenities step={step} tab={tab} />,
                "location-places": <LocationPlaces step={step} tab={tab} />,
                "additional-details": <AdditionalDetails step={step} tab={tab} />,
                "tandc-faq": <TermsAndConditions tab={tab} />,
                "signature-verification": <SignatureInvestors step={step} tab={tab} />,
              }[step] || null}
            </Suspense>

            <div className="py-4 flex justify-between">
              <Button type="button" onClick={previousStep} disabled={!assetId || isReadOnly}>
                <ArrowLeft className="mr-2" /> Back
              </Button>

              <div className="flex gap-4">
                <Button type="submit" disabled={!isDirty || isUpdating}>
                  <SaveIcon className="mr-2" />
                  Save
                </Button>

                {step !== "signature-verification" && (
                    <Button type="button" onClick={nextTab} disabled={!assetId}>
                    <ArrowRight /> Next
                  </Button>
                )}
              </div>
            </div>
          </form>
        </FormModeProvider>
      </FormProvider>

      <div className="sticky top-4">
        <AssetStages currentStep={step} asset={[]} formData={formData} />
      </div>
    </div>
  );
}
