import Link from 'next/link'
// import Image from '../Image'
import Image from 'next/image'
const APP_API = process.env.APP_API

const Card = ({data}) => {

  return (
    <div>
      <a href={`/produkt/${data.slug}`} className="card">
        <div className="card-img">
          <Image src={APP_API + data.images[0].url} width="320" height="320" />
        </div>
        <div className="card-content">
          <label>{data.brand.title}</label>
          <h3>{data.title}</h3>
          <span>{data.price} Kč</span>
        </div>
      </a>
    </div>
  )
}

export default Card
