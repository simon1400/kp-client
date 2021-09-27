export default (data) => {
  return {
    nameCompany: data?.nameCompany || '',
    ico: data?.ico || '',
    dic: data?.dic || ''
  }
}
