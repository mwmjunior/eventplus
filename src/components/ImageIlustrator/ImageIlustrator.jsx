import React from 'react';
import "../../components/ImageIlustrator/ImageIlustrator.css"
 
import imadeDefault from '../../assets/images/default-image.jpeg'


const ImageIllustrator = ({alteText, imageRender = imadeDefault, additionalClass=""}) => {

    // switch (imageResource) {
    //     case 'tipo-evento':
    //         imageResource = tipoEventoImage
            
    //         break;

    //      case 'evento':
    //         imageResource = eventoImage   

    //         break;

    //     case 'evento':
    //         imageResource = defaultImage 
                       
    //             break;
    
    //     default:
    //         break;
    // }



    return (
        <figure className='illustrator-box'>
            <img
            src={imageRender} 
            alt={alteText} 
            className={`illustrator-box__image ${additionalClass}`}
            />
        </figure>
    );
};

export default ImageIllustrator;
