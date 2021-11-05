import {useState, useEffect, useContext} from 'react'
import loadable from '@loadable/component'
import {useRouter} from 'next/router'
import {GetOrder, UpdateOrder} from '../../queries/order'
import userQuery from '../../queries/user'
import {useLazyQuery, useMutation} from '@apollo/client'
import { DataStateContext } from '../../context/dataStateContext'
import axios from 'axios'
// import dataSend from '../../function/gtag'
// import Head from 'next/head'

import Page from "../../layout/Page"

const ThankYou = () => {

  const router = useRouter()

  const [status, setStatus] = useState('')
  const [price, setPrice] = useState('')

  const { dataContextDispatch } = useContext(DataStateContext)
  const [getOrder, {data: order}] = useLazyQuery(GetOrder);
  const [getGlobal, {data}] = useLazyQuery(userQuery);
  const [updateOrder] = useMutation(UpdateOrder);

  useEffect(() => {
    getGlobal()
    if(router.query.idOrder){
      getOrder({variables: {
        id: atob(router.query.idOrder)
      }})
    }
  }, [router.query])

  useEffect(() => {
    if(order) {
      if(!router.query.id){
        if(order.order.payment.type === 'dobirka'){
          setStatus(order.order.payment.type)
        }else{
          setStatus(order.order.status)
        }
      }else{
        axios.get('/api/payment/'+router.query.id).then(res => {
          setStatus(res.data.state)
          if(order.order.status !== res.data.state){
            updateOrder({variables: {
              input: {
                where: {id: atob(router.query.idOrder)},
                data: {
                  status: res.data.state
                }
              }
            }})
          }
        }).catch(err => console.log(err))
      }
      dataContextDispatch({ state: [], type: 'basket' })
      // dataContextDispatch({ state: 0, type: 'basketCount' })
    }
  }, [order])

  useEffect(() => {
    if(status.length) {
      if(!order.order.sendMail){
        axios.post("/api/mail/order", order.order).then(res => {
          updateOrder({variables: {
            input: {
              where: {id: atob(router.query.idOrder)},
              data: {
                sendMail: true
              }
            }
          }})
        }).catch(err => console.log(err))
      }
    }
  }, [status])

  return(
    <Page title="Dokončená objednávka" globalData={data?.global || {}} nav={data?.navigation || {}}>
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
