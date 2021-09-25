import {useContext, useState, useEffect} from 'react'
import Page from '../../layout/Page'
import PageTop from '../../components/PageTop'
import Card from '../../components/Card'
import Filter from '../../layout/Filter'
import categoryQuery from '../../queries/category'
import { useQuery, useLazyQuery } from "@apollo/client";
import {useRouter} from 'next/router'
import ReactMarkdown from 'react-markdown'
import filteredLabelQuery from '../../queries/filter'
import { DataStateContext } from '../../context/dataStateContext'
import axios from 'axios'

const Category = () => {

  const router = useRouter()
  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)

  const [countProduct, setCountProduct] = useState(0)

  const { loading: errorLoading, error: errorLabels, data: labels, refetch: refetchLabels } = useQuery(filteredLabelQuery, {
    variables: {
      param: router.query?.param ? router.query.param.split(',') : [0],
      categoryId: router.query?.Category ? router.query.Category.split(',') : [0],
      brandId: router.query?.Brand ? router.query.Brand.split(',') : [0]
    }
  });

  const {loading, data, refetch} = useQuery(categoryQuery, {
    variables: {
      slug: router.query.category,
      param: router.query?.param ? router.query.param.split(',') : undefined,
      categoryId: router.query?.Category ? router.query.Category.split(',') : undefined,
      brandId: router.query?.Brand ? router.query.Brand.split(',') : undefined,
      sort: router.query?.sort ? router.query.sort : undefined,
      offset: 0,
      limit: 4
    }
  });

  if(loading) return 'Loading...'



  let category = []
  if(data?.categories.length) category = data.categories[0]
  else if(data?.brands.length) category = data.brands[0]

  let title = [], subTitle = [];
  if(category?.title) title = category?.title.split(' ')
  if(category?.add_title) subTitle = category?.add_title.split(' ')

  const handleFilter = async (state) => {
    let urlStr = ''
    for(var key in state) {
      if(state[key].length){
        urlStr += `&${key}=${state[key]}`
      }
    }
    urlStr = urlStr.slice(1)
    if(urlStr.length) {
      urlStr = '?'+urlStr
    }
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + urlStr;
    window.history.pushState({path:newurl},'',newurl);

    const filter = {
      slug: router.query.category,
      sort: undefined,
      param: undefined,
      brandId: undefined,
      categoryId: undefined,
      offset: 0,
      limit: 4
    }
    const labelsFilter = {
      param: [0],
      brandId: [0],
      categoryId: [0]
    }
    if(state?.Brand?.length){
      filter.brandId = state.Brand
      labelsFilter.brandId = state.Brand
    }
    if(state?.Category?.length){
      filter.categoryId = state.Category
      labelsFilter.categoryId = state.Category
    }
    if(state.sort.length) {
      filter.sort = state.sort
    }
    if(state.param.length) {
      filter.param = state.param
      labelsFilter.param = state.param
    }
    if(state.offset > 0) {
      filter.offset = state.offset
    }
    if(state.limit > 4) {
      filter.limit = state.limit
    }

    refetch(filter)
    refetchLabels(labelsFilter)
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

  const handleSort = (value) => {
    let state = dataContextState.state
    state.sort = value
    dataContextDispatch({ state: state, type: 'state' })
    handleFilter(state)
  }

  const loadMore = (e, offset, limit) => {
    e.preventDefault()
    let state = dataContextState.state
    state.offset = offset
    state.limit = limit
    dataContextDispatch({ state: state, type: 'state' })
    handleFilter(state)
  }

  return (
    <Page bigHeader globalData={data.global} nav={data.navigation}>
      <PageTop
        small
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
                {!!labels.values?.length && labels.values.map((item, index) => <li key={index}><a href="/" onClick={e => handleState(e, 'param', item.id)}>{item.title} <img className="uk-svg" src="/assets/times.svg" uk-svg="" /></a></li>)}
                {!!labels.brandLabel?.length && labels.brandLabel.map((item, index) => <li key={index}><a href="/" onClick={e => handleState(e, 'Brand', item.id)}>{item.title} <img className="uk-svg" src="/assets/times.svg" uk-svg="" /></a></li>)}
                {!!labels.categoryLabel?.length && labels.categoryLabel.map((item, index) => <li key={index}><a href="/" onClick={e => handleState(e, 'Category', item.id)}>{item.title} <img className="uk-svg" src="/assets/times.svg" uk-svg="" /></a></li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="catalog-list">
        <div className="uk-container uk-container-large">
          <div className="uk-grid uk-child-width-1-2 uk-child-width-1-4@s" uk-grid="">
            {category?.products.map((item, index) => <div key={index}><Card data={item} /></div>)}
          </div>
          <div className="button-more-wrap">
            <a href="/" onClick={e => loadMore(e, 0, category.products.length + 4)} className="button">načíst další</a>
          </div>
          <hr />
        </div>
      </section>

      <section className="additional-sec">
        <div className="uk-container">
          {subTitle.length && <h2 className="big-head">
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
        />

    </Page>
  )
}

export default Category
