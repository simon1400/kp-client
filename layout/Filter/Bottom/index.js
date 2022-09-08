import {useCurrentRefinements} from "react-instantsearch-hooks-web"

const BottomControl = (props) => {

  const { items, refine } = useCurrentRefinements(props);
  const {closeCanvas} = props

  const removeAll = (e) => {
    e.preventDefault()
    closeCanvas(e)
    refine(items)
  }

  return (
    <div className="canvas-buttons-wrap uk-margin-top uk-flex uk-flex-between">
      <a href="/" className="button border-button" onClick={e => removeAll(e)}>vymazat vše</a>
      <a href="/" className="button primary" onClick={e => closeCanvas(e)}>zobrazit</a>
    </div>
  )
}

export default BottomControl