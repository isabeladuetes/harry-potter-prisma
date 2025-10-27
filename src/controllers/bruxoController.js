//Logica, tratativa de erros e regras de negócio

//importar o Model
import * as BruxoModel from "./../models/bruxoModel.js";

export const listarTodos = async (req, res) => {
  try {
    const bruxos = await BruxoModel.findAll();

    if (!bruxos || bruxos.length === 0) {
      res.status(404).json({
        total: bruxos.length,
        message: "Não há bruxos na lista",
        bruxos,
      });
    }

    res.status(200).json({
      total: bruxos.length,
      message: "Lista de bruxos",
      bruxos,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erro interno de servidor",
      detalhes: error.message,
      status: 500,
    });
  }
};

export const listarUm = async (req, res) => {
  try {
    const id = req.params.id;
    const bruxo = await BruxoModel.findById(id);

    if (!bruxo) {
      return res.status(404).json({
        error: "Bruxo não encontrado!",
        message: "Verifique se o id do bruxo existe",
        id: id,
      });
    }
    res.status(200).json({
      message: "Bruxo encontrado",
      bruxo,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar bruxo por id",
      detalhes: error.message,
    });
  }
};

export const criar = async (req, res) => {
  try {
    const { nome, casa, patrono, varinha, anoMatricula } = req.body;

    const dado = req.body

    // Validação campos obrigatóriod
    const camposObrigatorios = ['nome', 'casa', 'varinha', 'anoMatricula'];

    const faltando = camposObrigatorios.filter(campo => !dado[campo]);

    if (faltando.length > 0) {
      return res.status(400).json({
        erro: `Os seguintes campos são obrigatórios: ${faltando.join(', ')}.`
      });
    }

    const casasValidas = ['Grifinoria', 'Sonserina', 'Corvinal', 'Lufa-Lufa'];
    if (!casasValidas.includes(casa)) {
      return res.status(400).json({
        erro: 'Casa inválida!',
        casasValidas
      })
    }

    const novoBruxo = await BruxoModel.create(dado);

    res.status(201).json({
      mensagem: 'Bruxo criado com sucesso',
      bruxo: novoBruxo
    })

  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao matricular bruxo',
      detalhes: error.message
    });
  }
};

export const deletar = async (req, res) => {
  try {
    const id = parentInt(req.params.id);

    const bruxoExiste = await BruxoModel.findById(id);

    if (!bruxoExiste) {
      return res.status(404).json({
        erro: 'Bruxo não encontrado no Registro',
        id: id
      });
    }

    await BruxoModel.deleteById(id);

    res.status(200).json({
      mensagem: 'Bruxo removido com sucesso',
      bruxoRemovido: bruxoExiste
    });
  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao remover bruxo',
      detalhes: error.message
    });
  }
};

export const atualizar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const dados = req.body;

    // Verifica se bruxo existe
    const bruxoExiste = await BruxoModel.findById(id);

    if (!bruxoExiste) {
      return res.status(404).json({
        erro: 'Bruxo não encontrado no Livro de Registros',
        id: id
      });
    }

    // Validar casa se fornecida
    if (dados.casa) {
      const casasValidas = ['Grifinória', 'Sonserina', 'Corvinal', 'Lufa-Lufa'];
      if (!casasValidas.includes(dados.casa)) {
        return res.status(400).json({
          erro: 'Casa inválida!',
          casasValidas
        })
      }
    }

    const bruxoAtualizado = await BruxoModel.update(id, dados);

    res.status(200).json({
      mensagem: 'Bruxo atualizado com sucesso',
      bruxo: bruxoAtualizado
    });
  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao atualizar bruxo',
      detalhes: error.message
    });
  }
};