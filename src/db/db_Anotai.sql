-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: anotai
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `arquivos_meta`
--

DROP TABLE IF EXISTS `arquivos_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arquivos_meta` (
  `id_arquivo` int NOT NULL AUTO_INCREMENT,
  `id_meta` int NOT NULL,
  `nome_arquivo` varchar(100) NOT NULL,
  `descricao_arquivo` varchar(50) DEFAULT NULL,
  `url_arquivo` varchar(255) NOT NULL,
  `data_upload` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_arquivo`),
  KEY `id_meta` (`id_meta`),
  CONSTRAINT `arquivos_meta_ibfk_1` FOREIGN KEY (`id_meta`) REFERENCES `metas` (`id_metas`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arquivos_meta`
--

LOCK TABLES `arquivos_meta` WRITE;
/*!40000 ALTER TABLE `arquivos_meta` DISABLE KEYS */;
INSERT INTO `arquivos_meta` VALUES (1,2,'Carta de apresentaÃ§Ã£o.pdf','','/uploads/1750110264211-arquivos.pdf','2025-06-16 18:44:24'),(2,3,'bombap.jpg','','/uploads/1750128580316-arquivos.jpg','2025-06-16 23:49:40'),(3,4,'Carta de apresentaÃ§Ã£o.pdf','','/uploads/1750129255540-arquivos.pdf','2025-06-17 00:00:55'),(4,5,'Carta de apresentaÃ§Ã£o.pdf','','/uploads/1750129308090-arquivos.pdf','2025-06-17 00:01:48'),(5,6,'Carta de apresentaÃ§Ã£o.pdf','','/uploads/1750129308110-arquivos.pdf','2025-06-17 00:01:48'),(6,7,'Carta de apresentaÃ§Ã£o.pdf','','/uploads/1750129308137-arquivos.pdf','2025-06-17 00:01:48'),(7,8,'Carta de apresentaÃ§Ã£o.pdf','','/uploads/1750131589456-arquivos.pdf','2025-06-17 00:39:49'),(8,14,'Carta de apresentaÃ§Ã£o.pdf','','/uploads/1750209333170-arquivos.pdf','2025-06-17 22:15:33'),(9,15,'Carta de apresentaÃ§Ã£o.pdf','','/uploads/1750213259179-arquivos.pdf','2025-06-17 23:20:59'),(10,16,'Carta de apresentaÃ§Ã£o.pdf','','/uploads/1750253009419-arquivos.pdf','2025-06-18 10:23:29');
/*!40000 ALTER TABLE `arquivos_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metas`
--

DROP TABLE IF EXISTS `metas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metas` (
  `id_metas` int NOT NULL AUTO_INCREMENT,
  `id_playlist` int NOT NULL,
  `nome_meta` varchar(50) NOT NULL,
  `descricao_meta` varchar(50) DEFAULT NULL,
  `url_imagem_meta` varchar(255) DEFAULT NULL,
  `prioridade_meta` enum('baixa','média','alta') NOT NULL,
  `concluida` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_metas`),
  KEY `id_playlist` (`id_playlist`),
  CONSTRAINT `metas_ibfk_1` FOREIGN KEY (`id_playlist`) REFERENCES `playlist` (`id_playlist`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metas`
--

LOCK TABLES `metas` WRITE;
/*!40000 ALTER TABLE `metas` DISABLE KEYS */;
INSERT INTO `metas` VALUES (1,4,'asdasd','asdasd','/uploads/1750105245737-imagem_meta.png','baixa',0),(2,6,'awdawd','wedwdw','/uploads/1750110264210-imagem_meta.png','baixa',0),(3,7,'meta1','sdDGdgDGjm,.dgjklDGJK,LdjklfDKLFKLÇjdklçfçLDFJKLÇ','/uploads/1750128580315-imagem_meta.png','baixa',0),(4,8,'meta1','sdDGdgDGjm,.dgjklDGJK,LdjklfDKLFKLÇjdklçfçLDFJKLÇ','/uploads/1750129255540-imagem_meta.png','baixa',0),(5,9,'meta1','sdDGdgDGjm,.dgjklDGJK,LdjklfDKLFKLÇjdklçfçLDFJKLÇ','/uploads/1750129308090-imagem_meta.png','baixa',0),(6,9,'meta2','sdDGdgDGjm,.dgjklDGJK,LdjklfDKLFKLÇjdklçfçLDFJKLÇ','/uploads/1750129308109-imagem_meta.png','baixa',0),(7,9,'meta3','sdDGdgDGjm,.dgjklDGJK,LdjklfDKLFKLÇjdklçfçLDFJKLÇ','/uploads/1750129308137-imagem_meta.png','baixa',0),(8,10,'meta1','sdDGdgDGjm,.dgjklDGJK,LdjklfDKLFKLÇjdklçfçLDFJKLÇ','/uploads/1750131589456-imagem_meta.png','baixa',0),(9,11,'Atualizar currículo','Revisar e atualizar com cursos recentes',NULL,'alta',0),(10,12,'Criar testes de login','Cobertura com Cypress para autenticação',NULL,'média',0),(11,13,'Estudar listas e dicionários','Prática com estruturas em Python',NULL,'alta',0),(12,14,'Montar plano de aulas','Planejar 10 aulas para o módulo de Python',NULL,'média',0),(13,15,'Jorge e Mateus','Musicas do Jorge e Mateus',NULL,'média',0),(14,16,'meta 1','comece criando um perfil nas redes sociais','/uploads/1750209333170-imagem_meta.png','baixa',0),(15,17,'ir pra academia','esteira','/uploads/1750213259179-imagem_meta.png','alta',0),(16,18,'ir pra academia','esteira','/uploads/1750253009419-imagem_meta.png','baixa',0);
/*!40000 ALTER TABLE `metas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfil`
--

DROP TABLE IF EXISTS `perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perfil` (
  `id_perfil` int NOT NULL,
  `nome_perfil` varchar(50) DEFAULT NULL,
  `nome` varchar(50) NOT NULL,
  `sobrenome` varchar(50) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `sobre_mim` text NOT NULL,
  `url_image_perfil` varchar(255) DEFAULT NULL,
  `url_instagram` varchar(255) DEFAULT NULL,
  `url_linkedin` varchar(255) DEFAULT NULL,
  `url_github` varchar(255) DEFAULT NULL,
  `tag_perfil` varchar(20) DEFAULT NULL,
  `media_avaliacao` float DEFAULT '0',
  `qtd_avaliacoes` int DEFAULT '0',
  `url_wallpaper` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_perfil`),
  CONSTRAINT `perfil_ibfk_1` FOREIGN KEY (`id_perfil`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil`
--

LOCK TABLES `perfil` WRITE;
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
INSERT INTO `perfil` VALUES (6,'LucasFerraz','Lucas','Ferraz','Engenheiro de software','Apaixonado por tecnologia e inovação.','lhama.jpeg',NULL,NULL,NULL,'tecnologia',0,0,NULL),(7,'FernandaDias','Fernanda','Dias','Dev Front-End','Amante de interfaces e interações','galo.jpeg','gggggggggggg','hhhhhhhhhhh','-','frontend',0,0,NULL),(8,'JoaoCardoso','João','Cardoso','Estudante de Engenharia','Gosto de matemática, lógica e construir soluções','cachorro-nike.jpeg','gabriel','gabriel','-','engenharia',0,0,NULL),(9,'Cams','Camila','Meira','Médica','DJIKOÇGHLABJSFASJKFJKLÇASFÇJKASFKLÇASÇFASJKLÇFÇASJKLF>','1750133057167-imagemPerfil.jpeg','camila','camila','camila','Camila',0,0,'1750133057168-wallpaper.jpeg'),(10,'LiviaSouza','Lívia','Souza','Designer Gráfico','Trabalho com identidade visual e ilustração digital','dogo!!.jpeg','CAIQUE','CAIQUE','-','design',0,0,NULL),(11,'Madureira','gabriel','madureira','asdasdasd','asdasdasdasd','1750046338775-imagemPerfil.jpeg','gabriel','gabriel','gabriel','madureira',0,0,'1750046338776-wallpaper.jpeg'),(12,'MariaLopes','Maria','Lopes','Estudante de ADS','Quero aprender programação e conseguir meu primeiro emprego na área','cachoro.jpeg','Maria','Maria','Maria','banco de dados',0,0,NULL),(13,'ViniciusMendes','Vinícius','Mendes','QA Tester','Sou especialista em testes de software','bombap.jpg',NULL,NULL,NULL,'qa',0,0,NULL),(14,'PatriciaMendes','Patrícia','Amaral','Data Analyst','Trabalho com dados e gosto de descobrir padrões','dogo!!.jpeg',NULL,NULL,NULL,'dados',0,0,NULL),(15,'AndreRibeiro','André','Nascimento','Professor de TI','Ensino lógica, Python e banco de dados','galo.jpeg',NULL,NULL,NULL,'educador',0,0,NULL),(16,'Caique','caique','Vilareal','Catira','adASdfASfSLfgSDJKLfgjklDG','1750210270929-imagemPerfil.jpeg','caique','caique','caique',NULL,0,0,'1750210270930-wallpaper.jpeg'),(17,'Otavio.SN08','Otavio','Stefanine','teste','oi',NULL,NULL,NULL,NULL,NULL,0,0,NULL),(18,'Exemplo','Exemplo','Exemplo','Exemplo','Exemplo','1750198468225-imagemPerfil.jpeg','exemplo','exemplo','exemplo',NULL,0,0,'1750198468225-wallpaper.jpeg'),(19,'Eduardo','Eduardo','Matos','Engenheiro','dfjklsdfhjkGSDJKLfghSDJKLFSDfgSDJKLfSGfgjSDJfklSDGfjklSDfSDLfgjkSDFSDGJKLfSDfSDKLfSDGJKLfgjkl','1750208942197-imagemPerfil.jpeg','eduardo','eduardo','eduardo',NULL,0,0,'1750208942199-wallpaper.jpeg'),(20,'dudu','eduardo','matos','jogador','jogo muita bola','1750212980459-imagemPerfil.jpeg','eduardo','eduardo','eduardo',NULL,0,0,NULL);
/*!40000 ALTER TABLE `perfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist` (
  `id_playlist` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `nome_playlist` varchar(50) NOT NULL,
  `descricao_playlist` text,
  `categoria_playlist` varchar(20) DEFAULT NULL,
  `tag_playlist` varchar(20) DEFAULT NULL,
  `prioridade` enum('baixa','média','alta') NOT NULL,
  `data_conclusao` int NOT NULL,
  `visibilidade` enum('publico','privado') NOT NULL DEFAULT 'privado',
  `media_avaliacao` float DEFAULT '0',
  `qtd_avaliacoes` int DEFAULT '0',
  `url_imagem_playlist` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_playlist`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `playlist_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist`
--

LOCK TABLES `playlist` WRITE;
/*!40000 ALTER TABLE `playlist` DISABLE KEYS */;
INSERT INTO `playlist` VALUES (1,6,'Horta Orgânica em Casa','Dicas para cultivar hortaliças e temperos na sua casa','Hobbies','horta','média',20260221,'publico',0,0,'horta_organica.jpg'),(2,6,'Flores para Ambientes Internos','Como cultivar flores que se adaptam bem ao interior da casa','Hobbies','flores','média',20260221,'publico',0,0,'flores_internas.jpg'),(3,11,'Desenvolvimento Web','Aprenda a criar sites do zero','Tecnologia','web','média',20260219,'publico',0,0,'1750048689053-imagem.jpeg'),(4,9,'Receitas Veganas','Deliciosas receitas veganas para o dia a dia','Culinária','vegan','baixa',20260124,'publico',0,0,'receitas_veganas.jpg'),(5,9,'Fotografia Básica','Dicas e técnicas para iniciantes em fotografia','Arte','fotografia','baixa',20260214,'publico',0,0,'fotografia_basica.jpg'),(6,9,'Meditação e Relaxamento','Práticas diárias para reduzir o estresse','Saúde','meditação','alta',20250717,'publico',0,0,NULL),(7,9,'Ervas Medicinais em Vasos','Cultivo de ervas como hortelã, alecrim e lavanda em pequenos espaços','Finanças','ervas','alta',20260307,'publico',0,0,'ervas_medicinais.jpg'),(8,9,'Jardinagem em Casa','Como cultivar plantas e flores em casa','Hobbies','jardinagem','média',20260221,'publico',0,0,'1750129252446-imagem.jpeg'),(9,9,'Paisagismo Residencial','Ideias de jardinagem para transformar seu quintal ou varanda','Hobbies','paisagismo','média',20260221,'publico',0,0,'paisagismo_residencial.jpg'),(10,9,'Jardinagem em Casa','Como cultivar plantas e flores em casa','Hobbies','jardinagem','média',20260221,'publico',0,0,'1750131588200-imagem.jpg'),(11,12,'Estágio dos sonhos','Metas para conquistar meu primeiro emprego','Tecnologia','carreira','alta',20250701,'publico',0,0,NULL),(12,13,'Testes Automatizados','Planejamento de testes com Cypress','Qualidade','automacao','média',20250710,'publico',0,0,'testes_automatizados.jpg'),(13,14,'Estudo de Python','Aprender do básico ao avançado','Tecnologia','python','alta',20250801,'publico',0,0,'estudo_python.jpg'),(14,15,'Conteúdo de aula','Planejamento do próximo semestre','Educação','aulas','média',20250830,'publico',0,0,'aula.jpeg'),(15,17,'Aprender a tocar violão','Playlist de aprender a tocar violão','Educação','Viagem','média',20250617,'privado',0,0,'violao_aprendizado.jpg'),(16,16,'como fazer a primeira venda','Aprende o passo a passo de como começar a fazer a sua catira','Educação','Dinheiro','média',20250618,'privado',0,0,'1750209331694-imagem.jpg'),(17,20,'rotina  de treino','treinar','Tecnologia','Python','média',20250618,'privado',0,0,'1750213256703-imagem.jpeg'),(18,11,'rotina  de treino','treinar','Saúde','Fitness','alta',20250618,'privado',0,0,'1750253008184-imagem.jpeg');
/*!40000 ALTER TABLE `playlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `email` varchar(200) NOT NULL,
  `senha_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (6,'lucas.ferraz@gmail.com','$2b$10$RZ0dM9cKoBd3wHcR.lfxIuE6ZK1CilI2FXAnxUoZz7i1YBP0qAcrC'),(7,'fernanda.dias@gmail.com','$2b$10$RZ0dM9cKoBd3wHcR.lfxIuE6ZK1CilI2FXAnxUoZz7i1YBP0qAcrC'),(8,'joao.cardoso@gmail.com','$2b$10$RZ0dM9cKoBd3wHcR.lfxIuE6ZK1CilI2FXAnxUoZz7i1YBP0qAcrC'),(9,'camila@gmail.com','$2b$10$fZYeoA6tVY3fWDRaSG7kQOEPKEFC7v/5EqfmBqVfPKL60cRMd4D7.'),(10,'livia.souza@gmail.com','$2b$10$RZ0dM9cKoBd3wHcR.lfxIuE6ZK1CilI2FXAnxUoZz7i1YBP0qAcrC'),(11,'gabriel@gmail.com','$2b$10$KiLbuI8FUR1XLg6Imh8b4ukkN2YK5CI0RRpiqK8jeox7EGFHdwOK.'),(12,'maria@gmail.com','$2b$10$RZ0dM9cKoBd3wHcR.lfxIuE6ZK1CilI2FXAnxUoZz7i1YBP0qAcrC'),(13,'vinicius@gmail.com','$2b$10$RZ0dM9cKoBd3wHcR.lfxIuE6ZK1CilI2FXAnxUoZz7i1YBP0qAcrC'),(14,'patricia@gmail.com','$2b$10$RZ0dM9cKoBd3wHcR.lfxIuE6ZK1CilI2FXAnxUoZz7i1YBP0qAcrC'),(15,'andre@gmail.com','$2b$10$RZ0dM9cKoBd3wHcR.lfxIuE6ZK1CilI2FXAnxUoZz7i1YBP0qAcrC'),(16,'caique@gmail.com','$2b$10$KKigMJgPsMeeVfXeF9R8.ehf/Xhx7FhZd.QCYnZZu7sD5ihHl2oaW'),(17,'otaviostefanine@gamil.com','$2b$10$9en84.PpmSrBGZVQ7KXdz.Y7CwegGRwzRy/.H0A8aUT/L6FWyUS46'),(18,'exemplo@gmail.com','$2b$10$wP0wLuCo1Bkb.zWT9gsmjuhD6JpWQoMuHu0L8YFiwqI0GT2udlO0C'),(19,'eduardomatos.mg@gmail.com','$2b$10$p560A5jCl3ZC5c7eoHKT/eeHJH0J/hFx.qD397PcoKyc0G3qNs3Wi'),(20,'eduardo@gmail.com','$2b$10$NlZ939JPsAvfAfDGauCgj.QWYFQupO.TSnYKqsVKyLNlQc9kpakwW');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-18 10:51:27
