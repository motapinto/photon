export default class Utils {
  public static stringify(obj: any): string {
    if(!obj) {
      return "";
    }

    if (typeof obj !== "object" || Array.isArray(obj)){
      return JSON.stringify(obj);
    }
  
    let props = Object
      .keys(obj)
      .map(key => typeof(obj[key]) !== 'number' ? `${key}:${Utils.stringify(obj[key])}` : `${key}:${obj[key].toString()}`)
      .join(",");
  
    return `{${props}}`;
  }
}