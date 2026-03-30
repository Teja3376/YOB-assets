import { FormFieldConfig } from '@/components/use-form/ControllerMap';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'next/navigation';

/** Fills the description when a predefined feature value is chosen. */
export const FEATURE_DEFAULT_DESCRIPTIONS: Record<string, string> = {
  'smart-home':
    'Integrated smart systems for lighting, climate, and access control that residents can manage digitally.',
  '24-7-security':
    'Round-the-clock security staffing, monitored access points, and surveillance for the property.',
  parking:
    'Dedicated parking for residents and visitors, including assigned or shared spaces as applicable.',
  'elevator-access':
    'Elevator service to all floors for convenient vertical access throughout the building.',
  'high-speed-wifi':
    'High-speed internet connectivity suitable for work-from-home and streaming across common and private areas.',
  'green-building':
    'Sustainable design and operations with energy-efficient systems and reduced environmental impact.',
  'backup-power':
    'Backup power capability for essential systems during outages.',
  concierge:
    'Front-desk or concierge support for residents, guests, and day-to-day building services.',
  'pet-friendly':
    'Policies and facilities that accommodate pets within defined rules for the community.',
  'wheelchair-accessible':
    'Accessible routes, entries, and facilities designed for mobility-inclusive use.',
};

export const featureFormConfig = (index: number): FormFieldConfig[] => {
  const { control, setValue } = useFormContext();
  const { assetId } = useParams<{ assetId: string }>();

  const descriptionPath = `features.${index}.description`;

  const onFeatureNameChange = (value: string) => {
    const preset = FEATURE_DEFAULT_DESCRIPTIONS[value];
    if (preset !== undefined) {
      setValue(descriptionPath, preset, { shouldDirty: true, shouldValidate: true });
    }
  };

  return [
    {
      type: 'inputSelectController',
      name: `features.${index}.name`,
      control,
      options: [
        { label: 'Smart Home', value: 'smart-home' },
        { label: '24/7 Security', value: '24-7-security' },
        { label: 'Parking', value: 'parking' },
        { label: 'Elevator Access', value: 'elevator-access' },
        { label: 'High-Speed WiFi', value: 'high-speed-wifi' },
        { label: 'Green Building', value: 'green-building' },
        { label: 'Backup Power', value: 'backup-power' },
        { label: 'Concierge', value: 'concierge' },
        { label: 'Pet Friendly', value: 'pet-friendly' },
        { label: 'Wheelchair Accessible', value: 'wheelchair-accessible' },
      ],
      label: 'Feature Name',
      fullWidth: true,
      placeholder: 'Enter Name',
      rules: {
        required: 'Feature Name is required',
      },
      allowCreate: true,
      onChange: onFeatureNameChange,
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
