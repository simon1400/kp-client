import {useRefinementList} from "react-instantsearch-hooks-web"

const Parameters = (props) => {

  const { items, refine } = useRefinementList(props);

  return (
    <ul>
      {items.map((itemVal, indexVal) => <li key={indexVal}>
        <label>
          <span>{itemVal.label}</span>
          <input
            onChange={() => refine(itemVal.value)}
            className="uk-checkbox" 
            type="checkbox" 
            checked={itemVal.isRefined} 
          />
        </label>
      </li>)}
    </ul>
  )
}

export default Parameters