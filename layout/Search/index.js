import {useState, useEffect, useContext, useRef} from 'react'
// import { DataStateContext } from '../../context/dataStateContext'
// import sanityClient from "../../lib/sanity.js";
// import imageUrlBuilder from "@sanity/image-url";
import { offcanvas, util } from 'uikit'
import CanvasItem from '../../components/CanvasItem'

// import query from '../../queries/search'

// const imageBuilder = imageUrlBuilder(sanityClient);
// const urlFor = source => imageBuilder.image(source);

const Search = () => {

  const [searchItems, setSearchItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [searchNotFound, setSearchNotFound] = useState('')
  const [loadding, setLoaading] = useState(false)
  const input = useRef(null);

  // const { dataContextState } = useContext(DataStateContext)

  const closeCanvas = () => {
    offcanvas(util.find('#search')).hide();
  }

  // useEffect(() => {
  //   if(dataContextState.state.searchFocus){
  //     input.current.focus()
  //   }
  // }, [dataContextState])

  // useEffect(() => {
  //   setSearchItems(dataContextState.search)
  // }, [dataContextState.search])

  const handleSearch = async (value) => {
    // setSearchValue(value)
    // await setLoaading(true)
    // if(value.length > 2){
    //   const data = await sanityClient.fetch(query, {value: value + '*'})
    //   if(!data?.length){
    //     setSearchNotFound('Nic jsme nenašli, zkuste jiné slovo.')
    //   }else{
    //     setSearchNotFound('')
    //   }
    //   await setSearchItems(data)
    // }else{
    //   await setSearchItems([])
    // }
    // await setLoaading(false)
  }

  return (
    <div id="search" className="uk-offcanvas" uk-offcanvas="flip: true; overlay: true">
      <div className="uk-offcanvas-bar">
        <div className="canvas-head uk-flex uk-flex-between">
          <h3>Vyhledávání</h3>
          <a href="/"><img className="uk-svg" src="/assets/times.svg" uk-svg="" /></a>
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
            <CanvasItem />
          </div>
          <div className="result-block">
            <h4>Kategorie</h4>
            <CanvasItem />
            <CanvasItem />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
