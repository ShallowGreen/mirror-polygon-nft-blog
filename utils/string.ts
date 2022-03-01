export const addEllipsis = (text: string, charCount = 5): string => {
  const start = text.slice(0, charCount).trim();
  const suffix = text.slice(-charCount).trim();

  return `${start}...${suffix}`;
};
