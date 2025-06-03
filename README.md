# 🖥️ Terminal Portfolio Interface

An interactive developer portfolio website that mimics a command-line terminal, allowing users to navigate content using typed commands.

---

## 🧰 Tech Stack

| Layer     | Tools                          |
|-----------|--------------------------------|
| Frontend  | React, TypeScript, TailwindCSS, xterm.js/custom terminal |
| Backend   | Node.js, Express.js (optional) |
| Data      | GitHub API, JSON/static files, Resume PDF |

---

## 🎯 Objectives

- Create a terminal-based UI for personal portfolio
- Parse real commands with proper handlers
- Ensure responsive and accessible design
- Optionally fetch real-time data (e.g., GitHub)

---

## ✨ Key Features

| Feature            | Description                                                         |
|--------------------|---------------------------------------------------------------------|
| Terminal Interface | Users type commands to view info (about, projects, resume, etc.)   |
| Command Parser     | Handles user input and invokes logic                               |
| Output Renderer    | Displays formatted output in terminal UI                           |
| Theming            | Light/dark theme via command                                       |
| Command History    | Use arrow keys to navigate commands                                |
| Auto-completion    | Suggest commands while typing (optional)                           |
| Easter Eggs        | Hidden commands for fun engagement                                 |

---

## 📄 Use Case Descriptions

### 1. View About
- **Scenario:** Visitor wants to learn about the developer
- **Command:** `about`
- **Outcome:** Bio is displayed in terminal

### 2. List Projects
- **Scenario:** Visitor browses project list
- **Command:** `projects`
- **Outcome:** Project names shown

### 3. View Project Details
- **Scenario:** View specific project
- **Command:** `project <name>`
- **Outcome:** Project details rendered

### 4. Download Resume
- **Scenario:** Visitor downloads resume
- **Command:** `resume`
- **Outcome:** Resume PDF is downloaded or previewed

### 5. Change Theme
- **Scenario:** Visitor changes theme
- **Command:** `theme dark` or `theme light`
- **Outcome:** Terminal theme updated

### 6. Show Contact Info
- **Scenario:** Visitor wants contact links
- **Command:** `contact`
- **Outcome:** Email, GitHub, LinkedIn shown

### 7. Clear Terminal
- **Scenario:** Clear previous output
- **Command:** `clear`
- **Outcome:** Terminal reset

### 8. Easter Egg
- **Scenario:** Fun hidden command
- **Command:** `easteregg`
- **Outcome:** ASCII art or message shown

---

## 🧑‍💻 Actor-Goal Mapping

| Actor   | Goal                      | Use Case             |
|---------|---------------------------|----------------------|
| Visitor | Learn about developer     | View About           |
| Visitor | Explore projects          | List Projects        |
| Visitor | See project details       | View Project Details |
| Visitor | Download resume           | Download Resume      |
| Visitor | Change theme              | Change Theme         |
| Visitor | Reach out                 | Show Contact Info    |
| Visitor | Clean terminal            | Clear Terminal       |
| Visitor | Discover hidden features  | Easter Egg           |

---

## 🏗️ Architecture Overview

### Frontend
- `App.tsx` – Root component
- `Terminal.tsx` – Main terminal UI
- `CommandParser.ts` – Parses typed commands
- `CommandHandlers.ts` – Maps commands to logic
- `OutputRenderer.tsx` – Displays results
- `ThemeManager.ts` – Theme switch logic
- `CommandHistory.ts` – Arrow key history
- `Autocomplete.ts` (optional) – Suggests commands

### Backend (Optional)
- `index.ts` – Express server
- `/api/projects` – Serve project data
- `/api/contact` – Contact form handler
- `/resume.pdf` – Static file for download

---

## 🧩 UML Diagrams

> (Insert images for diagrams if available)

- 📦 Class Diagram (Frontend Core)
- 🧭 Use Case Diagrams (UC1–UC8)
- 🔁 Activity Diagrams
- 📩 Sequence Diagrams
- 🧱 Component Diagram

📷 _Example (replace with actual paths):_
![image](https://github.com/user-attachments/assets/3fcd9899-2ac7-4449-9c1d-e42d51d07a92)
![image](https://github.com/user-attachments/assets/28745176-0a59-4112-921e-d957b965b46d)
![image](https://github.com/user-attachments/assets/e8d25448-d611-4790-ad18-f7be51700013)
![image](https://github.com/user-attachments/assets/98b1ef97-0783-440a-87e9-e77dc051b6ce)
![image](https://github.com/user-attachments/assets/5691fd7c-3618-4c1f-80ff-e3e54fdd46d0)
![image](https://github.com/user-attachments/assets/3a33d4bb-0b14-45c8-8fc9-7517bf7e8c0d)
![image](https://github.com/user-attachments/assets/e60b73ab-133d-4ba8-8e35-1315ca77b263)
![image](https://github.com/user-attachments/assets/041ec0eb-687f-4533-985c-129cb28db5d2)
![image](https://github.com/user-attachments/assets/0831a879-5070-413c-92ae-b6c1046224a6)
![image](https://github.com/user-attachments/assets/7f3bb34a-d30d-4eed-abcf-cf2f3dbddd05)
![image](https://github.com/user-attachments/assets/db3c85ae-266c-48bf-a6b8-0a970ec3868c)
![image](https://github.com/user-attachments/assets/afb3395e-0a2e-4833-8019-bf905a14f0bb)
![image](https://github.com/user-attachments/assets/cf35f4b0-d06e-4a52-9760-13ad52766d0e)
![image](https://github.com/user-attachments/assets/b5c2dd5e-6972-4846-8f44-9af33087ddaa)
![image](https://github.com/user-attachments/assets/4805aaa9-a363-4353-bbf2-5102cb34e435)
![image](https://github.com/user-attachments/assets/83ccd1c8-1a4a-437e-adf3-e64353cfed31)
![image](https://github.com/user-attachments/assets/527c02ac-e335-43a8-8dfe-9a2afae6ced7)
![image](https://github.com/user-attachments/assets/c78d466c-b951-4374-a130-25347af31c7c)
![image](https://github.com/user-attachments/assets/379f9a84-0288-4499-b1d5-76921976b1cc)
![image](https://github.com/user-attachments/assets/6f1cb836-b651-4318-92ba-11a8839bc8a2)
![image](https://github.com/user-attachments/assets/848bbcb7-8531-4448-80f2-b175a714f32d)
![image](https://github.com/user-attachments/assets/bc67993d-d863-4294-8a65-27bb0b5351e7)
![image](https://github.com/user-attachments/assets/3fb176ea-cf05-4c1b-a6a6-c81177b744fc)
![image](https://github.com/user-attachments/assets/80dca5bf-3448-47c7-998c-c3ac11279b4f)
![image](https://github.com/user-attachments/assets/78375520-a112-44d6-b676-5c1878b9d111)
![image](https://github.com/user-attachments/assets/d8baedfc-2151-4e4c-a6a5-a15e4bd1b404)
![image](https://github.com/user-attachments/assets/3250d651-4dae-4b83-a33a-8684341546be)
![image](https://github.com/user-attachments/assets/a741dc3f-0868-4b08-a3b2-f6a007a1f3c1)
