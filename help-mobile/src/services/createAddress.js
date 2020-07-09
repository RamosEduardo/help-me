import api from './api';

export default async function createAddress({
  data, token,
}) {
  const ret = await api.post('/address', data, {
    headers: {
      Authorization: token,
    },
  });
  return ret.data;
}
