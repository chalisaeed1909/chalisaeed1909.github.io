/* ===== Nexcode Portfolio — Interactions ===== */

(function () {
  'use strict';

  const SKILLS = {
    frontend: [
      { name: 'HTML5', desc: 'Semantic structure & accessibility' },
      { name: 'CSS3', desc: 'Layouts, animations & design systems' },
      { name: 'JavaScript (ES6+)', desc: 'Modern syntax & DOM control' },
      { name: 'React.js', desc: 'Component-driven UI architecture' },
      { name: 'Responsive Web Design', desc: 'Mobile-first, fluid layouts' },
      { name: 'UI/UX Concepts', desc: 'User-centered interface design' },
      { name: 'Cross-Browser Compatibility', desc: 'Consistent experience everywhere' },
    ],
    backend: [
      { name: 'PHP', desc: 'Server-side logic & routing' },
      { name: 'MySQL Database Management', desc: 'Relational schema & queries' },
      { name: 'API Integration', desc: 'Connecting services & endpoints' },
      { name: 'Secure Data Architecture', desc: 'Auth, sessions & data safety' },
    ],
    strengths: [
      { name: 'Debugging & Problem Solving', desc: 'Root-cause analysis & fixes' },
      { name: 'Clean & Maintainable Code', desc: 'Readable, scalable codebase' },
      { name: 'Performance Optimization', desc: 'Speed, efficiency & best practices' },
      { name: 'Timely Project Delivery', desc: 'On-schedule, quality output' },
    ],
  };

  const skillGrid = document.getElementById('skill-grid');
  const skillTabs = document.querySelectorAll('.skill-tab');
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const downloadBtn = document.getElementById('download-resume');
  const footerYear = document.getElementById('footer-year');

  function renderSkills(category) {
    if (!skillGrid) return;
    skillGrid.innerHTML = '';
    SKILLS[category].forEach((skill, i) => {
      const card = document.createElement('div');
      card.className = 'skill-card enter';
      card.style.animationDelay = `${i * 0.06}s`;
      card.innerHTML = `
        <div class="skill-card-icon">⬡</div>
        <h4>${skill.name}</h4>
        <p>${skill.desc}</p>`;
      skillGrid.appendChild(card);
    });
    skillTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.category === category);
    });
  }

  function closeNav() {
    nav?.classList.remove('open');
    navToggle?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }

  function updateActiveNav() {
    let current = 'hero';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 140) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  function init() {
    renderSkills('frontend');
    updateActiveNav();

    // Dynamic footer year
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    // Scroll reveal via IntersectionObserver
    const revealEls = document.querySelectorAll('.reveal');
    revealEls.forEach(el => el.classList.add('reveal-hidden'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-hidden');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));

    // Typing animation on hero role
    const heroRole = document.querySelector('.hero-role');
    if (heroRole) {
      const lines = ['Developer', '& Designer'];
      const cursor = document.createElement('span');
      cursor.className = 'typed-cursor';
      heroRole.innerHTML = '';
      heroRole.appendChild(cursor);
      let lineIdx = 0, charIdx = 0, typing = true;
      const type = () => {
        const current = lines[lineIdx];
        if (typing) {
          if (charIdx <= current.length) {
            const br = lineIdx > 0 ? '' : '';
            heroRole.innerHTML = lines.slice(0, lineIdx).map((l,i) => `<span>${l}</span><br>`).join('') + `<span>${current.slice(0, charIdx)}</span>`;
            heroRole.appendChild(cursor);
            charIdx++;
            setTimeout(type, 65);
          } else {
            if (lineIdx < lines.length - 1) {
              lineIdx++;
              charIdx = 0;
              setTimeout(type, 300);
            } else {
              setTimeout(() => { typing = false; setTimeout(type, 60); }, 2000);
            }
          }
        } else {
          const lastLine = lines[lineIdx];
          if (charIdx > 0) {
            charIdx--;
            heroRole.innerHTML = lines.slice(0, lineIdx).map(l => `<span>${l}</span><br>`).join('') + `<span>${lastLine.slice(0, charIdx)}</span>`;
            heroRole.appendChild(cursor);
            setTimeout(type, 40);
          } else if (lineIdx > 0) {
            lineIdx--;
            charIdx = lines[lineIdx].length;
            setTimeout(type, 200);
          } else {
            typing = true; charIdx = 0; lineIdx = 0;
            setTimeout(type, 400);
          }
        }
      };
      setTimeout(type, 800);
    }

    skillTabs.forEach(tab => {
      tab.addEventListener('click', () => renderSkills(tab.dataset.category));
    });

    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        closeNav();
      });
    });

    window.addEventListener('scroll', () => {
      header?.classList.toggle('scrolled', window.scrollY > 50);
      updateActiveNav();
    }, { passive: true });

    navToggle?.addEventListener('click', () => {
      if (!nav) return;
      const open = nav.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });

    contactForm?.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const subject = encodeURIComponent(`Freelance Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:chalisaeed1909@gmail.com?subject=${subject}&body=${body}`;
      formStatus.textContent = 'Opening your email client…';
      formStatus.classList.add('show');
      contactForm.reset();
      setTimeout(() => formStatus.classList.remove('show'), 5000);
    });

    downloadBtn?.addEventListener('click', downloadResume);
  }

  function loadJsPDF() {
    return new Promise((resolve, reject) => {
      if (window.jspdf?.jsPDF) return resolve(window.jspdf.jsPDF);
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script.onload = () => resolve(window.jspdf.jsPDF);
      script.onerror = () => reject(new Error('PDF library failed to load'));
      document.head.appendChild(script);
    });
  }

  function buildResumePDF(jsPDF) {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const margin = 18;
    const pageW = doc.internal.pageSize.getWidth();
    const maxW = pageW - margin * 2;
    let y = 22;

    const checkPage = (need = 10) => {
      if (y + need > 285) { doc.addPage(); y = 20; }
    };

    const section = (title) => {
      checkPage(14);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(0, 102, 170);
      doc.text(title.toUpperCase(), margin, y);
      y += 5;
      doc.setDrawColor(0, 102, 170);
      doc.setLineWidth(0.4);
      doc.line(margin, y, pageW - margin, y);
      y += 7;
    };

    const body = (text, size = 10) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(size);
      doc.setTextColor(45, 45, 45);
      doc.splitTextToSize(text, maxW).forEach(line => {
        checkPage(6);
        doc.text(line, margin, y);
        y += 5;
      });
      y += 2;
    };

    const bullet = (text) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(45, 45, 45);
      doc.splitTextToSize('• ' + text, maxW - 4).forEach((line, i) => {
        checkPage(6);
        doc.text(line, margin + (i === 0 ? 0 : 4), y);
        y += 5;
      });
      y += 1;
    };

    const project = (title, desc) => {
      checkPage(12);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 20);
      doc.text(title, margin, y);
      y += 5;
      body(desc, 9.5);
    };

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(13, 27, 42);
    doc.text('Ali Saeed', margin, y);
    y += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(80, 80, 80);
    doc.text('Lahore, Pakistan  |  chalisaeed1909@gmail.com  |  +92 316-7575318', margin, y);
    y += 5;
    doc.text('linkedin.com/in/ali-saeed-608250405', margin, y);
    y += 10;

    section('Objective');
    body('Motivated Software Engineering student seeking a Software Development or Web Development internship to apply technical skills in real-world projects within a collaborative environment.');

    section('Education');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(20, 20, 20);
    doc.text('Bachelor of Software Engineering (Ongoing)', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('2023 — Present', pageW - margin - 28, y);
    y += 5;
    body('FAST National University of Computer and Emerging Sciences, Chiniot-Faisalabad Campus', 9.5);

    section('Technical Skills');
    bullet('Languages: C++, JavaScript, Python (Basic), HTML5, CSS3');
    bullet('Web & UI/UX: Responsive Design, WordPress, Figma, Prototyping');
    bullet('Databases: SQL, PL/SQL, Database Design, Normalization');
    bullet('Core Concepts: Data Structures, OOP, Software Design & Architecture, AI, SQE');
    y += 2;

    section('Projects');
    project('Tic Tac Toe (C++)', 'Built a console-based game using OOP concepts — modular code structure, logic building, and problem-solving.');
    project('Database Management System (SQL)', 'Designed ERD and relational schema, performed CRUD operations, and applied normalization to improve data efficiency.');
    project('Traffic Management System (Python)', 'Python-based system to manage vehicle records, control traffic signals, monitor congestion, and generate reports.');
    project('TestOps Framework Analysis (SQE)', 'Analyzed TestOps practices and testing frameworks for continuous testing, automation, and CI/CD integration.');
    project('Luminary Image Gallery (HTML/CSS/JS)', 'Interactive gallery with category filters, masonry layout, lightbox viewer, and responsive design.');
    project('Drive Ease — Car Rental System (React + PHP + MySQL)', 'Full-stack application with live booking, secure authentication, and mobile-first UI.');

    section('Certifications');
    bullet('Front-End Web Development Internship — CodeAlpha');
    bullet('Battle-101 Coding Competition');
    bullet('SE-Quiz (FAST-NESCON)');
    y += 2;

    section('Languages');
    bullet('English — Fluent');
    bullet('Urdu — Native');

    return doc;
  }

  async function downloadResume() {
    if (!downloadBtn) return;
    const original = downloadBtn.innerHTML;
    downloadBtn.disabled = true;
    downloadBtn.textContent = 'Generating PDF…';

    try {
      const jsPDF = await loadJsPDF();
      const doc = buildResumePDF(jsPDF);
      doc.save('Ali-Saeed-Resume.pdf');
    } catch {
      window.open('resume.html', '_blank');
      alert('PDF library unavailable. Resume opened in a new tab — use Print > Save as PDF.');
    } finally {
      downloadBtn.disabled = false;
      downloadBtn.innerHTML = original;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
