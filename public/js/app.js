console.log('client side js is loaded!')

//fetch forecast information
//fetch is fn
const weatherForm = document.querySelector('#form');
const input = document.querySelector('.input')

const messageOne = document.querySelector('#msg1')
const messageTwo = document.querySelector('#msg2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = input.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) =>{

            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = 'Location: ' + data.location;
                messageTwo.textContent = 'Forecast: ' + data.forecast + 'Temperature outside is ' + data.temperature + ' with ' + data.chanceOfRain + ' chance of rain.'
                console.log(data.location)
                console.log(data.forecast)
                console.log(data.temperature)
                console.log(data.chanceOfRain)
            }
        })
    })
    
})