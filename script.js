(() => {

  /* ==================================
     FALLBACK PARA LOGOS
  ================================== */

  window.techFallback =
    function (image, text) {

      const parent =
        image.parentElement;

      if (!parent) {
        return;
      }

      image.remove();

      const fallback =
        document.createElement("span");

      fallback.className =
        "tech-fallback";

      fallback.textContent =
        text;

      fallback.style.fontSize =
        "9px";

      fallback.style.fontWeight =
        "800";

      fallback.style.color =
        "#34d6c7";

      parent.appendChild(
        fallback
      );

    };



  /* ==================================
     HERO WORDS
  ================================== */

  const dynamicWord =
    document.getElementById(
      "dynamicWord"
    );


  const words = [

    "automatización.",
    "eficiencia.",
    "integración.",
    "soluciones.",
    "resultados."

  ];


  let index = 0;


  if (dynamicWord) {

    setInterval(() => {

      dynamicWord
        .classList
        .add("changing");


      setTimeout(() => {

        index =
          (index + 1)
          % words.length;


        dynamicWord.textContent =
          words[index];


        dynamicWord
          .classList
          .remove("changing");

      }, 220);

    }, 2700);

  }



  /* ==================================
     SCROLL REVEAL
  ================================== */

  const revealItems =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    "IntersectionObserver"
    in window
  ) {

    revealItems.forEach(
      item => {

        item.classList.add(
          "reveal-ready"
        );

      }
    );


    const revealObserver =
      new IntersectionObserver(

        (entries, observer) => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target
                  .classList
                  .add("visible");


                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },

        {
          threshold: .1
        }

      );


    revealItems.forEach(
      item => {

        revealObserver.observe(
          item
        );

      }
    );

  }



  /* ==================================
     PROJECT DETAILS
  ================================== */

  document
    .querySelectorAll(
      ".case-toggle"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",

          () => {

            const project =
              button.closest(
                ".featured-project"
              );


            const detail =
              project?.querySelector(
                ".case-detail"
              );


            if (!detail) {
              return;
            }


            const expanded =
              button.getAttribute(
                "aria-expanded"
              ) === "true";


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



  /* ==================================
     PROJECT TILT
  ================================== */

  const cards =
    document.querySelectorAll(
      ".tilt-card"
    );


  const canHover =
    window.matchMedia(
      "(hover: hover)"
    ).matches;


  if (canHover) {

    cards.forEach(
      card => {

        card.addEventListener(
          "mousemove",

          event => {

            const rect =
              card.getBoundingClientRect();


            const x =
              event.clientX
              - rect.left;


            const y =
              event.clientY
              - rect.top;


            const rotateY =
              (
                x / rect.width
                - .5
              ) * 2;


            const rotateX =
              (
                .5
                - y / rect.height
              ) * 2;


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

      }
    );

  }



  /* ==================================
     ACTIVE NAV
  ================================== */

  const links =
    document.querySelectorAll(
      ".nav a"
    );


  const sections =
    [...links]
      .map(
        link =>
          document.querySelector(
            link.getAttribute(
              "href"
            )
          )
      )
      .filter(Boolean);


  if (
    "IntersectionObserver"
    in window
  ) {

    const navigationObserver =
      new IntersectionObserver(

        entries => {

          entries.forEach(
            entry => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }


              links.forEach(
                link => {

                  link.classList
                    .remove("active");

                }
              );


              const active =
                document.querySelector(
                  `.nav a[href="#${entry.target.id}"]`
                );


              active?.classList
                .add("active");

            }
          );

        },

        {
          threshold: .35
        }

      );


    sections.forEach(
      section => {

        navigationObserver
          .observe(section);

      }
    );

  }



  /* ==================================
     EXPERIENCE LINE
  ================================== */

  const experience =
    document.querySelector(
      ".experience"
    );


  const experienceProgress =
    document.querySelector(
      ".experience-line span"
    );


  function updateExperienceLine() {

    if (
      !experience
      ||
      !experienceProgress
    ) {
      return;
    }


    const rect =
      experience
        .getBoundingClientRect();


    const viewport =
      window.innerHeight;


    const start =
      viewport * .75;


    const total =
      rect.height;


    const travelled =
      start - rect.top;


    const percentage =
      Math.min(
        100,
        Math.max(
          0,
          travelled / total * 130
        )
      );


    experienceProgress
      .style
      .height =
        `${percentage}%`;

  }


  window.addEventListener(
    "scroll",
    updateExperienceLine,
    {
      passive: true
    }
  );


  updateExperienceLine();

})();
