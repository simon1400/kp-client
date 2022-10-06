import Page from '../../layout/Page'
import PageTop from '../../components/PageTop'
import Filter from '../../layout/Filter'
import categoryQuery from '../../queries/category'
import {useRouter} from 'next/router'
import Content from '../../components/Content'
import splitArr from '../../function/splitArr'
import {InstantSearch, Configure} from 'react-instantsearch-hooks-web'
import searchClient from "../../lib/meilisearch.js";
import CatalogList from '../../components/CatalogList'
import CatalogFilterLabels from '../../components/CatalogFilterLabels'
import SubCategoryMenu from '../../components/SubCategoryMenu'
import { client } from '../../lib/api'
import Head from 'next/head'

const DOMAIN = process.env.APP_DOMAIN;

export async function getServerSideProps(ctx) {

  const { data } = await client.query({
    query: categoryQuery,
    variables: {
      slug: ctx.query.category
    }
  });

  let categoryFetch = {}
  let category
  if(data?.categories.data.length) {
    category = data.categories.data[0]
    categoryFetch = data.categories.data[0]
  }else if(data?.brands.data.length) {
    category = data.brands.data[0]
    categoryFetch = data.brands.data[0]
  }else{
    return {
      notFound: true
    }
  }

  let title = [], subTitle = []

  if(categoryFetch?.attributes?.title) title = categoryFetch?.attributes?.title.split(' ')
  if(categoryFetch?.attributes?.add_title) subTitle = categoryFetch?.attributes?.add_title.split(' ')

  const h1Split = splitArr(title, 2)
  const subTitleSplit = splitArr(subTitle, 3)

  const navigation = data.navigation.data.attributes
  const global = data.global.data.attributes

  return {
    props: { 
      h1Split,
      subTitleSplit,
      navigation,
      global,
      meta: {
        ...category.attributes.meta,
        image: category.attributes?.image?.data?.attributes || null
      },
      category: category.attributes,
      bigHeader: true,
      bgImg: category.attributes.image.data?.attributes || null
    }
  }
}

const Category = ({
  h1Split,
  subTitleSplit,
  category
}) => {

  const router = useRouter()

  return (
    <InstantSearch 
      indexName="produkt"
      searchClient={searchClient}
      routing={true}
    >
      <Page>
        <PageTop
          small
          img={category.image.data?.attributes}
          head={<h1 className="big-head">
                  <span><b>{h1Split[0].map(item => `${item} `)}</b> {h1Split[1].map(item => `${item} `)}</span>
                </h1>}
          />

        <Head>
          <link rel="alternate" hrefLang="cs" href={`${DOMAIN}/cs${router.asPath}`} />
        </Head>

          {!!category?.sub?.data?.length && <SubCategoryMenu sub={category.sub.data}/>}

          <CatalogFilterLabels />

          <Configure 
            query={router.query.category+'sgdfhgdhjfghjjfhkjfhdfskjhglks;fjdgdsfoilgjosfigj'}
            hitsPerPage={20}
          />
          
          <CatalogList />
          
          <section className="additional-sec">
            <div className="uk-container">
              {!!subTitleSplit?.length && <h2 className="big-head">
                <span style={{paddingLeft: '14vw'}}>{subTitleSplit[0].map(item => `${item} `)}</span>
                <span style={{paddingLeft: '0px'}}>{subTitleSplit[1].map(item => `${item} `)}</span>
                <span style={{paddingLeft: '7vw'}}>{subTitleSplit[2].map(item => `${item} `)}</span>
              </h2>}
              <div>
                {category.content && <Content data={category.content} />}
              </div>
            </div>
          </section>

          <Filter
            parameters={category?.parameters.data || []}
            category={category?.filterCategories.data || []}
          />

      </Page>
    </InstantSearch>
  )
}

export default Category
