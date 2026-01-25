

import { useParams } from 'next/navigation';
import { lazy, Suspense, memo, useCallback, useMemo, JSX } from 'react';
import CustomTabs from '@/components/ui/custom-tab';
import { ASSET_STEPS_TABS } from '@/modules/Assets/utils/global';
import Loading from '@/components/ui/Loading';
import AssetHostedBy from './AssetHostedBy';
import IssueDueDeligence from './IssueDueDeligence';
import { useRouter } from 'next/navigation';

interface Props {
  tab: string;
  step: string;
  asset: any;
}


const IssuesDue = memo(({ tab, step, asset }: Props) => {
  const { assetId } = useParams<{ assetId?: string }>();
  const router = useRouter();
  const country = asset.country;

  let countryCode = "";
  if (country) {
    switch (country) {
      case "IN":
        countryCode = "+91";
        break;
      case "US":
        countryCode = "+1";
        break;
      case "UK":
        countryCode = "+44";
        break;
      case "AE":
        countryCode = "+971";
        break;
      case "QAR":
        countryCode = "+974";
        break;
      default:
        countryCode = "";
    }
  }
  console.log("countryCode", countryCode)
  // Memoized tab change handler
  const handleTabChange = useCallback(

    (tabId: string) => {
      const basePath = assetId ? `/assets/edit-asset/${assetId}` : '/assets/add-asset';
      router.push(`${basePath}?step=${step}&tab=${tabId}`);
    },
    [assetId, step]
  );

  const tabs = useMemo(() => {
    const stepTabs =
      ASSET_STEPS_TABS.find((ele: any) => ele.id === step)?.tabs || [];

    const componentMap: Record<string, JSX.Element> = {
      'asseet-hosted-by': (
        <Suspense fallback={<Loading />}>
          <AssetHostedBy countryCode={countryCode} />
        </Suspense>
      ),
      'asseet-due-diligence': (
        <Suspense fallback={<Loading />}>
          <IssueDueDeligence />
        </Suspense>
      ),
    };

    return stepTabs.map((tabItem: any) => ({
      id: tabItem.id,
      title: tabItem.title,
      component: componentMap[tabItem.id] || <div />,
    }));
  }, [step, countryCode]);



  return (
    <Suspense fallback={<div>Loading Asset Information...</div>}>
      <div className='asset-information'>
        <h1 className='text-2xl font-bold mb-4'> Due Diligence </h1>
        <CustomTabs
          defaultTab={tab}
          tabs={tabs}
          handleTabChange={handleTabChange}
          aria-label='Asset information tabs'
        />
      </div>
    </Suspense>
  );
});

IssuesDue.displayName = 'IssuesDue';

export default IssuesDue;
