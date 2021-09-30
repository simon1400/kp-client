import {useEffect, useState} from 'react'
import getMenu from '../function/getMenu'
import Link from 'next/link'
import Image from '../components/Image'

const Footer = ({
  data,
  nav,
  soc
}) => {

  const [title, setTitle] = useState([])
  const [techMenu, setTechMenu] = useState([])
  const [socMenu, setSocMenu] = useState([])

  useEffect(() => {
    if(data?.title_footer) {
      setTitle(data.title_footer.split(' '))
      setTechMenu(getMenu(nav))
      setSocMenu(getMenu(soc))
    }
  }, [data])

  return (
    <footer>
      <div className="footer-top">
        <div className="uk-container uk-container-large">
          <h2 className="big-head">
            <span style={{paddingLeft: '0px'}}><b>{title[0]} {title[1]} {title[2]}</b></span>
            <span style={{paddingLeft: '10vw'}}>{title[3]} {title[4]} {title[5]} {title[6]}</span>
          </h2>
          <div className="uk-grid uk-child-width-1-1 uk-child-width-1-3@s" uk-grid="">
            <div className="footer-item">
              <label>Zavolejte nám</label>
              <p><a href={`tel:${data.phone}`}>{data.phone}</a></p>
            </div>
            <div className="footer-item">
              <label>Napište nám</label>
              <p><a href={`mailto:${data.email}`}>{data.email}</a></p>
            </div>
            <div className="footer-item">
              <label>Navštivte nás</label>
              <p>{data.address}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="uk-container uk-container-large">
          <div className="copytight-wrap">
            <div className="copyright">
              <p>{data.copyright}</p>
            </div>
            <div className="tech-links">
              <ul>
                {techMenu.map((item, index) => <li key={index}><Link href={item.slug}><a>{item.name}</a></Link></li>)}
              </ul>
              {!!socMenu.length && <ul className="soc-icon">
                {socMenu.map((item, index) => <li key={index}><a href="/"><Image image={item.image} svg /></a></li>)}
              </ul>}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
