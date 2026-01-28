

import { FormFieldConfig } from '@/components/use-form/ControllerMap';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'next/navigation';

export const legalFormConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext();
  const { assetId } = useParams<{ assetId?: string }>();
  return [
    {
      type: 'text',
      name: 'legalAdivisory.name',
      control,
      label: 'Legal Advisory',
      rules: {
        required: 'Legal advisory is required',
        value: true,
      },
    },
    {
      type: 'file',
      name: 'legalAdivisory.document',
      control,
      label: 'SLA Agreement',
      rules: {
        required: 'SLA agreement is required',
        value: true,
      },
      meta: {
        refId: assetId || '',
        belongsTo: 'asset',
        isPublic: true,
      },
      maxSize: 5 * 1024 * 1024, // 5MB
      accept: ['pdf', 'docx', 'doc'],
    },
  ];
};

export const brokerageFormConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext();
  const { assetId } = useParams<{ assetId?: string }>();

  return [
    {
      type: 'text',
      name: 'brokerage.name',
      control,
      label: 'Brokerage Name',
      rules: {
        required: 'Brokerage is required',
        value: true,
      },
    },
    {
      type: 'file',
      name: 'brokerage.document',
      control,
      label: 'SLA Agreement',
      rules: {
        required: 'SLA agreement is required',
        value: true,
      },
      meta: {
        refId: assetId || '',
        belongsTo: 'asset',
        isPublic: true,
      },
           maxSize: 5 * 1024 * 1024, // 5MB
      accept: ['pdf', 'docx', 'doc'],
    },
  ];
};

export const assetManagementFormConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext();
  const { assetId } = useParams<{ assetId?: string }>();

  return [
    {
      type: 'text',
      name: 'assetManagementCompany.name',
      control,
      label: 'Asset Management Company',
      rules: {
        required: 'Asset management company is required',
        value: true,
      },
    },
    {
      type: 'file',
      name: 'assetManagementCompany.document',
      control,
      label: 'SLA Agreement',
      rules: {
        required: 'SLA agreement is required',
        value: true,
      },
      meta: {
        refId: assetId || '',
        belongsTo: 'asset',
        isPublic: true,
      },
           maxSize: 5 * 1024 * 1024, // 5MB
      accept: ['pdf', 'docx', 'doc'],
    },
  ];
};
