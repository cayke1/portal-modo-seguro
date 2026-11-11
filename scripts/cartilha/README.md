# Cartilha PDF

`cartilha.html` é a fonte da cartilha baixável do portal. O PDF servido fica em
`public/downloads/cartilha.pdf` (é ele que a página `/cartilha` detecta e oferece para download).

## Regerar o PDF

Depois de editar `cartilha.html`, gere o PDF com o Chrome em modo headless (não adiciona nenhuma
dependência ao projeto):

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --headless --disable-gpu --no-pdf-header-footer --virtual-time-budget=10000 \
  --print-to-pdf="public/downloads/cartilha.pdf" \
  "file:///C:/Workspace/portal-modo-seguro/scripts/cartilha/cartilha.html"
```

No Windows, pode usar `msedge.exe` no lugar do Chrome — os mesmos parâmetros funcionam.

Confira o resultado abrindo o PDF e a página `/cartilha` (`npm run dev`). O conteúdo é um resumo
dos 5 módulos; mantenha-o alinhado com `content/modulos/*.mdx` e `content/checklist.json`.
