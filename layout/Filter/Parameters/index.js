// import { useContext, useEffect } from "react"
import {connectRefinementList} from "react-instantsearch-core"
// import { DataStateContext } from "../../../context/dataStateContext"

const Parameters = ({
  data,
  items,
  refine,
  // currentRefinement
}) => {

  // const { dataContextState, dataContextDispatch } = useContext(DataStateContext)

  // useEffect(() => {
  //   if(dataContextState.filterParameters !== currentRefinement){
  //     dataContextDispatch({state: currentRefinement, type: 'filterParameters'})
  //   }
  // }, [currentRefinement])

  return (
    <>
      {data.map((item, index) => <li key={index}>
        <a className="uk-accordion-title" href="#">{item.title} <img className="uk-svg" src="/assets/angle-down.svg" uk-svg="" /></a>
        <div className="uk-accordion-content">
          <ul>
            {item.values.map((itemVal, indexVal) => {
              let itemFind = items[items.findIndex(menuItem => menuItem.label === itemVal.title)]
              if(itemFind) {
                return <li key={indexVal}>
                <label>
                  <span>{itemVal.title}</span>
                  <input
                    onChange={e => refine(itemFind.value)} 
                    className="uk-checkbox" 
                    type="checkbox" 
                    checked={itemFind.isRefined} 
                  />
                </label>
              </li>
              }else{
                return null
              }
              })}
          </ul>
        </div>
      </li>)}
    </>
  )
}

export default connectRefinementList(Parameters)