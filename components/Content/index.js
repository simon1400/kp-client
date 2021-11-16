const Content = ({data}) => {
  return (
    <div dangerouslySetInnerHTML={{__html: data}} className="editor-content"></div>
  )
}

export default Content