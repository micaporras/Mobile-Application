/*Get the date*/
var date = new Date();
console.log(date)

/*Extract the current date*/
var currentMonth = date.getMonth();
var currentDay = date.getDay();
var currentDate = date.getDate();
var currentYear = date.getFullYear();

console.log(currentMonth); // current month
console.log(currentDay); //day of the week
console.log(currentDate); // current date/number
console.log(currentYear); // current year

// date info
var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    ];

// set current month
var title = document.getElementById('title');
title.innerHTML = months[currentMonth];

// update the calendar info
var habitTitle = document.getElementById('habitTitle');
const habitName = document.querySelector('.habitName');
const habitInput = document.querySelector('.habitInput');
const confirm = document.querySelector('.check');

habitInput.onclick = function () {
    habitName.classList.toggle('active')
}

confirm.onclick = () => {
    habitName.classList.remove('active')
    changeName()
    saveName()
}

function changeName () {
    let habit = ''
    habit = habitInput.value
    habitTitle.innerHTML = habit
}

function saveName () {
    localStorage.setItem('name', habitName.innerHTML)
}

// set the total days
var daysInTheMontList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var daysInThisMonth = daysInTheMontList[currentMonth];

var daysCompleted = 0;
var totalDays = document.getElementById('totalDays');

//setup calendar days
var dayCount = 0;
var rowCount = 0;
var days = document.getElementsByClassName('days');
for(var i=0; i < days.length; i++){
    var day = days[rowCount].getElementsByClassName('day');
    for(var j=0; j < day.length; j++){
        if(dayCount == currentDate - 1){
            day[j].setAttribute('style', 'color:rgb(234, 1, 144)');
            day[j].setAttribute('style', 'border:2px solid aqua');
        }

        if (dayCount < daysInThisMonth){
            day[j].innerHTML = dayCount + 1;
            day[j].setAttribute('id', 'day' + (dayCount + 1));
            dayCount++;
        }else{
            day[j].innerHTML = '';
            day[j].setAttribute('style', 'background-color:white');
        }
    }
    rowCount++;
}

// initialize completed array
var completed = new Array(31);
for (var i = 0; i < dayCount; i++) {
    var tempString = 
    '' + (currentMonth + 1) + '-' + (i + 1) + '-' + currentYear;
    console.log('storing date: ' + tempString);
    var tempDay = localStorage.getItem(tempString);
    console.log(tempDay);
    if (tempDay== null || tempDay == 'false'){
        localStorage.setItem(tempString, 'false');
    } else if (tempDay == 'true') {
        daysCompleted++;
    }
    totalDays.innerHTML = daysCompleted + '/' + daysInThisMonth;
}

console.log('completed array: ' + completed);
console.log('total days completed: ' + daysCompleted);

// check storage and update completed array
for (var i = 0; i < currentDate; i++){
    var tempString = 
    '' + (currentMonth+ 1) + '-' + (i + 1) + '-' + currentYear;
    console.log(tempString);

    var chosenDay = localStorage.getItem(tempString);
    console.log(i + 1 + ': ' + chosenDay);
    var chosenDayDiv = document.getElementById('day' + (i + 1));
    if (chosenDay === 'true' || chosenDay == currentDate - 1) {
        chosenDayDiv.style.backgroundColor = 'aqua';
    } else if (chosenDay === 'false') {
        chosenDayDiv.style.backgroundColor = 'white';
    }
}

// update completed on calendar
var dayDivs = document.querySelectorAll('.day');
for (var i =0; i<currentDate;i++){
    dayDivs[i].onclick = function (e) {
        var num = e.target.innerText;
        var selectedDate = document.getElementById(e.target.id);
        var storageString = 
        '' + (currentMonth + 1) + '-' + num + '-' + currentYear;

        if(localStorage.getItem(storageString) === 'false'){
            selectedDate.style.backgroundColor = 'aqua';
            localStorage.setItem(storageString, true);
            daysCompleted++;
        }else if(localStorage.getItem(storageString) === 'true'){
            selectedDate.style.backgroundColor = 'white';
            localStorage.setItem(storageString, false);
            daysCompleted--;
        }
        totalDays.innerHTML = daysCompleted + '/' + dayCount;
        console.log(daysCompleted, currentDate);
        if(daysCompleted === currentDate){
            alert('great progress');
        }
    }
}

// reset
var resetButton = document.getElementById('resetButton');
resetButton.onclick = function () {
    for (var i = 0; i < dayCount; i++) {
        var tempStrings = 
        '' + (currentMonth + 1) + '-' + (i + 1) + '-' + currentYear;
        console.log(tempStrings);
        localStorage.setItem(tempStrings, 'false');
        var curDay = document.getElementById('day' + (i + 1));
        curDay.style.backgroundColor = 'white';
    }
    daysCompleted = 0;
    totalDays.innerHTML = daysCompleted + '/' + daysInThisMonth;

    habitName.classList.toggle('active')

};