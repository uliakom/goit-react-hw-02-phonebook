import PropTypes from 'prop-types';
import { Container, ContactList, ContactItem } from './PhoneBook.styled';

const PhoneBook = ({ contacts, handleDelete }) => {
  return (
    <Container>
      <ContactList>
        {contacts.map(({ id, name, number }) => (
          <ContactItem key={id}>
            <p>
              {name}:<span>{number}</span>
            </p>
            <button type="button" onClick={() => handleDelete(id)}>
              Delete
            </button>
          </ContactItem>
        ))}
      </ContactList>
    </Container>
  );
};

PhoneBook.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  handleDelete: PropTypes.func.isRequired,
};
export default PhoneBook;
