import { connectSearchBox } from "react-instantsearch-dom"

const SearchBox = ({
  currentRefinement,
  refine,
  searchInput
}) => {



  return (
    <div className="input-search-wrap">
      <img className="uk-svg" src="/assets/search.svg" uk-svg="" />
      <input 
        onChange={e => refine(e.currentTarget.value)} 
        ref={searchInput} 
        value={currentRefinement} 
        className="uk-input" 
        type="text" />
      {/* {!currentRefinement.length && 'Zadejte hledaný text.'} */}
    </div>
  )
}

export default connectSearchBox(SearchBox)