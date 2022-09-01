import Image from "../Image"

const SubMenuItem = ({
  data
}) => {

  return (
    <a href={data.slug} className="sub-menu-item">
      {data.icon.data && <div className="img-wrap">
        <Image image={data.icon} width={50} height={50} />
      </div>}
      <div>
        <h4>{data.title}</h4>
      </div>
    </a>
  )
}

export default SubMenuItem