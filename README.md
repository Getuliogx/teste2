# Painel Filmes & Séries + Chat por gênero

## 1) GitHub
1. Crie um repositório novo e suba **esta pasta inteira** (menos a pasta `widget`, se quiser) — `.env` fica de fora.
2. `git init && git add . && git commit -m "painel" && git remote add origin SEU_REPO && git push -u origin main`

## 2) Render
1. render.com → **New + → Web Service** → conecte o repositório do GitHub.
2. Build Command: `npm install` · Start Command: `npm start`
3. Em **Environment** adicione:
   - `TMDB_TOKEN` = seu token de leitura do TMDB
   - `PANEL_PASSWORD` = uma senha (opcional, mas recomendado)
4. Deploy. Abra `https://SEU-APP.onrender.com` → esse é o painel.

## 3) Chat (StreamElements)
Na pasta `widget/` estão os arquivos do seu chat já atualizados (HTML, CSS, JS, Fields, Data).
Cole cada um no Custom Widget e, em **Fields → Tema por gênero**, coloque a URL do seu app no Render.

Pronto: pesquise no painel, clique no filme/série e o chat muda na hora (cores, fonte, bordas, emoji).

Obs.: no plano grátis do Render o app "dorme" após inatividade (1º acesso demora ~30s) e a seleção é perdida quando reinicia.
