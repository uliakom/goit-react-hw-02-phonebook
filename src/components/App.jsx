import React, { Component } from 'react';
import shortid from 'shortid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Container, Title, SubTitle } from './App.styled';
import ContactForm from './ContactForm';
import PhoneBook from 'PhoneBook';
import Filter from './Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = ({ name, number }) => {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (this.state.contacts.some(contact => contact.name === newContact.name)) {
      return Notify.warning(
        `${newContact.name} is already in contacts.
        Please choose other name.`,
        {
          position: 'center-center',
          timeout: 4000,
        }
      );
    }
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  deleteContact = deletedId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== deletedId),
    }));
  };

  handleFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filterContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return visibleContacts;
  };

  render() {
    const { deleteContact, handleFilter, filterContacts } = this;
    const { filter } = this.state;
    const filteredContacts = filterContacts();

    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <SubTitle>Contacts</SubTitle>
        <Filter value={filter} onChange={handleFilter} />
        <PhoneBook contacts={filteredContacts} handleDelete={deleteContact} />
      </Container>
    );
  }
}
