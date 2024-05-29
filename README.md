# Notes App

A user-friendly Notes application built with React, TypeScript, and Tailwind CSS.

## Usage

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the development server.
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Description

The Notes App allows users to create, view, search, and delete notes. It offers a simple interface to manage your notes efficiently, with persistent storage using the browser's local storage.

## Features

* Create new notes with a title and content.
* View a list of all notes.
* Delete notes.
* Search for notes by title or content.
* Responsive design using Tailwind CSS.

## File Structure

* `src/components/NoteForm.tsx`: Component for creating new notes.
* `src/components/NoteItem.tsx`: Component to display an individual note with delete functionality.
* `src/components/NoteList.tsx`: Component to display a list of all notes.
* `src/components/SearchBar.tsx`: Component to handle searching for notes.
* `src/context/NoteContext.tsx`: Context and provider for managing notes state.

## Technologies Used

* React
* TypeScript
* Tailwind CSS
* Local Storage for persistent state

## Demo

[DemoLink](https://antoinewtz.github.io/notes-app/)
