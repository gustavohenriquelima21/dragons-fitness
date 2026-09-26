# Dragon’s Fitness

Página curta, desenvolvida primeiro para celular, com identidade preta e vermelha, logo fornecida, planos confirmados e contato separado por unidade.

## Conteúdo e decisões

- O convite para conhecer a Dragon’s abre a escolha de unidade e encaminha ao WhatsApp com mensagem contextualizada. Nenhuma mensagem é enviada automaticamente.
- Modalidades: musculação, boxe/kickboxing, Muay Thai, funcional, Fit Dance e GAP. Todas inclusas nos planos das duas unidades, conforme briefing.
- Mensal: R$ 129,99; trimestral: até 3x de R$ 119,99; semestral: até 6x de R$ 109,99. Não foram presumidas taxas, isenções, fidelidade ou descontos.
- Somente Wellhub Basic, confirmado para as duas unidades.
- Comodidades não confirmadas, depoimentos, números de alunos e avaliações não foram publicados.
- Horários pendentes: o visitante pode consultar a equipe. O espaço já está preparado para horários de cada unidade.
- Não há mapa incorporado ou bibliotecas externas de interface; os botões abrem os links de localização fornecidos.

## Atualizar informações

Edite `dist/content.js`. Cada unidade tem nome, endereço, telefone, link do Maps e `hours`.

Para cadastrar horários, substitua `hours: null` por uma lista de objetos no formato `{ days: 'Segunda a sexta', time: 'horário confirmado' }`. Inclua sábado, domingo e feriados conforme o funcionamento real. Quando uma unidade não possui horários preenchidos, a consulta ao WhatsApp continua disponível.

Os preços ficam em `plans`. O valor numérico deve usar ponto decimal. O formato monetário brasileiro é aplicado automaticamente. Se houver alteração no número de planos, modalidades ou unidades, ajuste também a estrutura em `dist/index.html`.

O HTML mantém o conteúdo comercial e os links diretos como alternativa sem JavaScript. Ao revisar preços ou contatos, atualize também esse conteúdo de apoio.

## Substituir as imagens

As imagens atuais foram geradas por IA, a pedido do cliente. **Não representam as instalações reais.** A página informa isso junto às imagens.

- `dist/assets/hero.webp`: abertura em telas maiores.
- `dist/assets/hero-mobile.webp`: versão leve para celular.
- `dist/assets/dumbbells.webp`: primeira imagem da galeria.
- `dist/assets/functional.webp`: segunda imagem da galeria.
- `dist/assets/logo.png`: logo original fornecida, com transparência.

Substitua as imagens preservando os nomes, ou atualize os caminhos no HTML. Prefira WebP, com dimensões reservadas no HTML para evitar saltos de layout. Ao colocar fotos reais, atualize os textos alternativos, legendas e o aviso do visualizador ampliado. As fotos podem ser trocadas independentemente por unidade depois de identificadas.

Os prompts completos das imagens estão em `image-prompts.json`. Foram geradas pela ferramenta nativa image_gen e convertidas em WebP para entrega.

## Prévia e publicação

O site é estático: a pasta pública é `dist`. Não requer instalação nem etapa de compilação.

Uma prévia local pode ser iniciada com `python -m http.server 4173 --bind 127.0.0.1 --directory dist` dentro desta pasta.

A identidade da hospedagem Sites está em `.openai/hosting.json`. A publicação inicial é privada para revisão. A liberação pública para uso na bio exige alteração de acesso.

## Direção visual

A referência GymNex orientou contraste, fotografia e energia; a identidade preta e vermelha da Dragon’s foi preservada. Tipografia Anton para os títulos e Barlow para leitura. A galeria e o seletor de unidade usam recursos nativos do navegador, evitando dependências desnecessárias. Referências de galeria foram consultadas no 21st sem importar efeitos pesados. A composição não depende de componentes shadcn.

Movimento limitado à entrada inicial e a alguns blocos, respeitando a preferência por movimento reduzido. Sem reprodução automática de mídia.
