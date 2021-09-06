import Page from '../../layout/Page'
import PageTop from '../../components/PageTop'
import Card from '../../components/Card'
import Filter from '../../layout/Filter'

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
            <div className="catalog-filter-wrap">
              <a href="/" uk-toggle="target: #offcanvas-filter" className="filter-button">Filtrovat a třídit <img className="uk-svg" src="/assets/sliders-h.svg" uk-svg="" /></a>
            </div>
            <div className="filter-selected">
              <ul>
                <li>
                  <a href="/">Angelo Caroli <img className="uk-svg" src="/assets/times.svg" uk-svg="" /></a>
                </li>
                <li>
                  <a href="/">Angelo Caroli <img className="uk-svg" src="/assets/times.svg" uk-svg="" /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="catalog-list">
        <div className="uk-container uk-container-large">
          <div className="uk-grid uk-child-width-1-2 uk-child-width-1-4@s" uk-grid="">
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
            <span style={{paddingLeft: '14vw'}}>Dekorativní kosmetika Und Gretel</span>
            <span style={{paddingLeft: '0px'}}>dokazuje, že přírodní kosmetika</span>
            <span style={{paddingLeft: '7vw'}}>nemusí být o kompromisech.</span>
          </h2>
          <div>
            <p>Dlouhou dobu jsme na Královské péči hledali dekorativní kosmetiku, která by svými kvalitami spojovala dva světy. Špičkové přírodní složení bez zatěžujících látek a skvělé vlastnosti, textury, barvy, výdrž. Přírodní kosmetika nám tyto kvality nenabízela a běžná dekorativní kosmetika byla plná zatěžujících látek, na které naše pleti ihned reagovaly, povadaly a mluvily k nám nespokojenými vráskami. Objevily jsme pro sebe a pro Vás Und Gretel, unikátní berlínskou značku, která splňuje vše. Zdá se to až jako zázrak. Posuďte sami. Zveme Vás do světa bez kompromisů.</p>

            <p>Všechny produkty jsou ve kvalitě profesionálního make-upu. Vysoce pigmentované, krycí, variabilní a s dlouhou výdrží. Tato kritéria dříve nebyla u přírodní dekorativní kosmetiky možná. Und Gretel posouvá možnosti a nabízí dekorativní kosmetiku ve špičkové kvalitě, bez syntetických konzervantů a chemických látek.</p>
          </div>
        </div>
      </section>

      <Filter />

    </Page>
  )
}

export default Category
