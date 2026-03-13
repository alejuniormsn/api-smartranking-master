## Descrição

<p>Trata-se de uma API REST desenvolvida em NodeJS com o framework NestJS (JavaScript/TypeScript).</p>
<p>Projeto para aprendizado e desenvolvimento de novas tecnologias.</p>

## Configuração do projeto

```bash
$ npm install
```

## Compilar e executar o projeto

```bash
# DESENVOLVIMENTO
# na raiz do projeto, executar o comando abaixo para subir os containers do banco de dados e da aplicação
$ docker-compose up

# em outro terminal, modo watch
$ npm run start:dev

# testes unitários
$ npm run test

# testes e2e
$ npm run test:e2e

# cobertura de testes
$ npm run test:cov

# PRODUÇÃO
$ npm run start:prod
```

## Deploy

Quando você estiver pronto para fazer o deploy da sua aplicação NestJS em produção, existem alguns passos importantes que você pode seguir para garantir que ela execute da forma mais eficiente possível. Confira a [documentação de deployment](https://docs.nestjs.com/deployment) para mais informações.

Se você está procurando uma plataforma baseada em nuvem para fazer o deploy da sua aplicação NestJS, confira o [Mau](https://mau.nestjs.com), nossa plataforma oficial para fazer deploy de aplicações NestJS na AWS. O Mau torna o deployment simples e rápido, exigindo apenas alguns passos simples:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

Com o Mau, você pode fazer o deploy da sua aplicação em apenas alguns cliques, permitindo que você foque em construir funcionalidades ao invés de gerenciar infraestrutura.

## Recursos

Confira alguns recursos que podem ser úteis ao trabalhar com NestJS:

- Visite a [Documentação do NestJS](https://docs.nestjs.com) para aprender mais sobre o framework.
- Para perguntas e suporte, por favor visite nosso [canal no Discord](https://discord.gg/G7Qnnhy).
- Para se aprofundar e obter mais experiência prática, confira nossos [cursos](https://courses.nestjs.com/) oficiais em vídeo.
- Faça o deploy da sua aplicação na AWS com a ajuda do [NestJS Mau](https://mau.nestjs.com) em apenas alguns cliques.
- Visualize o grafo da sua aplicação e interaja com a aplicação NestJS em tempo real usando [NestJS Devtools](https://devtools.nestjs.com).
- Precisa de ajuda com seu projeto (meio período ou tempo integral)? Confira nosso [suporte empresarial](https://enterprise.nestjs.com) oficial.
- Para ficar por dentro e receber atualizações, siga-nos no [X](https://x.com/nestframework) e [LinkedIn](https://linkedin.com/company/nestjs).
- Procurando emprego, ou tem uma vaga para oferecer? Confira nosso [quadro de empregos](https://jobs.nestjs.com) oficial.

## Suporte

Nest é um projeto open source licenciado sob MIT. Ele pode crescer graças aos patrocinadores e ao suporte dos incríveis apoiadores. Se você gostaria de se juntar a eles, por favor [leia mais aqui](https://docs.nestjs.com/support).

## Mantenha contato

- Autor - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## Licença

Nest está [licenciado sob MIT](https://github.com/nestjs/nest/blob/master/LICENSE).
