import { AxiosSTRAPI } from "../restClient"

const crudSingleProduct = async (data) => {
  let countUpdatedSP = 0, 
      countErrorUpdateSP = 0,
      countErrorCreateSP = 0,
      countCreateSP = 0,
      i = 0;
  while(i < data.length) {
    let item = data[i]
    const res = await AxiosSTRAPI.get(`/api/produkties?filters[guid][$contains]=${item.guid}&publicationState=preview`).catch(err => {
      console.log('Error GET single product --- ', err.response?.data || err?.response || err)
      i++;
    })
    if(res.data?.data?.length){
      const resUpdate = await AxiosSTRAPI.put('/api/produkties/'+res.data.data[0].id, {data: {
        price: item.price,
        stock: item.stock,
        ean: item.ean
      }}).catch(err => {
        console.error('Error update product - ', err.response?.data || err.response)
        console.log('ERROR -- ', item)
        i++;
        countErrorUpdateSP++;
      })
      if(resUpdate.data.data) {
        console.log('Success update --', resUpdate.data.data.attributes?.title)
        i++;
        countUpdatedSP++;
      }
    }else{
      const resCreate = await AxiosSTRAPI.post('/api/produkties', {data: item}).catch(err => {
        console.log('ERROR -- ', item)
        if(err.response?.data?.error?.details){
          console.log('Failed created 1 --', err.response?.data?.error?.details)
        }else if(err.response?.data?.error){
          console.log('Failed created 2 --', err.response.data.error)
        }else if(err.response?.data) {
          console.log('Failed created 3 --', err.response.data)
        }else{
          console.log('Failed created 4 --', err.response)
        }
        i++;
        countErrorCreateSP++;
      })
      if(resCreate?.data?.data) {
        console.log('Success created --', resCreate.data?.data?.attributes?.title)
        i++;
        countCreateSP++;
      }
    }
  }
}

export default crudSingleProduct
