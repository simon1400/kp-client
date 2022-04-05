import {connectCurrentRefinements} from "react-instantsearch-core"

const CatalogFilterLabels = ({items, refine}) => {

  const handle = (e, item) => {
    e.preventDefault()
    refine(item)
  }

  return (
    <section>
      <div className="uk-container uk-container-large">
        <div className="catalog-control">
          <div className="catalog-filter-wrap">
            <a href="/" uk-toggle="target: #filter" className="filter-button">Filtrovat a třídit <img className="uk-svg" src="/assets/sliders-h.svg" uk-svg="" /></a>
          </div>
          <div className="filter-selected">
            <ul>
              {items.map((item, index) => item.items.map((inItem, inIndex) => <li key={index+inIndex}>
                <a href="/" onClick={e => handle(e, inItem.value)}>
                  {inItem.label} 
                  <img className="uk-svg" src="/assets/times.svg" uk-svg="" />
                </a>
              </li>))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default connectCurrentRefinements(CatalogFilterLabels)