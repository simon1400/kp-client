export default (data) => {
  if(data?.dopravies){
    console.log(data.dopravies);
    return data.dopravies.map(item => ({
      name: 'delivery',
      label: item.title,
      value: item.price,
      type: item.type,
      saleFrom: item.sale_from,
      check: false,
      paysAllow: item.pays
    }))
  }else{
    return []
  }
}
