# Vikram Bahad — Personal Portfolio Website

A responsive personal portfolio website for **Vikram Bahad**, designed to present profile information, technical skills, projects, certificates, and contact details in a modern web interface.

---

## 1. Project Overview

This project is built using:

- **HTML5** — website structure and content
- **CSS3** — responsive layout, animations, cards, navigation, and visual styling
- **JavaScript** — interactions, filtering, animations, certificate preview, contact handling, mobile menu, and active navigation
- **MySQL** — optional database schema for future backend integration
- **GitHub Pages** — static website hosting

### Main sections

1. Home
2. About
3. Skills
4. Projects
5. Certificates
6. Contact

---

## 2. Project Folder Structure

```text
My-portfolio/
│
├── index.html
├── style.css
├── script.js
├── database.sql
├── README.md
├── LICENSE
├── .nojekyll
│
└── assets/
    ├── 17230.jpg
    ├── 17232.jpg
    └── 17261.jpg
```

### Important

`index.html` loads the CSS and JavaScript from the repository root:

```html
<link rel="stylesheet" href="./style.css">
<script src="./script.js"></script>
```

Therefore, **do not move `style.css` into a `css` folder or `script.js` into a `js` folder** unless the paths in `index.html` are changed accordingly.

---

# 3. System Flow / Working

```text
User opens website
       │
       ▼
    index.html
       │
       ├──────────────► style.css
       │                  │
       │                  └── Layout + Responsive Design
       │
       └──────────────► script.js
                          │
                          ├── Mobile Menu
                          ├── Dynamic / Static Mode
                          ├── Scroll Reveal
                          ├── Skill Animation
                          ├── Project Filter
                          ├── Certificate Modal
                          ├── Contact Mailto
                          └── Active Navigation
```

---

# 4. HTML Algorithm

## Algorithm: Load Portfolio Page

**Input:** User opens `index.html`

**Output:** Complete portfolio webpage

### Steps

1. Start.
2. Browser reads `index.html`.
3. Browser loads `style.css`.
4. Browser loads the portfolio structure and content.
5. Browser loads certificate images from `assets/`.
6. Browser loads `script.js`.
7. JavaScript attaches event listeners.
8. Portfolio sections become interactive.
9. Display the website.
10. Stop.

### Pseudocode

```text
START

Open index.html

Load style.css
Load HTML content
Load assets
Load script.js

Initialize:
    navigation
    mobile menu
    animations
    skills
    project filters
    certificates
    contact form

Display portfolio

END
```

---

# 5. CSS Algorithm

CSS controls the visual appearance and responsive behavior.

## Algorithm: Responsive Layout

**Input:** Screen width

**Output:** Suitable layout for the device

### Steps

1. Read viewport width.
2. Apply default desktop layout.
3. If viewport becomes smaller, activate media-query rules.
4. Reduce spacing and card sizes where required.
5. Change multi-column grids to fewer columns.
6. On mobile, use single-column layouts where required.
7. Prevent horizontal overflow.
8. Keep images and content inside the viewport.
9. Display the final responsive layout.

### Pseudocode

```text
IF screen_width > 1000
    Use desktop layout
    Use multi-column sections
ELSE IF screen_width > 560
    Use tablet layout
    Reduce columns
ELSE
    Use mobile layout
    Use single-column sections
    Reduce padding and spacing
END IF
```

---

# 6. JavaScript Algorithms

The main interactive functionality is implemented in `script.js`.

---

## 6.1 Dynamic / Static Mode Algorithm

The website stores the selected mode in browser `localStorage`.

### Steps

1. Read `vikram-dynamic` from localStorage.
2. If no value exists, use Dynamic mode.
3. User clicks the mode button.
4. Reverse the current mode.
5. Save the new value in localStorage.
6. Add/remove the `static` class on `<body>`.
7. Update the button text.
8. The preference remains after page refresh.

### Pseudocode

```text
START

Read saved mode from localStorage

IF saved mode is false
    mode = Static
ELSE
    mode = Dynamic
END IF

WHEN user clicks mode:
    Toggle mode
    Save mode in localStorage
    Update body class
    Update button text

END
```

---

## 6.2 Mobile Menu Algorithm

### Steps

1. User clicks the menu button.
2. Open the mobile navigation panel.
3. Set `aria-hidden` to false.
4. Set `aria-expanded` to true.
5. Add `menu-open` class to the body.
6. When a navigation link is clicked, close the panel.
7. When Escape is pressed, close the panel.

### Pseudocode

```text
IF menu button clicked
    Open mobile menu
    Set aria-expanded = true
ELSE IF close button clicked
    Close mobile menu
    Set aria-expanded = false
END IF

IF navigation link clicked
    Close mobile menu
END IF

IF Escape key pressed
    Close mobile menu
END IF
```

---

# 7. Scroll Reveal Algorithm

The project uses the browser's `IntersectionObserver` API.

### Purpose

Elements with the `.reveal` class appear when they enter the visible area.

### Steps

1. Find all `.reveal` elements.
2. Create an IntersectionObserver.
3. Observe each element.
4. When an element enters the viewport:
   - Add the `show` class.
5. When a skill card enters the viewport:
   - Start its progress-bar animation.
6. When a skill card leaves the viewport:
   - Reset the progress bar.
7. Repeat whenever the card enters the viewport.

### Pseudocode

```text
FOR each reveal element
    Observe element

WHEN element enters viewport
    Add "show" class

    IF element is a skill card
        Animate skill progress
    END IF

WHEN skill card leaves viewport
    Set progress width = 0%
END
```

---

# 8. Skill Progress Algorithm

Each skill card contains a `data-p` percentage.

Example:

```html
<article class="skill" data-p="90">
```

### Steps

1. Read `data-p`.
2. Convert it to a number.
3. Limit the value between 0 and 100.
4. Set the progress bar initially to 0%.
5. Wait for the browser animation frame.
6. Animate the width to the target percentage.
7. Finish the animation.

### Pseudocode

```text
target = data-p

IF target < 0
    target = 0
IF target > 100
    target = 100

progress = 0%

Animate progress from 0% to target%

END
```

---

# 9. Project Filter Algorithm

The project section contains filter buttons.

### Steps

1. User selects a filter.
2. Remove `active` class from all filter buttons.
3. Add `active` class to the selected button.
4. Read the selected category.
5. Check every project card.
6. If category is `All`, show every project.
7. Otherwise compare the project's category with the selected category.
8. Show matching projects.
9. Hide non-matching projects.

### Pseudocode

```text
selected_filter = clicked_button.category

FOR each project
    IF selected_filter == "All"
        Show project
    ELSE IF project.category == selected_filter
        Show project
    ELSE
        Hide project
    END IF
END FOR
```

### Time Complexity

For `n` project cards:

```text
Time Complexity: O(n)
Space Complexity: O(1)
```

---

# 10. Certificate Preview Algorithm

Certificates can be opened in a larger modal preview.

### Steps

1. User clicks certificate preview.
2. Find the selected certificate image.
3. Read its image source.
4. Put the source into the modal image.
5. Set the "open" class on the modal.
6. Disable/adjust body scrolling through the modal state.
7. User can close the modal.
8. Remove the image source and close the modal.

### Pseudocode

```text
WHEN certificate clicked

    Find certificate image
    Get image source

    Set modal image source
    Open certificate modal
    Set aria-hidden = false

WHEN close clicked

    Close modal
    Set aria-hidden = true
    Remove image source

END
```

---

# 11. Contact Form Algorithm

The current static website handles the contact form using a `mailto:` link.

### Steps

1. User submits the form.
2. Prevent normal page reload.
3. Read name, email, and message.
4. Remove unnecessary leading/trailing spaces.
5. Create the email subject.
6. Encode the message for a URL.
7. Open the user's default email application.
8. Display a temporary success message.
9. Reset the form.

### Pseudocode

```text
WHEN form submitted

    Prevent page reload

    Read name
    Read email
    Read message

    Create subject
    Create email body

    Open:
        mailto:vikrambahad@gmail.com

    Display "Opening your email app..."

    Reset form

END
```

### Important

This is a **static frontend implementation**. It does not directly insert the contact message into MySQL.

For database storage, a backend API such as PHP, Node.js, Python, etc. would be required.

---

# 12. Scroll Progress Algorithm

A progress bar is created at the top of the page.

### Steps

1. Read document height.
2. Read current scroll position.
3. Calculate the maximum scroll distance.
4. Calculate scroll percentage.
5. Limit percentage between 0 and 100.
6. Set the progress bar width.
7. Update while scrolling.

### Formula

```text
Scroll Percentage =
(Current Scroll Position / Maximum Scroll Position) × 100
```

### Pseudocode

```text
max_scroll = document_height - window_height

percentage = (scroll_position / max_scroll) × 100

IF percentage < 0
    percentage = 0

IF percentage > 100
    percentage = 100

Set progress_bar.width = percentage%

END
```

---

# 13. Active Navigation Algorithm

The navigation automatically detects the section currently visible on the page.

### Steps

1. Find all navigation links.
2. Find all sections having an ID.
3. Check the current scroll position.
4. Compare the section position with the scroll position.
5. Store the currently active section.
6. Add `active` class to its navigation link.
7. Remove `active` class from other links.

### Pseudocode

```text
current_section = ""

FOR each section
    IF scroll_position + offset >= section_position
        current_section = section.id
    END IF
END FOR

FOR each navigation link
    IF link.href == "#" + current_section
        Add active class
    ELSE
        Remove active class
    END IF
END FOR
```

---

# 14. Keyboard Accessibility Algorithm

The project includes keyboard handling for interactive overlays.

### Escape key behavior

```text
WHEN keyboard event occurs

IF key == Escape
    Close mobile menu
    Close certificate modal
END IF
```

This makes it easier to close open UI elements without using the mouse/touch screen.

---

# 15. Database Algorithm

The included `database.sql` contains two tables:

### `contact_messages`

Stores contact form messages for a future backend.

Fields:

```text
id
name
email
subject
message
created_at
```

### `projects`

Stores project information for a future backend.

Fields:

```text
id
title
description
project_url
created_at
```

---

## Database Insert Algorithm — Contact Message

This is the logical algorithm a future backend can use.

```text
START

Receive form data

Validate name
Validate email
Validate message

IF validation fails
    Return error
ELSE
    Connect to MySQL
    Insert name, email, subject, message
    Generate record ID
    Return success
END IF

Close database connection

END
```

---

## Database Project Retrieval Algorithm

```text
START

Connect to MySQL

Execute:
SELECT id, title, description, project_url
FROM projects

Receive project records

FOR each record
    Convert record into project card
END FOR

Display project cards

Close database connection

END
```

---

# 16. GitHub Pages Deployment Algorithm

### Steps

1. Create/open GitHub repository.
2. Upload all project files to the repository root.
3. Make sure `index.html` is in the root.
4. Make sure `style.css` and `script.js` are also in the root.
5. Commit the changes.
6. Open **Settings → Pages**.
7. Select **Deploy from a branch**.
8. Select the `main` branch.
9. Select `/ (root)`.
10. Save.
11. Wait for GitHub Pages deployment.
12. Open the generated Pages URL.

### Repository structure should look like:

```text
Repository
│
├── index.html
├── style.css
├── script.js
├── database.sql
├── README.md
├── LICENSE
├── .nojekyll
└── assets/
```

---

# 17. Why `.nojekyll` Is Included

The `.nojekyll` file tells GitHub Pages not to process the site using Jekyll.

It is useful when the project is intended to be served as a normal static HTML/CSS/JavaScript website.

---

# 18. GitHub Pages vs Database

GitHub Pages can serve:

```text
HTML
CSS
JavaScript
Images
Other static assets
```

GitHub Pages **does not run a MySQL database or a server-side application**.

Therefore:

```text
GitHub Pages
     │
     └── Static Frontend
           ├── HTML
           ├── CSS
           ├── JavaScript
           └── Images

Separate Backend
     │
     ├── PHP / Node.js / Python
     └── MySQL
```

For a complete database-powered website, the frontend would communicate with a backend API.

---

# 19. Future Full-Stack Architecture

A future version can use:

```text
User
  │
  ▼
Frontend
HTML + CSS + JavaScript
  │
  ▼
REST API
  │
  ▼
Backend
PHP / Node.js / Python
  │
  ▼
MySQL Database
```

Example flow:

```text
Contact Form
     │
     ▼
JavaScript
     │
     ▼
POST /api/contact
     │
     ▼
Backend Validation
     │
     ▼
MySQL
     │
     ▼
Success Response
     │
     ▼
Frontend Success Message
```

---

# 20. Security Considerations for Future Backend

If the database is connected to the website in the future:

- Validate all form input on the server.
- Use prepared SQL statements.
- Never put MySQL passwords inside frontend JavaScript.
- Never expose database credentials in GitHub.
- Validate email addresses on the server.
- Limit message length.
- Sanitize data before displaying user-generated content.
- Use HTTPS.
- Add rate limiting to public forms.

---

# 21. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structure |
| CSS3 | Styling and responsive design |
| JavaScript ES6+ | Interactivity |
| IntersectionObserver | Scroll reveal |
| localStorage | Mode preference |
| Mailto | Static contact handling |
| MySQL | Optional future database |
| GitHub Pages | Static hosting |

---

# 22. Browser Compatibility

The project is designed for modern browsers supporting:

- HTML5
- CSS3
- JavaScript
- `localStorage`
- `IntersectionObserver`

Recommended browsers:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari
- Android Chrome

---

# 23. Project Advantages

- Responsive design
- Mobile navigation
- Interactive project filtering
- Animated skill bars
- Certificate preview modal
- Scroll progress indicator
- Active navigation indicator
- Dynamic/static display mode
- Keyboard Escape support
- GitHub Pages compatible
- Separate HTML, CSS, and JavaScript files
- Optional MySQL schema for future full-stack development

---

# 24. Limitations

The current GitHub Pages version is a static frontend.

Therefore:

- MySQL is not connected directly.
- Contact form uses the user's email application.
- No server-side authentication is implemented.
- No server-side form validation is implemented.
- `database.sql` is provided as a foundation for future backend development.

---

# 25. Author

**Vikram Bahad**

Personal Portfolio / Web Development Project

---

## License

See the included `LICENSE` file for project licensing information.
