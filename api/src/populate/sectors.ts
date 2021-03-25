import { INode } from "../model/INode";

export const energy: INode[] = [
    { 
        labels: ['Origin'], 
        properties: { name: 'Energy' } 
    },
    { 
        labels: ['majorArea'], 
        properties: { name: 'Renewable Energy' } 
    },
    { 
        labels: ['majorArea'], 
        properties: { name: 'Non Renewable Energy' } 
    },
];

export const renewableEnergy: INode[] = [
    { 
        labels: ['subArea'], 
        properties: { name: 'Hydro' } 
    },
    { 
        labels: ['subArea'], 
        properties: { name: 'Biomass' } 
    },
    { 
        labels: ['subArea'], 
        properties: { name: 'Wind' } 
    },
    { 
        labels: ['subArea'], 
        properties: { name: 'Solar' } 
    },
    { 
        labels: ['subArea'], 
        properties: { name: 'Geothermal' } 
    }
];

export const nonRenewableEnergy: INode[] = [
    { 
        labels: ['subArea'], 
        properties: { name: 'Coal' } 
    },
    { 
        labels: ['subArea'], 
        properties: { name: 'Oil' } 
    },
    { 
        labels: ['subArea'], 
        properties: { name: 'Natural Gas' } 
    },
    { 
        labels: ['subArea'], 
        properties: { name: 'Nuclear' } 
    },
    { 
        labels: ['subArea'], 
        properties: { name: 'Hydrogen' } 
    },
];