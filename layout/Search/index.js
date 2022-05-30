import {useState, useEffect, useRef} from 'react'
import { offcanvas, util } from 'uikit'
import SearchResult from '../../components/SearchResult'
import {useLazyQuery} from '@apollo/client'
import searchQuery from '../../queries/search.js'
import { Configure, Index, InstantSearch } from 'react-instantsearch-dom'
import { searchClient } from '../../lib/typesenseAdapter'
import SearchBox from '../../components/SearchBox'
import HasResult from '../../components/HasResult'

const Search = () => {

  const searchInput = useRef(null)

  const [searchItems, setSearchItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [searchNotFound, setSearchNotFound] = useState('')

  const [getData, {loading, data, error}] = useLazyQuery(searchQuery)

  const closeCanvas = (e) => {
    e.preventDefault()
    offcanvas(util.find('#search')).hide();
  }

  useEffect(() => {
    // util.on('#search', 'beforehide', () => setActiveDropdown(false));
    util.on('#search', 'beforeshow', () => searchInput.current.focus());
  })

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if(searchValue.length > 2) {
        getData({
          variables: {
            search: searchValue
          }
        })
      }
    }, 500)
    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  const handleSearch = async (value) => {
    setSearchValue(value)
  }

  return (
    <InstantSearch
      indexName="produkties"
      searchClient={searchClient}
    >
      <div id="search" className="uk-offcanvas" uk-offcanvas="flip: true; overlay: true">
        <div className="uk-offcanvas-bar">
          <div className="canvas-head uk-flex uk-flex-between">
            <h3>Vyhledávání</h3>
            <a href="/" onClick={e => closeCanvas(e)}>
              <img className="uk-svg" src="/assets/times.svg" uk-svg="" />
            </a>
          </div>
          <hr />

          <Configure hitsPerPage={4} />

          <SearchBox searchInput={searchInput} />

          <HasResult />

          {/* {/* {!data && !!searchValue.length && 'Nic jsme nenašli, zkuste jiné slovo.'} */}
          <div className="results">
            <Index indexName="categories">
              <SearchResult title="Kategorie" />
            </Index>
            <Index indexName="brands">
              <SearchResult title="Značky" />
            </Index>
            <Index indexName="produkties">
              <SearchResult title="Produkty" />
            </Index>
            <Index indexName="blogs">
              <SearchResult title="Články" />
            </Index>
          </div>
        </div>
      </div>
    </InstantSearch>
  )
}

export default Search
