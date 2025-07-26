document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const studentNameInput = document.getElementById("student-name");
  const markEntryBtn = document.getElementById("mark-entry");
  const markExitBtn = document.getElementById("mark-exit");
  const logTableBody = document.getElementById("log-body");
  const searchStudentInput = document.getElementById("search-student");
  const deleteConfirmInput = document.getElementById("delete-confirm");
  const deleteDataBtn = document.getElementById("delete-data-btn");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const nameSuggestions = document.getElementById("name-suggestions");
  const exportCsvBtn = document.getElementById("export-csv");
  const exportPdfBtn = document.getElementById("export-pdf");
  const totalPresentElement = document.getElementById("total-present");
  const avgDurationElement = document.getElementById("avg-duration");
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const sidebar = document.getElementById("sidebar");
  const closeSidebar = document.getElementById("close-sidebar");
  const overlay = document.getElementById("overlay");
  const totalPresentCard = document.getElementById("total-present-card");
  const presentStudentsModal = document.getElementById(
    "present-students-modal"
  );
  const presentStudentsList = document.getElementById("present-students-list");
  const closeModal = document.querySelector(".close-modal");
  const userSwitcher = document.getElementById("user-switcher");
  const searchSuggestions = document.getElementById("search-suggestions");

  // Load attendance logs from localStorage
  let attendanceLogs = JSON.parse(localStorage.getItem("attendanceLogs")) || [];

  // Load dark mode preference
  const darkMode = localStorage.getItem("darkMode") === "true";
  if (darkMode) {
    document.documentElement.setAttribute("data-theme", "dark");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Initialize the table with existing logs
  renderAttendanceLogs();
  updateDailySummary();
  populateUserSwitcher();

  // Event Listeners
  markEntryBtn.addEventListener("click", handleEntryMark);
  markExitBtn.addEventListener("click", handleExitMark);
  if (deleteDataBtn) {
    deleteDataBtn.addEventListener("click", handleDeleteAllData);
  }
  if (searchStudentInput) {
    searchStudentInput.addEventListener("input", function () {
      renderAttendanceLogs();
      handleSearchSuggestions();
    });
    searchStudentInput.addEventListener("focus", handleSearchSuggestions);
  }
  darkModeToggle.addEventListener("click", toggleDarkMode);
  studentNameInput.addEventListener("input", handleNameInput);
  exportCsvBtn.addEventListener("click", exportToCSV);
  exportPdfBtn.addEventListener("click", exportToPDF);
  hamburgerMenu.addEventListener("click", toggleSidebar);
  closeSidebar.addEventListener("click", toggleSidebar);
  overlay.addEventListener("click", toggleSidebar);
  totalPresentCard.addEventListener("click", showPresentStudents);
  closeModal.addEventListener("click", hidePresentStudents);
  if (userSwitcher) {
    userSwitcher.addEventListener("change", function () {
      searchStudentInput.value = this.value;
      renderAttendanceLogs();
    });
  }

  // Close sidebar when clicking a menu item
  document.querySelectorAll(".sidebar-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      toggleSidebar();
    });
  });

  // Functions
  function toggleDarkMode() {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem("darkMode", "false");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem("darkMode", "true");
    }
  }

  function handleNameInput() {
    const input = studentNameInput.value.trim().toLowerCase();
    if (input.length < 2) {
      nameSuggestions.style.display = "none";
      return;
    }

    const uniqueNames = [
      ...new Set(attendanceLogs.map((log) => log.studentName)),
    ];
    const suggestions = uniqueNames
      .filter((name) => name.toLowerCase().includes(input))
      .slice(0, 5);

    if (suggestions.length > 0) {
      nameSuggestions.innerHTML = suggestions
        .map((name) => `<div class="suggestion-item">${name}</div>`)
        .join("");
      nameSuggestions.style.display = "block";

      // Add click handlers to suggestions
      nameSuggestions.querySelectorAll(".suggestion-item").forEach((item) => {
        item.addEventListener("click", () => {
          studentNameInput.value = item.textContent;
          nameSuggestions.style.display = "none";
        });
      });
    } else {
      nameSuggestions.style.display = "none";
    }
  }

  function updateDailySummary() {
    const today = new Date().toDateString();
    const todayLogs = attendanceLogs.filter(
      (log) => new Date(log.entryTime).toDateString() === today
    );

    // Calculate total present (only students who haven't exited)
    const presentStudents = todayLogs.filter((log) => !log.exitTime);
    const uniquePresentStudents = new Set(
      presentStudents.map((log) => log.studentName)
    );
    totalPresentElement.textContent = uniquePresentStudents.size;

    // Calculate average duration
    const completedLogs = todayLogs.filter((log) => log.exitTime);
    if (completedLogs.length > 0) {
      const totalDuration = completedLogs.reduce((sum, log) => {
        const entry = new Date(log.entryTime);
        const exit = new Date(log.exitTime);
        return sum + (exit - entry);
      }, 0);
      const avgDuration = totalDuration / completedLogs.length;
      const hours = Math.floor(avgDuration / (1000 * 60 * 60));
      const minutes = Math.floor(
        (avgDuration % (1000 * 60 * 60)) / (1000 * 60)
      );
      avgDurationElement.textContent = `${hours}h ${minutes}m`;
    } else {
      avgDurationElement.textContent = "0h 0m";
    }
  }

  function handleEntryMark() {
    const studentName = studentNameInput.value.trim();
    if (!studentName) {
      alert("Please enter a student name");
      return;
    }

    const timestamp = new Date();

    // Create new entry log
    const newLog = {
      id: generateId(),
      studentName,
      entryTime: timestamp,
      exitTime: null,
    };

    // Add to logs array
    attendanceLogs.push(newLog);

    // Save to localStorage
    saveLogsToLocalStorage();

    // Update UI
    renderAttendanceLogs();
    updateDailySummary();
    populateUserSwitcher();

    // Clear input
    studentNameInput.value = "";
    studentNameInput.focus();
    nameSuggestions.style.display = "none";
  }

  function handleExitMark() {
    const studentName = studentNameInput.value.trim();
    if (!studentName) {
      alert("Please enter a student name");
      return;
    }

    // Find the most recent entry for this student without an exit time
    const entryIndex = findLatestEntryIndex(studentName);

    if (entryIndex === -1) {
      alert(`No active entry found for ${studentName}`);
      return;
    }

    // Update the exit time
    attendanceLogs[entryIndex].exitTime = new Date();

    // Save to localStorage
    saveLogsToLocalStorage();

    // Update UI
    renderAttendanceLogs();
    updateDailySummary();
    populateUserSwitcher();

    // Clear input
    studentNameInput.value = "";
    studentNameInput.focus();
    nameSuggestions.style.display = "none";
  }

  function findLatestEntryIndex(studentName) {
    // Search from the end of the array to find the most recent entry
    for (let i = attendanceLogs.length - 1; i >= 0; i--) {
      if (
        attendanceLogs[i].studentName.toLowerCase() ===
          studentName.toLowerCase() &&
        !attendanceLogs[i].exitTime
      ) {
        return i;
      }
    }
    return -1;
  }

  function renderAttendanceLogs() {
    // Clear the table body
    logTableBody.innerHTML = "";

    const searchTerm = searchStudentInput
      ? searchStudentInput.value.trim().toLowerCase()
      : "";

    // Filter logs by search term
    const filteredLogs = attendanceLogs.filter((log) =>
      log.studentName.toLowerCase().includes(searchTerm)
    );

    // Sort logs by entry time (newest first)
    const sortedLogs = [...filteredLogs].sort(
      (a, b) => new Date(b.entryTime) - new Date(a.entryTime)
    );

    // Add each log to the table
    sortedLogs.forEach((log) => {
      const row = document.createElement("tr");
      row.classList.add("new-entry");

      // Format the timestamps
      const entryTimeFormatted = formatDateTime(new Date(log.entryTime));
      const exitTimeFormatted = log.exitTime
        ? formatDateTime(new Date(log.exitTime))
        : "-";

      // Calculate time spent if both entry and exit times exist
      let timeSpent = "-";
      if (log.exitTime) {
        const entryTime = new Date(log.entryTime);
        const exitTime = new Date(log.exitTime);
        const diffMs = exitTime - entryTime;

        // Convert to hours and minutes
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        timeSpent = `${hours}h ${minutes}m`;
      }

      // Add status indicator
      const statusClass = log.exitTime ? "status-exited" : "status-present";
      const statusHtml = `<span class="status-indicator ${statusClass}"></span>`;

      row.innerHTML = `
        <td>${statusHtml}</td>
        <td>${log.studentName}</td>
        <td>${entryTimeFormatted}</td>
        <td>${exitTimeFormatted}</td>
        <td>${timeSpent}</td>
      `;

      logTableBody.appendChild(row);
    });
  }

  function formatDateTime(date) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleString("en-US", options);
  }

  function saveLogsToLocalStorage() {
    localStorage.setItem("attendanceLogs", JSON.stringify(attendanceLogs));
  }

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  function handleDeleteAllData() {
    if (deleteConfirmInput.value.toLowerCase() !== "delete") {
      alert("Please type 'delete' in the confirmation box to delete all data.");
      deleteConfirmInput.focus();
      return;
    }

    if (
      confirm(
        "Are you absolutely sure you want to delete ALL attendance data? This action cannot be undone."
      )
    ) {
      // Clear the logs array
      attendanceLogs = [];

      // Clear localStorage
      localStorage.removeItem("attendanceLogs");

      // Update UI
      renderAttendanceLogs();
      populateUserSwitcher();

      // Clear confirmation input
      deleteConfirmInput.value = "";
      alert("All attendance data has been deleted.");
    }
  }

  function getFilteredLogs() {
    const searchTerm = searchStudentInput
      ? searchStudentInput.value.trim().toLowerCase()
      : "";
    if (!searchTerm) return attendanceLogs;
    return attendanceLogs.filter((log) =>
      log.studentName.toLowerCase().includes(searchTerm)
    );
  }

  function exportToCSV() {
    const headers = ["Student Name", "Entry Time", "Exit Time", "Time Spent"];
    const filteredLogs = getFilteredLogs();
    const csvContent = [
      headers.join(","),
      ...filteredLogs.map((log) => {
        const entryTime = formatDateTime(new Date(log.entryTime));
        const exitTime = log.exitTime
          ? formatDateTime(new Date(log.exitTime))
          : "-";
        let timeSpent = "-";
        if (log.exitTime) {
          const entry = new Date(log.entryTime);
          const exit = new Date(log.exitTime);
          const diffMs = exit - entry;
          const hours = Math.floor(diffMs / (1000 * 60 * 60));
          const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
          timeSpent = `${hours}h ${minutes}m`;
        }
        return [log.studentName, entryTime, exitTime, timeSpent].join(",");
      }),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `attendance_log_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const headers = [["Student Name", "Entry Time", "Exit Time", "Time Spent"]];
    const filteredLogs = getFilteredLogs();
    const data = filteredLogs.map((log) => {
      const entryTime = formatDateTime(new Date(log.entryTime));
      const exitTime = log.exitTime
        ? formatDateTime(new Date(log.exitTime))
        : "-";
      let timeSpent = "-";
      if (log.exitTime) {
        const entry = new Date(log.entryTime);
        const exit = new Date(log.exitTime);
        const diffMs = exit - entry;
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        timeSpent = `${hours}h ${minutes}m`;
      }
      return [log.studentName, entryTime, exitTime, timeSpent];
    });

    doc.autoTable({
      head: headers,
      body: data,
      startY: 20,
      theme: "grid",
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [108, 92, 231],
      },
    });

    doc.save(`attendance_log_${new Date().toISOString().split("T")[0]}.pdf`);
  }

  function toggleSidebar() {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = sidebar.classList.contains("active")
      ? "hidden"
      : "";
  }

  function showPresentStudents() {
    const today = new Date().toDateString();
    const presentStudents = attendanceLogs.filter(
      (log) => new Date(log.entryTime).toDateString() === today && !log.exitTime
    );

    presentStudentsList.innerHTML =
      presentStudents.length > 0
        ? presentStudents
            .map(
              (log) => `
            <li>
              <span class="status-indicator status-present"></span>
              <span class="student-name">${log.studentName}</span>
              <button class="btn exit-btn" data-student="${log.studentName}">
                <i class="fas fa-sign-out-alt"></i> Exit
              </button>
            </li>
          `
            )
            .join("")
        : "<li>No students currently present</li>";

    // Add click handlers for exit buttons
    presentStudentsList.querySelectorAll(".exit-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const studentName = e.target.closest(".exit-btn").dataset.student;
        handleQuickExit(studentName);
      });
    });

    presentStudentsModal.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function handleQuickExit(studentName) {
    // Find the most recent entry for this student without an exit time
    const entryIndex = findLatestEntryIndex(studentName);

    if (entryIndex !== -1) {
      // Update the exit time
      attendanceLogs[entryIndex].exitTime = new Date();

      // Save to localStorage
      saveLogsToLocalStorage();

      // Update UI
      renderAttendanceLogs();
      updateDailySummary();
      showPresentStudents(); // Refresh the modal
    }
  }

  function hidePresentStudents() {
    presentStudentsModal.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function populateUserSwitcher() {
    if (!userSwitcher) return;
    // Get unique student names
    const uniqueNames = [
      ...new Set(attendanceLogs.map((log) => log.studentName)),
    ].sort();
    userSwitcher.innerHTML =
      '<option value="">-- Quick Switch User --</option>' +
      uniqueNames
        .map((name) => `<option value="${name}">${name}</option>`)
        .join("");
  }

  function handleSearchSuggestions() {
    const input = searchStudentInput.value.trim().toLowerCase();
    if (input.length < 1) {
      searchSuggestions.style.display = "none";
      return;
    }
    const uniqueNames = [
      ...new Set(attendanceLogs.map((log) => log.studentName)),
    ];
    const suggestions = uniqueNames
      .filter((name) => name.toLowerCase().includes(input))
      .slice(0, 5);
    if (suggestions.length > 0) {
      searchSuggestions.innerHTML = suggestions
        .map((name) => `<div class="suggestion-item">${name}</div>`)
        .join("");
      searchSuggestions.style.display = "block";
      // Add click handlers
      searchSuggestions.querySelectorAll(".suggestion-item").forEach((item) => {
        item.addEventListener("click", () => {
          searchStudentInput.value = item.textContent;
          searchSuggestions.style.display = "none";
          renderAttendanceLogs();
        });
      });
    } else {
      searchSuggestions.style.display = "none";
    }
  }

  // Hide suggestions on click outside
  window.addEventListener("click", (e) => {
    if (
      !searchSuggestions.contains(e.target) &&
      e.target !== searchStudentInput
    ) {
      searchSuggestions.style.display = "none";
    }
  });
});
