import { AxiosSTRAPI } from "../restClient"

const crudVariableProduct = (dataVariantsCombine) => {
  for (const [key, value] of Object.entries(dataVariantsCombine)) {
    AxiosSTRAPI.get(`/api/produkties?filters[guid][$contains]=${value[0].guid}&publicationState=preview`).then(res => {
      if(res.data.data.length){
        AxiosSTRAPI.put('/api/produkties/'+res.data.data[0].id, {data: {
          price: value[0].price,
          stock: value[0].stock,
          Variants: value.map(item => ({
            nazev: item.magnetude,
            price: item.price,
            guid: item.guid,
            stock: item.stock,
          })),
        }}).then(res => console.log('Success update variant --', res.data?.data?.attributes?.title))
          .catch(err => console.error(err.response?.data))
      }else{
        AxiosSTRAPI.post('/api/produkties', {data: {
          title: value[0].title,
          slug: slugify(value[0].title, {
            lower: true,
            remove: /[*+~´,.()'"!:@]/g
          }),
          price: value[0].price,
          stock: value[0].stock,
          code: key,
          guid: value.map(item => item.guid).join(),
          Variants: value.map(item => ({
            nazev: item.magnetude,
            price: item.price,
            guid: item.guid,
            stock: item.stock,
          })),
          published_at: null
        }}).then(res => console.log('Success created variant --', res?.data?.data?.attributes?.title))
          .catch(err => {
            if(err.response?.data?.error?.details) {
              console.error('Failed create variant 1 --', err.response?.data?.error?.details)
            }else if(err.response?.data?.error) {
              console.error('Failed create variant 2 --', err.response?.data?.error)
            }else if(err.response?.data) {
              console.error('Failed create variant 3 --', err.response?.data)
            }else if(err.response?.data) {
              console.error('Failed create variant 4 --', err.response?.data)
            }else{
              console.error('Failed create variant 5 --', err.response)
            }
          })
      }
    }).catch(err => {
      if(err.response?.data) {
        console.log('Failed get --', err.response.data)
      }else{
        console.log('Failed get --', err.response)
      }
    })
  }
}

export default crudVariableProduct
