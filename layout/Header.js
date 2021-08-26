const Header = ({
  bgImg,
  bigHeader
}) => {

  return (
    <header className={`${!bgImg ? 'not-bg' : ''}${!bigHeader ? ' small-header' : ''}`}>
      <div className="uk-container uk-container-large">
        <nav className="nav-wrap">
          <div className="menu">
            <ul>
              <li><a href="/">produkty <img className="uk-svg" src="/assets/plus.svg" uk-svg="" /></a></li>
              <li><a href="/">značky <img className="uk-svg" src="/assets/plus.svg" uk-svg="" /></a></li>
              <li><a href="/">o nás</a></li>
              <li><a href="/">kontakt</a></li>
            </ul>
          </div>
          <div className="logo">
            <a href="/"><img className="uk-svg" src="/assets/logo.svg" uk-svg="" /></a>
          </div>
          <div className="control-menu">
            <ul>
              <li><a href="/">salón krásy</a></li>
              <li><a href="/">rezervace</a></li>
            </ul>
            <ul className="icons-wrap">
              <li><a href="/" uk-toggle="target: #search"><img className="uk-svg" src="/assets/search.svg" uk-svg=""/></a></li>
              <li><a href="/"><img className="uk-svg" src="/assets/user.svg" uk-svg=""/></a></li>
              <li><a href="/" uk-toggle="target: #canvas"><img className="uk-svg" src="/assets/bag.svg" uk-svg=""/></a></li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
