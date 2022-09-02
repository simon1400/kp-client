import { useEffect, useState } from "react";
import {connectRefinementList} from "react-instantsearch-core"

const FilterCategory = ({
  items,
  refine
}) => {

  const [startItems, setStartItems] = useState(items)
  const [firstContent, setFirstContent] = useState(false)

  useEffect(() => {
    if(items.length && !firstContent){
      setFirstContent(true)
      const newItems = items.map(item => {
        item.disabled = false
        return item
      })
      setStartItems(newItems)
    }
    if(firstContent) {
      const filterItems = startItems.map(item => {
        const showItem = items.find(itemX => itemX.label === item.label)
        if(showItem) {
          item = showItem
          item.disabled = false
        }else{
          item.disabled = true
        }
        return item
      })

      setStartItems(filterItems)
    }
  }, [items]) 

  const handle = (value) => {
    refine(value);
  }

  return (
    <ul>
      {startItems.map((item, index) => <li key={index}>
        <label>
          <span>{item.label}</span>
          <input
            onChange={() => handle(item.value)}
            className="uk-checkbox"
            type="checkbox"
            disabled={item.disabled}
            checked={item.isRefined} />
        </label>
      </li>)}
    </ul>
  )
}

export default connectRefinementList(FilterCategory)