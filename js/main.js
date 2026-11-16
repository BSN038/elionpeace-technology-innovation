
/* =====================================================
   ELIONPEACE — TECHNOLOGY INNOVATION
   Interactive Website
   University of Salford | 2026–27
   ===================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------
     01. ELEMENTS
  --------------------------------------------- */

  const menuToggle = document.getElementById("menu-toggle");
  const siteNav = document.getElementById("site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");

  const progressBar = document.getElementById("progress-bar");
  const backToTop = document.getElementById("back-to-top");

  const technologyButtons = document.querySelectorAll(
    "[data-tech]"
  );

  const technologyDetail = document.getElementById(
    "technology-detail"
  );

  const journeyButtons = document.querySelectorAll(
    "[data-journey]"
  );

  const journeyDetail = document.getElementById(
    "journey-detail"
  );

  const journeyPrevious = document.getElementById(
    "journey-prev"
  );

  const journeyNext = document.getElementById(
    "journey-next"
  );

  const maturityButtons = document.querySelectorAll(
    "[data-level]"
  );

  const maturityDetail = document.getElementById(
    "maturity-detail"
  );

  /* ---------------------------------------------
     02. MOBILE NAVIGATION
  --------------------------------------------- */

  function closeMenu() {
    if (!menuToggle || !siteNav) return;

    siteNav.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open navigation"
    );
  }

  if (menuToggle && siteNav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = siteNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

    });

    navLinks.forEach((link) => {

      link.addEventListener("click", closeMenu);

    });

    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {
        closeMenu();
      }

    });

    document.addEventListener("click", (event) => {

      if (
        siteNav.classList.contains("open") &&
        !siteNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }

    });

    window.addEventListener("resize", () => {

      if (window.innerWidth > 1050) {
        closeMenu();
      }

    });

  }

  /* ---------------------------------------------
     03. READING PROGRESS
  --------------------------------------------- */

  function updateReadingProgress() {

    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop;

    const scrollableHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress = scrollableHeight > 0
      ? Math.min(
        100,
        Math.max(
          0,
          (scrollTop / scrollableHeight) * 100
        )
      )
      : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (backToTop) {

      const visible = scrollTop > 450;

      backToTop.classList.toggle(
        "visible",
        visible
      );

      backToTop.tabIndex = visible ? 0 : -1;

    }

  }

  let scrollScheduled = false;

  window.addEventListener(
    "scroll",
    () => {

      if (scrollScheduled) return;

      scrollScheduled = true;

      requestAnimationFrame(() => {

        updateReadingProgress();
        scrollScheduled = false;

      });

    },
    { passive: true }
  );

  window.addEventListener(
    "resize",
    updateReadingProgress
  );

  updateReadingProgress();

  /* ---------------------------------------------
     04. BACK TO TOP
  --------------------------------------------- */

  if (backToTop) {

    backToTop.addEventListener("click", () => {

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "instant" : "smooth"
      });

    });

  }

  /* ---------------------------------------------
     05. ACTIVE NAVIGATION
  --------------------------------------------- */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  function updateActiveNavigation() {

    const position = window.scrollY + 160;

    let currentSection = "home";

    sections.forEach((section) => {

      if (section.offsetTop <= position) {
        currentSection = section.id;
      }

    });

    navLinks.forEach((link) => {

      const target = link.getAttribute("href");

      const active = target === `#${currentSection}`;

      link.classList.toggle("active", active);

      if (active) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }

    });

  }

  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    updateActiveNavigation
  );

  updateActiveNavigation();

  /* ---------------------------------------------
     06. TECHNOLOGY EXPLORER
  --------------------------------------------- */

  const technologyData = [

    {
      label: "COMPONENT 01",
      title: "Rule-Based Eligibility",
      description:
        "Transparent rules would assess mandatory " +
        "requirements before any recommendation is " +
        "generated. These include the appropriate SIA " +
        "licence, relevant assignment conditions and " +
        "other essential eligibility criteria. " +
        "The proposed process would need reliable " +
        "data and an appropriate verification method."
    },

    {
      label: "COMPONENT 02",
      title: "AI-Assisted Recommendations",
      description:
        "Once eligibility has been established, a " +
        "future recommendation system could assess " +
        "relevant experience, competencies, location " +
        "and availability to suggest suitable workers. " +
        "Its effectiveness, accuracy and fairness " +
        "would need to be evaluated before operational use."
    },

    {
      label: "COMPONENT 03",
      title: "Human Oversight",
      description:
        "Authorised decision-makers would review " +
        "recommendations, consider relevant context " +
        "and retain responsibility for the final " +
        "assignment decision. Human oversight would " +
        "help address limitations, exceptions and " +
        "potentially unsuitable automated suggestions."
    }

  ];

  function setTechnology(index) {

    if (
      !technologyDetail ||
      !technologyData[index]
    ) {
      return;
    }

    const item = technologyData[index];

    technologyButtons.forEach((button) => {

      const selected =
        Number(button.dataset.tech) === index;

      button.classList.toggle(
        "active",
        selected
      );

      button.setAttribute(
        "aria-pressed",
        String(selected)
      );

    });

    technologyDetail.innerHTML = `
      <span class="detail-label">
        ${item.label}
      </span>

      <h4>${item.title}</h4>

      <p>${item.description}</p>
    `;

  }

  technologyButtons.forEach((button) => {

    button.addEventListener("click", () => {

      setTechnology(
        Number(button.dataset.tech)
      );

    });

  });

  if (technologyButtons.length) {
    setTechnology(0);
  }

  /* ---------------------------------------------
     07. INTERACTIVE USER JOURNEY
  --------------------------------------------- */

  const journeyData = [

    {
      title: "Assignment Posted",
      description:
        "An organisation would create an assignment " +
        "specifying the location, date, working hours, " +
        "role, required SIA licence and relevant " +
        "professional competencies."
    },

    {
      title: "Eligibility Verification",
      description:
        "The proposed platform would assess mandatory " +
        "eligibility criteria using verified information. " +
        "Licence status would need to be checked through " +
        "an appropriate authorised verification process. " +
        "Workers who do not meet essential requirements " +
        "would not proceed to recommendation."
    },

    {
      title: "AI-Assisted Matching",
      description:
        "A proposed AI-assisted recommendation component " +
        "could compare eligible workers against the " +
        "assignment requirements, including relevant " +
        "experience, skills, availability and location. " +
        "Recommendations would be advisory rather " +
        "than automatic employment decisions."
    },

    {
      title: "Human Review",
      description:
        "An authorised person would examine the " +
        "recommended candidates, consider the " +
        "assignment context and make the final " +
        "selection. The system would support, " +
        "rather than replace, professional judgement."
    },

    {
      title: "Assignment Outcome",
      description:
        "The selected professional would receive the " +
        "assignment details and could accept or decline " +
        "the opportunity. Once confirmed, the assignment " +
        "could be recorded for future evaluation. " +
        "ElionPeace could assess shortlisting efficiency, " +
        "candidate suitability and fairness to identify " +
        "possible improvements. This is a proposed " +
        "workflow, not an operational service."
    }

  ];

  let currentJourney = 0;

  function setJourney(index) {

    if (
      !journeyDetail ||
      index < 0 ||
      index >= journeyData.length
    ) {
      return;
    }

    currentJourney = index;

    const item = journeyData[index];

    journeyButtons.forEach((button) => {

      const selected =
        Number(button.dataset.journey) === index;

      button.classList.toggle(
        "active",
        selected
      );

      button.setAttribute(
        "aria-pressed",
        String(selected)
      );

    });

    const stageNumber = String(
      index + 1
    ).padStart(2, "0");

    journeyDetail.innerHTML = `
      <span class="detail-label">
        STAGE ${stageNumber} / 05
      </span>

      <h4>${item.title}</h4>

      <p>${item.description}</p>
    `;

    if (journeyPrevious) {
      journeyPrevious.disabled = index === 0;
    }

    if (journeyNext) {
      journeyNext.disabled =
        index === journeyData.length - 1;

      journeyNext.textContent =
        index === journeyData.length - 1
          ? "Journey Complete ✓"
          : "Next Stage →";
    }

  }

  journeyButtons.forEach((button) => {

    button.addEventListener("click", () => {

      setJourney(
        Number(button.dataset.journey)
      );

    });

  });

  if (journeyPrevious) {

    journeyPrevious.addEventListener("click", () => {

      setJourney(currentJourney - 1);

    });

  }

  if (journeyNext) {

    journeyNext.addEventListener("click", () => {

      setJourney(currentJourney + 1);

    });

  }

  if (journeyButtons.length) {
    setJourney(0);
  }

  /* ---------------------------------------------
     08. DIGITAL MATURITY MODEL
  --------------------------------------------- */

  const maturityData = [

    {
      title: "Manual Operations",
      description:
        "At the first level, recruitment and assignment " +
        "coordination rely mainly on manual processes, " +
        "such as telephone calls, emails and individual " +
        "records. Information may be fragmented, " +
        "making consistent eligibility checks and " +
        "workforce comparisons more difficult."
    },

    {
      title: "Digital Records",
      description:
        "At the second level, worker profiles, " +
        "qualifications, assignment requirements " +
        "and availability would be maintained in " +
        "structured digital records. Data quality, " +
        "access controls and reliable updating " +
        "would become essential foundations for " +
        "subsequent matching capabilities."
    },

    {
      title: "Rule-Based Matching",
      description:
        "At the third level, transparent rules " +
        "would assess mandatory eligibility and " +
        "assignment requirements. This would " +
        "establish a structured, auditable baseline " +
        "before introducing more complex " +
        "recommendation technologies."
    },

    {
      title: "AI-Assisted Recommendations",
      description:
        "At the fourth level, an AI-assisted " +
        "component could recommend suitable " +
        "eligible professionals using relevant " +
        "workforce and assignment data. Human " +
        "oversight, explainability and fairness " +
        "monitoring would remain necessary. " +
        "This is a proposed capability."
    },

    {
      title: "Continuous Evaluation",
      description:
        "At the fifth level, the organisation " +
        "would continuously assess the matching " +
        "process using evidence of effectiveness, " +
        "reliability, fairness and user outcomes. " +
        "Findings could inform improvements to " +
        "rules, data practices and recommendation " +
        "methods, subject to governance and review."
    }

  ];

  function setMaturity(index) {

    if (
      !maturityDetail ||
      !maturityData[index]
    ) {
      return;
    }

    const item = maturityData[index];

    maturityButtons.forEach((button) => {

      const selected =
        Number(button.dataset.level) === index;

      button.classList.toggle(
        "active",
        selected
      );

      button.setAttribute(
        "aria-pressed",
        String(selected)
      );

    });

    const levelNumber = String(
      index + 1
    ).padStart(2, "0");

    maturityDetail.innerHTML = `
      <span class="detail-label">
        LEVEL ${levelNumber} / 05
      </span>

      <h4>${item.title}</h4>

      <p>${item.description}</p>
    `;

  }

  maturityButtons.forEach((button) => {

    button.addEventListener("click", () => {

      setMaturity(
        Number(button.dataset.level)
      );

    });

  });

  if (maturityButtons.length) {
    setMaturity(2);
  }

  /* ---------------------------------------------
     09. FINAL INITIALISATION
  --------------------------------------------- */

  console.info(
    "ElionPeace Technology Innovation website ready."
  );

});
