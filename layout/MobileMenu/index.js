import MenuDropdown from '../../components/MenuDropdown'
import {useEffect} from 'react'
import {offcanvas} from 'uikit'

const MobileMenu = ({menu, handleMenu}) => {

  useEffect(() => {
    if(menu) {
      offcanvas('#canvas-mobile-menu').show();
    }else{
      offcanvas('#canvas-mobile-menu').hide();
    }
  }, [menu])

  return (
    <div id="canvas-mobile-menu" className="uk-offcanvas" uk-offcanvas="flip: true; overlay: true">
      <div className="menu menu-mobile uk-offcanvas-bar">
        <ul>
          <li>
            <a href="/">produkty <img className="uk-svg" src="/assets/plus.svg" uk-svg="" /></a>
            <MenuDropdown index="0" />
          </li>
          <li>
            <a href="/">značky <img className="uk-svg" src="/assets/plus.svg" uk-svg="" /></a>
            <MenuDropdown index="1" />
          </li>
          <li><a href="/">o nás</a></li>
          <li><a href="/">kontakt</a></li>
          <li><a href="/">salón krásy</a></li>
          <li><a href="/">rezervace</a></li>
        </ul>
        <a className="bare-button button-reverse" onClick={e => handleMenu(e)} href="/"><img className="uk-svg" src="/assets/angle-left.svg" uk-svg="" />zavřít</a>
      </div>
    </div>
  )
}

export default MobileMenu
