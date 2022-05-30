import { offcanvas, util } from 'uikit'
import { DataStateContext } from '../../context/dataStateContext'
import {useContext, useEffect} from 'react'
import {useRouter} from 'next/router'
import FilterCategory from './Category'
import orderBy from '../../function/orderBy'
import Parameters from './Parameters'
import Sorting from './Sorting'
import BottomControl from './Bottom'

const Filter = ({
  parameters,
  category
}) => {

  const router = useRouter()
  

  // useEffect(() => {
  //   if(category.length) {
  //     dataContextDispatch({state: {
  //       Brand: router.query?.Brand ? router.query.Brand.split(',') : [],
  //       Category: router.query?.Category ? router.query.Category.split(',') : [],
  //       param: router.query?.param ? router.query?.param.split(',') : [],
  //       sort: router.query?.sort ? router.query.sort : 'published_at:asc'
  //     }, type: 'state'})
  //   }
  // }, [category])

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
                <FilterCategory 
                  attribute={category[0].__typename === 'Brand' ? "brand" : "category"}
                  limit={50}
                  transformItems={items => items.sort(orderBy)}
                />
              </div>
            </li>}
            {!!parameters.length && <Parameters 
              data={parameters}
              attribute="values"
              limit={50}
            />}
            <Sorting
              defaultRefinement="categoryProducts"
              items={[
                { value: 'categoryProducts', label: 'podle doporučení' },
                { value: 'categoryProducts/sort/price:asc', label: 'od nejlevnějšího' },
                { value: 'categoryProducts/sort/price:desc', label: 'od nejdražšího' },
              ]}
            />
          </ul>
        </div>
        <BottomControl closeCanvas={closeCanvas} />
      </div>
    </div>
  )
}

export default Filter
