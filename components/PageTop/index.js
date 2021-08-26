const PageTop = ({
  big = false,
  head,
  img = false
}) => {
  return (
    <section className={`page-top${big ? ' big-top' : ''}${!img ? ' yellow-top' : ''}`} style={{backgroundImage: `url(${img})`}}>
      <div className="uk-container">
        {head}
      </div>
      {big && <a href="/">prohlédnout produkty</a>}
    </section>
  )
}

export default PageTop
