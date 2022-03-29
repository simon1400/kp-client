import {useEffect, useState} from 'react'
import Link from 'next/link'
import Image from '../Image'

const BigBanner = ({data}) => {

  const [title, setTitle] = useState([])

  useEffect(() => {
    if(data.title){
      setTitle(data.title.split(' '))
    }
  }, [data.title])

  return (
    <section className="sec-base">
      <div className="uk-container uk-container-large">
        <div className="big-banner">
          <div className="img-wrap-bg">
            {/* <Image src={`${APP_API}${data.image.url}`} layout="fill" /> */}
            {/* <img src={data.image.url} /> */}
            <Image image={data.image.hash} width={1400} height={770} />
          </div>
          <div className="big-banner-info">
            <h2 className="big-head">
              <span style={{paddingLeft: '13vw'}}>{title[0]} {title[1]} {title[2]} {title[3]}</span>
              <span style={{paddingLeft: '0'}}>{title[4]} {title[5]} {title[6]}</span>
              <span style={{paddingLeft: '4vw'}}>{title[7]} <b>{title[8]} {title[9]}</b></span>
            </h2>
            <Link href={data.button.link}><a className="button">{data.button.text}</a></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BigBanner
