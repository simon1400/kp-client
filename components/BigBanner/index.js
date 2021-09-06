const BigBanner = () => {
  return (
    <section className="sec-base">
      <div className="uk-container uk-container-large">
        <div className="big-banner" style={{backgroundImage: 'url(/assets/banner.jpg)'}}>
          <div className="big-banner-info">
            <h2 className="big-head">
              <span style={{paddingLeft: '13vw'}}>Navštivte náš salón krásy</span>
              <span style={{paddingLeft: '0'}}>v jednidečném prostředí</span>
              <span style={{paddingLeft: '4vw'}}>hotelu <b>MAXIMUS RESORT</b></span>
            </h2>
            <a className="button" href="/">více o nás</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BigBanner
