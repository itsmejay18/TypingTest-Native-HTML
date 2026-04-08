# Typing Speed Test

A modern, responsive, and lightweight Typing Speed Test web application built entirely with HTML, CSS, and Vanilla JavaScript. 

![Typing Test UI](https://img.shields.io/badge/UI-Dark%20Mode-blueviolet)
![Tech Stack](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JS-yellow)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20First-success)

## 🚀 Features

- **Real-time Statistics**: Live feedback on WPM (Words Per Minute) and typing accuracy.
- **Dynamic Timer**: Test your typing speed with 30-second or 60-second time limits.
- **Mobile Friendly**: Designed to work smoothly on mobile keyboards by utilizing a cleverly hidden input field, eliminating issues with predictive text and autocorrect.
- **Modern UI/UX**: Soft dark mode, smooth color-coded highlight transitions, and subtle animations for an engaging experience.
- **Zero Dependencies**: Built fully natively. No React, Vue, or backend code required.

## 🛠️ How It Was Built

This application was structured across three simple files ensuring clean separation of concerns:

### 1. Structure (`index.html`)
The HTML serves as the skeleton using semantic tags. We employed the **Google Poppins** font for a modern look. A hidden text input box (`<input type="text" class="hidden-input">`) is overlayed seamlessly on the typing area. This is a critical design choice for mobile compatibility, as native keyboards often struggle with capturing raw `keydown` events consistently.

### 2. Styling (`style.css`)
Built purely with Vanilla CSS:
- **CSS Variables**: Used at the `:root` level to maintain a consistent color scheme (Slate/Blue/Green palettes).
- **Flexbox & CSS Grid**: Used heavily for layout centering and alignment without needing floats or table-layouts.
- **Media Queries**: Specifically set up breakpoints for Tablets (`768px`), Mobile (`600px`), and small phones (`320px`) to guarantee there is zero horizontal scrolling.
- **Blinking Cursor**: Created a smooth blinking animation using `@keyframes` mapped sequentially to the `.active` typing character.

### 3. Logic (`script.js`)
The JavaScript engine handles the entire logic loop:
- **Typing Mechanics**: Instead of manually adding and subtracting string length on every backspace, we simply map the invisible input box's `.value` to an array, diffing the text character-by-character on every `input` event.
- **WPM Calculation**: WPM is calculated using the standard formula: `(Total Characters Typed / 5) / Time In Minutes`.
- **Timer Management**: A simple `setInterval` tracks the ticking clock, clearing automatically when the time runs out.
- **Listeners**: Global keydown listeners ensure the user never loses focus of the hidden input box while typing.

## 🌐 Deploying to GitHub Pages

Since the app uses plain HTML/CSS/JS, it is immediately ready to be hosted via GitHub Pages:

1. Push this directory to a repository on your GitHub account.
2. Navigate to your repository **Settings**.
3. Under the Code and automation section, click on **Pages**.
4. Under the "Build and deployment" section, set the **Source** to `Deploy from a branch`.
5. Under the **Branch** dropdown, select your `main` branch (or `master`) and hit **Save**.
6. Wait a minute or two, and GitHub will provide you with a live URL to your site!

## 📝 License
This project is open-source and free to modify or distribute.
