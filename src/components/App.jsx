import { useCallback, useEffect, useState } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { searchPhoto } from 'API/pixabay';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [arrImage, setArrImage] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [description, setDescription] = useState('');

  const getPhotos = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await searchPhoto(q, page);
      setArrImage(prev => [...prev, ...data.hits]);
      setLoadMore(page < Math.ceil(data.totalHits / 12));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [q, page]);

  useEffect(() => {
    if (!q) return;

    getPhotos();
  }, [q, getPhotos]);

  const handleSubmit = value => {
    setQ(value);
    setPage(1);
    setArrImage([]);
  };

  const handleClick = () => {
    setPage(prev => prev + 1);
  };

  const openModal = (url, desc) => {
    setShowModal(true);
    setLargeImage(url);
    setDescription(desc);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <SearchBar handleSubmit={handleSubmit} />
      <ImageGallery array={arrImage} openModal={openModal} />
      {isLoading && <Loader />}

      {showModal && (
        <Modal src={largeImage} alt={description} closeModal={closeModal} />
      )}
      {loadMore && <Button handleClick={handleClick} />}
    </>
  );
};
