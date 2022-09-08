import Page from '../layout/Page'
import homepageQuery from '../queries/homepage'
import Card from '../components/Card'
import SmallBanner from '../components/SmallBanner'
import PageTop from '../components/PageTop'
import BigBanner from '../components/BigBanner'
import Image from '../components/Image'
import ArticleShort from '../components/ArticleShort';
import splitArr from '../function/splitArr';
import { client } from '../lib/api'
import Head from 'next/head'

const DOMAIN = process.env.APP_DOMAIN;

export async function getServerSideProps() {

  const { data } = await client.query({query: homepageQuery});

  const homepage = data.homepage.data.attributes
  const navigation = data.navigation.data.attributes
  const global = data.global.data.attributes
  const h1 = homepage.title.split(' ')
  // setH2(data.homepage.title.split(' '))

  const h1Split = splitArr(h1, 3)

  return {
    props: { 
      global: global,
      navigation: navigation,
      data: homepage,
      h1Split,
      meta: {
        ...homepage.meta,
        image: homepage.image.data.attributes
      },
      bigHeader: true,
      bgImg: homepage.image.data.attributes
    }
  }
}

const Homepage = ({
  data,
  global,
  h1Split
}) => {

  return (
    <Page>
      <PageTop
        big
        center
        head={<h1 className="big-head">
                <span style={{paddingLeft: '5vw'}}><b>{h1Split[0].map(item => `${item} `)}</b></span>
                <span style={{paddingLeft: '22vw'}}>{h1Split[1].map(item => `${item} `)}</span>
                <span style={{paddingLeft: '5vw'}}><b>{h1Split[2].map(item => `${item} `)}</b></span>
              </h1>}
        img={data.image.data.attributes}
        textButton={data.Button.text}
        linkButton={data.Button.link}
      />

      <Head>
        <link rel="alternate" hrefLang="cs" href={DOMAIN} />
      </Head>

      <section className="sec-base">
        <div className="uk-container uk-container-large">
          <div className="uk-grid uk-child-width-1-1 uk-child-width-1-3@m uk-grid-stack" uk-grid="">
            {data.articles.map((item, index) => <div key={index}>
              <ArticleShort data={item} />
            </div>)}
          </div>
        </div>
      </section>

      <section className="sec-base">
        <div className="uk-container uk-container-large">
          <h2 className="big-head uk-text-center uk-margin-large-bottom">
            <span style={{paddingLeft: '0'}}>{data?.subtitle}</span>
          </h2>
          {data.products.map((item, index) => <div key={index} className={`uk-grid uk-grid-stack ${index % 2 ? 'uk-flex-row-reverse' : ''}`} uk-grid="" uk-height-match="target: > div > div">
            <div className="uk-width-1-1 uk-width-1-2@s">
              <SmallBanner
                brand={item.brand}
                text={item.text}
                link={item.button} />
            </div>
            {item.products.data.map((product, indexProd) => <div key={indexProd} className="uk-width-1-2 uk-width-1-4@s"><Card data={product.attributes} /></div>)}
          </div>)}
        </div>
      </section>

      <BigBanner data={global.banner} />

      <section className="partners-logo">
        <div className="uk-container uk-container-large">
          <div className="uk-slider" uk-slider="autoplay: true">
            <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-4@s uk-child-width-1-6@m uk-grid uk-grid-stack">
              {data.logo_company.map((item, index) => <li key={index}>
                <a href={`/c/${item.brands.slug}`}>
                  <Image image={item.image.data?.attributes} height={100} />
                </a>
              </li>)}
            </ul>
          </div>
        </div>
      </section>
    </Page>
  )
}


export default Homepage
