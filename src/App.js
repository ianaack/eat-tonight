import React, { useState } from "react";

function App() {
	const [meals, setMeals] = useState({});

	const fetchData = () => {
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": process.env.REACT_APP_RapidAPIKey,
				"X-RapidAPI-Host": process.env.REACT_APP_RapidAPIHost,
			},
		};

		fetch("https://themealdb.p.rapidapi.com/random.php", options)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				setMeals(data);
				console.log(data.meals[0].strMeal);
			})
			.catch((err) => {
				console.error("API Error", err);
			});
	};

	return (
		<div className="container bg-light">
			<h1 className="m-2 fw-bold">What do you want to eat tonight?</h1>
			<button className="btn btn-dark" onClick={fetchData}>
				Spin the Wheel!
			</button>
		</div>
	);
}

export default App;
