import Link from 'next/link'
import Image from '../Image'

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
        <Image image={img} width={2560} />
      </div>}
      <div className={`${!big ? 'uk-container ' : ''} ${center && 'uk-flex uk-flex-middle uk-height-1-1'}`}>
        {head}
      </div>
      {big && <Link href={linkButton}><a>{textButton}</a></Link>}
    </section>
  )
}

export default PageTop
