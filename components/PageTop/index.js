import Link from 'next/link'
import Image from 'next/image'

const APP_API = process.env.APP_API

const PageTop = ({
  big = false,
  head,
  img = false,
  center = false,
  textButton = false,
  linkButton = false,
}) => {
  return (
    <section className={`page-top${big ? ' big-top' : ''}${!img ? ' yellow-top' : ' img-top'}`}>
      {img && <div className="img-wrap-bg">
        <Image src={APP_API+img.url} layout="fill" />
      </div>}
      <div className={`${!big ? 'uk-container ' : ''} ${center && 'uk-flex uk-flex-middle uk-height-1-1'}`}>
        {head}
      </div>
      {big && <Link href={linkButton}><a>{textButton}</a></Link>}
    </section>
  )
}

export default PageTop
