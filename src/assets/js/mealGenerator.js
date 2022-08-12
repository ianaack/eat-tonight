const buttonEl = document.getElementById("buttonEl");
const mealCard = document.getElementById("mealCard");

const handleSubmit = () => {
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": process.env.RapidAPIKey,
			"X-RapidAPI-Host": process.env.RapidAPIHost,
		},
	};

	fetch("https://themealdb.p.rapidapi.com/random.php", options)
		.then(function (response) {
			if (response.ok) {
				response.json().then(function (data) {
					getMeals(data);
				});
			} else {
				console.log("Problem with the Rapid API response");
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

const getMeals = (data) => {
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
