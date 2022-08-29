const APP_API = process.env.APP_API

const buildImageUrl = (image, width = false) => {

  let format = ''

  if(width) {
    format = `?width=${width}`
  }

  return APP_API+image?.url+format
}


export default buildImageUrl