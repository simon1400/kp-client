import { useEffect } from "react"
import { connectSearchBox } from "react-instantsearch-dom"

const SearchBox = ({
  currentRefinement,
  refine,
  searchValue
}) => {

  useEffect(() => {
    refine(searchValue)
  }, [searchValue])

  return (
    <div className="input-search-wrap">
      <img className="uk-svg" src="/assets/search.svg" uk-svg="" />
      <input 
        onChange={e => refine(e.currentTarget.value)} 
        value={currentRefinement} 
        className="uk-input" 
        type="text" />
    </div>
  )
}

export default connectSearchBox(SearchBox)