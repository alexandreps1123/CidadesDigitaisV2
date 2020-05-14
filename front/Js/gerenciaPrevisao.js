//pega o CNPJ escolhido anteriormente
let meuPrevisao = localStorage.getItem("cod_previsao_empenho");

function pegarLote() {
    fetch(servidor + 'read/lote', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + meuToken
      },
    }).then(function (response) {
  
      //tratamento dos erros
      if (response.status == 200) {
        response.json().then(function (json) {
          //console.log(json);
          let x = [];
          x[0] = "<option value=''>Lote</option>";
          for (i = 0; i < json.length; i++) {
            x[i+1] += "<option >" + json[i].cod_lote + "</option>";
          }
          document.getElementById("cod_lote").innerHTML = x;

          //colocando valor original
          document.getElementById("cod_lote").value = localStorage.getItem("cod_lote");
        });
      } else {
        erros(response.status);
      }
    });
  }
  
  function pegarNaturezaDespesa() {
    fetch(servidor + 'read/naturezadespesa', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + meuToken
      },
    }).then(function (response) {
  
      //tratamento dos erros
      if (response.status == 200) {
        response.json().then(function (json) {
          //console.log(json);
          let x = [];
          for (i = 0; i < json.length; i++) {
            // o valor pego é o codigo, mas o campo mostra a descrição
            x[i] += "<option value=" + json[i].cod_natureza_despesa + ">" + json[i].descricao + "</option>";
          }
          document.getElementById("cod_natureza_despesa").innerHTML = x;

          //colocando valor original
          document.getElementById("cod_natureza_despesa").value = localStorage.getItem("cod_natureza_despesa");
        });
      } else {
        erros(response.status);
      }
    });
  }


window.onload = function () {

  //preenche os campos
  this.document.getElementById("cod_empenho").value = localStorage.getItem("cod_empenho");

  //esta função preenche o campo de lote
  pegarLote();
  pegarNaturezaDespesa();


    //deixei aqui pra fazer estrutura do tipo
  let x = [];
          for (i = 0; i < json.length; i++) {
            // o valor pego é o codigo, mas o campo mostra a descrição
            x[i] += "<option value=" + json[i].cod_natureza_despesa + ">" + json[i].descricao + "</option>";
          }
          document.getElementById("cod_natureza_despesa").innerHTML = x;

  //este campo precisa de adaptação para ser aceito, como yyyy-MM-dd

  let data1 = new Date(localStorage.getItem("data"));
  let dataFinal1 = String(data1.getFullYear()).padStart(4, '0') + "-" + String(data1.getMonth() + 1).padStart(2, '0') + "-" + String(data1.getDate()).padStart(2, '0');
  document.getElementById("data").value = dataFinal1;
  
  
}

function enviar() {

  //  JSON usado para mandar as informações no fetch
  let info = {
    "cod_lote": "",
    "cod_natureza_despesa": "",
    "data": "",
    "tipo": "",
    "ano_referencia": "",
  };

  info.cod_lote = parseInt(document.getElementById("cod_lote").value);
  info.cod_natureza_despesa = parseInt(document.getElementById("cod_natureza_despesa").value);
  info.data = document.getElementById("data").value;
  info.tipo = document.getElementById("tipo").value;
  info.ano_referencia = parseInt(document.getElementById("ano_referencia").value);

  //transforma as informações em string para mandar
  let corpo = JSON.stringify(info);
  //função fetch para mandar
  fetch(servidor + 'read/previsaoempenho/' + meuPrevisao, {
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
      window.location.replace("./previsao.html");
    } else {
      erros(response.status);
    }
  });
}