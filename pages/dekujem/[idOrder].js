import {useState, useEffect, useContext} from 'react'
import {useRouter} from 'next/router'
import {GetOrder, UpdateOrder} from '../../queries/order'
import userQuery from '../../queries/user'
import {useMutation} from '@apollo/client'
import { DataStateContext } from '../../context/dataStateContext'
import axios from 'axios'
import { client } from '../../lib/api'
import Page from "../../layout/Page"
import TagManager from 'react-gtm-module'

export async function getServerSideProps(ctx) {

  const id = Buffer.from(ctx.query.idOrder, 'base64')

  const { data } = await client.query({
    query: GetOrder, 
    variables: {
      id: id.toString()
    }
  });

  const { data: dataGlob } = await client.query({query: userQuery})

  let orderBasket = data.order.data.attributes.basketItem.map((item, index) => {

    let basItem = {
      id: item.idProduct,
      name: item.title,
      brand: item.brand,
      list_position: index + 1,
      quantity: item.count,
      price: item.price
    }

    if(item.variantProduct) {
      basItem.variant = item.variant
    }

    return basItem

  })

  return {
    props: { 
      global: dataGlob.global,
      navigation: dataGlob.navigation,
      data: data.order.data,
      orderBasket,
      meta: {
        title: "Dokončená objednávka",
      }
    }
  }
}

const ThankYou = ({
  data,
  orderBasket
}) => {

  const router = useRouter()
  const [status, setStatus] = useState('')
  const { dataContextDispatch } = useContext(DataStateContext)
  const [updateOrder] = useMutation(UpdateOrder);

  useEffect(() => {

    if(data) {

      const dataTag = {
        transaction_id: atob(router.query.idOrder),
        affiliation: "Královská péče",
        value: data.attributes.sum - (data.attributes.sum * 0.21),
        currency: 'CZK',
        tax: data.attributes.sum * 0.21,
        shipping: data.attributes.deliveryPrice,
        items: orderBasket
      }

      console.log(dataTag)
  
      const tagManagerArgs = {
        dataLayer: {
          event: 'purchase',
          ...dataTag
        }
      }
  
      TagManager.dataLayer(tagManagerArgs)

      if(!router.query.id){
        if(data.attributes.payment.type === 'dobirka'){
          setStatus(data.attributes.payment.type)
        }else{
          setStatus(data.attributes.status)
        }
      }else{
        axios.get('/api/payment/'+router.query.id).then(res => {
          setStatus(res.data.state)
          if(data.attributes.status !== res.data.state){
            updateOrder({variables: {
              id: atob(router.query.idOrder),
              input: {status: res.data.state}
            }})
          }
        }).catch(err => console.log(err))
      }

      dataContextDispatch({ state: [], type: 'basket' })

    }
  }, [data])

  useEffect(() => {
    if(status.length){
      if(!data.attributes.sendMail){
        axios.post("/api/mail/order", {...data.attributes, id: data.id}).then(async res => {
          const {data} = await updateOrder({variables: {
            id: atob(router.query.idOrder),
            input: {
              sendMail: true
            }
          }})
          return data
        }).then(res => {
          data.attributes.sendMail = res.updateOrder.order.sendMail
        }).catch(err => console.log(err))
      }
      axios.post('/api/money/order', data).catch(err => console.error(err))
    }
  }, [status])

  return(
    <Page>
      <div className="uk-container uk-margin-xlarge-top">
        <div className="uk-grid uk-child-width-1-1" uk-grid="">
          <div className="uk-text-center">
            <h1>Děkujeme za Vaši objednávku</h1>
            <p>Na Vámi uvedený e-mail bylo zasláno potvrzení o provedené objednávce.</p>
            {!status.length && <div className="uk-text-warning">Nacitani...</div>}
            {!!status.length && status === 'CREATED' && <div className="uk-text-warning">Čeká na zaplacení</div>}
            {!!status.length && status === 'CANCELLED' && <div className="uk-text-danger">Platba se nezdařila</div>}
            {!!status.length && status === 'PAID' && <div className="uk-text-success">Platba zaplacena</div>}
            {!!status.length && status === 'dobirka' && <div className="uk-text-success">Platba na dobírku</div>}
            <div className="uk-margin-medium-top"><a href="/" className="button">Zpět na hlavní stránku</a></div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default ThankYou
