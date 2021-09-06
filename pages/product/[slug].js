import { useRouter } from 'next/router'
// import ErrorPage from 'next/error'
import Page from '../../layout/Page'
import Card from '../../components/Card'
import BigBanner from '../../components/BigBanner'
// import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import Head from 'next/head'

const Product = () => {
  return (
    <Page>
      <section className="product-base">
        <div className="uk-container uk-container-large">
          <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@s">
            <div>
              <div className="product-slider">
                <a className="bare-button button-reverse uk-visible@s" href="/"><img className="uk-svg" src="/assets/angle-left.svg" uk-svg="" />zpět na produkty</a>
                <div className="uk-slideshow" uk-slideshow="ratio: 1:1">
                  <ul className="uk-slideshow-items">
                    <li>
                      <img className="uk-img" src="https://www.kralovska-pece.cz/image/cache/catalog/angelo-caroli/angelo-caroli-amore-nero-800x800.jpg" uk-img="" />
                    </li>
                    <li>
                      <img className="uk-img" src="https://www.kralovska-pece.cz/image/cache/catalog/angelo-caroli/angelo-caroli-amore-nero-800x800.jpg" uk-img="" />
                    </li>
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
            </div>
            <div>
              <div className="product-info">
                <label>Angelo Caroli</label>
                <h1>Emocionální kolekce - TUBEROSA NERA</h1>
                <span className="price">1 550 Kč</span>
                <label className="available">Skladem</label>
                {/*<a href="/" className="button">přidat do košíku</a>*/}
                <div className="variant-button-wrap">
                  <div className="select-variant">
                    <button className="button border-button" type="button">vybrat variantu <img className="uk-svg" src="/assets/angle-down.svg" uk-svg="" /></button>
                    <ul className="uk-dropdown" uk-dropdown="mode: click; offset: 8; pos: bottom-justify;">
                      <li><a href="/"><span>100 ml</span><span>550 Kč</span></a></li>
                      <li><a href="/"><span>200 ml</span><span>1 550 Kč</span></a></li>
                      <li><a href="/"><span>400 ml</span><span>50 Kč</span></a></li>
                    </ul>
                  </div>
                  <a href="/" className="button">přidat do košíku</a>
                </div>
                <ul>
                  <li>Značka: <a href="">Angelo Caroli</a></li>
                  <li>Kód výrobku: 2148</li>
                </ul>
                <div className="description">
                  <p>S touto vůní se vrací ateliér Cologne v roce 2014 ke svým počátkům. Vývoj vysoce kvalitní Eau de Colognes je výhradně připisován tomuto ateliéru, přičemž koncentrace Cologne Absolue je kolem 18 %. Kolekce - Originály domu - se skládá ze svěžích vůní, které jsou interpretovány nejrůznějšími způsoby. Cédrat Enivrant inspiroval Cocktail French 75 , směs šampaňského a džinu, kterou udělal Furore již v roce 1915 a v nyní se znovu dostává tato vůně do obliby v New Yorku. Vůně začíná temperamentně jako French 75, začíná cedratem, limetkou a bergamotem, je podpořena mátou a bazalkou, aby se v závěru spojila v balzamikovém Drydownu z fazolí tonka, pryskyřice elemi a vetiveru - jako krásný letní večer, kdy člověk nechce, aby skončil...</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </section>
      <section className="related-products">
        <div className="uk-container uk-container-large">
          <h2 className="big-head uk-margin-large-bottom">
            <span style={{paddingLeft: '11vw'}}>podobné produkty,</span>
            <span style={{paddingLeft: '27vw'}}>které by vás mohli zajímat</span>
          </h2>
          <div className="uk-grid uk-child-width-1-2 uk-child-width-1-4@s" uk-grid="">
            <div>
              <Card />
            </div>
            <div>
              <Card />
            </div>
            <div>
              <Card />
            </div>
            <div>
              <Card />
            </div>
          </div>
          <div className="button-more-wrap">
            <a href="/" className="button">zobrazit kolekci</a>
          </div>
        </div>
      </section>

      <BigBanner />

    </Page>
  )
}


export default Product
