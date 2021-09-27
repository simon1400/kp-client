export default (data) => {
  if(data?.platbies){
    return data.platbies.map(item => ({
      name: 'payment',
      label: item.title,
      value: item.price,
      check: false,
      disabled: false,
      payOnline: true,
      // method: 'CARD_CZ_CSOB_2'
    }))
  }else{
    return []
  }

}
