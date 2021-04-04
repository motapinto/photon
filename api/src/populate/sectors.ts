import { INode } from "../model/INode";

export const energy: INode[] = [
    { 
        labels: ['Origin'], 
        properties: { name: 'Energy', growth: 50, numNews: 45578 } 
    },
    { 
        labels: ['majorArea'], 
        properties: { name: 'Renewable Energy', growth: 20, numNews: 456931 } 
    },
    { 
        labels: ['majorArea'], 
        properties: { name: 'Non Renewable Energy', growth: 15, numNews: 124346 } 
    },
];

export const renewableEnergy: INode[] = [
    { 
        labels: ['subArea'], 
        properties: { name: 'Hydro', growth: 50, numNews: 365 } 
    },
    { 
        labels: ['subArea'], 
        properties: { name: 'Biomass', growth: 5, numNews: 788 } 
    },
    { 
        labels: ['subArea'], 
        properties: { name: 'Wind', growth: 8, numNews: 9978 } 
    },
    { 
        labels: ['subArea'], 
        properties: { name: 'Solar', growth: 0, numNews: 2678 } 
    },
    { 
        labels: ['subArea'], 
        properties: { name: 'Geothermal', growth: 61, numNews: 65821 } 
    }
];

export const nonRenewableEnergy: INode[] = [
    { 
        labels: ['subArea'], 
        properties: { name: 'Coal', growth: 61, numNews: 25 } 
    },
    { 
        labels: ['subArea'], 
        properties: { name: 'Oil', growth: 45, numNews: 1005 } 
    },
    { 
        labels: ['subArea'], 
        properties: { name: 'Natural Gas', growth: 94, numNews: 5567 } 
    },
    { 
        labels: ['subArea'], 
        properties: { name: 'Nuclear', growth: 26, numNews: 201 } 
    },
    { 
        labels: ['subArea'], 
        properties: { name: 'Hydrogen', growth: 38, numNews: 554 } 
    },
];