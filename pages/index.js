import {useEffect, useState} from 'react'
import Page from '../layout/Page'
import homepageQuery from '../queries/homepage'
import { useQuery } from "@apollo/client";
import Head from 'next/head'
import Card from '../components/Card'
import SmallBanner from '../components/SmallBanner'
import PageTop from '../components/PageTop'
import BigBanner from '../components/BigBanner'
// import Image from '../components/Image'
import Image from '../components/Image'
import axios from 'axios';
import ArticleShort from '../components/ArticleShort';
import splitArr from '../function/splitArr';
const APP_API = process.env.APP_API


const Homepage = () => {

  const { loading, error, data } = useQuery(homepageQuery);

  const [h1, setH1] = useState([])
  const [h2, setH2] = useState([])

  // useEffect(() => {
  //   getData()
  // }, [])

  // const getData = async () => {
  //   axios.post('/api/money/exportMoney').then(res => {
  //     console.log(res.data);
  //   })
  // }

  useEffect(() => {
    if(!loading) {
      setH1(data.homepage.title.split(' '))
      setH2(data.homepage.title.split(' '))
    }
  }, [loading])

  if(loading) {
    return ''
  }

  const h1Split = splitArr(h1, 3)

  return (
    <Page 
      bgImg={data.homepage.image}
      title={data.homepage.meta?.title}
      description={data.homepage.meta?.description}
      bigHeader 
      globalData={data.global} 
      nav={data?.navigation}>
      <PageTop
        big
        center
        head={<h1 className="big-head">
                <span style={{paddingLeft: '5vw'}}><b>{h1Split[0].map(item => `${item} `)}</b></span>
                <span style={{paddingLeft: '22vw'}}>{h1Split[1].map(item => `${item} `)}</span>
                <span style={{paddingLeft: '5vw'}}><b>{h1Split[2].map(item => `${item} `)}</b></span>
              </h1>}
        img={data.homepage.image}
        textButton={data.homepage.Button.text}
        linkButton={data.homepage.Button.link}
      />

      <section className="sec-base">
        <div className="uk-container uk-container-large">
          <div className="uk-grid uk-child-width-1-1 uk-child-width-1-3@m" uk-grid="">
            {data.homepage.articles.map((item, index) => <div key={index}>
              <ArticleShort data={item} />
            </div>)}
          </div>
        </div>
      </section>

      <section className="sec-base">
        <div className="uk-container uk-container-large">
          <h2 className="big-head uk-text-center uk-margin-large-bottom">
            <span style={{paddingLeft: '0'}}>{data.homepage?.subtitle}</span>
          </h2>
          {data.homepage.products.map((item, index) => <div key={index} className={`uk-grid ${index % 2 ? 'uk-flex-row-reverse' : ''}`} uk-grid="" uk-height-match="target: > div > div">
            <div className="uk-width-1-1 uk-width-1-2@s">
              <SmallBanner
                brand={item.brand}
                text={item.text}
                link={item.button} />
            </div>
            {item.products.map((product, indexProd) => <div key={indexProd} className="uk-width-1-2 uk-width-1-4@s"><Card data={product} /></div>)}
          </div>)}
        </div>
      </section>

      <BigBanner data={data.global.banner} />

      <section className="partners-logo">
        <div className="uk-container uk-container-large">
          <div className="uk-slider" uk-slider="autoplay: true">
            <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-4@s uk-child-width-1-6@m uk-grid uk-grid-stack">
              {data.homepage.logo_company.map((item, index) => <li key={index}>
                <a href={`/c/${item.brands.slug}`}>
                  <Image image={item.image.hash} height={100} />
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
