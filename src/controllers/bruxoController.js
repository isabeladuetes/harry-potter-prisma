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
