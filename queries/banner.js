const bannerQuery = `banner {
  title
  image {
    data{
      attributes{
        url
      }
    }
  }
  button {
    text
    link
  }
}`

export default bannerQuery
