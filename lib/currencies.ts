export const Currencies = [
  { value: "INR", label: "₹ Rupee", locale: "en-IN" },
  { value: "USD", label: "$ Dollar", locale: "en-US" },
  { value: "EUR", label: "€ Euro", locale: "de-DE" },
  { value: "NOK", label: "kr NOK", locale: "no-NO" },
  { value: "GBP", label: "£ Pound", locale: "en-GB" },
];

export type Currency = (typeof Currencies)[0];
