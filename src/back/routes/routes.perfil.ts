import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import * as yup from "yup";

const prisma = new PrismaClient();
const router = Router();

const perfilSchema = yup.object({
  id_perfil: yup.number().required(),
  nome: yup.string().max(50).required(),
  sobrenome: yup.string().max(50).required(),
  descricao: yup.string().max(100).required(),
  sobre_mim: yup.string().required(),
  url_image_perfil: yup.string().max(255),
  url_instagram: yup.string().max(255),
  url_linkedin: yup.string().max(255),
  url_github: yup.string().max(255),
  tag_perfil: yup.string().max(20),
  media_avaliacao: yup.number(),
  qtd_avaliacoes: yup.number(),
});

router.post("/", async (req, res) => {
  try {
    await perfilSchema.validate(req.body);
    const perfil = await prisma.perfil.create({ data: req.body });
    res.status(201).json(perfil);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(400).json({ error: "Erro ao criar perfil" });
    }
  }
});

router.get("/", async (req, res) => {
  const perfis = await prisma.perfil.findMany();
  res.json(perfis);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const perfil = await prisma.perfil.findUnique({
    where: { id_perfil: Number(id) },
  });
  if (perfil) res.json(perfil);
  else res.status(404).json({ error: "Perfil não encontrado" });
});

router.put("/:id", async (req, res) => {
  try {
    await perfilSchema.validate(req.body);
    const { id } = req.params;
    const perfil = await prisma.perfil.update({
      where: { id_perfil: Number(id) },
      data: req.body,
    });
    res.json(perfil);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(400).json({ error: "Erro ao atualizar perfil" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.perfil.delete({ where: { id_perfil: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar perfil" });
  }
});

export default router;
