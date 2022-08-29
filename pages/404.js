// import {useState, useEffect} from 'react'
import {useQuery} from '@apollo/client'
import notFoundQuery from '../queries/notFound'
import Page from '../layout/Page'
import PageTop from '../components/PageTop'
import Content from '../components/Content'

const NotFound = () => {

  const { loading, error, data } = useQuery(notFoundQuery);

  if(loading) {
    return ''
  }

  return(
    <Page
      bigHeader 
      globalData={data.global.data.attributes}
      nav={data.navigation.data.attributes}>
      <PageTop
        small
        head={<h1 className="big-head">
                <span>{data.global.data.attributes.nf_title}</span>
              </h1>}
      />
      <section className="sec-big">
        <div className="uk-container uk-container-small">
          <div>
            <Content data={data.global.data.attributes.nf_content}/>
          </div>
        </div>
      </section>
    </Page>
  )

}


export default NotFound
