import Link from 'next/link'

const PageTop = ({
  big = false,
  head,
  img = false,
  center = false,
  textButton = false,
  linkButton = false,
}) => {
  return (
    <section className={`page-top${big ? ' big-top' : ''}${!img ? ' yellow-top' : ''}`} style={{backgroundImage: `url(${img})`}}>
      <div className={`${!big ? 'uk-container ' : ''} ${center && 'uk-flex uk-flex-middle uk-height-1-1'}`}>
        {head}
      </div>
      {big && <Link href={linkButton}><a>{textButton}</a></Link>}
    </section>
  )
}

export default PageTop
