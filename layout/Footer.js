const Footer = () => {
  return (
    <footer>
      <div className="footer-top">
        <div className="uk-container uk-container-large">
          <h2 className="big-head">
            <span style={{paddingLeft: '0px'}}><b>Královská Péče—</b></span>
            <span style={{paddingLeft: '100px'}}>kvalita, příběh a energie</span>
          </h2>
          <div className="uk-grid uk-child-width-1-3" uk-grid="">
            <div className="footer-item">
              <label>Zavolejte nám</label>
              <p><a href="tel:+420702830774">+420 702 830 774</a></p>
            </div>
            <div className="footer-item">
              <label>Napište nám</label>
              <p><a href="mailto:info@kralovska-pece.cz">info@kralovska-pece.cz</a></p>
            </div>
            <div className="footer-item">
              <label>Navštivte nás</label>
              <p>Maximus Resort, Hrázní 327, Brno</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="uk-container uk-container-large">
          <div className="copytight-wrap">
            <div className="copyright">
              <p>Královská péče s.r.o., Hrázní 327/4a, 635 00 Brno-Bystrc, IČO: 03775933, DIČ: CZ 03775933</p>
            </div>
            <div className="tech-links">
              <ul>
                <li><a href="/">Dodaci podmínky</a></li>
                <li><a href="/">Obchodní podmínky</a></li>
                <li><a href="/">Ochrana osobních údajů</a></li>
              </ul>
              <ul className="soc-icon">
                <li><a href="/"><img className="uk-svg" src="/assets/facebook-f.svg" uk-svg="" /></a></li>
                <li><a href="/"><img className="uk-svg" src="/assets/instagram.svg" uk-svg="" /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
