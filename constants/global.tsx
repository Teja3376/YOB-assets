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
  { label: "Austria", value: "AT" },
  { label: "Belgium", value: "BE" },
  { label: "Bulgaria", value: "BG" },
  { label: "Croatia", value: "HR" },
  { label: "Cyprus", value: "CY" },
  { label: "Czechia", value: "CZ" },
  { label: "Denmark", value: "DK" },
  { label: "Estonia", value: "EE" },
  { label: "Finland", value: "FI" },
  { label: "France", value: "FR" },
  { label: "Germany", value: "DE" },
  { label: "Greece", value: "GR" },
  { label: "Hungary", value: "HU" },
  { label: "Ireland", value: "IE" },
  { label: "Italy", value: "IT" },
  { label: "Latvia", value: "LV" },
  { label: "Lithuania", value: "LT" },
  { label: "Luxembourg", value: "LU" },
  { label: "Malta", value: "MT" },
  { label: "Netherlands", value: "NL" },
  { label: "Poland", value: "PL" },
  { label: "Portugal", value: "PT" },
  { label: "Romania", value: "RO" },
  { label: "Slovakia", value: "SK" },
  { label: "Slovenia", value: "SI" },
  { label: "Spain", value: "ES" },
  { label: "Sweden", value: "SE" },
  // Bonus guest 🌍
  { label: "Tanzania", value: "TZ" },
];
  export const CURRENCY_OPTIONS = [
  { label: "EUR", value: "EUR" },

  { label: "BGN", value: "BGN" }, // Bulgaria
  { label: "CZK", value: "CZK" }, // Czechia
  { label: "DKK", value: "DKK" }, // Denmark
  { label: "HUF", value: "HUF" }, // Hungary
  { label: "PLN", value: "PLN" }, // Poland
  { label: "RON", value: "RON" }, // Romania
  { label: "SEK", value: "SEK" }, // Sweden

  // Tanzania 🌍
  { label: "TZS", value: "TZS" },
];