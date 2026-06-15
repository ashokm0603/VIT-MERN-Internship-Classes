cat > /mnt/user-data/outputs/MERN_500_Interview_Questions.md << 'MARKDOWN_EOF'
# 🚀 MERN Stack Interview Questions & Answers — Complete Handbook (2026)

> **500 Questions | Beginner → Expert | Industry-Ready Answers**

---

## 📋 Table of Contents

1. [HTML & Web Fundamentals](#1-html--web-fundamentals) (Q1–Q20)
2. [CSS](#2-css) (Q21–Q40)
3. [JavaScript Basics](#3-javascript-basics) (Q41–Q70)
4. [Advanced JavaScript](#4-advanced-javascript) (Q71–Q100)
5. [ES6+ Features](#5-es6-features) (Q101–Q120)
6. [DOM & Browser APIs](#6-dom--browser-apis) (Q121–Q135)
7. [React Basics](#7-react-basics) (Q136–Q160)
8. [React Intermediate](#8-react-intermediate) (Q161–Q185)
9. [Advanced React](#9-advanced-react) (Q186–Q210)
10. [React Performance Optimization](#10-react-performance-optimization) (Q211–Q225)
11. [Redux & State Management](#11-redux--state-management) (Q226–Q245)
12. [Node.js Basics](#12-nodejs-basics) (Q246–Q265)
13. [Express.js](#13-expressjs) (Q266–Q285)
14. [REST APIs](#14-rest-apis) (Q286–Q300)
15. [Authentication & Authorization](#15-authentication--authorization) (Q301–Q315)
16. [MongoDB Basics](#16-mongodb-basics) (Q316–Q330)
17. [Advanced MongoDB](#17-advanced-mongodb) (Q331–Q345)
18. [Mongoose](#18-mongoose) (Q346–Q360)
19. [Security Best Practices](#19-security-best-practices) (Q361–Q375)
20. [Testing](#20-testing) (Q376–Q390)
21. [Deployment & DevOps](#21-deployment--devops) (Q391–Q405)
22. [System Design](#22-system-design) (Q406–Q420)
23. [Full Stack Scenarios](#23-full-stack-scenarios) (Q421–Q435)
24. [Coding Challenges](#24-coding-challenges) (Q436–Q470)
25. [HR & Project-Based Questions](#25-hr--project-based-questions) (Q471–Q500)

---

## 1. HTML & Web Fundamentals

### Q1. What is the difference between HTML, CSS, and JavaScript? How do they work together in a MERN app?

**Answer:**
HTML (HyperText Markup Language) defines the **structure** of a webpage — it's the skeleton. CSS (Cascading Style Sheets) defines the **presentation** — colors, layouts, animations. JavaScript defines the **behavior** — interactivity and dynamic content.

In a MERN application:
- **React** (JavaScript) generates HTML dynamically through JSX and renders it into the DOM.
- **CSS** (or CSS-in-JS, Tailwind, etc.) styles the React components.
- The browser interprets the final HTML/CSS/JS bundle served by your Node/Express backend or a CDN.

```html
<!-- HTML Structure -->
<div id="root"></div>

<!-- React injects into this root -->
<script>
  ReactDOM.render(<App />, document.getElementById('root'));
</script>
```

**Difficulty:** Beginner

**Real-World Scenario:**
When a user opens your e-commerce React app, the browser loads an HTML shell (`index.html`), which triggers JavaScript (your React bundle) to populate the page dynamically — fetching product data from your Express/MongoDB API and rendering it with styled components.

**Follow-Up Questions:**
- What happens if JavaScript is disabled in the browser for a React app?
- How does SSR (Server-Side Rendering) change this relationship?
- What is progressive enhancement in the context of HTML/CSS/JS?

---

### Q2. What is the DOM and how does React interact with it?

**Answer:**
The **Document Object Model (DOM)** is a programming interface for HTML documents. It represents the page as a tree of nodes, where each node is an object representing part of the document.

React does NOT directly manipulate the real DOM on every update. Instead, it maintains a **Virtual DOM** — a lightweight JavaScript representation of the real DOM. When state changes, React:
1. Creates a new Virtual DOM tree.
2. **Diffs** it against the previous Virtual DOM (reconciliation).
3. Calculates the minimum number of changes needed.
4. Applies only those changes to the real DOM (this is called **committing**).

```javascript
// Without React: direct DOM manipulation (slow for many updates)
document.getElementById('count').textContent = newCount;

// With React: Virtual DOM handles this efficiently
const [count, setCount] = useState(0);
return <div id="count">{count}</div>;
```

**Difficulty:** Beginner

**Real-World Scenario:**
In a live dashboard with 100+ data points updating every second, direct DOM manipulation would cause massive reflows and repaints. React's Virtual DOM batches and minimizes updates, keeping the UI smooth.

**Follow-Up Questions:**
- What is the difference between the Virtual DOM and Shadow DOM?
- How does React's reconciliation algorithm decide what to update?
- When would you directly access the real DOM in React?

---

### Q3. What is semantic HTML and why does it matter?

**Answer:**
Semantic HTML uses elements that convey meaning about their content. Tags like `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<aside>` describe the role of their content, unlike generic `<div>` and `<span>`.

**Benefits:**
- **Accessibility:** Screen readers understand page structure.
- **SEO:** Search engines better index content.
- **Maintainability:** Code is self-documenting.
- **Browser defaults:** Some semantic elements have built-in behaviors (e.g., `<button>` is keyboard-accessible by default).

```html
<!-- Non-semantic (bad) -->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="content">
  <div class="article">...</div>
</div>

<!-- Semantic (good) -->
<header>
  <nav aria-label="Main navigation">...</nav>
</header>
<main>
  <article>...</article>
</main>
```

**Difficulty:** Beginner

**Real-World Scenario:**
A government accessibility audit requires your MERN app to meet WCAG 2.1 AA standards. Using semantic HTML ensures screen readers like NVDA or VoiceOver correctly announce page regions, headings, and interactive elements without additional ARIA attributes.

**Follow-Up Questions:**
- What is ARIA and when should you use it over semantic HTML?
- How do you handle accessibility in React components?
- What tools can you use to audit HTML accessibility?

---

### Q4. What is the difference between `<script>`, `<script async>`, and `<script defer>`?

**Answer:**
These attributes control how and when JavaScript files are downloaded and executed relative to HTML parsing.

| Attribute | Download | Execution |
|-----------|----------|-----------|
| `<script>` | Blocks HTML parsing | Immediately after download |
| `<script async>` | Parallel with HTML parsing | As soon as downloaded (blocks parsing briefly) |
| `<script defer>` | Parallel with HTML parsing | After HTML fully parsed, before `DOMContentLoaded` |

```html
<!-- Blocks parsing — bad for performance -->
<script src="app.js"></script>

<!-- Executes as soon as downloaded — good for independent scripts -->
<script async src="analytics.js"></script>

<!-- Executes after DOM is ready — good for React apps -->
<script defer src="bundle.js"></script>
```

**Difficulty:** Beginner

**Real-World Scenario:**
In a React production build (`index.html`), the bundled `main.js` should use `defer` so the browser can parse the HTML shell first, then run React to hydrate or render the app. Using `async` could cause React to execute before the `<div id="root">` is parsed.

**Follow-Up Questions:**
- What is the difference between `DOMContentLoaded` and `load` events?
- How does Vite or Create React App handle script loading in the built HTML?
- What is module script (`type="module"`) and how does it differ?

---

### Q5. What are data attributes in HTML and how can you use them in JavaScript?

**Answer:**
Data attributes (`data-*`) allow you to store extra information on HTML elements without using non-standard attributes or extra properties. They are accessible via JavaScript's `dataset` property.

```html
<button 
  data-user-id="42" 
  data-action="delete"
  data-confirm="true"
  class="btn-delete"
>
  Delete User
</button>
```

```javascript
const btn = document.querySelector('.btn-delete');
btn.addEventListener('click', (e) => {
  const userId = e.target.dataset.userId;   // "42"
  const action = e.target.dataset.action;   // "delete"
  const confirm = e.target.dataset.confirm; // "true" (always string)
  
  if (confirm === 'true') {
    deleteUser(userId);
  }
});
```

In React, you'd typically avoid data attributes since you handle logic in JSX:
```jsx
<button onClick={() => handleDelete(user.id, true)}>Delete</button>
```

**Difficulty:** Beginner

**Real-World Scenario:**
In a server-rendered Express + EJS app, data attributes pass server-side data to client-side scripts without making an additional API call — e.g., storing a product's price and currency on a "Add to Cart" button for instant cart calculation.

**Follow-Up Questions:**
- Can data attributes affect CSS styling?
- What is the performance impact of using many data attributes vs. storing data in JavaScript?
- How would you access data attributes in React using refs?

---

### Q6. Explain the browser rendering pipeline (Critical Rendering Path).

**Answer:**
The Critical Rendering Path (CRP) is the sequence of steps browsers take to convert HTML, CSS, and JavaScript into pixels on screen:

1. **Parse HTML** → Build DOM tree
2. **Parse CSS** → Build CSSOM tree
3. **Combine DOM + CSSOM** → Render Tree (only visible nodes)
4. **Layout (Reflow)** → Calculate position and size of each element
5. **Paint** → Fill in pixels (colors, borders, shadows)
6. **Composite** → Layer compositing (GPU-accelerated)

```
HTML → DOM
CSS  → CSSOM
          ↓
       Render Tree → Layout → Paint → Composite → Screen
```

**Optimizing CRP:**
- Minimize render-blocking resources (CSS in `<head>`, JS deferred)
- Use `will-change` CSS property for animation layers
- Avoid forced synchronous layouts (reading layout properties after writes)
- Use CSS transforms instead of changing `top`/`left` (compositor-only)

**Difficulty:** Intermediate

**Real-World Scenario:**
Your React app's LCP (Largest Contentful Paint) is slow. By inlining critical CSS, deferring non-critical JS, and preloading key fonts, you can move from a 4s LCP to under 2.5s — hitting Google's "Good" threshold for Core Web Vitals.

**Follow-Up Questions:**
- What is the difference between reflow and repaint?
- How does `requestAnimationFrame` fit into the rendering pipeline?
- What are Core Web Vitals and how do they relate to CRP?

---

### Q7. What is the difference between `localStorage`, `sessionStorage`, and cookies?

**Answer:**

| Feature | localStorage | sessionStorage | Cookies |
|---------|-------------|----------------|---------|
| Capacity | ~5MB | ~5MB | ~4KB |
| Persistence | Until cleared | Tab/session only | Configurable (expires) |
| Accessible by JS | Yes | Yes | Yes (unless HttpOnly) |
| Sent with requests | No | No | Yes (automatically) |
| Same-origin | Yes | Yes | Domain/path configurable |
| Accessibility | Any JS on page | Any JS on page | Server + Client |

```javascript
// localStorage — persists across sessions
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme'); // 'dark'
localStorage.removeItem('theme');

// sessionStorage — cleared when tab closes
sessionStorage.setItem('cartStep', '2');

// Cookies — sent to server automatically
document.cookie = "token=abc123; Secure; SameSite=Strict; max-age=3600";
```

**Difficulty:** Beginner

**Real-World Scenario:**
For JWT authentication, avoid storing tokens in `localStorage` (vulnerable to XSS). Instead, use **HttpOnly cookies** — the server sets them and they're sent with every request but inaccessible to JavaScript. For non-sensitive UI preferences like dark mode, `localStorage` is appropriate.

**Follow-Up Questions:**
- Why is storing JWTs in localStorage a security risk?
- How do you clear all storage when a user logs out?
- What is IndexedDB and when would you use it over localStorage?

---

### Q8. What are meta tags and why are they important for a MERN app?

**Answer:**
Meta tags provide metadata about an HTML document — information not displayed on the page but used by browsers, search engines, and social platforms.

```html
<head>
  <!-- Character encoding -->
  <meta charset="UTF-8">
  
  <!-- Responsive viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO description -->
  <meta name="description" content="Buy handmade crafts online — 10,000+ unique items">
  
  <!-- Open Graph for social sharing -->
  <meta property="og:title" content="CraftStore — Handmade Marketplace">
  <meta property="og:image" content="https://craftstore.com/og-image.jpg">
  <meta property="og:url" content="https://craftstore.com">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  
  <!-- Prevent caching (for sensitive pages) -->
  <meta http-equiv="Cache-Control" content="no-store">
</head>
```

In React, you manage meta tags dynamically with libraries like **React Helmet** or **Next.js Head**:
```jsx
import { Helmet } from 'react-helmet-async';

function ProductPage({ product }) {
  return (
    <>
      <Helmet>
        <title>{product.name} | CraftStore</title>
        <meta name="description" content={product.description} />
        <meta property="og:image" content={product.image} />
      </Helmet>
      <main>...</main>
    </>
  );
}
```

**Difficulty:** Beginner

**Real-World Scenario:**
Your React SPA has a single `index.html` with generic meta tags. When someone shares a product page on LinkedIn, the preview shows no title, description, or image. Implementing SSR with Next.js or using React Helmet with a pre-rendering service fixes social sharing previews.

**Follow-Up Questions:**
- How does SSR help with SEO in React apps?
- What is the difference between `og:` and `twitter:` meta tags?
- How do you implement dynamic meta tags in a React Router app?

---

### Q9. What is the purpose of the `<head>` element and what belongs inside it?

**Answer:**
The `<head>` element contains metadata and resources that help the browser understand and render the document. Content in `<head>` is not displayed on the page.

**Typical head contents:**
```html
<head>
  <!-- Document character set -->
  <meta charset="UTF-8">
  
  <!-- Responsive design -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <!-- Page title (shown in browser tab and search results) -->
  <title>My MERN App</title>
  
  <!-- External CSS (render-blocking — keep minimal) -->
  <link rel="stylesheet" href="/styles/main.css">
  
  <!-- Preload critical resources -->
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/favicon.png">
  
  <!-- Deferred scripts (or place before </body>) -->
  <script defer src="/bundle.js"></script>
  
  <!-- DNS prefetch for external resources -->
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
</head>
```

**Difficulty:** Beginner

**Real-World Scenario:**
A performance audit reveals your app scores poorly on FCP (First Contentful Paint). Moving non-critical CSS to load asynchronously and adding `rel="preload"` for above-the-fold fonts reduces FCP by 800ms.

**Follow-Up Questions:**
- What is the difference between `<link rel="preload">` and `<link rel="prefetch">`?
- What happens if you put a `<script>` tag in `<head>` without `defer` or `async`?
- How many CSS files should ideally be in the `<head>` for performance?

---

### Q10. What is CORS and how does it relate to HTML/browser security?

**Answer:**
**CORS (Cross-Origin Resource Sharing)** is a browser security mechanism that restricts web pages from making requests to a different origin (domain, protocol, or port) than the one that served them.

**Same-origin policy:** By default, browsers block cross-origin HTTP requests made from JavaScript.

**CORS flow:**
1. Browser sends request with `Origin` header.
2. Server responds with `Access-Control-Allow-Origin` header.
3. Browser checks if the origin is allowed. If not, it blocks the response.

For non-simple requests (e.g., `PUT`, `DELETE`, custom headers), the browser first sends a **preflight** `OPTIONS` request.

```javascript
// Express.js CORS setup
const cors = require('cors');

app.use(cors({
  origin: ['https://myfrontend.com', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow cookies/auth headers
}));
```

**Difficulty:** Intermediate

**Real-World Scenario:**
Your React app on `https://app.example.com` makes API calls to `https://api.example.com`. Without CORS configured on the Express server, all requests fail in the browser (though they'd work fine in Postman, since CORS is browser-enforced).

**Follow-Up Questions:**
- Why do CORS errors not appear when using Postman or curl?
- What is the difference between simple and preflight CORS requests?
- How do you handle CORS in a development environment with Vite proxy?

---

### Q11. What is the `<canvas>` element and when would you use it in a MERN app?

**Answer:**
The `<canvas>` element provides a drawing surface for JavaScript-based 2D and 3D graphics via the Canvas API and WebGL respectively. Unlike SVG (which is declarative), canvas is raster-based and drawn imperatively with JavaScript.

```html
<canvas id="chart" width="800" height="400"></canvas>
```

```javascript
const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');

// Draw a bar
ctx.fillStyle = '#3B82F6';
ctx.fillRect(50, 50, 100, 200);

// Draw text
ctx.fillStyle = '#000';
ctx.font = '16px Arial';
ctx.fillText('Q1 Revenue', 60, 270);
```

In React, you typically use libraries built on canvas:
- **Chart.js** / **Recharts** — data visualization
- **Konva.js** — interactive graphics
- **Three.js** — 3D scenes
- **Fabric.js** — canvas-based design tools

**Difficulty:** Intermediate

**Real-World Scenario:**
You're building an analytics dashboard in your MERN app. Real-time WebSocket data feeds into a Recharts (canvas/SVG) component that renders live stock price charts — far more performant than updating thousands of DOM elements.

**Follow-Up Questions:**
- What is the difference between Canvas and SVG for data visualization?
- How do you handle high-DPI (retina) displays with canvas?
- How would you make a canvas drawing accessible?

---

### Q12. Explain the difference between `GET` and `POST` HTTP methods in the context of HTML forms.

**Answer:**
When an HTML `<form>` is submitted, the browser sends an HTTP request. The `method` attribute determines how data is sent.

**GET:**
- Data appended to URL as query string (`?name=John&age=25`)
- Visible in browser history, bookmarkable
- Cached by browsers
- Limited URL length (~2000 chars)
- Idempotent — safe to repeat

**POST:**
- Data in request body (not visible in URL)
- Not cached by default
- No length limit
- Not idempotent — side effects expected

```html
<!-- GET — suitable for search forms -->
<form method="GET" action="/search">
  <input name="q" type="text">
  <button type="submit">Search</button>
</form>
<!-- Submits to: /search?q=userInput -->

<!-- POST — suitable for login, data creation -->
<form method="POST" action="/login">
  <input name="email" type="email">
  <input name="password" type="password">
  <button type="submit">Login</button>
</form>
```

In React, you typically prevent default form submission and use `fetch`/`axios` instead:
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
};
```

**Difficulty:** Beginner

**Real-World Scenario:**
A password reset form must use POST — you don't want the user's email token to appear in browser history or server logs as a GET query parameter.

**Follow-Up Questions:**
- What other HTTP methods exist and when are they used in REST APIs?
- Why is CSRF more relevant to forms using cookies with POST?
- How does `enctype="multipart/form-data"` work for file uploads?

---

### Q13. What is the purpose of the `alt` attribute on images?

**Answer:**
The `alt` (alternative text) attribute on `<img>` elements serves two critical purposes:

1. **Accessibility:** Screen readers announce the alt text to visually impaired users.
2. **Fallback:** Displayed when the image fails to load.
3. **SEO:** Search engines use it to understand image content.

```html
<!-- Informative image — describe content -->
<img src="checkout-button.png" alt="Secure Checkout">

<!-- Decorative image — empty alt so screen readers skip it -->
<img src="decorative-divider.png" alt="">

<!-- Functional image (icon button) — describe the action -->
<img src="search-icon.svg" alt="Search">

<!-- Complex chart — describe what the data shows -->
<img src="revenue-chart.png" alt="Q3 2026 revenue: $2.4M, up 18% from Q2">
```

**Difficulty:** Beginner

**Real-World Scenario:**
Your e-commerce product images use `alt="image1.jpg"` (the filename). This fails WCAG 2.1 AA standards. Updating to descriptive alt text like `"Blue leather handbag, front view"` improves both accessibility compliance and Google Image SEO rankings.

**Follow-Up Questions:**
- What is the difference between an empty `alt=""` and no `alt` attribute?
- How do you handle dynamically loaded images with meaningful alt text in React?
- What WCAG guideline covers image alternatives?

---

### Q14. What is the difference between block-level and inline elements?

**Answer:**
HTML elements have a default `display` value that determines how they flow in a document.

**Block-level elements:**
- Start on a new line
- Take full available width
- Can contain block and inline elements
- Examples: `<div>`, `<p>`, `<h1>`–`<h6>`, `<ul>`, `<li>`, `<section>`, `<article>`, `<form>`

**Inline elements:**
- Flow within text (no new line)
- Only take as much width as needed
- Should not contain block elements
- Examples: `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`, `<input>`, `<button>`

```html
<p>This is a <strong>block paragraph</strong> with <em>inline</em> elements.</p>
<div>This div takes full width.</div>
<span>This span only takes needed width.</span>
```

You can override defaults with CSS:
```css
.nav-item { display: inline-block; } /* Block behaviors but flows inline */
.full-width-link { display: block; } /* Link takes full width */
```

**Difficulty:** Beginner

**Real-World Scenario:**
You need a horizontal navigation bar. `<li>` is block by default. Setting `display: flex` on the `<ul>` or `display: inline-block` on `<li>` makes navigation links appear side by side.

**Follow-Up Questions:**
- What is `display: inline-block` and how does it differ from `flex`?
- Can you put a `<div>` inside an `<a>` tag? Is it valid HTML5?
- What is the default display value of `<img>`?

---

### Q15. What is HTTP/2 and how does it improve web performance?

**Answer:**
HTTP/2 is the second major version of the HTTP protocol, standardized in 2015. It addresses performance bottlenecks of HTTP/1.1.

**Key improvements over HTTP/1.1:**

1. **Multiplexing:** Multiple requests/responses simultaneously over a single TCP connection (vs. 6 connections in HTTP/1.1).
2. **Header compression (HPACK):** HTTP headers are compressed, reducing overhead for repeated headers (e.g., cookies, auth tokens).
3. **Server Push:** Server proactively sends resources the client will need before they're requested.
4. **Binary protocol:** Framing layer is binary, not text — faster to parse, less error-prone.
5. **Stream prioritization:** Clients can indicate priority of resources.

```
HTTP/1.1: 6 connections × request-response-request-response
HTTP/2:   1 connection with many parallel streams
```

**In Node.js:**
```javascript
const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
});

server.on('stream', (stream, headers) => {
  stream.respond({ ':status': 200, 'content-type': 'text/html' });
  stream.end('<h1>Hello HTTP/2</h1>');
});
```

**Difficulty:** Intermediate

**Real-World Scenario:**
An Express app served behind Nginx with HTTP/2 enabled loads 40 asset files in one connection instead of 6 parallel connections making 7 sequential rounds. Load time drops from 3.2s to 1.8s.

**Follow-Up Questions:**
- What is HTTP/3 and how does it differ from HTTP/2?
- Does HTTP/2 make bundling (Webpack) less necessary?
- How do you enable HTTP/2 in Nginx?

---

### Q16. What is the difference between `id` and `class` attributes?

**Answer:**
Both `id` and `class` are HTML attributes used for targeting elements in CSS and JavaScript, but with important differences:

| Feature | `id` | `class` |
|---------|------|---------|
| Uniqueness | Must be unique per page | Reusable across elements |
| CSS specificity | Higher (0, 1, 0, 0) | Lower (0, 0, 1, 0) |
| JS selection | `getElementById` / `#id` | `getElementsByClassName` / `.class` |
| Multiple per element | Only one `id` per element | Multiple classes per element |
| URL fragment | Can be used as anchor (`#section`) | Cannot |

```html
<header id="main-header" class="header sticky-top dark-theme">
  <nav class="nav-primary">
    <a class="nav-link active" href="/">Home</a>
    <a class="nav-link" href="/about">About</a>
  </nav>
</header>
```

```css
#main-header { background: #1a1a2e; }  /* ID — unique header */
.nav-link { color: white; }            /* Class — reused on all links */
.nav-link.active { font-weight: bold; }/* Combined class selector */
```

```javascript
document.getElementById('main-header');
document.querySelectorAll('.nav-link');
```

**Difficulty:** Beginner

**Real-World Scenario:**
In accessibility testing, duplicate `id` attributes are flagged because screen readers and `<label for="id">` associations break when IDs aren't unique. React components can generate unique IDs using `useId()` hook.

**Follow-Up Questions:**
- What CSS specificity does an inline style have vs. an ID?
- What is the `useId` hook in React 18 and why was it introduced?
- How do CSS modules solve the class naming conflict problem in React?

---

### Q17. What is the `viewport` meta tag and why is it essential for responsive design?

**Answer:**
The viewport meta tag controls how browsers scale and display web pages on different screen sizes, especially mobile devices.

Without it, mobile browsers assume the page is designed for desktop (~980px) and shrink everything, making text tiny and requiring pinch-to-zoom.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Attributes:**
- `width=device-width` — Set viewport width to device's screen width
- `initial-scale=1.0` — No initial zoom
- `maximum-scale=1.0` — Prevent user zoom (use carefully — hurts accessibility)
- `user-scalable=no` — Disable pinch zoom (accessibility violation per WCAG)

**In a Vite + React project**, it's in `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My MERN App</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

**Difficulty:** Beginner

**Real-World Scenario:**
Your React app's mobile Lighthouse score drops to 40 because CSS media queries don't trigger properly without the viewport meta tag — the browser is in desktop emulation mode. Adding the tag jumps mobile score to 92.

**Follow-Up Questions:**
- How do CSS media queries interact with the viewport meta tag?
- What is the difference between viewport width and screen width?
- What does `initial-scale=1` actually mean mathematically?

---

### Q18. What are Web Components and how do they compare to React components?

**Answer:**
Web Components are a set of native browser standards that allow creation of reusable, encapsulated HTML elements without any framework.

**Three pillars of Web Components:**
1. **Custom Elements** — Define new HTML tags
2. **Shadow DOM** — Encapsulated DOM tree (styles don't leak in/out)
3. **HTML Templates** — `<template>` and `<slot>` for reusable markup

```javascript
// Native Web Component
class UserCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        :host { display: block; padding: 16px; }
        h3 { color: #3B82F6; }
      </style>
      <h3>${this.getAttribute('name')}</h3>
      <p>${this.getAttribute('role')}</p>
    `;
  }
}
customElements.define('user-card', UserCard);

// Usage
<user-card name="Alice" role="Engineer"></user-card>
```

**Comparison with React:**

| Feature | Web Components | React |
|---------|---------------|-------|
| Encapsulation | Native Shadow DOM | CSS Modules / Styled-components |
| State management | Manual/Events | useState, Redux |
| Reactivity | Manual DOM updates | Virtual DOM / reconciliation |
| Ecosystem | Growing | Massive |
| Framework dependency | None | React library |
| SSR | Limited | Full (Next.js) |

**Difficulty:** Intermediate

**Real-World Scenario:**
A design system team builds components as Web Components (e.g., `<ds-button>`, `<ds-modal>`) so they work in projects using React, Vue, Angular, or vanilla JS — true framework agnosticism.

**Follow-Up Questions:**
- Can you use Web Components inside React? Are there any gotchas?
- What is Lit and how does it simplify Web Component development?
- What are the limitations of Shadow DOM for theming?

---

### Q19. What is the difference between `href` and `src` attributes?

**Answer:**

| Attribute | Used with | Purpose |
|-----------|-----------|---------|
| `href` | `<a>`, `<link>`, `<base>` | Links to an external resource; does NOT block rendering |
| `src` | `<img>`, `<script>`, `<iframe>`, `<audio>`, `<video>` | Embeds/imports a resource; IS replaced by the resource |

```html
<!-- href — navigates to or imports (non-blocking for <link>) -->
<a href="https://example.com">Visit Site</a>
<link rel="stylesheet" href="/styles.css">  <!-- Fetches and applies CSS -->

<!-- src — embeds/loads the resource into the element -->
<img src="/logo.png" alt="Logo">          <!-- Image IS the element's content -->
<script src="/app.js"></script>           <!-- Script IS loaded and executed -->
<iframe src="/widget.html"></iframe>      <!-- Embedded page -->
```

**Difficulty:** Beginner

**Real-World Scenario:**
A junior developer mistakes `<link src="styles.css">` for a stylesheet — this is invalid. The correct attribute is `href`. Similarly, `<img href="photo.jpg">` is incorrect; it must be `src`.

**Follow-Up Questions:**
- Why does a `<script src>` block HTML parsing but `<link href>` doesn't?
- What is the `integrity` attribute used alongside `src`/`href` for?
- What is the `crossorigin` attribute and when do you need it?

---

### Q20. What is WebSocket and how does it differ from regular HTTP?

**Answer:**
WebSocket is a protocol providing full-duplex, bidirectional communication over a single TCP connection. Once established, both client and server can push data to each other at any time.

**HTTP vs WebSocket:**

| Feature | HTTP | WebSocket |
|---------|------|-----------|
| Communication | Request-Response | Full-duplex (both ways) |
| Connection | New per request | Persistent |
| Overhead | Headers on every request | One-time handshake |
| Real-time | Polling workaround | Native |
| Protocol | HTTP | `ws://` or `wss://` |

```javascript
// WebSocket Client (React)
const ws = new WebSocket('wss://api.example.com/ws');

ws.onopen = () => {
  ws.send(JSON.stringify({ type: 'subscribe', channel: 'chat_room_42' }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  setMessages(prev => [...prev, data]);
};

ws.onclose = () => console.log('WebSocket disconnected');
```

```javascript
// WebSocket Server (Node.js with ws library)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Broadcast to all clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A real-time collaborative document editor (like Google Docs) in your MERN app needs WebSocket. HTTP polling every 500ms would create massive server load for 10,000 concurrent users, while WebSocket maintains 10,000 persistent connections with negligible overhead.

**Follow-Up Questions:**
- What is Socket.io and how does it differ from raw WebSocket?
- How do WebSockets interact with load balancers (sticky sessions)?
- What is the WebSocket handshake process?

---

## 2. CSS

### Q21. What is the CSS Box Model?

**Answer:**
The CSS Box Model is the fundamental model that describes how every HTML element is rendered as a rectangular box. Each box has four areas from inside to outside:

1. **Content** — Where text and images appear
2. **Padding** — Space between content and border (transparent)
3. **Border** — The border around the padding
4. **Margin** — Space outside the border (transparent, collapses with adjacent margins)

```css
.box {
  width: 200px;          /* Content width */
  padding: 20px;         /* Adds 40px (20 each side) to total width */
  border: 2px solid #333; /* Adds 4px to total width */
  margin: 10px;          /* Space outside the element */
}
/* Default: total width = 200 + 40 + 4 = 244px */

/* box-sizing: border-box (recommended) */
* {
  box-sizing: border-box; /* width INCLUDES padding + border */
}
.box-border {
  width: 200px;  /* Content area shrinks to fit padding + border within 200px */
  padding: 20px;
  border: 2px solid #333;
}
/* border-box: total width = 200px (as declared) */
```

**Difficulty:** Beginner

**Real-World Scenario:**
Without `box-sizing: border-box`, adding padding to a `.card` with `width: 100%` causes overflow. Most CSS resets (Tailwind, Normalize.css) apply `box-sizing: border-box` globally to make layout predictable.

**Follow-Up Questions:**
- What is margin collapsing and when does it occur?
- How does `box-sizing: border-box` affect flexbox and grid children?
- What is the `outline` property and how does it differ from `border`?

---

### Q22. Explain Flexbox and its most important properties.

**Answer:**
Flexbox is a one-dimensional layout model that arranges elements in rows or columns, distributing space and aligning items efficiently.

**Container Properties:**
```css
.flex-container {
  display: flex;                        /* Enable flexbox */
  flex-direction: row | column | row-reverse | column-reverse;
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
  align-items: stretch | flex-start | flex-end | center | baseline;
  flex-wrap: nowrap | wrap | wrap-reverse;
  gap: 16px;                            /* Space between items */
  align-content: ...;                   /* When multiple rows */
}
```

**Item Properties:**
```css
.flex-item {
  flex-grow: 1;     /* How much to grow relative to siblings */
  flex-shrink: 0;   /* How much to shrink (0 = don't shrink) */
  flex-basis: 200px; /* Initial size before grow/shrink */
  flex: 1 0 200px;  /* Shorthand: grow shrink basis */
  align-self: center; /* Override align-items for this item */
  order: 2;          /* Visual reordering (not in DOM) */
}
```

**Common patterns:**
```css
/* Center anything */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Navbar: logo left, links right */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Card grid with equal height */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.card { flex: 1 1 300px; } /* Min 300px, grow to fill */
```

**Difficulty:** Beginner

**Real-World Scenario:**
Building a responsive navigation bar for your MERN app. Flexbox handles the logo-left, links-center, auth-buttons-right layout in 3 lines of CSS — no floats, no absolute positioning.

**Follow-Up Questions:**
- When should you use Grid instead of Flexbox?
- What is `flex: 1` shorthand for?
- How does flexbox interact with `overflow: hidden` for truncating text?

---

### Q23. Explain CSS Grid and when to use it over Flexbox.

**Answer:**
CSS Grid is a two-dimensional layout system for rows AND columns simultaneously, making it ideal for complex page layouts.

**Grid Container:**
```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);     /* 3 equal columns */
  grid-template-rows: auto;
  gap: 24px;
  
  /* Named areas */
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}
```

**Grid Items:**
```css
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }

/* Spanning multiple cells */
.featured-card {
  grid-column: 1 / 3;  /* Span columns 1 to 3 */
  grid-row: 2 / 4;     /* Span rows 2 to 4 */
}
```

**Responsive Grid:**
```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
/* Auto-creates columns that are at least 280px, filling the container */
```

**Flexbox vs Grid:**
- **Flexbox** = 1D (row OR column). Use for navigation bars, card rows, centering.
- **Grid** = 2D (rows AND columns). Use for page layouts, dashboards, product grids.

**Difficulty:** Intermediate

**Real-World Scenario:**
Your admin dashboard has a sidebar + header + main content + footer layout. CSS Grid with named template areas defines this layout in ~10 lines of CSS and makes it trivially responsive with `@media` query changes to `grid-template-areas`.

**Follow-Up Questions:**
- What is `fr` unit in CSS Grid?
- What is the difference between `auto-fill` and `auto-fit`?
- Can you nest a flex container inside a grid item?

---

### Q24. What are CSS Custom Properties (CSS Variables) and how do you use them for theming?

**Answer:**
CSS Custom Properties (CSS Variables) are entities defined by CSS authors that contain specific values to be reused throughout a document. They cascade and can be overridden with specificity.

```css
/* Define variables on :root (global scope) */
:root {
  /* Color palette */
  --color-primary: #3B82F6;
  --color-primary-dark: #2563EB;
  --color-background: #FFFFFF;
  --color-text: #1F2937;
  
  /* Typography */
  --font-size-base: 16px;
  --font-family: 'Inter', sans-serif;
  
  /* Spacing */
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
}

/* Dark theme — override variables */
[data-theme="dark"] {
  --color-background: #1F2937;
  --color-text: #F9FAFB;
  --color-primary: #60A5FA;
}

/* Usage */
.button {
  background-color: var(--color-primary);
  font-family: var(--font-family);
  padding: var(--spacing-sm) var(--spacing-md);
}
```

**In React with dynamic theming:**
```javascript
const toggleTheme = () => {
  document.documentElement.setAttribute(
    'data-theme',
    currentTheme === 'light' ? 'dark' : 'light'
  );
};
```

**Difficulty:** Intermediate

**Real-World Scenario:**
Your SaaS app supports white-label theming. Each client provides primary/secondary colors. Storing these in CSS variables means changing 5 variables updates the entire app's theme with zero JavaScript — just update `:root` variables via a `<style>` tag injection.

**Follow-Up Questions:**
- What is the difference between CSS variables and Sass/SCSS variables?
- How do CSS variables interact with JavaScript?
- What is the `@property` at-rule and how does it extend CSS variables?

---

### Q25. What is CSS specificity and how is it calculated?

**Answer:**
CSS specificity determines which CSS rule is applied when multiple rules target the same element. Higher specificity wins.

**Specificity is calculated as a 4-part value: (A, B, C, D)**

| Selector | A | B | C | D | Value |
|----------|---|---|---|---|-------|
| Inline `style=""` | 1 | 0 | 0 | 0 | 1000 |
| `#id` | 0 | 1 | 0 | 0 | 100 |
| `.class`, `[attr]`, `:pseudo-class` | 0 | 0 | 1 | 0 | 10 |
| `element`, `::pseudo-element` | 0 | 0 | 0 | 1 | 1 |
| `*` Universal selector | 0 | 0 | 0 | 0 | 0 |

```css
p { color: blue; }                    /* (0,0,0,1) = 1 */
.text { color: green; }               /* (0,0,1,0) = 10 */
#heading { color: red; }              /* (0,1,0,0) = 100 */
/* style="color: purple" */          /* (1,0,0,0) = 1000 */

/* Combining selectors adds specificity */
nav .nav-link:hover { color: white; }/* (0,0,2,1) = 21 */

/* !important overrides everything (use sparingly) */
p { color: pink !important; }        /* Wins over #id rules */
```

**Difficulty:** Intermediate

**Real-World Scenario:**
You're debugging why a button color isn't changing. Using browser DevTools, you see the rule is crossed out — a more specific selector elsewhere overrides it. Adding an extra class (`.card .btn`) beats a single class `.btn` without resorting to `!important`.

**Follow-Up Questions:**
- What happens when two rules have exactly equal specificity?
- How do CSS Modules avoid specificity conflicts in React?
- What is the `:where()` pseudo-class and how does it affect specificity?

---

### Q26. What is the difference between `position: relative`, `absolute`, `fixed`, and `sticky`?

**Answer:**

| Value | Removed from flow | Position relative to | Scrolls with page |
|-------|------------------|---------------------|-------------------|
| `static` (default) | No | Normal flow | Yes |
| `relative` | No | Its normal position | Yes |
| `absolute` | Yes | Nearest positioned ancestor | Yes (with parent) |
| `fixed` | Yes | Viewport | No (stays fixed) |
| `sticky` | No | Normal flow until threshold | Until threshold |

```css
/* relative — offset from where it would naturally be */
.tooltip-trigger {
  position: relative; /* Creates positioning context for child */
}

/* absolute — positioned relative to nearest non-static ancestor */
.tooltip {
  position: absolute;
  top: 100%;   /* Below the trigger */
  left: 0;
}

/* fixed — stays in viewport regardless of scroll */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

/* sticky — normal flow, sticks when reaching threshold */
.table-header {
  position: sticky;
  top: 60px; /* Sticks 60px from top when scrolling */
  z-index: 10;
}
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A data table in your MERN dashboard has 100+ rows. Using `position: sticky` on the `<thead>` keeps column headers visible as users scroll through data without JavaScript scroll event listeners.

**Follow-Up Questions:**
- What is the `z-index` property and what is a stacking context?
- Why does `position: absolute` not work as expected when no parent has `position: relative`?
- How does `position: sticky` interact with `overflow: hidden`?

---

### Q27. What is CSS specificity and the cascade? How does inheritance work?

**Answer:**
The **cascade** determines which styles are applied when multiple rules target the same element. It considers:

1. **Origin and importance:** `!important` user agent > `!important` author > author > user > user agent
2. **Specificity:** Higher specificity wins (see Q25)
3. **Order of appearance:** Later rules win when specificity is equal

**Inheritance:**
Some CSS properties inherit their parent's value automatically (e.g., `color`, `font-family`, `font-size`). Others don't (e.g., `margin`, `padding`, `border`).

```css
.parent {
  color: blue;          /* Inherited by children */
  border: 1px solid;   /* NOT inherited */
}

.child {
  /* color is inherited: text will be blue */
  /* border is not: no border by default */
  
  color: inherit;  /* Explicitly inherit */
  border: inherit; /* Explicitly inherit non-inherited property */
  
  color: initial;  /* Reset to browser default */
  color: unset;    /* Inherited if inheritable, else initial */
  color: revert;   /* Browser default styles */
}
```

**Difficulty:** Intermediate

**Real-World Scenario:**
Setting `font-family: 'Inter', sans-serif` on `body` applies to all text through inheritance — you don't need to set it on every element. This is why global CSS resets/design tokens work efficiently.

**Follow-Up Questions:**
- What properties are inherited by default in CSS?
- What is the difference between `inherit`, `initial`, `unset`, and `revert`?
- How does `all: unset` work?

---

### Q28. What are CSS media queries and how do you build responsive designs?

**Answer:**
Media queries allow CSS rules to apply only under certain conditions (viewport size, device type, color scheme, etc.).

```css
/* Mobile-first approach (recommended) */
.container {
  width: 100%;
  padding: 16px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container { padding: 24px; }
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container { max-width: 1280px; margin: 0 auto; }
  .grid { grid-template-columns: repeat(3, 1fr); }
}

/* Dark mode preference */
@media (prefers-color-scheme: dark) {
  body { background: #1a1a2e; color: #e0e0e0; }
}

/* Print styles */
@media print {
  .navbar, .sidebar { display: none; }
  body { font-size: 12pt; }
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

**Common breakpoints (Tailwind-inspired):**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Difficulty:** Beginner

**Real-World Scenario:**
Your e-commerce app needs to display 4 product columns on desktop, 2 on tablet, 1 on mobile. CSS Grid with `auto-fill` and responsive breakpoints handles this without any JavaScript.

**Follow-Up Questions:**
- What is mobile-first vs desktop-first approach and why is mobile-first preferred?
- What is `clamp()` in CSS and how can it reduce media queries?
- How does the `container` query differ from a media query?

---

### Q29. What is Tailwind CSS and how does it integrate with React?

**Answer:**
Tailwind CSS is a utility-first CSS framework. Instead of writing custom CSS classes, you compose utilities directly in your HTML/JSX:

```jsx
// Traditional CSS approach
<button className="submit-btn">Submit</button>
/* CSS: .submit-btn { background: blue; color: white; padding: 8px 16px; ... } */

// Tailwind approach
<button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Submit
</button>
```

**Setup with Vite + React:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: { brand: '#3B82F6' },
      fontFamily: { sans: ['Inter', 'sans-serif'] }
    }
  },
  plugins: []
};
```

```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Benefits:**
- No naming CSS classes
- No context switching between files
- Tiny production bundle (PurgeCSS removes unused)
- Design constraints enforce consistency

**Difficulty:** Intermediate

**Real-World Scenario:**
A team of 5 React developers each writes custom CSS. After 3 months, the codebase has 40+ custom button styles. Migrating to Tailwind enforces a design system through the utility classes, and the CSS bundle shrinks from 200KB to 12KB after purging.

**Follow-Up Questions:**
- How does Tailwind's JIT (Just-in-Time) compiler work?
- What are Tailwind's `@apply` directive and when should you use it?
- How do you handle dark mode in Tailwind?

---

### Q30. What are CSS animations and transitions? When do you use each?

**Answer:**

**Transitions** — Smoothly animate between two states (triggered by state change like hover):
```css
.button {
  background: #3B82F6;
  transform: scale(1);
  transition: background 0.2s ease, transform 0.15s ease;
}

.button:hover {
  background: #2563EB;
  transform: scale(1.05);
}
```

**Animations** — Define keyframes for complex, multi-step animations (can auto-play, loop, etc.):
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeInUp 0.4s ease-out forwards;
}

/* Loading spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}
.spinner {
  animation: spin 1s linear infinite;
}
```

**Performance tip:** Animate only `transform` and `opacity` — they are GPU-composited (no layout/paint):
```css
/* ✅ GPU-composited (fast) */
transform: translateX(100px);
opacity: 0.5;

/* ❌ Causes layout/paint (slow) */
left: 100px;
width: 200px;
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A React modal should fade in + slide up when opened. A CSS animation with `forwards` fill mode handles the entry, while a reverse animation handles the exit — no JavaScript needed for the animation itself.

**Follow-Up Questions:**
- What is the `will-change` property and how does it affect performance?
- How do you handle animation in React with Framer Motion?
- What is `requestAnimationFrame` and how does it differ from CSS animations?

---

### Q31. What is the difference between `em`, `rem`, `px`, `%`, `vw`, and `vh` units?

**Answer:**

| Unit | Relative to | Best use |
|------|------------|----------|
| `px` | Absolute (1px = 1/96 inch on screen) | Borders, shadows |
| `em` | Parent element's `font-size` | Padding/margin relative to text |
| `rem` | Root element's `font-size` (`:root`) | Typography, consistent spacing |
| `%` | Parent's corresponding dimension | Widths, responsive layouts |
| `vw` | Viewport width (1vw = 1% of viewport) | Full-width elements |
| `vh` | Viewport height (1vh = 1% of viewport) | Full-height sections |

```css
:root { font-size: 16px; } /* 1rem = 16px */

body { font-size: 1rem; }     /* 16px */
h1 { font-size: 2.5rem; }     /* 40px */
.card { padding: 1.5rem; }    /* 24px — scales with root font */

/* em chains — can compound unexpectedly */
.parent { font-size: 1.5rem; } /* 24px */
.child { font-size: 0.875em; } /* 21px (0.875 × 24) */

/* Responsive typography with clamp */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  /* Min: 24px, preferred: 4% viewport, max: 48px */
}

/* Full viewport section */
.hero {
  width: 100vw;
  min-height: 100vh; /* At least full viewport height */
}
```

**Difficulty:** Beginner

**Real-World Scenario:**
If a user increases their system font size to 20px (for accessibility), `rem`-based spacing and typography scale proportionally, but `px`-based sizing stays fixed. Using `rem` respects user preferences.

**Follow-Up Questions:**
- What is the `dvh` unit and why was it introduced for mobile browsers?
- How does `clamp()` eliminate certain media queries?
- What is the difference between `100vw` and `100%` for an element width?

---

### Q32. What are CSS pseudo-classes and pseudo-elements?

**Answer:**

**Pseudo-classes** — Target elements based on state or position (single colon):
```css
a:hover { color: blue; }                  /* Mouse over */
input:focus { border-color: #3B82F6; }    /* Has focus */
input:valid { border-color: green; }      /* Valid value */
button:disabled { opacity: 0.5; }        /* Disabled */
li:first-child { font-weight: bold; }    /* First child */
li:last-child { border-bottom: none; }   /* Last child */
li:nth-child(odd) { background: #f5f5f5; } /* Alternating rows */
p:not(.exclude) { color: gray; }         /* Not matching selector */
:root { --primary: #3B82F6; }             /* Root element */
```

**Pseudo-elements** — Target virtual elements or parts of elements (double colon):
```css
p::before {
  content: "→ ";   /* Insert content before element */
  color: #3B82F6;
}

p::after {
  content: " ✓";   /* Insert content after element */
}

::placeholder { color: #9CA3AF; }        /* Input placeholder text */
::selection { background: #3B82F6; color: white; } /* Selected text */
p::first-line { font-weight: bold; }    /* First line of paragraph */
p::first-letter { font-size: 2em; }    /* Drop cap effect */
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A form's required fields need a red asterisk without modifying the HTML. `label::after { content: " *"; color: red; }` adds it purely in CSS, keeping the HTML clean.

**Follow-Up Questions:**
- Can you use pseudo-elements with React's styled-components?
- What is the `:is()` pseudo-class and how does it simplify selectors?
- How do you style the first item differently in a React-rendered list using CSS only?

---

### Q33. What are CSS preprocessors (Sass/SCSS) and what advantages do they offer?

**Answer:**
CSS preprocessors extend CSS with programming features that compile down to standard CSS. **Sass/SCSS** is the most popular.

**Sass features:**

```scss
// Variables (more powerful than CSS variables — compile-time)
$primary: #3B82F6;
$spacing-unit: 8px;

// Nesting
.card {
  padding: $spacing-unit * 2;
  border: 1px solid #E5E7EB;
  
  &:hover { box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
  
  &__title {
    font-size: 1.25rem;
    color: $primary;
  }
  
  &--featured { border-color: $primary; }
}

// Mixins — reusable blocks with parameters
@mixin flex-center($direction: row) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: $direction;
}

.hero { @include flex-center(column); }

// Functions
@function rem($px) { @return $px / 16px * 1rem; }
h1 { font-size: rem(40px); }

// Partials and imports
@use './variables';
@use './mixins';

// Loops
@for $i from 1 through 5 {
  .col-#{$i} { width: 20% * $i; }
}
```

**In a React project:**
```bash
npm install sass
# Then rename .css to .scss and import normally
import './App.scss';
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A design system with 60+ components needs consistent spacing, colors, and breakpoints. Sass variables defined in `_variables.scss` and imported across all component files ensure a single source of truth — change `$primary` once and all buttons, links, and highlights update.

**Follow-Up Questions:**
- What is the difference between `@use` and `@import` in Sass?
- How do CSS Modules compare to Sass for component-level styling in React?
- What is CSS-in-JS and how does it differ from Sass?

---

### Q34. What is the `z-index` property and what is a stacking context?

**Answer:**
`z-index` controls the stacking order of positioned elements (those with `position` other than `static`). Higher `z-index` appears in front.

**A stacking context is created by elements with:**
- `position: fixed` or `position: sticky`
- `position: relative/absolute` with `z-index` other than `auto`
- `opacity` less than 1
- `transform`, `filter`, `clip-path`
- `isolation: isolate`
- `will-change` (certain values)

```css
/* z-index only works on positioned elements */
.modal-overlay {
  position: fixed;
  z-index: 1000;  /* Works — element is fixed */
}

.tooltip {
  position: absolute;
  z-index: 50;
}

span { z-index: 999; } /* Ignored — position is static */

/* Stacking context isolation */
.card {
  isolation: isolate; /* Creates new stacking context */
}
```

**Common z-index scale:**
```css
:root {
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-overlay: 400;
  --z-modal: 500;
  --z-tooltip: 600;
  --z-toast: 700;
}
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A modal with `z-index: 9999` appears behind a dropdown menu. The dropdown is inside a parent with `transform: translateZ(0)` — this creates a new stacking context, so the modal's `z-index` is relative to the modal's parent stacking context, not the body. The fix: ensure the modal is rendered at the `<body>` level (React portals).

**Follow-Up Questions:**
- What are React Portals and why do they solve z-index stacking issues?
- How do you debug z-index issues in browser DevTools?
- What does `isolation: isolate` do?

---

### Q35. What is the difference between `display: none`, `visibility: hidden`, and `opacity: 0`?

**Answer:**

| Property | Layout space | Visible | Events | Accessible |
|----------|-------------|---------|--------|------------|
| `display: none` | Removed | No | No | No (hidden from AT) |
| `visibility: hidden` | Preserved | No | No | No |
| `opacity: 0` | Preserved | No (invisible) | Yes! | Yes (still read by AT) |

```css
/* display: none — element removed from layout entirely */
.hidden-modal { display: none; }

/* visibility: hidden — invisible but takes space */
.placeholder-ghost { visibility: hidden; }

/* opacity: 0 — invisible, still interactive, takes space */
.fade-out { opacity: 0; pointer-events: none; } /* Add pointer-events: none to prevent accidental clicks */
```

**Accessibility considerations:**
```css
/* For screen reader-only content (skip links, ARIA labels) */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
```

**For animations:**
```css
/* Transitioning display doesn't animate — use opacity + pointer-events */
.dropdown {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.dropdown.open {
  opacity: 1;
  pointer-events: auto;
}
```

**Difficulty:** Intermediate

**Real-World Scenario:**
An accordion component using `display: none` to hide content prevents CSS height transitions. Using `max-height: 0` → `max-height: 500px` with `overflow: hidden` provides a smooth expand/collapse animation that `display: none` cannot achieve.

**Follow-Up Questions:**
- How do you animate an element from `display: none` to `display: block` in CSS?
- What is the `hidden` HTML attribute and how does it differ from `display: none`?
- What is the `content-visibility: auto` CSS property?

---

### Q36. What is BEM naming convention in CSS?

**Answer:**
BEM (Block, Element, Modifier) is a CSS naming methodology that creates reusable, maintainable, and predictable CSS class names.

**Syntax:**
- **Block** — Standalone component: `.card`
- **Element** — Part of a block (double underscore): `.card__title`
- **Modifier** — Variation of block or element (double dash): `.card--featured`, `.card__title--large`

```html
<article class="card card--featured">
  <img class="card__image" src="..." alt="...">
  <div class="card__body">
    <h2 class="card__title card__title--large">Product Name</h2>
    <p class="card__description">...</p>
    <button class="card__button card__button--primary">Buy Now</button>
    <button class="card__button card__button--secondary">Wishlist</button>
  </div>
</article>
```

```css
.card { border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.card--featured { border: 2px solid #3B82F6; }
.card__image { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
.card__title { font-size: 1.25rem; font-weight: 600; }
.card__title--large { font-size: 1.5rem; }
.card__button { padding: 8px 16px; border-radius: 4px; cursor: pointer; }
.card__button--primary { background: #3B82F6; color: white; }
.card__button--secondary { background: transparent; border: 1px solid #3B82F6; }
```

**Difficulty:** Beginner

**Real-World Scenario:**
A team of 6 developers working on the same CSS file. Without BEM, classes like `.title` and `.button` collide. BEM's component-scoped naming (`.product-card__title`) prevents conflicts without CSS Modules.

**Follow-Up Questions:**
- How do CSS Modules replace the need for BEM in React?
- What are the downsides of BEM for deeply nested components?
- Can you use BEM with Tailwind CSS?

---

### Q37. What is CSS-in-JS? Compare styled-components with CSS Modules.

**Answer:**
CSS-in-JS is an approach to styling where CSS is written inside JavaScript files, often as template literals or objects.

**styled-components:**
```jsx
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.primary ? '#3B82F6' : 'white'};
  color: ${props => props.primary ? 'white' : '#3B82F6'};
  padding: 8px 16px;
  border: 2px solid #3B82F6;
  border-radius: 4px;
  
  &:hover {
    background: #2563EB;
    color: white;
  }
`;

// Usage
<Button primary>Primary</Button>
<Button>Secondary</Button>
```

**CSS Modules:**
```css
/* Button.module.css */
.button { padding: 8px 16px; border-radius: 4px; }
.primary { background: #3B82F6; color: white; }
.secondary { border: 2px solid #3B82F6; }
```

```jsx
import styles from './Button.module.css';

const Button = ({ primary, children }) => (
  <button className={`${styles.button} ${primary ? styles.primary : styles.secondary}`}>
    {children}
  </button>
);
```

**Comparison:**

| Feature | styled-components | CSS Modules |
|---------|------------------|-------------|
| Learning curve | Medium | Low |
| Dynamic styles | Native (props) | Requires inline styles |
| Performance | Runtime overhead | Zero runtime |
| SSR | Needs configuration | Built-in |
| Tooling | Good | Excellent |
| File organization | Co-located | Separate files |

**Difficulty:** Intermediate

**Real-World Scenario:**
A component library with 50+ components needs dynamic theming based on props. `styled-components` with a `ThemeProvider` handles this elegantly, injecting theme tokens as props into every styled component.

**Follow-Up Questions:**
- What is the Emotion CSS-in-JS library and how does it compare to styled-components?
- What is zero-runtime CSS-in-JS (Linaria, Vanilla Extract) and why does it matter?
- How do you implement dark mode with styled-components ThemeProvider?

---

### Q38. What is the `object-fit` property and when would you use it?

**Answer:**
`object-fit` controls how a replaced element (like `<img>` or `<video>`) should be resized to fit its container.

```css
/* Stretch to fill (default — can distort) */
img { object-fit: fill; }

/* Maintain aspect ratio, fit within container (letterbox) */
img { object-fit: contain; }

/* Maintain aspect ratio, cover entire container (crop) */
img { object-fit: cover; }

/* Don't resize (use natural size) */
img { object-fit: none; }

/* Like contain, but won't upscale */
img { object-fit: scale-down; }
```

**Common pattern — consistent card images:**
```css
.product-card__image {
  width: 100%;
  height: 200px;          /* Fixed height */
  object-fit: cover;      /* Cover without distortion */
  object-position: center top; /* Focus on top-center of image */
}
```

**In React:**
```jsx
<img
  src={product.image}
  alt={product.name}
  style={{ width: '100%', height: 200, objectFit: 'cover' }}
/>
```

**Difficulty:** Beginner

**Real-World Scenario:**
Product images on an e-commerce site come in various sizes (portrait, landscape, square). Without `object-fit: cover`, images stretch or shrink inconsistently. With it, all cards show uniform 200px images cropped to the most important area.

**Follow-Up Questions:**
- What is the `object-position` property?
- How does `object-fit` interact with the `aspect-ratio` property?
- How do you handle lazy loading of images in React?

---

### Q39. What are CSS logical properties?

**Answer:**
CSS Logical Properties use start/end/block/inline instead of left/right/top/bottom to support different writing modes (LTR, RTL, vertical text).

```css
/* Physical properties (LTR-specific) */
.element {
  margin-left: 16px;
  padding-right: 16px;
  border-top: 1px solid;
  float: left;
}

/* Logical properties (writing-mode aware) */
.element {
  margin-inline-start: 16px;  /* left in LTR, right in RTL */
  padding-inline-end: 16px;   /* right in LTR, left in RTL */
  border-block-start: 1px solid; /* top in horizontal writing */
  float: inline-start;        /* left in LTR, right in RTL */
}

/* Shorthand logical properties */
.card {
  margin-block: 16px;      /* margin-top + margin-bottom */
  margin-inline: auto;     /* margin-left + margin-right (centering!) */
  padding-block: 12px;
  padding-inline: 24px;
}
```

**Difficulty:** Advanced

**Real-World Scenario:**
Your MERN app supports Arabic (RTL) and English (LTR). Using logical properties means you write CSS once — no `[dir="rtl"]` overrides needed. The layout automatically mirrors for RTL users.

**Follow-Up Questions:**
- How do you set the text direction in HTML?
- What is the `dir` attribute and how does it interact with CSS logical properties?
- How does Tailwind CSS handle RTL layouts?

---

### Q40. What are CSS Container Queries and how do they differ from media queries?

**Answer:**
Container Queries allow elements to respond to their **parent container's** size rather than the viewport size. This enables truly reusable components.

```css
/* Media query — responds to viewport */
@media (min-width: 768px) {
  .card { flex-direction: row; }
}

/* Container query — responds to container size */
.card-wrapper {
  container-type: inline-size; /* Enable container queries */
  container-name: card-container;
}

@container card-container (min-width: 400px) {
  .card {
    flex-direction: row;
    gap: 16px;
  }
  .card__image { width: 40%; }
}

@container card-container (max-width: 399px) {
  .card { flex-direction: column; }
}
```

**Why this matters:**
```html
<!-- Same card component, different contexts -->
<div class="main-content">    <!-- Wide: shows horizontal card -->
  <div class="card-wrapper"><div class="card">...</div></div>
</div>
<div class="sidebar">          <!-- Narrow: shows vertical card -->
  <div class="card-wrapper"><div class="card">...</div></div>
</div>
```

Without container queries, you'd need separate card components or JavaScript to detect context.

**Browser support:** Available in all modern browsers (Chrome 105+, Firefox 110+, Safari 16+).

**Difficulty:** Advanced

**Real-World Scenario:**
A `<ProductCard>` React component is used in a 3-column grid AND in a sidebar recommendations panel. Container queries let the same component adapt its layout based on where it's placed — horizontal in wide containers, vertical in narrow ones — without JavaScript or component variants.

**Follow-Up Questions:**
- Can you use container queries today in production?
- What is the `cqi` unit and how does it relate to container queries?
- How would you polyfill container queries for older browsers?

---

## 3. JavaScript Basics

### Q41. What is the difference between `var`, `let`, and `const`?

**Answer:**

| Feature | `var` | `let` | `const` |
|---------|-------|-------|---------|
| Scope | Function | Block | Block |
| Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Re-declaration | Yes | No | No |
| Re-assignment | Yes | Yes | No |
| Global property | Yes (`window.x`) | No | No |
| Use today | Avoid | State that changes | Default choice |

```javascript
// var — function-scoped (problematic)
function example() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 — leaks out of if block!
}

// let — block-scoped
function example2() {
  if (true) {
    let y = 10;
  }
  console.log(y); // ReferenceError: y is not defined
}

// const — block-scoped, no re-assignment
const API_URL = 'https://api.example.com';
API_URL = 'https://other.com'; // TypeError!

// BUT: const objects and arrays are mutable
const user = { name: 'Alice' };
user.name = 'Bob'; // OK — mutating the object, not reassigning
user = {};         // TypeError — reassigning the binding

// Temporal Dead Zone (TDZ) — let/const before declaration
console.log(a); // ReferenceError (TDZ)
let a = 5;
```

**Best practice:** Use `const` by default, `let` when you need to reassign, never `var`.

**Difficulty:** Beginner

**Real-World Scenario:**
A classic bug: using `var` in a `for` loop with async code. All callbacks share the same `i` variable (due to function scope). Using `let` creates a new binding per iteration, fixing the closure bug.

**Follow-Up Questions:**
- What is the Temporal Dead Zone (TDZ)?
- Why does `const` work for array push/pop?
- What is variable shadowing?

---

### Q42. What is hoisting in JavaScript?

**Answer:**
Hoisting is JavaScript's behavior of moving variable and function **declarations** to the top of their scope during the compilation phase — before code executes.

**Function declarations** are fully hoisted (name AND body):
```javascript
// This works — function is hoisted
greet('Alice'); // "Hello, Alice"

function greet(name) {
  console.log(`Hello, ${name}`);
}
```

**`var` declarations** are hoisted but initialized to `undefined`:
```javascript
console.log(x); // undefined (hoisted, not initialized yet)
var x = 5;
console.log(x); // 5

// Equivalent to:
var x;
console.log(x); // undefined
x = 5;
console.log(x); // 5
```

**`let` and `const`** are hoisted but NOT initialized (Temporal Dead Zone):
```javascript
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;
```

**Function expressions and arrow functions** are NOT hoisted:
```javascript
sayHi(); // TypeError: sayHi is not a function
var sayHi = function() { console.log('Hi!'); };
// var sayHi is hoisted as undefined, calling undefined() throws TypeError
```

**Difficulty:** Beginner

**Real-World Scenario:**
A junior developer calls a function at the top of a file before it's declared using a `const` arrow function. They get a `ReferenceError`. The fix: move the function declaration before the call, or use a traditional function declaration (which hoists).

**Follow-Up Questions:**
- What is the difference between a function declaration and a function expression in terms of hoisting?
- What is hoisting in the context of class declarations?
- How does the module system affect hoisting?

---

### Q43. What are JavaScript closures?

**Answer:**
A closure is a function that retains access to its outer scope's variables even after the outer function has returned. The function "closes over" its surrounding scope.

```javascript
// Basic closure
function createCounter() {
  let count = 0; // Private variable — not accessible from outside
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
counter.getCount();  // 1

// count is not accessible here:
console.log(count); // ReferenceError
```

**Practical applications:**
```javascript
// 1. Data privacy / encapsulation
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  
  return {
    deposit: (amount) => { balance += amount; return balance; },
    withdraw: (amount) => {
      if (amount > balance) throw new Error('Insufficient funds');
      balance -= amount;
      return balance;
    },
    getBalance: () => balance
  };
}

// 2. Factory functions
function createMultiplier(x) {
  return (y) => x * y; // closes over x
}
const double = createMultiplier(2);
const triple = createMultiplier(3);
double(5); // 10
triple(5); // 15

// 3. Memoization
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

**Difficulty:** Intermediate

**Real-World Scenario:**
React's `useState` is implemented using closures — each component instance maintains its own state because `useState` creates a closure over the state value and the dispatch function scoped to that component fiber.

**Follow-Up Questions:**
- What is a closure memory leak and how do you prevent it?
- How does the classic `for` loop with `var` and `setTimeout` demonstrate closures?
- What is the difference between a closure and a pure function?

---

### Q44. What is the difference between `==` and `===` in JavaScript?

**Answer:**

- `==` (loose equality): Compares values **after type coercion** — converts types to match before comparing.
- `===` (strict equality): Compares values AND types — **no coercion**.

```javascript
// == with type coercion
0 == false          // true (false coerces to 0)
1 == true           // true (true coerces to 1)
'' == false         // true
null == undefined   // true (special case)
null == 0           // false (null only == undefined)
'5' == 5            // true (string coerces to number)
[] == false         // true
[] == ![]           // true (both evaluate in coercion)

// === strict equality
0 === false         // false (different types)
'5' === 5           // false (different types)
null === undefined  // false (different types)
null === null       // true
NaN === NaN         // false! (use Number.isNaN())

// Special cases
typeof NaN          // 'number'
NaN == NaN          // false
Number.isNaN(NaN)   // true (correct check)
Object.is(NaN, NaN) // true
Object.is(-0, +0)   // false (only way to distinguish)
```

**Best practice:** Always use `===`. The only exception: `== null` is a concise way to check for both `null` and `undefined`.

```javascript
// Idiomatic null/undefined check
if (value == null) {
  // value is null OR undefined
}
// Equivalent to:
if (value === null || value === undefined) {}
```

**Difficulty:** Beginner

**Real-World Scenario:**
A React form input value is always a string. Comparing `event.target.value == 1` returns `true` for the string `"1"`, masking a type mismatch bug. Using `===` or `Number(event.target.value) === 1` prevents this.

**Follow-Up Questions:**
- What is the Abstract Equality Comparison algorithm?
- What does `Object.is()` do differently from `===`?
- What are falsy values in JavaScript?

---

### Q45. What is the `this` keyword in JavaScript?

**Answer:**
`this` refers to the execution context — the object that the current code is operating on. Its value depends on **how a function is called**, not where it's defined.

```javascript
// 1. Global context — this = window (browser) or global (Node.js)
console.log(this); // Window or {}

// 2. Object method — this = the object
const user = {
  name: 'Alice',
  greet() {
    console.log(`Hello, ${this.name}`);
  }
};
user.greet(); // "Hello, Alice"

// 3. Standalone function — this = undefined (strict mode) or window
function greet() {
  console.log(this); // undefined in strict, window otherwise
}

// 4. Arrow functions — this is LEXICALLY bound (inherits from enclosing scope)
const obj = {
  name: 'Bob',
  greet: function() {
    const inner = () => {
      console.log(this.name); // 'Bob' — arrow inherits `this` from greet
    };
    inner();
  },
  greetArrow: () => {
    console.log(this.name); // undefined — arrow captures outer scope's `this`
  }
};

// 5. Class — this = the instance
class Person {
  constructor(name) { this.name = name; }
  greet() { return `Hello, ${this.name}`; }
}

// 6. Explicit binding
function greet() { return `Hello, ${this.name}`; }
const alice = { name: 'Alice' };
greet.call(alice);     // "Hello, Alice" — call with immediate invocation
greet.apply(alice, []); // same, args as array
const greetAlice = greet.bind(alice); // returns bound function
greetAlice(); // "Hello, Alice"

// 7. new keyword — this = newly created object
function Car(make) { this.make = make; }
const myCar = new Car('Tesla');
```

**Difficulty:** Intermediate

**Real-World Scenario:**
In React class components, event handler methods lose `this` binding when passed as callbacks. The fix: `this.handleClick = this.handleClick.bind(this)` in the constructor, or use arrow function class fields.

**Follow-Up Questions:**
- What does `Function.prototype.call` vs `apply` vs `bind` do?
- Why do arrow functions not have their own `this`?
- In what order do `new`, `bind`, `call/apply`, and method calls determine `this`?

---

### Q46. What is the JavaScript event loop?

**Answer:**
JavaScript is single-threaded but handles asynchronous operations through the **event loop** mechanism.

**Components:**
1. **Call Stack** — LIFO stack where synchronous code runs
2. **Web APIs** — Browser-provided APIs (setTimeout, fetch, DOM events) — run outside the JS engine
3. **Task Queue (Macrotask)** — Completed callbacks from Web APIs (setTimeout, setInterval, I/O)
4. **Microtask Queue** — Promise callbacks, `queueMicrotask()`, `MutationObserver`
5. **Event Loop** — Monitors call stack; when empty, moves tasks from queues to stack

**Priority:** Microtasks ALWAYS run before macrotasks after each task completes.

```javascript
console.log('1: Start');                          // Sync

setTimeout(() => console.log('2: Timeout'), 0);  // Macrotask queue

Promise.resolve()
  .then(() => console.log('3: Promise 1'))       // Microtask queue
  .then(() => console.log('4: Promise 2'));      // Microtask queue (after 3)

queueMicrotask(() => console.log('5: Microtask')); // Microtask queue

console.log('6: End');                            // Sync

// Output order:
// 1: Start
// 6: End
// 3: Promise 1
// 5: Microtask
// 4: Promise 2
// 2: Timeout
```

**Visual flow:**
```
Call Stack → [1, 6] sync code runs
→ All sync done, check Microtask Queue → [3, 5, 4] run
→ Microtasks empty, check Task Queue → [2] runs
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A React app's `setState` is called inside a `setTimeout`. Unlike `setState` in React event handlers (which batches), this causes an additional re-render. Understanding the event loop explains why asynchronous state updates in React 17 aren't batched (fixed in React 18 with Automatic Batching).

**Follow-Up Questions:**
- What is the difference between macrotasks and microtasks?
- How does `async/await` interact with the event loop?
- What is `process.nextTick()` in Node.js and how does it differ from `Promise.then()`?

---

### Q47. What are JavaScript Promises and how do they work?

**Answer:**
A Promise is an object representing the eventual completion or failure of an asynchronous operation. It has three states: **pending**, **fulfilled**, or **rejected**.

```javascript
// Creating a Promise
const fetchUser = (id) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (id > 0) {
      resolve({ id, name: 'Alice' }); // Success
    } else {
      reject(new Error('Invalid user ID')); // Failure
    }
  }, 1000);
});

// Consuming a Promise
fetchUser(1)
  .then(user => {
    console.log(user); // { id: 1, name: 'Alice' }
    return fetchUser(2); // Return new promise for chaining
  })
  .then(user2 => console.log(user2))
  .catch(error => console.error('Error:', error.message))
  .finally(() => console.log('Always runs'));

// Promise combinators
const [user, posts, comments] = await Promise.all([
  fetchUser(1),
  fetchPosts(1),
  fetchComments(1)
]); // All parallel, fails if any fail

const result = await Promise.allSettled([
  fetchUser(1),
  fetchUser(-1)
]); // Both parallel, doesn't fail — returns [{status: 'fulfilled', value}, {status: 'rejected', reason}]

const first = await Promise.race([
  fetch('cdn1.com/resource'),
  fetch('cdn2.com/resource')
]); // Resolves with first to complete (either success or fail)

const data = await Promise.any([
  fetchFromServer1(),
  fetchFromServer2()
]); // Resolves with first SUCCESS; fails only if ALL fail
```

**Difficulty:** Intermediate

**Real-World Scenario:**
Your product page needs user data, product details, and reviews. Using `Promise.all` fetches all three simultaneously — reducing 3× sequential API calls (1.5s total) to parallel calls (0.6s — the slowest individual call).

**Follow-Up Questions:**
- What is Promise chaining and how does `.then()` return a new promise?
- What is the difference between `Promise.all` and `Promise.allSettled`?
- How does `async/await` differ from Promise chains?

---

### Q48. What is `async/await` and how does it work?

**Answer:**
`async/await` is syntactic sugar over Promises that makes asynchronous code look and behave more like synchronous code. An `async` function always returns a Promise.

```javascript
// Promise chain version
function getUser(id) {
  return fetch(`/api/users/${id}`)
    .then(res => {
      if (!res.ok) throw new Error('User not found');
      return res.json();
    })
    .then(user => {
      return fetch(`/api/posts?userId=${user.id}`);
    })
    .then(res => res.json())
    .then(posts => ({ user, posts }))
    .catch(err => console.error(err));
}

// async/await version — same logic, much clearer
async function getUser(id) {
  try {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) throw new Error('User not found');
    
    const user = await res.json();
    const postsRes = await fetch(`/api/posts?userId=${user.id}`);
    const posts = await postsRes.json();
    
    return { user, posts };
  } catch (error) {
    console.error('Failed:', error.message);
    throw error; // Re-throw if caller needs to handle
  }
}

// Parallel execution with async/await
async function getDashboardData() {
  // Sequential (slow) — don't do this unless order matters
  const user = await fetchUser();
  const stats = await fetchStats();
  
  // Parallel (fast) — do this
  const [user, stats, notifications] = await Promise.all([
    fetchUser(),
    fetchStats(),
    fetchNotifications()
  ]);
  
  return { user, stats, notifications };
}
```

**Difficulty:** Intermediate

**Real-World Scenario:**
In a React component using hooks, `useEffect` with `async` functions needs careful handling because `useEffect`'s callback can't be `async` (it would return a Promise, not a cleanup function). The pattern: define async function inside and call it:

```javascript
useEffect(() => {
  let cancelled = false;
  
  async function loadData() {
    try {
      const data = await fetchData(id);
      if (!cancelled) setData(data);
    } catch (err) {
      if (!cancelled) setError(err);
    }
  }
  
  loadData();
  return () => { cancelled = true; };
}, [id]);
```

**Follow-Up Questions:**
- What happens if you `await` a non-Promise value?
- How do you handle errors in async functions?
- What is the `for await...of` loop?

---

### Q49. Explain JavaScript prototypes and prototypal inheritance.

**Answer:**
JavaScript uses prototypal inheritance — objects inherit directly from other objects. Every object has a `[[Prototype]]` property pointing to another object (its prototype).

```javascript
// Prototype chain
const animal = {
  isAlive: true,
  breathe() { return 'breathing...'; }
};

const dog = Object.create(animal); // dog.__proto__ === animal
dog.bark = function() { return 'Woof!'; };
dog.name = 'Rex';

dog.bark();    // 'Woof!' — own property
dog.breathe(); // 'breathing...' — inherited from animal
dog.isAlive;   // true — inherited from animal
'bark' in dog; // true

// Prototype chain lookup:
// dog → animal → Object.prototype → null
```

**ES6 Classes are syntactic sugar over prototypes:**
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  breathe() { return `${this.name} is breathing`; }
}

class Dog extends Animal {
  bark() { return `${this.name} says Woof!`; }
}

const rex = new Dog('Rex');
rex.bark();    // 'Rex says Woof!' — own method
rex.breathe(); // 'Rex is breathing' — inherited

// Under the hood:
Dog.prototype.__proto__ === Animal.prototype; // true
rex.__proto__ === Dog.prototype;              // true
```

**Object.create pattern (explicit prototypal):**
```javascript
function createPerson(name) {
  return Object.create({
    greet() { return `Hi, I'm ${this.name}`; }
  }, {
    name: { value: name, writable: true, enumerable: true }
  });
}
```

**Difficulty:** Intermediate

**Real-World Scenario:**
Understanding prototypal inheritance helps debug issues like: why does `Array.prototype.push` work on custom array-like objects, and how extending built-in classes works. In React, many patterns (HOCs, hooks composition) conceptually parallel prototype delegation.

**Follow-Up Questions:**
- What is the difference between `__proto__` and `prototype`?
- What is `Object.create(null)` used for?
- How do ES6 classes differ from classical inheritance in Java/C++?

---

### Q50. What are JavaScript callbacks and what is callback hell?

**Answer:**
A **callback** is a function passed as an argument to another function, to be executed when an asynchronous operation completes.

```javascript
// Simple callback
function fetchData(url, callback) {
  setTimeout(() => {
    callback(null, { data: 'result' }); // Node.js convention: (error, data)
  }, 1000);
}

fetchData('/api/user', (err, user) => {
  if (err) return console.error(err);
  console.log(user);
});
```

**Callback Hell (Pyramid of Doom):**
```javascript
// Deeply nested callbacks — hard to read, debug, maintain
getUser(userId, (userErr, user) => {
  if (userErr) return handleError(userErr);
  
  getPosts(user.id, (postsErr, posts) => {
    if (postsErr) return handleError(postsErr);
    
    getComments(posts[0].id, (commentsErr, comments) => {
      if (commentsErr) return handleError(commentsErr);
      
      getLikes(comments[0].id, (likesErr, likes) => {
        if (likesErr) return handleError(likesErr);
        // Now we can do something with data...
        // But we're 4 levels deep with error handling at each level
      });
    });
  });
});
```

**Solutions:**
1. **Named functions** — break callbacks into named functions
2. **Promises** — chain `.then()` calls
3. **async/await** — sequential-looking async code

```javascript
// async/await solution to callback hell
async function loadDashboard(userId) {
  const user = await getUser(userId);
  const posts = await getPosts(user.id);
  const comments = await getComments(posts[0].id);
  const likes = await getLikes(comments[0].id);
  return { user, posts, comments, likes };
}
```

**Difficulty:** Beginner

**Real-World Scenario:**
Legacy Node.js APIs (like the `fs` module's original API) use callbacks. Libraries like `util.promisify` convert callback-style functions to Promises. Modern Node.js has `fs/promises` natively.

**Follow-Up Questions:**
- What is the error-first callback convention in Node.js?
- How does `util.promisify` work?
- What is an event emitter and how does it differ from a callback?

---

### Q51. What are the different types of scope in JavaScript?

**Answer:**
Scope determines where variables are accessible. JavaScript has three main types:

```javascript
// 1. Global Scope — accessible everywhere
const globalVar = 'I am global';
var alsoGlobal = 'Also global'; // Also adds to window.alsoGlobal in browser

// 2. Function Scope — accessible within the function
function outer() {
  const outerVar = 'outer';
  
  function inner() {
    const innerVar = 'inner';
    console.log(outerVar); // Can access — scope chain traversal
    console.log(innerVar); // Own scope
  }
  
  console.log(outerVar); // Can access
  // console.log(innerVar); // Error — not accessible
}

// 3. Block Scope (ES6 let/const) — accessible within {}
{
  let blockVar = 'block';
  const blockConst = 'also block';
  console.log(blockVar); // OK
}
// console.log(blockVar); // Error — not accessible

// 4. Module Scope — top-level variables in ES modules are module-scoped
// import/export controls what's accessible

// Scope Chain — JavaScript looks up the chain until finding the variable
const x = 'global';

function outer() {
  const x = 'outer'; // Shadows global x
  
  function inner() {
    // No x here — looks up to outer() → finds 'outer'
    console.log(x); // 'outer'
  }
  inner();
}
```

**IIFE — Immediately Invoked Function Expression (pre-ES6 module pattern):**
```javascript
(function() {
  // Everything here is scoped — doesn't pollute global
  const private = 'private';
})();
```

**Difficulty:** Beginner

**Real-World Scenario:**
In Express.js middleware, global variables defined with `var` at the top of a file can unexpectedly persist across requests (since Node.js modules are singletons). Using `let`/`const` and proper module patterns prevents shared mutable state between request handlers.

**Follow-Up Questions:**
- What is lexical scope?
- What is the scope chain?
- How does the module pattern use IIFE to create private scope?

---

### Q52. What is the difference between `null` and `undefined`?

**Answer:**

| | `null` | `undefined` |
|--|--------|------------|
| Type | `'object'` (historic bug) | `'undefined'` |
| Meaning | Intentional absence of value | Uninitialized / missing |
| Set by | Developer explicitly | JavaScript engine |
| Equality | `null == undefined` | `undefined == null` |
| JSON | Serialized as `null` | Omitted from JSON |

```javascript
// undefined — JavaScript sets this automatically
let x;                        // undefined
function fn(a) { return a; }
fn();                         // undefined — no argument passed
const obj = {};
obj.nonExistent;              // undefined — property doesn't exist

// null — developer explicitly sets "no value"
let user = null;              // User not loaded yet
const getUser = async (id) => {
  const user = await db.findById(id);
  return user || null;        // Explicitly return null if not found
};

// Checking for both
const value = null;
value == null;                // true (loose equality catches both)
value === null;               // true (strict)
value === undefined;          // false

// Optional chaining — handles both
const name = user?.profile?.name; // undefined if user or profile is null/undefined

// Nullish coalescing — default only for null/undefined (not 0 or '')
const display = user?.name ?? 'Anonymous'; // 'Anonymous' if null/undefined
const count = total || 0;                  // Falsy: 0 would trigger too!
const count2 = total ?? 0;                 // Only null/undefined triggers
```

**Difficulty:** Beginner

**Real-World Scenario:**
MongoDB returns `null` for fields that are explicitly set to null, and `undefined` for fields that don't exist on a document. Knowing the difference prevents bugs when checking if a user has a profile picture (`user.avatar !== null`) vs. checking if a field exists at all.

**Follow-Up Questions:**
- What is the nullish coalescing operator (`??`)?
- What is optional chaining (`?.`)?
- What does `JSON.stringify` do with `undefined` values?

---

### Q53. What is the difference between synchronous and asynchronous JavaScript?

**Answer:**
**Synchronous:** Code executes sequentially — each line blocks until the previous completes.
**Asynchronous:** Operations start and code continues executing; callbacks/promises run when the operation finishes.

```javascript
// Synchronous — blocks execution
console.log('Start');
const result = JSON.parse('{"name":"Alice"}'); // Blocks until parsed
console.log(result.name); // 'Alice'
console.log('End');
// Output: Start, Alice, End (in order)

// Asynchronous — non-blocking
console.log('Start');

fetch('https://api.example.com/user/1')
  .then(res => res.json())
  .then(user => console.log(user.name)); // Runs after response arrives

console.log('End'); // Runs BEFORE the fetch response!
// Output: Start, End, Alice (fetch happens later)
```

**Synchronous blocking operations to avoid in Node.js:**
```javascript
// ❌ Synchronous file read — blocks event loop
const data = fs.readFileSync('./large-file.txt', 'utf-8');

// ✅ Asynchronous — non-blocking
const data = await fs.promises.readFile('./large-file.txt', 'utf-8');
```

**Patterns for async JavaScript:**
1. Callbacks (old style)
2. Promises
3. async/await (modern, preferred)
4. Generators + `co` library

**Difficulty:** Beginner

**Real-World Scenario:**
A Node.js HTTP server using `fs.readFileSync` blocks the entire event loop while reading a file. Other requests must wait. Using `fs.promises.readFile` or streams allows concurrent request handling without blocking.

**Follow-Up Questions:**
- Why is JavaScript single-threaded despite being "non-blocking"?
- What is I/O-bound vs CPU-bound work and how does Node.js handle each?
- What is the difference between concurrency and parallelism?

---

### Q54. What are JavaScript arrays and what are the most important array methods?

**Answer:**
Arrays are ordered, zero-indexed collections that hold any data type. JavaScript arrays are objects with numeric keys and special prototype methods.

```javascript
// Creation
const arr = [1, 2, 3, 4, 5];
const arr2 = new Array(5).fill(0); // [0,0,0,0,0]
const arr3 = Array.from({ length: 5 }, (_, i) => i + 1); // [1,2,3,4,5]
const arr4 = Array.of(1, 2, 3); // [1,2,3]

// ============ MUTATION METHODS ============
arr.push(6);       // Add to end → [1,2,3,4,5,6]
arr.pop();         // Remove from end → returns 6
arr.unshift(0);    // Add to start → [0,1,2,3,4,5]
arr.shift();       // Remove from start → returns 0
arr.splice(2, 1);  // Remove 1 element at index 2
arr.reverse();     // Reverse in place
arr.sort((a, b) => a - b); // Sort with comparator (ascending)

// ============ NON-MUTATION (FUNCTIONAL) METHODS ============
arr.map(x => x * 2);           // Transform: [2,4,6,8,10]
arr.filter(x => x % 2 === 0);  // Filter: [2,4]
arr.reduce((acc, x) => acc + x, 0); // Accumulate: 15
arr.find(x => x > 3);          // First match: 4
arr.findIndex(x => x > 3);     // Index of first match: 3
arr.some(x => x > 4);          // Any match: true
arr.every(x => x > 0);         // All match: true
arr.includes(3);                // Contains: true
arr.flat();                     // Flatten 1 level
arr.flatMap(x => [x, x * 2]);  // Map + flat 1 level
arr.slice(1, 3);                // [2, 3] — copy subarray
[...arr1, ...arr2];             // Concatenate
arr.indexOf(3);                 // 2
arr.lastIndexOf(3);             // 2

// Iteration
arr.forEach((item, index, array) => console.log(item, index));

// ES2023
arr.toSorted((a, b) => a - b);  // Non-mutating sort
arr.toReversed();                // Non-mutating reverse
arr.toSpliced(2, 1, 99);        // Non-mutating splice
arr.with(2, 99);                 // Replace at index, non-mutating
arr.findLast(x => x < 5);       // Find from end
arr.findLastIndex(x => x < 5);  // findIndex from end
```

**Difficulty:** Beginner

**Real-World Scenario:**
Processing a list of products in a React e-commerce app:
```javascript
const displayedProducts = products
  .filter(p => p.inStock && p.price <= maxPrice)
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 20)
  .map(p => ({ ...p, discountedPrice: p.price * 0.9 }));
```

**Follow-Up Questions:**
- What is the difference between `map` and `forEach`?
- What does `flat(Infinity)` do?
- How does `reduce` work to flatten a nested array?

---

### Q55. What are JavaScript objects and how do you work with them?

**Answer:**
Objects are key-value collections that can store any type of data. They're the foundation of JavaScript — functions, arrays, dates are all objects.

```javascript
// Creation
const user = {
  name: 'Alice',
  age: 30,
  address: { city: 'NYC', zip: '10001' },
  greet() { return `Hello, ${this.name}`; }
};

// Access
user.name;          // 'Alice' — dot notation
user['name'];       // 'Alice' — bracket notation (dynamic keys)
const key = 'age';
user[key];          // 30 — dynamic key access

// Manipulation
user.email = 'alice@example.com'; // Add property
delete user.age;                   // Remove property
user.name = 'Alicia';             // Update

// Object static methods
Object.keys(user);    // ['name', 'address', 'greet', 'email']
Object.values(user);  // ['Alicia', {city...}, fn, 'alice@...']
Object.entries(user); // [['name', 'Alicia'], ...]
Object.assign({}, user, { role: 'admin' }); // Shallow merge
Object.freeze(user);  // Make immutable (shallow)
Object.seal(user);    // No add/delete, but can modify
Object.create(proto); // Create with prototype

// Spread (shallow copy/merge)
const updated = { ...user, role: 'admin' };

// Destructuring
const { name, address: { city }, email = 'N/A' } = user;

// Computed property names
const field = 'username';
const dynamic = { [field]: 'alice123' }; // { username: 'alice123' }

// Property shorthand
const x = 1, y = 2;
const point = { x, y }; // { x: 1, y: 2 }

// Deep clone options
const deepClone = JSON.parse(JSON.stringify(obj)); // Simple but limited
const structuredClone = structuredClone(obj);      // Modern, handles more types
```

**Difficulty:** Beginner

**Real-World Scenario:**
In a Redux reducer, you must return new object references (immutable updates) to trigger React re-renders:
```javascript
case UPDATE_USER:
  return { ...state, user: { ...state.user, name: action.payload } };
```

**Follow-Up Questions:**
- What is the difference between shallow and deep cloning?
- What is `Object.freeze()` and does it work recursively?
- What is the difference between `for...in` and `Object.keys()`?

---

### Q56. What is the difference between `forEach`, `map`, `filter`, and `reduce`?

**Answer:**

```javascript
const numbers = [1, 2, 3, 4, 5];

// forEach — iterate, no return value, side effects
numbers.forEach(n => console.log(n)); // undefined returned

// map — transform each element, returns NEW array of same length
const doubled = numbers.map(n => n * 2); // [2,4,6,8,10]
// Original unchanged: [1,2,3,4,5]

// filter — keep elements matching condition, returns NEW array
const evens = numbers.filter(n => n % 2 === 0); // [2,4]

// reduce — accumulate into single value
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15
const product = numbers.reduce((acc, n) => acc * n, 1); // 120

// reduce is the most powerful — can implement others
const myMap = (arr, fn) => arr.reduce((acc, item) => [...acc, fn(item)], []);
const myFilter = (arr, fn) => arr.reduce((acc, item) => fn(item) ? [...acc, item] : acc, []);

// Complex reduce example — group by category
const products = [
  { name: 'Laptop', category: 'Electronics' },
  { name: 'Phone', category: 'Electronics' },
  { name: 'T-Shirt', category: 'Clothing' }
];

const grouped = products.reduce((groups, product) => {
  const key = product.category;
  return {
    ...groups,
    [key]: [...(groups[key] || []), product]
  };
}, {}); 
// { Electronics: [{...}, {...}], Clothing: [{...}] }
```

**Difference table:**

| Method | Mutates | Returns | Use case |
|--------|---------|---------|----------|
| `forEach` | No | `undefined` | Side effects |
| `map` | No | New array (same length) | Transform data |
| `filter` | No | New array (shorter/equal) | Subset data |
| `reduce` | No | Anything | Accumulate/aggregate |

**Difficulty:** Beginner

**Real-World Scenario:**
React component rendering typically chains these:
```javascript
const activeUserNames = users
  .filter(u => u.isActive)      // filter
  .map(u => u.name.toUpperCase()) // map
  .sort();                        // sort
```

**Follow-Up Questions:**
- When would you choose `reduce` over a simple `for` loop?
- What is the `reduceRight` method?
- Can `map` and `filter` be replaced by `flatMap`?

---

### Q57. What are JavaScript template literals?

**Answer:**
Template literals (backtick strings) allow embedded expressions, multi-line strings, and tagged templates.

```javascript
const name = 'Alice';
const age = 30;

// String interpolation — embed expressions with ${}
const greeting = `Hello, ${name}! You are ${age} years old.`;
const math = `2 + 2 = ${2 + 2}`;
const ternary = `Status: ${age >= 18 ? 'adult' : 'minor'}`;

// Multi-line strings — no \n needed
const multiline = `
  Line 1
  Line 2
  Line 3
`;

// Nesting template literals
const items = ['apple', 'banana'];
const list = `
  <ul>
    ${items.map(item => `<li>${item}</li>`).join('')}
  </ul>
`;

// Tagged templates — function before template literal
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => 
    `${result}${str}${values[i] ? `<mark>${values[i]}</mark>` : ''}`, ''
  );
}
const highlighted = highlight`Hello, ${name}! You are ${age}.`;
// "Hello, <mark>Alice</mark>! You are <mark>30</mark>."

// Real-world: styled-components uses tagged templates
const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'white'};
  color: ${props => props.primary ? 'white' : 'blue'};
`;
```

**Difficulty:** Beginner

**Real-World Scenario:**
Building dynamic SQL-like queries for MongoDB aggregation pipelines, or generating HTML email templates on the server with Node.js — template literals make complex string construction readable.

**Follow-Up Questions:**
- What are tagged template literals and what are they used for?
- How does `String.raw` work as a tag function?
- What is the `graphql` tag used with Apollo Client?

---

### Q58. What is destructuring in JavaScript?

**Answer:**
Destructuring allows unpacking values from arrays or properties from objects into distinct variables.

```javascript
// ===== ARRAY DESTRUCTURING =====
const [first, second, , fourth] = [1, 2, 3, 4]; // Skip index 2
first;  // 1
second; // 2
fourth; // 4

// Default values
const [a = 10, b = 20] = [1]; // a=1, b=20 (default)

// Rest element
const [head, ...tail] = [1, 2, 3, 4]; // head=1, tail=[2,3,4]

// Swap variables
let x = 1, y = 2;
[x, y] = [y, x]; // x=2, y=1

// ===== OBJECT DESTRUCTURING =====
const user = { name: 'Alice', age: 30, role: 'admin' };
const { name, age } = user;

// Rename while destructuring
const { name: userName, role: userRole } = user;
userName; // 'Alice'
userRole; // 'admin'

// Default values
const { name: n, email = 'N/A' } = user;
email; // 'N/A' (not in object)

// Rest properties
const { role, ...rest } = user; // rest = { name: 'Alice', age: 30 }

// Nested destructuring
const { address: { city, zip } } = { address: { city: 'NYC', zip: '10001' } };

// ===== IN FUNCTION PARAMETERS =====
function displayUser({ name, age, role = 'user' }) {
  return `${name} (${age}) - ${role}`;
}
displayUser(user);

// React example — destructuring props
const Card = ({ title, description, image = '/default.jpg' }) => (
  <div>
    <img src={image} alt={title} />
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);
```

**Difficulty:** Beginner

**Real-World Scenario:**
React hooks return arrays specifically for destructuring flexibility:
```javascript
const [count, setCount] = useState(0);  // Name them whatever you want
const [isOpen, setIsOpen] = useState(false);
```
If hooks returned objects, you'd need to rename properties to avoid conflicts.

**Follow-Up Questions:**
- What happens if you destructure a property that doesn't exist?
- Can you destructure a Map or Set?
- How does destructuring work in `for...of` loops?

---

### Q59. What is the spread operator (`...`) in JavaScript?

**Answer:**
The spread operator `...` expands iterables (arrays, strings) or objects into individual elements.

```javascript
// ===== ARRAY SPREAD =====
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Concatenate
const combined = [...arr1, ...arr2]; // [1,2,3,4,5,6]

// Copy (shallow)
const copy = [...arr1]; // [1,2,3] — new array

// Pass as function arguments
Math.max(...arr1); // 3

// Convert string to array
[...'hello']; // ['h','e','l','l','o']

// Convert Set to array (deduplicate)
const unique = [...new Set([1, 2, 2, 3, 3])]; // [1,2,3]

// ===== OBJECT SPREAD (ES2018) =====
const defaults = { theme: 'light', lang: 'en', fontSize: 14 };
const userPrefs = { theme: 'dark', fontSize: 16 };

// Merge objects (later properties override earlier)
const settings = { ...defaults, ...userPrefs };
// { theme: 'dark', lang: 'en', fontSize: 16 }

// Immutable update pattern (React/Redux)
const state = { user: { name: 'Alice', age: 30 }, loading: false };
const newState = { ...state, loading: true }; // New object, state unchanged

// Nested immutable update
const updatedUser = {
  ...state,
  user: { ...state.user, age: 31 }
};

// Remove property with spread (create new object without it)
const { password, ...safeUser } = user; // safeUser has no password

// ===== IN FUNCTION PARAMETERS (REST) =====
function sum(...numbers) { // Rest — collects into array
  return numbers.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4); // 10
```

**Difficulty:** Beginner

**Real-World Scenario:**
In React, passing all props to a child:
```jsx
const Enhanced = ({ extraProp, ...rest }) => <Original {...rest} />;
// Passes all props except extraProp to Original
```

**Follow-Up Questions:**
- What is the difference between spread and rest parameters?
- Does object spread do a deep or shallow copy?
- What happens when you spread an object with getter properties?

---

### Q60. What is a JavaScript Map and how does it differ from a plain object?

**Answer:**

| Feature | Object | Map |
|---------|--------|-----|
| Key types | String/Symbol only | Any value (functions, objects, primitives) |
| Key order | Not guaranteed (mostly insertion for strings) | Insertion order guaranteed |
| Size | Manual (`Object.keys().length`) | `.size` property |
| Iteration | `Object.entries()` | `for...of`, `.forEach()` |
| Prototype | Has default properties | No inherited properties |
| Performance | Good for small sets | Better for frequent add/delete |
| JSON serialization | Native | Must convert manually |

```javascript
// Map — any key type
const map = new Map();
map.set('string', 'string key');
map.set(42, 'number key');
map.set(true, 'boolean key');
map.set({ id: 1 }, 'object key');

map.get('string');    // 'string key'
map.size;             // 4
map.has(42);          // true
map.delete(42);       // true
map.clear();          // Remove all

// Iteration
for (const [key, value] of map) {
  console.log(key, value);
}
map.forEach((value, key) => console.log(key, value));

const keys = [...map.keys()];
const values = [...map.values()];
const entries = [...map.entries()];

// Initialize from entries
const map2 = new Map([
  ['name', 'Alice'],
  ['age', 30]
]);

// Convert to/from object
const obj = Object.fromEntries(map2);
const mapFromObj = new Map(Object.entries(obj));

// WeakMap — keys must be objects, not iterable (allows GC)
const weakMap = new WeakMap();
weakMap.set(domNode, { clicks: 0 }); // Cleared when domNode is GC'd
```

**Difficulty:** Intermediate

**Real-World Scenario:**
Caching API responses keyed by request objects or DOM nodes by their element references — `WeakMap` prevents memory leaks because entries are garbage-collected when the key object is no longer referenced.

**Follow-Up Questions:**
- What is WeakMap and when would you use it over Map?
- How does using an object as a Map key work (reference equality)?
- What is Set and how does it differ from Array?

---

## 4. Advanced JavaScript

### Q61. What is the JavaScript execution context?

**Answer:**
An execution context (EC) is the environment in which JavaScript code is executed. Every time code runs, it runs in an execution context.

**Three types:**
1. **Global Execution Context (GEC)** — Created when the script starts. Creates `window`/`global` and `this`. Only one per program.
2. **Function Execution Context (FEC)** — Created when a function is called. One per function call.
3. **Eval Execution Context** — For `eval()` (avoid using).

**Each EC has two phases:**

**1. Creation Phase:**
- `this` binding determined
- Lexical environment created (scope chain)
- Variable Environment created:
  - `var` declarations initialized to `undefined` (hoisting)
  - `let`/`const` added to TDZ
  - Function declarations fully hoisted

**2. Execution Phase:**
- Code runs line by line
- Variables assigned actual values

**Call Stack:**
```javascript
function first() {
  second();
}
function second() {
  third();
}
function third() {
  console.log('hello');
}

first();

// Call Stack:
// [Global EC]
// [first EC]
// [second EC]
// [third EC]  ← Runs, console.log executed
// Back to second EC, then first EC, then Global EC
```

**Lexical Environment vs Variable Environment:**
- Lexical Environment: `let`/`const` bindings + outer reference (scope chain)
- Variable Environment: `var` bindings

**Difficulty:** Advanced

**Real-World Scenario:**
Understanding execution contexts explains why React's `useState` can maintain state between re-renders (closures over React's internal fiber data), and why arrow functions capture `this` lexically.

**Follow-Up Questions:**
- What happens to the call stack during a stack overflow?
- How does the lexical environment create the scope chain?
- What is the difference between execution context and scope?

---

### Q62. What is memory management and garbage collection in JavaScript?

**Answer:**
JavaScript automatically allocates memory when values are created and frees it when they're no longer reachable — this is garbage collection.

**Memory lifecycle:**
1. **Allocate** — JavaScript allocates memory when variables are created
2. **Use** — Reading/writing allocated memory
3. **Release** — GC frees memory no longer reachable

**Garbage Collection algorithms:**

**Reference Counting (old — has circular reference bug):**
```javascript
// Circular reference — never collected in reference counting
function createLeak() {
  const a = {};
  const b = {};
  a.ref = b; // a references b
  b.ref = a; // b references a — circular!
  // Both have ref count > 0 even though nothing else references them
}
```

**Mark-and-Sweep (modern V8):**
- Start from roots (global, call stack)
- Mark all reachable objects
- Sweep (collect) unmarked objects
- Handles circular references!

**Common memory leaks in JavaScript:**
```javascript
// 1. Forgotten timers
const timer = setInterval(() => {
  element.textContent = getData(); // Holds reference
}, 1000);
// Fix: clearInterval(timer) when done

// 2. Event listeners not removed
element.addEventListener('click', handler);
// Fix: element.removeEventListener('click', handler);

// React cleanup:
useEffect(() => {
  element.addEventListener('click', handler);
  return () => element.removeEventListener('click', handler); // Cleanup!
}, []);

// 3. Closures holding large data
function createClosure() {
  const largeData = new Array(1000000).fill('x');
  return () => largeData[0]; // Closure keeps ALL of largeData alive
}

// 4. Detached DOM nodes
let detachedNode = document.getElementById('myDiv');
document.body.removeChild(detachedNode);
// detachedNode variable still holds reference — not GC'd

// Fix: set to null
detachedNode = null;

// 5. Global variables
function leak() {
  leakedVar = 'I am global!'; // Missing var/let/const — becomes global
}
```

**Tools to detect leaks:**
- Chrome DevTools Memory tab
- Heap snapshots
- `--inspect` in Node.js + clinic.js

**Difficulty:** Advanced

**Real-World Scenario:**
A React dashboard that auto-refreshes data every 30 seconds. Without cleanup in `useEffect`, each component mount creates a new interval but never clears old ones on unmount — leading to exponential API calls and memory growth.

**Follow-Up Questions:**
- What is the difference between a memory leak and high memory usage?
- How does WeakMap/WeakSet help prevent memory leaks?
- What is the V8 heap structure (Young/Old generation)?

---

### Q63. What is debouncing and throttling?

**Answer:**
Both are techniques to limit how often a function executes in response to frequent events.

**Debouncing** — Delays execution until there's been a pause in events. Resets the timer on every call. Good for: search input, resize stop, scroll stop.

```javascript
function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Usage: Only fires 500ms after user STOPS typing
const handleSearch = debounce(async (query) => {
  const results = await fetch(`/api/search?q=${query}`);
  setResults(await results.json());
}, 500);

// React example
const [query, setQuery] = useState('');
const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

<input onChange={(e) => {
  setQuery(e.target.value);
  debouncedSearch(e.target.value);
}} />
```

**Throttling** — Ensures function only fires at most once per time period. Good for: scroll events, mouse move, window resize, rate limiting.

```javascript
function throttle(fn, interval) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= interval) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}

// Usage: Update scroll position at most once per 100ms
const handleScroll = throttle(() => {
  setScrollY(window.scrollY);
}, 100);

window.addEventListener('scroll', handleScroll);
```

**Key difference:**
- **Debounce:** "Call me after a PAUSE"
- **Throttle:** "Call me at MOST once per period"

```
User input: ||||||||||||||||||||||||||||
Debounce:   ........wait...............call (once, at end)
Throttle:   call....call....call....call (regularly spaced)
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A search-as-you-type feature makes an API call on every keystroke. With 10 keystrokes/second, that's 600 calls per minute. Debouncing with 500ms reduces this to 1 call per search query, saving server resources and improving UX.

**Follow-Up Questions:**
- What is the difference between leading and trailing debounce?
- When would you choose throttle over debounce for scroll events?
- How does `_.debounce` from Lodash work with React?

---

### Q64. What is currying in JavaScript?

**Answer:**
Currying is a technique where a function with multiple arguments is transformed into a sequence of functions, each taking a single argument.

```javascript
// Non-curried
function add(a, b, c) {
  return a + b + c;
}
add(1, 2, 3); // 6

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

curriedAdd(1)(2)(3); // 6

// Arrow function shorthand
const add = a => b => c => a + b + c;
add(1)(2)(3); // 6

// Partial application — fix some arguments
const add10 = add(10);
add10(5)(3); // 18
const add10And5 = add(10)(5);
add10And5(3); // 18

// Practical example: configurable functions
const multiply = x => y => x * y;
const double = multiply(2);   // double is a function
const triple = multiply(3);
const quadruple = multiply(4);

[1, 2, 3, 4, 5].map(double);    // [2,4,6,8,10]
[1, 2, 3, 4, 5].map(triple);    // [3,6,9,12,15]

// Generic curry function
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

const curriedSum = curry((a, b, c) => a + b + c);
curriedSum(1)(2)(3); // 6
curriedSum(1, 2)(3); // 6
curriedSum(1)(2, 3); // 6
curriedSum(1, 2, 3); // 6
```

**Difficulty:** Advanced

**Real-World Scenario:**
Building middleware-style API call functions:
```javascript
const createApiCall = baseUrl => endpoint => async (data) => {
  const res = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return res.json();
};

const api = createApiCall('https://api.example.com');
const createUser = api('/users');
const updateUser = api('/users/update');

await createUser({ name: 'Alice' });
```

**Follow-Up Questions:**
- What is partial application and how does it differ from currying?
- How is currying related to function composition?
- What is `Function.prototype.bind` doing in relation to partial application?

---

### Q65. What are JavaScript generators?

**Answer:**
Generator functions can be paused and resumed. They use `function*` syntax and `yield` to produce values lazily.

```javascript
// Basic generator
function* counter() {
  let i = 0;
  while (true) {
    yield i++; // Pause here, return i
  }
}

const gen = counter();
gen.next(); // { value: 0, done: false }
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }

// Finite generator
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const fib = fibonacci();
Array.from({ length: 8 }, () => fib.next().value);
// [1, 1, 2, 3, 5, 8, 13, 21]

// Generator with return value
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

[...range(0, 10, 2)]; // [0, 2, 4, 6, 8]

// Two-way communication — send values back with next(value)
function* accumulator() {
  let total = 0;
  while (true) {
    const value = yield total;
    if (value === null) break;
    total += value;
  }
}

const acc = accumulator();
acc.next();    // { value: 0, done: false } — start
acc.next(10);  // { value: 10, done: false }
acc.next(20);  // { value: 30, done: false }
acc.next(null); // { value: undefined, done: true }

// yield* delegation
function* concat(...arrays) {
  for (const arr of arrays) {
    yield* arr; // Delegate to another iterable
  }
}
[...concat([1,2], [3,4], [5,6])]; // [1,2,3,4,5,6]
```

**Difficulty:** Advanced

**Real-World Scenario:**
Redux-Saga uses generators to manage complex async flows in React apps:
```javascript
function* fetchUserSaga(action) {
  try {
    const user = yield call(fetchUser, action.payload);
    yield put({ type: 'FETCH_USER_SUCCESS', payload: user });
  } catch (error) {
    yield put({ type: 'FETCH_USER_ERROR', payload: error });
  }
}
```

**Follow-Up Questions:**
- How does `for...of` work with generators?
- What is the difference between generators and async generators?
- How does Redux-Saga use generators for side effect management?

---

### Q66. What is `Symbol` in JavaScript?

**Answer:**
`Symbol` is a primitive data type introduced in ES6. Every `Symbol()` call returns a unique symbol — guaranteed to be unique regardless of description.

```javascript
// Creating symbols
const id = Symbol('id');
const id2 = Symbol('id');
id === id2; // false — always unique!

// Symbols as object keys — don't appear in most enumerations
const user = {
  name: 'Alice',
  [id]: 42 // Symbol key
};

user[id]; // 42
Object.keys(user);                    // ['name'] — no symbol!
JSON.stringify(user);                 // '{"name":"Alice"}' — no symbol!
Object.getOwnPropertySymbols(user);   // [Symbol(id)]
Reflect.ownKeys(user);               // ['name', Symbol(id)]

// Well-known symbols — customize built-in behaviors
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        return current <= end 
          ? { value: current++, done: false }
          : { done: true };
      }
    };
  }
}

[...new Range(1, 5)]; // [1,2,3,4,5]
for (const n of new Range(1, 3)) console.log(n); // 1,2,3

// Symbol.for — global symbol registry (shared symbols)
const globalSym = Symbol.for('app.user');
const sameSym = Symbol.for('app.user');
globalSym === sameSym; // true — from registry!

// Other well-known symbols
class Collection {
  constructor(items) { this.items = items; }
  
  [Symbol.hasInstance](instance) { // instanceof behavior
    return instance instanceof Array;
  }
  
  get [Symbol.toStringTag]() { // Object.prototype.toString tag
    return 'Collection';
  }
  
  [Symbol.toPrimitive](hint) { // Type coercion
    if (hint === 'number') return this.items.length;
    if (hint === 'string') return `Collection(${this.items.length})`;
    return this.items;
  }
}
```

**Difficulty:** Advanced

**Real-World Scenario:**
React uses `Symbol.for('react.element')` as the `$$typeof` property on React elements to prevent XSS attacks — an attacker can't create a valid React element via JSON (JSON can't contain Symbols).

**Follow-Up Questions:**
- What are well-known symbols and give three examples?
- What is `Symbol.iterator` and how does it enable custom iteration?
- Why does React use `Symbol.for('react.element')` as a security measure?

---

### Q67. What is functional programming in JavaScript?

**Answer:**
Functional programming (FP) is a paradigm treating computation as the evaluation of mathematical functions, avoiding shared state and mutable data.

**Core FP concepts:**

**1. Pure functions — same input always gives same output, no side effects:**
```javascript
// Impure
let count = 0;
function incrementImpure() {
  count++; // Side effect: modifies external state
  return count;
}

// Pure
function increment(n) {
  return n + 1; // No side effects, deterministic
}
```

**2. Immutability — don't change data, create new versions:**
```javascript
// Mutable (bad)
const user = { name: 'Alice', age: 30 };
user.age = 31; // Mutation!

// Immutable (good)
const updatedUser = { ...user, age: 31 }; // New object
```

**3. Higher-order functions — functions that take/return functions:**
```javascript
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const normalize = pipe(
  str => str.trim(),
  str => str.toLowerCase(),
  str => str.replace(/\s+/g, '-')
);

normalize('  Hello World  '); // 'hello-world'
```

**4. Avoiding side effects:**
```javascript
// Side effect — affects external state
function printUser(user) {
  console.log(user); // Side effect
  document.title = user.name; // Another side effect
}

// Pure transformation
function formatUser(user) {
  return `${user.name} (${user.email})`;
}
// Then handle side effects at the boundary
console.log(formatUser(user));
```

**5. Referential transparency — expression can be replaced by its value:**
```javascript
// Referentially transparent — can replace with result
const add = (a, b) => a + b;
const result = add(2, 3); // Same as 5 everywhere
```

**Difficulty:** Advanced

**Real-World Scenario:**
React is fundamentally functional — components are pure functions of props. Redux reducers must be pure functions. The entire functional approach in React/Redux makes state predictable and testing trivial.

**Follow-Up Questions:**
- What is function composition and how is it different from piping?
- What is a monad in functional programming?
- How do React hooks enable functional programming patterns?

---

### Q68. What is the Proxy object in JavaScript?

**Answer:**
`Proxy` allows you to intercept and customize fundamental operations on an object (property access, assignment, enumeration, etc.).

```javascript
// Basic proxy
const target = { name: 'Alice', age: 30 };

const proxy = new Proxy(target, {
  // Intercept property reads
  get(target, property, receiver) {
    console.log(`Getting ${property}`);
    return Reflect.get(target, property, receiver);
  },
  
  // Intercept property writes
  set(target, property, value, receiver) {
    if (property === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    if (property === 'age' && value < 0) {
      throw new RangeError('Age must be positive');
    }
    console.log(`Setting ${property} = ${value}`);
    return Reflect.set(target, property, value, receiver);
  },
  
  // Intercept property existence checks (in operator)
  has(target, property) {
    return property in target;
  },
  
  // Intercept delete
  deleteProperty(target, property) {
    if (property === 'name') throw new Error('Cannot delete name');
    return Reflect.deleteProperty(target, property);
  }
});

proxy.name;           // "Getting name"
proxy.age = 25;       // "Setting age = 25"
proxy.age = 'old';    // TypeError
'name' in proxy;      // true

// Practical use: validation layer
function createValidator(target, validationRules) {
  return new Proxy(target, {
    set(target, prop, value) {
      if (validationRules[prop]) {
        const error = validationRules[prop](value);
        if (error) throw new Error(error);
      }
      return Reflect.set(target, prop, value);
    }
  });
}

// Reactive data (like Vue 3's reactivity system)
function reactive(obj) {
  return new Proxy(obj, {
    set(target, prop, value) {
      Reflect.set(target, prop, value);
      console.log(`${prop} changed to ${value} — trigger re-render!`);
      return true;
    }
  });
}

const state = reactive({ count: 0 });
state.count = 5; // "count changed to 5 — trigger re-render!"
```

**Difficulty:** Advanced

**Real-World Scenario:**
Vue 3's reactivity system uses Proxy to make data reactive — when a component's data changes, Vue's Proxy intercepts the `set` operation and triggers re-renders. This replaced Vue 2's `Object.defineProperty` approach, which had limitations with adding new properties.

**Follow-Up Questions:**
- What is Reflect and how does it relate to Proxy?
- What limitations does Proxy have compared to `Object.defineProperty`?
- How would you implement a simple two-way data binding using Proxy?

---

### Q69. What are WeakRef and FinalizationRegistry in JavaScript?

**Answer:**
ES2021 introduced `WeakRef` and `FinalizationRegistry` for advanced memory management scenarios.

**WeakRef** — holds a "weak" reference to an object that doesn't prevent garbage collection:
```javascript
let obj = { name: 'Alice', data: new Array(1000000).fill('x') };
const ref = new WeakRef(obj);

// Access the object (might return undefined if GC'd)
const deref = ref.deref();
if (deref) {
  console.log(deref.name); // 'Alice'
}

// After GC collects obj:
obj = null; // Remove strong reference
// Later...
ref.deref(); // undefined (if GC ran)
```

**FinalizationRegistry** — callback when objects are garbage collected:
```javascript
const registry = new FinalizationRegistry((heldValue) => {
  console.log(`Object with key ${heldValue} was garbage collected`);
  // Clean up associated resources
});

let element = document.createElement('div');
registry.register(element, 'my-div'); // Register for GC notification

element = null; // Remove strong reference
// When GC collects: "Object with key my-div was garbage collected"
```

**Practical use — cache with auto-cleanup:**
```javascript
class WeakCache {
  constructor() {
    this.cache = new Map();
    this.registry = new FinalizationRegistry((key) => {
      this.cache.delete(key);
    });
  }
  
  set(key, value) {
    const ref = new WeakRef(value);
    this.cache.set(key, ref);
    this.registry.register(value, key);
  }
  
  get(key) {
    return this.cache.get(key)?.deref();
  }
}
```

**Difficulty:** Expert

**Real-World Scenario:**
A large MERN app maintains an in-memory cache of parsed JSON responses. Using `WeakRef`, cached objects can be GC'd when memory pressure is high, and `FinalizationRegistry` removes the cache entry, preventing memory leaks while allowing opportunistic caching.

**Follow-Up Questions:**
- Why is the timing of WeakRef being undefined non-deterministic?
- How is WeakRef different from WeakMap?
- What are the dangers of over-relying on FinalizationRegistry for cleanup?

---

### Q70. What is the difference between `call`, `apply`, and `bind`?

**Answer:**
All three explicitly set the `this` context for a function.

```javascript
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const alice = { name: 'Alice' };
const bob = { name: 'Bob' };

// call — invoke immediately, args passed individually
greet.call(alice, 'Hello', '!');  // "Hello, Alice!"
greet.call(bob, 'Hi', '.');       // "Hi, Bob."

// apply — invoke immediately, args passed as array
greet.apply(alice, ['Hello', '!']); // "Hello, Alice!"
greet.apply(bob, ['Hi', '.']);      // "Hi, Bob."

// bind — returns a NEW function with `this` permanently bound
const greetAlice = greet.bind(alice);
greetAlice('Hello', '!');         // "Hello, Alice!"
greetAlice('Hey', '?');           // "Hey, Alice!"

// bind with partial application
const greetBobWithHello = greet.bind(bob, 'Hello');
greetBobWithHello('!'); // "Hello, Bob!"
greetBobWithHello('?'); // "Hello, Bob?"

// Practical: unbound class method
class Timer {
  constructor() {
    this.seconds = 0;
    // Without bind, 'this' inside tick is undefined in setTimeout
    this.tick = this.tick.bind(this);
    setInterval(this.tick, 1000);
  }
  tick() { this.seconds++; }
}

// Modern: arrow function class field (no bind needed)
class Timer2 {
  seconds = 0;
  tick = () => { this.seconds++; }; // Arrow — lexical 'this'
  constructor() { setInterval(this.tick, 1000); }
}

// apply use case: spread array as arguments (pre-spread operator)
const numbers = [1, 2, 3, 4, 5];
Math.max.apply(null, numbers); // 5
Math.max(...numbers);           // 5 (modern equivalent)
```

**Difficulty:** Intermediate

**Real-World Scenario:**
In React class components, `onClick={this.handleClick}` loses `this` because the callback is called without a receiver. Solutions: `bind` in constructor, arrow functions, or class field syntax.

**Follow-Up Questions:**
- Can you `bind` an already-bound function again?
- What is `Function.prototype.call.call`?
- How does `bind` work with `new`?

---

## 5. ES6+ Features

### Q71. What are ES6 arrow functions and how do they differ from regular functions?

**Answer:**

```javascript
// Regular function
function add(a, b) { return a + b; }
const add = function(a, b) { return a + b; };

// Arrow function
const add = (a, b) => a + b;
const double = x => x * 2;   // Single param — no parens needed
const getObj = () => ({ key: 'value' }); // Returning object — wrap in ()
const doWork = () => {        // Multi-line — explicit return
  const result = doSomething();
  return result;
};

// KEY DIFFERENCES:

// 1. this — arrow inherits lexically, regular function gets own this
class Counter {
  count = 0;
  
  // Regular function — 'this' is lost when used as callback
  startWithRegular() {
    setTimeout(function() {
      this.count++; // 'this' is undefined or window — BUG!
    }, 1000);
  }
  
  // Arrow function — 'this' is lexically bound to Counter instance
  startWithArrow() {
    setTimeout(() => {
      this.count++; // 'this' is the Counter instance — CORRECT!
    }, 1000);
  }
}

// 2. No 'arguments' object in arrow functions
function regular() {
  console.log(arguments); // Arguments object
}
const arrow = () => {
  // console.log(arguments); // ReferenceError!
  // Use rest params instead:
};
const arrowWithRest = (...args) => args;

// 3. Cannot be used as constructor
const Fn = () => {};
// new Fn(); // TypeError: Fn is not a constructor

// 4. No prototype property
(() => {}).prototype; // undefined
function fn() {}
fn.prototype; // {}

// 5. Cannot use yield — not valid generator functions
```

**Difficulty:** Beginner

**Real-World Scenario:**
React component event handlers always use arrow functions (or class field arrows) to maintain correct `this` binding:
```jsx
class Form extends React.Component {
  handleSubmit = (e) => {  // Arrow class field
    e.preventDefault();
    // 'this' is correctly the Form instance
    console.log(this.state);
  };
  render() {
    return <form onSubmit={this.handleSubmit}>{...}</form>;
  }
}
```

**Follow-Up Questions:**
- Why can't arrow functions be used as methods in objects that need dynamic `this`?
- How does babel transform arrow functions for older browsers?
- What is an IIFE arrow function?

---

### Q72. What are ES6 Classes and how do they compare to constructor functions?

**Answer:**
ES6 Classes are syntactic sugar over JavaScript's prototypal inheritance system.

```javascript
// ES5 Constructor function approach
function Animal(name, sound) {
  this.name = name;
  this.sound = sound;
}
Animal.prototype.speak = function() {
  return `${this.name} says ${this.sound}`;
};
Animal.create = function(name, sound) {
  return new Animal(name, sound);
};

function Dog(name) {
  Animal.call(this, name, 'Woof');
  this.tricks = [];
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.learn = function(trick) {
  this.tricks.push(trick);
};

// ES6 Class — cleaner syntax, same prototype behavior
class Animal {
  #secret = 'hidden'; // Private field (ES2022)
  
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }
  
  // Method on prototype
  speak() {
    return `${this.name} says ${this.sound}`;
  }
  
  // Static method
  static create(name, sound) {
    return new Animal(name, sound);
  }
  
  // Getters and setters
  get displayName() {
    return this.name.toUpperCase();
  }
  
  set displayName(value) {
    this.name = value.toLowerCase();
  }
}

class Dog extends Animal {
  #tricks = []; // Private field
  
  constructor(name) {
    super(name, 'Woof'); // Call parent constructor
    this.isGoodBoy = true;
  }
  
  learn(trick) {
    this.#tricks.push(trick);
    return this;
  }
  
  // Override parent method
  speak() {
    return `${super.speak()} (tail wagging)`;
  }
  
  get tricks() { return [...this.#tricks]; }
}

const rex = new Dog('Rex');
rex.speak();         // "Rex says Woof (tail wagging)"
rex.learn('sit').learn('shake'); // Method chaining
rex.displayName;     // 'REX'
rex instanceof Dog;  // true
rex instanceof Animal; // true
rex.#tricks;         // SyntaxError — private!
```

**Difficulty:** Intermediate

**Real-World Scenario:**
While React class components are less common with hooks, understanding classes is essential for extending React.Component, creating custom Error classes, and working with ORM models like Mongoose schemas.

**Follow-Up Questions:**
- What are private class fields and how do they work?
- Can you have a class without a constructor?
- What is the difference between static and instance methods?

---

### Q73. What are ES6 Modules (import/export)?

**Answer:**
ES6 Modules provide native module syntax for JavaScript, replacing older patterns like CommonJS (Node.js) and AMD.

```javascript
// ===== EXPORTING =====

// Named exports — multiple per file
export const API_URL = 'https://api.example.com';
export function fetchUser(id) { /* ... */ }
export class UserService { /* ... */ }

// Export list
const helper1 = () => {};
const helper2 = () => {};
export { helper1, helper2, helper1 as h1 }; // with alias

// Default export — one per file
export default function App() { /* React root component */ }
// or
const App = () => {};
export default App;

// Re-export
export { default as Button } from './Button';
export * from './utils';
export * as userUtils from './user-utils';

// ===== IMPORTING =====

// Named imports
import { fetchUser, UserService } from './userService';
import { fetchUser as getUser } from './userService'; // Alias

// Default import
import App from './App';
import React from 'react'; // Default export from react package

// Both
import React, { useState, useEffect } from 'react';

// Namespace import (all named exports as object)
import * as utils from './utils';
utils.formatDate(new Date());
utils.capitalize('hello');

// Side-effect only import (runs module, imports nothing)
import './polyfills';
import './styles.css';

// Dynamic import — code splitting
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

async function loadUtils() {
  const { formatDate } = await import('./dateUtils');
  return formatDate(new Date());
}

// ===== CommonJS vs ESM =====
// CommonJS (Node.js)
const fs = require('fs');
const { readFile } = require('fs');
module.exports = { helper1, helper2 };
module.exports.default = MyClass;

// ESM
import { readFile } from 'fs/promises';
export { helper1, helper2 };
export default MyClass;
```

**Key differences between CJS and ESM:**

| Feature | CommonJS | ESM |
|---------|----------|-----|
| Syntax | `require`/`module.exports` | `import`/`export` |
| Loading | Synchronous | Asynchronous |
| Structure | Dynamic | Static (analyzable) |
| Tree shaking | Not possible | Possible |
| Scope | Module scope | Module scope |
| Top-level await | No | Yes |
| File extension | `.js` (or `.cjs`) | `.mjs` (or `.js` in ESM package) |

**Difficulty:** Intermediate

**Real-World Scenario:**
Vite, webpack, and other bundlers use ESM's static structure for tree shaking — if you import only `{ useState }` from React, other exports are eliminated from the bundle. CommonJS `require` is evaluated at runtime, making this impossible.

**Follow-Up Questions:**
- What is tree shaking and how do ES modules enable it?
- How do you use ES modules in Node.js?
- What is the difference between `import()` (dynamic) and `import` (static)?

---

### Q74. What are optional chaining (`?.`) and nullish coalescing (`??`) operators?

**Answer:**

**Optional Chaining (`?.`)** — Access deeply nested properties without throwing if intermediate value is null/undefined:

```javascript
const user = {
  name: 'Alice',
  address: {
    city: 'NYC',
    zip: { code: '10001', plus4: null }
  },
  getProfile: () => ({ bio: 'Developer' })
};

// Without optional chaining — verbose and error-prone
const city = user && user.address && user.address.city;
const zip = user && user.address && user.address.zip && user.address.zip.code;

// With optional chaining
const city = user?.address?.city;           // 'NYC'
const zip = user?.address?.zip?.code;       // '10001'
const country = user?.address?.country;     // undefined (no error!)
const plus4 = user?.address?.zip?.plus4;    // null

// Optional method calls
const bio = user?.getProfile?.()?.bio;      // 'Developer'
const missing = user?.nonExistent?.();      // undefined (no error)

// Optional array access
const firstItem = arr?.[0];                 // undefined if arr is null/undefined
const thirdName = users?.[2]?.name;

// ===== NULLISH COALESCING (`??`) =====
// Returns right side only if left is null or undefined
// (NOT for other falsy values like 0, '', false)

const name = user?.name ?? 'Anonymous';     // 'Alice'
const missing = user?.email ?? 'N/A';       // 'N/A'

// Compare with OR operator
const count = 0;
count || 10;    // 10 — wrong! 0 is falsy, treats 0 as "no value"
count ?? 10;    // 0 — correct! 0 is a valid value

const isEnabled = false;
isEnabled || true;  // true — wrong!
isEnabled ?? true;  // false — correct!

// Nullish assignment (??=)
let settings = {};
settings.theme ??= 'light';    // Only assigns if null/undefined
settings.fontSize ??= 14;
settings.theme ??= 'dark';     // Ignored — already set to 'light'
console.log(settings); // { theme: 'light', fontSize: 14 }
```

**Difficulty:** Beginner

**Real-World Scenario:**
Accessing MongoDB document fields where optional sub-documents might not exist:
```javascript
const streetAddress = user?.address?.street ?? 'Address not provided';
const avatarUrl = user?.profile?.avatar?.url ?? '/default-avatar.png';
```

**Follow-Up Questions:**
- What is the `?.[]` syntax for optional bracket notation?
- What is the difference between `||=`, `&&=`, and `??=` logical assignment operators?
- Can you chain multiple `??` operators?

---

### Q75. What are `Promise.allSettled`, `Promise.any`, and `Promise.race`?

**Answer:**

```javascript
const p1 = fetch('/api/users').then(r => r.json());
const p2 = fetch('/api/posts').then(r => r.json());
const p3 = fetch('/api/broken-endpoint');

// Promise.all — fails fast if ANY promise rejects
try {
  const [users, posts] = await Promise.all([p1, p2]);
} catch (err) {
  // Fails if p1 OR p2 rejects
}

// Promise.allSettled — waits for ALL, never rejects
const results = await Promise.allSettled([p1, p2, p3]);
results.forEach(result => {
  if (result.status === 'fulfilled') {
    console.log('Success:', result.value);
  } else {
    console.error('Failed:', result.reason);
  }
});
// Always gets all results, handles partial failures

// Promise.race — resolves/rejects with FIRST to settle (success OR failure)
const timeout = new Promise((_, reject) => 
  setTimeout(() => reject(new Error('Timeout')), 5000)
);
try {
  const user = await Promise.race([fetchUser(1), timeout]);
} catch (err) {
  console.error('Either timed out or fetch failed');
}

// Promise.any — resolves with FIRST SUCCESS; rejects only if ALL fail
try {
  const fastestServer = await Promise.any([
    fetch('https://server1.com/data'),
    fetch('https://server2.com/data'),
    fetch('https://server3.com/data')
  ]);
  // Uses whichever server responds first successfully
} catch (error) {
  // AggregateError — all three servers failed
  console.error(error.errors); // Array of all rejection reasons
}
```

**Decision guide:**
- `Promise.all` — need ALL results, fail fast on any error
- `Promise.allSettled` — need ALL results, handle partial failures gracefully
- `Promise.race` — need the fastest (success or failure)
- `Promise.any` — need the fastest SUCCESS, tolerate some failures

**Difficulty:** Intermediate

**Real-World Scenario:**
Fetching user data from multiple microservices for a dashboard. `Promise.allSettled` allows showing available data (profile, stats) while gracefully handling a failed notification service — instead of failing the entire dashboard load.

**Follow-Up Questions:**
- What is AggregateError (thrown by Promise.any)?
- How would you implement a retry mechanism for failed promises?
- When would Promise.race be used over Promise.any?

---

### Q76. What are ES2020+ features you use regularly?

**Answer:**

```javascript
// ===== ES2020 =====

// BigInt — integers beyond Number.MAX_SAFE_INTEGER
const big = 9007199254740993n; // n suffix
const result = big + 1n;       // Must use BigInt operations

// globalThis — consistent global across environments
globalThis.fetch; // Works in browser, Node.js, Web Workers

// Promise.allSettled (see Q75)

// String.prototype.matchAll — all regex matches
const str = 'test1 test2 test3';
const matches = [...str.matchAll(/test(\d)/g)];
// [[match, capture], [match, capture], ...]

// ===== ES2021 =====

// String.prototype.replaceAll
'hello world hello'.replaceAll('hello', 'hi'); // 'hi world hi'

// Logical assignment
x ||= default;   // x = x || default
x &&= transform; // x = x && transform(x)
x ??= fallback;  // x = x ?? fallback

// Numeric separators
const million = 1_000_000; // More readable
const hex = 0xFF_00_FF;

// WeakRef and FinalizationRegistry (see Q69)

// ===== ES2022 =====

// Class fields and private
class Counter {
  count = 0;           // Public field
  #private = 'secret'; // Private field
  static instances = 0; // Static field
  
  #increment() { this.count++; } // Private method
  
  get value() { return this.count; }
}

// Top-level await (in ES modules)
// (async function() { ... }) no longer needed!
const data = await fetch('/api/data').then(r => r.json());

// Array.prototype.at()
const arr = [1, 2, 3, 4, 5];
arr.at(-1); // 5 (last element)
arr.at(-2); // 4

// Object.hasOwn() — safer than hasOwnProperty
Object.hasOwn(obj, 'key'); // Better than obj.hasOwnProperty('key')

// Error.cause
try { ... }
catch (err) {
  throw new Error('Failed to load user', { cause: err });
}

// ===== ES2023 =====

// Array non-mutating methods
arr.toSorted((a, b) => a - b); // Sorted copy
arr.toReversed();               // Reversed copy
arr.toSpliced(2, 1, 99);       // Spliced copy
arr.with(0, 99);                // Copy with replaced element
arr.findLast(x => x > 3);      // Find from end
arr.findLastIndex(x => x > 3); // findIndex from end

// Hashbang (#!) for Node.js scripts
#!/usr/bin/env node
```

**Difficulty:** Intermediate

**Real-World Scenario:**
React 18+ server components use top-level `await` in module scope for data fetching. `Array.at(-1)` simplifies getting the last item in arrays without `.length - 1` calculation. Private class fields ensure component internal state is truly encapsulated.

**Follow-Up Questions:**
- What is the difference between `#private` and underscore `_private` convention?
- When would you use BigInt in a MERN app?
- What is the TC39 proposal process?

---

### Q77. What is `Object.keys()`, `Object.values()`, and `Object.entries()` and when do you use each?

**Answer:**

```javascript
const user = {
  name: 'Alice',
  age: 30,
  role: 'admin',
  isActive: true
};

// Object.keys() — array of own enumerable keys
Object.keys(user); // ['name', 'age', 'role', 'isActive']

// Object.values() — array of own enumerable values
Object.values(user); // ['Alice', 30, 'admin', true]

// Object.entries() — array of [key, value] pairs
Object.entries(user); 
// [['name','Alice'], ['age',30], ['role','admin'], ['isActive',true]]

// ===== PRACTICAL USES =====

// Iterate over object properties
Object.entries(user).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

// Transform object values
const uppercased = Object.fromEntries(
  Object.entries(user).map(([k, v]) => [k, typeof v === 'string' ? v.toUpperCase() : v])
);

// Filter object properties
const filteredUser = Object.fromEntries(
  Object.entries(user).filter(([, v]) => v !== false && v !== null)
);

// Check all values satisfy a condition
const allStrings = Object.values(config).every(v => typeof v === 'string');

// Dynamic form validation
function validate(formData, rules) {
  return Object.entries(rules).reduce((errors, [field, rule]) => {
    const error = rule(formData[field]);
    return error ? { ...errors, [field]: error } : errors;
  }, {});
}

// Convert query string to object
const params = new URLSearchParams('?name=Alice&age=30');
const paramsObj = Object.fromEntries(params); // { name: 'Alice', age: '30' }
```

**Note:** These methods only return **own enumerable** properties. Inherited prototype properties are excluded. Compare with:
- `for...in` — iterates own AND inherited enumerable properties
- `Object.getOwnPropertyNames()` — own enumerable AND non-enumerable
- `Reflect.ownKeys()` — own enumerable, non-enumerable, AND symbol keys

**Difficulty:** Beginner

**Real-World Scenario:**
Dynamically building MongoDB `$set` update from user-submitted form data, filtering out undefined/null values before sending to API:
```javascript
const updateData = Object.fromEntries(
  Object.entries(formValues).filter(([, v]) => v != null && v !== '')
);
```

**Follow-Up Questions:**
- What is `Object.fromEntries()` and when was it added?
- How do `Object.keys()` and `for...in` differ?
- What is `Object.getOwnPropertyDescriptors()` used for?

---

### Q78. What is the difference between `for...of` and `for...in`?

**Answer:**

```javascript
// for...in — iterates over ENUMERABLE PROPERTY KEYS (strings)
// Works on any object, includes inherited properties
const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
  console.log(key); // 'a', 'b', 'c' (string keys)
}

// DANGER: for...in on arrays
const arr = [10, 20, 30];
arr.customProp = 'danger';
for (const key in arr) {
  console.log(key); // '0', '1', '2', 'customProp' — includes custom property!
}

// for...of — iterates over ITERABLE VALUES
// Works on Arrays, Strings, Maps, Sets, Generators, NodeLists
// Does NOT work on plain objects (not iterable by default)

for (const value of arr) {
  console.log(value); // 10, 20, 30 (no customProp!)
}

for (const char of 'hello') {
  console.log(char); // 'h', 'e', 'l', 'l', 'o'
}

const map = new Map([['a', 1], ['b', 2]]);
for (const [key, value] of map) {
  console.log(key, value); // 'a' 1, 'b' 2
}

const set = new Set([1, 2, 3, 2, 1]);
for (const value of set) {
  console.log(value); // 1, 2, 3 (deduplicated)
}

// for...of with Object.entries (iterate over object with for...of)
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`);
}

// for...await...of — async iteration
async function processStream(stream) {
  for await (const chunk of stream) {
    process.stdout.write(chunk);
  }
}
```

**Decision guide:**
- `for...of` — Iterate values: arrays, strings, maps, sets, iterables
- `for...in` — Iterate property keys: object introspection (but prefer `Object.keys()`)
- `forEach` — Functional iteration, can't break/continue/await
- `for` — When you need index control, break, continue, or performance-critical loops

**Difficulty:** Beginner

**Real-World Scenario:**
Processing a Node.js readable stream line by line. `for await...of` with an async generator is cleaner than nested event listeners:
```javascript
const { createReadStream } = require('fs');
const { createInterface } = require('readline');

async function processCSV(filePath) {
  const lines = createInterface({ input: createReadStream(filePath) });
  for await (const line of lines) {
    await processLine(line);
  }
}
```

**Follow-Up Questions:**
- What makes an object iterable (what is the iterable protocol)?
- How do you make a custom object iterable with `[Symbol.iterator]`?
- What is the difference between `forEach` and `for...of`?

---

### Q79. What are tagged template literals?

**Answer:**
A tagged template literal is a template literal preceded by a function name (the tag). The tag function processes the template's parts before producing the final string.

```javascript
// Tag function receives: (strings array, ...interpolated values)
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    return `${result}<mark>${value}</mark>${str}`;
  });
}

const name = 'Alice';
const role = 'Admin';
highlight`Welcome back, ${name}! Your role is ${role}.`;
// "Welcome back, <mark>Alice</mark>! Your role is <mark>Admin</mark>."

// sql tag — sanitize to prevent SQL injection
function sql(strings, ...values) {
  const sanitized = values.map(v => sanitize(v));
  return strings.reduce((q, s, i) => q + (sanitized[i-1] || '') + s);
}
const userId = "1; DROP TABLE users;--";
const query = sql`SELECT * FROM users WHERE id = ${userId}`;
// userId is sanitized before interpolation

// String.raw — raw string (backslashes not processed)
String.raw`Hello\nWorld`; // "Hello\nWorld" (literal \n, not newline)
String.raw`C:\Users\Alice`; // Works without escaping backslashes

// Real-world: styled-components
const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'white'};
  padding: 8px 16px;
  &:hover { background: darkblue; }
`;

// GraphQL queries
const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      name
      email
    }
  }
`;

// i18n translation
function i18n(strings, ...values) {
  const template = strings.join('{v}');
  const translated = translations[template] || strings.join('{v}');
  return values.reduce((str, val) => str.replace('{v}', val), translated);
}
```

**Difficulty:** Advanced

**Real-World Scenario:**
Apollo Client's `gql` tag parses GraphQL query strings at compile time into AST objects. `styled-components` uses tagged templates to parse CSS with embedded JavaScript expressions. Both are real-world applications of tagged templates.

**Follow-Up Questions:**
- How does `String.raw` work as a tag function?
- What is the `cooked` vs `raw` string difference in template literals?
- How would you build a simple SQL query builder using tagged templates?

---

### Q80. What is `Promise.resolve()` and when would you use it?

**Answer:**
`Promise.resolve(value)` returns a Promise that is resolved with the given value.

```javascript
// Returns fulfilled promise
Promise.resolve(42).then(v => console.log(v)); // 42

// If value is a Promise, returns it as-is (or assimilates thenables)
const p = Promise.resolve(fetch('/api/data')); // Same as the fetch promise

// Useful for normalizing values that might be sync or async
async function getUser(idOrUser) {
  // If it's already a user object, wrap in resolved promise
  // If it's an ID, fetch it
  return typeof idOrUser === 'object' 
    ? Promise.resolve(idOrUser)
    : fetchUser(idOrUser);
}

// Thenable assimilation
const thenable = {
  then(resolve) { resolve(42); }
};
await Promise.resolve(thenable); // 42

// Creating a "warm" cache — resolve ahead of time
const userCache = new Map();
function getCachedUser(id) {
  if (userCache.has(id)) {
    return Promise.resolve(userCache.get(id)); // Sync value in async wrapper
  }
  return fetchUser(id).then(user => {
    userCache.set(id, user);
    return user;
  });
}
// Callers always use `.then()` regardless of cache hit/miss

// Convert callback-based to promise (simple case)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
await delay(1000); // Wait 1 second

// Promise.reject
const rejected = Promise.reject(new Error('Failed'));
rejected.catch(err => console.error(err.message)); // 'Failed'
```

**Difficulty:** Intermediate

**Real-World Scenario:**
When building a caching layer for your Express API, `Promise.resolve()` lets cache-hit paths and cache-miss paths both return Promises, so the caller's code remains uniform without needing to check if the result is sync or async.

**Follow-Up Questions:**
- What is the difference between `new Promise(resolve => resolve(42))` and `Promise.resolve(42)`?
- What happens when you `await` a non-Promise value?
- What is a "thenable" and how does Promise assimilate thenables?

---

## 6. DOM & Browser APIs

### Q81. What is the difference between event bubbling and event capturing?

**Answer:**
When an event occurs on a DOM element, it propagates through the DOM tree in three phases:

1. **Capture Phase** — Event travels from `document` → target element (top-down)
2. **Target Phase** — Event reaches the target element
3. **Bubble Phase** — Event travels from target → `document` (bottom-up)

```html
<div id="outer">
  <div id="inner">
    <button id="btn">Click me</button>
  </div>
</div>
```

```javascript
// addEventListener(event, handler, useCapture)
// useCapture: false (default) = bubble phase
// useCapture: true = capture phase

document.getElementById('outer').addEventListener('click', 
  () => console.log('outer bubble'), false
);
document.getElementById('inner').addEventListener('click',
  () => console.log('inner bubble'), false
);
document.getElementById('btn').addEventListener('click',
  () => console.log('button'), false
);

// Click button → Output:
// "button" (target)
// "inner bubble"
// "outer bubble"

// With capture listener on outer:
document.getElementById('outer').addEventListener('click',
  () => console.log('outer CAPTURE'), true
);
// Click button → Output:
// "outer CAPTURE" (capture phase first)
// "button" (target)
// "inner bubble"
// "outer bubble"

// stopPropagation — prevent further propagation
document.getElementById('inner').addEventListener('click', (e) => {
  e.stopPropagation(); // Stops bubbling to outer
  console.log('inner');
});

// stopImmediatePropagation — also stops other listeners on same element
// preventDefault — prevent default browser action (form submit, link navigation)
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault(); // Don't submit form normally
  handleCustomSubmit();
});
```

**Event delegation (uses bubbling):**
```javascript
// Instead of adding listener to each <li>:
document.getElementById('list').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('Clicked:', e.target.textContent);
  }
  // e.target = element that triggered event
  // e.currentTarget = element with listener
});
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A React-rendered list of 1000 items — adding a click listener to each item is expensive. Event delegation with a single listener on the parent is performant. React's synthetic event system implements event delegation automatically at the root.

**Follow-Up Questions:**
- What is event delegation and how does it improve performance?
- What is the difference between `e.target` and `e.currentTarget`?
- Why did React 17 change event delegation from `document` to the React root?

---

### Q82. What is the Intersection Observer API?

**Answer:**
The Intersection Observer API asynchronously observes changes in the intersection of a target element with an ancestor element or the viewport. It's used for lazy loading, infinite scroll, and animations triggered on scroll.

```javascript
// Creating an observer
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Element entered the viewport
        entry.target.classList.add('visible');
        
        // Optional: stop observing after first intersection
        observer.unobserve(entry.target);
      }
    });
  },
  {
    root: null,          // null = viewport
    rootMargin: '0px',   // Extend/shrink effective viewport
    threshold: 0.1       // 10% of element must be visible
  }
);

// Observe elements
document.querySelectorAll('.lazy-image').forEach(img => {
  observer.observe(img);
});

// React hook for lazy loading
function useLazyLoad(ref) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
  
  return isVisible;
}

// Usage
function LazyImage({ src, alt }) {
  const ref = useRef(null);
  const isVisible = useLazyLoad(ref);
  
  return (
    <div ref={ref}>
      {isVisible && <img src={src} alt={alt} />}
    </div>
  );
}
```

**Difficulty:** Intermediate

**Real-World Scenario:**
An e-commerce product listing with 200 product images. Loading all immediately causes network congestion and slow initial load. Intersection Observer triggers image loads only when products enter the viewport — reducing initial payload by 90% and improving LCP.

**Follow-Up Questions:**
- How does `rootMargin` work for pre-loading before elements enter view?
- What is the `threshold` option and what happens with an array of thresholds?
- How would you implement infinite scroll with Intersection Observer in React?

---

### Q83. What is the MutationObserver API?

**Answer:**
MutationObserver watches for DOM changes (attributes, child nodes, character data) and fires a callback when observed mutations occur.

```javascript
const observer = new MutationObserver((mutations, observer) => {
  mutations.forEach(mutation => {
    switch (mutation.type) {
      case 'childList':
        console.log('Children added/removed:', mutation.addedNodes, mutation.removedNodes);
        break;
      case 'attributes':
        console.log(`Attribute "${mutation.attributeName}" changed`);
        console.log('Old value:', mutation.oldValue);
        break;
      case 'characterData':
        console.log('Text content changed');
        break;
    }
  });
});

// Configuration
observer.observe(document.getElementById('app'), {
  childList: true,      // Watch for children add/remove
  subtree: true,        // Watch all descendants
  attributes: true,     // Watch attribute changes
  attributeFilter: ['class', 'data-state'], // Only these attributes
  attributeOldValue: true, // Record old value
  characterData: true,  // Watch text content changes
  characterDataOldValue: true
});

// Stop observing
observer.disconnect();

// React example — watch for theme class changes on body
useEffect(() => {
  const observer = new MutationObserver(() => {
    const isDark = document.body.classList.contains('dark');
    setIsDarkMode(isDark);
  });
  
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
  });
  
  return () => observer.disconnect();
}, []);
```

**Difficulty:** Advanced

**Real-World Scenario:**
A third-party analytics SDK watches for DOM changes to detect when your React app renders specific components (like a checkout form) without needing framework-specific hooks. Accessibility tools use MutationObserver to update ARIA live regions when content changes dynamically.

**Follow-Up Questions:**
- How does MutationObserver differ from MutationEvents (deprecated)?
- What is ResizeObserver and how does it relate to MutationObserver?
- How would you debounce MutationObserver callbacks?

---

### Q84. What is the Web Storage API and the IndexedDB API?

**Answer:**

**Web Storage (localStorage/sessionStorage):**
- Key-value pairs, strings only, synchronous, ~5MB limit
- `localStorage` — persists until cleared
- `sessionStorage` — per tab, cleared on close

**IndexedDB:**
- Client-side database for large structured data
- Supports complex queries, transactions, and indexes
- Asynchronous, can store any serializable data
- Storage: hundreds of MB to GB

```javascript
// IndexedDB basics
const request = indexedDB.open('MyDatabase', 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  
  // Create object store (like a table)
  const store = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
  store.createIndex('email', 'email', { unique: true });
  store.createIndex('name', 'name', { unique: false });
};

request.onsuccess = (event) => {
  const db = event.target.result;
  
  // Add data
  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');
  store.add({ name: 'Alice', email: 'alice@example.com' });
  
  // Read data
  const readTx = db.transaction('users', 'readonly');
  const readStore = readTx.objectStore('users');
  const getAllRequest = readStore.getAll();
  getAllRequest.onsuccess = () => console.log(getAllRequest.result);
};

// Modern: use idb library (Promise-based wrapper)
import { openDB } from 'idb';

const db = await openDB('MyDatabase', 1, {
  upgrade(db) {
    const store = db.createObjectStore('users', { keyPath: 'id' });
    store.createIndex('email', 'email');
  }
});

await db.put('users', { id: 1, name: 'Alice', email: 'alice@example.com' });
const user = await db.get('users', 1);
const all = await db.getAll('users');
await db.delete('users', 1);
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A PWA (Progressive Web App) built with React that works offline. IndexedDB stores user's product wishlist and cart locally. When connectivity returns, a service worker syncs local changes to the MongoDB backend. Web Storage isn't suitable — the data exceeds 5MB and needs indexed queries.

**Follow-Up Questions:**
- What is the Cache API and how does it relate to service workers?
- What is the Origin Private File System (OPFS) API?
- How would you implement offline-first with IndexedDB in a React app?

---

### Q85. What is the Fetch API and how does it compare to XMLHttpRequest?

**Answer:**

```javascript
// XMLHttpRequest (XHR) — older, verbose
const xhr = new XMLHttpRequest();
xhr.open('POST', '/api/users');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
    }
  }
};
xhr.onerror = () => console.error('Network error');
xhr.send(JSON.stringify({ name: 'Alice' }));

// Fetch API — modern, Promise-based
const response = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ name: 'Alice' }),
  credentials: 'include', // Send cookies
  signal: controller.signal, // Abort signal
  cache: 'no-cache'
});

if (!response.ok) {
  throw new Error(`HTTP ${response.status}: ${response.statusText}`);
}
const user = await response.json();

// Reading different response types
response.json()         // Parse as JSON
response.text()         // Get as string
response.blob()         // Get as Blob (files, images)
response.arrayBuffer()  // Get as ArrayBuffer
response.formData()     // Get as FormData

// Abort fetch
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000); // Timeout

try {
  const res = await fetch('/api/slow-endpoint', { signal: controller.signal });
} catch (err) {
  if (err.name === 'AbortError') {
    console.log('Request timed out');
  }
}
```

**Fetch vs XHR:**

| Feature | Fetch | XHR |
|---------|-------|-----|
| Promises | Yes | No (callbacks) |
| Progress events | No | Yes |
| Abort | Yes (AbortController) | Yes |
| CORS | Yes | Yes |
| Service Workers | Yes | No |
| Error on 4xx/5xx | No (must check `ok`) | onError callback |
| Cookies | `credentials: 'include'` | `withCredentials` |

**Difficulty:** Intermediate

**Real-World Scenario:**
A React app's `useEffect` needs to fetch data but must handle component unmount (race condition). `AbortController` cancels in-flight requests when the component unmounts, preventing "Can't perform state update on unmounted component" warnings.

**Follow-Up Questions:**
- Why does fetch not reject on 4xx/5xx status codes?
- How do you handle upload progress with fetch?
- What is the difference between `credentials: 'include'` and `credentials: 'same-origin'`?

---

## 7. React Basics

### Q86. What is React and why was it created?

**Answer:**
React is an open-source JavaScript library created by Facebook (Meta) for building user interfaces. It was released in 2013 and open-sourced the same year.

**Why React was created:**
- Facebook's news feed had complex UI updates causing bugs — data changes weren't reflected consistently across the UI.
- Traditional MVC/two-way data binding led to unpredictable state management.
- React introduced a **one-way data flow** and **Virtual DOM** to make UI updates predictable.

**Core concepts:**
1. **Component-based** — UI built as reusable, composable components
2. **Declarative** — Describe what the UI should look like for each state, React handles DOM updates
3. **One-way data flow** — Data flows from parent to child via props
4. **Virtual DOM** — Efficient diffing algorithm for minimal real DOM updates
5. **JSX** — JavaScript syntax extension for writing HTML-like code

```jsx
// Declarative approach — describe WHAT, not HOW
function UserCard({ user, onDelete }) {
  return (
    <div className="card">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
}

// React handles:
// - Creating/updating DOM elements
// - Event binding
// - Efficient updates when user object changes
```

**Difficulty:** Beginner

**Real-World Scenario:**
Facebook's like button appears thousands of times on a page, in different contexts (posts, comments, shares). React's component model allows building a `<LikeButton>` once and reusing it everywhere — each instance manages its own state independently.

**Follow-Up Questions:**
- What are the alternatives to React and when would you choose them?
- What is the difference between React and React Native?
- What is the React Fiber architecture?

---

### Q87. What is JSX and how does it work?

**Answer:**
JSX (JavaScript XML) is a syntax extension for JavaScript that allows writing HTML-like code in JavaScript files. Babel or other compilers transform JSX into `React.createElement()` calls.

```jsx
// JSX
const element = (
  <div className="card" style={{ padding: '16px' }}>
    <h1>{title}</h1>
    <p>Hello, {user.name}!</p>
    {isLoggedIn && <button>Logout</button>}
  </div>
);

// Compiles to React.createElement() calls:
const element = React.createElement(
  'div',
  { className: 'card', style: { padding: '16px' } },
  React.createElement('h1', null, title),
  React.createElement('p', null, 'Hello, ', user.name, '!'),
  isLoggedIn && React.createElement('button', null, 'Logout')
);
```

**JSX Rules:**
```jsx
// 1. Return a single root element (or Fragment)
return (
  <>  {/* React.Fragment shorthand */}
    <h1>Title</h1>
    <p>Content</p>
  </>
);

// 2. Use className instead of class, htmlFor instead of for
<label htmlFor="email" className="label">Email</label>

// 3. Self-close empty elements
<img src="logo.png" alt="Logo" />
<input type="text" />
<br />

// 4. JavaScript expressions in curly braces
<p>{1 + 1}</p>            {/* 2 */}
<p>{condition ? 'yes' : 'no'}</p>
<p>{user?.name ?? 'Guest'}</p>

// 5. CamelCase for attributes
<div onClick={handleClick} onMouseEnter={handleHover} />
<input onChange={handleChange} />

// 6. style is an object
<div style={{ backgroundColor: '#fff', fontSize: '16px' }} />

// 7. Comments
{/* This is a JSX comment */}
```

**Difficulty:** Beginner

**Real-World Scenario:**
Without JSX, writing complex nested UI components in pure `React.createElement` calls becomes unreadable. JSX makes React code look intuitive to anyone familiar with HTML, while still being JavaScript — expressions, variables, and logic all work naturally.

**Follow-Up Questions:**
- Can you use React without JSX?
- What is a React Fragment and why use it?
- What is Babel and how does it transform JSX?

---

### Q88. What are React components and what are the two types?

**Answer:**
Components are the building blocks of React UIs — reusable, independent pieces of UI that accept inputs (props) and return JSX.

**1. Function Components (modern, preferred):**
```jsx
// Simple function component
function Button({ label, onClick, variant = 'primary' }) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// With hooks (state and lifecycle)
function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);
  
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```

**2. Class Components (legacy, but still common in older codebases):**
```jsx
class Counter extends React.Component {
  state = { count: this.props.initialCount || 0 };
  
  componentDidMount() {
    document.title = `Count: ${this.state.count}`;
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      document.title = `Count: ${this.state.count}`;
    }
  }
  
  increment = () => {
    this.setState(prev => ({ count: prev.count + 1 }));
  };
  
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}
```

**Comparison:**

| Feature | Function Component | Class Component |
|---------|-------------------|----------------|
| Syntax | Simple function | ES6 Class |
| State | `useState` hook | `this.state` |
| Lifecycle | Hooks (`useEffect`) | Methods |
| `this` | Not needed | Required |
| Boilerplate | Minimal | More verbose |
| Performance | Equal | Equal |
| React team recommendation | ✅ Preferred | Legacy |

**Difficulty:** Beginner

**Real-World Scenario:**
All new React development uses function components with hooks. However, many companies have legacy codebases with thousands of class components. A React developer needs to understand both to work in real projects and incrementally migrate class components to hooks.

**Follow-Up Questions:**
- What was the motivation for introducing hooks and moving away from class components?
- Can function components and class components coexist in the same app?
- What features can only be done in class components (none in React 16.8+)?

---

### Q89. What are props in React?

**Answer:**
Props (properties) are read-only inputs passed from parent to child components. They flow one-way — parent to child.

```jsx
// Parent passes props
function ParentComponent() {
  const user = { name: 'Alice', role: 'Admin' };
  
  return (
    <UserCard
      name={user.name}
      role={user.role}
      isActive={true}
      count={42}
      onClick={() => console.log('clicked')}
      theme={{ primary: '#3B82F6' }}
      children={<span>Extra content</span>}
    />
  );
}

// Child receives and uses props
function UserCard({ name, role, isActive, count, onClick, theme, children }) {
  return (
    <div 
      className={`card ${isActive ? 'active' : ''}`}
      style={{ borderColor: theme.primary }}
      onClick={onClick}
    >
      <h2>{name}</h2>
      <p>{role}</p>
      <span>Count: {count}</span>
      {children}
    </div>
  );
}

// Default props
function Button({ label, variant = 'primary', size = 'md', disabled = false }) {
  return (
    <button className={`btn btn-${variant} btn-${size}`} disabled={disabled}>
      {label}
    </button>
  );
}

// Prop types validation (runtime in development)
import PropTypes from 'prop-types';
Button.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  onClick: PropTypes.func
};

// TypeScript props (preferred in modern projects)
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  children?: React.ReactNode;
}

function Button({ label, variant = 'primary', onClick }: ButtonProps) {
  return <button className={`btn-${variant}`} onClick={onClick}>{label}</button>;
}
```

**Difficulty:** Beginner

**Real-World Scenario:**
A `<DataTable>` component accepts `columns`, `data`, `pagination`, `onSort`, and `onPageChange` props — making it completely reusable across your admin dashboard for users, products, orders, and any other data type without code duplication.

**Follow-Up Questions:**
- What is the difference between props and state?
- What are "prop drilling" and how do you avoid it?
- What is the `children` prop and how does it enable composition?

---

### Q90. What is state in React and how is it different from props?

**Answer:**
State is mutable data that a component manages internally. When state changes, React re-renders the component.

**State vs Props:**

| | State | Props |
|--|-------|-------|
| Who owns it | The component itself | Parent component |
| Mutability | Mutable (via setter) | Read-only (immutable) |
| Triggers re-render | Yes (when changed) | Yes (when parent re-renders) |
| Access | `this.state` / `useState` | `this.props` / function params |
| Default | Can set initial value | Set by parent |

```jsx
// Local state with useState
function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const addItem = (product) => {
    setItems(prev => [...prev, product]); // Always use functional update for prev state
  };
  
  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };
  
  const updateQuantity = (id, quantity) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };
  
  return (
    <div>
      {items.map(item => (
        <CartItem 
          key={item.id}
          item={item}            // Passing state DOWN as props
          onRemove={removeItem}  // Passing functions for child to call
          onUpdateQuantity={updateQuantity}
        />
      ))}
      <CartTotal items={items} />
    </div>
  );
}
```

**State update rules:**
```jsx
// ❌ Never mutate state directly
this.state.count++; // Wrong (class)
items.push(newItem); setItems(items); // Wrong (mutates array)

// ✅ Always create new values
setState({ count: this.state.count + 1 });
setItems([...items, newItem]);

// ✅ Use functional update when depending on previous state
setCount(prev => prev + 1); // Safe for batched updates
setItems(prev => [...prev, newItem]);
```

**Difficulty:** Beginner

**Real-World Scenario:**
A multi-step checkout form manages: current step, form data for each step, validation errors, and submission loading state — all as local state. The checkout progress bar receives `currentStep` as a prop from the parent `<Checkout>` component.

**Follow-Up Questions:**
- What is "lifting state up" and when do you do it?
- What is derived state vs. stored state?
- When should you use local state vs. global state (Redux/Context)?

---

### Q91. What is the `useState` hook?

**Answer:**
`useState` is the fundamental React hook for adding local state to function components.

```jsx
import { useState } from 'react';

// Basic usage
const [stateValue, setStateValue] = useState(initialValue);

// Examples
const [count, setCount] = useState(0);
const [user, setUser] = useState(null);
const [items, setItems] = useState([]);
const [settings, setSettings] = useState({ theme: 'light', fontSize: 14 });

// Lazy initialization — function is called only on first render
const [computedState, setComputedState] = useState(() => {
  return JSON.parse(localStorage.getItem('state')) ?? defaultState;
  // Expensive computation runs only once
});

// ===== UPDATE PATTERNS =====

// Simple update
setCount(5);
setUser({ name: 'Alice', email: 'alice@example.com' });

// Functional update (use when new state depends on previous)
setCount(prevCount => prevCount + 1);
setItems(prevItems => [...prevItems, newItem]);

// Object state update (must spread — useState doesn't merge like setState)
setSettings(prev => ({ ...prev, theme: 'dark' })); // Merge manually
// ❌ setSettings({ theme: 'dark' }) — this REPLACES entire settings!

// ===== COMPLETE EXAMPLE =====
function PasswordField() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState('weak');
  
  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setStrength(calculateStrength(value)); // Derived from input
  };
  
  return (
    <div>
      <input
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handleChange}
      />
      <button onClick={() => setShowPassword(show => !show)}>
        {showPassword ? 'Hide' : 'Show'}
      </button>
      <span className={`strength-${strength}`}>{strength}</span>
    </div>
  );
}
```

**Batching (React 18):**
```jsx
// React 18 automatically batches state updates even in async code
async function handleClick() {
  setCount(c => c + 1);  // These are batched in React 18
  setLoading(true);       // Only one re-render!
  
  await fetch('/api/data');
  
  setData(result);        // These are also batched
  setLoading(false);      // Only one re-render after async!
}
```

**Difficulty:** Beginner

**Real-World Scenario:**
A React form for editing a user profile. Each field uses `useState` for its value. On form submission, the collected state is sent to the Express API endpoint as a PATCH request to update MongoDB.

**Follow-Up Questions:**
- When should you use multiple `useState` calls vs. a single object state?
- What is the difference between `useState` with a value vs. a function?
- How does React determine if state has changed (object reference equality)?

---

### Q92. What is the `useEffect` hook?

**Answer:**
`useEffect` lets function components perform side effects — data fetching, subscriptions, DOM manipulation, timers, and more. It replaces class component lifecycle methods.

```jsx
useEffect(() => {
  // Side effect code (runs after render)
  
  return () => {
    // Cleanup function (runs before component unmounts OR before next effect)
  };
}, [dependency1, dependency2]); // Dependency array
```

**Dependency array behavior:**
```jsx
// No array — runs after EVERY render (usually wrong)
useEffect(() => { updateTitle(); });

// Empty array — runs ONCE after initial render (componentDidMount)
useEffect(() => {
  loadInitialData();
}, []);

// With dependencies — runs when any dep changes (componentDidUpdate equivalent)
useEffect(() => {
  fetchUserData(userId);
}, [userId]);
```

**Complete examples:**
```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Data fetching with cleanup
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    
    async function loadUser() {
      try {
        const data = await fetchUser(userId);
        if (!cancelled) {
          setUser(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) setLoading(false);
      }
    }
    
    loadUser();
    
    return () => { cancelled = true; }; // Cleanup: prevent state update after unmount
  }, [userId]);
  
  // Event listener with cleanup
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // Cleanup!
  }, []);
  
  // Timer with cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval); // Cleanup!
  }, []);
  
  // Document title
  useEffect(() => {
    if (user) document.title = `${user.name}'s Profile`;
    return () => { document.title = 'My App'; }; // Reset on unmount
  }, [user]);
  
  if (loading) return <Spinner />;
  return <div>{user?.name}</div>;
}
```

**Difficulty:** Beginner

**Real-World Scenario:**
A real-time dashboard subscribes to a WebSocket when it mounts. The `useEffect` cleanup disconnects the WebSocket when the component unmounts or when the `roomId` dependency changes (switching rooms). Without cleanup, old WebSocket connections accumulate.

**Follow-Up Questions:**
- What is the purpose of the return function in `useEffect`?
- What are "stale closures" in `useEffect` and how do you avoid them?
- What is the difference between `useEffect` and `useLayoutEffect`?

---

### Q93. What is the `useRef` hook?

**Answer:**
`useRef` returns a mutable ref object with a `.current` property. It persists between renders without causing re-renders when changed. Used for DOM access and storing mutable values.

```jsx
import { useRef, useEffect } from 'react';

// ===== USE CASE 1: Accessing DOM elements =====
function AutoFocusInput() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.focus(); // Direct DOM access
  }, []);
  
  return <input ref={inputRef} type="text" />;
}

// ===== USE CASE 2: Storing previous values =====
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(count);
  
  useEffect(() => {
    prevCountRef.current = count; // Update ref after render
  });
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}

// ===== USE CASE 3: Storing values that don't trigger re-render =====
function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null); // Store interval ID
  
  const start = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      // Do work
    }, 1000);
  };
  
  const stop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current); // Access ref value
  };
  
  useEffect(() => {
    return () => clearInterval(intervalRef.current); // Cleanup
  }, []);
  
  return (
    <div>
      {isRunning ? <button onClick={stop}>Stop</button> : <button onClick={start}>Start</button>}
    </div>
  );
}

// ===== USE CASE 4: forwardRef — expose ref to parent =====
const FancyInput = React.forwardRef((props, ref) => (
  <input 
    ref={ref}
    className="fancy-input"
    {...props}
  />
));

function Form() {
  const inputRef = useRef(null);
  return <FancyInput ref={inputRef} onFocus={() => inputRef.current.select()} />;
}
```

**Difference between `useRef` and `createRef`:**
- `createRef` creates a new ref object on every render (for class components)
- `useRef` returns the same ref object on every render (for function components)

**Difficulty:** Intermediate

**Real-World Scenario:**
A WYSIWYG editor needs direct DOM access for cursor position, selection, and content. `useRef` gives access to the `<div contentEditable>` DOM element while React handles the surrounding UI. In a video player component, refs control native `play()`/`pause()` methods on the `<video>` element.

**Follow-Up Questions:**
- What is `React.forwardRef` and when do you need it?
- What is `useImperativeHandle` and when would you use it?
- Can you use `useRef` to trigger re-renders?

---

### Q94. What is the `useContext` hook?

**Answer:**
`useContext` allows reading and subscribing to a React context — a way to share data between components without prop drilling.

```jsx
// 1. Create Context
const ThemeContext = React.createContext(null);
const UserContext = React.createContext({ user: null, setUser: () => {} });

// 2. Provide Context (wrap the tree)
function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Layout />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

// 3. Consume Context (anywhere in the tree)
function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  
  return (
    <nav className={`nav-${theme}`}>
      <span>Hello, {user?.name ?? 'Guest'}</span>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </nav>
  );
}

// 4. Custom hook pattern (best practice)
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
}

// 5. Combined Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') ?? 'light'
  );
  
  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return next;
    });
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

**When to use Context vs Redux:**
- **Context:** User preferences, theme, current user, locale — non-frequently-changing global data
- **Redux:** Complex state logic, frequent updates, time-travel debugging, shared across many components

**Difficulty:** Intermediate

**Real-World Scenario:**
Authentication state (current user, roles, permissions) is used throughout a React app — navbar, sidebar, routes, API calls. Instead of drilling `user` prop through 10 levels of components, `AuthContext` provides it to any component that needs it.

**Follow-Up Questions:**
- What causes unnecessary re-renders with Context and how do you prevent them?
- What is the difference between Context and React Redux's `useSelector`?
- How do you prevent context consumers from re-rendering when unrelated context values change?

---

### Q95. What is the key prop in React and why is it important?

**Answer:**
The `key` prop is a special prop that helps React identify which items in a list have changed, been added, or been removed. It enables efficient reconciliation.

```jsx
// ❌ No key — React warns, may cause bugs
{items.map(item => <ListItem item={item} />)}

// ❌ Index as key — problematic when list order changes
{items.map((item, index) => <ListItem key={index} item={item} />)}

// ✅ Stable, unique key (database ID)
{items.map(item => <ListItem key={item.id} item={item} />)}

// Why index keys are problematic:
const [list, setList] = useState([
  { id: 1, text: 'First' },
  { id: 2, text: 'Second' },
  { id: 3, text: 'Third' }
]);

// Remove first item (index keys):
// React thinks: item at index 0 changed, item at index 1 changed
// Instead of: item at index 0 removed, rest shifted
// Result: wrong animations, lost input state, bug-prone

// With ID keys:
// React thinks: item 1 removed, items 2 and 3 unchanged
// Result: only item 1 unmounts, others correctly preserved
```

**Key as reset mechanism:**
```jsx
// Force component to reset by changing its key
function UserProfile({ userId }) {
  // When userId changes, React unmounts and remounts the component
  // Effectively "resetting" all state
  return <ProfileForm key={userId} userId={userId} />;
}
```

**Rules for keys:**
1. Must be **unique among siblings** (not globally)
2. Should be **stable** (same across re-renders)
3. Should be **from data** (not array index or random values)
4. Never use `Math.random()` as key — creates new key on every render

**Difficulty:** Beginner

**Real-World Scenario:**
A to-do list where users can delete items and have input fields inside list items. With index keys, deleting item #1 shifts remaining items' keys, causing React to incorrectly reuse DOM nodes — input values from deleted items appear in remaining items. ID-based keys fix this entirely.

**Follow-Up Questions:**
- What happens internally when React sees a list item's key change?
- Can you use key on non-list elements? What does it do?
- What is the performance impact of using unstable keys?

---

### Q96. What is conditional rendering in React?

**Answer:**
Conditional rendering means showing different UI based on conditions, just like conditional statements in JavaScript.

```jsx
function UserStatus({ user, isLoading, error }) {
  // ===== Method 1: if/else =====
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return null; // Render nothing
  
  // ===== Method 2: Ternary =====
  return (
    <div>
      {user.isAdmin ? <AdminPanel /> : <UserPanel />}
    </div>
  );
  
  // ===== Method 3: && (short-circuit) =====
  return (
    <div>
      {user.isVerified && <VerifiedBadge />}
      {/* CAREFUL: avoid 0 && <Component /> — renders "0" */}
      {count > 0 && <Badge count={count} />} {/* Safe — boolean */}
      {count !== 0 && <Badge count={count} />} {/* Also safe */}
    </div>
  );
  
  // ===== Method 4: Switch/Object map =====
  const views = {
    loading: <Spinner />,
    error: <ErrorMessage />,
    success: <SuccessView data={data} />,
    empty: <EmptyState />
  };
  return views[status] || null;
}

// ===== Complex conditional with early returns =====
function ProductCard({ product }) {
  if (!product) return null;
  
  const { name, price, image, isDiscounted, discountPercent, inStock } = product;
  
  return (
    <div className={`card ${!inStock ? 'card--out-of-stock' : ''}`}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <div className="price">
        {isDiscounted ? (
          <>
            <span className="original">${price}</span>
            <span className="discounted">${(price * (1 - discountPercent / 100)).toFixed(2)}</span>
          </>
        ) : (
          <span>${price}</span>
        )}
      </div>
      {!inStock && <span className="badge">Out of Stock</span>}
      {inStock && <button>Add to Cart</button>}
    </div>
  );
}
```

**Difficulty:** Beginner

**Real-World Scenario:**
A dashboard page shows different states: skeleton loading UI while fetching, error state with retry button if the API fails, empty state with a call-to-action if no data exists, and the actual data view when successful. Each state is a distinct UI branch.

**Follow-Up Questions:**
- What is the issue with using `0` (zero) in `&&` conditional rendering?
- How do you render nothing in React?
- When would you extract conditional rendering into a dedicated component?

---

### Q97. How do you handle lists in React?

**Answer:**
Lists in React are rendered by mapping over arrays and returning JSX elements. Each element requires a unique `key` prop.

```jsx
// Basic list rendering
function ProductList({ products }) {
  return (
    <ul className="product-list">
      {products.map(product => (
        <li key={product.id} className="product-item">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </li>
      ))}
    </ul>
  );
}

// List with empty state
function UserList({ users, isLoading }) {
  if (isLoading) return <Skeleton count={5} />;
  
  if (users.length === 0) {
    return (
      <div className="empty-state">
        <h3>No users found</h3>
        <button>Add First User</button>
      </div>
    );
  }
  
  return (
    <div className="user-grid">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

// Nested lists
function CategoryList({ categories }) {
  return (
    <nav>
      {categories.map(category => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <ul>
            {category.items.map(item => (
              <li key={item.id}> {/* Key unique within parent, not globally */}
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

// Virtual lists for large datasets
import { FixedSizeList } from 'react-window';

function VirtualProductList({ products }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ProductCard product={products[index]} />
    </div>
  );
  
  return (
    <FixedSizeList
      height={600}
      width="100%"
      itemCount={products.length}
      itemSize={120}
    >
      {Row}
    </FixedSizeList>
  );
}
```

**Difficulty:** Beginner

**Real-World Scenario:**
An admin panel displays a table of 500 orders. Rendering all 500 DOM nodes immediately causes poor performance. Using `react-window` (virtual list) renders only ~20 visible rows, recycling DOM nodes as the user scrolls — maintaining 60fps.

**Follow-Up Questions:**
- When should you use virtualization (react-window, react-virtual) for lists?
- How does React handle list re-ordering with keys vs without keys?
- What is pagination vs. infinite scroll and when is each appropriate?

---

### Q98. What is React's one-way data flow?

**Answer:**
React enforces unidirectional data flow — data flows in one direction: parent → child via props. Children communicate back to parents via callback functions passed as props.

```jsx
// Data flows DOWN through props
// Events flow UP through callbacks

function ShoppingApp() {
  const [cart, setCart] = useState([]);   // State lives at top
  
  // Functions to modify state are passed DOWN as props
  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };
  
  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(p => p.id !== productId));
  };
  
  return (
    <>
      {/* cart data flows DOWN */}
      <CartSummary cart={cart} itemCount={cart.length} />
      
      {/* removeFromCart function flows DOWN */}
      <CartItems cart={cart} onRemove={removeFromCart} />
      
      {/* addToCart function flows DOWN */}
      <ProductCatalog onAddToCart={addToCart} />
    </>
  );
}

function ProductCatalog({ onAddToCart }) {
  // Can only call the callback — cannot directly modify parent's cart
  return (
    <div>
      {products.map(product => (
        <button key={product.id} onClick={() => onAddToCart(product)}>
          Add {product.name}
        </button>
      ))}
    </div>
  );
}
```

**Why one-way data flow?**
1. **Predictability** — State changes are traceable to specific events
2. **Debugging** — DevTools shows exactly which component owns state
3. **No synchronization bugs** — Two-way binding can cause infinite loops
4. **Time-travel debugging** — React DevTools can replay state changes

**Difficulty:** Beginner

**Real-World Scenario:**
In a form wizard with multiple steps, the parent component owns `formData` state. Each step receives `formData` as props and calls `onUpdate(changes)` to inform the parent. The parent merges changes and passes updated `formData` back down — clean, traceable flow with no mutation of shared state.

**Follow-Up Questions:**
- What is "lifting state up" and when do you need to do it?
- How does Redux fit into React's one-way data flow?
- What is the difference between controlled and uncontrolled components?

---

### Q99. What is the difference between controlled and uncontrolled components?

**Answer:**

**Controlled components** — React is the "single source of truth". Form element's value is controlled by React state.

**Uncontrolled components** — Form element maintains its own state in the DOM. React accesses it via refs when needed.

```jsx
// ===== CONTROLLED =====
function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    submitUser({ name, email }); // Values from React state
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}              // React controls the value
        onChange={e => setName(e.target.value)} // React updates state
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// ===== UNCONTROLLED =====
function UncontrolledForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    submitUser({
      name: nameRef.current.value,    // Read from DOM via ref
      email: emailRef.current.value
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={nameRef} defaultValue="Alice" />
      <input type="email" ref={emailRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Comparison:**

| Feature | Controlled | Uncontrolled |
|---------|-----------|--------------|
| Value source | React state | DOM |
| Validation | Each keystroke | On submit |
| Conditional disable | Easy | Harder |
| Dynamic default | Easy | `defaultValue` |
| File inputs | N/A | Must be uncontrolled |
| Performance | Renders on each keystroke | No extra renders |
| React preference | Recommended | For simple cases |

**Difficulty:** Intermediate

**Real-World Scenario:**
A complex form with real-time validation feedback (password strength, username availability check) requires controlled components — you need the value on every keystroke. A simple file upload widget where you only need the file on submit can use an uncontrolled input with a ref.

**Follow-Up Questions:**
- Why is the `<input type="file">` always uncontrolled in React?
- How does React Hook Form handle forms efficiently without full controlled inputs?
- What is the difference between `value` and `defaultValue` in form elements?

---

### Q100. What are React events and how do synthetic events work?

**Answer:**
React wraps native browser events in **SyntheticEvent** — a cross-browser wrapper that normalizes event behavior across browsers.

```jsx
function InteractiveComponent() {
  // SyntheticEvent — works identically in all browsers
  const handleClick = (e) => {
    e.preventDefault();          // Prevent default (native + react)
    e.stopPropagation();         // Stop bubbling (native + react)
    console.log(e.type);         // 'click'
    console.log(e.target);       // The DOM element
    console.log(e.currentTarget); // Element with handler
    console.log(e.nativeEvent);  // The original native event
  };
  
  const handleChange = (e) => {
    console.log(e.target.value);  // Input value
    console.log(e.target.name);   // Input name attribute
    console.log(e.target.checked); // Checkbox state
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
    if (e.key === 'Escape') handleCancel();
    console.log(e.keyCode, e.ctrlKey, e.shiftKey); // Modifiers
  };
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    // Process form data
  };
  
  // Common React events
  return (
    <div>
      <div onClick={handleClick} onDoubleClick={...} onContextMenu={...} />
      <input 
        onChange={handleChange} 
        onKeyDown={handleKeyDown}
        onFocus={...}
        onBlur={...}
      />
      <form onSubmit={handleSubmit} />
      <img onLoad={...} onError={...} />
      <video onPlay={...} onPause={...} onTimeUpdate={...} />
      <div 
        onMouseEnter={...} 
        onMouseLeave={...}
        onMouseMove={...}
        onDragStart={...}
        onDrop={...}
      />
    </div>
  );
}
```

**React 17 change:** React moved event delegation from `document` to the React root element, fixing issues when embedding React in non-React apps.

**Note:** SyntheticEvents are **pooled** (pre-React 17) — the event object is nullified after the handler runs. In React 17+, event pooling was removed.

**Difficulty:** Beginner

**Real-World Scenario:**
Building a keyboard-accessible dropdown. `onKeyDown` on the trigger toggles open/close with Enter/Space, handles arrow keys for option navigation, and closes on Escape — all via React's synthetic event system, working consistently across browsers including older Edge and Safari.

**Follow-Up Questions:**
- What is event pooling and was it removed?
- How do you access an event asynchronously in React?
- What is the difference between `onFocus`/`onBlur` and `onfocusin`/`onfocusout`?

---

## 8. React Intermediate

### Q101. What are React hooks and what are the rules of hooks?

**Answer:**
Hooks are functions that let you "hook into" React state and lifecycle features from function components. Introduced in React 16.8.

**Built-in hooks:**
```
State:        useState, useReducer
Effect:       useEffect, useLayoutEffect, useInsertionEffect
Context:      useContext
Ref:          useRef, useImperativeHandle
Performance:  useMemo, useCallback
Misc:         useId, useDebugValue, useSyncExternalStore, useDeferredValue, useTransition
```

**Rules of Hooks (enforced by ESLint plugin):**

**Rule 1: Only call hooks at the TOP LEVEL**
```jsx
// ❌ WRONG — conditional hook
function BadComponent({ isLoggedIn }) {
  if (isLoggedIn) {
    const [user, setUser] = useState(null); // Breaks hook order!
  }
}

// ✅ CORRECT — always call hooks at top level
function GoodComponent({ isLoggedIn }) {
  const [user, setUser] = useState(null); // Always called
  
  if (!isLoggedIn) return <LoginPage />;
  return <Dashboard user={user} />;
}
```

**Rule 2: Only call hooks in REACT FUNCTIONS**
```jsx
// ❌ WRONG — hook in regular function
function formatUser() {
  const [count, setCount] = useState(0); // Illegal!
}

// ✅ CORRECT — hook in React component or custom hook
function useUserFormat() { // Custom hook — name starts with "use"
  const [count, setCount] = useState(0);
  return count;
}
```

**Why these rules?**
React relies on the order of hook calls to associate state with the correct hook instance. If hooks are called conditionally, the order changes between renders, breaking React's internal state tracking.

**Difficulty:** Beginner

**Real-World Scenario:**
ESLint's `eslint-plugin-react-hooks` is standard in all React projects. It catches violations at development time — preventing bugs like calling `useState` inside a `try/catch` or loop that would corrupt React's hook order tracking.

**Follow-Up Questions:**
- Why does the order of hooks matter to React?
- What is the `eslint-plugin-react-hooks` and which rules does it enforce?
- Can you call hooks in class components?

---

### Q102. What is `useMemo` and when should you use it?

**Answer:**
`useMemo` memoizes the result of an expensive computation, recalculating it only when its dependencies change.

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

```jsx
// ===== WHEN TO USE useMemo =====

// 1. Expensive computations
function DataDashboard({ orders }) {
  // Recalculates only when `orders` changes (not on every render)
  const analytics = useMemo(() => {
    return {
      totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
      avgOrderValue: orders.reduce((sum, o) => sum + o.total, 0) / orders.length,
      topProducts: orders
        .flatMap(o => o.items)
        .reduce((acc, item) => {
          acc[item.id] = (acc[item.id] || 0) + item.quantity;
          return acc;
        }, {}),
      // ... complex aggregations
    };
  }, [orders]);
  
  return <Charts data={analytics} />;
}

// 2. Stable object/array reference for downstream memoized components
function ProductFilter({ products, filters }) {
  const filteredProducts = useMemo(() => 
    products.filter(p => 
      p.price >= filters.minPrice && 
      p.price <= filters.maxPrice &&
      (filters.category === 'all' || p.category === filters.category)
    ),
    [products, filters.minPrice, filters.maxPrice, filters.category]
  );
  
  return <ProductList products={filteredProducts} />;
}

// ===== WHEN NOT TO USE useMemo =====

// ❌ Simple calculations — overhead of useMemo > benefit
const doubled = useMemo(() => count * 2, [count]); // Just do count * 2!

// ❌ Every component by default — premature optimization
const name = useMemo(() => props.user.name, [props.user.name]); // Unnecessary
```

**`useMemo` vs `useCallback`:**
- `useMemo` — memoizes the **computed value** (result of the function)
- `useCallback` — memoizes the **function itself** (reference)

```jsx
// These are equivalent:
const memoFn = useCallback(fn, deps);
const memoFn = useMemo(() => fn, deps);
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A financial analytics dashboard recalculates complex statistics (percentiles, trend lines, aggregations) for a dataset of 100,000 records. Without `useMemo`, every state update (like switching tabs) re-runs all calculations. With `useMemo`, only data changes trigger recalculations.

**Follow-Up Questions:**
- What is the overhead of `useMemo` itself and when does it become counterproductive?
- How does React's automatic memoization (React Compiler/Forget) change the need for `useMemo`?
- What is `useCallback` and how does it differ from `useMemo`?

---

### Q103. What is `useCallback` and when should you use it?

**Answer:**
`useCallback` memoizes a function reference, returning the same function instance between renders as long as its dependencies don't change.

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

**Why it matters:**
```jsx
// Without useCallback — new function reference on every render
function Parent({ userId }) {
  // This creates a new function reference every time Parent renders!
  const handleDelete = () => {
    deleteUser(userId);
  };
  
  return <ExpensiveChild onDelete={handleDelete} />; // Re-renders every time!
}

// With useCallback — stable function reference
function Parent({ userId }) {
  const handleDelete = useCallback(() => {
    deleteUser(userId);
  }, [userId]); // Only changes when userId changes
  
  return <ExpensiveChild onDelete={handleDelete} />; // Only re-renders when needed
}

// Must pair with React.memo on the child
const ExpensiveChild = React.memo(({ onDelete }) => {
  console.log('Expensive child rendered');
  return <button onClick={onDelete}>Delete</button>;
});
```

**Event handlers with useCallback:**
```jsx
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  
  // Without useCallback: new function every render → debounce resets
  const debouncedSearch = useCallback(
    debounce((q) => onSearch(q), 300),
    [onSearch]
  );
  
  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        debouncedSearch(e.target.value);
      }}
    />
  );
}
```

**Common mistakes:**
```jsx
// ❌ useCallback on inline JSX functions (no benefit — still new element)
<button onClick={useCallback(() => doSomething(), [])} />

// ❌ Forgetting dependencies
const handler = useCallback(() => doSomething(count), []); // Stale closure!
const handler = useCallback(() => doSomething(count), [count]); // Correct

// ❌ useCallback on everything — adds overhead, often premature optimization
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A large data grid with 100 rows, each having an edit button. Without `useCallback`, every render of the parent creates 100 new function references, causing all 100 memoized row components to re-render. With `useCallback` and `React.memo`, only the changed row re-renders.

**Follow-Up Questions:**
- When does `useCallback` not help (even if the function reference stays the same)?
- What is the relationship between `useCallback`, `React.memo`, and `useMemo`?
- What is the React Forget/Compiler project and how does it make `useCallback` obsolete?

---

### Q104. What is `useReducer` and when should you use it over `useState`?

**Answer:**
`useReducer` is an alternative to `useState` for complex state logic. It uses a reducer pattern: `(state, action) => newState`.

```jsx
// Simple useState becomes complex:
function OrderForm() {
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  
  // Many inter-related state updates...
}

// useReducer — clean for complex state
const initialState = {
  items: [],
  discount: null,
  isSubmitting: false,
  error: null,
  step: 1,
  total: 0
};

function orderReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const items = [...state.items, action.payload];
      return { ...state, items, total: calculateTotal(items, state.discount) };
    
    case 'REMOVE_ITEM':
      const filtered = state.items.filter(i => i.id !== action.payload);
      return { ...state, items: filtered, total: calculateTotal(filtered, state.discount) };
    
    case 'APPLY_DISCOUNT':
      return { ...state, discount: action.payload, total: calculateTotal(state.items, action.payload) };
    
    case 'SET_STEP':
      return { ...state, step: action.payload };
    
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true, error: null };
    
    case 'SUBMIT_SUCCESS':
      return { ...initialState }; // Reset to initial state
    
    case 'SUBMIT_ERROR':
      return { ...state, isSubmitting: false, error: action.payload };
    
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function OrderForm() {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  
  return (
    <div>
      <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: item })}>
        Add Item
      </button>
      <button onClick={() => dispatch({ type: 'APPLY_DISCOUNT', payload: 0.1 })}>
        Apply 10% Discount
      </button>
      <span>Total: ${state.total}</span>
    </div>
  );
}
```

**useState vs useReducer:**
- `useState` — Simple values, independent state variables
- `useReducer` — Complex state objects, state transitions depending on previous state, multiple sub-values updated together

**Difficulty:** Intermediate

**Real-World Scenario:**
A multi-step form wizard with validation, navigation, and submission. `useReducer` ensures state transitions are predictable — "NEXT_STEP" checks validation before advancing, "SUBMIT_SUCCESS" resets the entire form, and all related state updates happen atomically.

**Follow-Up Questions:**
- How do you share a reducer between components without Redux?
- What is the Context + useReducer pattern and how does it compare to Redux?
- How do you write tests for pure reducers?

---

### Q105. What are custom hooks in React?

**Answer:**
Custom hooks are functions that start with `use` and can call other hooks. They allow extracting and reusing stateful logic between components.

```jsx
// ===== CUSTOM HOOKS =====

// 1. useFetch — data fetching with loading/error states
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => { if (!cancelled) { setData(data); setLoading(false); } })
      .catch(err => { if (!cancelled) { setError(err.message); setLoading(false); } });
    
    return () => { cancelled = true; };
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function ProductPage({ productId }) {
  const { data: product, loading, error } = useFetch(`/api/products/${productId}`);
  if (loading) return <Skeleton />;
  if (error) return <Error message={error} />;
  return <ProductDetail product={product} />;
}

// 2. useLocalStorage — persisted state
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });
  
  const setValue = useCallback((value) => {
    try {
      const v = value instanceof Function ? value(storedValue) : value;
      setStoredValue(v);
      localStorage.setItem(key, JSON.stringify(v));
    } catch (error) { console.error(error); }
  }, [key, storedValue]);
  
  return [storedValue, setValue];
}

// 3. useDebounce — debounced value
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}

// 4. useWindowSize — responsive values
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}

// 5. useOnClickOutside — close dropdown/modal
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler(e);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A company's React codebase has 20 components each fetching data with identical loading/error state logic. Extracting to a `useFetch` custom hook eliminates 400+ lines of duplicate code, and adding features like caching or retry logic requires changes in one place.

**Follow-Up Questions:**
- What is the naming convention for custom hooks?
- Can custom hooks have state?
- What are the popular custom hook libraries (react-use, ahooks)?

---

## 9. Advanced React

### Q106. What is React's reconciliation algorithm?

**Answer:**
Reconciliation is the algorithm React uses to determine what changes to make to the DOM by diffing the new React element tree against the previous one.

**Key heuristics:**

**1. Elements of different types produce different trees:**
```jsx
// React unmounts the entire tree and builds new one
// Old:
<div><Counter /></div>
// New:
<span><Counter /></span>
// Counter unmounts and remounts with fresh state!
```

**2. Same type — update existing element's attributes:**
```jsx
// Old:
<div className="before" style={{ color: 'red' }} />
// New:
<div className="after" style={{ color: 'green' }} />
// React only updates className and style — doesn't recreate the div
```

**3. Keys optimize list reconciliation:**
```jsx
// Without keys — React diffs by position:
// Old: [A, B, C], New: [D, A, B, C]
// React thinks: position 0 changed A→D, position 1 changed B→A, etc.
// Updates ALL items (expensive)

// With keys — React diffs by key identity:
// Old: [key=A, key=B, key=C], New:
Claude couldn't finish this response. Try again in a moment.

You are out of free messages until 2:50 AM
Claude Fable 5 is currently unavailable.
Learn more(opens in new tab)




