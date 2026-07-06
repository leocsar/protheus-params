# Registro de Alterações

Todas as alterações relevantes da extensão "protheus-params" serão documentadas neste arquivo.

Consulte o [Keep a Changelog](http://keepachangelog.com/) para recomendações de como estruturar este arquivo.

## [Unreleased]

## [0.1.0] - 2026-07-06

### Adicionado

- Comando **Protheus Params: Importar parâmetros do usuário**, que permite importar um JSON próprio no formato `{ "MV_XXXX": "descrição" }`. O hover passa a consultar as duas fontes (padrão e usuário), priorizando os parâmetros do usuário quando houver conflito. As descrições ficam persistidas entre sessões.
- Comando **Protheus Params: Limpar parâmetros do usuário**, para remover as descrições importadas e voltar a usar apenas os parâmetros padrão.

### Corrigido

- O hover agora reconhece parâmetros digitados em minúsculas ou capitalização mista (ex.: `mv_acfises`), normalizando o nome para maiúsculas antes da busca.
- O regex de detecção passou a capturar o nome completo do parâmetro, incluindo dígitos (ex.: `MV_AVG0168`) e underscores (ex.: `MV_RAT_FRE`), que antes eram truncados.

### Segurança

- Corrigida vulnerabilidade de alta severidade (RCE/DoS) na dependência transitiva `serialize-javascript`, adicionando um `override` no `package.json` para forçar a versão `^7.0.7` (corrigida). O `mocha` permanece na versão `10.8.2`, sem quebras. `npm audit` passa a reportar 0 vulnerabilidades.

## [0.0.2] - 2023-03-07

### Adicionado

- Ícone/logo da extensão, arquivo de licença (LICENSE) e definição do `publisher`.

### Alterado

- Descrição da extensão e README atualizados com informações gerais.

## [0.0.1] - 2023-02-28

- Versão inicial