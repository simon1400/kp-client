import { AxiosSTRAPI } from "../restClient"

const crudSingleProduct = (data) => {
  data.map(item => {
    AxiosSTRAPI.get(`/api/produkties?filters[guid][$contains]=${item.guid}&publicationState=preview`).then(res => {
      if(res.data?.data?.length){
        AxiosSTRAPI.put('/api/produkties/'+res.data.data[0].id, {data: {
          price: item.price,
          stock: item.stock,
          ean: item.ean
        }})
          .then(res => console.log('Success update --', res.data.data.attributes.title))
          .catch(err => {
            console.error('Error update product - ', err.response?.data || err.response)
            console.log('ERROR -- ', item)
          })
      }else{
        AxiosSTRAPI.post('/api/produkties', {data: item})
          .then(res => console.log('Success created --', res.data?.data?.attributes?.title))
          .catch(err => {
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
          })
      }
    }).catch(err => console.log(err.response?.data || err.response))
  })
}

export default crudSingleProduct
