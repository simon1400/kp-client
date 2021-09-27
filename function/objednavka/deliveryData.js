export default (data) => {
  if(data?.dopravies){
    return data.dopravies.map(item => ({
      name: 'delivery',
      label: item.title,
      value: item.price,
      type: item.type,
      check: false
    }))
  }else{
    return []
  }
}
