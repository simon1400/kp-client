import {useEffect, useState} from 'react'
import Link from 'next/link'
import Image from '../Image'
import splitArr from '../../function/splitArr'

const BigBanner = ({data}) => {

  const [title, setTitle] = useState([])

  useEffect(() => {
    if(data.title){
      let newTitile = data.title.split(' ')
      setTitle(splitArr(newTitile, 3))
    }
  }, [data.title])

  if(!title.length) {
    return null
  }

  return (
    <section className="sec-base">
      <div className="uk-container uk-container-large">
        <div className="big-banner">
          <div className="img-wrap-bg">
            <Image image={data.image.hash} width={1400} height={770} />
          </div>
          <div className="big-banner-info">
            <h2 className="big-head">
              <span style={{paddingLeft: '13vw'}}>{title[0].map(item => `${item} `)}</span>
              <span style={{paddingLeft: '0'}}>{title[1].map(item => `${item} `)}</span>
              <span style={{paddingLeft: '4vw'}}><b>{title[2].map(item => `${item} `)}</b></span>
            </h2>
            <Link href={data.button.link}><a className="button">{data.button.text}</a></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BigBanner
