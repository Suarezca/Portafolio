(() => {
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => setTimeout(() => loader?.classList.add('hide'), 260));

  const progress = document.getElementById('pageProgress');
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const words = ['automatización.', 'eficiencia.', 'integración.', 'soluciones.', 'resultados.'];
  const dynamic = document.getElementById('dynamicWord');
  let wi = 0;
  if (dynamic) setInterval(() => {
    dynamic.classList.add('changing');
    setTimeout(() => {
      wi = (wi + 1) % words.length;
      dynamic.textContent = words[wi];
      dynamic.classList.remove('changing');
    }, 220);
  }, 2700);

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    reveals.forEach(el => el.classList.add('reveal-ready'));
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: .1 });
    reveals.forEach(el => obs.observe(el));
  }

  const menuButton = document.getElementById('menuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = () => {
    menuButton?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    mobileMenu?.classList.remove('open');
    mobileMenu?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  menuButton?.addEventListener('click', () => {
    const open = !mobileMenu.classList.contains('open');
    menuButton.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    mobileMenu.classList.toggle('open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  document.querySelectorAll('.case-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const detail = btn.parentElement.querySelector('.case-detail');
      if (!detail) return;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      detail.hidden = expanded;
    });
  });

  const hover = window.matchMedia('(hover:hover)').matches;
  if (hover) {
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const rx = (.5 - (e.clientY - r.top) / r.height) * 2;
        const ry = ((e.clientX - r.left) / r.width - .5) * 2;
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
      });
      card.addEventListener('mouseleave', () => card.style.transform = '');
    });

    const scene = document.getElementById('automationScene');
    scene?.addEventListener('mousemove', e => {
      const r = scene.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - .5) * 8;
      const y = ((e.clientY - r.top) / r.height - .5) * 8;
      scene.style.transform = `perspective(1100px) rotateY(${x * .22}deg) rotateX(${-y * .18}deg)`;
    });
    scene?.addEventListener('mouseleave', () => scene.style.transform = '');
  }

  const navLinks = document.querySelectorAll('.nav a');
  const sections = [...navLinks].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const navObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        navLinks.forEach(a => a.classList.remove('active'));
        document.querySelector(`.nav a[href="#${e.target.id}"]`)?.classList.add('active');
      });
    }, { threshold: .28 });
    sections.forEach(s => navObs.observe(s));
  }

  const exp = document.querySelector('.experience');
  const tProgress = document.getElementById('timelineProgress');
  const updateTimeline = () => {
    if (!exp || !tProgress) return;
    const r = exp.getBoundingClientRect();
    const start = window.innerHeight * .75;
    const pct = Math.max(0, Math.min(100, ((start - r.top) / r.height) * 135));
    tProgress.style.height = `${pct}%`;
  };
  window.addEventListener('scroll', updateTimeline, { passive: true });
  updateTimeline();
})();
