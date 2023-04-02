const cardContainer = document.querySelector('.card-container')
const cardNumberInfo = document.querySelector('.card-number-info')
const cardNumberInput = document.querySelector('#card-number')
const cardHolderInput = document.querySelector('#cardholder-name-input')
const validityInput = document.querySelector('#validity-input')
const cvvInput = document.querySelector('#cvv-input')

cardContainer.addEventListener('click', () => {
  cardContainer.classList.toggle('flipped')
})

cardNumberInput.addEventListener('keydown', function(e) {
  if (!/^\d+$/.test(e.key) 
  && e.key !== 'Backspace' 
  && e.key !== 'Delete' 
  && e.key !== 'ArrowLeft' 
  && e.key !== 'ArrowRight') {
    e.preventDefault();
  }
})

cardNumberInput.addEventListener('input', (e) => {
  let inputValue = e.target.value

  if(inputValue == '') {
    cardNumberInfo.innerHTML = '0000 0000 0000'
  } else {
    cardNumberInfo.innerHTML = inputValue.replace(/(.{4})/g, '$1 ')
  }
})

cardNumberInput.addEventListener('change', formateCardNumberValue)
function formateCardNumberValue() {
  const formattedValue = cardNumberInput.value.replace(/(.{4})/g, '$1 ')
  cardNumberInput.value = formattedValue
}

cardHolderInput.addEventListener('keydown', (e) => {
  if (!/^[a-zA-Z\s]+$/.test(e.key)) {
    e.preventDefault();
  }
})

cardHolderInput.addEventListener('input', (e) => {
  const cardholderName = document.querySelector('.name')
  let inputValue = e.target.value

  if (inputValue.trim() !== '') {
    cardholderName.innerHTML = inputValue
  } else {
    cardholderName.innerHTML = 'Seu nome aqui'
  }
})

validityInput.addEventListener('keydown', (e) => {
  let inputValue = e.target.value
  const regex = /^\d+$/
  
  if(!regex.test(e.key) && e.key !== 'Backspace') {
    e.preventDefault()
  }

  if (inputValue.length === 2 && e.key !== 'Backspace') {
    e.target.value = inputValue + '/'
  }
  
})

validityInput.addEventListener('input', (e) => {
  const date = document.querySelector('.date')
  const validityInputEmptyImg = `
  <img src="./assets/empty-validity-input-img.svg" />
  `
  let inputValue = e.target.value

  if (inputValue !== '') {
    date.innerHTML = inputValue
  } else {
    date.innerHTML = validityInputEmptyImg
  }
})

cvvInput.addEventListener('input', (e) => {
  const cvv = document.querySelector('.cvv-info')
  let inputValue = e.target.value

  const maxLength = 3
        
  if (cvvInput.value.length > maxLength) {
      cvvInput.value = inputValue.slice(0, maxLength)
  }

  cvv.innerHTML = cvvInput.value
})


