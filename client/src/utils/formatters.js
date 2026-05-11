// Helpers

// "2024-01" -> "Jan 2024"
export const fmtDate = (str) => {
  if (!str) return '';
  const d = new Date(str + '-01');
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// handle long strings
export const truncate = (str, max = 120) => {
  if (!str || str.length <= max) return str;
  return str.slice(0, max).trimEnd() + '…';
};
