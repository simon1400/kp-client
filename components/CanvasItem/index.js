import {useState, useContext} from 'react'
import Link from 'next/link'
import { DataStateContext } from '../../context/dataStateContext'
import Image from '../Image'

const CanvasItem = ({basketItem = false, data, index, square = false}) => {

  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)

  const deleteItem = (e, index) => {
    e.preventDefault()
    let newCanvasItems = [...dataContextState.basket]
    newCanvasItems.splice(index, 1)
    dataContextDispatch({ state: newCanvasItems, type: 'basket' })
  }

  if(!data) {
    return ''
  }

  const getSlug = (data) => {
    if(data.__typename === 'product') {
      return `/p/${data.slug}`
    }else if(data.__typename === 'Brand' || data.__typename === 'Category'){
      return `/c/${data.slug}`
    }else if(data.__typename === 'Blog'){
      return `/${data.category[0].slug}/${data.slug}`
    }
    return '/'
  }

  return (
    <Link href={getSlug(data)}>
      <a className={`canvas-item ${basketItem ? 'basket-canvas-item' : ''}`}>
        {!!data.image && <div className="canvas-item-img">
          <Image image={data.image} width={square} height={square} />
        </div>}
        {!!data.images && <div className="canvas-item-img">
          <Image image={data.images[0]} width={square} height={square} />
        </div>}
        <div className="canvas-item-content">
          <div>
            {!!data.brand && <label>{data.brand.title || data.brand}</label>}
            {!!data.title && <h5>
              {data.title}
              {!!data.variantProduct?.length && ` - ${data.variantProduct}`}
            </h5>}
            {!!data.price && <span className="price">{data.price} Kč</span>}
            {basketItem && <div className="control-item">
              <span className="count-item">{data.count} ks</span>
              <a href="/" onClick={e => deleteItem(e, index)}><img className="uk-svg" src="/assets/times.svg" uk-svg="" /></a>
            </div>}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default CanvasItem
