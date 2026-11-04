(() => {

  // Animación suave cuando aparecen las secciones
  const revealItems =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, obs) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

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
          threshold: 0.12
        }
      );


    revealItems.forEach((item) => {

      observer.observe(item);

    });

  } else {

    revealItems.forEach((item) => {

      item.classList.add(
        "visible"
      );

    });

  }



  // Abrir y cerrar el detalle de cada proyecto
  document
    .querySelectorAll(".project-button")
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const card =
            button.closest(
              ".project-card"
            );


          const detail =
            card.querySelector(
              ".project-detail"
            );


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


          button.firstChild.textContent =
            expanded
              ? "Ver flujo "
              : "Ocultar flujo ";

        }
      );

    });

})();
