import Page from '../../layout/Page'
import PageTop from '../../components/PageTop'
import blogItemQuery from '../../queries/blogItem'
import Image from '../../components/Image'
import Content from '../../components/Content';
import { AxiosSTRAPI } from '../../restClient';
import splitArr from '../../function/splitArr';
import { client } from '../../lib/api';

export async function getServerSideProps(ctx) {

  const resCat = await AxiosSTRAPI.get(`/category-articles?slug=${ctx.query.categoryArticles}`)

  const { data } = await client.query({
    query: blogItemQuery,
    variables: {
      slug: ctx.query.slug
    }
  });

  let blog = data.blogs[0]

  let title = blog?.title.split(' ') || []
  let subTitle = blog?.add_title.split(' ') || []

  title = splitArr(title, 2)
  subTitle = splitArr(subTitle, 2)

  if(!resCat.data.length || !data.blogs.length) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      blog,
      title,
      subTitle,
      global: data.global,
      navigation: data.navigation
    }
  }
}

const BlogFull = ({
  blog,
  title,
  subTitle,
  global,
  navigation
}) => {  

  return (
    <Page
      title={blog.meta?.title}
      description={blog.meta?.description}
      bigHeader 
      globalData={global} 
      nav={navigation}>
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
