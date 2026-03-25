const nav = document.querySelector(".site-nav");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-menu a");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const heroTabs = document.querySelectorAll('.hero-toggle[role="tab"]');
const heroPanels = document.querySelectorAll('.hero-panel[role="tabpanel"]');
const pathFilters = document.querySelectorAll(".path-filter");
const timelineItems = document.querySelectorAll(".timeline-item[data-category]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -5% 0px"
    }
  );

  revealItems.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index * 35, 220)}ms`);
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (heroTabs.length && heroPanels.length) {
  const activateHeroTab = (targetTab) => {
    const targetPanel = targetTab.dataset.panel;

    heroTabs.forEach((tab) => {
      const isActive = tab === targetTab;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    heroPanels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== targetPanel;
    });
  };

  heroTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateHeroTab(tab));

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = (index + 1) % heroTabs.length;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = (index - 1 + heroTabs.length) % heroTabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = heroTabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      heroTabs[nextIndex].focus();
      activateHeroTab(heroTabs[nextIndex]);
    });
  });
}

if (pathFilters.length && timelineItems.length) {
  const activeCategories = new Set(["education", "projects", "work"]);

  const applyPathFilters = () => {
    timelineItems.forEach((item) => {
      const category = item.dataset.category;
      const isVisible = activeCategories.has(category);
      item.hidden = !isVisible;
    });
  };

  pathFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const category = filter.dataset.filter;

      if (activeCategories.has(category)) {
        if (activeCategories.size === 1) {
          return;
        }
        activeCategories.delete(category);
      } else {
        activeCategories.add(category);
      }

      const isActive = activeCategories.has(category);
      filter.setAttribute("aria-pressed", String(isActive));
      filter.classList.toggle("is-active", isActive);
      filter.classList.toggle("button-primary", isActive);
      filter.classList.toggle("button-secondary", !isActive);
      applyPathFilters();
    });
  });

  applyPathFilters();
}

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const activeLink = document.querySelector(`.nav-menu a[href="#${id}"]`);

        if (!activeLink) {
          return;
        }

        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.removeAttribute("aria-current"));
          activeLink.setAttribute("aria-current", "true");
        }
      });
    },
    {
      threshold: 0.4,
      rootMargin: "-20% 0px -45% 0px"
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}
