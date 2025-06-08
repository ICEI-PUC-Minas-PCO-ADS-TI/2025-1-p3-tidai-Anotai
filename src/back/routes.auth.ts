import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import * as yup from "yup";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();
const router = Router();

const loginSchema = yup.object({
  email: yup.string().email().required(),
  senha: yup.string().required(),
});

router.post("/login", async (req, res) => {
  try {
    await loginSchema.validate(req.body);
    const { email, senha } = req.body;
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });
    if (!usuario) {
      res.status(401).json({ error: "Usuário ou senha inválidos" });
      return;
    }
    // Compara a senha informada com o hash salvo
    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida) {
      res.status(401).json({ error: "Usuário ou senha inválidos" });
      return;
    }
    // Gera o token JWT
    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, email: usuario.email },
      process.env.JWT_SECRET || "segredo_padrao",
      { expiresIn: "1h" }
    );
    res.json({
      mensagem: "Login realizado com sucesso",
      token,
      usuario: { id_usuario: usuario.id_usuario, email: usuario.email },
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(400).json({ error: "Erro ao realizar login" });
    }
  }
});

export default router;
