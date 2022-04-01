const saleFrom = (data, startSum) => {
  // sale delivery and payment from some price
  return data.map(item => {
    if(item.saleFrom < startSum) {
      item.value = 0
    }
    return item
  })
}

export default saleFrom