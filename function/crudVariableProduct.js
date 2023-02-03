import { AxiosSTRAPI } from "../restClient"

const crudVariableProduct = async (dataVariantsCombine) => {

  for (const [key, value] of Object.entries(dataVariantsCombine)) {
    const res = await AxiosSTRAPI.get(`/api/produkties?filters[guid][$contains]=${value[0].guid}&publicationState=preview`).catch(err => {
      if(err.response?.data) {
        console.log('Failed get --', err.response.data)
      }else{
        console.log('Failed get --', err.response)
      }
    })

    if(res?.data?.data?.length){
      const resUpdate = await AxiosSTRAPI.put('/api/produkties/'+res.data.data[0].id, {data: {
        price: value[0].price,
        stock: value[0].stock,
        Variants: value.map(item => ({
          nazev: item.magnetude,
          price: item.price,
          guid: item.guid,
          stock: item.stock,
          code: item.code
        })),
      }}).catch(err => {
        console.error('Error update variant --', err.response?.data)
        console.log('ERROR -- ', value)
      })

      if(resUpdate?.data?.data?.attributes) {
        console.log('Success update variant --', resUpdate.data?.data?.attributes?.title)
      }

    }else{
      const resCreate = await AxiosSTRAPI.post('/api/produkties', {data: {
        title: value[0].title,
        slug: slugify(value[0].title, {
          lower: true,
          remove: /[*+~´,.()'"!:@]/g
        }),
        price: value[0].price,
        ean: value[0].ean,
        stock: value[0].stock,
        code: key,
        guid: value.map(item => item.guid).join(),
        Variants: value.map(item => ({
          nazev: item.magnetude,
          price: item.price,
          guid: item.guid,
          stock: item.stock,
          code: item.code
        })),
        publishedAt: null
      }}).catch(err => {
        console.log('ERROR -- ', value)
        if(err.response?.data?.error?.details) {
          console.error('Failed create variant 1 --', err.response?.data?.error?.details)
        }else if(err.response?.data?.error) {
          console.error('Failed create variant 2 --', err.response?.data?.error)
        }else if(err.response?.data) {
          console.error('Failed create variant 3 --', err.response?.data)
        }else{
          console.error('Failed create variant 5 --', err.response)
        }
      })

      if(resCreate?.data?.data?.attributes) {
        console.log('Success created variant --', resCreate?.data?.data?.attributes?.title)
      }
    }
  }
}

export default crudVariableProduct
