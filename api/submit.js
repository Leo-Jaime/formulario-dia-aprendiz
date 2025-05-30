import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const data = req.body;

    // Chave do Apps Script guardada em variável de ambiente
    const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

    // Envia para o Apps Script via POST (form-urlencoded)
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
}
