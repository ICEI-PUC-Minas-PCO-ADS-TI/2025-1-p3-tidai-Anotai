import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import * as yup from "yup";

const prisma = new PrismaClient();
const router = Router();

const playlistSchema = yup.object({
  id_usuario: yup.number().required(),
  nome_playlist: yup.string().max(50).required(),
  descricao_playlist: yup.string().max(50),
  categoria_playlist: yup.string().max(20),
  tag_playlist: yup.string().max(20),
  prioridade: yup.string().oneOf(["baixa", "média", "alta"]).required(),
  data_conclusao: yup.number().required(),
  visibilidade: yup.string().oneOf(["publico", "privado"]),
  media_avaliacao: yup.number(),
  qtd_avaliacoes: yup.number(),
});

router.post("/", async (req, res) => {
  try {
    await playlistSchema.validate(req.body);
    const playlist = await prisma.playlist.create({ data: req.body });
    res.status(201).json(playlist);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(400).json({ error: "Erro ao criar playlist" });
    }
  }
});

router.get("/", async (req, res) => {
  const playlists = await prisma.playlist.findMany();
  res.json(playlists);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const playlist = await prisma.playlist.findUnique({
    where: { id_playlist: Number(id) },
  });
  if (playlist) res.json(playlist);
  else res.status(404).json({ error: "Playlist não encontrada" });
});

router.put("/:id", async (req, res) => {
  try {
    await playlistSchema.validate(req.body);
    const { id } = req.params;
    const playlist = await prisma.playlist.update({
      where: { id_playlist: Number(id) },
      data: req.body,
    });
    res.json(playlist);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(400).json({ error: "Erro ao atualizar playlist" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.playlist.delete({ where: { id_playlist: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar playlist" });
  }
});

export default router;
