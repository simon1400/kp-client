import SubMenuItem from "../SubMenuItem"

const SubCategoryMenu = ({sub}) => {
  return (
    <section className="sec-sub-categories">
      <div className="uk-container uk-container-large">
        <div className="sub-cat-wrap">
          {sub.map((item, index) => <SubMenuItem key={index} data={item.attributes} />)}
        </div>
      </div>
    </section>
  )
}

export default SubCategoryMenu