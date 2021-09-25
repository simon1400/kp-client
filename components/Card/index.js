import Link from 'next/link'
import Image from '../Image'

const Card = ({data}) => {

  return (
    <div>
      <a href={`/product/${data.slug}`} className="card">
        <div className="card-img">
          <Image image={data.images[0]} />
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
