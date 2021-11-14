import Page from '../../layout/Page'
import PageTop from '../../components/PageTop'
import { useQuery } from "@apollo/client";
import blogQuery from '../../queries/blog'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'

const APP_API = process.env.APP_API

const Blog = () => {

  const { loading, error, data } = useQuery(blogQuery);

  if(loading) {
    return ''
  }

  let blogs = data.blogs

  return (
    <Page bigHeader globalData={data.global} nav={data.navigation}>
      <PageTop
        small
        head={<h1 className="big-head">
                <span>Blog a <b>novinky</b></span>
              </h1>}
      />

      <section className="sec-big">
        <div className="uk-container uk-container-large">
          {blogs.length && blogs.map((item, index) => <div key={index} className="uk-grid blog-item uk-child-width-1-1 uk-child-width-1-2@s" uk-grid="" uk-height-match="target: > div > div">
            <div>
              <div className="blog-item-img uk-position-relative">
                <Image 
                  src={APP_API+item.image.url} 
                  width="100%" 
                  height="100%" 
                  layout="responsive" 
                  objectFit="contain" 
                  objectPosition="left top" />
              </div>
            </div>
            <div>
              <div className="blog-item-info">
                <h2>{item.title}</h2>
                <div>
                  <ReactMarkdown>{item.content}</ReactMarkdown>
                </div>
                <a className="bare-button" href={`/blog/${item.slug}`}>celý článek <img className="uk-svg" src="/assets/angle-right.svg" uk-svg="" /></a>
              </div>
            </div>
          </div>)}
        </div>
      </section>
    </Page>
  )
}

export default Blog
