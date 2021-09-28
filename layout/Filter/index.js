import { offcanvas, util } from 'uikit'
import { DataStateContext } from '../../context/dataStateContext'
import {useContext, useEffect} from 'react'
import {useRouter} from 'next/router'

const Filter = ({
  parameters,
  category,
  handle,
  handleState,
  handleSort
}) => {

  const router = useRouter()
  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)

  useEffect(() => {
    if(category.length) {
      dataContextDispatch({state: {
        Brand: router.query?.Brand ? router.query.Brand.split(',') : [],
        Category: router.query?.Category ? router.query.Category.split(',') : [],
        param: router.query?.param ? router.query?.param.split(',') : [],
        sort: router.query?.sort ? router.query.sort : 'published_at:asc'
      }, type: 'state'})
    }
  }, [category])

  const closeCanvas = (e) => {
    e.preventDefault()
    offcanvas(util.find('#filter')).hide();
  }

  return (
    <div id="filter" className="uk-offcanvas" uk-offcanvas="flip: true; overlay: true;">
      <div className="uk-offcanvas-bar">
        <div className="uk-flex uk-flex-between">
          <div className="canvas-head uk-flex uk-flex-between uk-flex-middle">
            <h3>Filtrovat a třídit</h3>
            <a href="/" onClick={e => closeCanvas(e)}><img className="uk-svg" src="/assets/times.svg" uk-svg="" /></a>
          </div>
        </div>
        <hr />
        <div className="catalog-filter">
          <ul className="uk-accordion" uk-accordion="multiple: true">
            {!!category.length && <li className="uk-open">
              <a className="uk-accordion-title" href="#">
                {category[0].__typename === 'Brand' && 'Značka'}
                {category[0].__typename === 'Category' && 'Kategorie'}
                <img className="uk-svg" src="/assets/angle-down.svg" uk-svg="" />
              </a>
              <div className="uk-accordion-content">
                <ul>
                  {category.map((item, index) => <li key={index}>
                    <label>
                      <span>{item.title}</span>
                      <input
                        onChange={e => handleState(e, item.__typename, item.id)}
                        className="uk-checkbox"
                        type="checkbox"
                        checked={dataContextState.state[item.__typename].indexOf(item.id) >= 0} />
                    </label>
                  </li>)}
                </ul>
              </div>
            </li>}
            {!!parameters.length && parameters.map((item, index) => <li key={index}>
              <a className="uk-accordion-title" href="#">{item.title} <img className="uk-svg" src="/assets/angle-down.svg" uk-svg="" /></a>
              <div className="uk-accordion-content">
                <ul>
                  {item.values.map((itemVal, indexVal) => <li key={indexVal}>
                    <label>
                      <span>{itemVal.title}</span>
                      <input onChange={e => handleState(e, 'param', itemVal.id)} className="uk-checkbox" type="checkbox" checked={dataContextState.state.param.indexOf(itemVal.id) >= 0} />
                    </label>
                  </li>)}
                </ul>
              </div>
            </li>)}
            <li>
              <a className="uk-accordion-title" href="#">seřadit <img className="uk-svg" src="/assets/angle-down.svg" uk-svg="" /></a>
              <div className="uk-accordion-content">
                <ul>
                  <li>
                    <label>
                      <span>podle doporučení</span>
                      <input className="uk-radio" onChange={e => handleSort('published_at:asc')} type="radio" name="sorting" checked={dataContextState.state.sort === "published_at:asc"} />
                    </label>
                  </li>
                  <li>
                    <label>
                      <span>od nejlevnějšího</span>
                      <input className="uk-radio" onChange={e => handleSort('price:asc')} type="radio" name="sorting" checked={dataContextState.state.sort === "price:asc"} />
                    </label>
                  </li>
                  <li>
                    <label>
                      <span>od nejdražšího</span>
                      <input className="uk-radio" onChange={e => handleSort('price:desc')} type="radio" name="sorting" checked={dataContextState.state.sort === "price:desc"} />
                    </label>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="canvas-buttons-wrap uk-margin-top uk-flex uk-flex-between">
          <a href="/" className="button border-button">vymazat vše</a>
          <a href="/" className="button primary" onClick={e => closeCanvas(e)}>zobrazit</a>
        </div>
      </div>
    </div>
  )
}

export default Filter
