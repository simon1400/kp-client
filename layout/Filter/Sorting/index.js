import {connectSortBy} from "react-instantsearch-core"

const Sorting = ({
  items,
  refine
}) => {

  return (
    <li>
      <a className="uk-accordion-title" href="#">Seřadit <img className="uk-svg" src="/assets/angle-down.svg" uk-svg="" /></a>
      <div className="uk-accordion-content">
        <ul>
          {items.map((item, index) => <li key={index}>
            <label>
              <span>{item.label}</span>
              <input 
                className="uk-radio" 
                onChange={e => refine(item.value)} 
                type="radio" 
                name="sorting" 
                checked={item.isRefined} 
              />
            </label>
          </li>)}
        </ul>
      </div>
    </li>
  )
}

export default connectSortBy(Sorting)