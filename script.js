let names = [];
let prices = [];
let counter = [];

function scrollableHeader() {
    document.getElementById('basketContainer').style.top = Math.max(0, 70 - window.pageYOffset) + "px";
}

/**
 * prove if the dish allready exists in the array,
 * if no, it add to the two arrays
 * if yes, it increase the number of the dish
 * 
 * @param {string} name of the selected dish
 * @param {string} price of the selected dish
 */
function addDish(name, price) {
    let position = names.indexOf(name)
    if (position == -1) {
        names.push(name);
        prices.push(price);
        counter.push(1)
    }
    else {
        counter[position]++;
    }
    displayOrderedDishes()
}

/**
 * the dish is allready ordered and the customer take more of them
 * so the amount will be increased
 * @param {integer} position index of the selected item 
 */
function increaseDishNumber(position) {
    counter[position]++;

    displayOrderedDishes()
}

/**
 * prove if the dish allready exists in the array,
 * if no, it delete it out of the two arrays
 * if yes, it reduce only the amount of the dishes
 * 
 * @param {integer} position index of the selected item 
 */
function reduceDish(position) {
    if (counter[position] == 1) {

        names.splice(position, 1);
        prices.splice(position, 1);
        counter.splice(position, 1);
    }
    else {
        counter[position]--;
    }
    displayOrderedDishes()
}

/**
 * delete the complete dish
 * 
 * @param {integer} position index of the selected item 
 */
function deleteAll(position) {
    names.splice(position, 1);
    prices.splice(position, 1);
    counter.splice(position, 1);

    displayOrderedDishes()
};

/**
 * check if basket is empty or not
 */
function checkBasketAmount() {
    if (names.length < 1) {
        document.getElementById('orderedDishBlank').style.display = "flex";
        document.getElementById('delieverSum').style.display = "none";
    } else {
        document.getElementById('orderedDishBlank').style.display = "none";
        document.getElementById('delieverSum').style.display = "flex";
    }
}

/**
 * shows the amount of the dishes with sum
 * shows the hole amount with the transport with funalSum
 * @param {double} sum 
 * @param {double} finalSum 
 */
function showSum(sum, finalSum){
     document.getElementById('sum').innerHTML = '';
    document.getElementById('sum').innerHTML += `
    ${((sum.toFixed(2)).toString()).replace(".", ",")} €
    `
    document.getElementById('finalSum').innerHTML = '';
    document.getElementById('finalSum').innerHTML += `
   ${((finalSum.toFixed(2)).toString()).replace(".", ",")} €
   `
}

/**
 * shows the minimum amount container depending on the sum
 * @param {double} sum 
 */
function checkMinimumOrderamount(sum){
     if (sum == 0) {
        document.getElementById('minimumOrderNon').style.display = "flex";
        document.getElementById('minimumOrder').style.display = "none";
        document.getElementById('minimumMoney').innerHTML = '';
    } else if (sum < 10) {
        document.getElementById('minimumOrderNon').style.display = "flex";
        document.getElementById('minimumOrder').style.display = "none";
        document.getElementById('minimumMoney').innerHTML = '';
        document.getElementById('minimumMoney').innerHTML += `
     <span class ="min">Benötigter Betrag, um den Mindestbestellwert zu erreichen</span>
     <div>${(((10 - sum).toFixed(2)).toString()).replace(".", ",")} €</div>
     `
    }
    else {
        document.getElementById('minimumOrderNon').style.display = "none";
        document.getElementById('minimumOrder').style.display = "flex";
        document.getElementById('minimumMoney').innerHTML = '';
    }
}

/**
 * draw the basket
 */
function displayOrderedDishes() {
    let sum = 0;
    let finalSum = 0;
    let singleSum;
    let orderedDishes = document.getElementById('orderedDish');
    checkBasketAmount();
    orderedDishes.innerHTML = '';
    for (let i = 0; i < names.length; i++) {
        singleSum = (((prices[i] * counter[i]).toFixed(2)).toString()).replace(".", ",");
        sum += prices[i] * counter[i];
        finalSum = sum + 1;
        orderedDishes.innerHTML += `
        <div class ="singleDishContainer">
            <div class = "counter">${counter[i]}x</div>
            <span class ="names">${names[i]}</span>
            <div class = "commandBar">
                 <div class = "commandIcon" onclick = "reduceDish(${i})">-</div>
                 <div class = "commandIcon" onclick = "increaseDishNumber(${i})">+</div>
                 <div ><img src ="img/edit-2-16.png"></div>
            </div>
            <span class="prices">${singleSum}€</span>
            <div class ="commandIconDelete"onclick = "deleteAll(${i})"><img src ="img/trash-9-16.png"></div><br>
        </div>
             `
    };
    showSum(sum, finalSum);
    checkMinimumOrderamount(sum);
};
