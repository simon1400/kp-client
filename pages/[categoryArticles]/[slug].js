import Page from '../../layout/Page'
import PageTop from '../../components/PageTop'
import blogItemQuery from '../../queries/blogItem'
import Image from '../../components/Image'
import Content from '../../components/Content';
import { AxiosSTRAPI } from '../../restClient';
import splitArr from '../../function/splitArr';
import { client } from '../../lib/api';
import SubCategoryMenu from '../../components/SubCategoryMenu'
import Head from 'next/head';
import { useRouter } from 'next/router';

const DOMAIN = process.env.APP_DOMAIN;

export async function getServerSideProps(ctx) {

  const resCat = await AxiosSTRAPI.get(`/api/category-articles?filters[slug][$eq]=${ctx.query.categoryArticles}`)

  const { data } = await client.query({
    query: blogItemQuery,
    variables: {
      slug: ctx.query.slug
    }
  });

  if(!resCat.data.data.length || !data.articles.data.length) {
    return {
      notFound: true
    }
  }

  let blog = data.articles.data[0].attributes

  let title = blog?.title.split(' ') || []
  let subTitle = []
  if(blog?.add_title) {
    subTitle = blog?.add_title.split(' ') || []
  }
  

  title = splitArr(title, 2)
  subTitle = splitArr(subTitle, 2)

  const global = data.global.data.attributes
  const navigation = data.navigation.data.attributes

  return {
    props: {
      blog,
      title,
      subTitle,
      global,
      navigation,
      meta: blog.meta,
      bigHeader: true
    }
  }
}

const BlogFull = ({
  blog,
  title,
  subTitle,
}) => {  

  const router = useRouter()

  return (
    <Page>
      <PageTop
        small
        head={<h1 className="big-head">
                <span>{title[0].map(item => `${item} `)} <b>{title[1].map(item => `${item} `)}</b></span>
              </h1>}
      />

      <Head>
        <link rel="alternate" hrefLang="cs" href={`${DOMAIN}/cs${router.asPath}`} />
      </Head>

      <section className={`sec-big ${!!blog?.child?.data?.length ? "uk-padding-remove-top" : ""}`}>
        {!!blog?.child?.data?.length && <SubCategoryMenu small sub={blog.child.data}/>}
        <div className="uk-container uk-container-small">
          <div>
            {blog.iframe && <div dangerouslySetInnerHTML={{__html: blog.iframe}} />}
            <Content data={blog.content}/>
            {blog.image.data && <Image image={blog.image.data.attributes} width={900} />}
          </div>
          {!!subTitle.length && <h2 className="big-head uk-text-center uk-margin-large-top uk-margin-large-bottom">
            <span style={{paddingLeft: '0px'}}>{subTitle[0].map(item => `${item} `)}</span>
            <span style={{paddingLeft: '6vw'}}>{subTitle?.[1].map(item => `${item} `)}</span>
          </h2>}
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
