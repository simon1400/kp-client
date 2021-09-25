import {useContext} from 'react'
import Link from 'next/link'
import { DataStateContext } from '../../context/dataStateContext'
import Image from '../Image'

const CanvasItem = ({basketItem = false, data, index, basket = false}) => {

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

  return (
    <Link href={`/`}>
      <a className={`canvas-item ${basketItem ? 'basket-canvas-item' : ''}`}>
        <div className="canvas-item-img">
          <Image image={data.image} />
        </div>
        <div className="canvas-item-content">
          <div>
            <label>{data.brand}</label>
            <h5>{data.nameProduct}</h5>
            <span className="price">{data.price} Kč</span>
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
