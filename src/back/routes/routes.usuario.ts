import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import * as yup from "yup";

const prisma = new PrismaClient();
const router = Router();

const usuarioSchema = yup.object({
  email: yup.string().email().max(200).required(),
  senha_hash: yup.string().max(255).required(),
});

const loginSchema = yup.object({
  email: yup.string().email().max(200).required(),
  senha: yup.string().max(255).required(),
});

router.get("/", async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});

router.post("/", async (req, res) => {
  try {
    await usuarioSchema.validate(req.body);
    const { email, senha_hash } = req.body;
    const usuario = await prisma.usuario.create({
      data: { email, senha_hash },
    });
    res.status(201).json(usuario);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(400).json({ error: "Erro ao criar usuário" });
    }
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const usuario = await prisma.usuario.findUnique({
    where: { id_usuario: Number(id) },
  });
  if (usuario) res.json(usuario);
  else res.status(404).json({ error: "Usuário não encontrado" });
});

router.put("/:id", async (req, res) => {
  try {
    await usuarioSchema.validate(req.body);
    const { id } = req.params;
    const { email, senha_hash } = req.body;
    const usuario = await prisma.usuario.update({
      where: { id_usuario: Number(id) },
      data: { email, senha_hash },
    });
    res.json(usuario);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(400).json({ error: "Erro ao atualizar usuário" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.usuario.delete({ where: { id_usuario: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar usuário" });
  }
});



router.post("/login", async (req, res) => {
  try {
    await loginSchema.validate(req.body);
    const { email, senha } = req.body;
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario || usuario.senha_hash !== senha) {
       res.status(401).json({ error: "Credenciais inválidas" });
    }

     res.json({ message: "Login bem-sucedido", usuario });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(400).json({ error: "Erro ao criar usuário" });
    }
  }
});



export default router;
