import MenuDropdown from '../components/MenuDropdown'
import {useState, useEffect} from 'react'
import {util} from 'uikit'
import MobileMenu from './MobileMenu'

const Header = ({
  bgImg,
  bigHeader
}) => {

  const [activeDropdown, setActiveDropdown] = useState(-1)
  const [menu, setMenu] = useState(false)

  const handleDropDown = (e, index) => {
    e.preventDefault()
    setActiveDropdown(index)
  }

  useEffect(() => {
    util.on('.menu-dropdown', 'beforehide', () => {
      if(activeDropdown > -1){
        setActiveDropdown(-1)
      }
    });
  })

  const handleMenu = (e) => {
    e.preventDefault()
    setMenu(!menu)
  }

  return (
    <header className={`header${!bgImg || menu ? ' not-bg' : ''}${!bigHeader ? ' small-header' : ''}${activeDropdown > -1 ? ' not-bg activeDrop' : ''}`}>
      <div className="uk-container uk-container-large">
        <nav className={`nav-wrap ${menu ? 'yellow-top' : ''}`}>
          <div className="uk-flex uk-flex-bottom uk-hidden@m">
            <button className={`hamburger hamburger--spring ${menu ? 'is-active' : ''}`} type="button" onClick={(e) => handleMenu(e)}>
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
            <div className="control-menu">
              <ul className="icons-wrap">
                <li className="uk-hidden@m"><a href="/" uk-toggle="target: #search"><img className="uk-svg" src="/assets/search.svg" uk-svg=""/></a></li>
              </ul>
            </div>
          </div>
          <div className="menu uk-visible@m">
            <ul>
              <li>
                <a href="/" onClick={e => handleDropDown(e, 0)}>produkty <img className="uk-svg" src="/assets/plus.svg" uk-svg="" /></a>
                <MenuDropdown />
              </li>
              <li>
                <a href="/" onClick={e => handleDropDown(e, 1)}>značky <img className="uk-svg" src="/assets/plus.svg" uk-svg="" /></a>
                <MenuDropdown />
              </li>
              <li><a href="/">o nás</a></li>
              <li><a href="/">kontakt</a></li>
            </ul>
          </div>
          <div className="logo">
            <a href="/"><img className="uk-svg" src="/assets/logo.svg" uk-svg="" /></a>
          </div>
          <div className="control-menu-wrap">
            <div className="control-menu">
              <ul className="uk-visible@m">
                <li><a href="/">salón krásy</a></li>
                <li><a href="/">rezervace</a></li>
              </ul>
              <ul className="icons-wrap">
                <li className="uk-visible@m"><a href="/" uk-toggle="target: #search"><img className="uk-svg" src="/assets/search.svg" uk-svg=""/></a></li>
                <li><a href="/"><img className="uk-svg" src="/assets/user.svg" uk-svg=""/></a></li>
                <li><a href="/" uk-toggle="target: #canvas"><img className="uk-svg" src="/assets/bag.svg" uk-svg=""/></a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <MobileMenu menu={menu} handleMenu={handleMenu} />
    </header>
  )
}

export default Header
