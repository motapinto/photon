import { Sector } from "@model/Sector";

export const energy: Sector[] = [
  { 
    label: 'Origin', 
    properties: { name: 'Energy', growth: 50, numArticles: 45578 } 
  },
  { 
    label: 'majorArea', 
    properties: { name: 'Renewable Energy', growth: 20, numArticles: 456931 } 
  },
  { 
    label: 'majorArea', 
    properties: { name: 'Non Renewable Energy', growth: 15, numArticles: 124346 } 
  },
];

export const renewableEnergy: Sector[] = [
  { 
    label: 'subArea', 
    properties: { name: 'Hydro', growth: 50, numArticles: 365 } 
  },
  { 
    label: 'subArea', 
    properties: { name: 'Biomass', growth: 5, numArticles: 788 } 
  },
  { 
    label: 'subArea', 
    properties: { name: 'Wind', growth: 8, numArticles: 9978 } 
  },
  { 
    label: 'subArea', 
    properties: { name: 'Solar', growth: 2, numArticles: 2678 } 
  },
  { 
    label: 'subArea', 
    properties: { name: 'Geothermal', growth: 61, numArticles: 65821 } 
  }
];

export const nonRenewableEnergy: Sector[] = [
    { 
        label: 'subArea', 
        properties: { name: 'Coal', growth: 61, numArticles: 25 } 
    },
    { 
        label: 'subArea', 
        properties: { name: 'Oil', growth: 45, numArticles: 1005 } 
    },
    { 
        label: 'subArea', 
        properties: { name: 'Natural Gas', growth: 94, numArticles: 5567 } 
    },
    { 
        label: 'subArea', 
        properties: { name: 'Nuclear', growth: 26, numArticles: 201 } 
    },
    { 
        label: 'subArea', 
        properties: { name: 'Hydrogen', growth: 38, numArticles: 554 } 
    },
];