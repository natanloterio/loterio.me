# Definição de layout — loterio.me (2026)

Status: proposta aprovada em brainstorming, aguardando revisão final.
Data: 2026-08-31

> **Emenda — 2026-09-02.** A restrição "zero JavaScript" foi levantada
> deliberadamente para acomodar analytics. O site passou a entregar um único
> script próprio, `assets/analytics.js` (~2,4KB), que carrega o GA4 via
> `gtag.js` com Consent Mode v2 negando todo armazenamento — verificado em
> navegador headless com a biblioteca real do Google carregada: nenhum cookie
> é escrito, e por isso o site segue sem banner de consentimento.
>
> O texto original abaixo fica preservado como registro da decisão de
> 2026-08-31; os pontos afetados estão marcados com *(emendado)*. O guard em
> `tools/check.mjs` foi estreitado, não afrouxado: `no executable script tags`
> virou `the only executable script on any page is the analytics tag`, de modo
> que qualquer outro script continua reprovando.

## 1. Objetivo

Transformar loterio.me de cartão de visita em ferramenta de busca de emprego para
vaga **Senior/Staff Android Engineer**, com relocation para UE/UK.

O site atual (209 linhas, arquivo único, estética CRT) não falha por feiura. Falha
por três motivos concretos:

1. **Sinaliza indisponibilidade.** "Founder — pitaia.me (2026–present)" faz o
   recrutador concluir que o candidato não está no mercado.
2. **Subvende o trabalho real.** HUGO BOSS aparece como "Led Android architecture
   modernization and performance improvements". O que aconteceu de fato: insourcing
   de uma agência externa, montagem do time interno do zero e convenções adotadas
   pela organização mobile inteira.
3. **Não diz onde o candidato quer trabalhar.** "Lisbon, Portugal" é ambíguo — não
   informa disponibilidade para mudança, que é o primeiro filtro de qualquer
   recrutador europeu.

## 2. Leitor-alvo

Recrutador técnico ou hiring manager de Android, avaliando de 20 a 200 perfis.
Chega via LinkedIn, GitHub ou indicação. Decide em segundos se continua lendo.

**O que precisa estar resolvido nos primeiros 5 segundos, sem rolagem:**

| Pergunta | Onde é respondida |
|---|---|
| Quem é? | Nome + uma linha de posicionamento |
| Faz o quê? | "Senior/Staff Android Engineer" explícito |
| Está disponível? | Linha de status, explícita |
| Trabalha onde? | "Open to relocation — EU / UK" |
| Como baixo o CV? | Botão de PDF acima da dobra |

## 3. Tese

O fio condutor entre todos os artefatos do Natan é o mesmo movimento: **pegar um
sistema moldado pelas restrições de outra pessoa e devolvê-lo ao controle do time.**

Evidência de que o padrão é real, não retórica:

- **HUGO BOSS** — o app pertencia a uma agência externa; virou desenvolvimento
  interno com time próprio e convenções que a organização adotou.
- **FARFETCH** — base legada em MVC/MVVM e pipeline de 15 minutos; virou Compose,
  injeção de dependência e 2,5 minutos.
- **LiveFolders** — o MCP dita como ferramentas chegam ao LLM; a proposta expõe
  ferramentas por I/O de arquivo.
- **agent-team + o artigo no Substack** — "the tool should be soft enough to take a
  new shape, and quick about it".
- **Brownie** — inferência que dependia de nuvem e chave de API roda inteira no
  aparelho.
- **Pitaia** — o dashboard dita como se opera um negócio; ali o agente é o produto.

**Texto proposto para o site** (rascunho, o Natan edita — a voz precisa ser dele):

> I take systems shaped by someone else's constraints and put them back under the
> team's control. An Android app owned by an outside agency, brought in-house with a
> team built around it. A fifteen-minute pipeline cut to two and a half. A language
> model that only ran in someone else's cloud, running entirely on the phone
> instead. The work is usually the same: find what the team doesn't actually own,
> and change that.

**Pendente de confirmação:** esta tese foi inferida a partir dos artefatos públicos
e do CV, não de conversa sobre intenção. Se não bate com a autoimagem do Natan, a
seção 3 e a ordem da seção 7 mudam.

## 4. Decisões e razões

| Decisão | Escolha | Razão |
|---|---|---|
| Vaga-alvo | Senior/Staff Android Engineer | Trilha com mais lastro verificável: 15 anos, FARFETCH, HUGO BOSS |
| Enquadramento do pitaia | Prova técnica, não cargo | Remove o sinal de indisponibilidade sem apagar trabalho real e recente |
| Estética | "Terminal maduro" | Mantém a assinatura (mono, escuro, denso); larga scanline, glow e cursor, que sinalizam fantasia de hacker em vez de ofício de interface |
| Arquitetura | index + páginas de caso, sem build | Profundidade que vaga Staff exige, sem introduzir infraestrutura parada |
| Mercado | Relocation UE/UK, explícito | O Natan não marcou Lisboa nem remoto; sem dizer isso, ninguém assume |
| Idioma | Inglês | Mercado-alvo é UE/UK |

## 5. Inventário de provas (verificado em 2026-08-31)

**Repositórios públicos** — `gh repo list natanloterio`:

| Repo | Stack | ★ | Serve para |
|---|---|---|---|
| Brownie | Kotlin | 1 | Caso principal — Android + IA on-device |
| LiveFolders | Rust | 7 | Prova de opinião técnica com implementação |
| scene-memory | Python | 2 | Resultado medido: 477/500 no LongMemEval |
| agent-team | JavaScript | 2 | Assunto do artigo publicado |
| claude-code-employee-grade-skills | — | 2 | Construir em público |
| ArchitectTools | Kotlin | 0 | Ferramental Android |

**Brownie, medido localmente:** 198 commits, 383 arquivos Kotlin, 5 módulos Gradle
(`:app`, `:core:inference`, `:core:agent`, `:core:tools`, `:core:memory`), Jetpack
Compose, LiteRT-LM, quantização adaptativa Q4/Q8 por RAM do dispositivo, loop de
agente com tool calling, cliente MCP, automação via acessibilidade.

**Apps públicos (autorizados pelo Natan):**
- FARFETCH — `com.farfetch.farfetchshop`
- HUGO BOSS — `com.hugoboss.hugoboss`

**Escrita:** "Why we stopped fighting our tools", Substack (n2n), 13/06/2026.
Peça única. **Não construir blog para um post** — seção "Writing" com uma entrada,
honesta sobre o volume.

**CV:** exportação de perfil do LinkedIn, 6 páginas. Vai para `assets/cv.pdf`.

**Permissão de publicação:** FARFETCH e Cecred confirmados pelo Natan. Os números da
HUGO BOSS (15 países, 8 idiomas, 500k+ instalações, 4.5 estrelas) já constam do
perfil público do LinkedIn, então republicá-los no site não cria exposição nova —
mas isso é raciocínio, não autorização. **Confirmar antes de publicar.**

## 6. Arquitetura de arquivos

```
index.html              home
work/brownie.html       caso 1
work/hugo-boss.html     caso 2
work/farfetch.html      caso 3
assets/site.css         CSS compartilhado
assets/cv.pdf
CNAME
```

Sem build, sem framework, sem JavaScript. GitHub Pages continua servindo direto.
*(Emendado em 2026-09-02: um único script, `assets/analytics.js`, passou a ser
entregue — ver a emenda no topo.)*
O CSS sai do `<style>` inline porque agora são quatro páginas — duplicar estilo em
quatro arquivos é o começo da divergência.

## 7. Home, seção a seção

### 7.1 Hero

```
Natan Loterio
Senior / Staff Android Engineer · Kotlin, Compose, on-device AI · 15 years

Available <mês>. Open to relocation across the EU and UK.

[ CV (PDF) ]  [ GitHub ]  [ LinkedIn ]  [ Email ]
```

Sem cursor piscando. A linha de disponibilidade é a mudança de maior impacto de
todo o redesign e precisa estar acima da dobra em telas de celular.

### 7.2 Tese

Três a quatro frases (seção 3). Prosa, não lista. É a seção que diferencia este site
de um currículo.

### 7.3 Proof

Quatro blocos. Cada um em quatro linhas fixas — **contexto, restrição, decisão,
resultado** — e um link para a página de caso quando houver.

**Brownie** → `work/brownie.html`
- Contexto: assistente de IA para Android, 100% no aparelho.
- Restrição: agente capaz dentro do orçamento de memória de um celular.
- Decisão: Gemma 4 E2B via LiteRT-LM, quantização Q4/Q8 escolhida pela RAM do
  dispositivo, cinco módulos separando inferência, agente, ferramentas e memória.
- Resultado: 383 arquivos Kotlin, loop de tool calling, cliente MCP. Sem nuvem, sem
  chave de API, sem dado saindo do telefone.

**HUGO BOSS** → `work/hugo-boss.html`
- Contexto: apps globais BOSS e HUGO — 15 países, 8 idiomas, 500k+ instalações, 4.5★.
- Restrição: trocar o modelo de entrega terceirizado sem parar um app de comércio no ar.
- Decisão: insourcing da agência, construção do time Android interno do zero,
  definição de convenções, arquitetura e forma de trabalho.
- Resultado: as convenções foram adotadas pela organização mobile inteira; a base
  passou a suportar e-commerce, click-and-collect, agendamento em loja e o programa
  de fidelidade HUGO BOSS XP.

**FARFETCH** → `work/farfetch.html`
- Contexto: app de e-commerce de moda, base legada, 3 anos e 9 meses.
- Restrição: modernizar sem reescrever e sem interromper entrega.
- Decisão: adoção de Jetpack Compose, inversão de controle via injeção de
  dependência, migração de MVC/MVVM.
- Resultado: pipeline de 15 minutos para 2,5.

**Pitaia** (bloco, sem página de caso — link para pitaia.me)
- Repo vazio a lojas no ar com clientes pagando em menos de seis meses. Camada MCP
  de 26 ferramentas que torna a plataforma operável por agente. Primeiro agente de
  DM do Instagram no mercado brasileiro de criadores a fechar checkout — conversa a
  Pix ou parcelado via Mercado Pago — sem o cliente sair da DM.

### 7.4 Built in public

Grade compacta, uma linha por repo, com linguagem e estrelas. Ordem: LiveFolders,
scene-memory, agent-team, claude-code-employee-grade-skills, ArchitectTools.
Brownie não se repete aqui — já é caso.

### 7.5 Writing

Uma entrada: título, data, uma frase de resumo, link para o Substack.

### 7.6 Track record

Timeline enxuta, mais recente primeiro. Cargo, empresa, período, uma linha.
Pitaia · HUGO BOSS · GaiaHub · FARFETCH · Brelo · Facio · Cecred (R$5M em economia)
· HBSIS · ATAR · Morphy · Microton. Antes de 2014, uma linha só: "Delphi and ERP
work, 2008–2011."

**GaiaHub precisa de tratamento explícito.** O período (jan/2022 – jan/2026) se
sobrepõe integralmente ao da FARFETCH (ago/2021 – abr/2025). No CV isso lê como
possível inflação. No site, marcar como paralelo — por exemplo `(alongside
FARFETCH)` — resolve em três palavras o que viraria pergunta desconfortável em
entrevista.

### 7.7 Contato

E-mail, LinkedIn, GitHub, CV. Sem formulário.

## 8. Template de página de caso

Mesma estrutura nas três, para que sejam comparáveis:

1. **Problem** — o estado inicial, com números.
2. **Constraint** — o que não podia quebrar. É a seção que separa engenharia de
   anedota.
3. **Decisions** — o que foi escolhido e **o que foi descartado, e por quê**.
4. **Result** — medido. Sem número, não entra.
5. **What I'd do differently** — julgamento sobre o próprio trabalho.

A seção 5 é o sinal mais forte de senioridade do site inteiro, e quase ninguém
escreve. Ela não é opcional.

Alvo: 400 a 700 palavras por caso. Leitura em menos de dois minutos.

## 9. Sistema visual — "terminal maduro"

**Fica:** monoespaçada como assinatura, fundo escuro, densidade alta, hierarquia por
peso e espaço.
**Sai:** overlay de scanline, `text-shadow` verde, cursor piscando, verde fósforo
saturado como cor de texto.

**Tipografia** — IBM Plex Mono (continuidade com o site atual) + IBM Plex Sans.
Mesma superfamília, um único request ao Google Fonts, pareamento nativo.

- Mono: metadados, números, rótulos de seção, nomes de repo, stack. 14px.
- Sans: prosa e títulos de caso. 16px, entrelinha 1.65.
- Medida de linha da prosa: 68 caracteres. Largura de página: 760px.

**Cor** — contraste calculado, não estimado:

| Token | Escuro | Claro | Contraste vs. fundo |
|---|---|---|---|
| `--bg` | `#0d0d0d` | `#faf9f7` | — |
| `--text` | `#e6e6e3` | `#1a1c1a` | 15.5:1 / 16.3:1 |
| `--muted` | `#8b8f8a` | `#5a5f59` | 5.8:1 / 6.2:1 |
| `--accent` | `#63c98a` | `#157f4a` | 9.6:1 / 4.8:1 |

O verde sobrevive como acento único e dessaturado — herança do site anterior sem a
fantasia. Todos os pares passam WCAG AA; os de texto principal passam AAA.

`prefers-color-scheme` nos dois sentidos. Recrutador imprime currículo, e página
escura impressa desperdiça tinta ou sai ilegível — o modo claro é requisito, não
enfeite.

**Espaçamento** — escala de 4px, 64px entre seções, 24px de respiro lateral no
celular.

## 10. Acessibilidade, performance, SEO

- HTML semântico: a página precisa fazer sentido com o CSS desligado.
- Um `<h1>` por página; hierarquia de headings sem pulos.
- Foco visível em todo elemento interativo.
- Alvos de toque de no mínimo 44px.
- `prefers-reduced-motion` respeitado (embora quase não haja movimento).
- Orçamento: menos de 50KB por página sem contar fontes. Zero JavaScript.
  *(Emendado em 2026-09-02: `assets/analytics.js`, ~2,4KB próprios, mais o
  `gtag.js` do Google, assíncrono e fora do orçamento de página.)*
- `preconnect` para o Google Fonts; `display=swap`.
- Por página: `<title>`, meta description, Open Graph e uma imagem OG.
- `JSON-LD` com `schema.org/Person` na home — é assim que buscador e algumas
  ferramentas de recrutamento entendem cargo, localização e perfis.
- `sitemap.xml` e `robots.txt`.

## 11. Fora de escopo

Sem gerador estático, sem framework JS, sem blog engine, sem barras de proficiência
em "skills" (depõem contra candidato sênior), sem foto de banco de imagens, sem
formulário de contato, sem animação decorativa, sem analytics de terceiros.

## 12. Pendências

| # | Pendência | Bloqueia |
|---|---|---|
| 1 | Confirmar a tese da seção 3 | Seção 3 e ordem da seção 7 |
| 2 | Autorizar os números da HUGO BOSS | Bloco e página de caso da HUGO BOSS |
| 3 | Data de disponibilidade para o hero | Hero |
| 4 | Situação de autorização de trabalho (UE/UK) | Linha de relocation |
| 5 | Revisar a voz do texto da tese | Seção 3 |

Nenhuma bloqueia o começo da implementação: 1, 3, 4 e 5 são conteúdo do hero e da
tese; 2 afeta um bloco. Estrutura, CSS e as páginas de Brownie e FARFETCH podem
começar antes.

## 13. Critérios de aceite

1. Recrutador identifica nome, cargo-alvo, disponibilidade e relocation sem rolar,
   em viewport de celular.
2. CV em PDF a um clique do topo.
3. Cada página de caso lê em menos de dois minutos e contém pelo menos um número.
4. As três páginas de caso têm a seção "What I'd do differently" preenchida.
5. Lighthouse: 100 em acessibilidade, 100 em melhores práticas, 100 em SEO.
6. Página legível com CSS desabilitado.
7. Impressão em papel sai legível em preto sobre branco.
8. Nenhum arquivo HTML passa de 400 linhas.
9. ~~Zero JavaScript entregue.~~ **Emendado em 2026-09-02:** exatamente um
   script próprio é entregue (`assets/analytics.js`), e `tools/check.mjs`
   garante que nenhum outro apareça em nenhuma das doze páginas.
