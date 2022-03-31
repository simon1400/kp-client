import {useState, useEffect, useContext} from 'react'
import { DataStateContext } from '../../context/dataStateContext'
import { offcanvas, util } from 'uikit'

import CanvasItem from '../../components/CanvasItem'
import canvasQuery from '../../queries/canvas'
import { useQuery } from '@apollo/client'

const Canvas = () => {

  const [canvasItems, setCanvasItems] = useState([])
  const { data } = useQuery(canvasQuery);

  const closeCanvas = (e) => {
    e.preventDefault()
    offcanvas(util.find('#canvas')).hide();
  }

  const { dataContextState } = useContext(DataStateContext)
  const [sum, setSum] = useState(0)

  useEffect(() => {
    setCanvasItems(dataContextState.basket)
    var startSum = 0
    dataContextState.basket.map(item => {
      startSum += +item.price * +item.count
    })
    setSum(startSum)
  }, [dataContextState, dataContextState.basket.length])

  console.log(data);

  return (
    <div id="canvas" className="uk-offcanvas" uk-offcanvas="flip: true; overlay: true">
      <div className="uk-offcanvas-bar">
        <div className="uk-flex uk-flex-between">
          <div className="canvas-head uk-flex uk-flex-between uk-flex-middle">
            <h3>Košík</h3>
            <a href="/" onClick={e => closeCanvas(e)}><img className="uk-svg" src="/assets/times.svg" uk-svg="" /></a>
          </div>
        </div>
        <hr />
        <div className="canvas-content-wrap">
          {!!canvasItems.length ? canvasItems.map((item, index) => <CanvasItem basketItem key={index} square={130} data={item} index={index} />) : 'Váš košík je prázdný.'}
        </div>
        {!!canvasItems.length && <hr className="uk-margin-bottom uk-margin-top"/>}
        {!!canvasItems.length && <table className="canvas-table uk-table uk-margin-remove-vertical">
          {!!data?.global?.basketInfo && !!data.global?.basketInfo?.length && <tbody>
            {data.global.basketInfo.map((item, index) => <tr key={index}>
              <td>{item.title}</td>
              <td className="uk-text-right">
                <span className="green-text">{item.value}</span>
              </td>
            </tr>)}
          </tbody>}
          <tfoot>
            <tr>
              <th>Celková cena</th>
              <th className="uk-text-right price-color">{sum.toLocaleString()} Kč</th>
            </tr>
          </tfoot>
        </table>}
        {!!canvasItems.length && <div className="canvas-buttons-wrap uk-margin-top uk-flex uk-flex-between">
          <a href="/kosik" className="button border-button">do košíku</a>
          <a href="/objednavka" className="button primary">k objednávce</a>
        </div>}
      </div>
    </div>
  )
}

export default Canvas
