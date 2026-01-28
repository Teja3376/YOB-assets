import React from 'react'
import FormGenerator from '@/components/use-form/FormGenerator';
import  assetHostedByFormConfig  from '@/modules/Assets/form-config/Issue&Due/assetHostedByFormConfig';  


const AssetHostedBy = ({countryCode}: {countryCode: string}) => {

  console.log("countryCode in asset hosted by", countryCode)
  return (
    <div>
      <div>
        <h1 className='text-2xl font-bold mb-2'>Asset Owned By</h1>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        {FormGenerator(assetHostedByFormConfig(countryCode))}
      </div>
    </div>
  );
}

export default AssetHostedBy
