# EIRA Atelier

MVP conceitual de uma joalheria contemporânea em Next.js. A marca, os produtos, os preços e as políticas são conteúdo demonstrativo e devem ser substituídos antes de qualquer operação comercial.

## Direção de marca

- Posicionamento: joalheria fina contemporânea, arquitetônica e silenciosa.
- Público: pessoas de 28 a 48 anos que compram design autoral e objetos de longa duração.
- Percepção de preço: R$ 6.800 a R$ 15.800 no catálogo demonstrativo.
- Universo visual: prata, grafite, vidro fumê e azul glacial.
- Tipografia: Geist, sem serifas, com contraste criado por escala, respiro e precisão.
- Experiência assinatura: a joia é revelada em camadas durante o scroll.
- CTA principal: Conhecer Coleção.

## Vídeo futuro da hero

O Higgsfield não é usado nesta versão. Quando o vídeo estiver pronto, configure `NEXT_PUBLIC_HERO_VIDEO_URL` em `.env.local`. A hero troca automaticamente a fotografia pelo vídeo e mantém a imagem atual como poster e fallback mobile.

## Desenvolvimento

```bash
npm install
npm run dev
npm run build
```

As imagens originais geradas estão em `images/`. Cópias servidas pelo Next.js ficam em `public/images/`.
