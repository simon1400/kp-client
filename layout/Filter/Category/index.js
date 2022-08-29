import {connectRefinementList} from "react-instantsearch-core"

const FilterCategory = ({
  items,
  refine
}) => {

  const handle = (value) => {
    refine(value);
  }

  return (
    <ul>
      {items.map((item, index) => <li key={index}>
        <label>
          <span>{item.label}</span>
          <input
            onChange={() => handle(item.value)}
            className="uk-checkbox"
            type="checkbox"
            checked={item.isRefined} />
        </label>
      </li>)}
    </ul>
  )
}

export default connectRefinementList(FilterCategory)