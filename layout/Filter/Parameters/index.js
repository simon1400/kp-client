import {useRefinementList} from "react-instantsearch-hooks-web"

const Parameters = (props) => {

  const { items, refine } = useRefinementList(props);
  const {data} = props

  return (
    <>
      {data.map((item, index) => <li key={index}>
        <a className="uk-accordion-title" href="#">{item.attributes.title} <img className="uk-svg" src="/assets/angle-down.svg" uk-svg="" /></a>
        <div className="uk-accordion-content">
          <ul>
            {item.attributes.values.data.map((itemVal, indexVal) => {
              let itemFind = items[items.findIndex(menuItem => menuItem.label === itemVal.attributes.title)]
              if(itemFind) {
                return <li key={indexVal}>
                  <label>
                    <span>{itemVal.attributes.title}</span>
                    <input
                      onChange={e => refine(itemFind.value)} 
                      className="uk-checkbox" 
                      type="checkbox" 
                      checked={itemFind.isRefined} 
                    />
                  </label>
                </li>
              }
            })}
          </ul>
        </div>
      </li>)}
    </>
  )
}

export default Parameters