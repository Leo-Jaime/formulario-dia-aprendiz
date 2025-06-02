
# Landing Page – Dia do Aprendiz

Este projeto é uma landing page criada para a campanha **"Dia do Aprendiz"** da empresa **Quality Info**, localizada em Goianira - GO. A página tem como objetivo captar leads interessados em cursos de aprendizagem e registrar essas informações em uma planilha do Google.

🔗 **Acesse o projeto em produção:**  
👉 [https://formulario-dia-aprendiz-nhonpnq0v-leo-jaimes-projects-88059b3d.vercel.app](https://formulario-dia-aprendiz-nhonpnq0v-leo-jaimes-projects-88059b3d.vercel.app)

---

## 🚀 Tecnologias Utilizadas

- **HTML5**
- **Tailwind CSS**
- **JavaScript (Vanilla)**
- **Google Apps Script** (envio de formulário para o Google Sheets)
- **Node.js** (opcional como backend alternativo)
- **Vercel** (hospedagem gratuita)
- **GitHub** (versionamento)

---

## 📋 Funcionalidades

- Formulário com:
  - Nome
  - Telefone
  - Curso de interesse
- Envio de dados para uma **planilha do Google Sheets** via Apps Script
- Redirecionamento para uma página de agradecimento (`agradecimento.html`)
- Alternativa de envio usando **backend em Node.js com `.env` seguro** (ver abaixo)

---

## 🌐 Como rodar localmente

1. Clone o repositório:

```bash
git clone https://github.com/Leo-Jaime/formulario-dia-aprendiz.git
cd formulario-dia-aprendiz
```

2. Abra o arquivo `index.html` no navegador ou use uma extensão como Live Server no VSCode.

---

## 🧠 Envio dos dados – Duas opções:

### ✅ 1. Google Apps Script (sem backend)

- Os dados são enviados diretamente para a URL de um script publicado do Google Apps Script.
- Esse script precisa estar **vinculado a uma planilha do Google**, com permissões públicas ativadas para permitir o envio.

Exemplo do JavaScript usado:

```js
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);

  await fetch('https://script.google.com/macros/s/SEU_ID_DO_SCRIPT/exec', {
    method: 'POST',
    body: data,
  });

  window.location.href = '/agradecimento.html';
});
```

> ⚠️ **Atenção**: A URL do script fica visível no HTML. Para esconder essa chave, veja a opção abaixo.

---

### 🔐 2. Usando um backend em Node.js com `.env`

Você pode usar um pequeno servidor para **esconder o endpoint do Apps Script**, roteando os dados com segurança.

#### Instalar dependências:

```bash
npm install express cors dotenv
```

#### Estrutura simples (`server.js`):

```js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post('/enviar', async (req, res) => {
  const response = await fetch(process.env.APPS_SCRIPT_URL, {
    method: 'POST',
    body: new URLSearchParams(req.body),
  });

  res.status(200).json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
```

#### .env

```
APPS_SCRIPT_URL=https://script.google.com/macros/s/SEU_ID_DO_SCRIPT/exec
```

> O frontend envia os dados para `/enviar`, e o backend repassa para o Apps Script escondido no `.env`.

---

## 🚀 Hospedagem na Vercel

- A Vercel foi usada para hospedar a landing page gratuitamente.
- Para usar o backend com segurança na Vercel:
  - Suba a pasta com o backend separadamente como outro projeto.
  - Configure suas variáveis de ambiente via painel da Vercel.

---

## 📧 Contato

Caso tenha interesse em personalizar uma landing page como esta para sua empresa, entre em contato:

**Léo Jaime**  
📞 (62) 9 8441-1641  
📧 leojaime253@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/leo-jaime/)

---

**Projeto feito com dedicação para contribuir com o crescimento da educação profissional em Goianira - GO.**
