import Page from '../../layout/Page'
import PageTop from '../../components/PageTop'
import Filter from '../../layout/Filter'
import categoryQuery from '../../queries/category'
import {useRouter} from 'next/router'
// import changeUrl from '../../function/changeUrl'
import Content from '../../components/Content'
import splitArr from '../../function/splitArr'
import {InstantSearch, Configure} from 'react-instantsearch-dom'
import { searchClient } from "../../lib/typesenseAdapter";
import CatalogList from '../../components/CatalogList'
import CatalogFilterLabels from '../../components/CatalogFilterLabels'
import SubCategoryMenu from '../../components/SubCategoryMenu'
import { client } from '../../lib/api'

export async function getServerSideProps(ctx) {

  const { data } = await client.query({
    query: categoryQuery,
    variables: {
      slug: ctx.query.category
    }
  });

  let categoryFetch = {}
  let category
  if(data?.categories.length) {
    category = data.categories[0]
    categoryFetch = data.categories[0]
  }else if(data?.brands.length) {
    category = data.brands[0]
    categoryFetch = data.brands[0]
  }else{
    return {
      notFound: true
    }
  }

  let title = [], subTitle = []

  if(categoryFetch?.title) title = categoryFetch?.title.split(' ')
  if(categoryFetch?.add_title) subTitle = categoryFetch?.add_title.split(' ')

  const h1Split = splitArr(title, 2)
  const subTitleSplit = splitArr(subTitle, 3)

  return {
    props: { 
      h1Split,
      subTitleSplit,
      navigation: data.navigation,
      global: data.global,
      category
    }
  }
}

const Category = ({
  h1Split,
  subTitleSplit,
  navigation,
  global,
  category
}) => {

  const router = useRouter()

  // const [filter, setFilter] = useState({
  //   slug: undefined,
  //   sort: undefined,
  //   param: undefined,
  //   brandId: undefined,
  //   categoryId: undefined,
  //   offset: 0,
  //   limit: 4
  // })

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
        image={category.image}
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
              {!!subTitleSplit?.length && <h2 className="big-head">
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
