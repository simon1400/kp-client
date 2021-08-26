import {useContext} from 'react'
import Link from 'next/link'
// import sanityClient from "../../lib/sanity.js";
// import imageUrlBuilder from "@sanity/image-url";
// import { DataStateContext } from '../../context/dataStateContext'
//
// const imageBuilder = imageUrlBuilder(sanityClient);
// const urlFor = source => imageBuilder.image(source);

const CanvasItem = ({basketItem = false, data, index, basket = false}) => {

  // const { dataContextState, dataContextDispatch } = useContext(DataStateContext)

  const deleteItem = (e, index) => {
    // e.preventDefault()
    // let newCanvasItems = [...dataContextState.basket]
    // newCanvasItems.splice(index, 1)
    // dataContextDispatch({ state: newCanvasItems, type: 'basket' })
  }

  return (
    <Link href={`/`}>
      <a className={`canvas-item ${basketItem ? 'basket-canvas-item' : ''}`}>
        <div className="canvas-item-img">
          <img className="uk-img" src="/assets/banner.jpg" uk-img="" />
        </div>
        <div className="canvas-item-content">
          <div>
            <label>Angelo Caroli</label>
            <h5>Emocionální kolekce - AMORE NERO</h5>
            <span className="price">1 550 Kč</span>
            {basketItem && <div className="control-item">
              <span className="count-item">12 ks</span>
              <a href="/"><img className="uk-svg" src="/assets/times.svg" uk-svg="" /></a>
            </div>}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default CanvasItem
