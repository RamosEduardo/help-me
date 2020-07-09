// import api from './api';
import createAddress from './createAddress';
import getAddress from './getAddress';
// import getFirst from './getFirst';
import api from './api';

export default async function createSolicitation({
  addressStartData = {},
  addressEndData = {},
  productData = {},
  solicitationData = {},
}) {
  const token = localStorage.getItem('token');
  const addressStart = await createAddress({
    data: addressStartData,
    token,
  });
  const addressEnd = await createAddress({
    data: addressEndData,
    token,
  });
  console.log(`Start ${addressStart} - End ${addressEnd}`);
  const productRet = await api.post('/products', productData, {
    headers: {
      Authorization: token,
    },
  });
  console.log('Produto ', productRet);
  solicitationData.adresses_start_id = getAddress(addressStart);
  solicitationData.adresses_end_id = getAddress(addressEnd);
  console.log('solicitationData ', solicitationData);
  const solicitation = await api.post('/solicitations', solicitationData, {
    headers: {
      Authorization: token,
    },
  });
  // const productId = getFirst(productRet);
  // const dataEnv = {
  //   amount: 1, product_id: productId,
  // };
  // const cargo = await api.post(`/cargo/${solicitation}`, dataEnv, {
  //   headers: {
  //     Authorization: token,
  //   },
  // });
  // console.log('CARGO ', cargo);
  return solicitation;
}
