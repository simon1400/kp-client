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
          <div className="uk-grid uk-child-width-1-2">
            <div>
              <div className="product-slider">
                <div className="uk-slideshow" uk-slideshow="ratio: 1:1">
                  <ul className="uk-slideshow-items">
                    <li>
                      <img src="https://www.kralovska-pece.cz/image/cache/catalog/angelo-caroli/angelo-caroli-amore-nero-800x800.jpg" />
                    </li>
                    <li>
                      <img src="https://www.kralovska-pece.cz/image/cache/catalog/angelo-caroli/angelo-caroli-amore-nero-800x800.jpg" />
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
                <a href="/" className="button">přidat do košíku</a>
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
          <h2 className="big-head uk-text-center uk-margin-large-bottom">
            <span style={{paddingLeft: '0px'}}>podobné produkty,</span>
            <span style={{paddingLeft: '300px'}}>které by vás mohli zajímat</span>
          </h2>
          <div className="uk-grid uk-child-width-1-4" uk-grid="">
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
