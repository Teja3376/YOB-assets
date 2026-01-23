

import { useParams, useRouter } from 'next/navigation';
import { lazy, Suspense, memo, useCallback, useMemo, JSX } from 'react';
import CustomTabs from '@/components/ui/custom-tab';
import { ASSET_STEPS_TABS } from '@/modules/Assets/utils/global';
import Loading from '@/components/ui/Loading';
import Gallery from './Gallery';
import Documents from './Documents';

interface Props {
  tab: string;
  step: string;
}

const COMPONENT_MAP: Record<string, JSX.Element> = {
  gallery: (
    <Suspense fallback={<Loading />}>
      <Gallery />
    </Suspense>
  ),
  documents: (
    <Suspense fallback={<Loading />}>
      <Documents />
    </Suspense>
  ),
} as const;

const IssuesDue = memo(({ tab, step }: Props) => {
  const { id = null } = useParams<{ id?: string }>();
  const router = useRouter();

  // Memoized tab change handler
  const handleTabChange = useCallback(
    (tabId: string) => {
      const basePath = id ? `/assets/edit-asset/${id}` : '/assets/add-asset';
      router.push(`${basePath}?step=${step}&tab=${tabId}`);
    },
    [id, router, step]
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
    <Suspense fallback={<div>Loading Asset Information...</div>}>
      <div className='asset-information'>
        <h1 className='text-2xl font-bold mb-4'>Media & Documents</h1>
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

export default IssuesDue;
