const Persons = ({ persons, onDelete }) => {
  return (
    <ul className="persons-list">
      {persons.map(person => (
        <li key={person.id} className="person-item">
          <span>
            {person.name} {person.number}
          </span>
          <button 
            onClick={() => onDelete(person.id)}
            className="delete-button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Persons