import Page from '../../layout/Page'
import PageTop from '../../components/PageTop'

const Blog = () => {
  return (
    <Page bigHeader>
      <PageTop
        small
        head={<h1 className="big-head">
                <span>Blog a <b>novinky</b></span>
              </h1>}
      />

      <section className="sec-big">
        <div className="uk-container uk-container-large">
          <div className="uk-grid blog-item uk-child-width-1-2" uk-grid="">
            <div>
              <div className="blog-item-img">
                <img className="uk-img" src="/assets/blog.jpg" uk-img="" />
              </div>
            </div>
            <div>
              <div className="blog-item-info">
                <h2>Originální kompozice z nejlepších ingrediencí</h2>
                <div>
                  <p>Fragrance Faoundation FIFI rozděluje vůně do dvou kategorií: MAINSTREAM a NICHE PARFÉMY. Dělení je jednoduše postaveno na počtu obchodů, ve kterých daný parfém můžete koupit. To obecně znamená, že naprostá většina vůní, se kterými se setkáváte v běžných parfumeriích, jsou parfémy z hlavního</p>
                </div>
                <a className="bare-button" href="/blog/item">celý článek <img className="uk-svg" src="/assets/angle-right.svg" uk-svg="" /></a>
              </div>
            </div>
          </div>
          <div className="uk-grid blog-item uk-child-width-1-2" uk-grid="">
            <div>
              <div className="blog-item-img">
                <img className="uk-img" src="/assets/blog.jpg" uk-img="" />
              </div>
            </div>
            <div>
              <div className="blog-item-info">
                <h2>Originální kompozice z nejlepších ingrediencí</h2>
                <div>
                  <p>Fragrance Faoundation FIFI rozděluje vůně do dvou kategorií: MAINSTREAM a NICHE PARFÉMY. Dělení je jednoduše postaveno na počtu obchodů, ve kterých daný parfém můžete koupit. To obecně znamená, že naprostá většina vůní, se kterými se setkáváte v běžných parfumeriích, jsou parfémy z hlavního</p>
                </div>
                <a className="bare-button" href="/blog/item">celý článek <img className="uk-svg" src="/assets/angle-right.svg" uk-svg="" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}

export default Blog
