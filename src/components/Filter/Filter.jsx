import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'reduxPhoneBook/selectors';
import { setFilter } from 'reduxPhoneBook/phoneBookSlice';

import css from './Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const handleFilterChange = event => dispatch(setFilter(event.target.value));
  return (
    <input
      type="text"
      placeholder="Search contacts"
      value={filter}
      onChange={handleFilterChange}
      className={css.filterInput}
    />
  );
};
