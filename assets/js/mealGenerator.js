const buttonEl = document.getElementById("buttonEl");
const mealCard = document.getElementById("mealCard");

var handleSubmit = () => {
	console.log("clicked");
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "3156cd22admshc4a5e2ccfd5ce63p190e57jsn8263dceb806a",
			"X-RapidAPI-Host": "themealdb.p.rapidapi.com",
		},
	};

	fetch("https://themealdb.p.rapidapi.com/random.php", options)
		.then(function (response) {
			if (response.ok) {
				response.json().then(function (data) {
					getMeals(data);
					console.log(data);
				});
			} else {
				console.log("Problem with the Rapid API response");
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

var getMeals = (data) => {
	if (data.length === 0) {
		mealCard.textContent = "No meals found.";
		return;
	}

	mealCard.innerHTML = "";

	var cardElement = document.createElement("div");
	cardElement.className = "card";

	var cardImage = document.createElement("img");
	cardImage.className = "card-img-top";
	cardImage.src = data.meals[0].strMealThumb;
	cardImage.alt = `Image of ${data.meals[0].strMeal}`;

	var cardBody = document.createElement("div");
	cardBody.className = "card-body";

	var cardTitle = document.createElement("h5");
	cardTitle.className = "card-title fw-bold text-center";
	cardTitle.textContent = data.meals[0].strMeal;

	var cardText = document.createElement("p");
	cardText.className = "card-text";
	cardText.textContent = data.meals[0].strInstructions;

	mealCard.appendChild(cardElement);
	cardElement.append(cardImage, cardBody);
	cardBody.append(cardTitle, cardText);
};

buttonEl.addEventListener("click", handleSubmit);
