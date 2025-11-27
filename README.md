# Ball Ball - Sports Court & Team Management Platform

Ball Ball is a full-stack web application designed to simplify booking sports courts, organizing matches, forming teams, and managing player rankings and challenges. The platform supports players, hall managers, and administrators with clearly separated roles and permissions.

---

## Features Overview

### User Features (Players)

- User registration and authentication
- Profile customization (bio + profile image)
- Browse nearby sports courts using an interactive map
- Quick join public events
- Create and join events
- View upcoming personal events
- Player search by username
- Rate and review players
- Team creation and management
- Private team events
- Team challenges system
- Rankings and results table for football, basketball, and tennis

### Hall Manager Features

- Add new sports halls
- Edit hall details
- Delete halls
- View scheduled events per hall

### Admin Features

- Full user management
- Promote/demote users to Player, Manager, or Admin
- Delete users
- Add and edit sports courts

---

## System Architecture

Ball Ball is built using a **three‑layer architecture**:

### Presentation Layer (Frontend)

- Implemented with **Angular**
- Uses **NgRx** for global state management
- Implements SPA (Single Page Application) behavior
- Communicates with backend using REST APIs

### Application Layer (Backend)

- Implemented using **NestJS**
- Modular architecture with Controllers, Services, and Modules
- Handles:
  - Authentication & authorization
  - Business logic
  - Validation
  - API communication

### Data Access Layer

- Implemented using **TypeORM**
- Communicates with **PostgreSQL** database
- Entity-based object relational mapping

---

## Authentication & Roles

- **Player** – Default role after registration
- **Manager** – Can manage halls and their events
- **Admin** – Full access to users and courts

Login is performed using **email + password**, and password validation includes:

- Minimum 8 characters
- Uppercase and lowercase letters
- Numbers
- Special characters

---

## Application Pages

### Events Page

- View nearby public events
- Filter by sport and court type
- Join or leave events
- Create new events

### Teams Page

- View your teams
- Create teams
- Team chat
- Team management panel
- Private team events
- Team challenges

### Table Page

- Rankings for:
  - Football
  - Basketball
  - Tennis
- Match history per team

### Player Page

- View profile
- Edit bio
- Upload profile image
- View reviews and ratings

---

## Event Management

- Create public or private events
- Set:
  - Date
  - Time
  - Max players
  - Description
- Join or leave events
- View event participants

---

## Player Rating System

- Rate players from **1 to 5**
- Leave text reviews
- Publicly visible rating history

---

## Team System

- Team creation with captain role

- Member management

- Team renaming and deletion

- Private team-only events

---

## Team Challenges

- Send challenges to other teams
- Incoming & outgoing requests
- Result submission and approval
- View accepted, rejected, and completed challenges

