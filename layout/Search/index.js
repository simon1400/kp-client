import {useState, useEffect, useContext} from 'react'
import { offcanvas, util } from 'uikit'
import CanvasItem from '../../components/CanvasItem'
import {useLazyQuery} from '@apollo/client'
import searchQuery from '../../queries/search.js'

const Search = () => {

  const [searchItems, setSearchItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [searchNotFound, setSearchNotFound] = useState('')
  const [loading, setLoading] = useState(false)

  const closeCanvas = (e) => {
    e.preventDefault()
    offcanvas(util.find('#search')).hide();
  }

  const handleSearch = async (value) => {
    setSearchValue(value)
    setLoading(true)
  }

  return (
    <div id="search" className="uk-offcanvas" uk-offcanvas="flip: true; overlay: true">
      <div className="uk-offcanvas-bar">
        <div className="canvas-head uk-flex uk-flex-between">
          <h3>Vyhledávání</h3>
          <a href="/" onClick={e => closeCanvas(e)}><img className="uk-svg" src="/assets/times.svg" uk-svg="" /></a>
        </div>
        <hr />

        <div className="input-search-wrap">
          <img className="uk-svg" src="/assets/search.svg" uk-svg="" />
          <input className="uk-input" type="text" />
        </div>
        <div className="results">
          <div className="result-block">
            <h4>Kategorie</h4>
            <CanvasItem />
          </div>
          <div className="result-block">
            <h4>Kategorie</h4>
            <CanvasItem />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
