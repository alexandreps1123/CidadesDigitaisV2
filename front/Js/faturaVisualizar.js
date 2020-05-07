window.onload = function () {
    paginacao();
  }
  
  
  //sistema de paginação
  let contador = 0;
  let porPagina = 5;
  let totalPaginas;
  
  
  function antes() {
    contador--;
    paginacao();
  }
  
  function depois() {
    contador++;
    paginacao();
  }
  
  //garantindo o limite de paginação
  
  function pagina(valor) {
    contador = valor;
    paginacao();
  }
  
  function paginacao() {
    porPagina = document.getElementById("quantos").value;
    let comeco = contador * porPagina;
    let fim = (contador + 1) * porPagina;
  
    //função fetch para chamar os itens de previsão da tabela
    fetch(servidor + 'read/fatura', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + meuToken
      },
    }).then(function (response) {
  
      //checar os status de pedidos
      //console.log(response);
  
      //tratamento dos erros
      if (response.status == 200) {
  
        response.json().then(function (json) {
          //pegar o json que possui a tabela
          console.log(json);
  
          totalPaginas = json.length / porPagina;
  
          let tabela = (`<thead style="background: #4b5366; color:white; font-size:15px">
          <tr>
          <th style="width:20%" scope="col">Número da Fatura</th>
          <th style="width:20%" scope="col">Código do IBGE</th>
          <th style="width:20%" scope="col">Data</th>
          </tr>
          </thead>`);
          tabela += (`<tbody>`);
  
          json.sort();
          for (let i = comeco; i < fim && i < json.length; i++) {
            //captura itens para tabela
            tabela += (`<tr>`);
            tabela += (`<td>`);
            tabela += json[i]["num_nf"]; //está sendo enviado assim por algum motivo
            tabela += (`</td><td>`);
            tabela += json[i]["cod_ibge"];
            tabela += (`</td><td>`);
            let data1 = new Date(json[i]["dt_nf"]);
            let dataFinal1 = String(data1.getDate()).padStart(2, '0') + "/" + String(data1.getMonth() + 1).padStart(2, '0') + "/" + String(data1.getFullYear()).padStart(4, '0');
            tabela += dataFinal1;
            tabela += (`</td>`);
            tabela += (`</tr>`);
          }
          tabela += (`</tbody>`);
          document.getElementById("tabela").innerHTML = tabela;
  
          //mostra quanto do total aparece na tela
          document.getElementById("mostrando").innerHTML = "Mostrando " + (comeco + 1) + " a " + fim + " de " + json.length;
          if (porPagina > json.length - comeco) {
            document.getElementById("mostrando").innerHTML = "Mostrando " + (comeco + 1) + " a " + json.length + " de " + json.length;
          }
  
          //conta quantas paginas é necessário
          let paginas = `<li id="anterior" class="page-item" ><a href="#" class="page-link" onclick="antes()">Anterior</a></li>`;
          //apenas aciona se precisar de paginação
          if (json.length > porPagina) {
            //caso seja apenas 10 paginas
            if (totalPaginas < 10) {
              for (i = 0; i < totalPaginas; i++) {
                if (contador == i) {
                  paginas += `<li class="page-item" id="page` + i + `"><a href="#" onclick="pagina(` + i + `)" class="page-link btn active">` + (i + 1) + `</a></li>`;
                } else {
                  paginas += `<li class="page-item" id="page` + i + `"><a href="#" onclick="pagina(` + i + `)" class="page-link">` + (i + 1) + `</a></li>`;
                }
              }
              //caso sejam mais de 10
            } else {
              //mostrar apenas inicio e fim
              if (contador == 0) {
                paginas += `<li class="page-item" id="page0"><a href="#" onclick="pagina(0)" class="page-link btn active">1</a></li>`;
                paginas += `<li class="page-item" id="page1"><a href="#" onclick="pagina(1)" class="page-link">2</a></li>`;
                paginas += `<li class="page-item" id="page2"><a href="#" onclick="pagina(2)" class="page-link">3</a></li>`;
                paginas += `<li><a>...</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas) + `)" class="page-link">` + Math.floor(totalPaginas + 1) + `</a></li>`;
              }
              //opções do começo
              else if (contador == 1) {
                paginas += `<li class="page-item" id="page0"><a href="#" onclick="pagina(0)" class="page-link">1</a></li>`;
                paginas += `<li class="page-item" id="page1"><a href="#" onclick="pagina(1)" class="page-link btn active">2</a></li>`;
                paginas += `<li class="page-item" id="page2"><a href="#" onclick="pagina(2)" class="page-link">3</a></li>`;
                paginas += `<li class="page-item" id="page3"><a href="#" onclick="pagina(3)" class="page-link">4</a></li>`;
                paginas += `<li><a>...</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas) + `)" class="page-link">` + Math.floor(totalPaginas + 1) + `</a></li>`;
              } else if (contador == 2) {
                paginas += `<li class="page-item" id="page0"><a href="#" onclick="pagina(0)" class="page-link">1</a></li>`;
                paginas += `<li class="page-item" id="page1"><a href="#" onclick="pagina(1)" class="page-link">2</a></li>`;
                paginas += `<li class="page-item" id="page2"><a href="#" onclick="pagina(2)" class="page-link btn active">3</a></li>`;
                paginas += `<li class="page-item" id="page3"><a href="#" onclick="pagina(3)" class="page-link">4</a></li>`;
                paginas += `<li class="page-item" id="page4"><a href="#" onclick="pagina(4)" class="page-link">5</a></li>`;
                paginas += `<li><a>...</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas) + `)" class="page-link">` + Math.floor(totalPaginas + 1) + `</a></li>`;
              } else if (contador == 3) {
                paginas += `<li class="page-item" id="page0"><a href="#" onclick="pagina(0)" class="page-link">1</a></li>`;
                paginas += `<li class="page-item" id="page1"><a href="#" onclick="pagina(1)" class="page-link">2</a></li>`;
                paginas += `<li class="page-item" id="page2"><a href="#" onclick="pagina(2)" class="page-link">3</a></li>`;
                paginas += `<li class="page-item" id="page3"><a href="#" onclick="pagina(3)" class="page-link btn active">4</a></li>`;
                paginas += `<li class="page-item" id="page4"><a href="#" onclick="pagina(4)" class="page-link">5</a></li>`;
                paginas += `<li class="page-item" id="page5"><a href="#" onclick="pagina(5)" class="page-link">6</a></li>`;
                paginas += `<li><a>...</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas) + `)" class="page-link">` + Math.floor(totalPaginas + 1) + `</a></li>`;
              }
              //opções no final
              else if (contador == Math.floor(totalPaginas - 3)) {
                paginas += `<li class="page-item" id="page0"><a href="#" onclick="pagina(0)" class="page-link">1</a></li>`;
                paginas += `<li><a>...</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas - 5) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas - 5) + `)" class="page-link">` + Math.floor(totalPaginas - 4) + `</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas - 4) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas - 4) + `)" class="page-link">` + Math.floor(totalPaginas - 3) + `</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas - 3) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas - 3) + `)" class="page-link btn active">` + Math.floor(totalPaginas - 2) + `</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas - 2) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas - 2) + `)" class="page-link">` + Math.floor(totalPaginas - 1) + `</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas - 1) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas - 1) + `)" class="page-link">` + Math.floor(totalPaginas) + `</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas) + `)" class="page-link">` + Math.floor(totalPaginas + 1) + `</a></li>`;
              } else if (contador == Math.floor(totalPaginas - 2)) {
                paginas += `<li class="page-item" id="page0"><a href="#" onclick="pagina(0)" class="page-link">1</a></li>`;
                paginas += `<li><a>...</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas - 4) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas - 4) + `)" class="page-link">` + Math.floor(totalPaginas - 3) + `</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas - 3) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas - 3) + `)" class="page-link">` + Math.floor(totalPaginas - 2) + `</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas - 2) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas - 2) + `)" class="page-link btn active">` + Math.floor(totalPaginas - 1) + `</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas - 1) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas - 1) + `)" class="page-link">` + Math.floor(totalPaginas) + `</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas) + `)" class="page-link">` + Math.floor(totalPaginas + 1) + `</a></li>`;
              } else if (contador == Math.floor(totalPaginas - 1)) {
                paginas += `<li class="page-item" id="page0"><a href="#" onclick="pagina(0)" class="page-link">1</a></li>`;
                paginas += `<li><a>...</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas - 3) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas - 3) + `)" class="page-link">` + Math.floor(totalPaginas - 2) + `</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas - 2) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas - 2) + `)" class="page-link">` + Math.floor(totalPaginas - 1) + `</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas - 1) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas - 1) + `)" class="page-link btn active">` + Math.floor(totalPaginas) + `</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas) + `)" class="page-link">` + Math.floor(totalPaginas + 1) + `</a></li>`;
              } else if (contador == Math.floor(totalPaginas)) {
                paginas += `<li class="page-item" id="page0"><a href="#" onclick="pagina(0)" class="page-link">1</a></li>`;
                paginas += `<li><a>...</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas - 2) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas - 2) + `)" class="page-link">` + Math.floor(totalPaginas - 1) + `</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas - 1) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas - 1) + `)" class="page-link">` + Math.floor(totalPaginas) + `</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas) + `)" class="page-link btn active">` + Math.floor(totalPaginas + 1) + `</a></li>`;
              } else {
                paginas += `<li class="page-item" id="page0"><a href="#" onclick="pagina(0)" class="page-link">1</a></li>`;
                paginas += `<li><a>...</a></li>`;
                paginas += `<li class="page-item" id="page` + (contador - 2) + `"><a href="#" onclick="pagina(` + (contador - 2) + `)" class="page-link">` + (contador - 1) + `</a></li>`;
                paginas += `<li class="page-item" id="page` + (contador - 1) + `"><a href="#" onclick="pagina(` + (contador - 1) + `)" class="page-link">` + contador + `</a></li>`;
                paginas += `<li class="page-item" id="page` + contador + `"><a href="#" onclick="pagina(` + contador + `)" class="page-link btn active">` + (contador + 1) + `</a></li>`;
                paginas += `<li class="page-item" id="page` + (contador + 1) + `"><a href="#" onclick="pagina(` + (contador + 1) + `)" class="page-link">` + (contador + 2) + `</a></li>`;
                paginas += `<li class="page-item" id="page` + (contador + 2) + `"><a href="#" onclick="pagina(` + (contador + 2) + `)" class="page-link">` + (contador + 3) + `</a></li>`;
                paginas += `<li><a>...</a></li>`;
                paginas += `<li class="page-item" id="page` + Math.floor(totalPaginas) + `"><a href="#" onclick="pagina(` + Math.floor(totalPaginas) + `)" class="page-link">` + Math.floor(totalPaginas + 1) + `</a></li>`;
              }
            }
          }
          paginas += `<li id="proximo" class="page-item" ><a href="#" class="page-link" onclick="depois()">Próximo</a></li>`;
          document.getElementById("paginacao").innerHTML = paginas;
  
          //limite das paginas
          if (contador > 0) {
            document.getElementById("anterior").style.visibility = "visible";
          } else {
            document.getElementById("anterior").style.visibility = "hidden";
          }
          if (fim < json.length) {
            document.getElementById("proximo").style.visibility = "visible";
          } else {
            document.getElementById("proximo").style.visibility = "hidden";
          }
  
        });
      } else {
        erros(response.status);
      }
    });
  }