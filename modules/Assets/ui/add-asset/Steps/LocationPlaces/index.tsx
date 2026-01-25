

import { useRouter, useParams } from 'next/navigation';
import { lazy, Suspense, memo, useCallback, useMemo, JSX } from 'react';
import { ASSET_STEPS_TABS } from '@/modules/Assets/utils/global';
import Loading from '@/components/ui/Loading';
const Location = lazy(() => import('./Location'));

interface Props {
  tab: string;
  step: string;
}

const COMPONENT_MAP: Record<string, JSX.Element> = {
  location: (
    <Suspense fallback={<Loading />}>
      <Location />
    </Suspense>
  ),
} as const;

const LocationPlaces = memo(({ tab, step }: Props) => {
  const { assetId = null } = useParams<{ assetId?: string }>();
  const router = useRouter();

  // Memoized tab change handler
  const handleTabChange = useCallback(
    (tabId: string) => {
      const basePath = assetId ? `/assets/edit-asset/${assetId}` : '/assets/add-asset';
      router.push(`${basePath}?step=${step}&tab=${tabId}`);
    },
    [assetId, router, step]
  );

  const tabs = useMemo(() => {
    const stepTabs =
      ASSET_STEPS_TABS.find((ele) => ele.id === step)?.tabs || [];
    return stepTabs.map((tabItem) => ({
      id: tabItem.id,
      title: tabItem.title,
      component: COMPONENT_MAP[tabItem.id] || <div />,
    }));
  }, [step]);

  return (
    <Suspense fallback={<div>Location Information...</div>}>
      <div className='L'>
        <h1 className='text-2xl font-bold mb-4'>Location & Places</h1>
        <Location />
        {/* <CustomTabs
          defaultTab={tab}
          tabs={tabs}
          handleTabChange={handleTabChange}
          aria-label='Location and places tabs'
        /> */}
      </div>
    </Suspense>
  );
});

LocationPlaces.displayName = 'LocationPlaces';

export default LocationPlaces;
