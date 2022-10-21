import "./css/index.css"
import IMask from "imask"
// aula 3

const ccBgColor01 = document.querySelector("#app > section > div.cc-bg > svg > g > g:nth-child(2) > path")
const ccBgColor02 = document.querySelector("#app > section > div.cc-bg > svg > g > g:nth-child(1) > path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#2D57F2", "#436D99"],
    mastercard: ["#C69347", "#DF6F29"],
    amex: ["#29B3DF", "#68C647"],
    elo: ["#FF0000", "#2D42FF"],
    hipercard: ["#F22D2D", "#F22D2D"],
    default: ["black", "gray"]
  }
  ccBgColor01.setAttribute("fill", colors[type][0]);
  ccBgColor02.setAttribute("fill", colors[type][1]);
  ccLogo.setAttribute("src", `cc-${type}.svg`)

}

globalThis.setCardType = setCardType

const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

const expire = document.querySelector("#expiration-date")
const expirePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    }
  }
}
const expiretiondDateMasked = IMask(expire, expirePattern)

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: '0000 0000 0000 0000',
      regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
      cardtype: 'mastercard'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^4\d{0,15}/,
      cardtype: 'visa'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^62\d{0,14}/,
      cardtype: 'elo'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^3[47]\d{0,13}/,
      cardtype: 'amex'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
      cardtype: 'hipercard'
    },
    {
      mask: '0000 0000 0000 0000',
      cardtype: 'default',
    },
  ],

  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, '')
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    console.log(foundMask)
    return foundMask;
  }
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  alert("Cartão adicionado!!")
})

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
})


const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerText = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value)
})

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerText = code.length === 0 ? "123" : code
}

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardType)
  updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}

expiretiondDateMasked.on("accept", () => {
  uptadeExpiredDate(expiretiondDateMasked.value)
})

function uptadeExpiredDate(date) {
  const ccExpiration = document.querySelector(".cc-extra .value")
  ccExpiration.innerText = date.length === 0 ? "02/32" : date
}