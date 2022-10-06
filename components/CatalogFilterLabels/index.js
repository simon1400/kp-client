import {useCurrentRefinements} from "react-instantsearch-hooks-web"

const CatalogFilterLabels = (props) => {

  const { items, refine } = useCurrentRefinements(props);

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
              {items.map((item, index) => item.refinements.map((inItem, inIndex) => <li key={index+inIndex}>
                <a href="/" onClick={e => handle(e, inItem)}>
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

export default CatalogFilterLabels