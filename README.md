
# Animal Akinator

Um clone do [Akinator](https://pt.akinator.com) simplificado
## Autores

- [@ViniciusCN9](https://github.com/ViniciusCN9)
- [@Guilherme-Zamboni](https://github.com/Guilherme-Zamboni)
- [@rafarbarros](https://github.com/rafarbarros)
- [@DS-Matheus](https://github.com/DS-Matheus)
- [@MauricioVoltolin](https://github.com/MauricioVoltolin)


## Roadmap

- ~~Definir como será busca do animal correto, seja retornando diretamente ou montando um filtro e buscando no arquivo JSON~~

- ~~Definir interface visual do elemento onde estão os balões de fala~~

- ~~Ajustar bug ao fechar jogo onde os balões de fala do usuário não são resetados~~

- ~~Desenvolver lógica para restante das propriedades do animal como: locomoção, habitat e alimentação~~

- ~~Implementar alternância de imagens conforme a etapa que se encontra o usuário~~

- ~~Implementar exibição do animal encontrado com sua imagem e informações~~

- ~~Implementar loading para aguardar carregamento do JSON (Deixar por alguns segundos para demostrar a funcionalidade)~~

## Explicações

### Interface

Os elementos da tela são manipulados através da inclusão, alteração ou remoção de classes. Quando o jogador pressiona o botão play automaticamente os elementos visuais tem suas classes alteradas para a exibição da tela de diálogo.
Nessa tela temos três elementos principais que são: o Akinator, seu balão de fala e as opções do jogador. O akinator e seus balões de fala são alterados dinâmicamente conforme a etapa do jogo assim como as opções do jogador dependendo da etapa que o jogo se encontra.
Quando o jogo é finalizado voltamos para a tela inicial.

### Base de dados

O jogo conta com uma base de dados fictícia onde é possível adicionar ou remover animais e suas características.
A base é carregada ao iniciar o jogo e não é modificada no seu decorrer.

### Lógica

Os principais mecanismos do jogo são os manipuladores da questão e da opção do jogador. Assim que o jogo é iniciado são carregadas as listas das propriedades que fornecem insumo para o manipulador da questão, conforme a questão é respondida essas listas vão sendo subtraidas para que o sistema possa saber quais possibilidades já foram testadas.
Paralelamente o manipulador da opção do jogador vai populando um filtro com as respostas fornecidas pelo jogador e quando todas as propriedades do filtro forem preenchidas o manipulador busca na base o animal.
Caso as possibilidades se esgotem antes de encontrar o animal é exibido uma mensagem de erro. 
