# Palazzina Iezzi

Primo prototipo statico per presentare l'oggetto immobiliare Palazzina Iezzi.

Il sito e' costruito con HTML, CSS e JavaScript semplici, senza framework e senza build step.

## Struttura

```text
Palazzina_manoppello/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── esterno_codex.png
    ├── interni_codex.png
    ├── piano_commerciale_codex.png
    └── videos/
        ├── rendering_interni_appartamento_codex.mp4
        ├── rendering_palazzina_codex.mp4
        └── rendering_piano_commerciale_codex.mp4
```

## Come aprirlo in locale

Apri `index.html` direttamente nel browser.

In alternativa, dalla cartella del progetto puoi usare un piccolo server locale:

```bash
python3 -m http.server 8000
```

Poi visita:

```text
http://localhost:8000
```

## Note

- Il progetto non e' ancora collegato a GitHub.
- Le immagini del sito sono nella cartella `assets/`.
- I video render sono nella cartella `assets/videos/`.
- I testi, i colori e le sezioni principali si modificano in `index.html` e `style.css`.
