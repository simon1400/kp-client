import { buildUrl } from 'cloudinary-build-url'

const buildImageUrl = (image, width) => {
  
  const options = {
    cloud: {
      cloudName: 'hardart-cz',
    },
    transformations: {
      resize: {
        width: 1200,
      }
    }
  }

  if(width) {
    options.transformations.resize.width = width
  }

  const src = buildUrl(image.hash, options)

  return src
}


export default buildImageUrl