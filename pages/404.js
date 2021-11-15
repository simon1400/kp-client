// import {useState, useEffect} from 'react'
import {useQuery} from '@apollo/client'
import notFoundQuery from '../queries/notFound'
import Page from '../layout/page'
import PageTop from '../components/PageTop'
import ReactMarkdown from 'react-markdown'

const NotFound = () => {

  const { loading, error, data } = useQuery(notFoundQuery);

  if(loading) {
    return ''
  }

  return(
    <Page
      bigHeader 
      globalData={data.global}
      nav={data.navigation}>
      <PageTop
        small
        head={<h1 className="big-head">
                <span>{data.global.nf_title}</span>
              </h1>}
      />
      <section className="sec-big">
        <div className="uk-container uk-container-small">
          <div>
            <ReactMarkdown>{data.global.nf_content}</ReactMarkdown>
          </div>
        </div>
      </section>
    </Page>
  )

}


export default NotFound
