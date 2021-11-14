import {useContext, useState, useEffect} from 'react'
import Page from '../../layout/Page'
import PageTop from '../../components/PageTop'
import Card from '../../components/Card'
import Filter from '../../layout/Filter'
import categoryQuery from '../../queries/category'
import productsQuery from '../../queries/products'
import { useQuery, useLazyQuery } from "@apollo/client";
import {useRouter} from 'next/router'
import ReactMarkdown from 'react-markdown'
import filteredLabelQuery from '../../queries/filter'
import { DataStateContext } from '../../context/dataStateContext'
import changeUrl from '../../function/changeUrl'

const Category = () => {

  const router = useRouter()
  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)

  const [query, setQuery] = useState(router.query)
  const [category, setCategory] = useState({})
  const [title, setTitle] = useState([])
  const [subTitle, setSubTitle] = useState([])
  const [navigation, setNavigation] = useState({})
  const [global, setGlobal] = useState({})
  const [buttonMore, setButtonMore] = useState(true)
  const [more, setMore] = useState(false)
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState({
    slug: undefined,
    sort: undefined,
    param: undefined,
    brandId: undefined,
    categoryId: undefined,
    offset: 0,
    limit: 4
  })

  const { loading: errorLoading, error: errorLabels, data: labels, refetch: refetchLabels } = useQuery(filteredLabelQuery, {
    variables: {
      param: router.query?.param ? router.query.param.split(',') : [0],
      categoryId: router.query?.Category ? router.query.Category.split(',') : [0],
      brandId: router.query?.Brand ? router.query.Brand.split(',') : [0]
    }
  });

  const [getData, {data: dataFetch}] = useLazyQuery(categoryQuery);

  const [getProducts, {data: dataProducts}] = useLazyQuery(productsQuery)

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
      const state = dataContextState.state

      let variables = {
        slug: router.query.category,
        param: router.query?.param ? router.query.param.split(',') : undefined,
        sort: router.query?.sort ? router.query.sort : undefined,
        categoryId: router.query?.Category ? router.query.Category.split(',') : undefined,
        brandId: router.query?.Brand ? router.query.Brand.split(',') : undefined,
        offset: 0,
        limit: 4
      }

      let categoryFetch = {}
      if(dataFetch?.categories.length) {
        setCategory(dataFetch.categories[0])
        categoryFetch = dataFetch.categories[0]
        variables.categoryId = dataFetch.categories[0].id
        state.Category = [dataFetch.categories[0].id]
      }else {
        setCategory(dataFetch.brands[0])
        categoryFetch = dataFetch.brands[0]
        variables.brandId = dataFetch.brands[0].id
        state.Brand = [dataFetch.brands[0].id]
      }

      dataContextDispatch({ state: state, type: 'state' })
      setFilter(variables)
      getProducts({variables})

      if(categoryFetch?.title) setTitle(categoryFetch?.title.split(' '))
      if(categoryFetch?.add_title) setSubTitle(categoryFetch?.add_title.split(' '))

      setNavigation(dataFetch.navigation)
      setGlobal(dataFetch.global)

    }
  }, [dataFetch])

  useEffect(() => {
    if(dataProducts){
      let count = 0;
      if(category.__typename === 'Category') {
        count = dataProducts.productsCatCount.aggregate.count
      }else{
        count = dataProducts.productsBrandCount.aggregate.count
      }

      let productsArr = []
      if(more) {
        productsArr = [...products, ...dataProducts[`products${category.__typename}`]]
        setMore(false)
      }else{
        productsArr = dataProducts[`products${category.__typename}`]
      }
      setProducts(productsArr)

      if(count === productsArr.length) setButtonMore(false)
      else setButtonMore(true)

    }
  }, [dataProducts])

  const handleFilter = (state) => {
    changeUrl(state)

    let filterObj = filter
    const labelsFilter = {
      param: [0],
      brandId: [0],
      categoryId: [0]
    }

    if(category.__typename === "Category") {
      filterObj.categoryId = category.id
    }
    if(category.__typename === "Brand"){
      filterObj.brandId = category.id
    }

    if(state?.Brand?.length){
      filterObj.brandId = state.Brand
      labelsFilter.brandId = state.Brand
    }else{
      filterObj.brandId = undefined
    }
    if(state?.Category?.length){
      filterObj.categoryId = state.Category
      labelsFilter.categoryId = state.Category
    }else{
      filterObj.categoryId = undefined
    }
    if(state.param.length) {
      filterObj.param = state.param
      labelsFilter.param = state.param
    }else{
      filterObj.param = undefined
    }
    if(state.sort.length) {
      filterObj.sort = state.sort
    }else{
      filterObj.sort = undefined
    }

    getProducts({variables: filterObj})
    refetchLabels(labelsFilter)
    setFilter(filterObj)
  }

  const handleState = (e, name, id) => {
    e.preventDefault()
    let state = dataContextState.state
    let obj = state[name]
    if(obj.indexOf(id) >= 0) obj.splice(obj.indexOf(id), 1)
    else obj.push(id)
    state[name] = obj
    dataContextDispatch({ state: state, type: 'state' })
    handleFilter(state)
  }

  const removeAll = (e) => {
    e.preventDefault()
    let state = {
      Brand: [],
      Category: [],
      param: [],
      sort: "published_at:asc"
    }
    dataContextDispatch({ state: state, type: 'state' })
    handleFilter(state)
  }

  const handleSort = (value) => {
    let state = dataContextState.state
    state.sort = value
    dataContextDispatch({ state: state, type: 'state' })
    handleFilter(state)
  }

  const loadMore = async (e, offset, limit) => {
    e.preventDefault()
    let filterObj = {...filter}
    // if(category.__typename === "Category") {
    //   filterObj.categoryId = category.id
    // }else{
    //   filterObj.brandId = category.id
    // }
    filterObj.limit = limit
    filterObj.offset = offset
    getProducts({variables: filterObj})
    setMore(true)
  }

  console.log(category);

  return (
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
                <span><b>{title[0]}</b> {title[1]}</span>
              </h1>}
        />
      <section>
        <div className="uk-container uk-container-large">
          <div className="catalog-control">
            <div className="catalog-filter-wrap">
              <a href="/" uk-toggle="target: #filter" className="filter-button">Filtrovat a třídit <img className="uk-svg" src="/assets/sliders-h.svg" uk-svg="" /></a>
            </div>
            <div className="filter-selected">
              <ul>
                {!!labels?.values?.length && labels.values.map((item, index) => <li key={index}><a href="/" onClick={e => handleState(e, 'param', item.id)}>{item.title} <img className="uk-svg" src="/assets/times.svg" uk-svg="" /></a></li>)}
                {!!labels?.brandLabel?.length && labels.brandLabel.map((item, index) => <li key={index}><a href="/" onClick={e => handleState(e, 'Brand', item.id)}>{item.title} <img className="uk-svg" src="/assets/times.svg" uk-svg="" /></a></li>)}
                {!!labels?.categoryLabel?.length && labels.categoryLabel.map((item, index) => <li key={index}><a href="/" onClick={e => handleState(e, 'Category', item.id)}>{item.title} <img className="uk-svg" src="/assets/times.svg" uk-svg="" /></a></li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="catalog-list">
        <div className="uk-container uk-container-large">
          <div className="uk-grid uk-child-width-1-2 uk-child-width-1-4@s" uk-grid="">
            {!!products?.length && products.map((item, index) => <div key={index}><Card data={item} /></div>)}
          </div>
          {buttonMore && <div className="button-more-wrap">
            <a href="/" onClick={e => loadMore(e, products.length, products.length + 4)} className="button">načíst další</a>
          </div>}
          <hr />
        </div>
      </section>

      <section className="additional-sec">
        <div className="uk-container">
          {!!subTitle?.length && <h2 className="big-head">
            <span style={{paddingLeft: '14vw'}}>{subTitle[0]} {subTitle[1]} {subTitle[2]} {subTitle[3]}</span>
            <span style={{paddingLeft: '0px'}}>{subTitle[4]} {subTitle[5]} {subTitle[6]} {subTitle[7]}</span>
            <span style={{paddingLeft: '7vw'}}>{subTitle[8]} {subTitle[9]} {subTitle[10]} {subTitle[11]}</span>
          </h2>}
          <div>
            <ReactMarkdown>{category?.content}</ReactMarkdown>
          </div>
        </div>
      </section>

      <Filter
        parameters={category?.parameters || []}
        category={category?.filterCategories || []}
        handle={handleFilter}
        handleState={handleState}
        handleSort={handleSort}
        removeAll={removeAll}
        />

    </Page>
  )
}

export default Category
