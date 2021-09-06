import Link from 'next/link'
import {dropdown, findOne} from 'uikit'

const MenuDropdown = ({index}) => {

  const handleDropDown = (e) => {
    e.preventDefault()
    dropdown(`#dropdown_${index}`).hide(500);
  }

  return(
    <div id={`dropdown_${index}`} className="menu-dropdown uk-dropdown" uk-dropdown="mode: click; boundary: .header; boundary-align: true; animation: uk-animation-slide-top-medium; duration: 500">
      <div className="uk-container">
        <div className="dropdown-wrap">
          <Link href="/product">
            <a className="dropdown-item">
              <div className="dropdown-img">
                <img className="uk-img" src="https://www.kralovska-pece.cz/image/cache/catalog/angelo-caroli/angelo-caroli-amore-nero-800x800.jpg" uk-img="" />
              </div>
              <span>niche parfémy</span>
            </a>
          </Link>
          <Link href="/">
            <a className="dropdown-item">
              <div className="dropdown-img">
                <img className="uk-img" src="https://www.kralovska-pece.cz/image/cache/catalog/angelo-caroli/angelo-caroli-amore-nero-800x800.jpg" uk-img="" />
              </div>
              <span>niche parfémy</span>
            </a>
          </Link>
        </div>
        <a className="bare-button button-reverse uk-hidden@m" onClick={e => handleDropDown(e)} href="/"><img className="uk-svg" src="/assets/angle-left.svg" uk-svg="" />zpet</a>
      </div>
    </div>
  )
}

export default MenuDropdown
