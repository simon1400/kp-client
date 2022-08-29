import Page from '../../layout/Page'
import PageTop from '../../components/PageTop'
import articlesCategory from '../../queries/articlesCategory'
import Image from '../../components/Image'
import { client } from '../../lib/api';
import splitArr from '../../function/splitArr';

export async function getServerSideProps(ctx) {

  const { data } = await client.query({
    query: articlesCategory,
    variables: {
      slug: ctx.query.categoryArticles
    }
  });

  if(!data?.categoryArticles.data?.length) {
    return {
      notFound: true
    }
  }

  const category = data?.categoryArticles.data[0].attributes
  const meta = data?.categoryArticles.data[0].attributes.meta
  const global = data.global.data.attributes
  const navigation = data.navigation.data.attributes

  return {
    props: { 
      navigation,
      category,
      meta,
      global,
      bigHeader: true
    }
  }
}

const Blog = ({
  category
}) => {

  const h1 = category.title.split(' ')
  const h1Split = splitArr(h1, 2)

  return (
    <Page>
      <PageTop
        small
        head={<h1 className="big-head">
                {category.title && <span>
                  {h1Split[0].map(item => `${item} `)}
                  <b>{h1Split[1].map(item => `${item} `)}</b>
                </span>}
              </h1>}
      />

      <section className="sec-big">
        <div className="uk-container uk-container-large">
          {category.articles.data.length && category.articles.data.map((item, index) => <div key={index} className="uk-grid blog-item uk-child-width-1-1 uk-child-width-1-2@s" uk-grid="" uk-height-match="target: > div > div">
            <div>
              <div className="blog-item-img uk-position-relative">
                {item.attributes.image.data && <Image image={item.attributes.image.data.attributes} width={680} />}
              </div>
            </div>
            <div>
              <div className="blog-item-info">
                {item.attributes.title && <h2>{item.attributes.title}</h2>}
                {item.attributes.content && <p>{item.attributes.content.replace(/<[^>]+>/g, ' ').substr(0, 440)}</p>}
                {item.attributes.slug && <a className="bare-button" href={`/blog/${item.attributes.slug}`}>celý článek <img className="uk-svg" src="/assets/angle-right.svg" uk-svg="" /></a>}
              </div>
            </div>
          </div>)}
        </div>
      </section>
    </Page>
  )
}

export default Blog
