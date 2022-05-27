export default (data) => {
  if(data?.platbies){
    return data.platbies.map(item => ({
      name: 'payment',
      label: item.title,
      value: item.price,
      guid: item.guid,
      code: item.code,
      check: false,
      disabled: false,
      saleFrom: item.sale_from,
      state: item.state,
      payOnline: item.type === 'online',
      method: item.type,
      deliveryAllow: item.deliveries
    }))
  }else{
    return []
  }

}
