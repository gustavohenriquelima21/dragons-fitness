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

Substituir as imagens ilustrativas pelas fotos reais. Os horários foram confirmados e cadastrados em 27/09/2026. A versão pública usa Vercel; alterações locais dependem de republicação.

## Atualização do carrossel e dos ícones de modalidades

- Validação no Chrome DevTools em 390, 430, 768 e 1440 px, sem transbordamento horizontal. Os ícones ficam em três colunas no celular e seis nas telas maiores.
- Ciclo completo pelas seis imagens, passagem da última para a primeira e retorno da primeira para a última verificados. Seleção direta de modalidade e destaque sincronizado conferidos.
- Arraste real com mouse, botões de navegação e atalhos de teclado (End e seta direita) verificados. A implementação usa Pointer Events para o gesto horizontal e preserva rolagem vertical e zoom por pinça; não foi realizado teste em aparelho físico.
- Ampliação da foto de Fit Dance, fechamento por Escape e retorno do foco ao botão de ampliar conferidos.
- Painéis inativos e cópias do ciclo ficam fora da navegação assistiva. Atualizações são anunciadas discretamente; todos os controles têm nome acessível e foco visível.
- Movimento reduzido revisado no CSS e JavaScript. Não há avanço automático.
- Quatro novas imagens ilustrativas em WebP, cerca de 325 KB somadas, com carregamento sob demanda. O aviso sobre geração por IA foi preservado.
- Nova revisão conforme Web Interface Guidelines aplicada aos controles, imagens, foco, alternativas ao arraste e movimento reduzido. Os resultados de Lighthouse e desempenho acima pertencem à revisão anterior, não a uma nova execução após esta atualização.

## Atualização da seleção de planos

- Layout conferido no Chrome DevTools em 390, 430, 768 e 1440 px: três cartões na mesma linha, sem transbordamento do documento. Em telas menores, a rolagem fica restrita à faixa dos planos.
- Seleção inicial do semestral, centralização nas telas menores e troca do destaque pelo plano visível verificadas. Rolagem nativa da faixa testada até as duas extremidades.
- Arraste real com mouse e seleção ao passar o cursor sobre os cartões verificados em desktop. O arraste não abriu acidentalmente o contato.
- Setas de navegação, Home e seta esquerda conferidos. Os controles mantêm o foco nas extremidades; títulos têm estado de seleção acessível e área clicável de pelo menos 44 px.
- Consulta do trimestral abriu o diálogo com mensagens do plano correto para ambas as unidades; Escape fechou o diálogo.
- Console sem erros ou avisos. Sintaxe JavaScript e diferenças de arquivos verificadas. Revisão de foco, nomes acessíveis, contraste, rolagem e movimento reduzido conforme Web Interface Guidelines.
- Testes móveis realizados por emulação do navegador; gesto de toque em aparelho físico não foi testado. Os números de Lighthouse anteriores não foram recalculados nesta alteração.

## Indicadores e cartões compactos

- Os carrosséis agora usam seis indicadores nas fotos e três nos planos. O indicador ativo vira uma barra vermelha, e cada indicador é um botão com área de 44 × 44 px, nome acessível e foco visível.
- Clique no indicador mensal e seleção do trimestral pela tecla End verificados; destaque, posição centralizada e indicador permaneceram sincronizados. Nas fotos, seleção de GAP e avanço por seta direita retornaram à musculação com o indicador correto.
- Removidos os três botões de consulta dos cartões e suas dependências em JavaScript. Os demais contatos da página permanecem disponíveis.
- Cartão ativo em 390 px: aproximadamente 242 × 306 px, antes aproximadamente 305 × 416 px.
- Conferidas larguras de 320, 390, 430, 768 e 1440 px. Cartões na mesma faixa, textos contidos e sem transbordamento horizontal do documento. Console sem erros ou avisos.
- Revisão conforme Web Interface Guidelines: indicadores operáveis por clique e teclado, estado atual acessível, foco visível e dimensões adequadas ao toque.

## Centralização inicial e prévias laterais — 27/09/2026

- Causa confirmada na versão pública: `https://academia-dragons-fitnesss.vercel.app/plans.js?v=2` retornou 404. Sem esse arquivo, o semestral tinha o destaque estático, mas a faixa não era centralizada e os indicadores não eram criados.
- Comportamento dos planos incorporado em `app.js`; referência ao arquivo ausente removida. Requisições dos scripts locais conferidas, sem arquivos faltando.
- Abertura pelo topo e diretamente em `#planos` conferida no Chrome DevTools. Semestral centralizado em 390, 430, 768 e 1440 px, sem transbordamento do documento. A escolha manual de outro plano foi preservada em evento de restauração de página simulado.
- Carrossel de fotos com a imagem central e duas prévias laterais. Ciclo completo e ambos os limites conferidos: primeira → última e última → primeira mantêm três imagens visíveis e carregadas. Apenas a imagem selecionada exibe legenda, evitando texto cortado nas laterais.
- Clique em indicadores e navegação por teclado verificados. Console sem erros ou avisos nos testes locais; sintaxe dos scripts e diferenças verificadas.
- Validação móvel por emulação, sem teste em iPhone físico. Estas alterações estão na pasta local `dist`; a versão pública depende de republicação dessa pasta.

## Horários e convênios — 27/09/2026

- Ambas as unidades exibem segunda a sexta, 05h às 22h, e sábado e domingo, 08h às 12h. Conteúdo editável e alternativa estática no HTML atualizados; nenhum horário de feriado presumido.
- Wellhub Basic e TotalPass TP1 em banner com fotografia ilustrativa escurecida, faixas vermelhas e indicadores triangulares, conforme a referência. TP1 segue a informação escrita pelo cliente.
- Revisados em Chrome DevTools a 390, 430, 768 e 1440 px. Horários legíveis, convênios lado a lado, sem transbordamento horizontal. Semestral permanece selecionado inicialmente.
- Clique real em “Consultar convênios” abriu a escolha de unidade. Números e mensagens de WhatsApp conferidos nas duas opções; Escape fechou o diálogo e devolveu o foco. Nenhuma mensagem foi enviada.
- Botão com área de 44 px e foco visível. Fundo decorativo sem anúncio redundante, imagem WebP reutilizada com carregamento adiado e aviso de ilustração por IA. Sem novas dependências ou animações.
- Console sem erros ou avisos. CSS e scripts retornaram 200; sintaxe JavaScript e diferenças de arquivos conferidas. A marcação incompleta do antigo bloco Wellhub foi corrigida durante a substituição.
- Não houve nova medição Lighthouse nem teste em aparelho físico. Alterações disponíveis na prévia local, ainda sem republicação na Vercel.

## Simplificação visual dos convênios e da galeria — 27/09/2026

- Banner de convênios com fundo grafite sólido (#151515). Removidos imagem, sobreposição em degradê, texto sobre as duas unidades, botão de consulta e aviso de imagem ilustrativa desse bloco.
- Cantos das fotos do carrossel reduzidos de 16 para 6 px, incluindo as prévias laterais.
- Conferência visual no Chrome DevTools em 390 e 1440 px: conteúdo legível, nenhum transbordamento horizontal, fundo uniforme e cantos aplicados a todos os slides. Console sem erros ou avisos.
- Revisão dos trechos alterados conforme Web Interface Guidelines: contraste preservado, hierarquia semântica mantida e nenhuma mudança nos controles da galeria. Diferenças de arquivos verificadas.
- Alterações locais, sem republicação na Vercel.

## Modalidades em uma linha no celular — 27/09/2026

- Seis modalidades na mesma faixa em todas as larguras. Ícones, espaços e nomes ajustados para celular; nomes com capitalização normal nas telas menores para melhorar a leitura. Nomes completos preservados.
- Conferidos 320, 390, 430 e 1440 px no Chrome DevTools: uma única linha de botões, sem sobreposição dos nomes nem transbordamento horizontal. Menor área de toque verificada: aproximadamente 46 × 82 px.
- Fotos, seleção ativa e comportamento do carrossel preservados. Console sem erros ou avisos e diferenças de arquivos verificadas. Validação móvel por emulação.

## Arraste do carrossel e setas laterais — 01/10/2026

- Removida a espera por `image.decode()` no caminho de navegação. Teste com decodificação pendente: seleção atualizada em aproximadamente 2 ms, sem bloquear o avanço.
- Menor limiar de movimento horizontal, reconhecimento da velocidade em uma janela recente e atualizações do arraste por `requestAnimationFrame`. Nova interação pode interromper a transição mantendo a posição visível. Transição reduzida para 280 ms.
- Setas pequenas sobre a foto, com área clicável de 44 × 44 px, nome acessível, foco visível e ativação pelo teclado. Reutilizado o ícone existente, sem dependências adicionais.
- Clique real nas setas conferiu primeira → última e última → primeira. Arraste real com mouse na viewport móvel avançou a foto; Enter no botão também avançou e manteve o foco e o indicador corretos.
- Eventos de ponteiro simulados no navegador verificaram um deslize de 22 px, intenção vertical sem troca de modalidade e novo gesto durante a transição, sem salto na posição inicial nem estado de arraste preso. Esses testes não substituem a validação de toque em um aparelho físico.
- Conferidas larguras de 390, 430, 768 e 1440 px: setas dentro da foto e nenhum transbordamento horizontal. Console sem erros ou avisos; sintaxe JavaScript e diferenças conferidas. Revisão dos trechos conforme Web Interface Guidelines.
- Alterações disponíveis localmente; ainda sem republicação na Vercel.
