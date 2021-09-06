const Filter = () => {
  return (
    <div id="offcanvas-filter" className="uk-offcanvas" uk-offcanvas="flip: true; overlay: true;">
      <div className="uk-offcanvas-bar">
        <div className="uk-flex uk-flex-between">
          <div className="canvas-head uk-flex uk-flex-left uk-flex-middle">
            <h3>Filtrovat a třídit</h3>
          </div>
          <button className="uk-offcanvas-close uk-close-large" type="button" uk-close=""></button>
        </div>
        <hr />
        <div className="catalog-filter">
          <ul className="uk-accordion" uk-accordion="multiple: true">
            <li className="uk-open">
              <a className="uk-accordion-title" href="#">značka <img className="uk-svg" src="/assets/angle-down.svg" uk-svg="" /></a>
              <div className="uk-accordion-content">
                <ul>
                  <li>
                    <label>
                      <span>Angelo Caroli</span>
                      <input className="uk-checkbox" type="checkbox" />
                    </label>
                  </li>
                  <li>
                    <label>
                      <span>Und Gretel</span>
                      <input className="uk-checkbox" type="checkbox" />
                    </label>
                  </li>
                  <li>
                    <label>
                      <span>Angelo Caroli</span>
                      <input className="uk-checkbox" type="checkbox" />
                    </label>
                  </li>
                  <li>
                    <label>
                      <span>Und Gretel</span>
                      <input className="uk-checkbox" type="checkbox" />
                    </label>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a className="uk-accordion-title" href="#">pro koho <img className="uk-svg" src="/assets/angle-down.svg" uk-svg="" /></a>
              <div className="uk-accordion-content">
                <ul>
                  <li>
                    <label>
                      <span>Angelo Caroli</span>
                      <input className="uk-checkbox" type="checkbox" />
                    </label>
                  </li>
                  <li>
                    <label>
                      <span>Angelo Caroli</span>
                      <input className="uk-checkbox" type="checkbox" />
                    </label>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a className="uk-accordion-title" href="#">typ vůně <img className="uk-svg" src="/assets/angle-down.svg" uk-svg="" /></a>
              <div className="uk-accordion-content">
                <ul>
                  <li>
                    <label>
                      <span>Angelo Caroli</span>
                      <input className="uk-checkbox" type="checkbox" />
                    </label>
                  </li>
                  <li>
                    <label>
                      <span>Angelo Caroli</span>
                      <input className="uk-checkbox" type="checkbox" />
                    </label>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <a className="uk-accordion-title" href="#">seřadit <img className="uk-svg" src="/assets/angle-down.svg" uk-svg="" /></a>
              <div className="uk-accordion-content">
                <ul>
                  <li>
                    <label>
                      <span>podle doporučení</span>
                      <input className="uk-radio" type="radio" name="sorting" />
                    </label>
                  </li>
                  <li>
                    <label>
                      <span>od nejlevnějšího</span>
                      <input className="uk-radio" type="radio" name="sorting" />
                    </label>
                  </li>
                  <li>
                    <label>
                      <span>od nejdražšího</span>
                      <input className="uk-radio" type="radio" name="sorting" />
                    </label>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>


  )
}

export default Filter
