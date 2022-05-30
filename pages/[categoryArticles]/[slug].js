import Page from '../../layout/Page'
import PageTop from '../../components/PageTop'
import { useQuery } from "@apollo/client";
import blogItemQuery from '../../queries/blogItem'
import Image from '../../components/Image'
import {useRouter} from 'next/router'
import Content from '../../components/Content';
import { AxiosSTRAPI } from '../../restClient';
import splitArr from '../../function/splitArr';


export async function getServerSideProps(context) {

  const resCat = await AxiosSTRAPI.get(`/category-articles?slug=${context.query.categoryArticles}`)
  const resBlog = await AxiosSTRAPI.get(`/blogs?slug=${context.query.slug}`)

  if(!resCat.data.length || !resBlog.data.length) {
    return {
      notFound: true
    }
  }

  return {
    props: {}
  }
}

const BlogFull = () => {

  const router = useRouter()

  const { loading, error, data } = useQuery(blogItemQuery, {
    variables: {slug: router.query.slug}
  });

  if(loading) {
    return ''
  }

  let blog = data.blogs[0]

  let title = blog?.title.split(' ') || ""
  let subTitle = blog?.add_title.split(' ') || ""

  title = title.length ? splitArr(title, 2) : ""
  subTitle = subTitle.length ? splitArr(subTitle, 2) : ""

  return (
    <Page
      title={blog.meta?.title}
      description={blog.meta?.description}
      bigHeader 
      globalData={data.global} 
      nav={data.navigation}>
      <PageTop
        small
        head={<h1 className="big-head">
                <span>{title[0].map(item => `${item} `)} <b>{title[1].map(item => `${item} `)}</b></span>
              </h1>}
      />
      <section className="sec-big">
        <div className="uk-container uk-container-small">
          <div>
            {blog.iframe && <div dangerouslySetInnerHTML={{__html: blog.iframe}} />}
            <Content data={blog.content}/>
            {blog.image && <Image image={blog.image.hash} width={900} />}
          </div>
          <h2 className="big-head uk-text-center uk-margin-large-top uk-margin-large-bottom">
            <span style={{paddingLeft: '0px'}}>{subTitle[0].map(item => `${item} `)}</span>
            <span style={{paddingLeft: '6vw'}}>{subTitle[1].map(item => `${item} `)}</span>
          </h2>
          {blog.add_content && <div>
            <Content data={blog.add_content}/>
          </div>}
          {blog.cta && <div className="button-more-wrap">
            {blog.cta.link && blog.cta.text && <a href={blog.cta.link} className="button">{blog.cta.text}</a>}
          </div>}
        </div>
      </section>
    </Page>
  )
}

export default BlogFull
