import {useContext, useState} from 'react'
import Page from '../../layout/Page'
import Card from '../../components/Card'
import BigBanner from '../../components/BigBanner'
import productQuery from '../../queries/product'
import Image from '../../components/Image'
import { DataStateContext } from '../../context/dataStateContext'
import {dropdown, offcanvas} from 'uikit'
import getMinPrice from '../../function/getMinPrice'
import Content from '../../components/Content'
import ArticleShort from '../../components/ArticleShort'
import { client } from '../../lib/api'

var startSelectValue = {
  name: 'vybrat variantu',
  id: '',
  price: ''
}

export async function getServerSideProps(ctx) {

  const { data } = await client.query({
    query: productQuery,
    variables: {
      slug: ctx.query.slug
    }
  });

  if(!data?.produkties?.length) {
    return {
      notFound: true
    }
  }

  return {
    props: { 
      global: data.global,
      navigation: data.navigation,
      meta: {
        ...data.produkties[0].meta,
        image: data.produkties[0].images[0]
      },
      product: data.produkties[0]
    }
  }
}

const Product = ({
  global,
  product
}) => {
  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const [selectValue, setSelectValue] = useState(startSelectValue)
  const [errorBuy, setErrorBuy] = useState(false)
  // const [addToCardGTM, setAddToCardGTM] = useState(false)

  const buy = (e, product) => {
    e.preventDefault()
    if(!selectValue.id.length && !!product.Variants?.length) {
      setErrorBuy(true)
      console.log(errorBuy);
      return
    }
    let localBasket = dataContextState.basket
    let hasItem = -1


    for(var i = 0; i < localBasket.length; i++){
      if(!!product.Variants?.length) {
        if(localBasket[i].id === selectValue.id){
          hasItem = i
        }
      }else if(localBasket[i].id === product.id){
        hasItem = i
      }
    }

    if(hasItem >= 0) {
      localBasket[hasItem].count += 1
    }else{
      var newLocalBasket = {
        id: product.id,
        title: product.title,
        price: product.price,
        count: 1,
        image: product.images[0],
        imageUrl: product.images[0],
        brand: product.brand?.title,
        slug: product.slug,
        guid: product.guid,
        code: product.code,
        __typename: "product"
      }
      if(!!product.Variants?.length){
        newLocalBasket.variantProduct = selectValue.name
        newLocalBasket.price = selectValue.price
        newLocalBasket.id = selectValue.id
      }
      localBasket.push(newLocalBasket)
    }

    // setAddToCardGTM(newLocalBasket.id)

    dataContextDispatch({ state: localBasket, type: 'basket' })
    offcanvas('#canvas').show();
  }

  const selectVariant = (e, value) => {
    e.preventDefault()
    setErrorBuy(false)
    setSelectValue({name: value.nazev, id: value.id, price: value.price})
    dropdown('#variant-select').hide(false);
  }

  const getPrice = () => {
    if(selectValue.price){
      return selectValue.price.toLocaleString()
    }else if(product.Variants.length) {
      return 'od '+getMinPrice(product.Variants).price.toLocaleString()
    }else{
      return product.price.toLocaleString()
    }
  }

  return (
    <Page>
      <section className="product-base">
        <div className="uk-container uk-container-large">
          <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@s">
            <div>
              <div className="product-slider">
                <a className="bare-button button-reverse uk-visible@s" href={`/c/${product.category[0]?.slug || product.brand?.slug}`}>
                  <img className="uk-svg" src="/assets/angle-left.svg" uk-svg="" />{product.category[0]?.title || product.brand?.title}
                </a>
                <div className="uk-slideshow" uk-slideshow="ratio: 1:1">
                  <ul className="uk-slideshow-items">
                    {product.images.map((item, index) => <li key={index}>
                      <div>
                        <Image image={item.hash} width={680} height={680} />
                      </div>
                    </li>)}
                  </ul>
                  <a className="uk-position-center-left uk-position-small uk-slidenav" href="#" uk-slideshow-item="previous">
                    <img className="uk-svg" src="/assets/angle-left.svg" uk-svg="" />
                  </a>
                  <a className="uk-position-center-right uk-position-small uk-slidenav" href="#" uk-slideshow-item="next">
                    <img className="uk-svg" src="/assets/angle-right.svg" uk-svg="" />
                  </a>
                  <ul className="uk-slideshow-nav uk-dotnav uk-flex-center uk-margin"></ul>
                </div>
              </div>
              {product.support && <div className="uk-visible@s"><ArticleShort data={global.support} icon="/assets/phone.svg" product /></div>}
            </div>
            <div>
              <div className="product-info">
                {product.brand && <label>{product.brand.title}</label>}
                <h1>{product.title}</h1>
                <span className="price">
                  {getPrice()} Kč
                </span>
                <label className="available">Skladem</label>
                {!product.Variants.length && <a href="/" className="button" onClick={e => buy(e, product)}>přidat do košíku</a>}
                {!!product.Variants.length && <div className="variant-button-wrap">
                  <div className="select-variant">
                    <button className={`button border-button ${errorBuy && 'uk-form-danger'}`} type="button">{selectValue.name} <img className="uk-svg" src="/assets/angle-down.svg" uk-svg="" /></button>
                    <ul id="variant-select" className="uk-dropdown" uk-dropdown="mode: click; offset: 8; pos: bottom-justify;">
                      {product.Variants.map((item, index) => <li key={index}><a href="/" onClick={e => selectVariant(e, item, index)}><span>{item.nazev}</span><span>{item.price} Kč</span></a></li>)}
                    </ul>
                  </div>
                  <a href="/" className="button" onClick={e => buy(e, product)}>přidat do košíku</a>
                </div>}
                {product.support && <div className="uk-hidden@s"><ArticleShort data={global.support} icon="/assets/phone.svg" product /></div>}
                <ul>
                  {product.brand && <li>Značka: <a href={`/c/${product.brand.slug}`}>{product.brand.title}</a></li>}
                  <li>Kód výrobku: {product.code}</li>
                </ul>
                {product.content && <Content data={product.content} />}
              </div>
            </div>
          </div>
          <hr />
        </div>
      </section>
      {!!product.relateds?.length && <section className="related-products">
        <div className="uk-container uk-container-large">
          <h2 className="big-head uk-margin-large-bottom">
            <span style={{paddingLeft: '11vw'}}>podobné produkty,</span>
            <span style={{paddingLeft: '14vw'}}>které by vás mohli zajímat</span>
          </h2>
          <div className="uk-grid uk-child-width-1-2 uk-child-width-1-4@s" uk-grid="">
            {product.relateds.map((item, index) => <div key={index}><Card data={item} /></div>)}
          </div>
          <div className="button-more-wrap">
            <a href={`/c/${product.category[0]?.slug || product.brand?.slug}`} className="button">dalši {product.category[0]?.title || product.brand?.title}</a>
          </div>
        </div>
      </section>}

      <BigBanner data={global.banner}/>

    </Page>
  )
}


export default Product
