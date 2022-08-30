import MenuDropdown from '../../components/MenuDropdown'
import {useEffect} from 'react'
import {offcanvas} from 'uikit'
import Link from 'next/link'

const MobileMenu = ({
  menu,
  handleMenu,
  left,
  right,
  clickMenu
}) => {

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
          {left.map((item, index) => <li key={index}>
            {!item.sub_nav && <Link href={item.slug}><a onClick={() => clickMenu()}>{item.name}</a></Link>}
            {!!item.sub_nav && <a href="/" onClick={e => e.preventDefault()}>{item.name} <img className="uk-svg" src="/assets/plus.svg" uk-svg="" /></a>}
            {!!item.sub_nav && <MenuDropdown data={item.sub_nav} index={'mob_top_'+index} />}
          </li>)}
          {right.map((item, index) => <li key={index}>
            {!item.sub_nav && <Link href={item.slug}><a onClick={() => clickMenu()}>{item.name}</a></Link>}
            {!!item.sub_nav && <a href="/" onClick={e => e.preventDefault()}>{item.name} <img className="uk-svg" src="/assets/plus.svg" uk-svg="" /></a>}
            {!!item.sub_nav && <MenuDropdown data={item.sub_nav} index={'mob_bottom_'+index} />}
          </li>)}
        </ul>
        <a className="bare-button button-reverse" onClick={e => handleMenu(e)} href="/"><img className="uk-svg" src="/assets/angle-left.svg" uk-svg="" />zavřít</a>
      </div>
    </div>
  )
}

export default MobileMenu
