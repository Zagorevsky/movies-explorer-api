# Movies-explorer-api
### *Учебный проект от [Яндекс.Практикум](https://practicum.yandex.ru/web/)*

## Описание проекта
 Movies-explorer-api - бэкенд часть приложения со следующими возможностями: авторизации и регистрации пользователей, операции с фильмами и пользователями.

## Функционал:
- Роуты для пользователей:
  - GET /users/me — возвращает информацию о пользователе;
  - PATCH /users/me — обновляет информацию о пользователе.

- Роуты для фильмов:
  - GET /movies — возвращает все фильмы из базы;
  - POST /movies — создаёт фильм;
  - DELETE /movies/:movieId — удаляет фильм по _id.

## Стек технологий:
- Node.js
- Express
- MongoDB
- JavaScript

## Языки:
- JavaScript

## Библиотеки:
- Express

## База данных:
- MongoDB

## Установка и запуск проекта:
Клонировать репозиторий:

    git clone https://github.com/zagorevsky/movies-explorer-api.git

Установить зависимости:

    npm install

Запустить сервер:

    npm run start

Запустить сервер с hot-reload:

    npm run dev

#### Домен приложения: https://api.kino-exp.students.nomoredomains.xyz
