## Comentários sobre o app.

### Comentários de implementação.

Minha estratégia de construção do app foi dividi-la em 2 páginas. Uma chamada *Login* para a entrada de dados do nickname do usuário e outra página para mostrar as informações chamada *Main*.

Procurei usar a componentização dividindo as reponsabilidades das funcionalidade de *Mapa* e *Repositórios com estrela* nos seus próprios componentes *GoogleMap* e *Starreds*.


### Dificuldades.

1. Tentei manipular os botões de star e unstar para aparecer alternadamente como no github mas tive problemas com a manipulação do elemento da lista com o seu estado e fazer sumir um botão e aparecer o outro. No caso tive que deixar aparecendo os 2.

2. Tentei fazer um Dialog estilizado com a lib Material-Ui, para pegar o valor da senha do usuário e autentica-lo, mas tive problemas em resolver o callback do Dialog para continuar com o processo de request de dar ou remover estrela. A forma mais rápida foi o prompt nativo do browser. É necessário ajuste futuro.

3. Tive que proteger a rota *main* manualmente para que o usuário nao digite /main e caia no vazio. Uma implementação melhor no meu gosto seria com guardas de rotas, mas não tive tempo de implementa-las.