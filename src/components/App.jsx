import { Component } from 'react';
import { ContactForm } from "components/ContactForm/ContactForm";
import { Filter } from "components/Filter/Filter";
import { ContactList } from "components/ContactList/ContactList";
import { nanoid } from 'nanoid'
 
 export class App extends Component {
  state = {
  contacts: [ {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},],
  filter: ''
}
   
componentDidMount = () => {
     const contacts = localStorage.getItem('contacts');
     const parsedContacts = JSON.parse(contacts);

     if (parsedContacts) {
       this.setState({ contacts: parsedContacts})
     }
}
componentDidUpdate = (prevProps, prevState) => {
  if (this.state.contacts !== prevProps.contacts) {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }
}
   
handleAddContact = ({ name, number }) => {
		const names = this.state.contacts.map(contact => contact.name);
		if (names.indexOf(name) >= 0) {
			alert(name + " is already in contacts.");
			return;
		}
		this.setState(prevState => {
			return {
				contacts: [{ name, number, id: nanoid() }, ...prevState.contacts],
			};
		});
	};

handleDelete = idx => {
		this.setState(prevState => {
			const newContactsList = prevState.contacts.filter(contact => contact.id !== idx);
			return { contacts: newContactsList };
		});
	};

handleFilter = (value) => {
  this.setState({ filter: value },);
  
   };
   
handleContacts = () => {
		const { filter, contacts } = this.state;
		const normalizedFilter = filter.toLowerCase();

     return contacts.filter(contact =>
       contact.name.toLowerCase().includes(normalizedFilter)
     );
	};

  render() {
    return (
      <>
        <div>
  <h1>Phonebook</h1>
          <ContactForm onSubmit={ this.handleAddContact } />

  <h2>Contacts</h2>
          <Filter handleFilter={this.handleFilter} handleContacts={this.handleContacts} />
          <ContactList contacts={this.handleContacts()} handleDelete={ this.handleDelete } />
        </div>
        
      </>
          
    );
  }
}
