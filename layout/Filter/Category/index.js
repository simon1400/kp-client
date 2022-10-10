import {useRefinementList} from "react-instantsearch-hooks-web"

const FilterCategory = (props) => {

  const { items, refine } = useRefinementList(props);

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
            disabled={!items.find(itemFind => itemFind.isRefined) && item.count === 0}
            checked={item.isRefined} />
        </label>
      </li>)}
    </ul>
  )
}

export default FilterCategory