import css from './Searchbar.module.css';

export const SearchBar = ({ handleSubmit }) => {
  const onSubmit = event => {
    event.preventDefault();
    const { value } = event.target.query;
    handleSubmit(value);
    event.currentTarget.reset();
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={onSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.button_label}>Search</span>
        </button>

        <input
          name="query"
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          required
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
