# Protheus Params

Extensão para o VS Code que exibe a descrição dos parâmetros do Protheus (padrões `MV_`) ao passar o mouse sobre eles em fontes AdvPL/TLPP.

## Recursos

- **Descrição ao passar o mouse (hover)** sobre qualquer parâmetro `MV_` em arquivos AdvPL/TLPP (`.prw`, `.prx`, `.prg`, `.tlpp`, entre outros).
- Base com **milhares de parâmetros padrão** do Protheus já incluída.
- Reconhece o nome completo do parâmetro, incluindo **dígitos e underscores** (ex.: `MV_AVG0168`, `MV_RAT_FRE`).
- **Não diferencia maiúsculas de minúsculas** — `mv_acfises` e `MV_ACFISES` funcionam igual.
- **Importação dos seus próprios parâmetros**, com prioridade sobre os padrão.

## Como usar

1. Abra um fonte AdvPL/TLPP.
2. Passe o mouse sobre um parâmetro `MV_...`.
3. A descrição aparece em um tooltip.

## Importar seus próprios parâmetros

Você pode complementar — ou sobrescrever — a base padrão com os parâmetros da sua empresa.

1. Crie um arquivo JSON no formato `{ "MV_XXXX": "descrição" }`:

   ```json
   {
     "MV_MEUPAR": "Descrição de um parâmetro exclusivo da sua empresa",
     "MV_ACFISES": "Descrição customizada que substitui a padrão"
   }
   ```

2. Abra a paleta de comandos (`Ctrl/Cmd+Shift+P`) e execute **Protheus Params: Importar parâmetros do usuário**.
3. Selecione o arquivo. As descrições ficam salvas entre sessões.

Quando um parâmetro existe nas duas fontes, **a descrição importada por você tem prioridade** sobre a padrão. Para voltar a usar apenas os parâmetros padrão, execute **Protheus Params: Limpar parâmetros do usuário**.

## Comandos

| Comando | Descrição |
| --- | --- |
| **Protheus Params: Importar parâmetros do usuário** | Importa um JSON de parâmetros do usuário |
| **Protheus Params: Limpar parâmetros do usuário** | Remove os parâmetros importados e volta a usar apenas os padrão |

## Notas de versão

Consulte o [CHANGELOG](CHANGELOG.md) para o histórico completo de alterações.
