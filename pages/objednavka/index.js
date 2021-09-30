import {useState, useEffect, useContext} from 'react'
import { DataStateContext } from '../../context/dataStateContext'
import validationForm from '../../function/validationForm'
import {useQuery} from '@apollo/client'
import getPayData from '../../function/objednavka/payData'
import getDeliveryData from '../../function/objednavka/deliveryData'
import contactData from '../../function/objednavka/contactData'
import firmData from '../../function/objednavka/firmData'
import Checkout from '../../view/Checkout'
import axios from 'axios'

import {stateObj, errorObj} from '../../function/objednavka/objects'

import payQuery from '../../queries/pay'
import deliveryQuery from '../../queries/delivery'

const CheckoutWrap = () => {

  const [basketItems, setBasketItems] = useState([])
  const { dataContextState } = useContext(DataStateContext)
  const [startSum, setStartSum] = useState(0)
  const [sum, setSum] = useState(0)
  const [sale, setSale] = useState({value: 0, typ: ''})

  const {data: payData} = useQuery(payQuery)
  const {data: deliveryData} = useQuery(deliveryQuery)

  const [deliveryMethod, setDeliveryMethod] = useState([])
  const [payMethod, setPayMethod] = useState([])

  const [contactInfo, setContactInfo] = useState(contactData(dataContextState?.user))
  const [anotherAddress, setAnotherAddress] = useState(contactData(dataContextState?.user?.anotherAddress))
  const [firmInfo, setFirmInfo] = useState(firmData(dataContextState?.user?.firmInfo))

  const [pickupData, setPickupData] = useState(false)

  // const [password, setPassword] = useState('')
  const [description, setDescription] = useState('')

  const [state, setState] = useState(stateObj)
  const [error, setError] = useState(errorObj)

  useEffect(() => {
    setBasketItems(dataContextState.basket)
    var newStartSum = 0
    dataContextState.basket.map(item => {
      newStartSum += +item.price * +item.count
    })
    if(newStartSum > 2000){
      var newDeliveryMethod = [...deliveryMethod]
      var newPayMethod = [...payMethod]
      newDeliveryMethod.map(item => item.value = 0)
      newPayMethod.map(item => item.value = 0)
    }
    setStartSum(newStartSum)
  }, [])

  useEffect(() => {
    if(payData) {
      setPayMethod(getPayData(payData))
    }
  }, [payData])

  useEffect(() => {
    if(deliveryData) {
      setDeliveryMethod(getDeliveryData(deliveryData))
    }
  }, [deliveryData])

  useEffect(() => {
    if(sale.value){
      var newSum = sum
      if(sale.typ === 'procent'){
        newSum = Math.round(newSum - (newSum * (sale.value / 100)))
      }else if(sale.typ === 'current'){
        newSum = newSum - sale.value
      }
      setSum(newSum)
    }

  }, [sale.value])

  useEffect(() => {
    setError({...error, deliveryMethod: false})
    if(!pickupData){
      deliveryMethod.map(item => {
        if(item.type === 'zasilkovna' && item.check){
          window.Packeta.Widget.pick('497b43a88a3af5e8', getPickup)
        }
      })
    }
  }, [deliveryMethod])

  useEffect(() => {
    setError({...error, payMethod: false})
  }, [payMethod])

  useEffect(() => {
    const checkDelivery = deliveryMethod.filter(item => item.check)[0]
    const checkPayment = payMethod.filter(item => item.check)[0]
    var sum = startSum
    sum += +checkDelivery?.value || 0
    sum += +checkPayment?.value || 0
    setSum(sum)
  }, [deliveryMethod, payMethod])

  const onBlur = (type) => {
    if(validationForm(type, contactInfo, error, setError)) {
      return true
    }
    return false
  }

  const send = async () => {

    const newError = {...error}

    if(!contactInfo.address.length) newError.address = true
    if(!contactInfo.city.length) newError.city = true
    if(!contactInfo.surname.length) newError.surname = true
    if(!contactInfo.name.length) newError.name = true
    if(!contactInfo.phone.length) newError.phone = true
    if(!contactInfo.zip.length) newError.zip = true

    if(onBlur('email')) newError.email = true

    const checkDelivery = await deliveryMethod.filter(item => item.check)[0]
    const checkPayment = await payMethod.filter(item => item.check)[0]

    if(!checkDelivery) newError.deliveryMethod = true
    if(!checkPayment) newError.payMethod = true

    setError({...error, ...newError})

    if(Object.values(newError).indexOf(true) >= 0){
      return
    }

    if(!basketItems.length){
      window.location.href = '/'
      return
    }

    const dataSend = {
      email: contactInfo.email,
      delivery: {
        name: checkDelivery.label,
        value: checkDelivery.value
      },
      payment: {
        name: checkPayment.label,
        value: checkPayment.value,
        // method: checkPayment.method
      },
      contactInfo,
      anotherAddress,
      firmInfo,
      description,
      status: 'PENDING',
      payOnline: checkPayment.payOnline,
      sale,
      check: {...state},
      basket: basketItems,
      sum
    }

    // await AxiosAPI.post(`/order`, dataSend).then(res => {
    //   if(dataSend.payOnline && res.data.data.redirect !== undefined){
    //     window.location.href = decodeURIComponent(res.data.data.redirect)
    //   }else{
    //     window.location.href = `/thank-you?refId=${res.data.data.idOrder}&dobirka=true`
    //   }
    // })

    axios.post(`/api/order`, dataSend).then(res => {
      console.log(res);
    }).catch(err => console.log(err))
  }

  const getPickup = (data) => {
    if(data === null) {
      const deliveryArr = deliveryMethod
      deliveryArr[deliveryArr.findIndex(item => item.type === 'zasilkovna')].check = false
      setDeliveryMethod(deliveryArr)
    }
    setPickupData(data)
  }

  return (
    <Checkout
      sum={sum}
      sale={sale}
      send={send}
      state={state}
      error={error}
      setSale={setSale}
      setError={setError}
      firmInfo={firmInfo}
      startSum={startSum}
      setState={setState}
      payMethod={payMethod}
      getPickup={getPickup}
      pickupData={pickupData}
      basketItems={basketItems}
      contactInfo={contactInfo}
      setFirmInfo={setFirmInfo}
      description={description}
      setPayMethod={setPayMethod}
      anotherAddress={anotherAddress}
      setContactInfo={setContactInfo}
      setDescription={setDescription}
      deliveryMethod={deliveryMethod}
      setDeliveryMethod={setDeliveryMethod}
      setAnotherAddress={setAnotherAddress}
    />
  )
}

export default CheckoutWrap
