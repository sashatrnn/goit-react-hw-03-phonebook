import propTypes from 'prop-types';
import css from './ContactForm.module.css';
import React, { Component } from 'react';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  handleNameChange = e => {
    this.setState({
      name: e.target.value,
    });
  };
  handleNumberChange = e => {
    this.setState({
      number: e.target.value,
    });
  };
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.resetForm();
  };

  resetForm = () => {
    this.setState(() => ({ name: '', number: '' }));
  };
  render() {
    const { name, number } = this.state;
    return (
      <form className={css.form} onSubmit={this.handleFormSubmit}>
        <div>
          <p className={css.inputType}>Name</p>
          <input
            className={css.input}
            type="text"
            name="name"
            value={name}
            onChange={this.handleNameChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>
        <div>
          <p className={css.inputType}>Number</p>
          <input
            className={css.input}
            value={number}
            onChange={this.handleNumberChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <button type="submit" className={css.formBtn}>
          Add Contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  name: propTypes.string,
  number: propTypes.string,
};

export default ContactForm;
