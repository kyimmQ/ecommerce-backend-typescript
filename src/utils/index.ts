import lodash from "lodash";

export const getInfoData = (fields: string[], object: Record<string, any>) => {
  return lodash.pick(object, fields);
};
