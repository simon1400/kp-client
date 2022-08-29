export default (data) => {
  if(data?.pays){
    return data.pays.data.map(item => ({
      name: 'payment',
      label: item.attributes.title,
      value: item.attributes.price,
      guid: item.attributes.guid,
      code: item.attributes.code,
      check: false,
      disabled: false,
      saleFrom: item.attributes.sale_from,
      state: item.attributes.state,
      payOnline: item.attributes.type === 'online',
      method: item.attributes.type,
      deliveryAllow: item.attributes.deliveries
    }))
  }else{
    return []
  }

}
