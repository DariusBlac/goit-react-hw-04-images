import { GalleryItem } from 'components/ImageGalleryItem/GalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ array, openModal }) => {
  return (
    <ul className={css.gallery}>
      {array.map(el => {
        return (
          <GalleryItem
            url={el.previewURL}
            desc={el.tags}
            key={el.id}
            openModal={openModal}
            largeUrl={el.largeImageURL}
          />
        );
      })}
    </ul>
  );
};
