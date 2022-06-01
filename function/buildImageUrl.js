import { buildUrl } from 'cloudinary-build-url'

const buildImageUrl = (image) => {
  const src = buildUrl(image.hash, {
    cloud: {
      cloudName: 'hardart-cz',
    },
    transformations: {
      resize: {
        width: 1200,
      }
    }
  })

  return src
}


export default buildImageUrl