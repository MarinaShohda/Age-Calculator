const dayInput = document.querySelector('.day');
const monthInput = document.querySelector('.month');
const yearInput = document.querySelector('.year');

const dayBox = document.querySelector('.dayBox');
const monthBox = document.querySelector('.monthBox');
const yearBox = document.querySelector('.yearBox');

const dayOutput = document.querySelector('.outputDay');
const monthOutput = document.querySelector('.outputMonth');
const yearOutput = document.querySelector('.outputYear');

const btn = document.querySelector('.btn');

const currentYear = new Date().getFullYear();



btn.addEventListener('click', (e)=> {
    e.preventDefault();

    const day = dayInput.value;
    const month = monthInput.value;
    const year = yearInput.value;


    const sendWarning = (box) => {
        box.querySelector('.label').classList.add('warning');
        box.querySelector('.input').classList.add('warning-border');
        box.querySelector('.invisable').classList.add('warning-msg');
    }
    
    const removeWarning = (box) => {
        box.querySelector('.label').classList.remove('warning');
        box.querySelector('.input').classList.remove('warning-border');
        box.querySelector('.invisable').classList.remove('warning-msg');
    }
    const calculateAge = (day, month, year) => {
        const currentDay = new Date().getDate()   
        const currentMonth = new Date().getMonth() + 1

        year = currentYear - year;
        month = currentMonth - month;
        day = currentDay - day;
        if (day < 0 ){
            day = 30 - Math.abs(day)
        }
        if (month < 0 ){
            month = 12 - Math.abs(month)
            year = year - 1
        }
        dayOutput.innerHTML = day;
        monthOutput.innerHTML = month;
        yearOutput.innerHTML = year;
    }

    // clear previous warning
    removeWarning(dayBox)
    removeWarning(monthBox)
    removeWarning(yearBox)


   // check if any of the input fields are empty and send warning accordingly
    if (!day){
        sendWarning(dayBox)
        dayBox.querySelector('.invisable').innerHTML = 'This field is required';
    }
    if (!month) {
        sendWarning(monthBox)
        monthBox.querySelector('.invisable').innerHTML = 'This field is required';
    }
    if (!year) {
        sendWarning(yearBox)
        yearBox.querySelector('.invisable').innerHTML = 'This field is required';
    }
    
    // if all fields were entered
    if (day && month && year){
        //  check if input is valid, calculate age
        if (moment(`${year}-${month}-${day}`).isValid()) {
            // if date is valid, check for future year and then send to caluclate age
            if (year > currentYear){
                sendWarning(yearBox);
                yearBox.querySelector('.invisable').innerHTML = 'Must be a valid year';
                return;
            }
            calculateAge(day, month, year);
            
        }
        // identify which is not valid and return error msg accordingly 
        else {
            
            if (day > 31 || day < 1){
                sendWarning(dayBox)
                dayBox.querySelector('.invisable').innerHTML = 'Must be a valid day';
            }
            if (month > 12 || month < 1){
                sendWarning(monthBox);
                monthBox.querySelector('.invisable').innerHTML = 'Must be a valid month';
            }
            if (year > currentYear || year < 1){
                sendWarning(yearBox);
                yearBox.querySelector('.invisable').innerHTML = 'Must be a valid year';
            }
        }
    }

})



