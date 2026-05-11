import React from 'react'
import FormGenerator from '@/components/use-form/FormGenerator';
import  assetHostedByFormConfig  from '@/modules/Assets/form-config/Issue&Due/assetHostedByFormConfig';  
import { useFormContext } from 'react-hook-form';


const AssetHostedBy = ({countryCode}: {countryCode: string}) => {
  const { control } = useFormContext();
  console.log("countryCode in asset hosted by", countryCode)
  return (
    <div>
      <div>
        <h1 className='text-2xl font-bold mb-2'>Asset Owned By</h1>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        {FormGenerator(assetHostedByFormConfig(countryCode,control))}
      </div>
    </div>
  );
}

export default AssetHostedBy
