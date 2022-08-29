import buildImageUrl from '../../function/buildImageUrl';

const Image = ({ 
  image, 
  style, 
  svg = false, 
  height = false, 
  width = false 
}) => {

  let format = ''

  if(width) {
    format = '&width='+width
  }else if(height){
    format = '&height='+height
  }else if(height && width){
    format = `&resize=${width}x${height}`
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
      <img src={`${buildImageUrl(image)}?format=webp${format}`} />
    );
  }

};

export default Image;
