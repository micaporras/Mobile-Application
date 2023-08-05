
const calendar = document.querySelector('.calendar'),
    date = document.querySelector('.date'),
    days_container = document.querySelector('.days'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    today_button = document.querySelector('.today-button'),
    event_day = document.querySelector('.event-day'),
    event_date = document.querySelector('.event-date'),
    events_container = document.querySelector('.events'),
    event_add = document.querySelector('.add-button');

    let today = new Date();
    let active_day;
    let month = today.getMonth();
    let year = today.getFullYear();

const months = [
    "January" ,
    "February" ,
    "March" ,
    "April" ,
    "May" ,
    "June" ,
    "July" ,
    "August" ,
    "September" ,
    "October" ,
    "November" ,
    "December" ,
    ];

let events_array = [];
getEvents();

function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    date.innerHTML = months[month] + ' ' + year;

        let days = "";

        for (let x = day; x > 0; x--) {
            days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
        }

            for (let i = 1; i <= lastDate; i++) {

                let event = false;
                events_array.forEach((event_object) => {
                    if (
                        event_object.day === i &&
                        event_object.month === month + 1 &&
                        event_object.year === year
                    ) {
                        event = true;
                    }
                })
                
                if (i === new Date().getDate() && 
                year === new Date().getFullYear() && 
                month === new Date().getMonth()) {

                    active_day = i;
                    getActiveDay(i);
                    updateEvents(i);

                    if (event) {
                        days += `<div class="day today active event">${i}</div>`;
                    }
                    else {
                        days += `<div class="day today active">${i}</div>`;
                    }
                }
                    else {
                        if (event) {
                            days += `<div class="day event">${i}</div>`;
                        }
                        else {
                            days += `<div class="day">${i}</div>`;
                        }
                }   
            }

            for (let j = 1; j <= nextDays; j++) {
                days += `<div class="day next-date">${j}</div>`;
            }


                days_container.innerHTML = days;

                addListner();
    }

initCalendar();

function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

prev.addEventListener('click', prevMonth);
next.addEventListener('click', nextMonth)

today_button.addEventListener('click', () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});


const add_event = document.querySelector('.add-events');
const open_add = document.querySelector('.add-event-wrapper');
const close_add = document.querySelector('.close');
const close_event = document.querySelector('.exit');
const event_window = document.querySelector('.right');
const add_event_name = document.querySelector('.event-name');
const days = document.querySelectorAll('.day');

add_event.addEventListener('click', () => {
    open_add.classList.toggle('active');
});


close_add.addEventListener('click', () => {
    open_add.classList.remove('active');
});

close_event.addEventListener('click', () => {
    event_window.classList.remove('active');
});

add_event_name.addEventListener('input', (e) => {
    add_event_name.value = add_event_name.value.slice(0,50);
});


function addListner() {
    const days = document.querySelectorAll('.day');
    days.forEach((day) => {
        day.addEventListener('click', (e) => {
            active_day = Number(e.target.innerHTML);

            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));
            event_window.classList.toggle('active');

            days.forEach((day) => {
                day.classList.remove('active');
            });

            if (e.target.classList.contains('prev-date')) {
                prevMonth();

                setTimeout(() => {
                    const days = document.querySelectorAll('.day');

                    days.forEach((day) => {
                        if (!day.classList.contains('prev-date') && day.innerHTML ===
                        e.target.innerHTML) {
                            day.classList.add('active');
                        }
                    });
                }, 100);
            } else if (e.target.classList.contains('next-date')) {
                nextMonth();

                setTimeout(() => {
                    const days = document.querySelectorAll('.day');

                    days.forEach((day) => {
                        if (!day.classList.contains('next-date') && day.innerHTML ===
                        e.target.innerHTML) {
                            day.classList.add('active');
                        }
                    });
                }, 100);
            } else {
                e.target.classList.add('active');
            }
        });
    });
}



function getActiveDay(date) {
    const day = new Date(year, month, date);
    const day_name = day.toString().split(" ")[0];
    event_day.innerHTML = day_name;
    event_date.innerHTML = date + " " + months[month] + " " + year;
}   

function updateEvents(date) {
    let events = "";
    events_array.forEach((event) => {
        if (
            date === event.day &&
            month + 1 === event.month &&
            year === event.year
        ) {
            event.events.forEach((event) => {
                events += `
                <div class="event">
                    <div class="title">
                        <i class="fa-solid fa-star"></i>
                        <h3 class="event-title">${event.title}</h3>
                    </div>
                </div>
                `;
            });
        }
    });

    if (events === "") {
        events = `<div class="no-event">
                    <h3>No Events</h3>
                    </div>`;
    }
    
    events_container.innerHTML = events;
    saveEvents();
}

event_add.addEventListener('click', () => {
    const event_title = add_event_name.value;

    if (event_title === "") {
        alert("Please fill up the field.");
        return;
    }

    const new_event = {
        title: event_title
    };

    let event_added = false;

    if (events_array.length > 0) {
        events_array.forEach((item) => {
            if (
                item.day === active_day &&
                item.month === month + 1 &&
                item.year === year
            ) {
                item.events.push(new_event);
                event_added = true;
            }
        });
    }

    if (!event_added) {
        events_array.push({
            day: active_day,
            month: month + 1,
            year: year,
            events: [new_event]
        });
    }

    open_add.classList.remove('active');

    add_event_name.value = "";

    updateEvents(active_day);

    const active_day_element = document.querySelector('.day.active');
    if (!active_day_element.classList.contains('event')) {
        active_day_element.classList.add('event');
    }
});

events_container.addEventListener('click', (e) => {
    if (e.target.classList.contains('event')) {
        const event_name = e.target.children[0].children[1].innerHTML;
        events_array.forEach((event) => {
            if (
                event.day === active_day &&
                event.month === month + 1 &&
                event.year === year
            ) {
                event.events.forEach((item, index) => {
                    if (item.title === event_name) {
                        event.events.splice(index, 1);
                    }
                });

                if (event.events.length === 0) {
                    events_array.splice(events_array.indexOf(event), 1);

                    const active_day_element = document.querySelector('.day.active');
                    if (active_day_element.classList.contains('event')) {
                        active_day_element.classList.remove('event');
                    }
                }
            }
        });
        updateEvents(active_day);
    }
});


function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events_array));
}

function getEvents() {
    if (localStorage.getItem('events' === null)) {
        return;
    }
        events_array.push(... JSON.parse(localStorage.getItem('events')));

}

