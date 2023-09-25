import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ closeModal, alt, src }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyEsc);
    console.log('mount');
    return () => {
      document.removeEventListener('keydown', handleKeyEsc);
      console.log('unmount');
    };
  }, []);

  const handleKeyEsc = event => {
    if (event.code === 'Escape') closeModal();
  };

  const handleClose = ({ currentTarget, target }) => {
    if (currentTarget === target) {
      closeModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};
