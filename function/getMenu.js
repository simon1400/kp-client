const combineMenu = (item) => {

  const obj = {
    name: item.name,
    slug: item.link,
    image: item.image
  }

  if(item.category) {
    obj.slug = `/${item.category.slug}`
  }else if(item.brand){
    obj.slug = `/${item.brand.slug}`
  }else if(item.blog){
    obj.slug = `/blog/${item.blog.slug}`
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
