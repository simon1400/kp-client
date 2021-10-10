import {useState, useEffect, useRef} from 'react'
import { offcanvas, util } from 'uikit'
import CanvasItem from '../../components/CanvasItem'
import {useLazyQuery} from '@apollo/client'
import searchQuery from '../../queries/search.js'

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
          <input onChange={e => handleSearch(e.target.value)} ref={searchInput} value={searchValue} className="uk-input" type="text" />
        </div>
        {!data && !!searchValue.length && 'Nic jsme nenašli, zkuste jiné slovo.'}
        {!data && !searchValue.length && 'Zadejte hledaný text.'}
        {loading && 'Loading...'}
        {!loading && data && <div className="results">
          {!!data.categories?.length && <div className="result-block">
            <h4>Kategorie</h4>
            {data.categories.map((item, index) => <CanvasItem key={index} data={item} />)}
          </div>}
          {!!data.brands?.length && <div className="result-block">
            <h4>Značky</h4>
            {data.brands.map((item, index) => <CanvasItem key={index} data={item} />)}
          </div>}
          {!!data.produkties?.length && <div className="result-block">
            <h4>Produkty</h4>
            {data.produkties.map((item, index) => <CanvasItem key={index} data={item} />)}
          </div>}
          {!!data.blogs?.length && <div className="result-block">
            <h4>Články</h4>
            {data.blogs.map((item, index) => <CanvasItem key={index} data={item} />)}
          </div>}
        </div>}
      </div>
    </div>
  )
}

export default Search
