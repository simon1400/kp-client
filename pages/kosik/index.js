import {useState, useEffect, useContext} from 'react'
import { DataStateContext } from '../../context/dataStateContext'
import Image from '../../components/Image'
import Page from '../../layout/Page'
import { useQuery } from '@apollo/client'
import canvasQuery from '../../queries/canvas'
import { client } from '../../lib/api'
import userQuery from '../../queries/user'

export async function getServerSideProps() {
  const { data } = await client.query({query: userQuery});

  return {
    props: { 
      basket: true,
      global: data.global,
      navigation: data.navigation,
      meta: {
        title: "Košik"
      }
    }
  }
}

const Basket = () => {

  const [basketItems, setBasketItems] = useState([])
  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const { data } = useQuery(canvasQuery);

  useEffect(() => {
    setBasketItems(dataContextState.basket)
  }, [dataContextState.basket])

  const changeCount = (value, index) => {
    if(+value > 0){
      const newBasketItems = [...basketItems]
      newBasketItems[index].count = +value
      dataContextDispatch({ state: newBasketItems, type: 'basket' })
    }
  }

  const deleteItem = (index) => {
    let newBasketItems = [...basketItems]
    newBasketItems.splice(index, 1)
    dataContextDispatch({ state: newBasketItems, type: 'basket' })
  }

  const globalSum = () => {
    let sum = 0
    basketItems.map(item => {sum += +item.count * +item.price})
    return sum
  }

  return (
    <Page basket>
      <div className="basket uk-position-relative">
        {!!basketItems.length ? <div className="uk-container uk-container-large">
          <div className="uk-grid" uk-grid="">
            <div className="uk-width-1-1 uk-width-2-3@s">
              <h1 className="uk-margin-large-top">Košík</h1>
              <div className="basket-content-wrap">
                {!!basketItems.length && <table className="uk-table uk-table-middle uk-table-divider uk-margin-remove">
                  <thead>
                    <tr>
                      <th className="uk-table-expand">Položky</th>
                      <th className="uk-width-small">Množství</th>
                      <th className="uk-width-small uk-text-right">Cena</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!!basketItems.length && basketItems.map((item, index) => <tr key={index} className="basket-item">
                      <td className="uk-flex uk-flex-start">
                        <div className="basket-item-img">
                          <Image image={item.image.hash} width={100} height={100}  />
                        </div>
                        <div className="basket-item-content">
                          <label>{item.brand}</label>
                          <a href={`/p/${item.slug}`}>{item.title}</a>
                          {!!item.variantProduct && <span>{item.variantProduct}</span>}
                        </div>
                      </td>
                      <td>
                        <div className="control-product uk-flex uk-flex-start">
                          <div className="count-product-wrap uk-flex uk-margin-right">
                            <span onClick={() => changeCount((item.count > 0 ? item.count-1 : 0), index)}>-</span>
                            <input type="text" value={item.count} onChange={e => changeCount((e.target.value.length && Number(e.target.value) ? e.target.value : item.count), index)} />
                            <span onClick={() => changeCount(item.count+1, index)}>+</span>
                          </div>
                          <div></div>
                        </div>
                      </td>
                      <td className="basket-item-price">
                        {/*<span className="price price-small">132 Kč</span>*/}
                        <span className="price price-small">{(item.price * item.count).toLocaleString()} Kč</span>
                        <span onClick={() => deleteItem(index)}><img classNAme="uk-svg" src="/assets/times.svg" uk-svg="" /></span>
                      </td>
                    </tr>)}
                  </tbody>
                </table>}
              </div>
            </div>
            <div className="uk-width-1-1 uk-width-1-3@s">
              <div className="basket-rightbar">
                <h2 className="uk-margin-large-top">Souhrn objednávky</h2>
                <div >
                  <table className="canvas-table uk-table uk-margin-remove-vertical">
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
                        <th className="uk-text-right price-color">{globalSum().toLocaleString()} Kč</th>
                      </tr>
                    </tfoot>
                  </table>
                  <p>Všechny ceny jsou včetně DPH 21 %</p>
                  <a href="/objednavka" className="button primary uk-width-expand uk-margin-top">Přejít k objednávce</a>
                </div>
              </div>
            </div>
          </div>
        </div> : <div className="uk-container uk-margin-xlarge-top">
          <div className="uk-grid uk-child-width-1-1" uk-grid="">
            <div className="uk-text-center uk-margin">
              <h1>Váš košík je prázdný.</h1>
              <div className="uk-margin-large-top">
                <a className="button primary" href="/">Zpět k nakupování</a>
              </div>
            </div>
          </div>
        </div>}
      </div>
    </Page>
  )
}

export default Basket
