## Dad Jokes API 

### BASE URL :: https://dad-jokes--api.herokuapp.com/

# AUTH

## these are the endpoints used for authenticating users

### Register
```js
    '/auth/register'
```
### requires
```json
{
    "username":"",   //Required
    "password":""    //Required
}
```
--- 

### Login 
```js
    '/auth/login'
```
#### requires
```json
{
    "username":"",   //Required
    "password":""    //Required
}
```
---
# JOKES

## these are the endpoints used for Jokes

### Jokes --- Public
```js
    '/api/jokes'
```
#### will return all the PUBLIC tagged Jokes
---

##  BELOW HERE REQUIRES TOKEN IN HEADER FOR AUTHORIZATION 

---

### Jokes --- ALL
```js
    '/api/jokes/all'
```
#### will return all Jokes

---
###  addJoke

```js
    '/api/jokes/:username'
```
### requires the following schema as body

```json
{
    "question":"",   //Required
    "answer":"",    //Required
    "public":false
}
```
---

### saveJoke

```js
    '/api/jokes/:username/:joke_id'
```

---

### delJoke

```js
    '/api/jokes/:joke_id'
```

---
### editJoke

```js
    '/api/:joke_id'
```
### requires the following schema as body
```json
{
    "question":"",   //Required
    "answer":"",    //Required
    "public":false
}
```
---

