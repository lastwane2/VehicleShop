const USER_CARDS_API_URL = "https://671ca9cf09103098807ac514.mockapi.io/api/v1/userCarCards"


const mainContent = document.querySelector("main")
const cardsContainer = mainContent.children[0]

const placeCarData = async () => {
    let promise = new Promise(async (resolve, reject) => {
        let response = await fetch(USER_CARDS_API_URL);
        let result =  await response.json();

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
                    carCard.setAttribute("data-id", cars["id"])

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
                    infoButton.className = "info-button";
                    infoButton.innerHTML = "Подробнее"
                    carInfo.appendChild(infoButton);



                    cardsContainer.append(carCard);
                }
            }
        )
    })
}
placeCarData()



