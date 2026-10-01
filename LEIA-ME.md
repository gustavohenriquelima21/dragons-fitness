# Dragon’s Fitness

Página curta, desenvolvida primeiro para celular, com identidade preta e vermelha, logo fornecida, planos confirmados e contato separado por unidade.

## Conteúdo e decisões

- O convite para conhecer a Dragon’s abre a escolha de unidade e encaminha ao WhatsApp com mensagem contextualizada. Nenhuma mensagem é enviada automaticamente.
- Modalidades: musculação, boxe/kickboxing, Muay Thai, funcional, Fit Dance e GAP. Todas inclusas nos planos das duas unidades, conforme briefing.
- Mensal: R$ 129,99; trimestral: até 3x de R$ 119,99; semestral: até 6x de R$ 109,99. Não foram presumidas taxas, isenções, fidelidade ou descontos.
- Wellhub Basic e TotalPass TP1 nas duas unidades, em um destaque com fundo grafite uniforme e faixas vermelhas. O bloco não tem foto, legenda ou botão de consulta. O plano TotalPass segue a informação escrita pelo cliente (TP1), não o TP1+ da referência visual.
- Comodidades não confirmadas, depoimentos, números de alunos e avaliações não foram publicados.
- Horários nas duas unidades: segunda a sexta, das 05h às 22h; sábado e domingo, das 08h às 12h. Feriados não foram informados.
- Não há mapa incorporado ou bibliotecas externas de interface; os botões abrem os links de localização fornecidos.

## Atualizar informações

Edite `dist/content.js`. Cada unidade tem nome, endereço, telefone, link do Maps e `hours`.

Para atualizar horários, edite a lista `hours` de cada unidade, no formato `{ days: 'Segunda a sexta', time: '05h às 22h' }`. Só inclua feriados após confirmação. Atualize também as tabelas de apoio em `dist/index.html`, exibidas sem JavaScript. Quando uma unidade não possui horários preenchidos, a consulta ao WhatsApp continua disponível.

Os preços ficam em `plans`. O valor numérico deve usar ponto decimal. O formato monetário brasileiro é aplicado automaticamente. Se houver alteração no número de planos, modalidades ou unidades, ajuste também a estrutura em `dist/index.html`.

O HTML mantém o conteúdo comercial e os links diretos como alternativa sem JavaScript. Ao revisar preços ou contatos, atualize também esse conteúdo de apoio.

## Substituir as imagens

As imagens atuais foram geradas por IA, a pedido do cliente. **Não representam as instalações reais.** A página informa isso junto às imagens.

- `dist/assets/hero.webp`: abertura em telas maiores.
- `dist/assets/hero-mobile.webp`: versão leve para celular.
- `dist/assets/dumbbells.webp`: musculação.
- `dist/assets/modalidade-boxe.webp`: boxe/kickboxing.
- `dist/assets/modalidade-muaythai.webp`: Muay Thai.
- `dist/assets/functional.webp`: funcional.
- `dist/assets/modalidade-fitdance.webp`: Fit Dance.
- `dist/assets/modalidade-gap.webp`: GAP.
- `dist/assets/logo.png`: logo original fornecida, com transparência.

Substitua as imagens preservando os nomes, ou atualize os caminhos `src` e `data-src` no HTML. Prefira WebP, com dimensões reservadas no HTML para evitar saltos de layout. Ao colocar fotos reais, atualize os textos alternativos, legendas e os avisos junto ao carrossel. As fotos podem ser trocadas independentemente por unidade depois de identificadas.

Os prompts completos das imagens estão em `image-prompts.json`. Foram geradas pela ferramenta nativa image_gen e convertidas em WebP para entrega.

## Carrossel de modalidades

Os seis botões ficam na mesma linha em todas as telas, com ícones e nomes menores no celular. Usam ícones brancos com contorno circular vermelho; o círculo selecionado recebe fundo vermelho. Cada botão seleciona sua foto, e o gesto horizontal atualiza o destaque. A foto selecionada fica centralizada, com pequenas partes das imagens anterior e seguinte visíveis. A navegação é circular nos dois sentidos, sem reprodução automática, preservando essas prévias também nas extremidades do ciclo. Abaixo das fotos, seis indicadores clicáveis mostram a posição atual com uma barra vermelha; os demais aparecem como pontos cinza.

Os ícones fornecidos em `dist/Arquivos` são usados por meio de cópias em `dist/assets`: `icone-musculacao.svg`, `icone-boxe.svg`, `icone-muaythai.svg`, `icone-funcional.svg`, `icone-fitdance.svg` e `icone-gap.svg`. Para trocar um desenho, substitua a cópia correspondente em `assets`. Os arquivos originais foram preservados. As imagens incorporadas nos SVGs de musculação, boxe e funcional foram reduzidas para 192 px nas cópias usadas pelo site, mantendo transparência e proporções para carregar mais rápido.

A estrutura e as legendas ficam em `dist/index.html`, a apresentação em `dist/styles.css` e o comportamento em `dist/carousel.js`. Duas setas pequenas sobre as laterais da foto permitem voltar ou avançar, com áreas de toque de 44 × 44 px. Setas do teclado, Home e End funcionam nos seletores; Enter e Espaço ativam os botões laterais. As fotos são exibidas apenas no carrossel, sem botão de ampliação. A preferência por movimento reduzido remove as transições. As fotos são carregadas conforme a seção e suas imagens vizinhas são necessárias.

O gesto horizontal acompanha o movimento em quadros de animação e reconhece deslizes curtos pela velocidade. A transição pode ser interrompida por um novo arraste; o gesto vertical continua destinado à rolagem da página. O avanço não aguarda a decodificação das imagens, que são preparadas antecipadamente nas posições vizinhas.

## Seleção de planos

Os três planos permanecem na mesma faixa horizontal em todas as telas. O semestral abre selecionado; o destaque vermelho e o tamanho maior acompanham o plano escolhido. No celular e no tablet, a rolagem horizontal encaixa o cartão selecionado no centro e mantém partes dos vizinhos visíveis. Em telas maiores, os três planos aparecem completos e o destaque também acompanha o mouse.

É possível escolher pelo arraste, pelos três indicadores clicáveis, pelo título de cada plano ou pelo teclado (setas, Home e End). Os indicadores seguem o mesmo estilo das fotos e acompanham a seleção. Os cartões são compactos, sem botões de consulta individuais. O comportamento está incorporado em `dist/app.js`, com rolagem nativa no celular e respeito à preferência por movimento reduzido. A centralização inicial do semestral é conferida após carregar fontes e restaurar a página, sem sobrescrever a escolha feita pelo visitante.

## Prévia e publicação

O site é estático: a pasta pública é `dist`. Não requer instalação nem etapa de compilação.

Uma prévia local pode ser iniciada com `python -m http.server 4173 --bind 127.0.0.1 --directory dist` dentro desta pasta.

A versão atual utiliza Vercel. Ao republicar, envie a pasta `dist` completa, incluindo `index.html`, `styles.css`, `content.js`, `app.js`, `carousel.js` e `assets`. O antigo arquivo separado `plans.js` não é mais necessário: seu comportamento foi incorporado ao arquivo principal para evitar publicação incompleta. O arquivo `.openai/hosting.json` pertence à configuração anterior de hospedagem.

## Direção visual

A referência GymNex orientou contraste, fotografia e energia; a identidade preta e vermelha da Dragon’s foi preservada. Tipografia Anton para os títulos e Barlow para leitura. A galeria e o seletor de unidade usam recursos nativos do navegador, evitando dependências desnecessárias. Referências de galeria foram consultadas no 21st sem importar efeitos pesados. A composição não depende de componentes shadcn.

Movimento limitado à entrada inicial e a alguns blocos, respeitando a preferência por movimento reduzido. Sem reprodução automática de mídia.
