(function () {
  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav-toggle");
  const navShell = document.querySelector(".nav-shell");

  if (nav && navToggle) {
    const setNavState = (open) => {
      nav.classList.toggle("nav--open", open);
      navToggle.classList.toggle("nav-toggle--open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    };

    navToggle.addEventListener("click", () => {
      const next = !nav.classList.contains("nav--open");
      setNavState(next);
    });

    nav
      .querySelectorAll("a")
      .forEach((link) =>
        link.addEventListener("click", () => setNavState(false)),
      );

    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("nav--open")) return;
      if (navShell && navShell.contains(e.target)) return;
      setNavState(false);
    });

    setNavState(false);
  }

  // Animated counters
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.45 },
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  function animateCount(el) {
    const target = parseFloat(el.dataset.count || "0");
    const suffix = el.dataset.suffix || "";
    const duration = 1500;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.floor(progress * target);
      el.textContent = `${current}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${target}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  }

  const countryData = [
    {
      name: "Czech Republic",
      flag: "https://flagcdn.com/w40/cz.png",
      sectors:
        "Logistics centers and warehouses, plants and factories, agricultural and seasonal programs.",
      salary: "€1,100–1,500 per month.",
      conditions: "Accommodation and transportation are provided.",
      image: "image/chech-rep.jpg",
    },
    {
      name: "Poland",
      flag: "https://flagcdn.com/w40/pl.png",
      sectors:
        "Manufacturing enterprises, warehouses and logistics, seasonal programs, meat processing plants.",
      salary: "€1,000–1,400 per month.",
      conditions: "Accommodation and transportation are provided.",
      image: "image/poland.jpg",
    },
    {
      name: "Slovakia",
      flag: "https://flagcdn.com/w40/sk.png",
      sectors:
        "Industrial plants, manufacturing enterprises, warehouse complexes.",
      salary: "€1,000–1,300 per month.",
      conditions: "Accommodation and transportation are provided.",
      image: "image/slovakia.jpg",
    },
    {
      name: "Germany",
      flag: "https://flagcdn.com/w40/de.png",
      sectors:
        "Manufacturing and automotive plants, construction projects, warehouse logistics, cleaning.",
      salary: "€1,500–1,900 per month (for third-country nationals).",
      conditions: "Accommodation and transportation are provided.",
      image: "image/germany.jpg",
    },
    {
      name: "Hungary",
      flag: "https://flagcdn.com/w40/hu.png",
      sectors: "Plants and factories, warehouse logistics, seasonal programs.",
      salary: "€900–1,200 per month.",
      conditions: "Accommodation and transportation are provided.",
      image: "image/hungary.jpg",
    },
    {
      name: "Ukraine",
      flag: "https://flagcdn.com/w40/ua.png",
      sectors:
        "Manufacturing enterprises, agricultural programs, logistics and service sectors.",
      salary: "€800–1,200 per month (depending on the project).",
      conditions:
        "Accommodation and transportation are provided within program frameworks.",
      image: "image/ukraine.jpg",
    },
    {
      name: "Serbia",
      flag: "https://flagcdn.com/w40/rs.png",
      sectors:
        "Agriculture, construction work, basic manual and service positions.",
      salary: "€600–900 per month.",
      conditions: "Accommodation and transportation are provided.",
      image: "image/serbia.jpg",
    },
    {
      name: "Montenegro",
      flag: "https://flagcdn.com/w40/me.png",
      sectors: "Seasonal programs in tourism and service industries.",
      salary: "€800–1,100 per month.",
      conditions: "Accommodation and transportation are provided.",
      image: "image/montenegro.jpg",
    },
    {
      name: "Turkey",
      flag: "https://flagcdn.com/w40/tr.png",
      sectors: "Seasonal programs, manufacturing enterprises, hotel sector.",
      salary: "€700–1,000 per month.",
      conditions: "Accommodation and transportation are provided.",
      image: "image/turkey.jpg",
    },
    {
      name: "Portugal",
      flag: "https://flagcdn.com/w40/pt.png",
      sectors:
        "Agriculture, manufacturing enterprises, service and seasonal programs.",
      salary: "€1,000–1,300 per month.",
      conditions: "Accommodation and transportation are provided.",
      image: "image/portugal.jpg",
    },
  ];

  const tabsContainer = document.getElementById("countryTabs");
  const nameEl = document.getElementById("countryName");
  const sectorsEl = document.getElementById("countrySectors");
  const salaryEl = document.getElementById("countrySalary");
  const conditionsEl = document.getElementById("countryConditions");
  const imageEl = document.getElementById("countryImage");

  const defaultCountryIndex = 0;

  function renderTabs() {
    if (!tabsContainer) return;
    tabsContainer.innerHTML = "";
    countryData.forEach((c, idx) => {
      const btn = document.createElement("button");
      btn.className =
        "country-tab" + (idx === defaultCountryIndex ? " active" : "");
      btn.dataset.index = idx;
      btn.innerHTML = `
          <img class="country-flag" src="${c.flag}" alt="${c.name} flag" />
          <span>${c.name}</span>
        `;
      btn.addEventListener("click", () => setActive(idx, true));
      tabsContainer.appendChild(btn);
    });
  }

  function setActive(i, scrollIntoView = false) {
    const tabs = document.querySelectorAll(".country-tab");
    tabs.forEach((tab, idx) => {
      tab.classList.toggle("active", idx === i);
      if (scrollIntoView && idx === i) {
        tab.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    });
    const c = countryData[i];
    if (!c) return;
    if (nameEl) nameEl.textContent = c.name;
    if (sectorsEl) sectorsEl.textContent = c.sectors;
    if (salaryEl) salaryEl.textContent = c.salary;
    if (conditionsEl) conditionsEl.textContent = c.conditions;
    if (imageEl) {
      imageEl.src = c.image;
      imageEl.alt = c.name;
    }
  }

  renderTabs();
  setActive(defaultCountryIndex, false);
})();
