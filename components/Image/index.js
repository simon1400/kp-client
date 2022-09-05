import buildImageUrl from '../../function/buildImageUrl';

const Image = ({ 
  image, 
  style, 
  svg = false, 
  height = false, 
  width = false,
  fit = false
}) => {

  let format = '?format=webp'

  if(height && width){
    format += `&resize=${width}x${height}`
  }else if(width) {
    format += '&width='+width
  }else if(height){
    format += '&height='+height
  }

  if(fit) {
    format += `&fit=${fit}`
  }

  if(svg){
    return (
      <img
        uk-svg=""
        src={image}
        alt={image.alternativeText || image.name}
        style={style}
      />
    );
  }else{
    return (
      <img src={`${buildImageUrl(image)}${format}`} />
    );
  }

};

export default Image;
