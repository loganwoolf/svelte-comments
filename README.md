# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshot

![Desktop View](https://github.com/loganwoolf/svelte-comments/blob/main/fm/screens/desktop.jpeg?raw=true)
![Replying on Desktop](https://github.com/loganwoolf/svelte-comments/blob/main/fm/screens/desktop-reply.jpeg?raw=true)
![Editing on Mobile](https://github.com/loganwoolf/svelte-comments/blob/main/fm/screens/mobile-edit.jpeg?raw=true)
![Deleting on Mobile](https://github.com/loganwoolf/svelte-comments/blob/main/fm/screens/mobile-delete.jpeg?raw=true)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it. 

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [https://www.frontendmentor.io/solutions/fullstack-comment-section-svelte-knex-express-nDcE5gJTpT](https://www.frontendmentor.io/solutions/fullstack-comment-section-svelte-knex-express-nDcE5gJTpT)
- Live Site URL: [https://fm-comments.herokuapp.com/](https://fm-comments.herokuapp.com/)

## My process

### Built with

- [Svelte](https://svelte.dev/) - Frontend library
- [Vite](https://vitejs.dev/) - Bundler and development server
- [Knex](http://knexjs.org) - SQL query builder
- [Express](https://expressjs.com/) - Node server framework
- [PostgreSQL](https://postgresql.org) - Database
- [Heroku](https://heroku.com) - Hosting platform

### What I learned

- Vite templates to get started with library of choice
- How to make your project use ESModules
- How to set up an sqlite3 database
- How to set up Knex to create (somewhat) DB agnostic queries
- Basic useage of Svelte
- CORS
- Body Parser not needed in Express anymore
- Static routes in Express
- Heroku deployment (do you ever really know this?)

### Useful resources

- [Svelte Tutorial](https://svelte.dev/tutorial/basics)
- [Mask to change svg color on hover](https://css-tricks.com/change-color-of-svg-on-hover/#aa-use-a-mask-instead-of-a-background-image) - Change svg color on hover without using it inline. Required some tweaks from the example.
- [Getting set up with Knex](https://blog.shahednasser.com/knex-js-tutorial-for-beginners/) - Very descriptive tutorial that needed to be adapted for ESModules.
- [Cross Reference setting up Knex](https://gist.github.com/EstebanBorai/49f4501aa23dd666ae57b32bafeb768c) - Used information here to verify and see a second perspective.

## Author

- Website - [loganwoolf.github.io](https://loganwoolf.github.io/)
- Frontend Mentor - [@loganwoolf](https://www.frontendmentor.io/profile/loganwoolf)
- Twitter - [@logan__woolf](https://www.twitter.com/logan__woolf)