const Content = ({data}) => {
  return (
    <div dangerouslySetInnerHTML={{__html: data}} className="editor-content" />
  )
}

export default Content