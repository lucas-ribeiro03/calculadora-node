const tela = document.querySelector('.resultado');

document.addEventListener('click', e => {
    const el = e.target;
    if(el.classList.contains('btn-num')){
        tela.value += el.textContent;
    }

    if(el.classList.contains('btn-eq')){
        if(tela.value != ''){
            try{
                const conta = tela.value;
                tela.value = eval(conta);
                salvarConta(conta, tela.value);
            } catch(e){
                console.log('Conta inválida', tela.value);
                tela.value = 'Conta inválida'

            }
        } else{
            tela.value = ''
        }
    }

    if(el.classList.contains('btn-del')){
        tela.value = tela.value.slice(0, -1)
    }

    if(el.classList.contains('btn-delete')){
        tela.value = '';
    }
})

document.addEventListener('keydown', keyPressed => {
    if(keyPressed.keyCode === 13){
        if(tela.value != ''){
            try{
                const conta = tela.value;
                tela.value = eval(conta);
                salvarConta(conta, tela.value);
            } catch(e){
                console.log('Conta inválida', tela.value);
                tela.value = 'Conta inválida'

            }
        } else{
            tela.value = ''
        }
    }
    })

function salvarConta(conta, resultado){
    fetch("/salvar-conta", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ conta, resultado }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Conta salva:", data);
    })
    .catch((e) => console.log(e, 'Nao funcionou'));
}

document.querySelector('.btn-historico').addEventListener('click', () => {
    fetch('/historico').then(response => response.json()).then(data => {
        const historicoDiv = document.querySelector('.historico');
        historicoDiv.innerHTML = '';

        if(data.length > 0){
            const table = document.createElement('table');
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = '<th>Conta</th><th>Resultado</th><th>Data</th>';
            table.appendChild(headerRow);
            data.forEach(conta => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${conta.conta} = </td>
                <td> ${conta.resultado} </td>
                `;
                table.appendChild(row);
            });
            historicoDiv.appendChild(table);
        } else {
            historicoDiv.innerHTML = '<p>Sem histórico para exibir.</p>'
        }
    }).catch(e => console.log('Erro ao carregar o histórico'))
})