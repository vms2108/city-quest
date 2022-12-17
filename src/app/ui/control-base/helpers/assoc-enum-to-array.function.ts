export function assocEnumToArray<T extends Object>(source: any): T[] {
  return Object
    .keys(source)
    .map(key => source[key]);
}
