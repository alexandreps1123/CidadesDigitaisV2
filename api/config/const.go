package config

/*  =========================
	Server HTTP
=========================  */

const (
	// defines ip and port address for server instance
	SERVER_ADDR = "localhost:8080"
)

/*  =========================
	USER PATHS HTTP
=========================  */

const (
	USER_PATH            = "/read/usuario"
	USER_ID_PATH         = "/read/usuario/{id}"
	USER_PATH_LOGIN      = "/read/usuario/login"
	USER_PATH_CREATEUSER = "/read/usuario/createuser"
	USER_PATH_DELETEUSER = "/read/usuario/deleteuser"
)

/*  =========================
	ENTIDADE PATHS HTTP
=========================  */

const (
	ENTIDADE_PATH    = "/read/entidade"
	ENTIDADE_ID_PATH = "/read/entidade/{cnpj}"
)

/*  =========================
	CONTATO PATHS HTTP
=========================  */

const (
	CONTATO_PATH    = "/read/contato"
	CONTATO_ID_PATH = "/read/contato/{cod_contato}"
)

/*  =========================
	TELEFONE PATHS HTTP
=========================  */

const (
	TELEFONE_PATH    = "/read/telefone"
	TELEFONE_ID_PATH = "/read/telefone/{cod_telefone}"
)

/*  =========================
	LOTE PATHS HTTP
=========================  */

const (
	LOTE_PATH    = "/read/lote"
	LOTE_ID_PATH = "/read/lote/{cod_lote}"
)

/*  =========================
	LOTE ITENS PATHS HTTP
=========================  */

const (
	LOTE_ITENS_PATH    = "/read/loteItens"
	LOTE_ITENS_ID_PATH = "/read/loteItens/{cod_ibge}/{cod_item}/{cod_tipo_item}"
)

/*  =========================
	PREVISAO EMPENHO PATHS HTTP
=========================  */

const (
	PREVISAO_EMPENHO_PATH    = "/read/previsaoEmpenho"
	PREVISAO_EMPENHO_ID_PATH = "/read/previsaoEmpenho/{cod_previsao_empenho}"
)

/*  =========================
	ITENS PREVISAO EMPENHO PATHS HTTP
=========================  */

const (
	ITENS_PREVISAO_EMPENHO_PATH = "/read/itens_previsao_empenho"
)

/*  =========================
	CD PATHS HTTP
=========================  */

const (
	CD_PATH    = "/read/cd"
	CD_ID_PATH = "/read/cd/{cod_ibge}"
)

/*  =========================
	CD ITENS PATHS HTTP
=========================  */

const (
	CD_ITENS_PATH    = "/read/cd_itens"
	CD_ITENS_ID_PATH = "/read/cd_itens/{cod_ibge}/{cod_item}/{cod_tipo_item}"
)

/*  =========================
	REAJUSTE PATHS HTTP
=========================  */
//	ARRUMAR!!!!
const (
	REAJUSTE_PATH_CREATEREAJUSTE = "/read/reajuste/createreajuste"
	REAJUSTE_ID_PATH             = "/read/reajuste/{cod_lote}"
	REAJUSTE_PATH                = "/read/reajuste"
	REAJUSTE_DEL                 = "/read/reajuste/{cod_lote}/{ano_ref}"
)

//===============================================================
//===============================================================
//===============================================================

/*  =========================
	TIPOLOGIA PATHS HTTP
=========================  */

const (
	TIPO_PATH    = "/read/tipologia"
	TIPO_ID_PATH = "/read/tipologia/:id"
)

/*  =========================
	TIPO ITEM PATHS HTTP
=========================  */

const (
	TIPOIT_PATH    = "/read/tipoItem"
	TIPOIT_ID_PATH = "/read/tipoItem/:cod_tipo_item"
)

/*  =========================
	PREVISAO EMPENHO PATHS HTTP
=========================  */

const (
	PREVITENS_ID_PATH   = "/read/previsaoEmpenhoItens"
	PREVITENS_LIST_PATH = "/read/previsaoEmpenhoItens/:cod_lote/:cod_previsao_empenho"
)

/*  =========================
	PREFEITOS PATHS HTTP
=========================  */

const (
	PREFEITOS_PATH    = "/read/prefeitos"
	PREFEITOS_ID_PATH = "/read/prefeitos/:id"
)

/*  =========================
	PAGAMENTO PATHS HTTP
=========================  */

const (
	PAG_PATH          = "/read/otb"
	PAG_ID_PATH       = "/read/otb/:id"
	PAG_FAT_MUNICIPIO = "/read/otbMuniFatura/:cd_municipio_cod_ibge"
	PAG_FAT_LIST      = "/read/otbFatura/:cod_otb"
	PAG_FAT_SAVE      = "/read/otbFat"
	PAG_LIST_ITENS    = "/read/otbItens/:cod_otb"
	PAG_EDIT_ITENS    = "/read/otbItens"
)

/*  =========================
	NATUREZA DESPESA PATHS HTTP
=========================  */

const (
	NAT_DES_PATH    = "/read/naturezaDespesa"
	NAT_DES_ID_PATH = "/read/naturezaDespesa/:id"
)

/*  =========================
	MUNICIPIO PATHS HTTP
=========================  */

const (
	MUNICIPIO_PATH    = "/read/municipios"
	MUNICIPIO_ID_PATH = "/read/municipios/:id"
)

/*  =========================
	MODULOS PATHS HTTP
=========================  */

const (
	MOD_PATH          = "/read/modulo"
	MOD_USERLIST_PATH = "/read/usuario/:cod_usuario/modulos"
)

/*  =========================
	ITENS PATHS HTTP
=========================  */

const (
	ITENS_PATH    = "/read/itens"
	ITENS_ID_PATH = "/read/itens/:cod_item/:cod_tipo_item"
)

/*  =========================
	FATURA PATHS HTTP
=========================  */

const (
	FATURA_PATH          = "/read/fatura"
	FATURA_ID_PATH       = "/read/fatura/:id"
	FATURA_ITENS_PATH    = "/read/faturaItens"
	FATURA_ITENS_LIST    = "/read/faturaItens/:num_nf"
	FATURA_ITENS_LIST_ID = "/read/faturaItens/:municipio_cod_ibge/:natureza_despesa_cod_natureza_despesa/:cod_item/:cod_tipo_item"
	FATURA_ITENS_DELETE  = "/read/faturaItens/:fatura_num_nf/:cod_empenho/:cod_item/:cod_tipo_item"
	LIST_PAG_FAT         = "/read/faturaOtb/:num_nf/:cod_ibge"
	FATURA_TOTAL         = "/read/totalFatura/:num_nf"
)

/*  =========================
	ETAPA PATHS HTTP
=========================  */

const (
	ETAPA_PATH    = "/read/etapa"
	ETAPA_ID_PATH = "/read/etapa/:cod_etapa"
)

/*  =========================
	EMPENHO PATHS HTTP
=========================  */

const (
	EMPENHO_PATH     = "/read/empenho"
	EMPENHO_ID_PATH  = "/read/empenho/:id"
	EMPENHO_ITENS    = "/read/empenhoItens"
	EMPENHO_ITENS_ID = "/read/empenhoItens/:id"
)

/*  =========================
	CLASSE EMPENHO PATHS HTTP
=========================  */

const (
	CLASSE_PATH    = "/read/classeEmpenho"
	CLASSE_ID_PATH = "/read/classeEmpenho/:id"
)

/*  =========================
	CATEGORIA PATHS HTTP
=========================  */

const (
	CATEGORIA_PATH    = "/read/categoria"
	CATEGORIA_ID_PATH = "/read/categoria/:id"
)

/*  =========================
	ASSUNTO PATHS HTTP
=========================  */

const (
	ASSUNTO_PATH    = "/read/assunto"
	ASSUNTO_ID_PATH = "/read/assunto/:id"
)
