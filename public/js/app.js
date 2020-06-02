const Weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

Weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.Error)
            {
                messageOne.textContent = data.Error
            }
            else
            {
                messageOne.textContent = data.Place
                messageTwo.textContent = data.Forecast
            }
        })
    })

})