import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Details = ({ country }) => {
	return (
		<div>
			<h2>{country.name}</h2>
			<p>capital {country.capital}</p>
			<p>population {country.population}</p>
			<h3>Spoken languages</h3>
			<ul>
				{
					country.languages.map((language) => <li key={language.name}>{language.name}</li>)
				}
			</ul>
			<img src={country.flag} width="150px" alt="flag"/>
			<h3>Weather in {country.capital}</h3>
			<Weather city={country.capital} />
		</div>
	)
}

const Weather = ({ city }) => {
	const [weatherData, setWeatherData] = useState(false)
	
	useEffect(() => {
		axios
			.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city}`)
			.then(response => {
				setWeatherData(response.data)
			})
	},[city])	
	
	if (weatherData) {
		return (
			<div>
				<p> <strong>temperature:</strong> {weatherData.current.temperature} celsius</p>
				<img src={weatherData.current.weather_icons[0]} alt='weather icon' />
				<p> <strong>wind:</strong> {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir} </p>
			</div>
		)
	}

	return (<p><strong>temperature:</strong></p>)
}

const Filter = ( {newFilter, handleNewFilter} ) => 
	<div>
		find countries <input value={newFilter} onChange={handleNewFilter} />
	</div>


const ShowCountries = ({ countriesToShow }) => 
		<div>
			{
				countriesToShow.map((country) => 
					<p key={country.name}> {country.name} </p>
				)
			}
		</div>

const HandleCountries = ({ countriesToShow }) => {
	if (countriesToShow.length > 10) {
		return (<p>Too many matches, specify another filter</p>)
	} else if (countriesToShow.length === 1) {
		return (
		<Details country={countriesToShow[0]} />
		)
	}

	return (
		<>
			<ShowCountries countriesToShow={countriesToShow} />
		</>
	)
}

const App = (props) => {
	const [countries, setCountries] = useState([])
	const [newFilter, setNewFilter] = useState('')

	useEffect(() => {
		console.log('effect')
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				console.log('promise fulfilled')
				setCountries(response.data)
			})
	}, [])	
	console.log('fetched', countries.length, 'countries')
	
	const handleNewFilter = (event) => setNewFilter(event.target.value)	

	const countriesToShow = newFilter
		? countries.filter(country => country.name.match(new RegExp(newFilter, "i")))
		: countries

	return (
		<div>
			<Filter newFilter={newFilter} handleNewFilter={handleNewFilter}/>
			<HandleCountries countriesToShow={countriesToShow} />
		</div>
	)
}

export default App
