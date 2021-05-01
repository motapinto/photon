import { Sector } from "@model/Sector";

export const energy: Sector[] = [
  { 
    label: 'Origin', 
    properties: { name: 'Energy', growth: 50, numNews: 45578 } 
  },
  { 
    label: 'majorArea', 
    properties: { name: 'Renewable Energy', growth: 20, numNews: 456931 } 
  },
  { 
    label: 'majorArea', 
    properties: { name: 'Non Renewable Energy', growth: 15, numNews: 124346 } 
  },
];

export const renewableEnergy: Sector[] = [
  { 
    label: 'subArea', 
    properties: { name: 'Hydro', growth: 50, numNews: 365 } 
  },
  { 
    label: 'subArea', 
    properties: { name: 'Biomass', growth: 5, numNews: 788 } 
  },
  { 
    label: 'subArea', 
    properties: { name: 'Wind', growth: 8, numNews: 9978 } 
  },
  { 
    label: 'subArea', 
    properties: { name: 'Solar', growth: 2, numNews: 2678 } 
  },
  { 
    label: 'subArea', 
    properties: { name: 'Geothermal', growth: 61, numNews: 65821 } 
  }
];

export const nonRenewableEnergy: Sector[] = [
    { 
        label: 'subArea', 
        properties: { name: 'Coal', growth: 61, numNews: 25 } 
    },
    { 
        label: 'subArea', 
        properties: { name: 'Oil', growth: 45, numNews: 1005 } 
    },
    { 
        label: 'subArea', 
        properties: { name: 'Natural Gas', growth: 94, numNews: 5567 } 
    },
    { 
        label: 'subArea', 
        properties: { name: 'Nuclear', growth: 26, numNews: 201 } 
    },
    { 
        label: 'subArea', 
        properties: { name: 'Hydrogen', growth: 38, numNews: 554 } 
    },
];