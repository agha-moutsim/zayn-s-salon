export type PricingTier = {
  stylist?: number | string;
  leadStylist?: number | string;
  seniorStylist?: number | string;
  default?: number | string;
};

export type ServiceItem = {
  name: string;
  price: PricingTier;
  description?: string;
};

export type ServiceCategory = {
  id: string;
  title: string;
  type: "tiered" | "standard" | "package"; // Tiered = Stylist/Lead/Senior, Standard = single price, Package = custom
  services: ServiceItem[];
};

export type PackageTier = {
  drShazil: number;
  charcoal: number;
  dermacos: number;
  hydra: number;
  janssen: number;
};

export type PackageItem = {
  id: string;
  title: string;
  includes: string[];
  pricing: PackageTier;
};

export const servicesData: ServiceCategory[] = [
  {
    id: "haircut-beard",
    title: "HAIRCUT & BEARD",
    type: "tiered",
    services: [
      { name: "UNDERCUT", price: { stylist: 700, leadStylist: 1000, seniorStylist: 1500 } },
      { name: "SIMPLE CUT / FADE CUT", price: { stylist: 1200, leadStylist: 1800, seniorStylist: 2500 } },
      { name: "RAZOR CUT", price: { stylist: 1500, leadStylist: 2000, seniorStylist: 3000 } },
      { name: "EXPRESS HAIRCUT DETAILING", price: { stylist: 800, leadStylist: 1000, seniorStylist: 1500 } },
      { name: "BEARD", price: { stylist: 500, leadStylist: 800, seniorStylist: 1000 } },
      { name: "THREADING", price: { stylist: "—", leadStylist: 300, seniorStylist: 500 } },
      { name: "MAKEUP", price: { stylist: "—", leadStylist: 2500, seniorStylist: 3500 } },
    ]
  },
  {
    id: "styling",
    title: "STYLING",
    type: "tiered",
    services: [
      { name: "STYLING", price: { stylist: 500, leadStylist: 800, seniorStylist: 1000 } },
      { name: "BEARD STYLING", price: { stylist: 500, leadStylist: 800, seniorStylist: 1000 } },
      { name: "HAIR STRAIGHTENING", price: { stylist: 1000, leadStylist: 1500, seniorStylist: 2000 } },
      { name: "FIBER APPLICATION", price: { stylist: 800, leadStylist: 1000, seniorStylist: 1200 } },
      { name: "HEADWASH", price: { default: 200 } },
    ]
  },
  {
    id: "body-care",
    title: "BODY CARE",
    type: "standard",
    services: [
      { name: "FULL BODY SCRUB", price: { default: 6000 } },
      { name: "FULL BODY POLISHER", price: { default: 4000 } },
      { name: "FULL BODY MASSAGE (20 MIN WITH OIL)", price: { default: 2000 } },
      { name: "FULL BODY MASSAGE (40 MIN WITH OIL)", price: { default: 3000 } },
      { name: "FULL BODY MASSAGE (60 MIN WITH OIL)", price: { default: 4000 } },
      { name: "HEAD MASSAGE (15 MIN WITH OIL)", price: { default: 500 } },
      { name: "BACK & SHOULDER MASSAGE (15 MIN WITH OIL)", price: { default: 1000 } },
      { name: "HEAD, BACK & SHOULDER MASSAGE (15 MIN WITH OIL)", price: { default: 1500 } },
      { name: "FOOT MASSAGE (15 MIN WITH OIL)", price: { default: 1000 } },
      { name: "HALF LEG MASSAGE (15 MIN WITH OIL)", price: { default: 1000 } },
      { name: "FULL LEG MASSAGE (15 MIN WITH OIL)", price: { default: 1500 } },
    ]
  },
  {
    id: "hair-removal",
    title: "WAXING / HAIR REMOVAL",
    type: "standard",
    services: [
      { name: "FULL BODY", price: { default: 12000 } },
      { name: "HALF BODY", price: { default: 6000 } },
      { name: "FULL LEGS", price: { default: 6000 } },
      { name: "HALF LEGS", price: { default: 4000 } },
      { name: "FACE", price: { default: 1000 } },
      { name: "EARS", price: { default: 500 } },
      { name: "NOSE", price: { default: 500 } },
    ]
  },
  {
    id: "facial-service",
    title: "FACIAL SERVICES",
    type: "standard",
    services: [
      { name: "JANSSEN PLUS", price: { default: 10000 } },
      { name: "JANSSEN", price: { default: 8000 } },
      { name: "HYDRA", price: { default: 7000 } },
      { name: "DERMACOS", price: { default: 6000 } },
      { name: "CHARCOAL", price: { default: 5000 } },
      { name: "DR. SHAZIL", price: { default: 4500 } },
      { name: "DEEP CLEANSING", price: { default: 2000 } },
      { name: "CLEANSING", price: { default: 1000 } },
      { name: "CHARCOAL MASK", price: { default: 1000 } },
      { name: "FACE POLISHER", price: { default: 1000 } },
      { name: "NOSE STRIP", price: { default: 700 } },
    ]
  },
  {
    id: "mani-pedi",
    title: "MANICURE & PEDICURE",
    type: "standard",
    services: [
      { name: "MANICURE & PEDICURE", price: { default: 4500 } },
      { name: "MANICURE", price: { default: 2500 } },
      { name: "PEDICURE", price: { default: 2500 } },
      { name: "NAIL CUT & BUFF", price: { default: 1500 } },
      { name: "NAIL CUT", price: { default: 1000 } },
    ]
  },
  {
    id: "hair-treatments",
    title: "HAIR TREATMENTS",
    type: "standard",
    services: [
      { name: "HAIR MASK", price: { default: 1500 } },
      { name: "HAIR MASK WITH OIL MASSAGE (DANDRUFF)", price: { default: 2000 } },
      { name: "HAIR MASK PLUS (DAMAGED HAIR)", price: { default: 2500 } },
      { name: "PROTEIN TREATMENT (FRIZZY HAIR)", price: { default: 3000 } },
      { name: "HAIR STREAKING (STARTING LENGTH)", price: { default: 7000 } },
      { name: "HAIR POLISH", price: { default: 2500 } },
      { name: "BEARD COLOUR", price: { default: 1000 } },
      { name: "KERATIN HAIR STRAIGHTENING", price: { default: 10000 } },
      { name: "HAIR PERMING (4 INCHES STARTING)", price: { default: 10000 } },
      { name: "HAIR COLOUR APPLICATION", price: { default: 1000 } },
      { name: "HAIR COLOUR (FREECIA / KEUNE / L'OREAL)", price: { default: 3500 } },
      { name: "FASHION COLOUR (STARTING LENGTH)", price: { default: 10000 } },
    ]
  }
];

export const packagesData: PackageItem[] = [
  {
    id: "express-self-care",
    title: "EXPRESS SELF CARE PACKAGE",
    includes: ["HAIR CUT", "BEARD", "STYLING", "FACE CLEANSING (2 STEPS)"],
    pricing: {
      drShazil: 2500,
      charcoal: 3000,
      dermacos: 3500,
      hydra: 4000,
      janssen: 5500
    }
  },
  {
    id: "self-care-01",
    title: "SELF CARE PACKAGE 01",
    includes: ["HAIR CUT", "BEARD", "STYLING", "FACIAL"],
    pricing: {
      drShazil: 4500,
      charcoal: 5000,
      dermacos: 6500,
      hydra: 8500,
      janssen: 10000
    }
  },
  {
    id: "full-grooming",
    title: "FULL GROOMING PACKAGE",
    includes: ["HAIR CUT", "BEARD", "STYLING", "FACIAL", "MANI + PEDI", "HAIR TREATMENT", "HEAD & SHOULDER MASSAGE", "HEAD MASSAGE"],
    pricing: {
      drShazil: 8500,
      charcoal: 10000,
      dermacos: 11500,
      hydra: 13500,
      janssen: 15000
    }
  }
];
