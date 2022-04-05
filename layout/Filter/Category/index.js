// import { useContext, useEffect } from "react"
import {connectRefinementList} from "react-instantsearch-core"
// import { DataStateContext } from "../../../context/dataStateContext"

const FilterCategory = ({
  items,
  refine,
  createURL
  // currentRefinement
}) => {

  // const { dataContextState, dataContextDispatch } = useContext(DataStateContext)

  // useEffect(() => {
  //   if(dataContextState.filterCategory !== currentRefinement){
  //     console.log('category update');
  //     dataContextDispatch({state: currentRefinement, type: 'filterCategory'})
  //   }
  // }, [currentRefinement])

  const handle = (value) => {
    refine(value); 
    const url = createURL(value)
    console.log(url);
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