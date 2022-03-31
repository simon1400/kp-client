import {useState, useEffect, useContext} from 'react'
import { DataStateContext } from '../../context/dataStateContext'
import validationForm from '../../function/validationForm'
import {useQuery, useMutation} from '@apollo/client'
import getPayData from '../../function/objednavka/payData'
import getDeliveryData from '../../function/objednavka/deliveryData'
import contactData from '../../function/objednavka/contactData'
import firmData from '../../function/objednavka/firmData'
import Checkout from '../../view/Checkout'
import axios from 'axios'

import {stateObj, errorObj} from '../../function/objednavka/objects'

import payQuery from '../../queries/pay'
import deliveryQuery from '../../queries/delivery'
import {CreateOrder} from '../../queries/order'

const CheckoutWrap = () => {

  const [basketItems, setBasketItems] = useState([])
  const { dataContextState } = useContext(DataStateContext)
  const [startSum, setStartSum] = useState(0)
  const [sum, setSum] = useState(0)
  const [sale, setSale] = useState({value: 0, typ: ''})

  const {data: payData} = useQuery(payQuery)
  const {data: deliveryData} = useQuery(deliveryQuery)
  const [createOrder, { data }] = useMutation(CreateOrder)

  const [deliveryMethod, setDeliveryMethod] = useState([])
  const [payMethod, setPayMethod] = useState([])

  const [deliveryAllow, setDeliveryAllow] = useState("all")
  const [paymentAllow, setPaymentsAllow] = useState("all")

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
    if(deliveryData) {
      setDeliveryMethod(getDeliveryData(deliveryData))
    }
  }, [deliveryData])

  useEffect(() => {
    if(payData) {
      setPayMethod(getPayData(payData))
    }
  }, [payData])

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
    deliveryMethod.map(item => {
      if(item.check){
        setPaymentsAllow(item.paysAllow)
      }
    })
  }, [deliveryMethod])

  useEffect(() => {
    setError({...error, payMethod: false})
    payMethod.map(item => {
      if(item.check){
        setDeliveryAllow(item.deliveryAllow)
      }
    })
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
      phone: contactInfo.phone,
      name: contactInfo.name,
      surname: contactInfo.surname,
      address: contactInfo.address,
      city: contactInfo.city,
      zip: contactInfo.zip,
      state: contactInfo.state,
      description,
      sum,
      payOnline: checkPayment.payOnline,
      // sale
      status: "CREATED",
      delivery: {
        name: checkDelivery.label,
        value: checkDelivery.value,
        type: checkDelivery.method
      },
      payment: {
        name: checkPayment.label,
        value: checkPayment.value,
        type: checkPayment.method
      },
      basketItem: basketItems.map(item => ({
        variant: item.variantProduct,
        brand: item.brand,
        price: item.price,
        slug: item.slug,
        count: item.count,
        idProduct: item.id,
        title: item.title,
        guid: item.guid
      })),
      anotherAddress,
      firmInfo
    }

    const dataOrder = await createOrder({variables: { input: { data: dataSend } }})

    if(dataSend.payOnline) {
      axios.post(`/api/payment`, dataOrder.data.createOrder.order).then(res => {
        window.location.href = res.data.gw_url
      }).catch(err => console.log(err))
    }else{
      window.location.href = `/dekujem/${btoa(dataOrder.data.createOrder.order.id)}`
    }

  }

  const getPickup = (data) => {
    const deliveryArr = deliveryMethod
    if(data === null) {
      deliveryArr[deliveryArr.findIndex(item => item.type === 'zasilkovna')].check = false
    }else{
      deliveryArr[deliveryArr.findIndex(item => item.type === 'zasilkovna')].label = `Zasilkovna - ${data.name}`
    }
    setDeliveryMethod(deliveryArr)
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
      paymentAllow={paymentAllow}
      deliveryAllow={deliveryAllow}
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
