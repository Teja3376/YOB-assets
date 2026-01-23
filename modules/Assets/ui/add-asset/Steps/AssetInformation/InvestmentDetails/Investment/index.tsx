import React from 'react'
import { useForm } from 'react-hook-form'
import { formConfig } from '../../../../../../form-config/AssetInformation/investmentConfig'
import FormGenerator from '@/components/use-form/FormGenerator'
import Collapseble from '@/components/ui/collapse'
import InfoTag from '@/components/cards/asset/InfoTag'
import { ChartLine } from 'lucide-react';

const index = () => {
  const methods = useForm();
  const control = methods.control;

  return (
    <div>
      <h1 className='text-2xl font-bold'>Investment Performance</h1>
      <div className='grid grid-cols-2 gap-4'>
        {FormGenerator(formConfig())}
      </div>
      {/* <InfoTag
        info='Estimated SALE Price (1 Year)'
        amount='$100,000'
        icon={<ChartLine />}
      />
      <InfoTag
        info='Estimated Return (1 Years)'
        amount='$100,000'
        icon={<ChartLine />}
      /> */}
    </div>
  );
};

export default index
