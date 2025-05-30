import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve arquivos estáticos como index.html

app.post('/api/submit', async (req, res) => {
  try {
    const data = req.body;
    const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

    const params = new URLSearchParams(data);

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: params,
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar para Apps Script');
    }

    res.status(200).json({ message: 'Sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
