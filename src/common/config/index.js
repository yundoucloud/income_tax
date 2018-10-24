const config = {
  oldThresholdOfIncomeTax: 3500,
  newThresholdOfIncomeTax: 5000,

  minSocialSecurityBase: 4279,
  maxSocialSecurityBase: 21396,

  oldIncomeTaxLevels: [
    { min: 0, max: 1500, rate: 0.03, cut: 0 },
    { min: 1500, max: 4500, rate: 0.10, cut: 105 },
    { min: 4500, max: 9000, rate: 0.20, cut: 555 },
    { min: 9000, max: 35000, rate: 0.25, cut: 1005 },
    { min: 35000, max: 55000, rate: 0.30, cut: 2755 },
    { min: 55000, max: 80000, rate: 0.35, cut: 5505 },
    { min: 80000, max: -1, rate: 0.45, cut: 13505 }
  ],

  newIncomeTaxLevels: [
    { min: 0, max: 3000, rate: 0.03, cut: 0 },
    { min: 3000, max: 12000, rate: 0.10, cut: 210 },
    { min: 12000, max: 25000, rate: 0.20, cut: 1410 },
    { min: 25000, max: 35000, rate: 0.25, cut: 2660 },
    { min: 35000, max: 55000, rate: 0.30, cut: 4410 },
    { min: 55000, max: 80000, rate: 0.35, cut: 7160 },
    { min: 80000, max: -1, rate: 0.45, cut: 15160 }
  ]
};

export default config;
