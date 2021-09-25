import Link from 'next/link'

const SmallBanner = ({brand, text, link}) => {
  return (
    <div className="small-banner">
      <div>
        <h3>{brand}</h3>
        <h4>{text}</h4>
        <Link href={link.link}><a className="button">{link.text}</a></Link>
      </div>
    </div>
  )
}

export default SmallBanner
