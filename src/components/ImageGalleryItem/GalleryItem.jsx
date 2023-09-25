import css from './GalleryItem.module.css';

export const GalleryItem = ({ url, desc, openModal, largeUrl }) => {
  return (
    <li className={css.gallery_item} onClick={() => openModal(largeUrl, desc)}>
      <img src={url} alt={desc} className={css.img} />
    </li>
  );
};
