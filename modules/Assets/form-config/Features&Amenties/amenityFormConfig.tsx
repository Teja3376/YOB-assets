import { FormFieldConfig } from '@/components/use-form/ControllerMap';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'next/navigation';

/** Fills the description when a predefined amenity value is chosen (not used for custom “Add new” values unless you add a matching key). */
export const AMENITY_DEFAULT_DESCRIPTIONS: Record<string, string> = {
  'swimming-pool':
    'Outdoor or indoor swimming pool for residents and guests, with lounge seating and safe poolside access.',
  'fitness-center':
    'Fully equipped fitness center with cardio equipment, free weights, and strength training areas.',
  restaurant:
    'On-site restaurant offering meals and dining service for residents and visitors.',
  bar: 'Bar or lounge serving beverages and light snacks in a relaxed atmosphere.',
  'room-service':
    'In-room dining so meals and beverages can be delivered directly to units.',
  'business-center':
    'Business center with workstations, printing, and support for meetings and remote work.',
  'meeting-rooms':
    'Bookable meeting rooms suitable for small teams and client meetings.',
  'event-space':
    'Flexible event space for gatherings, workshops, and private functions.',
  'conference-rooms':
    'Conference rooms with seating and AV setup for presentations and corporate meetings.',
};

export const amenityFormConfig = (index: number): FormFieldConfig[] => {
  const { assetId } = useParams<{ assetId: string }>();
  const { control, setValue } = useFormContext();

  const descriptionPath = `amenities.${index}.description` as const;

  const onAmenityNameChange = (value: string) => {
    const preset = AMENITY_DEFAULT_DESCRIPTIONS[value];
    if (preset !== undefined) {
      setValue(descriptionPath, preset, { shouldDirty: true, shouldValidate: true });
    }
  };

  return [
    {
      type: 'inputSelectController',
      name: `amenities.${index}.name`,
      control,
      options : [
        { label: "Swimming Pool", value: "swimming-pool" },
        { label: "Fitness Center", value: "fitness-center" },
        { label: "Restaurant", value: "restaurant" },
        { label: "Bar", value: "bar" },
        { label: "Room Service", value: "room-service" },
        { label: "Business Center", value: "business-center" },
        { label: "Meeting Rooms", value: "meeting-rooms" },
        { label: "Event Space", value: "event-space" },
        { label: "Conference Rooms", value: "conference-rooms" },
      ],
      label: `Amenity Name `,
      placeholder: `Enter Name`,
      rules: {
        required: 'Name is required',
      },
      allowCreate: true,
      onChange: onAmenityNameChange,
    },
    {
      type: 'textarea',
      name: `amenities.${index}.description`,
      control,
      label: 'Description',
      placeholder: 'Enter Description',
    },

    {
      type: 'image',
      name: `amenities.${index}.image`,
      control,
      label: 'Image',
      accept: ['png', 'jpg', 'jpeg', 'webp', 'gif'],
      meta: {
        refId: assetId ?? '',
        belongsTo: 'asset',
        isPublic: true,
      },
      rules: {
        required: 'Image is required',
      },
    },
    {
      type: 'switch',
      name: `amenities.${index}.status`,
      control,
      label: 'Status',
      placeholder: 'Status',
    },
  ];
};

