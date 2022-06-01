import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {limitFit} from "@cloudinary/url-gen/actions/resize";

const Image = ({ image, style, svg = false, height = false, width = false }) => {

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'hardart-cz'
    }
  });

  const myImage = cld.image(image);
  
  myImage.format('auto');

  if(height && width) {
    myImage.resize(limitFit().width(width).height(height))
  }else if(width) {
    myImage.resize(limitFit().width(width))
  }else if(height) {
    myImage.resize(limitFit().height(height))
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
      <AdvancedImage cldImg={myImage} />
    );
  }

};

export default Image;
