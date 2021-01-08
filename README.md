<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Project Description
This is a simple crud application API to manage authentication and task management.

## Installation

#### Clone Project
```bash
git clone git@github.com:tareqmahmud/nestjs-task-management.git
```

#### Install NPM Packages
```bash
$ npm install
```

#### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Route

#### Auth
| Route      | Method |  Description | Body |
| ----------- | ----------- | ----------- | ------------- |
| `/auth/signup`      | `POST`       | To signup a user       | `{ username: string,password: string }`
| `/auth/signin`      | `POST`       | To signin a user       | `{ username: string,password: string }`


#### Tasks
| Route      | Method |  Description | Body | Query
| ----------- | ----------- | ----------- | ---------- | ---------- |
| `/tasks`      | `GET`       | To get all the tasks | `None` | `?status=OPEN/Close/IN_PROGESS&search=string`
| `/tasks`      | `POST`       | To save or create a task | `{ title: string, description: string }`
| `/tasks/:id`      | `GET`       | To get all a single task | `None`
| `/tasks/:id`      | `PATCH`       | To update the status of a task | `{ status: OPEN or IN_PROGESS, or DONE }`
| `/tasks/:id`      | `DELETE`       | To delete a task| `None`


## License

Nest is [MIT licensed](LICENSE).
