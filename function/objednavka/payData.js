export default (data) => {
  if(data?.platbies){
    return data.platbies.map(item => ({
      name: 'payment',
      label: item.title,
      value: item.price,
      check: false,
      disabled: false,
      payOnline: item.type === 'online',
      method: item.type
    }))
  }else{
    return []
  }

}
