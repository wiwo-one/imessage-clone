import moment from "moment";

export const handlePLDateString = (date) => {
  const ParsedDate = moment(date, "DD.MM.YYYY HH.mm.ss");
  return ParsedDate;
};

export const transformUnknownDateFormat = (date) => {
  if (typeof date === "string") {
    return handlePLDateString(date);
  } else if (date instanceof Date) {
    return moment(date);
  }
  return moment(date.toDate());
};

export const transformMomentToString = (date) => {
  return date.format("DD/MM/YYYY, HH:mm:ss");
};
