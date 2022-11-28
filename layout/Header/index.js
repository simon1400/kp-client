import MenuDropdown from '../../components/MenuDropdown'
import {useState, useEffect, useContext} from 'react'
import {util, offcanvas} from 'uikit'
import { useRouter } from 'next/router'
import MobileMenu from '../MobileMenu'
import getMenu from '../../function/getMenu'
import { DataStateContext } from '../../context/dataStateContext'
import Link from 'next/link'

const Header = ({
  bgImg,
  bigHeader,
  leftNav,
  rightNav,
  basket
}) => {

  const router = useRouter()

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

  const clickMenu = () => {
    setMenu(false)
  }

  const closeMenu = async (e, id) => {
    e.preventDefault()
    setMenu(false)
    offcanvas(id).show()
    util.on(id, 'shown', () => setMenu(false));
  }

  return (
    <header className={`header${!bgImg || menu ? ' not-bg' : ''}${!bigHeader ? ' small-header' : ''}${!!activeDropdown ? ' not-bg activeDrop' : ''}`}>
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
                <li className="uk-hidden@m">
                  <a href="/"  onClick={e => closeMenu(e, "#search")}>
                    <img className="uk-svg" src="/assets/search.svg" uk-svg="" hidden/>
                    <svg hidden/>
                  </a>
                </li>
              </ul>
            </div>
          </div>}
          {!basket && <div className="menu uk-visible@m">
            <ul>
              {left.map((item, index) => <li key={index}>
                {!item.sub_nav && <a href={item.slug}>{item.name}</a>}
                {!!item.sub_nav && <a href="/" onClick={e => e.preventDefault()}>
                  {item.name} 
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"/></svg>
                </a>}
                {!!item.sub_nav && <MenuDropdown data={item.sub_nav} index={"desc_left_"+index} />}
              </li>)}
            </ul>
          </div>}
          {basket && <div className="uk-flex uk-flex-bottom">
            <a className="bare-button button-reverse" onClick={e => {e.preventDefault(); router.back()}} href="/">
              <img className="uk-svg" src="/assets/angle-left.svg" uk-svg="" hidden />
              <svg hidden/>
              <span className="uk-visible@s">zpět</span>
            </a>
          </div>}
          <div className="logo">
            <a href="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="269" height="55" viewBox="0 0 269 55"><path d="M147.13,22.53s-3.08,4.07-12.63,4.07-12.63-4.07-12.63-4.07l-3.18-19.1L127.91,10,134.5.14,141.09,10l9.22-6.59Z" fill="#b09925"/><path d="M167.45,33.69h1.23l2.19-3.09h-1.55Zm.67,2.78s.42,1.5.72,2.33l2.95,7.89h-7.42l3-7.89c.31-.83.72-2.33.72-2.33Zm6.61,18.06H176l-7.28-19.45h-1.28l-7.27,19.45h1.28L164,47.8h8.25Zm-31.78,0h1.19V44.86h3.61l5.95,9.67h1.44L148.78,44.3v0l6-9.17h-1.45l-5.55,8.67h-3.62V35.08H143Zm-19.78-2.09a8.22,8.22,0,0,0,5.94,2.42c3.48,0,5.64-2.25,5.64-5.06,0-6.5-9.94-4.92-9.94-10.06,0-1.89,1.72-3.83,4.61-3.83a6.45,6.45,0,0,1,4.25,1.67l.67-1a7.32,7.32,0,0,0-5-1.81c-3.53,0-5.83,2.45-5.83,5,0,6.09,9.94,4.56,9.94,10.09,0,2.33-1.91,3.83-4.33,3.83a7.47,7.47,0,0,1-5.2-2.17Zm-14.23,2.09h1.31l7.28-19.45h-1.28L110.36,50.8c-.33.92-.75,2.34-.75,2.34h-.06s-.41-1.42-.75-2.34l-5.86-15.72h-1.28ZM77.63,44.66a8.6,8.6,0,0,1,8.42-8.78h.17A8.6,8.6,0,0,1,94.8,44.5v.16a8.75,8.75,0,0,1-8.45,9.06h-.13a8.76,8.76,0,0,1-8.59-8.92v-.14m-1.25,0a10,10,0,0,0,9.74,10.2h.1a10,10,0,0,0,9.83-10.1v-.1a9.82,9.82,0,0,0-9.72-9.92h-.11a9.82,9.82,0,0,0-9.84,9.81v.11M61.05,54.53H71.52V53.41H62.24V35.08H61.05ZM45.38,33.69H46.6l2.2-3.09H47.24ZM46,36.47s.42,1.5.73,2.33l2.94,7.89H42.29l3-7.89c.3-.83.72-2.33.72-2.33Zm6.62,18.06h1.27L46.66,35.08H45.38L38.1,54.53h1.28l2.5-6.73h8.25ZM20.93,44.8V36.19h4.45a6,6,0,0,1,2.72.39,3.94,3.94,0,0,1,2.28,3.75c0,2.64-1.61,4.47-4.17,4.47Zm-1.2,9.73h1.2V45.91h5.58l4.62,8.62h1.41l-4.36-8.09a3.92,3.92,0,0,0-.44-.7v-.05a5.21,5.21,0,0,0,3.89-5.37,5,5,0,0,0-2.7-4.66,7.37,7.37,0,0,0-3.5-.59h-5.7ZM0,54.53H1.2V44.86H4.82l5.94,9.67h1.45L5.84,44.3v0l6-9.17H10.37L4.82,43.75H1.2V35.08H0Z"/><path d="M257.82,54.53H269V53.41H259V45.27h7.75V44.16H259v-8h9.44V35.08H257.82ZM241.29,33.69h1.45L245,30.6H243.6L242,32.83H242l-1.55-2.23h-1.36Zm-8.78,11c0,5.64,4.09,10.2,9.75,10.2a10.26,10.26,0,0,0,7.34-2.94l-.75-.84a9.37,9.37,0,0,1-6.59,2.64c-4.89,0-8.5-4-8.5-9a8.43,8.43,0,0,1,8-8.78h.38a9.49,9.49,0,0,1,6.2,2.2l.72-.89a9.92,9.92,0,0,0-6.94-2.45,9.59,9.59,0,0,0-9.65,9.54c0,.13,0,.25,0,.38m-13-11h1.22l2.2-3.09h-1.55Zm-5,20.83h11.17V53.41h-10V45.27h7.75V44.16h-7.75v-8h9.44V35.08H214.54Zm-18.86-9.17V36.19h5.14c2.83,0,4.72,1.64,4.72,4.55s-1.89,4.62-4.72,4.62Zm-1.2,9.17h1.2V46.47h5.19c3.39,0,5.92-2.2,5.92-5.72s-2.53-5.67-5.92-5.67h-6.39Z"/></svg>
            </a>
          </div>
          {basket && <div></div>}
          {!basket && <div className="control-menu-wrap">
            <div className="control-menu">
              <ul className="menu uk-visible@m">
                {right.map((item, index) => <li key={index}>
                  {!item.sub_nav && <a href={item.slug}>{item.name}</a>}
                  {!!item.sub_nav && <a href="/" onClick={e => e.preventDefault()}>
                    {item.name} 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"/></svg>
                  </a>}
                  {!!item.sub_nav && <MenuDropdown data={item.sub_nav} index={"desc_right_"+index} />}
                </li>)}
              </ul>
              <ul className="icons-wrap">
                <li className="uk-visible@m">
                  <a href="/" onClick={e => closeMenu(e, "#search")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z"/></svg>
                  </a>
                </li>
                {!dataContextState?.token?.length && <li>
                  <a href="/" onClick={e => closeMenu(e, "#auth")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M313.6 288c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4zM416 464c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16v-41.6C32 365.9 77.9 320 134.4 320c19.6 0 39.1 16 89.6 16 50.4 0 70-16 89.6-16 56.5 0 102.4 45.9 102.4 102.4V464zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm0-224c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"/></svg>
                  </a>
                </li>}
                {!!dataContextState?.token?.length && <li>
                  <Link href="/user">
                    <a>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M313.6 288c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4zM416 464c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16v-41.6C32 365.9 77.9 320 134.4 320c19.6 0 39.1 16 89.6 16 50.4 0 70-16 89.6-16 56.5 0 102.4 45.9 102.4 102.4V464zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm0-224c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"/></svg>
                    </a>
                  </Link>
                </li>}
                <li className="basket-icon-wrap">
                  <a href="/" onClick={e => closeMenu(e, "#canvas")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M352 128C352 57.421 294.579 0 224 0 153.42 0 96 57.421 96 128H0v304c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V128h-96zM224 32c52.935 0 96 43.065 96 96H128c0-52.935 43.065-96 96-96zm192 400c0 26.467-21.533 48-48 48H80c-26.467 0-48-21.533-48-48V160h64v48c0 8.837 7.164 16 16 16s16-7.163 16-16v-48h192v48c0 8.837 7.163 16 16 16s16-7.163 16-16v-48h64v272z"/></svg>
                    {!!dataContextState.basket.length && <span></span>}
                  </a>
                </li>
              </ul>
            </div>
          </div>}
        </nav>
      </div>
      {!basket && <MobileMenu menu={menu} clickMenu={clickMenu} handleMenu={handleMenu} left={left} right={right} />}
    </header>
  )
}

export default Header
