export default (data) => {
  if(data?.dopravies){
    return data.dopravies.map(item => ({
      name: 'delivery',
      label: item.title,
      value: item.price,
      type: item.type,
      guid: item.guid,
      code: item.code,
      saleFrom: item.sale_from,
      state: item.state,
      check: false,
      paysAllow: item.pays
    }))
  }else{
    return []
  }
}
