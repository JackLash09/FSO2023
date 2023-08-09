const Name = ({name, showThisCountry}) => {
    return(
    <li>
        {name}
        <button onClick={showThisCountry}>Show</button>
    </li>
    )
}

export default Name