import { offcanvas, util } from 'uikit'
import FilterCategory from './Category'
import orderBy from '../../function/orderBy'
import Parameters from './Parameters'
import Sorting from './Sorting'
import BottomControl from './Bottom'

const Filter = ({
  parameters,
  category
}) => {

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
                {category[0].attributes.__typename === 'Brand' && 'Značka'}
                {category[0].attributes.__typename === 'Category' && 'Kategorie'}
                <img className="uk-svg" src="/assets/angle-down.svg" uk-svg="" />
              </a>
              <div className="uk-accordion-content">
                <FilterCategory 
                  attribute={category[0].attributes.__typename === 'Brand' ? "brand.title" : "categoryTitles"}
                  limit={50}
                  operator="or"
                  transformItems={items => {
                    const data = category.map(item => item.attributes.title)
                    const filteredItems = items.filter(item => data.indexOf(item.value) >= 0)
                    filteredItems.sort(orderBy)
                    return filteredItems
                  }}
                />
              </div>
            </li>}

            {!!parameters.length && parameters.map((item, index) => <li key={index}>
              <a className="uk-accordion-title" href="#">{item.attributes.title} <img className="uk-svg" src="/assets/angle-down.svg" uk-svg="" /></a>
              <div className="uk-accordion-content">
                <Parameters 
                  operator="and"
                  attribute="valuesTitles"
                  limit={100}
                  transformItems={items => {
                    const data = item.attributes.values.data.map(item => item.attributes.title)
                    const filteredItems = items.filter(item => data.indexOf(item.value) >= 0)
                    filteredItems.sort(orderBy)
                    return filteredItems
                  }}
                />
              </div>
            </li>)}

            <Sorting
              defaultRefinement="produkt"
              items={[
                { value: 'produkt', label: 'podle doporučení' },
                { value: 'produkt:price:asc', label: 'od nejlevnějšího' },
                { value: 'produkt:price:desc', label: 'od nejdražšího' },
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
