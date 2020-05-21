//pega o CNPJ escolhido anteriormente
let meuCodigo = localStorage.getItem("cod_lote");
document.getElementById("cod_lote").value = meuCodigo;

//cuida de lote_itens
let edicaoItem = [];
let listaItem = [];
let meuItem = [];
let meuTipo = [];
let itemMudado = [];

function pegarEntidade(){
  fetch(servidor + 'read/entidadeget', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + meuToken
    },
  }).then(function (response) {

    //tratamento dos erros
    if (response.status == 200) {
      response.json().then(function (json) {
        //pegar o json
        //console.log(json);
        let x = [];
        for (i = 0; i < json.length; i++) {
          // o valor pego é o cnpj, mas o campo mostra o nome da entidade
          x[i] += "<option value=" + json[i].cnpj + ">" + json[i].nome + "</option>";
        }
        x.sort();

        document.getElementById("cnpj").innerHTML = x;

        let cnpj1 = document.getElementById("cnpj");
        cnpj1.value = localStorage.getItem("cnpj");
      });
    } else {
      erros(response.status);
    }
  });
}


window.onload = function () {

  //preenche os campos
  let contrato1 = document.getElementById("contrato");
  contrato1.value = localStorage.getItem("contrato");

  //estes campos precisam de adaptações para serem aceitos, como yyyy-MM-dd

  let data1 = new Date(localStorage.getItem("dt_inicio_vig"));
  let data2 = new Date(localStorage.getItem("dt_final_vig"));
  let data3 = new Date(localStorage.getItem("dt_reajuste"));

  let dataFinal1 = String(data1.getFullYear()).padStart(4, '0') + "-" + String(data1.getMonth() + 1).padStart(2, '0') + "-" + String(data1.getDate()).padStart(2, '0');
  let dataFinal2 = String(data2.getFullYear()).padStart(4, '0') + "-" + String(data2.getMonth() + 1).padStart(2, '0') + "-" + String(data2.getDate()).padStart(2, '0');
  let dataFinal3 = String(data3.getFullYear()).padStart(4, '0') + "-" + String(data3.getMonth() + 1).padStart(2, '0') + "-" + String(data3.getDate()).padStart(2, '0');

  document.getElementById("dt_inicio_vig").innerHTML = dataFinal1;
  document.getElementById("dt_final_vig").innerHTML = dataFinal2;
  document.getElementById("dt_reajuste").innerHTML = dataFinal3;

  //esta função preenche o campo de lote
  pegarEntidade();
}

function enviar() {

  //JSON usado para mandar as informações no fetch
  let info = {
    "cod_lote": "",
    "cnpj": "",
    "contrato": "",
    "dt_inicio_vig": "",
    "dt_final_vig": "",
    "dt_reajuste": "",
  };

  info.cod_lote = parseFloat(document.getElementById("cod_lote").value);
  info.cnpj = document.getElementById("cnpj").value;
  info.contrato = document.getElementById("contrato").value;
  info.dt_inicio_vig = document.getElementById("dt_inicio_vig").value;
  info.dt_final_vig = document.getElementById("dt_final_vig").value;
  info.dt_reajuste = document.getElementById("dt_reajuste").value;

  //transforma as informações em string para mandar
  let corpo = JSON.stringify(info);
  //função fetch para mandar
  fetch(servidor + 'read/lote/' + meuCodigo, {
    method: 'PUT',
    body: corpo,
    headers: {
      'Authorization': 'Bearer ' + meuToken
    },
  }).then(function (response) {

    //checar o status do pedido
    //console.log(response);

    //tratamento dos erros
    if (response.status == 200 || response.status == 201) {
      //checar o json
      //response.json().then(function (json) {
      //console.log(json);
      //});
      window.location.replace("./lote.html");
    } else {
      erros(response.status);
    }
  });
}







//lote itens

function itensLote() {

  //cria o botão para editar
  document.getElementById("editar").innerHTML = (`<button id="editar" onclick="editarItemLote()" class="btn btn-success">Salvar Alterações</button>`);
  document.getElementById("editar2").innerHTML = (`<button id="editar" onclick="editarItemLote()" class="btn btn-success">Salvar Alterações</button>`);

  //função fetch para chamar itens da tabela
  fetch(servidor + 'read/loteitens', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + meuToken
    },
  }).then(function (response) {

    //tratamento dos erros
    if (response.status == 200) {
      //console.log(response.statusText);

      //pegar o json que possui a tabela
      response.json().then(function (json) {

        let j = 0;
        //cria uma lista apenas com os itens do lote selecionado
        for (let i = 0; i < json.length; i++) {
          if (json[i]["cod_lote"] == meuCodigo) {
            listaItem[j] = json[i];
            j++;
          }
        }

        //cria o cabeçalho da tabela
        let tabela = (`<thead style="background: #4b5366; color:white; font-size:15px">
                <tr>
                <th scope="col">Código do Item, Tipo de Item e Descrição do item</th>
                <th scope="col">Valor</th>
                </tr>
                </thead>`);
        tabela += (`<tbody>`);

        for (i = 0; i < listaItem.length; i++) {

          //salva os valores para edição
          meuItem[i] = listaItem[i]["cod_item"];
          meuTipo[i] = listaItem[i]["cod_tipo_item"];

          //cria json para edição
          edicaoItem[i] = {
            "preco": "",
          };

          //captura itens para tabela
          tabela += (`<tr>`);
          tabela += (`<td>`);
          tabela += listaItem[i]["cod_item"] + "." + listaItem[i]["cod_tipo_item"] + " - " + listaItem[i]["descricao"];
          tabela += (`</td> <td>`);
          tabela += "R$ " + (`<input value="` + listaItem[i]["preco"] + `" onchange="mudaItemLote(` + i + `)" id="preco` + i + `" type="text" class="preco">`);
          tabela += (`</td>`);
          tabela += (`</tr>`);
        }
        tabela += (`</tbody>`);
        document.getElementById("tabela").innerHTML = tabela;
      });
    } else {
      erros(response.status);
    }
  });
}

function mudaItemLote(valor) {
  edicaoItem[valor].preco = parseFloat(document.getElementById("preco" + valor).value);
  itemMudado[valor] = valor;
}

function editarItemLote() {
  for (i = 0; i < listaItem.length; i++) {
    if (itemMudado[i] != null) {
      //transforma as informações em string para mandar
      let corpo = JSON.stringify(edicaoItem[i]);
      //função fetch para mandar
      fetch(servidor + 'read/loteitens/' + meuCodigo + '/' + meuItem[i] + '/' + meuTipo[i], {
        method: 'PUT',
        body: corpo,
        headers: {
          'Authorization': 'Bearer ' + meuToken
        },
      }).then(function (response) {
        //checar o status do pedido
        //console.log(response.statusText);

        //tratamento dos erros
        if (response.status == 200 || response.status == 201) {
          location.reload();
        } else {
          //erros(response.status);
        }
      });
    }
  }
}







//lote reajustes

//variaveis de reajuste
let listaReajuste = [];
let edicaoReajuste = [];
let meuAno = [];
let reajusteMudado = [];

function reajuste() {

  document.getElementById("cod_lote1").value = meuCodigo;
  document.getElementById("cod_lote1").disabled = true;

  document.getElementById("editar").innerHTML = (`<button onclick="editarReajuste()" class="btn btn-success" >Salvar Alterações em Reajustes</button>
                                                  <button class="btn btn-success" data-toggle="modal" data-target="#adicionarReajuste">Novo Reajuste</button>`);
  document.getElementById("editar2").innerHTML = (`<button onclick="editarReajuste()" class="btn btn-success" >Salvar Alterações em Reajustes</button>
                                                  <button class="btn btn-success" data-toggle="modal" data-target="#adicionarReajuste">Novo Reajuste</button>`);

  //função fetch para chamar reajustes da tabela
  fetch(servidor + 'read/reajuste', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + meuToken
    },
  }).then(function (response) {

    //checar os status de pedidos
    //console.log(response)

    //tratamento dos erros
    if (response.status == 200) {
      console.log(response.statusText);

      //pegar o json que possui a tabela
      response.json().then(function (json) {

        let tabela = (`<thead style="background: #4b5366; color:white; font-size:15px">
        <tr>
        <th style="width:46%" scope="col">Ano de Referência</th>
        <th style="width:46%" scope="col">Percentual de Reajuste</th>
        <th style="width:8%" scope="col">Apagar</th>
        </tr>
        </thead>`);
        tabela += (`<tbody>`);

        let j = 0;
        for (let i = 0; i < json.length; i++) {
          if (json[i].cod_lote == meuCodigo) {
            listaReajuste[j] = json[i];
            j++;
          }
        }

        for (i = 0; i < listaReajuste.length; i++) {

          //salva os valores para edição
          meuAno[i] = listaReajuste[i]["ano_ref"];

          //cria json para edição
          edicaoReajuste[i] = {
            "percentual": "",
          };

          //captura itens para tabela
          tabela += (`<tr>`);
          tabela += (`<td>`);
          tabela += listaReajuste[i]["ano_ref"];
          tabela += (`</td>`);
          tabela += (`<td>`);
          tabela += (`<input value="` + listaReajuste[i]["percentual"] + `" onchange="mudaReajuste(` + i + `)" id="percentual` + i + `" type="number">`) + "%";
          tabela += (`</td>`);
          tabela += (`<td>
          <button onclick="apagarReajuste(` + listaReajuste[i]["ano_ref"] + `)" class="btn btn-danger">
          <i class="material-icons"data-toggle="tooltip" title="Delete">&#xE872;</i>
          </button>
          </td>`);
          tabela += (`</tr>`);
        }
        tabela += (`</tbody>`);
        document.getElementById("tabela").innerHTML = tabela;
      });
    } else {
      erros(response.status);
    }
  });
}

function mudaReajuste(valor) {
  edicaoReajuste[valor].percentual = parseFloat(document.getElementById("percentual" + valor).value);
  reajusteMudado[valor] = valor;
}

function editarReajuste() {
  for (i = 0; i < listaReajuste.length; i++) {
    if (reajusteMudado[i] != null) {
      //transforma as informações em string para mandar
      let corpo = JSON.stringify(edicaoReajuste[i]);
      //função fetch para mandar
      fetch(servidor + 'read/reajuste/' + listaReajuste[i]["ano_ref"] + '/' + meuCodigo, {
        method: 'PUT',
        body: corpo,
        headers: {
          'Authorization': 'Bearer ' + meuToken
        },
      }).then(function (response) {

        //tratamento dos erros
        if (response.status == 200 || response.status == 201) {
          //checar a resposta do pedido
          //console.log(json);
          window.location.replace("./gerenciaLote.html");
        } else {
          erros(response.status);
        }
      });
    }
  }
}

function novoReajuste() {

  let infoReajuste = {
    "cod_lote": parseInt(meuCodigo),
    "ano_ref": "",
    "percentual": "",
  };

  infoReajuste.ano_ref = parseInt(document.getElementById("ano_ref").value);
  infoReajuste.percentual = parseFloat(document.getElementById("percentual").value);

  //transforma as informações em string para mandar
  let corpo = JSON.stringify(infoReajuste);
  //função fetch para mandar
  fetch(servidor + 'read/reajuste', {
    method: 'POST',
    body: corpo,
    headers: {
      'Authorization': 'Bearer ' + meuToken
    },
  }).then(function (response) {

    //tratamento dos erros
    if (response.status == 200 || response.status == 201) {
      location.reload();
    } else {
      erros(response.status);
    }
  });
}

function apagarReajuste(valor) {

  //função fetch para deletar
  fetch(servidor + 'read/reajuste/' + valor + "/" + meuLote, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + meuToken
    },
  }).then(function (response) {

    //tratamento dos erros
    if (response.status == 204) {
      alert("Apagado com sucesso.");
      window.location.replace("./gerenciaLote.html");
    } else {
      erros(response.status);
    }
    return response.json().then(function (json) {
      console.log(json);
    });
  });
}