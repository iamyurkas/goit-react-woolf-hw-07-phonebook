import { nanoid } from 'nanoid';
import { useState } from 'react';
import { addContact } from 'reduxPhoneBook/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'reduxPhoneBook/selectors';

import css from './ContactForm.module.css';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const validatePhoneNumber = (value) => {
    const pattern = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    return pattern.test(value);
  }

  const handleChangeName = event => {
    setName(event.target.value);
  };

  const checkContactExist = name => {
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const handleChangeNumber = event => {
    setNumber(event.target.value);
  };

  const handleAddContact = event => {
    event.preventDefault();

    if (checkContactExist(name)) {
      alert(
        'Contact with this name is already exist. Please enter a different name.'
      );
      return;
    }

    if (!name.trim() || !number.trim()) {
      alert('Please enter both name and phone number.');
      return;
    }

    if (!validatePhoneNumber(number)) {
      alert("Phone number must be digits and can contain spaces, dashes, parentheses and can start with +");
      return;
    }

    if (name.trim() === '') {
      alert('Please enter a name.');
      return;
    }

    dispatch(addContact({ id: nanoid(), name, phone: number }));
    setName('');
    setNumber('');
  };

  return (
    <form className={css.contactForm} onSubmit={handleAddContact}>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Please enter a valid name"
        required
        value={name}
        onChange={handleChangeName}
        placeholder="Enter name"
        className={css.input}
      />

      <input 
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChangeNumber}
        placeholder="Enter phone number"
        className={css.input}
      />
      <button className={css.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};