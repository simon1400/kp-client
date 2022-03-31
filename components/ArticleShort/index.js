const ArticleShort = ({
  data, 
  icon = false, 
  product = false
}) => {

  return(
    <div className={`article-short${product ? " product-art" : ""}`}>
      <h3>{!!icon && <img src={icon} uk-svg="" />} {data.title}</h3>
      <p>{data.text}</p>
      <a className="bare-button" href={`/${data.article.category[0].slug}/${data.article.slug}`}>
        více informací 
        <img className="uk-svg" src="/assets/angle-right.svg" uk-svg="" />
      </a>
    </div>
  )
}

export default ArticleShort