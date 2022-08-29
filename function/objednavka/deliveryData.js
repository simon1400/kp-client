export default (data) => {
  if(data?.deliveries){
    return data.deliveries.data.map(item => ({
      name: 'delivery',
      label: item.attributes.title,
      value: item.attributes.price,
      type: item.attributes.type,
      guid: item.attributes.guid,
      code: item.attributes.code,
      saleFrom: item.attributes.sale_from,
      state: item.attributes.state,
      check: false,
      paysAllow: item.attributes.pays
    }))
  }else{
    return []
  }
}
