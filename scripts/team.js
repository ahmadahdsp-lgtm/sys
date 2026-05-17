// Simple counter animation when elements enter viewport
function animateCounters() {
  const counters = document.querySelectorAll('.stat-value');
  const options = { threshold: 0.5 };
  const cb = (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target')) || parseInt(el.textContent.replace(/\D/g,'')) || 0;
        let start = 0;
        const duration = 1200;
        const step = (timestamp) => {
          start += Math.ceil(target / (duration / 16));
          if (start >= target) { el.textContent = el.getAttribute('data-target'); return; }
          el.textContent = start;
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.unobserve(el);
      }
    });
  };
  const observer = new IntersectionObserver(cb, options);
  counters.forEach(c => observer.observe(c));
}

// Team filter buttons
function initTeamFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.team-item');
  buttons.forEach(btn => btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    items.forEach(it => {
      if (filter === 'all' || it.getAttribute('data-category') === filter) it.style.display = '';
      else it.style.display = 'none';
    });
  }));
}

// simple fade-up on scroll
function initFadeUp() {
  const els = document.querySelectorAll('.fade-up');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
}

document.addEventListener('DOMContentLoaded', () => { animateCounters(); initTeamFilters(); initFadeUp(); });
