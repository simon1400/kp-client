import { useState, useEffect} from 'react'
import Page from '../../layout/Page'
import PageTop from '../../components/PageTop'
import Filter from '../../layout/Filter'
import categoryQuery from '../../queries/category'
import { useLazyQuery } from "@apollo/client";
import {useRouter} from 'next/router'
// import changeUrl from '../../function/changeUrl'
import Content from '../../components/Content'
import splitArr from '../../function/splitArr'
import {InstantSearch, Configure, Index} from 'react-instantsearch-dom'
import { searchClient } from "../../lib/typesenseAdapter";
import CatalogList from '../../components/CatalogList'
import CatalogFilterLabels from '../../components/CatalogFilterLabels'
import SubCategoryMenu from '../../components/SubCategoryMenu'

const Category = () => {

  const router = useRouter()

  const [category, setCategory] = useState({})
  const [title, setTitle] = useState([])
  const [subTitle, setSubTitle] = useState([])
  const [navigation, setNavigation] = useState({})
  const [global, setGlobal] = useState({})
  // const [filter, setFilter] = useState({
  //   slug: undefined,
  //   sort: undefined,
  //   param: undefined,
  //   brandId: undefined,
  //   categoryId: undefined,
  //   offset: 0,
  //   limit: 4
  // })

  const [getData, {data: dataFetch}] = useLazyQuery(categoryQuery);

  useEffect(() => {
    if(router.query.category){
      getData({
        variables: {
          slug: router.query.category
        }
      })
    }
  }, [router.query])

  useEffect(() => {
    if(dataFetch){

      let categoryFetch = {}
      if(dataFetch?.categories.length) {
        setCategory(dataFetch.categories[0])
        categoryFetch = dataFetch.categories[0]
      }else if(dataFetch?.brands.length) {
        setCategory(dataFetch.brands[0])
        categoryFetch = dataFetch.brands[0]
      }else{
        router.push('/404')
      }

      if(categoryFetch?.title) setTitle(categoryFetch?.title.split(' '))
      if(categoryFetch?.add_title) setSubTitle(categoryFetch?.add_title.split(' '))

      setNavigation(dataFetch.navigation)
      setGlobal(dataFetch.global)

    }
  }, [dataFetch])

  // const handleFilter = (state) => {
  //   changeUrl(state)

  //   let filterObj = filter
  //   const labelsFilter = {
  //     param: [0],
  //     brandId: [0],
  //     categoryId: [0]
  //   }

  //   if(category.__typename === "Category") {
  //     filterObj.categoryId = category.id
  //   }
  //   if(category.__typename === "Brand"){
  //     filterObj.brandId = category.id
  //   }

  //   if(state?.Brand?.length){
  //     filterObj.brandId = state.Brand
  //     labelsFilter.brandId = state.Brand
  //   }else{
  //     filterObj.brandId = undefined
  //   }
  //   if(state?.Category?.length){
  //     filterObj.categoryId = state.Category
  //     labelsFilter.categoryId = state.Category
  //   }else{
  //     filterObj.categoryId = undefined
  //   }
  //   if(state.param.length) {
  //     filterObj.param = state.param
  //     labelsFilter.param = state.param
  //   }else{
  //     filterObj.param = undefined
  //   }
  //   if(state.sort.length) {
  //     filterObj.sort = state.sort
  //   }else{
  //     filterObj.sort = undefined
  //   }

  //   // getProducts({variables: filterObj})
  //   // refetchLabels(labelsFilter)
  //   setFilter(filterObj)
  // }

  const h1Split = splitArr(title, 2)
  const subTitleSplit = splitArr(subTitle, 3)

  return (
    <InstantSearch 
      indexName="categoryProducts"
      searchClient={searchClient}
    >
      <Page
        title={category.meta?.title}
        description={category.meta?.description}
        bigHeader
        bgImg={category.image}
        globalData={global} 
        nav={navigation}>
        <PageTop
          small
          img={category.image}
          head={<h1 className="big-head">
                  <span><b>{h1Split[0].map(item => `${item} `)}</b> {h1Split[1].map(item => `${item} `)}</span>
                </h1>}
          />

          {!!category?.sub?.length && <SubCategoryMenu sub={category.sub}/>}

          <CatalogFilterLabels />

          <Configure 
            query={router.query.category}
            hitsPerPage={20}
          />
          <CatalogList />
          
          <section className="additional-sec">
            <div className="uk-container">
              {!!subTitle?.length && <h2 className="big-head">
                <span style={{paddingLeft: '14vw'}}>{subTitleSplit[0].map(item => `${item} `)}</span>
                <span style={{paddingLeft: '0px'}}>{subTitleSplit[1].map(item => `${item} `)}</span>
                <span style={{paddingLeft: '7vw'}}>{subTitleSplit[2].map(item => `${item} `)}</span>
              </h2>}
              <div>
                {category.content && <Content data={category.content} />}
              </div>
            </div>
          </section>

          <Filter
            parameters={category?.parameters || []}
            category={category?.filterCategories || []}
            // handle={handleFilter}
          />

      </Page>
    </InstantSearch>
  )
}

export default Category
