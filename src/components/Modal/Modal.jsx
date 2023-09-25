import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyEsc);
  }

  handleKeyEsc = e => {
    if (e.code === 'Escape') this.props.closeModal();
  };

  handleClose = ({ currentTarget, target }) => {
    if (currentTarget === target) {
      this.props.closeModal();
    }
  };

  render() {
    const { src, alt } = this.props;
    return (
      <div className={css.overlay} onClick={this.handleClose}>
        <div className={css.modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}
