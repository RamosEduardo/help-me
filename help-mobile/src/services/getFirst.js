export default function getAddress({ data }) {
  // eslint-disable-next-line no-use-before-define
  const { product } = data;
  // eslint-disable-next-line no-use-before-define
  return product[0];
}
