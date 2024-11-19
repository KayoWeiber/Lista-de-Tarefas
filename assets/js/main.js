function iniciar(){
    const inputTarefa=document.querySelector(".input-tarefa")
    const btnTarefa=document.querySelector(".btn-tarefa")
    const tarefa=document.querySelector(".tarefa")

    btnTarefa.addEventListener("click",()=>{
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value)
    })

    function criaTarefa(textoInput){
        const li=criaLi()
        li.innerText=textoInput
        tarefa.appendChild(li)
        limpaInput()
        criaBotaoApagar(li)
        salvarTarefas()
    }

    function criaLi(){
        const li=document.createElement("li")
        return li
    }

    inputTarefa.addEventListener("keypress",(e)=>{
        if(e.keyCode===13){
            if (!inputTarefa.value) return;
            criaTarefa(inputTarefa.value)
        }
    })

    function limpaInput(){
        inputTarefa.value=""
        inputTarefa.focus()
    }

    function criaBotaoApagar(li){
        li.innerText+=" "
        const botaoApagar=document.createElement("button")
        botaoApagar.innerText="Apagar"
        botaoApagar.setAttribute("class","apagar")
        botaoApagar.setAttribute("title","apagar essa tarefa")
        li.appendChild(botaoApagar)
    }
    document.addEventListener("click",(e)=>{
        const el=e.target
        if(el.classList.contains("apagar")){
            el.parentElement.remove() //remover parente
            salvarTarefas()
        }
    })

    function salvarTarefas(){
        const liTarefas = tarefa.querySelectorAll("li")
        const listaDeTarefas=[]
        
        for(let tarefas of liTarefas){
            let tarefaTexto=tarefas.innerText
            tarefaTexto=tarefaTexto.replace("Apagar","").trim()
            listaDeTarefas.push(tarefaTexto)
        }
        const tarefaJSON=JSON.stringify(listaDeTarefas) //convert o array em string
        localStorage.setItem("tarefas",tarefaJSON) //salva no local storage em aplicações no navegador
    }

    function adicionaTarefasSalvas(){
        const tarefasSalvas=localStorage.getItem("tarefas") // salva retornar do local storage
        const listaDeTarefas=JSON.parse(tarefasSalvas) //convert a string para array
        for (let tarefaSalva of listaDeTarefas){
            criaTarefa(tarefaSalva)
        }
    }
    adicionaTarefasSalvas()
}
iniciar()