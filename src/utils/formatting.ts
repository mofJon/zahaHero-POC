export const stripBreakpoints = (str: string) => {
  if (str && str.length > 0) {
    const stringArray = str.split("<br/>");
    return stringArray;
  }
};
