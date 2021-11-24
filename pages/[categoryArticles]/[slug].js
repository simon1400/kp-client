import Page from '../../layout/Page'
import PageTop from '../../components/PageTop'
import { useQuery } from "@apollo/client";
import blogItemQuery from '../../queries/blogItem'
import Image from '../../components/Image'
import {useRouter} from 'next/router'
import Content from '../../components/Content';

const BlogFull = () => {

  const router = useRouter()

  const { loading, error, data } = useQuery(blogItemQuery, {
    variables: {slug: router.query.slug}
  });

  if(loading) {
    return ''
  }

  if(!data.blogs.length){
    router.push('/404')
    return ''
  }

  let blog = data.blogs[0]

  let title = blog?.title.split(' ')
  let subTitle = blog?.add_title.split(' ')

  

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
                <span>{title[0]} <b>{title[1]} {title[2]}</b></span>
              </h1>}
      />
      <section className="sec-big">
        <div className="uk-container uk-container-small">
          <div>
            {blog.iframe && <div dangerouslySetInnerHTML={{__html: blog.iframe}} />}
            <Content data={blog.content}/>
            {blog.image && <Image image={blog.image} />}
          </div>
          <h2 className="big-head uk-text-center uk-margin-large-top uk-margin-large-bottom">
            <span style={{paddingLeft: '0px'}}>{subTitle[0]} {subTitle[1]} {subTitle[2]} {subTitle[3]}</span>
            <span style={{paddingLeft: '6vw'}}>{subTitle[4]} {subTitle[5]} {subTitle[6]} {subTitle[7]}</span>
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
