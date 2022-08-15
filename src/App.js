import React, { useState } from "react";

function App() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = () => {
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": process.env.REACT_APP_RapidAPIKey,
				"X-RapidAPI-Host": process.env.REACT_APP_RapidAPIHost,
			},
		};

		fetch(`https://themealdb.p.rapidapi.com/random.php`, options)
			.then((response) => {
				if (!response.ok) {
					throw new Error(
						`This is an HTTP error: The status is ${response.status}`
					);
				}
				return response.json();
			})
			.then((actualData) => {
				setData(actualData);
				setError(null);
			})
			.catch((err) => {
				setError(err.message);
				setData(null);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className="container bg-light">
			<h1 className="m-2 fw-bold">What do you want to eat tonight?</h1>
			<button className="btn btn-dark" onClick={fetchData}>
				Spin the Wheel!
			</button>
			{loading && <div>Click the button</div>}
			{error && <div>{`There is a problem fetching the data - ${error}`}</div>}
			<div>
				{data &&
					data.meals.map(
						({ idMeal, strMeal, strMealThumb, strInstructions }) => (
							<div key={idMeal}>
								<div className="card">
									<div className="card-body">
										<img
											src={strMealThumb}
											alt={strMealThumb}
											className="card-img-top"
										></img>
										<h3 className="card-title">{strMeal}</h3>
										<p className="card-text">{strInstructions}</p>
									</div>
								</div>
							</div>
						)
					)}
			</div>
		</div>
	);
}

export default App;
