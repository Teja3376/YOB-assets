import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const countryOptions = getCountries().map((country) => ({
  label: `${en[country]} (+${getCountryCallingCode(country)})`,
  value: `+${getCountryCallingCode(country)}`,
  iso2: country,
}));

export const getCountryFromCallingCode = (code: string) => {
  return countryOptions.find(
    (c) => c.iso2 === code
  );
};
