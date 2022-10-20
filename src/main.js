import "./css/index.css"
import IMask from "imask"
// aula 3

const ccBgColor01 = document.querySelector(".cc-bg  svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg  svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#2D57F2", "#436D99"],
    mastercard: ["#C69347", "#DF6F29"],
    amex: ["#29B3DF", "#68C647"],
    elo: ["#FF0000", "#2D42FF"],
    hipercard: ["#F22D2D", "#F22D2D"],
  }
  ccBgColor01.setAttribute("fill", colors[type][0]);
  ccBgColor01.setAttribute("fill", colors[type][1]);
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
const expireMasked = IMask(expire, expirePattern)

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
      cardtype: 'unionpay'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^3[47]\d{0,13}/,
      cardtype: 'american express'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
      cardtype: 'discover'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
      cardtype: 'diners'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^(?:2131|1800)\d{0,11}/,
      cardtype: 'jcb15'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^(?:35\d{0,2})\d{0,12}/,
      cardtype: 'jcb'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
      cardtype: 'maestro'
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
const cardNumberMasker = IMask(cardNumber, cardNumberPattern)