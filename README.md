NodeBach (WIP)
==============

An application with Nodejs, using Express and MongoDB.

## Installation

1-) Copy `.env.dist` to `.env` file

2-) Set `command` in `docker-compse.yml` to use `install.js`

```yaml
web:
    command: node install.js
```

3-) Execute:

```
docker-compose build --no-cache
```

```
docker-compose up
```

4-) Visit `http://localhost:3000/init`

5-) Set `command` in `docker-compose.yml` to `server.js`

6-) Restart docker

7-) Remove `ìnstall.js`

## Authentication

1-) Get token

```
curl -d "username=admin&password=password" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/authenticate
```

2-) Get Users

```
curl http://localhost:3000/api/users?token=token
```
