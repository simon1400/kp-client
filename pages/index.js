import Page from '../layout/Page'
import { productsQuery } from '../lib/queries'
import { useQuery } from "@apollo/client";
import Head from 'next/head'
import Card from '../components/Card'
import SmallBanner from '../components/SmallBanner'
import PageTop from '../components/PageTop'
import BigBanner from '../components/BigBanner'

const Homepage = () => {

  const { loading, error, data } = useQuery(productsQuery);

  return (
    <Page bgImg="/assets/homepage.jpg" bigHeader >
      <PageTop
        big
        center
        head={<h1 className="big-head">
                <span style={{paddingLeft: '5vw'}}><b>Královská péče</b> díky</span>
                <span style={{paddingLeft: '22vw'}}>světové kosmetice</span>
                <span style={{paddingLeft: '5vw'}}><b>Linda Meredith</b></span>
              </h1>}
        img="/assets/homepage.jpg"
      />
      <section className="sec-base">
        <div className="uk-container uk-container-large">
          <h2 className="big-head uk-text-center uk-margin-large-bottom">
            <span style={{paddingLeft: '0'}}><b>exluzivni</b> novinky</span>
          </h2>
          <div className="uk-grid" uk-grid="" uk-height-match="target: > div > div">
            <div className="uk-width-1-1 uk-width-1-2@s">
              <SmallBanner />
            </div>
            <div className="uk-width-1-2 uk-width-1-4@s">
              <Card />
            </div>
            <div className="uk-width-1-2 uk-width-1-4@s">
              <Card />
            </div>
            <div className="uk-width-1-2 uk-width-1-4@s">
              <Card />
            </div>
            <div className="uk-width-1-2 uk-width-1-4@s">
              <Card />
            </div>
            <div className="uk-width-1-1 uk-width-1-2@s">
              <SmallBanner />
            </div>
          </div>
        </div>
      </section>

      <BigBanner />

      <section className="partners-logo">
        <div className="uk-container uk-container-large">
          <div className="uk-slider" uk-slider="autoplay: true">
            <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-4@s uk-child-width-1-6@m uk-grid uk-grid-stack">
              <li>
                <a href="/"><img src="/assets/logo-1.jpeg" alt="" /></a>
              </li>
              <li>
                <a href="/"><img src="/assets/logo-2.png" alt="" /></a>
              </li>
              <li>
                <a href="/"><img src="/assets/logo-3.png" alt="" /></a>
              </li>
              <li>
                <a href="/"><img src="/assets/logo-4.jpeg" alt="" /></a>
              </li>
              <li>
                <a href="/"><img src="/assets/logo-5.png" alt="" /></a>
              </li>
              <li>
                <a href="/"><img src="/assets/logo-6.jpeg" alt="" /></a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Page>
  )
}


export default Homepage
