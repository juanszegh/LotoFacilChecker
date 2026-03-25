import { $ } from "./util.js"
const API_URL = "https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/"
let jogo_atual = null
let numeros_map = {}
let concurso_atual = -1
let ultimo_concurso = 0

document.addEventListener('DOMContentLoaded', async () => {
    await init()
    iniciarBotoesConcurso()
    $("#btn_atualizar").addEventListener('click', async () =>{
        await init()
    })
});



async function init(concurso = -1)
{
    numeros_map = {}
    let url_final = API_URL
    if (concurso !== -1)
    {
        concurso = Math.min(Math.max(concurso,1),ultimo_concurso)    
        url_final += concurso
    }
       
    
    jogo_atual = await (await fetch(url_final)).json()
    if (concurso === -1)
    {
        ultimo_concurso = jogo_atual.numero
    }
    concurso_atual = jogo_atual.numero
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
    $("#numero_concurso").value = concurso_atual
}
function iniciarBotoesConcurso()
{
    const botoes = {
        voltar_tudo: [$("#botoes_concurso > .voltar_tudo"), -ultimo_concurso],
        voltar_um: [$("#botoes_concurso > .voltar_um"), -1],
        avancar_um: [$("#botoes_concurso > .avancar_um"), 1],
        avancar_tudo: [$("#botoes_concurso > .avancar_tudo"),ultimo_concurso],
    }
    Object.values(botoes).forEach(b => {
        b[0].addEventListener('click', async () => {
            await mudarConcurso(b[1]) 
        })
    })
    const input = $("#botoes_concurso > input")
    input.addEventListener('blur', async () => {
        await init(input.value)
    })
}
async function mudarConcurso(step)
{
    await init(concurso_atual + step)
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