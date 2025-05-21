CREATE TABLE IF NOT EXISTS usuario (
  id_usuario SERIAL PRIMARY KEY,
  email VARCHAR(200) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS playlist (
  id_playlist SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL,
  nome_playlist VARCHAR(50) NOT NULL,
  descricao_playlist VARCHAR(50),
  categoria_playlist VARCHAR(20),
  tag_playlist VARCHAR(20),
  prioridade VARCHAR(10) NOT NULL CHECK (prioridade IN ('baixa', 'média', 'alta')),
  data_conclusao INT NOT NULL,
  visibilidade VARCHAR(10) NOT NULL DEFAULT 'privado' CHECK (visibilidade IN ('publico', 'privado')),
  media_avaliacao FLOAT DEFAULT 0,
  qtd_avaliacoes INT DEFAULT 0,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS metas (
  id_metas SERIAL PRIMARY KEY,
  id_playlist INT NOT NULL,
  nome_meta VARCHAR(50) NOT NULL,
  descricao_meta VARCHAR(50),
  url_imagem_meta VARCHAR(255),
  prioridade_meta VARCHAR(10) NOT NULL CHECK (prioridade_meta IN ('baixa', 'média', 'alta')),
  concluida BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (id_playlist) REFERENCES playlist(id_playlist) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS arquivos_meta (
  id_arquivo SERIAL PRIMARY KEY,
  id_meta INT NOT NULL,
  nome_arquivo VARCHAR(100) NOT NULL,
  descricao_arquivo VARCHAR(50),
  url_arquivo VARCHAR(255) NOT NULL,
  data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_meta) REFERENCES metas(id_metas) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS perfil (
  id_perfil INT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  sobrenome VARCHAR(50) NOT NULL,
  descricao VARCHAR(100) NOT NULL,
  sobre_mim TEXT NOT NULL,
  url_image_perfil VARCHAR(255),
  url_instagram VARCHAR(255),
  url_linkedin VARCHAR(255),
  url_github VARCHAR(255),
  tag_perfil VARCHAR(20),
  media_avaliacao FLOAT DEFAULT 0,
  qtd_avaliacoes INT DEFAULT 0,
  FOREIGN KEY (id_perfil) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);
ALTER TABLE playlist ALTER COLUMN data_conclusao TYPE DATE USING to_date(data_conclusao::text, 'YYYYMMDD');

