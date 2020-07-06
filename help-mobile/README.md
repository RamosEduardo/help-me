# Help Me Delivery (help-mobile)

Projeto desenvolvido por Cleiton

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

# Routes on API
```bash
// Routes of Adresses 

routes.post('/address', AddressController.create);  token pelo authorisation no headers adiciona novo endereço para o helped logado
passar no corpo da requisição 
{
	"type": "teste1",
	"zipCode": "9777777",
	"street": "Gustavo1",
	"numberHouse": "5001",
	"neighborhood": "Avai1",
	"complement": "2 Casa apos madeireira nart",
	"city": "Guaramirin1",
	"state": "Santa Catarina1"
}

routes.get('/address', AddressController.index);    token pelo authorisation no headers seleciona todos os endereços cadastrados para o helped logado
corpo body
{
	"type": "teste1",
	"zipCode": "9777777",
	"street": "Gustavo1",
	"numberHouse": "5001",
	"neighborhood": "Avai1",
	"complement": "2 Casa apos madeireira nart",
	"city": "Guaramirin1",
	"state": "Santa Catarina1"
}


routes.put('/address/:id', AddressController.update); token pelo authorisation no headers  e o id do endereço que ele deseja atualisar(obs tem que passar o id dos endereços cadastrado pelo helped)

routes.delete('/address/:id', AddressController.remove); token pelo authorisation no headers  e o id do endereço que ele deseja atualisar(obs tem que passar o id dos endereços cadastrado pelo helped)


//Route of assesment  -- rota de avaliação  (pesar um pouco mais)

----------------
routes.post('/assessment/:user_rated_id/solicitation/:solicitation_id', AssessmentsController.create);
esta rota de avaliação controlar via front quem é o helped e quem é o helper  ´
passat token pelo headers token, passat o id do avaliado e o id da solicitação
-------------------
routes.get('/assessment/:user_rated_id', AssessmentsController.index); aqui ira listar as avaliações que o usuario rescebeu como 


----------------
routes.post('/vehicles', vehiclesController.create);
token pelo authorisation no headers ele encontra o helper

corpo da requisição Placa e a pk 
{
	"placa": "mko-040",
	"marca": "ford",
	"modelo": "fiesta", 
	"ano": "2011", 
	"renavam": "123456", 
	"capacidade": "100"  
}
-----------
routes.get('/vehicles', vehiclesController.index);
token pelo authorisation no headers ele encontra o helper busca os veiculos do helper
----------

routes.put('/vehicles/:placa', vehiclesController.update);
http://localhost:3333/vehicles/mko-000

passando placa direto na rota
token pelo authorisation no headers ele encontra o helper busca os veiculos do helper



e os vlores a serem alterados no corpo da requisição
{
	"placa": "mko-040",
	"marca": "ford",
	"modelo": "fiesta", 
	"ano": "2011", 
	"renavam": "123456", 
	"capacidade": "100"  
}


-------------------
routes.delete('/vehicles/:placa', vehiclesController.remove);
http://localhost:3333/vehicles/mko-040
token pelo authorisation no headers para achar o helper_id e na rota passar a placa que vai deletar

//Route of product

routes.post('/products', ProductsController.create);
token pelo authorisarion no headers para achar o helped

body
{
	"name": "teste4",
	"description": "tes",
	"weight": 10,
	"width": 5,
	"height": 3,
	"lenght": 4,
	"pictureProduct": "foto",
	"categories_id": "1"
}

------------------------
routes.get('/products', ProductsController.index);
token pelo authorisarion no headers para achar o helped
buscar os produtos cadastrados pelo helped
--------------------------

routes.put('/products/:id', ProductsController.update);
token pelo authorisarion no headers para achar o helped
passatr o id do produto a ter os dados atualizados
body
{
	"name": "teste4",
	"description": "tes",
	"weight": 10,
	"width": 5,
	"height": 3,
	"lenght": 4,
	"pictureProduct": "foto",
	"categories_id": "1"
}

routes.delete('/products/:id', ProductsController.remove);
token pelo authorisarion no headers para achar o helped
passatr o id do produto a ter os dados deletado

Route of solicitations

routes.post('/solicitations', SolicitationsController.create);
token pelo authorisarion no headers para achar o helped
(temos um problema referente ao cargo id ) primeiro criar a solicitação com o cargo id em branco

corpo da req

title": "Trrtar1 ",
"description": "100 tijolos",
"value": 50.00,
"adresses_start_id": "10",
"adresses_end_id": "2",
"cargo_id": "frágil

depois chamar o metodo para criar uma carga quando for o create ele cria uma carga com um produto e adiciona na tabela solicitação o cargo_id 



routes.get('/solicitations', SolicitationsController.index);
traz todas as solicitações validar sem possui o token no authorisation pra verificar se usuario logado

routes.put('/solicitations/:id', SolicitationsController.update);
token pelo authorisarion no headers para achar o helped
e passa o id pela rota



routes.delete('/solicitations/:id', SolicitationsController.delete);
token pelo authorisarion no headers para achar o helped
e passa o id pela rota


Route of Cargo
routes.post('/cargo/:solicitation_id', cargoController.create);
token pelo authorisarion no headers para achar o helped
e passa o id da solicitação na rota

no corpo 
    id: product_id,
	helped_id: helped_id



routes.get('/cargo/:solicitation_id', cargoController.index);
token pela rota so pra ver se ta logado
passa o id da solicitação pela rota 
usuario so podera a carga de itns ligada a essa solicitação 
(seria bom controlar pelo front qual id da solicitação ele ta tentando ver)

routes.delete('/cargo/:solicitation_id/:product_id', cargoController.remove);
token pelo authorisation para pegar o helped
passar id da solicitação na rota 
passar id do produto a ser excluido da carga.



routes.post('/reports/:id', ReportsController.create);
token pelo authorisation para pegar o user que esta reportando
e passar o id do usuario reportado pela rota

routes.get('/reports/id', ReportsController.index);
pegar todos os repotes que determinado usuario teve

token pra saber quem ta pesquisando ta logado

passar o id do usuario reportado pela rota

```
