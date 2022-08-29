import { useEffect, useRef, useState } from 'react'
import { offcanvas, util } from 'uikit'
import SearchResult from '../../components/SearchResult'
import { Configure, Index, InstantSearch } from 'react-instantsearch-dom'
import searchClient from '../../lib/meilisearch.js'
import SearchBox from '../../components/SearchBox'
import HasResult from '../../components/HasResult'

const Search = () => {

  const searchInput = useRef(null)
  const [searchValue, setSearchValue] = useState('')

  const closeCanvas = (e) => {
    e.preventDefault()
    offcanvas(util.find('#search')).hide();
  }

  useEffect(() => {
    util.on('#search', 'beforeshow', () => searchInput.current.focus());
  })

  return (
    
      <div id="search" className="uk-offcanvas" uk-offcanvas="flip: true; overlay: true">
        <div className="uk-offcanvas-bar">
          <div className="canvas-head uk-flex uk-flex-between">
            <h3>Vyhledávání</h3>
            <a href="/" onClick={e => closeCanvas(e)}>
              <img className="uk-svg" src="/assets/times.svg" uk-svg="" />
            </a>
          </div>
          <hr />

          

          <div className="input-search-wrap">
            <img className="uk-svg" src="/assets/search.svg" uk-svg="" />
            <input 
              onChange={e => setSearchValue(e.currentTarget.value)} 
              ref={searchInput} 
              value={searchValue} 
              className="uk-input" 
              type="text" />
          </div>

          {/* <HasResult /> */}

          <div className="results">
            <InstantSearch indexName="category" searchClient={searchClient}>
              <div className="uk-hidden"><SearchBox searchValue={searchValue}/></div>
              <Configure hitsPerPage={4} />
              <SearchResult title="Kategorie" />
            </InstantSearch>
            <InstantSearch indexName="brand" searchClient={searchClient}>
              <div className="uk-hidden"><SearchBox searchValue={searchValue}/></div>
              <Configure hitsPerPage={4} />
              <SearchResult title="Značky" />
            </InstantSearch>
            <InstantSearch indexName="categoryProducts" searchClient={searchClient}>
              <div className="uk-hidden"><SearchBox searchValue={searchValue}/></div>
              <Configure hitsPerPage={4} />
              <SearchResult title="Produkty" />
            </InstantSearch>
            <InstantSearch indexName="article" searchClient={searchClient}>
              <div className="uk-hidden"><SearchBox searchValue={searchValue}/></div>
              <Configure hitsPerPage={4} />
              <SearchResult title="Články" />
            </InstantSearch>
          </div>
        </div>
      </div>
  )
}

export default Search
