import Link from 'next/link'

const Card = () => {
  return (
    <div>
      <Link href="/product/sfdgsfg">
        <a className="card">
          <div className="card-img">
            <img src="https://www.kralovska-pece.cz/image/cache/catalog/angelo-caroli/angelo-caroli-amore-nero-800x800.jpg" />
          </div>
          <div className="card-content">
            <label>Angelo Caroli</label>
            <h3>Emocionální kolekce - AMORE NERO</h3>
            <span>1 550 Kč</span>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default Card
