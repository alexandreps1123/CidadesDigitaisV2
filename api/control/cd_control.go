package control

import (
	"CidadesDigitaisV2/api/config"
	"CidadesDigitaisV2/api/models"
	"CidadesDigitaisV2/api/responses"
	"CidadesDigitaisV2/api/validation"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

/*  =========================
	FUNCAO ADICIONAR CD
=========================  */

func (server *Server) CreateCd(w http.ResponseWriter, r *http.Request) {

	//Autorização de Modulo
	config.AuthMod(w, r, 13001)

	//	O metodo RealAll le toda a request ate encontrar algum erro, se nao encontrar erro o leitura para em EOF
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, fmt.Errorf("[FATAL] it coudn't read the 'body', %v\n", err))
	}

	//	Estrutura models.Cd{} "renomeada"
	cd := models.Cd{}

	//	Unmarshal analisa o JSON recebido e armazena na struct cd referenciada (&struct)
	err = json.Unmarshal(body, &cd)

	//	Se ocorrer algum tipo de erro retorna-se o Status 422 mais o erro ocorrido
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, fmt.Errorf("[FATAL] ERROR: 422, %v\n", err))
		return
	}

	if err = validation.Validator.Struct(cd); err != nil {
		log.Printf("[WARN] invalid information, because, %v\n", fmt.Errorf("[FATAL] validation error!, %v\n", err))
		w.WriteHeader(http.StatusPreconditionFailed)
		return
	}

	//	SaveCd eh o metodo que faz a conexao com banco de dados e salva os dados recebidos
	cdCreated, err := cd.SaveCd(server.DB)

	//	Retorna um erro caso nao seja possivel salvar cd no banco de dados
	//	Status 500
	if err != nil {

		formattedError := config.FormatError(err.Error())

		responses.ERROR(w, http.StatusInternalServerError, fmt.Errorf("[FATAL] it coudn't save in database , %v\n", formattedError))
		return
	}

	w.Header().Set("Location", fmt.Sprintf("%s%s/%d", r.Host, r.RequestURI, cdCreated.Cod_ibge))

	//	Ao final retorna o Status 201 e o JSON da struct que foi criada
	responses.JSON(w, http.StatusCreated, cdCreated)

}

/*  =========================
	FUNCAO LISTAR CD
=========================  */

func (server *Server) GetCd(w http.ResponseWriter, r *http.Request) {

	//	Autorizacao de Modulo
	config.AuthMod(w, r, 13002)

	cd := models.Cd{}

	//	cds armazena os dados buscados no banco de dados
	cds, err := cd.FindCds(server.DB)
	if err != nil {
		responses.ERROR(w, http.StatusInternalServerError, err)
		return
	}

	//	Retorna o Status 200 e o JSON da struct buscada
	responses.JSON(w, http.StatusOK, cds)

}

/*  =========================
	FUNCAO LISTAR CD POR ID
=========================  */

func (server *Server) GetCdByID(w http.ResponseWriter, r *http.Request) {

	//	Autorizacao de Modulo
	config.AuthMod(w, r, 13002)

	//Vars retorna a rota das variaveis
	vars := mux.Vars(r)

	//interpreta  a string em uma base de (0, 2 to 36) e tamanho de (0 to 64)
	cId, err := strconv.ParseUint(vars["cod_ibge"], 10, 32)
	if err != nil {
		responses.ERROR(w, http.StatusBadRequest, fmt.Errorf("[FATAL] It couldn't parse the variable, %v\n", err))
		return
	}

	cd := models.Cd{}

	//vai utilizar o metodo para procurar o resultado de acordo com a chave
	cdGotten, err := cd.FindCdByID(server.DB, uint64(cId))
	if err != nil {
		responses.ERROR(w, http.StatusBadRequest, fmt.Errorf("[FATAL] It couldn't find by ID, %v\n", err))
		return
	}

	//retorna um JSON indicando que funcionou corretamente
	responses.JSON(w, http.StatusOK, cdGotten)
}

/*  =========================
	FUNCAO ATUALIZAR CD
=========================  */

func (server *Server) UpdateCd(w http.ResponseWriter, r *http.Request) {

	//	Autorizacao de Modulo
	config.AuthMod(w, r, 13003)

	//	Vars retorna as variaveis de rota
	vars := mux.Vars(r)

	//	cdID armazena a chave primaria da tabela cd
	cdID, err := strconv.ParseUint(vars["cod_ibge"], 10, 64)
	if err != nil {
		responses.ERROR(w, http.StatusBadRequest, err)
		return
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}

	cd := models.Cd{}

	//cd.Prepare()

	err = json.Unmarshal(body, &cd)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}

	if err = validation.Validator.Struct(cd); err != nil {
		log.Printf("[WARN] invalid information, because, %v\n", err)
		w.WriteHeader(http.StatusPreconditionFailed)
		return
	}

	//	updateCd recebe a nova cd, a que foi alterada
	updateCd, err := cd.UpdateCd(server.DB, cdID)
	if err != nil {
		formattedError := config.FormatError(err.Error())
		responses.ERROR(w, http.StatusInternalServerError, formattedError)
		return
	}

	//	Retorna o Status 200 e o JSON da struct alterada
	responses.JSON(w, http.StatusOK, updateCd)
}
