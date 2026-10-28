// Light first, matching the Data Volunteer Network artwork: unless the reader has picked a
// theme with Furo's toggle, start in light. Furo stores the choice in localStorage under "theme".
(function () {
  try {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
      document.body.dataset.theme = "light";
    }
  } catch (e) {
    // storage blocked: Furo's default (follow the system) applies
  }
})();
