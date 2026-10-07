const DEFAULT_DATA = {
  name: "Shreya Katkar",
  role: "Business & Data Analyst Fresher",
  intro: "I turn business questions into clear, data-driven insights using analytics, visualization and technology.",
  about: "I am a BCA graduate building practical skills across business analytics, data analysis and web technologies. My focus is on solving real-world problems with Excel, SQL, Power BI, Python and clear business thinking.\n\nI enjoy learning new tools, creating practical projects and turning raw information into useful insights.",
  focus: "Business Analytics, SQL & Power BI",
  educationShort: "BCA",
  linkedin: "https://www.linkedin.com/in/shreyakatkar28",
  github: "#",
  email: "your.email@example.com",
  resume: "#",
  skills: [
    "Excel", "SQL", "Power BI", "Tableau", "Python", "Pandas",
    "MySQL", "HTML", "CSS", "JavaScript", "Flask", "Data Analysis"
  ],
  projects: [
    {
      title: "Fraud Detection Dashboard",
      description: "Analyzed banking transaction data using Python and created an interactive Power BI dashboard to identify fraud patterns.",
      tech: ["Python", "Pandas", "Power BI"],
      link: "#"
    },
    {
      title: "Bank Customer Churn Analysis",
      description: "Explored customer behavior and churn patterns to identify factors that may influence customer retention.",
      tech: ["Python", "Pandas", "Data Analysis"],
      link: "#"
    },
    {
      title: "Retail Sales Dashboard",
      description: "Created a sales dashboard to track performance, trends and useful business KPIs from retail data.",
      tech: ["Excel", "Data Visualization"],
      link: "#"
    },
    {
      title: "Smart Study Material & Research Search",
      description: "A web-based project concept for organizing study resources and helping students discover relevant research material.",
      tech: ["HTML", "CSS", "JavaScript", "Python"],
      link: "#"
    }
  ],
  education: [
    {
      year: "Completed",
      degree: "Bachelor of Computer Applications (BCA)",
      institute: "IMED, Bharati Vidyapeeth, Pune"
    },
    {
      year: "2025–26",
      degree: "MCA Admission / Higher Studies",
      institute: "Preparing / exploring suitable opportunities"
    }
  ]
};

let data = loadData();

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function loadData() {
  try {
    const saved = localStorage.getItem("shreyaPortfolio");
    return saved ? { ...clone(DEFAULT_DATA), ...JSON.parse(saved) } : clone(DEFAULT_DATA);
  } catch (error) {
    return clone(DEFAULT_DATA);
  }
}

function saveData() {
  localStorage.setItem("shreyaPortfolio", JSON.stringify(data));
}

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join("");
}

function renderPortfolio() {
  document.title = `${data.name} | Portfolio`;

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setText("navName", initials(data.name) || "PF");
  setText("heroName", data.name);
  setText("heroRole", data.role);
  setText("heroIntro", data.intro);
  setText("aboutText", data.about);
  setText("focusText", data.focus);
  setText("footerName", data.name);
  setText("profileInitials", initials(data.name) || "PF");
  setText("projectCount", `${data.projects.length}+`);
  setText("skillCount", `${data.skills.length}+`);
  setText("educationShort", data.educationShort || "Degree");
  setText("year", new Date().getFullYear());

  const links = {
    linkedinLink: data.linkedin,
    githubLink: data.github,
    resumeBtn: data.resume,
    contactLinkedinBtn: data.linkedin
  };

  Object.entries(links).forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (el) {
      el.href = url || "#";
      el.style.display = url === "#" ? "" : "";
    }
  });

  const emailUrl = data.email ? `mailto:${data.email}` : "#";
  ["emailLink", "contactEmailBtn"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = emailUrl;
  });

  document.getElementById("skillList").innerHTML = data.skills
    .map(skill => `<span class="skill-pill">${escapeHtml(skill)}</span>`)
    .join("");

  document.getElementById("projectGrid").innerHTML = data.projects.map(project => `
    <article class="project-card">
      <div class="project-top">
        <h3>${escapeHtml(project.title)}</h3>
        <a class="project-link" href="${safeUrl(project.link)}" target="_blank" rel="noopener">View ↗</a>
      </div>
      <p>${escapeHtml(project.description)}</p>
      <div class="tech-row">
        ${project.tech.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join("")}
      </div>
    </article>
  `).join("");

  document.getElementById("educationList").innerHTML = data.education.map(item => `
    <div class="timeline-item">
      <div class="timeline-year">${escapeHtml(item.year)}</div>
      <div>
        <h3>${escapeHtml(item.degree)}</h3>
        <p>${escapeHtml(item.institute)}</p>
      </div>
    </div>
  `).join("");
}

function safeUrl(url) {
  if (!url) return "#";
  return /^(https?:\/\/|mailto:)/i.test(url) ? url : "#";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function openEditor() {
  const modal = document.getElementById("editorModal");
  modal.classList.add("show");
  fillEditor();
}

function closeEditor() {
  document.getElementById("editorModal").classList.remove("show");
}

function fillEditor() {
  document.getElementById("fName").value = data.name;
  document.getElementById("fRole").value = data.role;
  document.getElementById("fIntro").value = data.intro;
  document.getElementById("fAbout").value = data.about;
  document.getElementById("fFocus").value = data.focus;
  document.getElementById("fEducationShort").value = data.educationShort;
  document.getElementById("fLinkedin").value = data.linkedin;
  document.getElementById("fGithub").value = data.github;
  document.getElementById("fEmail").value = data.email;
  document.getElementById("fResume").value = data.resume;

  renderSkillEditor();
  renderProjectEditor();
  renderEducationEditor();
}

function renderSkillEditor() {
  const container = document.getElementById("skillEditor");
  container.innerHTML = data.skills.map((skill, index) => `
    <div class="editor-row">
      <input value="${escapeHtml(skill)}" data-skill-index="${index}">
      <button class="remove-btn" data-remove-skill="${index}">Remove</button>
    </div>
  `).join("");
}

function renderProjectEditor() {
  const container = document.getElementById("projectEditor");
  container.innerHTML = data.projects.map((project, index) => `
    <div class="editor-card">
      <div class="editor-card-grid">
        <label>Project Title
          <input value="${escapeHtml(project.title)}" data-project-index="${index}" data-field="title">
        </label>
        <label>Project Link
          <input value="${escapeHtml(project.link)}" data-project-index="${index}" data-field="link">
        </label>
        <label class="full">Description
          <textarea data-project-index="${index}" data-field="description">${escapeHtml(project.description)}</textarea>
        </label>
        <label class="full">Technologies (comma separated)
          <input value="${escapeHtml(project.tech.join(", "))}" data-project-index="${index}" data-field="tech">
        </label>
      </div>
      <div style="margin-top:10px;">
        <button class="remove-btn" data-remove-project="${index}">Remove Project</button>
      </div>
    </div>
  `).join("");
}

function renderEducationEditor() {
  const container = document.getElementById("educationEditor");
  container.innerHTML = data.education.map((item, index) => `
    <div class="editor-card">
      <div class="editor-card-grid">
        <label>Year
          <input value="${escapeHtml(item.year)}" data-education-index="${index}" data-field="year">
        </label>
        <label>Degree / Course
          <input value="${escapeHtml(item.degree)}" data-education-index="${index}" data-field="degree">
        </label>
        <label class="full">Institute
          <input value="${escapeHtml(item.institute)}" data-education-index="${index}" data-field="institute">
        </label>
      </div>
      <div style="margin-top:10px;">
        <button class="remove-btn" data-remove-education="${index}">Remove Education</button>
      </div>
    </div>
  `).join("");
}

function readEditor() {
  data.name = document.getElementById("fName").value.trim();
  data.role = document.getElementById("fRole").value.trim();
  data.intro = document.getElementById("fIntro").value.trim();
  data.about = document.getElementById("fAbout").value.trim();
  data.focus = document.getElementById("fFocus").value.trim();
  data.educationShort = document.getElementById("fEducationShort").value.trim();
  data.linkedin = document.getElementById("fLinkedin").value.trim();
  data.github = document.getElementById("fGithub").value.trim();
  data.email = document.getElementById("fEmail").value.trim();
  data.resume = document.getElementById("fResume").value.trim();

  data.skills = [...document.querySelectorAll("[data-skill-index]")]
    .map(input => input.value.trim())
    .filter(Boolean);

  data.projects = data.projects.map((project, index) => {
    const get = field => document.querySelector(`[data-project-index="${index}"][data-field="${field}"]`);
    return {
      title: get("title").value.trim(),
      link: get("link").value.trim(),
      description: get("description").value.trim(),
      tech: get("tech").value.split(",").map(v => v.trim()).filter(Boolean)
    };
  });

  data.education = data.education.map((item, index) => {
    const get = field => document.querySelector(`[data-education-index="${index}"][data-field="${field}"]`);
    return {
      year: get("year").value.trim(),
      degree: get("degree").value.trim(),
      institute: get("institute").value.trim()
    };
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

document.getElementById("editBtn").addEventListener("click", openEditor);
document.getElementById("closeEditor").addEventListener("click", closeEditor);
document.getElementById("cancelBtn").addEventListener("click", closeEditor);

document.getElementById("saveBtn").addEventListener("click", () => {
  readEditor();
  saveData();
  renderPortfolio();
  closeEditor();
  showToast("Portfolio updated and saved in your browser.");
});

document.getElementById("resetBtn").addEventListener("click", () => {
  data = clone(DEFAULT_DATA);
  saveData();
  fillEditor();
  renderPortfolio();
  showToast("Portfolio reset to default content.");
});

document.getElementById("addSkill").addEventListener("click", () => {
  readEditor();
  data.skills.push("New Skill");
  renderSkillEditor();
});

document.getElementById("addProject").addEventListener("click", () => {
  readEditor();
  data.projects.push({
    title: "New Project",
    description: "Write your project description here.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "#"
  });
  renderProjectEditor();
});

document.getElementById("addEducation").addEventListener("click", () => {
  readEditor();
  data.education.push({
    year: "Year",
    degree: "Course / Degree",
    institute: "Institute / University"
  });
  renderEducationEditor();
});

document.addEventListener("click", (event) => {
  if (event.target.matches("[data-remove-skill]")) {
    readEditor();
    data.skills.splice(Number(event.target.dataset.removeSkill), 1);
    renderSkillEditor();
  }

  if (event.target.matches("[data-remove-project]")) {
    readEditor();
    data.projects.splice(Number(event.target.dataset.removeProject), 1);
    renderProjectEditor();
  }

  if (event.target.matches("[data-remove-education]")) {
    readEditor();
    data.education.splice(Number(event.target.dataset.removeEducation), 1);
    renderEducationEditor();
  }
});

document.getElementById("editorModal").addEventListener("click", (event) => {
  if (event.target.id === "editorModal") closeEditor();
});

renderPortfolio();
