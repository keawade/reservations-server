# reservations-server

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
