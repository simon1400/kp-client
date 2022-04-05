import {connectCurrentRefinements} from "react-instantsearch-core"

const BottomControl = ({
  closeCanvas,
  items,
  refine
}) => {

  const removeAll = (e) => {
    e.preventDefault()
    refine(items)
  }

  return (
    <div className="canvas-buttons-wrap uk-margin-top uk-flex uk-flex-between">
      <a href="/" className="button border-button" onClick={e => removeAll(e)}>vymazat vše</a>
      <a href="/" className="button primary" onClick={e => closeCanvas(e)}>zobrazit</a>
    </div>
  )
}

export default connectCurrentRefinements(BottomControl)