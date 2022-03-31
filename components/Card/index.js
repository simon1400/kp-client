// import Link from 'next/link'
import getMinPrice from '../../function/getMinPrice'
import Image from '../Image'
const APP_API = process.env.APP_API

const Card = ({data}) => {

  const getPrice = () => {
    if(data.Variants?.length > 0) {
      return 'od ' + getMinPrice(data.Variants).price.toLocaleString()
    }else{
      return data.price.toLocaleString()
    }
  }

  return (
    <div>
      <a href={`/p/${data.slug}`} className="card">
        <div className="card-img">
          <Image image={data.images[0].hash} width={320} height={320} />
        </div>
        <div className="card-content">
          {data.brand && <label>{data.brand.title}</label>}
          <h3>{data.title}</h3>
          <span>{getPrice()} Kč</span>
        </div>
      </a>
    </div>
  )
}

export default Card
