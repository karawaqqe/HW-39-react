import { useEffect, useMemo, useState } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { useAuth } from 'contexts/AuthContext';
import {
  createContact,
  getContacts,
  removeContact,
} from 'services/contactsApi';
import css from './ContactsPage.module.css';

export const ContactsPage = () => {
  const { token } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getContacts(token)
      .then(items => {
        if (isMounted) {
          setContacts(items);
        }
      })
      .catch(fetchError => {
        if (isMounted) {
          setError(fetchError.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const visibleContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }, [contacts, filter]);

  const handleAddContact = async contact => {
    const duplicate = contacts.some(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (duplicate) {
      setError(`${contact.name} is already in contacts.`);
      return;
    }

    try {
      setError('');
      const newContact = await createContact(contact, token);
      setContacts(prevContacts => [newContact, ...prevContacts]);
    } catch (addError) {
      setError(addError.message);
    }
  };

  const handleDeleteContact = async contactId => {
    try {
      setError('');
      await removeContact(contactId, token);
      setContacts(prevContacts =>
        prevContacts.filter(contact => contact.id !== contactId)
      );
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  return (
    <section className={css.page}>
      <div className={css.hero}>
        <div>
          <p className={css.kicker}>Private collection</p>
          <h1 className={css.title}>Phonebook</h1>
        </div>
        <p className={css.count}>{contacts.length} contacts</p>
      </div>

      <div className={css.grid}>
        <div className={css.panel}>
          <h2 className={css.subtitle}>Add contact</h2>
          <ContactForm onAddContact={handleAddContact} />
        </div>

        <div className={css.panel}>
          <div className={css.listHeader}>
            <h2 className={css.subtitle}>Contacts</h2>
            <Filter value={filter} onChange={setFilter} />
          </div>
          {error && <p className={css.error}>{error}</p>}
          {isLoading ? (
            <p className={css.status}>Loading contacts...</p>
          ) : (
            <ContactList
              contacts={visibleContacts}
              onDeleteContact={handleDeleteContact}
            />
          )}
        </div>
      </div>
    </section>
  );
};
