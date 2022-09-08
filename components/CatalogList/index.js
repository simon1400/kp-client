import { useInfiniteHits } from "react-instantsearch-hooks-web";
import Card from "../Card";

const CatalogList = (props) => {

  const { hits, isLastPage, showMore } = useInfiniteHits(props);

  const handleNext = (e) => {
    e.preventDefault()
    showMore()
  }

  return (
    <section className="catalog-list">
      <div className="uk-container uk-container-large">
        <div className="uk-grid uk-child-width-1-2 uk-child-width-1-4@s" uk-grid="">
          {!!hits?.length && hits.map((item, index) => <div key={index}>
            <Card data={item} catalog />
          </div>)}
        </div>
        {!isLastPage && <div className="button-more-wrap">
          <a href="/" onClick={e => handleNext(e)} className="button">načíst další</a>
        </div>}
        <hr />
      </div>
    </section>
  )
}

export default CatalogList