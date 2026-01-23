
import { Building, Home, Car, GitCommitVertical, LucideHome, LucideBuilding2 } from 'lucide-react';
import { useParams } from 'next/navigation';
export const assetStageConfig = () => {

  const param = useParams(); 
   let disable = false;

  if(param.id){
    disable = true;
  }
  return [
    {
      type: 'button',
      name: 'stage',
      icon: <Building className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Construction',
      value: 'under-construction',
      disabled:   true,
    },
    {
      type: 'button',
      name: 'stage',
      icon: <LucideBuilding2 className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Fully Rented',
      value: 'fully-rented',
      disabled: disable,
    },
    {
      type: 'button',
      name: 'stage',
      icon: <LucideHome className='w-8 h-8' />,
      className: 'h-32 w-full',
      label: 'Renovation',
      value: 'renovation',
      disabled: true,
    },
  ];
};
