## Como fazer para testar:

- Clone o repositório
- Entre na pasta do projeto
- Rode`yarn` or `npm install` para instalar as dependências
- Rode `react-native run ios` ou `react-native run android`



# Dependências:

* yarn add @react-navigation/native
* yarn add @react-navigation/stack
* yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
* yarn add styled-components
* yarn add axios
* yarn add prop-types



Instale o json-server que é distribuído na página:

[https://github.com/typicode/json-server](https://github.com/typicode/json-server)

No terminal, entre na pasta do projeto e rode o servidor informando o IP da máquina onde o memso foi instalado:

* json-server -w --host 192.168.xxx.yyy server.json



Coloque o IP da máquina também na linha 7 do arquivo api.js que se encontra na pasta src/services:

baseURL: 'http://192.168.XXX.YYY:3000'

