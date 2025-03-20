# Especificação do projeto

<span style="color:red">Pré-requisitos: <a href="01-Contexto.md"> Documentação de contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto.

## Personas

Exemplo: _Pedro Paulo tem 26 anos, é arquiteto recém-formado e autônomo. Pensa em se desenvolver profissionalmente por meio de um mestrado fora do país, pois adora viajar, é solteiro e sempre quis fazer um intercâmbio. Está buscando uma agência que o ajude a encontrar universidades na Europa que aceitem alunos estrangeiros._

## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Registrar minhas tarefas           | Não esquecer de fazê-las               |
|Administrador       | Alterar permissões                 | Permitir que possam administrar contas |

Apresente aqui as histórias de usuários que são relevantes para o projeto da sua solução. As histórias de usuários consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuários por contexto, para facilitar consultas recorrentes a esta parte do documento.

## Requisitos

As tabelas a seguir apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade dos requisitos, aplique uma técnica de priorização e detalhe como essa técnica foi aplicada.

### Requisitos funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir o adastro de usuários   | ALTA |
|RF-002| Login e autenticação   | AlTA |
|RF-003| Permitir que o usuário crie metas   | AlTA |
|RF-004| Permitir que o usuário defina as prioridades das metas  | MÉDIA |
|RF-005| Organização por categorias   | MÉDIA |
|RF-006| Permitir que o usuário defina prazos   | ALTA |
|RF-007| Permitir que o usuário defina lembretes   | MÉDIA |
|RF-008| Permitir que o usuário acompanhe o progresso   | BAIXA |
|RF-009| Permitir que o usuário compartilhe metas   | MÉDIA |
|RF-010| Integração com o calendário  | BAIXA |
|RF-011| permitir que o usuário exclua metas   | MÉDIA |
|RF-012| Marcar meta como concluida   | ALTA |
|RF-013| Permitir o usuário criar seu perfil   | ALTA |
|RF-014| Possibilitar com que o usuário selecione uma foto de perfil   | BAIXA |
|RF-015| Permitir que o usuário mude informações do seu perfil   | MÉDIA |

### Requisitos não funcionais

ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em dispositivos móveis | MÉDIA | 
|RNF-002| Deve processar as requisições do usuário em no máximo 3 segundos |  BAIXA | 
|RNF-003| Os dados do usuário devem ser protegidos por criptografia |  ALTA |
|RNF-004| O sistema deve ficar disponível pelo menos 99% do tempo |  ALTA |
|RNF-005| O software deve ser compativel com diferentes navegadores |  ALTA |
|RNF-006| Os dados do usuário devem ser armazenados no banco de dados de forma segura |  ALTA |



## Restrições

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

O projeto está restrito aos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|001| O projeto deverá ser entregue até o final do semestre |
|002| O custo total do projeto não deve exceder o orçamento definido|
|003| O software deve ser responsivo e funcionar em dispositivos móveis e desktops.|
|004| Não haverá suporte tecnico 24h.|
|005|O sistema não pode exigir hardware avançado do usuário final para funcionar corretamente.|

## Diagrama de casos de uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos. Ele utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. O diagrama contempla a fronteira do sistema e o detalhamento dos requisitos funcionais, com a indicação dos atores, casos de uso e seus relacionamentos.

As referências abaixo irão auxiliá-lo na geração do artefato “diagrama de casos de uso”.
