const pad = (value) => value.toString().padStart(2, "0");

const splitIso = (isoDate) => {
  if (!isoDate || typeof isoDate !== "string") {
    return null;
  }
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) {
    return null;
  }
  return { year, month, day };
};

const splitDisplayDate = (displayDate) => {
  if (!displayDate) return null;
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(displayDate);
  if (!match) return null;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const candidate = new Date(year, month - 1, day);
  if (
    candidate.getFullYear() !== year ||
    candidate.getMonth() !== month - 1 ||
    candidate.getDate() !== day
  ) {
    return null;
  }
  return { day, month, year };
};

export const isoToDisplayDate = (isoDate, separator = "/") => {
  const parts = splitIso(isoDate);
  if (!parts) return "";
  return `${pad(parts.day)}${separator}${pad(parts.month)}${separator}${parts.year}`;
};

export const isoToTableDate = (isoDate) => isoToDisplayDate(isoDate, "-");

export const displayToIsoDate = (displayDate) => {
  const parts = splitDisplayDate(displayDate);
  if (!parts) return "";
  return `${parts.year}-${pad(parts.month)}-${pad(parts.day)}`;
};

export const isValidDisplayDate = (displayDate) => Boolean(splitDisplayDate(displayDate));
