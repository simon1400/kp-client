import SubMenuItem from "../SubMenuItem"

const SubCategoryMenu = ({
  sub,
  small = false
}) => {
  return (
    <section className="sec-sub-categories">
      <div className={`uk-container ${small ? "uk-container-small" : "uk-container-large"}`}>
        <div className="sub-cat-wrap">
          {sub.map((item, index) => <SubMenuItem key={index} data={item.attributes} />)}
        </div>
      </div>
    </section>
  )
}

export default SubCategoryMenu