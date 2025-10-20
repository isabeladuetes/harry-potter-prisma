//é no model que fazemos a consulta para o banco de dados
//ex: SELECT * FROM bruxos; porém estamos usando o PRISMA
//que abstrai o comando SQL

//Importar o prisma Client
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findAll = async () => {
  //SELECT * FROM bruxos = findMany
  return (bruxos = await prisma.bruxo.findMany({
    orderBy: { nome: "asc" },
  }));
};

//Crio a variável findById e já exporto
export const findById = async (id) => {
  //SELECT * FROM bruxos WHERE id = 1;
  return await prisma.bruxo.findUnique({
    where: { id: Number(id) },
  });
};
