# Attendance Logger

A modern, responsive web application for logging, tracking, and exporting student attendance. Features include real-time entry/exit logging, daily summaries, export to CSV/PDF, dark mode, mobile-friendly design, and more.

---

## Features

- **Mark Entry/Exit:** Log when students arrive and leave.
- **Auto-Suggestions:** Quickly select student names with smart suggestions.
- **Attendance Log:** View all attendance records in a searchable, filterable table.
- **Export:** Download filtered or full logs as CSV or PDF.
- **Daily Summary:** See total present and average duration for today.
- **Currently Present Popup:** View and manage students currently present.
- **Dark Mode:** Toggle between light and dark themes.
- **Responsive Design:** Works beautifully on desktop and mobile.
- **Sticky Table Header:** Keeps column headers visible while scrolling.
- **Sidebar Navigation:** Hamburger menu for easy navigation on mobile.
- **Delete All Data:** Securely wipe all attendance records with confirmation.

---

## Getting Started

### 1. Clone or Download

```bash
git clone https://github.com/Ravi-Ranjan-Sharma-droid/Attendance-Logger.git
```

### 2. Open in Your Browser

You can simply open `index.html` in your browser.

**OR**  
For best results (live reload, local server), use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code.

- The project is configured to use port `5502` (see `.vscode/settings.json`).

### 3. Usage

- **Mark Entry/Exit:** Enter a student name and click "Mark Entry" or "Mark Exit".
- **Search:** Use the search bar to filter logs by student name. Suggestions appear as you type.
- **Export:** Click "Export CSV" or "Export PDF" to download the current (filtered) view.
- **View Present:** Click the "Total Present" card for a popup of currently present students (with quick exit).
- **Dark Mode:** Use the sun/moon icon in the header to toggle dark mode.
- **Delete Data:** Go to "Delete Data", type `delete`, and confirm to erase all records.

---

## Project Structure

```
.
├── index.html         # Main HTML file
├── styles.css         # All styles (responsive, dark mode, animations)
├── script.js          # All app logic (logging, export, UI, etc.)
└── .vscode/
    └── settings.json  # Live Server port config
```

---

## Dependencies

- [Font Awesome](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css) (CDN)
- [Google Fonts: Poppins](https://fonts.googleapis.com/css2?family=Poppins)
- [jsPDF](https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js) (CDN)
- [jsPDF-AutoTable](https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js) (CDN)

All dependencies are loaded via CDN in `index.html`.

---

## Customization

- **Theme Colors:** Edit `:root` variables in `styles.css`.
- **Add More Fields:** Extend the form and log structure in `index.html` and `script.js`.
- **Analytics:** Add charts or more summary cards as needed.

---

## Credits

Developed by [Ravi Ranjan Sharma](https://www.instagram.com/nr_snorlax/).  
Icons by [Font Awesome](https://fontawesome.com/).  
PDF export powered by [jsPDF](https://github.com/parallax/jsPDF) and [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable).
