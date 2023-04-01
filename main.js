const cardContainer = document.querySelector('.card-container')
const cardNumberInfo = document.querySelector('.card-number-info')

cardContainer.addEventListener('click', () => {
  cardContainer.classList.toggle('flipped')
})

cardNumberInfo.innerHTML = cardNumberInfo.innerHTML.replace(/(.{4})/g, '$1 ')