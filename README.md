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
| Route      | Method |  Body |  Description |
| ----------- | ----------- | ----------- | ------------- |
| `/auth/signup`      | `POST`       | `{ username: string,password: string }` | To signup a user       |
| `/auth/signin`      | `POST`       | `{ username: string,password: string }` | To signin a user       |


#### Tasks
| Route      | Method | Body |  Description |
| ----------- | ----------- | ----------- | ---------- |
| `/tasks`      | `GET`       | `None` | To get all the tasks |
| `/tasks`      | `POST`       | `{ title: string, description: string }` | To save or create a task |
| `/tasks/:id`      | `GET`       | `None` | To get all a single task |
| `/tasks/:id`      | `PATCH`       | `{ status: OPEN or IN_PROGESS, or DONE }` | To update the status of a task |
| `/tasks/:id`      | `DELETE`       | `None` | To delete a task|


## License

Nest is [MIT licensed](LICENSE).
