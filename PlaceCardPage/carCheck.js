const CAR_API_URL = "https://api.api-ninjas.com/v1/cars?limit=2000&"
const USER_CARDS_API_URL = "https://671ca9cf09103098807ac514.mockapi.io/api/v1/userCarCards"

const carName = document.getElementById("car-name")
const carModel = document.getElementById("car-model")
const carDrive = document.getElementById("car-drive")
const carTransmission = document.getElementById("car-transmission")
const carPrice = document.getElementById("car-price")

const nameButton = document.getElementById("car-name-button")
const modelButton = document.getElementById("car-model-button")
const driveButton = document.getElementById("car-drive-button")
const transmissionButton = document.getElementById("car-transmission-button")
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


let narrowerModelList = [];
const checkCarModel = () => {
    if (carModel.disabled === false) {
        carModel.disabled = true;
        modelButton.innerHTML = "Изменить";
    } else {
        carModel.disabled = false;
        modelButton.innerHTML = "Подтвердить";
        narrowerModelList = [];
        return true;
    }

    for (let models of activeModel) {
        if (models["model"].includes(carModel.value)) {
            document.body.children[1].children[2].style.display = "block";
            carModel.value = models["model"];
            modelButton.style.color = "green";
            narrowerModelList.push(models);
        } else {
            // modelButton.style.color = "red";
            // document.body.children[1].children[2].style.display = "none";
        }
    }
    console.log(narrowerModelList);
}




const checkCarDrive = () => {
    if(carDrive.disabled === false) {
        carDrive.disabled = true;
        driveButton.innerHTML = "Изменить";
    } else {
        setTimeout(() => carDrive.disabled = false, 1500);
        driveButton.innerHTML = "Подтвердить";
        checkCarModel();
        return true;
    }

    for(let models of narrowerModelList) {
        if (models["drive"].includes(carDrive.value)) {
            document.body.children[1].children[3].style.display = "block";
            carDrive.value = models["drive"];
            driveButton.style.color = "green";
        } else {
            driveButton.style.color = "red";
            delete narrowerModelList[models];
        }
    }
    console.log(narrowerModelList);
}



let narrowerModelListYear = [];
const checkCarTransmission = () => {
    if (carTransmission.disabled === false) {
        carTransmission.disabled = true;
        transmissionButton.innerHTML = "Изменить";
    } else {
        carTransmission.disabled = false;
        transmissionButton.innerHTML = "Подтвердить";
        checkCarDrive();
        return true;
    }


    for (let models of narrowerModelList) {
        if (models["year"] == carTransmission.value) {
            document.body.style.backgroundColor = "green";
            carTransmission.value = models["year"];
            transmissionButton.style.color = "green";
            narrowerModelListYear.push(models);
        } else {
            transmissionButton.style.color = "red";
        }
    }
    console.log(narrowerModelListYear);
}

const setCarPrice = () => {
    if (carPrice.disabled === false) {
        carPrice.disabled = true;
        priceButton.innerHTML = "Изменить";
        userCarPrice = carPrice.value;
        return userCarPrice;
    } else {
        carPrice.disabled = false;
        priceButton.innerHTML = "Подтвердить";
        return true;
    }
}

const sendCarData = () => {
    const sendData = new Promise(async (resolve, reject) => {
        let userData = {
            price: userCarPrice,
            carData: narrowerModelListYear[0]
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
driveButton.addEventListener("click", checkCarDrive)
transmissionButton.addEventListener("click", checkCarTransmission)