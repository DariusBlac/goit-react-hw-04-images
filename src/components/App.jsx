import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { searchPhoto } from 'API/pixabay';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    q: '',
    page: 1,
    isLoading: false,
    arrImage: [],
    loadMore: false,
    showModal: false,
    largeImage: '',
    description: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { q, page, arrImage } = this.state;
    if (prevState.q !== q || prevState.page !== page) {
      this.fetchPhotos(q, page, arrImage);
    }
  }

  fetchPhotos = async (q, page, arr) => {
    try {
      this.setState({ isLoading: true });
      const data = await searchPhoto(q, page);
      this.setState({
        arrImage: [...arr, ...data.hits],
        loadMore: page < Math.ceil(data.totalHits / 12),
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = value => {
    this.setState({ q: value, page: 1, arrImage: [] });
  };

  handleClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  openModal = (url, desc) => {
    this.setState({ showModal: true, largeImage: url, description: desc });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      arrImage,
      isLoading,
      largeImage,
      showModal,
      description,
      loadMore,
    } = this.state;
    return (
      <>
        <SearchBar handleSubmit={this.handleSubmit} />
        <ImageGallery array={arrImage} openModal={this.openModal} />
        {isLoading && <Loader />}

        {showModal && (
          <Modal
            src={largeImage}
            alt={description}
            closeModal={this.closeModal}
          />
        )}
        {loadMore && <Button handleClick={this.handleClick} />}
      </>
    );
  }
}
