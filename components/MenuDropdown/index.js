import {dropdown} from 'uikit'
import Image from '../Image'

const MenuDropdown = ({index, data}) => {

  const handleDropDown = (e) => {
    e.preventDefault()
    dropdown(`#dropdown_${index}`).hide(1000);
  }

  if(!data) {
    return ''
  }

  return(
    <div id={`dropdown_${index}`} className="menu-dropdown uk-dropdown yellow-top" uk-dropdown="mode: click; offset: -10; boundary: .header; boundary-align: true; animation: uk-animation-slide-top-medium; duration: 500">
      <div className="uk-container">
        <div className="dropdown-wrap">
          {data.map((item, index) => <a key={index} href={item.slug} className="dropdown-item">
            {item.image.data && <div className="dropdown-img">
              <Image image={item.image.data.attributes} width={70} height={70} />
            </div>}
            <span>{item.name}</span>
          </a>)}
        </div>
        <a className="bare-button button-reverse uk-hidden@m" onClick={e => handleDropDown(e)} href="/">
          <img className="uk-svg" src="/assets/angle-left.svg" uk-svg="" />
          zpět
        </a>
      </div>
    </div>
  )
}

export default MenuDropdown
