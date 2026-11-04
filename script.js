(() => {
  const loader = document.getElementById('loader');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader?.classList.add('hide');
    }, 260);
  });


  const progress = document.getElementById('pageProgress');

  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? (window.scrollY / max) * 100 : 0;

    if (progress) {
      progress.style.width = `${value}%`;
    }
  };

  window.addEventListener('scroll', updateProgress, {
    passive: true
  });

  updateProgress();


  const words = [
    'automatización.',
    'eficiencia.',
    'integración.',
    'soluciones.',
    'resultados.'
  ];

  const dynamic = document.getElementById('dynamicWord');

  let wordIndex = 0;

  if (dynamic) {
    setInterval(() => {
      dynamic.classList.add('changing');

      setTimeout(() => {
        wordIndex =
          (wordIndex + 1)
          % words.length;

        dynamic.textContent =
          words[wordIndex];

        dynamic.classList.remove('changing');
      }, 220);
    }, 2700);
  }


  const reveals =
    document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    reveals.forEach((element) => {
      element.classList.add('reveal-ready');
    });

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add('visible');

            observer.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.1
        }
      );

    reveals.forEach((element) => {
      revealObserver.observe(element);
    });
  }


  const menuButton =
    document.getElementById('menuButton');

  const mobileMenu =
    document.getElementById('mobileMenu');

  const closeMenu = () => {
    menuButton?.classList.remove('open');

    menuButton?.setAttribute(
      'aria-expanded',
      'false'
    );

    mobileMenu?.classList.remove('open');

    mobileMenu?.setAttribute(
      'aria-hidden',
      'true'
    );

    document.body.classList.remove(
      'menu-open'
    );
  };


  menuButton?.addEventListener(
    'click',
    () => {
      const isOpen =
        !mobileMenu?.classList.contains('open');

      menuButton.classList.toggle(
        'open',
        isOpen
      );

      menuButton.setAttribute(
        'aria-expanded',
        String(isOpen)
      );

      mobileMenu?.classList.toggle(
        'open',
        isOpen
      );

      mobileMenu?.setAttribute(
        'aria-hidden',
        String(!isOpen)
      );

      document.body.classList.toggle(
        'menu-open',
        isOpen
      );
    }
  );


  mobileMenu
    ?.querySelectorAll('a')
    .forEach((link) => {
      link.addEventListener(
        'click',
        closeMenu
      );
    });


  document
    .querySelectorAll('.case-toggle')
    .forEach((button) => {
      button.addEventListener(
        'click',
        () => {
          const detail =
            button.parentElement
              ?.querySelector(
                '.case-detail'
              );

          if (!detail) {
            return;
          }

          const expanded =
            button.getAttribute(
              'aria-expanded'
            ) === 'true';

          button.setAttribute(
            'aria-expanded',
            String(!expanded)
          );

          detail.hidden =
            expanded;
        }
      );
    });


  const workflowNodes =
    [
      ...document.querySelectorAll(
        '[data-flow-step]'
      )
    ];

  let currentFlowStep = 0;


  const activateWorkflowStep = () => {
    workflowNodes.forEach(
      (node, index) => {
        node.classList.toggle(
          'active',
          index === currentFlowStep
        );
      }
    );

    currentFlowStep =
      (currentFlowStep + 1)
      % workflowNodes.length;
  };


  if (workflowNodes.length) {
    activateWorkflowStep();

    setInterval(
      activateWorkflowStep,
      1300
    );
  }


  const supportsHover =
    window.matchMedia(
      '(hover: hover)'
    ).matches;


  if (supportsHover) {
    document
      .querySelectorAll('.tilt-card')
      .forEach((card) => {
        card.addEventListener(
          'mousemove',
          (event) => {
            const rect =
              card.getBoundingClientRect();

            const rotateX =
              (
                0.5
                -
                (
                  event.clientY
                  -
                  rect.top
                )
                /
                rect.height
              )
              * 2;

            const rotateY =
              (
                (
                  event.clientX
                  -
                  rect.left
                )
                /
                rect.width
                -
                0.5
              )
              * 2;

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
          'mouseleave',
          () => {
            card.style.transform = '';
          }
        );
      });


    const scene =
      document.getElementById(
        'automationScene'
      );


    scene?.addEventListener(
      'mousemove',
      (event) => {
        const rect =
          scene.getBoundingClientRect();

        const x =
          (
            (
              event.clientX
              -
              rect.left
            )
            /
            rect.width
            -
            0.5
          )
          * 8;

        const y =
          (
            (
              event.clientY
              -
              rect.top
            )
            /
            rect.height
            -
            0.5
          )
          * 8;

        scene.style.transform =
          `
            perspective(1100px)
            rotateY(${x * 0.22}deg)
            rotateX(${-y * 0.18}deg)
          `;
      }
    );


    scene?.addEventListener(
      'mouseleave',
      () => {
        scene.style.transform = '';
      }
    );
  }


  const navLinks =
    document.querySelectorAll('.nav a');


  const navSections =
    [...navLinks]
      .map((link) =>
        document.querySelector(
          link.getAttribute('href')
        )
      )
      .filter(Boolean);


  if ('IntersectionObserver' in window) {
    const navObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            navLinks.forEach((link) => {
              link.classList.remove('active');
            });

            document
              .querySelector(
                `.nav a[href="#${entry.target.id}"]`
              )
              ?.classList.add('active');
          });
        },
        {
          threshold: 0.28
        }
      );

    navSections.forEach((section) => {
      navObserver.observe(section);
    });
  }


  const experience =
    document.querySelector(
      '.experience'
    );

  const timelineProgress =
    document.getElementById(
      'timelineProgress'
    );


  const updateTimeline = () => {
    if (
      !experience
      ||
      !timelineProgress
    ) {
      return;
    }

    const rect =
      experience.getBoundingClientRect();

    const start =
      window.innerHeight * 0.75;

    const percentage =
      Math.max(
        0,
        Math.min(
          100,
          (
            (
              start
              -
              rect.top
            )
            /
            rect.height
          )
          * 135
        )
      );

    timelineProgress.style.height =
      `${percentage}%`;
  };


  const lifecycle =
    document.getElementById(
      'lifecycleFlow'
    );

  const lifecycleProgress =
    document.getElementById(
      'lifecycleProgress'
    );

  const lifecycleSteps =
    [
      ...document.querySelectorAll(
        '.lifecycle-step'
      )
    ];


  const updateLifecycle = () => {
    if (
      !lifecycle
      ||
      !lifecycleProgress
    ) {
      return;
    }

    const rect =
      lifecycle.getBoundingClientRect();

    const viewportPoint =
      window.innerHeight * 0.72;

    const rawProgress =
      (
        viewportPoint
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
          rawProgress * 125
        )
      );

    lifecycleProgress.style.width =
      `${percentage}%`;


    lifecycleSteps.forEach(
      (step, index) => {
        const trigger =
          (
            (
              index + 0.5
            )
            /
            lifecycleSteps.length
          )
          * 100;

        step.classList.toggle(
          'active',
          percentage >= trigger
        );
      }
    );
  };


  const updateScrollAnimations = () => {
    updateTimeline();
    updateLifecycle();
  };


  window.addEventListener(
    'scroll',
    updateScrollAnimations,
    {
      passive: true
    }
  );


  window.addEventListener(
    'resize',
    updateScrollAnimations
  );


  updateScrollAnimations();
})();
