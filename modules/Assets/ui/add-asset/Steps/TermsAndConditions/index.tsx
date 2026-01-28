

import { useRouter, useParams } from 'next/navigation';
import { Suspense, memo } from 'react';
import CustomTabs from '@/components/ui/custom-tab';
import Faq from './Faq';
import Terms from './Terms';

interface Props {
  tab: string;
}

const TermsAndConditions = memo(({ tab }: Props) => {
  const { assetId = null } = useParams<{ assetId?: string }>();
  const router = useRouter();
  const handleTabChange = (tabId: string) => {
    const basePath = assetId ? `/assets/edit-asset/${assetId}` : '/assets/add-asset';
    router.push(`${basePath}?step=tandc-faq&tab=${tabId}`);
  };

  const tabs = [
    {
      id: 'terms-and-conditions',
      title: 'Terms & Conditions',
      component: <Terms />,
    },
    {
      id: 'faq',
      title: 'FAQ',
      component: <Faq />,
    },
  ];

  return (
    <Suspense fallback={<div>Loading Asset Information...</div>}>
      <div className='asset-information'>
        <h1 className='text-2xl font-bold mb-4'>Terms & Conditions, FAQ</h1>
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

export default TermsAndConditions;
