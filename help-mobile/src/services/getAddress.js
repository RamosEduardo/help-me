export default function getAddress(addressSend) {
  console.log('send ', addressSend);
  // eslint-disable-next-line no-use-before-define
  const { address } = addressSend;
  // eslint-disable-next-line no-use-before-define
  return address[0];
}
