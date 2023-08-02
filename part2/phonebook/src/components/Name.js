const Name = ({person, deleteThisPerson}) => {
    return(
      <li>
        {person.name}  {person.number}
        <button onClick={deleteThisPerson}>delete</button>
      </li>
    )
  }
  
  export default Name