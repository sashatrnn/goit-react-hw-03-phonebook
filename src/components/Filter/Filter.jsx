import propTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ value, onChangeFilter }) => {
  return (
    <div className={css.filter}>
      <h2 className={css.inputTitle}>Search Contact by Name</h2>
      <input
        type="text"
        name="filter"
        className={css.inputSearch}
        value={value}
        onChange={onChangeFilter}
      />
    </div>
  );
};

Filter.propTypes = {
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};

export default Filter;
