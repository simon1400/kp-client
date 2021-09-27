export default (data) => {
  return {
    email: data?.email || '',
    phone: data?.phone || '',
    name: data?.name || '',
    surname: data?.surname || '',
    address: data?.address || '',
    city: data?.city || '',
    zip: data?.zip || '',
    state: data?.state || 'Česko',
  }
}
