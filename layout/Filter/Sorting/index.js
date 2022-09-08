import {useSortBy} from "react-instantsearch-hooks-web"

const Sorting = (props) => {

  const { options, refine } = useSortBy(props);

  return (
    <li>
      <a className="uk-accordion-title" href="#">Seřadit <img className="uk-svg" src="/assets/angle-down.svg" uk-svg="" /></a>
      <div className="uk-accordion-content">
        <ul>
          {options.map((item, index) => <li key={index}>
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

export default Sorting