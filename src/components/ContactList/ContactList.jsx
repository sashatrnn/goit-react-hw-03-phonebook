import propTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => (
        <li className={css.listItem} key={id}>
          <p className={css.listName}>{name}</p>
          <p className={css.listNum}>{number}</p>
          <button
            className={css.listBtn}
            type="submit"
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
ContactList.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: propTypes.func.isRequired,
};

export default ContactList;
