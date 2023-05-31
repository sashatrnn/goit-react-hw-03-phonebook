import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';

import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  onAddContact = ({ name, number }) => {
    const isContactInPhonebook = this.state.contacts.find(
      contact => contact.name.toLocaleLowerCase() === name.toLowerCase()
    );
    if (isContactInPhonebook) {
      return Notiflix.Notify.failure(`${name} is already in contacts`);
    }
    const id = nanoid();
    const newContacts = [...this.state.contacts, { id, name, number }];
    this.setState({ contacts: newContacts });
  };

  onDeleteContact = id => {
    const newContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: newContacts });
  };

  onFilterContacts = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  onGetContacts = () => {
    const { contacts, filter } = this.state;
    if (filter === '') {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    return (
      <div className="container">
        <h1 className="title">Phonebook</h1>
        <ContactForm onSubmit={this.onAddContact} />
        <Filter value={filter} onChangeFilter={this.onFilterContacts} />
        <h2 className="subTitle">Contacts</h2>
        <ContactList
          contacts={this.onGetContacts()}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}

export default App;
