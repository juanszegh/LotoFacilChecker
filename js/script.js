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
    const jogos = await (await fetch("../assets/jogos.json")).json()
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
