

import { useFormContext } from 'react-hook-form';
import { useParams } from 'next/navigation';

export const legalFormConfig = (index: number) => {
  const { control , watch} = useFormContext();
  const { assetId } = useParams<{ assetId?: string }>();
  console.log(assetId, 'assetId');
  const meta = watch('dueDiligence.legal.${index}.logoUrl');
  console.log(meta, 'meta');
  return [
    {
      name: `dueDiligence.legal.${index}.name`,
      label: 'Name',
      type: 'text',
      control,
      rules: {
        value: true,
        required: 'Name is required',
        minLength: {
          value: 3,
          message: 'Name must be at least 3 characters',
        },
        maxLength: {
          value: 100,
          message: 'Name must be less than 100 characters',
        },
      },
    },
    {
      name: `dueDiligence.legal.${index}.location`,
      label: 'Location',
      type: 'text',
      control,
      rules: {
        required: 'Location is required',
        value: true,
        minLength: {
          value: 3,
          message: 'Location must be at least 3 characters',
        },
        maxLength: {
          value: 100,
          message: 'Location must be less than 100 characters',
        },
      },
    },
    {
      name: `dueDiligence.legal.${index}.link`,
      label: 'Link',
      type: 'url',
      control,
      rules: {
        required: 'Link is required',
        value: true,
        minLength: {
          value: 3,
          message: 'Link must be at least 3 characters',
        },
      },
    },
    {
      name: `dueDiligence.legal.${index}.logoUrl`,
      label: 'Logo',
      type: 'image',
      control,
      rules: {
        required: 'Logo is required',
        value: true,
      },
      accept: ['jpg', 'png', 'jpeg', 'svg', 'webp'],
      meta: {
        refId: assetId ?? '',
        belongsTo: 'asset',
        isPublic: true,
      },
    },
  ];
};


