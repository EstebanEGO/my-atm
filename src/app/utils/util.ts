
export const currencyFormatter = (value: number) => {
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency: "MXN"
  });
  return formatter.format(value);
}