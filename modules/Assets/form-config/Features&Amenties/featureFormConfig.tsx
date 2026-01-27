

import { FormFieldConfig } from '@/components/use-form/ControllerMap';
import { ColumnProps } from '@/modules/SPV/utils/interface';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'next/navigation';

export const featureFormConfig = (index: number): FormFieldConfig[] => {
  const { control } = useFormContext();
  const { assetId } = useParams<{ assetId: string }>();

  return [
    {
      type: 'text',
      name: `features.${index}.name`,
      control,
      label: `Feature Name`,
      fullWidth: true,
      placeholder: `Enter Name`,
      rules: {
        required: 'Feature Name is required',
      },
    },

    {
      type: 'textarea',
      name: `features.${index}.description`,
      control,
      label: 'Description',
      fullWidth: true,
      placeholder: 'Enter Description',
    },

    {
      type: 'image',
      name: `features.${index}.image`,
      control,
      label: 'Image',
      accept: ['png', 'jpg', 'jpeg', 'webp', 'gif'],
      fullWidth: true,
      placeholder: 'Upload Image',
      meta: {
        refId: assetId || '',
        belongsTo: 'asset',
        isPublic: true,
      },
      rules: {
        required: 'Image is required',
      },
    },
    {
      type: 'switch',
      name: `features.${index}.status`,
      control,
      label: 'Status',
      placeholder: 'Status',
    },
  ];
};

