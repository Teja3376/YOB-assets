import { Building2, Container, ListOrdered, Users, File, Star } from "lucide-react";

export const EMPTY_TABLE_DATA = [
    {
      id: "asset",
      title: "No asset available",
      description: "There are no assets available at the moment.",
      icon: <Container size={44} />,
      actionButton: {
        label: "Add New Asset",
        location: "/assets/add-asset",
      },
    },
    {
      id: "order",
      title: "No order available",
      description: "There are no orders available at the moment.",
      icon: <ListOrdered size={44} />,
    },
    {
      id: "spv",
      title: "No SPV available",
      description: "There are no SPVs available at the moment.",
      icon: <Building2 size={44} />,
      actionButton: {
        label: "Add New SPV",
        location: "/spv/add-spv",
      },
    },
  
    {
      id: "investor",
      title: "No investor available",
      description: "There are no investors available at the moment.",
      icon: <Users size={44} />,
    },
    {
      id: "template",
      title: "No template available",
      description: "There are no templates available at the moment.",
      icon: <File size={44} />,
    },
    {
      id: "tenant",
      title: "No tenant available",
      description: "There are no tenants available at the moment.",
      icon: <Users size={44} />,
    },
    {
      id: "document",
      title: "No document available",
      description: "There are no documents available at the moment.",
      icon: <File size={44} />,
    },
    {
      id: "feature",
      title: "No feature available",
      description: "There are no features available at the moment.",
      icon: <Star size={44} />,
    },
    {
      id: "amenity",
      title: "No amenity available",
      description: "There are no amenities available at the moment.",
      icon: <Star size={44} />,
    },
  ];
  export const COUNTRIES = [
    { label: "India", value: "IN" },
    { label: "UAE", value: "AE" },
    { label: "Qatar", value: "QA" },
    { label: "UK", value: "GB" },
    { label: "United States", value: "US" },
  ];
  export const CURRENCY_OPTIONS = [
    { label: "INR", value: "INR" },
    { label: "AED", value: "AED" },
    { label: "QAR", value: "QAR" },
    { label: "GBP", value: "GBP" },
    { label: "USD", value: "USD" },
  ];