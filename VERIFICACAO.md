# Verificação da página

Revisão realizada em 26/09/2026 com Chrome DevTools e a skill web-design-guidelines.

## Layout e conteúdo

- Larguras verificadas: 390, 430, 768 e 1440 px. Sem rolagem horizontal do documento.
- O CTA principal termina a aproximadamente 600 px na tela de 390 px e 616 px na tela de 430 px, dentro da primeira tela testada.
- Imagens carregadas, com dimensões reservadas e versões WebP. Imagem de abertura específica para celular; galeria com carregamento adiado.
- Horários não confirmados não são exibidos como fatos. O espaço orienta a consulta por unidade.
- Fotos geradas por IA identificadas como ilustrativas. Não há avaliações, comodidades ou números inventados.

## Interações verificadas

- Abertura do seletor de unidade pelo CTA principal.
- Clique nos dois contatos do WhatsApp, confirmando número e mensagem na página de destino. Nenhuma mensagem foi enviada.
- Fechamento com Escape e retorno do foco ao controle de origem.
- Clique real no Instagram e nos dois links do Google Maps.
- Navegação para os planos e consulta do semestral, com mensagem específica para o plano e a unidade.
- Abertura e fechamento da imagem ampliada da galeria.
- Navegação de âncoras, foco visível e controles sem interação exclusiva por arraste.

## Acessibilidade e desempenho

- Lighthouse final: acessibilidade 100, boas práticas 100 e SEO 100; 49 verificações aprovadas e nenhuma falha no relatório final.
- Rótulos dos planos e unidades ajustados para incluir o texto visível dos controles, facilitando navegação por voz.
- Regras de movimento reduzido verificadas no código: desativam animações, transições e rolagem suave. A revelação no scroll não é ativada quando essa preferência já está selecionada.
- Trace local com perfil Slow 4G e CPU 4x: LCP observado de 1,08 s e CLS 0,00. Medição local, com recursos já acessados; não representa resultado de usuários reais nem garante o tempo na hospedagem.
- Sem erros ou avisos no console na navegação inicial. Requisições dos recursos locais concluídas sem erros.
- Fontes locais em WOFF2: 63.580 bytes no total. Sem dependências externas em tempo de execução, bibliotecas de animação ou carregamento de mapa incorporado.

## Revisão Web Interface Guidelines

`dist/index.html` — pass: estrutura semântica, rótulos, hierarquia, textos alternativos, dimensões das imagens, botões para ações e links para navegação.

`dist/styles.css` — pass: contraste, foco visível, áreas de toque, adaptação responsiva, espaços seguros e movimento reduzido.

`dist/app.js` — pass: diálogos nativos, mensagens contextuais, conteúdo editável, formatação monetária localizada e preservação de contatos diretos no HTML.

## Pendências editoriais

Substituir as imagens ilustrativas pelas fotos reais e cadastrar os horários confirmados. A publicação inicial permanece privada para revisão.
