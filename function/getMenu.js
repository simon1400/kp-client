const combineMenu = (item) => {

  const obj = {
    name: item.name,
    slug: item.link,
    image: item.image
  }

  if(item.category.data) {
    obj.slug = `/c/${item.category.data.attributes.slug}`
  }else if(item.brand.data){
    obj.slug = `/c/${item.brand.data.attributes.slug}`
  }else if(item.blog.data && (item.blog.data.attributes.category?.data.attributes?.slug || item.blog.data.attributes.category.data[0])){
    obj.slug = `/${item.blog.data.attributes.category.data[0].attributes.slug || item.blog.data.attributes.category.data.attributes.slug}/${item.blog.data.attributes.slug}`
  }

  return obj
}

const getMenu = (nav) => {
  let arr = [], navObj = {};
  nav.map(item => {
    navObj = {...combineMenu(item)}
    if(item.sub_nav_item.length) {
      navObj.sub_nav = item.sub_nav_item.map(subItem => combineMenu(subItem))
    }
    arr.push(navObj)
  })
  return arr
}

export default getMenu
