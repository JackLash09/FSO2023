const Country = ({common, capital, area, languages, flag}) => {
    if (flag === null) {
        return null
    }

    return (
        <div>
            <h1>{common}</h1>
            <div>capital {capital}</div>
            <div>area {area}</div>
            <h2>languages</h2>
            <div>
                <ul>
                    {Object.values(languages).map((val, i) => {
                        return <li key={i} >{val}</li>
                    })}
                </ul>
            </div>
            <img src={flag} alt="flag" />
        </div>
    )
}

export default Country