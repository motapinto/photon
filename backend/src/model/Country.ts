import Database from "@database/Database";
import { Node } from "./Node";

export interface Country extends Node {
  readonly properties: {
    name: string,
  };
}

export class CountryModel {
  public static async getAll() {
    const res = await Database.getInstance().query(`MATCH(country: Country) RETURN country`);    
    return res?.map((match) => {      
      return match.get('country').properties;
    });
  }

  public add(country: Country): Promise<any> {
    return Database.getInstance().createNode(country);
  }
}