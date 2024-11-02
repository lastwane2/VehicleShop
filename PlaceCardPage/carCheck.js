const CAR_API_URL = "https://api.api-ninjas.com/v1/cars?limit=2000&"
const USER_CARDS_API_URL = "https://671ca9cf09103098807ac514.mockapi.io/api/v1/userCarCards"

const carName = document.getElementById("car-name")
const carModel = document.getElementById("car-model")
const carDrive = document.getElementById("car-drive")
const carTransmission = document.getElementById("car-transmission")
const carPrice = document.getElementById("car-price")

const nameButton = document.getElementById("car-name-button")
const modelButton = document.getElementById("car-model-button")
const acceptButton = document.getElementById("accept-button")
const priceButton = document.getElementById("car-price-button")
const sendDataButton = document.getElementById("car-send-button")

let activeModel;

const checkCarName = async () => {
    if(carName.disabled === false) {
        carName.disabled = true;
        nameButton.innerHTML = "Изменить";
    } else {
        carName.disabled = false;
        nameButton.innerHTML = "Подтвердить";
        return true;
    }

    let response = await fetch(CAR_API_URL + "make=" + carName.value, {
        headers: { 'X-Api-Key': 'y4QasOyHaG5JduQUJCG77Q==D0aK97jfIxLxcB5m'},
        contentType: 'application/json',
    })
    let result = await response.json()


    if(result.length > 0){
        document.body.children[1].children[1].style.display = "block";
        carName.value = result[0]["make"];
        nameButton.style.color = "green";
        activeModel = result;
    } else {
        document.body.children[1].children[1].style.display = "none";
        nameButton.style.color = "red";
    }
    console.log(activeModel);
}


let arrAfterModel = [];
const checkCarModel = () => {
    if (carModel.disabled === false) {
        carModel.disabled = true;
        modelButton.innerHTML = "Изменить";
    } else {
        carModel.disabled = false;
        modelButton.innerHTML = "Подтвердить";
        arrAfterModel = [];
        return true;
    }

    arrAfterModel = activeModel.filter((car) => car["model"].includes(carModel.value));
    if (arrAfterModel.length > 0) {
        document.body.children[1].children[2].style.display = "block";
        document.body.children[1].children[3].style.display = "block";
        document.body.children[1].children[4].style.display = "block";
        carModel.value = arrAfterModel[0]["model"];
        modelButton.style.color = "green";
    } else {
        modelButton.style.color = "red";
        document.body.children[1].children[2].style.display = "none";
        document.body.children[1].children[3].style.display = "none";
        document.body.children[1].children[4].style.display = "none";

    }

    console.log(arrAfterModel);
}

let arrAfterAllData = [];
const checkAllCarData = () => {
    if (carDrive.disabled === false) {
        carDrive.disabled = true;
        carTransmission.disabled = true;
        acceptButton.innerHTML = "Изменить";
    } else {
        carDrive.disabled = false;
        carTransmission.disabled = false;
        acceptButton.innerHTML = "Подтвердить";
        arrAfterAllData = [];
        return true;
    }

    arrAfterAllData = arrAfterModel.filter((car) => {
        return (car["drive"].includes(carDrive.value) && car["year"] == carTransmission.value)
    });
    if (arrAfterAllData.length > 0) {
        document.body.children[1].children[5].style.display = "block";
        acceptButton.style.color = "green";
    } else {
        acceptButton.style.color = "red";
        document.body.children[1].children[5].style.display = "none";
    }
    console.log(arrAfterAllData);
}


const setCarPrice = () => {
    if (carPrice.disabled === false) {
        carPrice.disabled = true;
        priceButton.innerHTML = "Изменить";
        userCarPrice = carPrice.value;
        document.body.children[1].children[6].style.display = "block";
        return userCarPrice;

    } else {
        carPrice.disabled = false;
        priceButton.innerHTML = "Подтвердить";
        document.body.children[1].children[6].style.display = "none";
        return true;
    }
}

const sendCarData = () => {
    const sendData = new Promise(async (resolve, reject) => {
        let userData = {
            price: userCarPrice,
            carData: arrAfterAllData[0]
        };

        let response = await fetch(USER_CARDS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(userData)
        });

        if(response.ok) {
            resolve(response);
        } else {
            reject(response);
        }

        sendData.then(
            result => {
                alert('данные отправлены');
                console.log(result);
            },
            err => {
                alert('ошибка');
                console.log(err);
            }
        )
    })
}

sendDataButton.addEventListener("click", sendCarData)
priceButton.addEventListener("click", setCarPrice);
nameButton.addEventListener("click", checkCarName)
modelButton.addEventListener("click", checkCarModel)
acceptButton.addEventListener("click", checkAllCarData)