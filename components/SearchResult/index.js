import {useState} from 'react'
import Link from 'next/link'
import Image from '../Image'
import { connectHits } from 'react-instantsearch-dom'

const SearchResult = ({
  hits, 
  square = 80, 
  title
}) => {

  // const [slug, setSlug] = useState('')

  const getSlug = (data) => {
    if(title === 'Produkty') {
      return `/p/${data.slug}`
    }else if(title === 'Kategorie' || title === 'Značky'){
      return `/c/${data.slug}`
    }else if(title === 'Články'){
      return `/blog/${data.slug}`
    }
    return '/'
  }

  if(hits.length) {
    return (
      <div className="result-block">
        <h4>{title}</h4>
        {hits.map((item, index) => <Link key={index} href={getSlug(item)}>
          <a className={`canvas-item`}>
            {!!item.image && <div className="canvas-item-img">
              <Image image={item.image} width={square} height={square} />
            </div>}
            <div className="canvas-item-content">
              <div>
                {!!item.title && <h5>
                  {item.title}
                </h5>}
              </div>
            </div>
          </a>
        </Link>)}
      </div>
    )
  }else{
    return null
  }
  
}

export default connectHits(SearchResult)
