import MenuDropdown from '../components/MenuDropdown'
import {useState, useEffect, useContext} from 'react'
import {util, offcanvas} from 'uikit'
import Link from 'next/link'
import MobileMenu from './MobileMenu'
import getMenu from '../function/getMenu'
import { DataStateContext } from '../context/dataStateContext'

const Header = ({
  bgImg,
  bigHeader,
  leftNav,
  rightNav,
  basket
}) => {

  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const [activeDropdown, setActiveDropdown] = useState(false)
  const [menu, setMenu] = useState(false)

  const [left, setLeft] = useState([])
  const [right, setRight] = useState([])

  useEffect(() => {
    if(!basket && leftNav && rightNav){
      setLeft(getMenu(leftNav))
      setRight(getMenu(rightNav))
    }
  }, [leftNav, rightNav])

  useEffect(() => {
    util.on('.menu-dropdown', 'beforehide', () => setActiveDropdown(false));
    util.on('.menu-dropdown', 'beforeshow', () => setActiveDropdown(true));
  })

  const handleMenu = (e) => {
    e.preventDefault()
    setMenu(!menu)
  }

  const closeMenu = async (e, id) => {
    e.preventDefault()
    // setMenu(false)
    offcanvas(id).show()
    util.on(id, 'shown', () => setMenu(false));
  }

  return (
    <header className={`header${!bgImg || menu ? ' not-bg' : ''}${!bigHeader ? ' small-header' : ''}${!!activeDropdown ? ' not-bg activeDrop' : ''}${basket ? ' basket-header' : ''}`}>
      <div className="uk-container uk-container-large">
        <nav className={`nav-wrap ${menu ? 'yellow-top' : ''}`}>
          {!basket && <div className="uk-flex uk-flex-bottom uk-hidden@m">
            <button className={`hamburger hamburger--spring ${menu ? 'is-active' : ''}`} type="button" onClick={(e) => handleMenu(e)}>
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
            <div className="control-menu">
              <ul className="icons-wrap">
                <li className="uk-hidden@m"><a href="/"  onClick={e => closeMenu(e, "#search")}><img className="uk-svg" src="/assets/search.svg" uk-svg=""/></a></li>
              </ul>
            </div>
          </div>}
          {!basket && <div className="menu uk-visible@m">
            <ul>
              {left.map((item, index) => <li key={index}>
                {!item.sub_nav && <a href={item.slug}>{item.name}</a>}
                {!!item.sub_nav && <a href="/" onClick={e => e.preventDefault()}>{item.name} <img className="uk-svg" src="/assets/plus.svg" uk-svg="" /></a>}
                {!!item.sub_nav && <MenuDropdown data={item.sub_nav} index={"desc_left_"+index} />}
              </li>)}
            </ul>
          </div>}
          <div className="logo">
            <a href="/"><img className="uk-svg" src="/assets/logo.svg" uk-svg="" /></a>
          </div>
          {!basket && <div className="control-menu-wrap">
            <div className="control-menu">
              <ul className="menu uk-visible@m">
                {right.map((item, index) => <li key={index}>
                  {!item.sub_nav && <a href={item.slug}>{item.name}</a>}
                  {!!item.sub_nav && <a href="/" onClick={e => e.preventDefault()}>{item.name} <img className="uk-svg" src="/assets/plus.svg" uk-svg="" /></a>}
                  {!!item.sub_nav && <MenuDropdown data={item.sub_nav} index={"desc_right_"+index} />}
                </li>)}
              </ul>
              <ul className="icons-wrap">
                <li className="uk-visible@m"><a href="/" onClick={e => closeMenu(e, "#search")}><img className="uk-svg" src="/assets/search.svg" uk-svg=""/></a></li>
                {!dataContextState.user?.jwt && <li><a href="/" onClick={e => closeMenu(e, "#auth")}><img className="uk-svg" src="/assets/user.svg" uk-svg=""/></a></li>}
                {!!dataContextState.user?.jwt && <li><a href="/user"><img className="uk-svg" src="/assets/user.svg" uk-svg=""/></a></li>}
                <li className={`basket-icon-wrap ${!dataContextState.basket.length && 'empty-basket-icon'}`}>
                  <a href="/" onClick={e => closeMenu(e, "#canvas")}>
                    <img className="uk-svg" src="/assets/bag.svg" uk-svg=""/>
                    <span></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>}
        </nav>
      </div>
      {!basket && <MobileMenu menu={menu} handleMenu={handleMenu} left={left} right={right} />}
    </header>
  )
}

export default Header
