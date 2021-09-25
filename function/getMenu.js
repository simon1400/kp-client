const combineMenu = (item) => {
  if(item.category) {
    return {
      name: item.category.title,
      slug: `/${item.category.slug}`,
      image: item.image
    }
  }else if(item.brand){
    return {
      name: item.brand.title,
      slug: `/${item.brand.slug}`,
      image: item.image
    }
  }else if(item.blog){
    return {
      name: item.blog.title,
      slug: `/blog/${item.blog.slug}`,
      image: item.image
    }
  }else{
    return {
      name: item.name,
      slug: item.link,
      image: item.image
    }
  }
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
