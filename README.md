# reservations-server

[![Build Status](https://travis-ci.org/keawade/reservations-server.svg?branch=master)](https://travis-ci.org/keawade/reservations-server)
[![Join the chat at https://gitter.im/reservations-server/Lobby](https://badges.gitter.im/reservations-server/Lobby.svg)](https://gitter.im/reservations-server/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

## Concept

A system for displaying and modifying meeting room reservations via wall mounted terminals at each room, a web interface, and Outlook/Google calendar.

### Room Terminal

* Display data
* *(optional)* Edit data with touch controls

### Web Interface

* Display all rooms and their reservations
* Create a reservation
* Admin panel for configuring rooms

### Integrations

* Outlook
* Google Calendar

## API

* `GET` `/room`
  * Returns all rooms in system
* `POST` `/room`
  * Creates a room
  * Requires `name`
* `GET` `/room/:id`
  * Returns the specified room
* `PUT` `/room/:id`
  * Updates the specified room
  * Requires `name`
* `DELETE` `/room/:id`
  * Deletes the specified room and all attached reservations
* `POST` `/reservation/`
  * Creates a reservation
* `GET` `/reservation/:id`
  * Returns the specified reservation
* `PUT` `/reservation/:id`
  * Updates the specified reservation
* `DELETE` `/reservation/:id`
  * Deletes the specified reservation

### Objects

The `_id` field is returned for referencing objects but is never needed in `POST` or `PUT` bodies. This is the ID used in the REST path.

* `GET` requests return the requested object
* `POST` and `PUT` requests return the created or updated object
* `DELETE` requests return `deleted`

#### Room

```js
{
  _id: String,
  name: String,
  reservations: Array<String>
}
```

The `reservations` array is an array of reservation `_id` values.

### Reservation

```js
{
  _id: String,
  meetingName: String,
  owner: String,
  ownerEmail: String,
  start: Date,
  end: Date
}
```
