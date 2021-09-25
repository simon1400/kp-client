import {remark} from 'remark'
import remarkHtml from 'remark-html'

const markdownToHtml = async (markdown) => {
  const result = await remark().use(remarkHtml).process(markdown)

  console.log(result);

  return result
}

export default markdownToHtml
