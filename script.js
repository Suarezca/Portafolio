(() => {
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      menuButton.classList.toggle("open", isOpen);
      document.body.classList.toggle("menu-open", isOpen);
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuButton.classList.remove("open");
        document.body.classList.remove("menu-open");
      });
    });
  }

  const words = [
    "Automation Anywhere",
    "Ansible / AWX",
    "Python",
    "Selenium",
    "Integración de procesos"
  ];

  const dynamicWord = document.getElementById("dynamicWord");
  let wordIndex = 0;

  if (dynamicWord) {
    setInterval(() => {
      wordIndex = (wordIndex + 1) % words.length;
      dynamicWord.textContent = words[wordIndex];
    }, 2200);
  }

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  const navLinks = document.querySelectorAll(".nav a");
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => link.classList.remove("active"));

          const activeLink = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
          if (activeLink) activeLink.classList.add("active");
        });
      },
      {
        threshold: 0.35
      }
    );

    sections.forEach((section) => navObserver.observe(section));
  }
})();
