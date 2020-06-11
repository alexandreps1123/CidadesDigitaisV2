package models

import (
	"github.com/jinzhu/gorm"
)

/*	=========================
	STRUCT ITENS FATURA
=========================	*/

type ItensFatura struct {
	NumNF                uint32  `gorm:"primary_key;foreign_key:NumNF;not null" json:"num_nf"`
	CodIbge              uint32  `gorm:"primary_key;foreign_key:CodIbge;not null" json:"cod_ibge"`
	IDEmpenho            uint32  `gorm:"primary_key;foreign_key:IDEmpenho;not null" json:"id_empenho"`
	CodItem              uint32  `gorm:"primary_key;foreign_key:CodItem;not null" json:"cod_item"`
	CodTipoItem          uint32  `gorm:"primary_key;foreign_key:CodTipoItem;not null" json:"cod_tipo_item"`
	Valor                float32 `gorm:"default:null" json:"valor"`
	Quantidade           float32 `gorm:"default:null" json:"quantidade"`
	Descricao            string  `gorm:"default:null" json:"descricao"`
	QuantidadeDisponivel float64 `gorm:"default:null" json:"quantidade_disponivel"`
}

/*  =========================
	FUNCAO SALVAR ITENS FATURA
=========================  */

func (itensFatura *ItensFatura) SaveItensFatura(db *gorm.DB) (*ItensFatura, error) {

	//	Adiciona um novo elemento ao banco de dados
	err := db.Debug().Create(&itensFatura).Error
	if err != nil {
		return &ItensFatura{}, err
	}

	return itensFatura, err
}

/*  =========================
	FUNCAO LISTAR ITENS FATURA POR ID
=========================  */

func (itensFatura *ItensFatura) FindItensFaturaByID(db *gorm.DB, numNF, codIbge, idEmpenho, codItem, codTipoItem uint32) (*ItensFatura, error) {

	//	Busca um elemento no banco de dados de acordo com suas chaves primarias
	err := db.Debug().Model(&ItensFatura{}).Where("num_nf = ? AND cod_ibge = ? AND id_empenho = ? AND cod_item = ? AND cod_tipo_item = ?", numNF, codIbge, idEmpenho, codItem, codTipoItem).Take(&itensFatura).Error
	if err != nil {
		return &ItensFatura{}, err
	}

	return itensFatura, err
}

/*  =========================
	FUNCAO LISTAR TODAS ITENS FATURA
=========================  */

func (itensFatura *ItensFatura) FindAllItensFatura(db *gorm.DB, numNF, codIbge uint32) (*[]ItensFatura, error) {

	allItensFatura := []ItensFatura{}

	// Busca todos elementos contidos no banco de dados
	err := db.Debug().Table("itens_fatura").
		Select("itens.descricao, itens_fatura.*").
		Joins("JOIN itens ON itens_fatura.cod_item = itens.cod_item AND itens_fatura.cod_tipo_item = itens.cod_tipo_item WHERE num_nf = ? AND cod_ibge = ? ORDER BY itens_fatura.cod_tipo_item, itens_fatura.cod_item", numNF, codIbge).
		Scan(&allItensFatura).Error
	if err != nil {
		return &[]ItensFatura{}, err
	}

	for i, data := range allItensFatura {
		//	Busca um elemento no banco de dados a partir de sua chave primaria
		err := db.Debug().
			Raw("SELECT (SELECT SUM(itens_empenho.quantidade) AS quantidade_itens_empenho FROM itens_empenho WHERE itens_empenho.id_empenho = ? AND itens_empenho.cod_tipo_item = ? AND itens_empenho.cod_item = ?) - (SELECT SUM(itens_fatura.quantidade) AS quantidade_itens_fatura FROM itens_fatura WHERE itens_fatura.id_empenho = ? AND itens_fatura.cod_tipo_item = ? AND itens_fatura.cod_item = ?) AS quantidade_disponivel", data.IDEmpenho, data.CodTipoItem, data.CodItem, data.IDEmpenho, data.CodTipoItem, data.CodItem).
			Scan(&allItensFatura[i]).Error
		if err != nil {
			return &[]ItensFatura{}, err
		}
	}

	return &allItensFatura, err
}

/*  =========================
	FUNCAO EDITAR ITENS FATURA
=========================  */

func (itensFatura *ItensFatura) UpdateItensFatura(db *gorm.DB, numNF, codIbge, idEmpenho, codItem, codTipoItem uint32) (*ItensFatura, error) {

	//	Permite a atualizacao dos campos indicados
	db = db.Debug().Exec("UPDATE itens_fatura SET valor = ?, quantidade = ? WHERE num_nf = ? AND cod_ibge = ? AND id_empenho = ? AND cod_item = ? AND cod_tipo_item = ?", itensFatura.Valor, itensFatura.Quantidade, numNF, codIbge, idEmpenho, codItem, codTipoItem)
	if db.Error != nil {
		return &ItensFatura{}, db.Error
	}

	//	Busca um elemento no banco de dados a partir de sua chave primaria
	err := db.Debug().Model(&ItensFatura{}).Take(&itensFatura).Error
	if err != nil {
		return &ItensFatura{}, err
	}

	return itensFatura, err
}

/*  =========================
	FUNCAO DELETAR ITENS OTB POR ID
=========================  */

func (itensFatura *ItensFatura) DeleteItensFatura(db *gorm.DB, numNF, cod_ibge, idEmpenho, codItem, codTipoItem uint32) error {

	//	Deleta um elemento contido no banco de dados a partir de sua chave primaria
	db = db.Debug().Model(&ItensFatura{}).Where("num_nf = ? AND cod_ibge = ? AND id_empenho = ? AND cod_item = ? AND cod_tipo_item = ?", numNF, cod_ibge, idEmpenho, codItem, codTipoItem).Take(&ItensFatura{}).Delete(&ItensFatura{})

	return db.Error
}

/*  =========================
	FUNCAO LISTAR TODAS ITENS FATURA DISPONIVEIS
=========================  */

func (itensEmpenho *ItensEmpenho) FindItensFaturaDisponiveis(db *gorm.DB, codIbge uint32) (*[]ItensEmpenho, error) {

	allItensEmpenho := []ItensEmpenho{}

	err := db.Raw("SELECT itens_empenho.* FROM previsao_empenho INNER JOIN itens_empenho on previsao_empenho.cod_previsao_empenho = itens_empenho.cod_previsao_empenho WHERE previsao_empenho.tipo = 'o' AND previsao_empenho.cod_lote = (SELECT cd.cod_lote FROM cd WHERE cd.cod_ibge = ?) ORDER BY id_empenho, cod_tipo_item, cod_item", codIbge).
		Scan(&allItensEmpenho).Error
	if err != nil {
		return &[]ItensEmpenho{}, err
	}

	for i, data := range allItensEmpenho {
		//	Busca um elemento no banco de dados a partir de sua chave primaria
		err := db.Debug().
			Raw("SELECT (SELECT itens_empenho.quantidade FROM itens_empenho WHERE id_empenho = ? AND cod_item = ? AND cod_tipo_item = ?) - (SELECT SUM(itens_fatura.quantidade) AS quantidade_fatura FROM fatura INNER JOIN itens_fatura ON fatura.num_nf = itens_fatura.num_nf AND fatura.cod_ibge = itens_fatura.cod_ibge WHERE fatura.cod_ibge IN (SELECT cd.cod_ibge FROM cd where cd.cod_lote = (SELECT cd.cod_lote FROM cd WHERE cd.cod_ibge = ?)) AND id_empenho = ? AND cod_item = ? AND cod_tipo_item = ?) AS quantidade_disponivel, itens.descricao AS descricao FROM itens_empenho INNER JOIN itens ON itens_empenho.cod_item = itens.cod_item AND itens_empenho.cod_tipo_item = itens.cod_tipo_item WHERE itens_empenho.id_empenho = ? AND itens_empenho.cod_item = ? AND itens_empenho.cod_tipo_item = ?", data.IDEmpenho, data.CodItem, data.CodTipoItem, codIbge, data.IDEmpenho, data.CodItem, data.CodTipoItem, data.IDEmpenho, data.CodItem, data.CodTipoItem).
			Scan(&allItensEmpenho[i]).Error
		if err != nil {
			return &[]ItensEmpenho{}, err
		}
	}

	return &allItensEmpenho, err
}
