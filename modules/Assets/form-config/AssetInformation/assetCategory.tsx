

import { Building, Home, Car, LandPlot } from 'lucide-react';


import { useParams } from 'next/navigation';

export const assetCategory = () => {
  
  const param = useParams();

  let disable = false;

  if(param.id){
    disable = true;
  }
  
  return [
    {
      type: 'button',
      name: 'category',
      icon: <Building className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Commercial',
      value: 'commercial',
      disabled: disable,
    },
    {
      type: 'button',
      name: 'category',
      icon: <Home className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Holiday Homes',
      value: 'holiday-homes',
      disabled: disable,
    },
    {
      type: 'button',
      name: 'category',
      icon: <Car className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Residential',
      value: 'residential',
      disabled: disable,
    },
    {
      type: 'button',
      name: 'category',
      icon: <LandPlot className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Land',
      value: 'land',
      disabled: true,
    },
  ];
};
