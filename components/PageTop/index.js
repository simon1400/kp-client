const PageTop = ({
  big = false,
  head,
  img = false,
  center = false
}) => {
  return (
    <section className={`page-top${big ? ' big-top' : ''}${!img ? ' yellow-top' : ''}`} style={{backgroundImage: `url(${img})`}}>
      <div className={`uk-container ${center && 'uk-flex uk-flex-middle uk-height-1-1'}`}>
        {head}
      </div>
      {big && <a href="/">prohlédnout produkty</a>}
    </section>
  )
}

export default PageTop
