Nodejs-MongoDB-Rest (WIP)
=========================

An application with Nodejs, using Express and MongoDB.

## Installation

1-) Set `command` in `docker-compse.yml` to use `install.js`

```yaml
web:
    command: node install.js
```

2-) Execute:

```
docker-compose build --no-cache
```

```
docker-compose up
```

3-) Visit `http://localhost:3000/init`

4-) Set `command` in `docker-compose.yml` to `server.js`

5-) Restart docker

6-) Remove `ìnstall.js`

## Authentication

1-) Get token

```
curl -d "username=admin&password=password" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/authenticate
```

2-) Get Users

```
curl http://localhost:3000/api/users?token=token
```
