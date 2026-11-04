(() => {

  /* =================================================
     PALABRAS DINÁMICAS DEL HERO
  ================================================= */

  const dynamicWord =
    document.getElementById("dynamicWord");


  const words = [
    "automatización.",
    "eficiencia.",
    "integración.",
    "resultados."
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

      }, 240);

    }, 2800);

  }



  /* =================================================
     REVEAL ON SCROLL
  ================================================= */

  const reveals =
    document.querySelectorAll(
      ".reveal"
    );


  if ("IntersectionObserver" in window) {

    reveals.forEach((item) => {

      item.classList.add(
        "reveal-ready"
      );

    });


    const observer =
      new IntersectionObserver(
        (entries, obs) => {

          entries.forEach((entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );


              obs.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.1
        }
      );


    reveals.forEach((item) => {

      observer.observe(item);

    });

  }



  /* =================================================
     PROJECT DETAILS
  ================================================= */

  const toggles =
    document.querySelectorAll(
      ".case-toggle"
    );


  toggles.forEach((toggle) => {

    toggle.addEventListener(
      "click",
      () => {

        const container =
          toggle.closest(
            ".case-card, .featured-project"
          );


        const detail =
          container.querySelector(
            ".case-detail"
          );


        const expanded =
          toggle.getAttribute(
            "aria-expanded"
          ) === "true";


        toggle.setAttribute(
          "aria-expanded",
          String(!expanded)
        );


        detail.hidden =
          expanded;

      }
    );

  });



  /* =================================================
     CARD TILT
  ================================================= */

  const tiltCards =
    document.querySelectorAll(
      ".tilt-card"
    );


  const supportsHover =
    window.matchMedia(
      "(hover: hover)"
    ).matches;


  if (supportsHover) {

    tiltCards.forEach((card) => {

      card.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            card.getBoundingClientRect();


          const x =
            event.clientX
            - rect.left;


          const y =
            event.clientY
            - rect.top;


          const centerX =
            rect.width / 2;


          const centerY =
            rect.height / 2;


          const rotateY =
            (
              (x - centerX)
              / centerX
            ) * 1.2;


          const rotateX =
            (
              (centerY - y)
              / centerY
            ) * 1.2;


          card.style.transform =
            `
              perspective(1000px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
              translateY(-2px)
            `;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform =
            "";

        }
      );

    });

  }



  /* =================================================
     ACTIVE NAVIGATION
  ================================================= */

  const navLinks =
    document.querySelectorAll(
      ".nav a"
    );


  const sections =
    [...navLinks]
      .map((link) => {

        const id =
          link.getAttribute(
            "href"
          );


        return document.querySelector(
          id
        );

      })
      .filter(Boolean);


  if (
    sections.length
    && "IntersectionObserver" in window
  ) {

    const navObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (
              entry.isIntersecting
            ) {

              navLinks.forEach(
                (link) => {

                  link.classList.remove(
                    "active"
                  );

                }
              );


              const active =
                document.querySelector(
                  `.nav a[href="#${entry.target.id}"]`
                );


              if (active) {

                active.classList.add(
                  "active"
                );

              }

            }

          });

        },
        {
          threshold: 0.35
        }
      );


    sections.forEach((section) => {

      navObserver.observe(
        section
      );

    });

  }

})();
