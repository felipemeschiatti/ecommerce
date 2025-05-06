# 🛒 Projeto eCommerce

Este é um projeto de eCommerce desenvolvido com HTML, CSS e JS, com foco em simular uma loja virtual simples.

## 🔗 Acesso ao Projeto

[Link de Deploy Firebase](https://gtp-fmeschiatti-study-0001.web.app/index.html)

## 📁 Estrutura do Projeto

```
ecommerce/
├── public/
│   ├── index.html
│   ├── produto.html
│   ├── carrinho.html
│   ├── js/
│   │   └── script.js
│   └── css/
│       └── style.css
├── .firebaserc
├── firebase.json
├── package.json
└── README.md
```

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/en/download/) instalado
- Conta no [Firebase](https://console.firebase.google.com/)
- [Visual Studio Code](https://code.visualstudio.com/) recomendado

## 📦 Criação do `package.json`

No terminal do projeto, execute:

```bash
npm init -y
```

Isso irá gerar o arquivo `package.json` com configurações padrão para o projeto.

## 🔥 Instalação do Firebase CLI

Instale o Firebase CLI globalmente com:

```bash
npm install -g firebase-tools
```

Verifique a instalação:

```bash
firebase --version
```

## 🔐 Login no Firebase

Execute o comando abaixo para autenticar sua conta Google com o Firebase:

```bash
firebase login
```

Um navegador será aberto para você autorizar o acesso.

## 🏗️ Inicializando o Firebase no Projeto

Na raiz do projeto, rode:

```bash
firebase init
```

Durante a configuração:

1. **Selecione os serviços desejados** (use espaço para marcar):
   - Hosting: Configure e implante seu site Firebase

2. **Selecione seu projeto Firebase existente** ou crie um novo.

3. **Configure o diretório público como**:
   ```
   public
   ```

4. **Responda as perguntas**:
   - Configurar como SPA (single-page app)? **NÃO**
   - Deseja sobrescrever o `index.html`? **NÃO**

Isso irá gerar:
- `.firebaserc`
- `firebase.json`

## 🚀 Deploy do Projeto

Para subir sua aplicação ao Firebase Hosting:

```bash
firebase deploy
```

Após isso, será gerado um link público no terminal com seu projeto online.

## 📚 Referências

- [Documentação Firebase CLI](https://firebase.google.com/docs/cli)
- [Documentação Firebase Hosting](https://firebase.google.com/docs/hosting)

## 👨‍💻 Autor

Felipe Meschiatti  
[github.com/felipemeschiatti](https://github.com/felipemeschiatti)
