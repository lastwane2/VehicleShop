const USER_CARDS_API_URL = "https://671ca9cf09103098807ac514.mockapi.io/api/v1/userCarCards"


const mainContent = document.querySelector("main")
const cardsContainer = mainContent.children[0]

let result;
const placeCarData = async () => {
    let promise = new Promise(async (resolve, reject) => {
        let response = await fetch(USER_CARDS_API_URL);
        result =  await response.json();


        if (response.ok) {
            resolve(result);
        } else {
            reject(result);
        }

        promise.then(
            res => {
                for (cars of res) {
                    const carCard = document.createElement("div");
                    carCard.className = "car-card-container";


                    const createPic = (carType) => {
                        const picture = document.createElement("img");
                        picture.setAttribute("src", `../assets/${carType}`);
                        carCard.appendChild(picture);
                    }

                    switch (cars["carData"]["class"]) {
                        case "midsize car":
                        case "two seater":
                        case "minicompact car":
                        case "subcompact car":
                            createPic("DEF.svg");
                            break;
                        case "standard pickup truck":
                        case "small pickup truck":
                            createPic("SUV.svg");
                            break;
                        default:
                            createPic("VAN.svg");
                            break;
                    }
                    const carInfo = document.createElement("div");
                    carInfo.className = "car-info-container"
                    carCard.appendChild(carInfo);


                    const carName = document.createElement("h2");
                    carName.className = "car-name";
                    carName.innerHTML = `${cars["carData"]["make"]} ${cars["carData"]["model"]}`;
                    carInfo.appendChild(carName);

                    const carPrice = document.createElement("p");
                    carPrice.className = "car-price";
                    carPrice.innerHTML = `${cars["price"]} руб.`;
                    carInfo.appendChild(carPrice);

                    const picContainer = document.createElement("div")
                    picContainer.className = "pic-container"
                    carInfo.appendChild(picContainer);

                    const yearPicture = document.createElement("img");
                    yearPicture.className = "year-pic"
                    yearPicture.setAttribute("src", `../assets/year.svg`);
                    picContainer.appendChild(yearPicture);

                    const transPicture = document.createElement("img");
                    transPicture.className = "trans-pic"
                    transPicture.setAttribute("src", `../assets/transmission.svg`);
                    picContainer.appendChild(transPicture);

                    const infoContainer = document.createElement("div")
                    infoContainer.className = "info-container"
                    carInfo.appendChild(infoContainer)

                    const carYear = document.createElement("div");
                    carYear.className = "car-year";
                    carYear.innerHTML = `${cars["carData"]["year"]}`;
                    infoContainer.appendChild(carYear);

                    const carTrans = document.createElement("div");
                    carTrans.className = "car-trans";

                    if(cars["carData"]["transmission"] === "a") {
                        carTrans.innerHTML = "auto";
                    } else {
                        carTrans.innerHTML = "manual"
                    }

                    infoContainer.appendChild(carTrans);

                    const infoButton = document.createElement("button");
                    infoButton.setAttribute("data-id", cars["id"])
                    infoButton.className = "info-button";
                    infoButton.innerHTML = "Подробнее"
                    carInfo.appendChild(infoButton);
                    infoButton.addEventListener("click", () => {
                        for (car of res) {
                            if (car["id"] === infoButton.getAttribute("data-id")) {
                                openCard(car)
                            }
                        }
                    });
                    cardsContainer.append(carCard);
                }


            }
        )
    })
}
placeCarData()

const infoCard = mainContent.children[1];

const openCard = (obj) => {
    infoCard.style.display = "flex"

    const createPic = (carType) => {
        const picture = infoCard.children[0];
        picture.setAttribute("src", `../assets/${carType}`);
    }

    switch (obj["carData"]["class"]) {
        case "midsize car":
        case "two seater":
        case "minicompact car":
        case "subcompact car":
            createPic("DEF.svg");
            break;
        case "standard pickup truck":
        case "small pickup truck":
            createPic("SUV.svg");
            break;
        default:
            createPic("VAN.svg");
            break;
    }

    infoCard.children[1].children[0].children[0].children[0].innerHTML = `${obj["carData"]["make"]} ${obj["carData"]["model"]}`;
    infoCard.children[1].children[0].children[0].children[1].innerHTML = `Класс: ${obj["carData"]["class"]}`;
    infoCard.children[1].children[0].children[0].children[2].innerHTML = `Тип топлива: ${obj["carData"]["fuel_type"]}`;
    infoCard.children[1].children[0].children[0].children[3].innerHTML = `Цилиндры: ${obj["carData"]["cylinders"]}`;

    infoCard.children[1].children[0].children[1].children[0].innerHTML = `Цена: ${obj["price"]} руб.`;
    infoCard.children[1].children[0].children[1].children[1].innerHTML = `Год: ${obj["carData"]["year"]}`;
    infoCard.children[1].children[0].children[1].children[2].innerHTML = `Тип КПП: ${obj["carData"]["transmission"]}`;
    infoCard.children[1].children[0].children[1].children[3].innerHTML = `Привод: ${obj["carData"]["drive"]}`;





}








