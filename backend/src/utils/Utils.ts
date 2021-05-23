export default class Utils {
  public static stringify(obj: any): string {
    if(!obj) {
      return '""';
    }

    if (typeof obj !== "object" || Array.isArray(obj)){
      return Utils.removeTags(JSON.stringify(obj));
    }
  
    let props = Object
      .keys(obj)
      .map(key => typeof(obj[key]) !== 'number' ? `${key}:${Utils.stringify(obj[key])}` : `${key}:${obj[key].toString()}`)
      .join(",");
  
    return `{${Utils.removeTags(props)}}`;
  }

  public static pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const copy = {} as Pick<T, K>;
    keys.forEach(key => copy[key] = obj[key]);
    return copy;
}

  public static removeTags(str: string) {
    if (!str) return '';
    return str.replace( /(<([^>]+)>)/ig, '');
  }
}