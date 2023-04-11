const cardContainer = document.querySelector('.card-container')
const cardNumberInfo = document.querySelector('.card-number-info')
const cardNumberInput = document.querySelector('#card-number')
const cardHolderInput = document.querySelector('#cardholder-name-input')
const validityInput = document.querySelector('#validity-input')
const cvvInput = document.querySelector('#cvv-input')
const addCardBtn = document.querySelector('.add-card')
const cvvImg = document.querySelector('.cvv-wrapper img')

cardContainer.addEventListener('click', addAnimationOnCard)
function addAnimationOnCard() {
  cardContainer.classList.toggle('flipped')
}

const acceptOnlyNumbers = /^\d+$/

cardNumberInput.addEventListener('keydown', (e) => {
  if (!acceptOnlyNumbers.test(e.key) 
  && e.key !== 'Backspace' 
  && e.key !== 'Delete' 
  && e.key !== 'ArrowLeft' 
  && e.key !== 'ArrowRight') {
    e.preventDefault();
  }
})

cardNumberInput.addEventListener('input', (e) => {
  let inputValue = e.target.value
  const firstDigit = inputValue.charAt(0)
  const addSpaceEveryFourCharacter = /(.{4})/g

  if(inputValue == '') {
    cardNumberInfo.innerHTML = '0000 0000 0000 0000'
  } else {
    cardNumberInfo.innerHTML = inputValue.replace(addSpaceEveryFourCharacter, '$1 ')
    detectCardType(firstDigit)
  }
})

let cardTypes = {
  elo: '<img src="./assets/elo-card.svg" alt="Ícone do cartão Elo" />',
  mastercard: '<img src="./assets/mastercard-card.svg" alt="Ícone do cartão MasterCard" />',
  visa: '<img src="./assets/visa-card.svg" alt="Ícone do cartão Visa"/>'
}

function detectCardType(firstDigit) {
  const cardTypeDiv = document.querySelector('.card-type')

  if(firstDigit >= 0 && firstDigit <= 3) {
    cardTypeDiv.innerHTML = cardTypes.elo
  } else if (firstDigit >= 4 && firstDigit <= 6) {
    cardTypeDiv.innerHTML = cardTypes.mastercard
  } else {
    cardTypeDiv.innerHTML = cardTypes.visa
  }
}

cardNumberInput.addEventListener('change', showErrorMessage)
function showErrorMessage() {
  const errorMessage = document.querySelector('.error-message')

  if(cardNumberInput.value.length < 16 && cardNumberInput.value !== '') {
    cardNumberInput.classList.add('error')
    errorMessage.style.display = 'flex'
  } else {
    cardNumberInput.classList.remove('error')
    errorMessage.style.display = 'none'
  }
}

cardHolderInput.addEventListener('keydown', (e) => {
  const onlyLetters = /^[a-zA-Z\s]+$/

  if (!onlyLetters.test(e.key)) {
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

function formatDateValue() {
  IMask(validityInput, {
    mask: 'MM{/}AA',
    blocks: {
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 31,
      },
      AA: {
        mask: IMask.MaskedRange,
        from: String(new Date().getFullYear()).slice(2),
        to: String(new Date().getFullYear() + 10).slice(2)
      }
    }
  })

  return validityInput.value
}

validityInput.addEventListener('input', () => {
  const date = document.querySelector('.date')
  const validityInputEmptyImg = `
  <img src="./assets/empty-validity-input-img.svg" />
  `
  let inputValue = formatDateValue()

  if (inputValue !== '') {
    date.innerHTML = inputValue
  } else {
    date.innerHTML = validityInputEmptyImg
  }
})

const maxLength = 3

cvvInput.addEventListener('input', (e) => {
  const cvv = document.querySelector('.cvv-info')
  let inputValue = e.target.value
        
  if (cvvInput.value.length > maxLength) {
      cvvInput.value = inputValue.slice(0, maxLength)
  }

  cvv.innerHTML = cvvInput.value
})

cvvInput.addEventListener('focus', () => {
  addAnimationOnCard()
})

cvvInput.addEventListener('blur', () => {
  cardContainer.classList.remove('flipped')
})

const myInputs = [cardNumberInput, cardHolderInput, validityInput, cvvInput]

myInputs.forEach((input) => {
  input.addEventListener('input', isActive)
})

function isActive() {
  if(
    cardNumberInput.value.length === 16 &&
    cardHolderInput.value !== '' &&
    validityInput.value.length === 5 &&
    cvvInput.value.length === maxLength
  ) {
    addCardBtn.disabled = false
  } else {
    addCardBtn.disabled = true
  }
}

const secondsTofinishLoading = 1500 // 1.5 seconds
const secondsToMessageDisappear = 4000 // 4 seconds

addCardBtn.addEventListener('click', () => {
  const successfulMessage = document.querySelector('#successful-message')
  addCardBtn.classList.add('loading')

  setTimeout(() => {
    addCardBtn.classList.remove('loading')
    successfulMessage.style.display = 'initial'
  }, secondsTofinishLoading)

  setTimeout(() => {
    successfulMessage.style.display = 'none'
  }, secondsToMessageDisappear)
})

const cvvDescription = document.querySelector('.cvv-description')

cvvImg.addEventListener('click', showCvvDescription)
function showCvvDescription() {
  const display = cvvDescription.style.display == 'none' ? 'initial' : 'none'
  cvvDescription.style.display = display
}

window.addEventListener('click', (e) => {
  if(e.target !== cvvImg && e.target !== cvvDescription) {
    cvvDescription.style.display = 'none'
  }
})
