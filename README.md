# Around the U.S. — Vanilla JavaScript

An interactive photo-sharing website built with **HTML5, CSS3, and vanilla JavaScript**, demonstrating DOM manipulation, form validation, asynchronous API requests, and responsive web development.

**[Live Demo](https://jlcambraia.github.io/web_project_around/)**

## Overview

Around the U.S. is a photo gallery application where users can manage their profile and interact with photo cards representing different locations.

This repository represents the vanilla JavaScript iteration of the project, developed as part of the **TripleTen Web Development program**.

The application focuses on interactive frontend development without using React or another JavaScript framework.

## Features

### User Profile

- Display profile information
- Edit user name and description
- Update profile avatar
- Interactive editing modals

### Photo Gallery

- Display photo cards
- Add new cards
- Delete cards with confirmation
- Like and unlike cards
- Open images in an enlarged preview modal

### Forms and Interactions

- Client-side form validation
- Input error messages
- Popup opening and closing
- Interactive buttons
- Dynamic DOM updates

### API Integration

- Fetch profile and card data
- Send updates through asynchronous HTTP requests
- Create and delete photo cards
- Update card likes

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- DOM API
- Fetch API
- Responsive Web Design
- GitHub Pages

## Application Architecture

```text
HTML Structure
      |
CSS Presentation
      |
JavaScript Modules
      |
DOM Manipulation
      |
REST API Integration
```

The application uses JavaScript to manage interface interactions and communicate with an external API.

## Getting Started

Requires Git and a modern web browser.

```bash
git clone https://github.com/jlcambraia/web_project_around.git
cd web_project_around
```

Open `index.html` in your browser. For development, a local static server such as VS Code Live Server can also be used.

Some features require connectivity to the external API configured in the project.

## Development Concepts

- **DOM manipulation:** JavaScript dynamically updates profile information, gallery cards, and modal content.
- **Form validation:** The application validates form inputs and provides feedback.
- **Asynchronous JavaScript:** HTTP requests retrieve and update application data.
- **Responsive design:** CSS adapts the interface to different screen sizes.

## Project Evolution

Around the U.S. was developed through multiple iterations:

- **Vanilla JavaScript:** DOM manipulation, forms, and API integration
- [React Frontend](https://github.com/jlcambraia/web_project_around_react): Component-based architecture and React Hooks
- [Express Backend](https://github.com/jlcambraia/web_project_around_express): Node.js, Express, and MongoDB
- [Authentication Version](https://github.com/jlcambraia/web_project_around_auth): User authentication and protected navigation

These repositories demonstrate the progression from frontend fundamentals to a more complete full-stack application.

## Potential Improvements

- Expanded automated testing
- Improved accessibility
- Enhanced API error handling
- Better image loading performance
- Additional user feedback

## Author

**João Luiz Cambraia**

[GitHub](https://github.com/jlcambraia) · [LinkedIn](https://www.linkedin.com/in/joaoluizcambraia/)
