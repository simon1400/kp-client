import Page from '../../layout/Page'
import PageTop from '../../components/PageTop'
import Card from '../../components/Card'

const Category = () => {
  return (
    <Page bigHeader>
      <PageTop
        small
        head={<h1 className="big-head">
                <span><b>dekorativní</b> kosmetika</span>
              </h1>}
      />

      <section>
        <div className="uk-container uk-container-large">
          <div className="catalog-control">
            <ul className="catalog-filter">
              <li>
                <div className="uk-inline">
                  <button className="catalog-control-button" type="button">značka <img className="uk-svg" src="/assets/angle-down.svg" uk-svg="" /></button>
                  <ul uk-dropdown="mode: click">
                    <li><a href="/">značka</a></li>
                    <li><a href="/">značka 222</a></li>
                  </ul>
                </div>
              </li>
              <li>
                <div className="uk-inline">
                  <button className="catalog-control-button" type="button">značka <img className="uk-svg" src="/assets/angle-down.svg" uk-svg="" /></button>
                  <ul uk-dropdown="mode: click">
                    <li><a href="/">značka</a></li>
                    <li><a href="/">značka 222</a></li>
                  </ul>
                </div>
              </li>
            </ul>
            <div className="sorting">
              <div className="uk-inline">
                <button className="catalog-control-button" type="button">doporučujeme <img className="uk-svg" src="/assets/angle-down.svg" uk-svg="" /></button>
                <ul uk-dropdown="mode: click">
                  <li><a href="/">doporučujeme</a></li>
                  <li><a href="/">doporučujeme 222</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="catalog-list">
        <div className="uk-container uk-container-large">
          <div className="uk-grid uk-child-width-1-4" uk-grid="">
            <div><Card /></div>
            <div><Card /></div>
            <div><Card /></div>
            <div><Card /></div>
            <div><Card /></div>
            <div><Card /></div>
            <div><Card /></div>
            <div><Card /></div>
          </div>
          <div className="button-more-wrap">
            <a href="/" className="button">načíst další</a>
          </div>
          <hr />
        </div>
      </section>

      <section className="additional-sec">
        <div className="uk-container">
          <h2 className="big-head">
            <span style={{paddingLeft: '200px'}}>Dekorativní kosmetika Und Gretel</span>
            <span style={{paddingLeft: '0px'}}>dokazuje, že přírodní kosmetika</span>
            <span style={{paddingLeft: '100px'}}>nemusí být o kompromisech.</span>
          </h2>
          <div>
            <p>Dlouhou dobu jsme na Královské péči hledali dekorativní kosmetiku, která by svými kvalitami spojovala dva světy. Špičkové přírodní složení bez zatěžujících látek a skvělé vlastnosti, textury, barvy, výdrž. Přírodní kosmetika nám tyto kvality nenabízela a běžná dekorativní kosmetika byla plná zatěžujících látek, na které naše pleti ihned reagovaly, povadaly a mluvily k nám nespokojenými vráskami. Objevily jsme pro sebe a pro Vás Und Gretel, unikátní berlínskou značku, která splňuje vše. Zdá se to až jako zázrak. Posuďte sami. Zveme Vás do světa bez kompromisů.</p>

            <p>Všechny produkty jsou ve kvalitě profesionálního make-upu. Vysoce pigmentované, krycí, variabilní a s dlouhou výdrží. Tato kritéria dříve nebyla u přírodní dekorativní kosmetiky možná. Und Gretel posouvá možnosti a nabízí dekorativní kosmetiku ve špičkové kvalitě, bez syntetických konzervantů a chemických látek.</p>
          </div>
        </div>
      </section>



    </Page>
  )
}

export default Category
