import "./css/index.css"

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


