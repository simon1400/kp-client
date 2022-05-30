// import Link from 'next/link'
import getMinPrice from '../../function/getMinPrice'
import Image from '../Image'

const Card = ({data, catalog = false}) => {

  console.log(data);

  const getPrice = () => {
    if(data.Variants?.length > 0) {
      return 'od ' + getMinPrice(data.Variants).price.toLocaleString()
    }else if(data.variants > 0) {
      return 'od ' + data.price.toLocaleString()
    }else{
      return data.price.toLocaleString()
    }
  }

  return (
    <div>
      {!catalog && <a href={`/p/${data.slug}`} className="card">
        {data.images[0]?.hash && <div className="card-img">
          <Image image={data.images[0].hash} width={320} height={320} />
        </div>}
        <div className="card-content">
          {data.brand && <label>{data.brand.title}</label>}
          <h3>{data.title}</h3>
          <span>{getPrice()} Kč</span>
        </div>
      </a>}
      {!!catalog && <a href={`/p/${data.slug}`} className="card">
        {data.image && <div className="card-img">
          <Image image={data.image} width={320} height={320} />
        </div>}
        <div className="card-content">
          {data.brand && <label>{data.brand}</label>}
          <h3>{data.title}</h3>
          <span>{getPrice()} Kč</span>
        </div>
      </a>}
    </div>
  )
}

export default Card
