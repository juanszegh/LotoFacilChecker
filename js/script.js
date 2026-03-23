import { $ } from "./util.js"
const API_URL = "https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/"
let jogo_atual = null
let numeros_map = {}


document.addEventListener('DOMContentLoaded', async () => {
    await init()
    $("#btn_atualizar").addEventListener('click', async () =>{
        await init()
    })
});



async function init()
{

    jogo_atual = await (await fetch(API_URL)).json()
    $("#data_jogo").textContent = jogo_atual.dataApuracao
    $("#numeros_jogo").innerHTML = ""
    jogo_atual.listaDezenas.forEach(n => {
        $("#numeros_jogo").innerHTML += `<p>${n}</p>`
        numeros_map[n] = true
    });
    const div_jogos = $("#jogos")
    div_jogos.innerHTML = ""
    jogos.forEach((j, i) => {
        let acertos = 0
        
        const div_jogo_atual = document.createElement("div")
        div_jogo_atual.className = "jogo"
        div_jogos.innerHTML += `<h2>Jogo nº ${i + 1}</h2>`
        j.forEach(n => {
            const numero = document.createElement("p")
            numero.innerHTML = n
            if (numeros_map[n])
            {
                numero.style.backgroundColor = "green"
                acertos += 1
            }
            div_jogo_atual.appendChild(numero)
        })
        div_jogos.appendChild(div_jogo_atual)
        div_jogos.innerHTML += `<p class="acertos">Acertos: ${acertos}</p>`
    })
    
}


const jogos = [
    ["03", "04", "06", "07", "09", "10", "11", "13", "14", "17", "18", "20", "21", "23", "24"],
    ["01", "02", "03", "05", "07", "08", "10", "12", "13", "15", "16", "18", "22", "24", "25"],
    ["02", "04", "05", "06", "08", "09", "11", "12", "14", "15", "17", "19", "21", "23", "25"],
    ["02", "04", "05", "07", "08", "10", "12", "13", "15", "17", "19", "20", "21", "24", "25"],
    ["01", "03", "04", "06", "09", "11", "12", "14", "16", "17", "18", "20", "22", "23", "25"],
    ["02", "03", "05", "07", "08", "10", "13", "15", "16", "18", "19", "21", "22", "23", "24"],
    ["01", "03", "04", "06", "07", "09", "10", "11", "13", "14", "16", "18", "20", "24", "25"],
    ["01", "04", "05", "06", "08", "09", "11", "12", "14", "17", "18", "20", "21", "24", "25"],
    ["02", "03", "04", "07", "10", "11", "13", "15", "16", "17", "19", "20", "22", "23", "25"],
    ["01", "02", "05", "06", "08", "09", "12", "14", "15", "16", "18", "19", "22", "24", "25"]
]