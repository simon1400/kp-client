import Link from 'next/link'
import getMinPrice from '../../function/getMinPrice'
import Image from '../Image'

const Card = ({data, catalog = false}) => {

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
      {!catalog && <Link href={`/p/${data.slug}`}>
        <a className="card">
          {data.images.data[0]?.attributes?.url && <div className="card-img">
            <Image image={data.images.data[0]?.attributes} width={320} height={320} />
          </div>}
          <div className="card-content">
            {data.brand && <label>{data.brand.title}</label>}
            <h3>{data.title}</h3>
            <span>{getPrice()} Kč</span>
          </div>
        </a>
      </Link>}
      {!!catalog && <Link href={`/p/${data.slug}`}>
        <a className="card">
          {data.images && <div className="card-img">
            <Image image={data.images[0]} width={320} height={320} />
          </div>}
          <div className="card-content">
            {data.brand && <label>{data.brand?.title}</label>}
            <h3>{data.title}</h3>
            <span>{getPrice()} Kč</span>
          </div>
        </a>
      </Link>}
    </div>
  )
}

export default Card
