(() => {

  /* =====================================
     HERO WORD
  ====================================== */

  const dynamicWord =
    document.getElementById(
      "dynamicWord"
    );


  const words = [
    "procesos.",
    "datos.",
    "sistemas.",
    "infraestructura.",
    "soluciones."
  ];


  let wordIndex = 0;


  if (dynamicWord) {

    setInterval(() => {

      dynamicWord.classList.add(
        "changing"
      );


      setTimeout(() => {

        wordIndex =
          (wordIndex + 1)
          % words.length;


        dynamicWord.textContent =
          words[wordIndex];


        dynamicWord.classList.remove(
          "changing"
        );

      }, 180);

    }, 2800);

  }



  /* =====================================
     REVEAL
  ====================================== */

  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    "IntersectionObserver"
    in window
  ) {

    revealElements.forEach(
      (element) => {

        element.classList.add(
          "reveal-ready"
        );

      }
    );


    const revealObserver =
      new IntersectionObserver(

        (entries, observer) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }


              entry.target
                .classList
                .add("visible");


              observer.unobserve(
                entry.target
              );

            }
          );

        },

        {
          threshold: 0.12
        }

      );


    revealElements.forEach(
      (element) => {

        revealObserver.observe(
          element
        );

      }
    );

  }



  /* =====================================
     MOBILE MENU
  ====================================== */

  const menuButton =
    document.getElementById(
      "menuButton"
    );


  const mobileMenu =
    document.getElementById(
      "mobileMenu"
    );


  function closeMenu() {

    menuButton?.classList.remove(
      "open"
    );


    menuButton?.setAttribute(
      "aria-expanded",
      "false"
    );


    mobileMenu?.classList.remove(
      "open"
    );


    mobileMenu?.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.classList.remove(
      "menu-open"
    );

  }


  menuButton?.addEventListener(
    "click",

    () => {

      const open =
        !mobileMenu
          ?.classList
          .contains("open");


      menuButton.classList.toggle(
        "open",
        open
      );


      menuButton.setAttribute(
        "aria-expanded",
        String(open)
      );


      mobileMenu?.classList.toggle(
        "open",
        open
      );


      mobileMenu?.setAttribute(
        "aria-hidden",
        String(!open)
      );


      document.body.classList.toggle(
        "menu-open",
        open
      );

    }
  );


  mobileMenu
    ?.querySelectorAll("a")
    .forEach(
      (link) => {

        link.addEventListener(
          "click",
          closeMenu
        );

      }
    );



  /* =====================================
     AUTOMATION FLOW
  ====================================== */

  const flowNodes =
    [
      ...document.querySelectorAll(
        "[data-flow]"
      )
    ];


  let flowIndex = 0;


  function updateFlow() {

    flowNodes.forEach(
      (node, index) => {

        node.classList.toggle(
          "active",
          index === flowIndex
        );

      }
    );


    flowIndex =
      (
        flowIndex + 1
      )
      %
      flowNodes.length;

  }


  if (flowNodes.length) {

    updateFlow();


    setInterval(
      updateFlow,
      1400
    );

  }



  /* =====================================
     PROJECT DETAIL
  ====================================== */

  document
    .querySelectorAll(
      ".project-toggle"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",

          () => {

            const detail =
              button
                .parentElement
                ?.querySelector(
                  ".project-detail"
                );


            if (!detail) {
              return;
            }


            const expanded =
              button.getAttribute(
                "aria-expanded"
              )
              ===
              "true";


            button.setAttribute(
              "aria-expanded",
              String(!expanded)
            );


            detail.hidden =
              expanded;

          }
        );

      }
    );



  /* =====================================
     LIFECYCLE
  ====================================== */

  const lifecycle =
    document.getElementById(
      "lifecycle"
    );


  const lifecycleProgress =
    document.getElementById(
      "lifecycleProgress"
    );


  const lifecycleSteps =
    [
      ...document.querySelectorAll(
        ".lifecycle article"
      )
    ];


  function updateLifecycle() {

    if (
      !lifecycle
      ||
      !lifecycleProgress
    ) {
      return;
    }


    if (
      window.innerWidth <= 980
    ) {

      lifecycleSteps.forEach(
        (step) => {

          step.classList.add(
            "active"
          );

        }
      );


      lifecycleProgress.style.width =
        "100%";


      return;
    }


    const rect =
      lifecycle
        .getBoundingClientRect();


    const trigger =
      window.innerHeight
      *
      0.7;


    const raw =
      (
        trigger
        -
        rect.top
      )
      /
      Math.max(
        rect.height,
        1
      );


    const percentage =
      Math.max(
        0,
        Math.min(
          100,
          raw * 135
        )
      );


    lifecycleProgress
      .style
      .width =
        `${percentage}%`;


    lifecycleSteps.forEach(
      (step, index) => {

        const stepTrigger =
          (
            (
              index + 0.5
            )
            /
            lifecycleSteps.length
          )
          *
          100;


        step.classList.toggle(
          "active",
          percentage >= stepTrigger
        );

      }
    );

  }



  /* =====================================
     ACTIVE NAV
  ====================================== */

  const navLinks =
    document.querySelectorAll(
      ".nav a"
    );


  const navSections =
    [
      ...navLinks
    ]
      .map(
        (link) => {

          return document
            .querySelector(
              link.getAttribute(
                "href"
              )
            );

        }
      )
      .filter(Boolean);


  if (
    "IntersectionObserver"
    in window
  ) {

    const navObserver =
      new IntersectionObserver(

        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }


              navLinks.forEach(
                (link) => {

                  link.classList.remove(
                    "active"
                  );

                }
              );


              document
                .querySelector(
                  `.nav a[href="#${entry.target.id}"]`
                )
                ?.classList
                .add("active");

            }
          );

        },

        {
          threshold: 0.3
        }

      );


    navSections.forEach(
      (section) => {

        navObserver.observe(
          section
        );

      }
    );

  }



  /* =====================================
     SCROLL
  ====================================== */

  window.addEventListener(
    "scroll",
    updateLifecycle,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    updateLifecycle
  );


  updateLifecycle();

})();
