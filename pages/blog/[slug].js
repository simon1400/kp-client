import Page from '../../layout/Page'
import PageTop from '../../components/PageTop'

const BlogFull = () => {
  return (
    <Page bigHeader>
      <PageTop
        small
        head={<h1 className="big-head">
                <span>Článek <b>lorem ipsum</b></span>
              </h1>}
      />
      <section className="sec-big">
        <div className="uk-container uk-container-small">
          <div>
            <p>Fragrance Faoundation FIFI rozděluje vůně do dvou kategorií: MAINSTREAM a NICHE PARFÉMY. Dělení je jednoduše postaveno na počtu obchodů, ve kterých daný parfém můžete koupit. To obecně znamená, že naprostá většina vůní, se kterými se setkáváte v běžných parfumeriích, jsou parfémy z hlavního proudu, jejichž cílem je především maximalizovat tržní podíl dané značky.</p>
            <p>Oproti tomu niche parfémy jsou vyrobeny v malých sériích a z těch nejlepších ingrediencí a k dostání jsou pouze ve vybraných buticích či exkluzivních parfumeriích. Díky této unikátní tržní pozici si mohou jejich tvůrci dovolit vytvářet originální osobité kompozice. Při sestavování kompozice niche parfému je kladen důraz na každý detail a stále se lze setkat dokonce i s ručním plněním flakónů.</p>
            <p>Pro Královskou péči vybíráme niche parfémy podle kvality ingrediencí, podle originality a necháváme se také inspirovat příběhem, s jakým tyto olfaktorické poklady přichází na svět. Niche parfémy, to jsou originální kompozice z nejlepších ingrediencí.</p>
            <img src="/assets/banner.jpg" />
          </div>
          <h2 className="big-head uk-text-center uk-margin-large-top uk-margin-large-bottom">
            <span style={{paddingLeft: '0px'}}>dokazuje, že přírodní kosmetika</span>
            <span style={{paddingLeft: '6vw'}}>nemusí být o kompromisech.</span>
          </h2>
          <div>
            <p>Dlouhou dobu jsme na Královské péči hledali dekorativní kosmetiku, která by svými kvalitami spojovala dva světy. Špičkové přírodní složení bez zatěžujících látek a skvělé vlastnosti, textury, barvy, výdrž. Přírodní kosmetika nám tyto kvality nenabízela a běžná dekorativní kosmetika byla plná zatěžujících látek, na které naše pleti ihned reagovaly, povadaly a mluvily k nám nespokojenými vráskami. Objevily jsme pro sebe a pro Vás Und Gretel, unikátní berlínskou značku, která splňuje vše. Zdá se to až jako zázrak. Posuďte sami. Zveme Vás do světa bez kompromisů.</p>

            <p>Všechny produkty jsou ve kvalitě profesionálního make-upu. Vysoce pigmentované, krycí, variabilní a s dlouhou výdrží. Tato kritéria dříve nebyla u přírodní dekorativní kosmetiky možná. Und Gretel posouvá možnosti a nabízí dekorativní kosmetiku ve špičkové kvalitě, bez syntetických konzervantů a chemických látek.</p>
          </div>
          <div className="button-more-wrap">
            <a href="/" className="button">nakupujte zde</a>
          </div>
        </div>
      </section>
    </Page>
  )
}

export default BlogFull
