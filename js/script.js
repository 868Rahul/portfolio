// Utility function to escape HTML
function escapeHtml(text) {
  if (text == null) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Experience data (hardcoded since not in JSON structure)
const experiences = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "TechStart Inc.",
    period: "Jun 2024 - Aug 2024",
    description: "Developed and maintained React components for the main product dashboard. Collaborated with senior developers on API integration and implemented unit tests.",
    type: "internship"
  },
  {
    id: 2,
    title: "HackTech 2024 - 2nd Place",
    company: "University Hackathon",
    period: "Mar 2024",
    description: "Built an AI-powered accessibility tool for visually impaired users in 36 hours. Implemented voice navigation and screen reader optimization.",
    type: "hackathon"
  },
  {
    id: 3,
    title: "Open Source Contributor",
    company: "React Community",
    period: "Jan 2024 - Present",
    description: "Active contributor to open-source React projects. Submitted 15+ pull requests with bug fixes and feature enhancements.",
    type: "experience"
  },
  {
    id: 4,
    title: "AI/ML Research Assistant",
    company: "University AI Lab",
    period: "Sep 2023 - Dec 2023",
    description: "Assisted in research on natural language processing models. Prepared datasets and ran experiments for sentiment analysis projects.",
    type: "internship"
  },
  {
    id: 5,
    title: "CodeJam 2023 - Finalist",
    company: "Google Developer Group",
    period: "Nov 2023",
    description: "Reached finals in competitive programming competition. Solved algorithmic challenges under time pressure.",
    type: "hackathon"
  }
];

// Load Projects
async function loadProjects() {
  try {
    const response = await fetch('assets/data/projects.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projects = await response.json();
    const container = document.getElementById('projects-container');

    if (!container) {
      return;
    }

    if (!Array.isArray(projects)) {
      throw new Error('Projects data is not an array');
    }

    container.innerHTML = projects.map(project => {
      const title = project.title || '';
      const description = project.description || '';
      const github = project.github || '';
      const demo = project.demo || '';
      const tags = Array.isArray(project.tags) ? project.tags : [];

      const imagePath = project.image || '';
      const imageAlt = title || 'Project image';

      return `
      <article class="project-card group">
        <div class="relative h-48 bg-gradient-to-br from-secondary to-secondary/50 overflow-hidden rounded-t-xl">
          ${imagePath ? `
            <img src="${escapeHtml(imagePath)}" alt="${escapeHtml(imageAlt)}" 
                 class="w-full h-full object-cover"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="absolute inset-0 flex items-center justify-center hidden" style="display: none;">
              <div class="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                <span class="text-3xl font-bold text-primary">${title.charAt(0) || 'P'}</span>
              </div>
            </div>
          ` : `
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                <span class="text-3xl font-bold text-primary">${title.charAt(0) || 'P'}</span>
              </div>
            </div>
          `}
          <div class="absolute inset-0 bg-secondary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            ${project.github ? `
              <a href="${project.github}" target="_blank" rel="noopener noreferrer" 
                 class="p-3 rounded-full bg-card text-foreground hover:bg-primary hover:text-primary-foreground transition-colors" 
                 aria-label="View on GitHub">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            ` : ''}
            ${project.demo ? `
              <a href="${project.demo}" target="_blank" rel="noopener noreferrer" 
                 class="p-3 rounded-full bg-card text-foreground hover:bg-primary hover:text-primary-foreground transition-colors" 
                 aria-label="View live demo">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            ` : ''}
          </div>
        </div>
        <div class="p-5">
          <h3 class="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
            ${escapeHtml(title)}
          </h3>
          <p class="text-sm text-muted-foreground mb-4 line-clamp-2">
            ${escapeHtml(description)}
          </p>
          <div class="flex flex-wrap gap-2">
            ${tags.map(tag => `
              <span class="project-tag">${escapeHtml(tag)}</span>
            `).join('')}
          </div>
        </div>
      </article>
    `;
    }).join('');
  } catch (error) {
    const container = document.getElementById('projects-container');
    if (container) {
      container.innerHTML = '<p class="text-muted-foreground text-center py-8">Failed to load projects. Please try again later.</p>';
    }
  }
}

// Load Certifications
async function loadCertifications() {
  try {
    const response = await fetch('assets/data/certifications.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const certifications = await response.json();
    const container = document.getElementById('certifications-container');

    if (!container) {
      return;
    }

    if (!Array.isArray(certifications)) {
      throw new Error('Certifications data is not an array');
    }

    container.innerHTML = certifications.map(cert => {
      const title = cert.title || '';
      const issuer = cert.issuer || '';
      const date = cert.date || '';
      const verifyLink = cert.verifyLink || '';
      const imagePath = cert.image || '';
      const credentialId = cert.credentialId || '';

      return `
      <div class="certification-card group flex flex-col h-full" data-image="${escapeHtml(imagePath)}">
        <div class="w-full aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 transition-transform duration-300 overflow-hidden relative">
          ${imagePath ? `
            <img src="${escapeHtml(imagePath)}" alt="${escapeHtml(title)}" 
                 class="w-full h-full object-cover rounded-xl"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="w-full h-full flex items-center justify-center hidden" style="display: none;">
              <svg class="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
          ` : `
            <svg class="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
            </svg>
          `}
        </div>
        <div class="flex-1">
            <h3 class="font-bold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            ${escapeHtml(title)}
            </h3>
            <p class="text-sm text-muted-foreground mb-1">${escapeHtml(issuer)}</p>
            <p class="text-xs text-muted-foreground mb-1">${escapeHtml(date)}</p>
            ${credentialId ? `<p class="text-xs text-muted-foreground/70 mb-4">${escapeHtml(credentialId)}</p>` : '<p class="text-xs text-muted-foreground/70 mb-4"></p>'}
        </div>
        ${verifyLink && verifyLink !== '' && verifyLink !== '#' ? `
          <a href="${escapeHtml(verifyLink)}" target="_blank" rel="noopener noreferrer" 
             class="btn-outline w-full text-center mt-auto">
            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
            Verify
          </a>
        ` : ''}
      </div>
    `;
    }).join('');

    // Add click functionality for certificate modal - Simple click-only approach
    // Fixed for Brave browser which may trigger events on hover
    const certificationCards = container.querySelectorAll('.certification-card');
    let lastClickTime = 0; // Debounce to prevent rapid triggers

    certificationCards.forEach(card => {
      const imageContainer = card.querySelector('div[class*="aspect-video"]');

      if (imageContainer) {
        // Make the image container clickable
        imageContainer.style.cursor = 'pointer';

        // Simple click handler with debounce
        imageContainer.addEventListener('click', function (e) {
          // Debounce: ignore clicks within 300ms of each other
          const now = Date.now();
          if (now - lastClickTime < 300) return;
          lastClickTime = now;

          // Don't open if clicking a link inside
          if (e.target.closest('a')) return;

          e.stopPropagation();

          const imagePath = card.dataset.image;
          if (imagePath) {
            const modal = document.getElementById('certificate-modal');
            const modalImage = document.getElementById('certificate-modal-image');
            if (modal && modalImage) {
              modalImage.src = imagePath;
              modal.classList.remove('hidden');
              document.body.style.overflow = 'hidden';
            }
          }
        });
      }
    });
  } catch (error) {
    const container = document.getElementById('certifications-container');
    if (container) {
      container.innerHTML = '<p class="text-muted-foreground text-center py-8">Failed to load certifications. Please try again later.</p>';
    }
  }
}

// Load Education
async function loadEducation() {
  try {
    const response = await fetch('assets/data/education.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const education = await response.json();
    const container = document.getElementById('education-container');

    if (!container) {
      return;
    }

    if (!Array.isArray(education)) {
      throw new Error('Education data is not an array');
    }

    const educationHTML = education.map(edu => {
      const course = edu.course || '';
      const institution = edu.institution || '';
      const year = edu.year || '';
      const score = edu.score || '';
      const status = edu.status || '';
      const logo = edu.logo || '';
      const color = edu.color || 'primary';

      return `
      <div class="education-card">
        <div class="flex flex-col md:flex-row gap-6">
          <div class="flex-shrink-0">
            <div class="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden">
              ${logo ? `
                <img src="${escapeHtml(logo)}" alt="${escapeHtml(institution)}" 
                     class="w-full h-full object-contain p-2"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="w-full h-full flex items-center justify-center hidden" style="display: none;">
                  <svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v7m0 0v-7m0 7h6.75M12 21H5.25"></path>
                  </svg>
                </div>
              ` : `
                <svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v7m0 0v-7m0 7h6.75M12 21H5.25"></path>
                </svg>
              `}
            </div>
          </div>
          <div class="flex-1">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
              <div>
                <h3 class="font-bold text-lg text-foreground">${escapeHtml(course)}</h3>
                <p class="text-primary font-medium">${escapeHtml(institution)}</p>
              </div>
              <div class="text-sm text-muted-foreground flex items-center gap-4">
                <span>${escapeHtml(year)}</span>
                ${score ? `
                  <span class="px-2 py-1 bg-primary/10 text-primary rounded-md font-semibold">
                    ${escapeHtml(score)}
                  </span>
                ` : ''}
              </div>
            </div>
            <p class="text-muted-foreground">
              Status: <span class="font-semibold">${escapeHtml(status)}</span>
            </p>
          </div>
        </div>
      </div>
    `;
    }).join('');

    // Add View Resume button below education cards
    container.innerHTML = educationHTML + `
      <div class="flex justify-center mt-8">
        <a href="assets/Rahul_Singh_Resume.pdf" target="_blank" rel="noopener noreferrer" 
           class="btn-primary inline-flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          View Resume
        </a>
      </div>
    `;
  } catch (error) {
    const container = document.getElementById('education-container');
    if (container) {
      container.innerHTML = '<p class="text-muted-foreground text-center py-8">Failed to load education. Please try again later.</p>';
    }
  }
}

// Load Experience
function loadExperience() {
  const container = document.getElementById('experience-container');
  if (!container) return;

  const typeIcons = {
    internship: '<svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
    hackathon: '<svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>',
    experience: '<svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>'
  };

  const typeColors = {
    internship: 'bg-primary/10 text-primary border-primary/30',
    hackathon: 'bg-accent text-foreground border-border',
    experience: 'bg-secondary/50 text-secondary-foreground border-secondary'
  };

  container.innerHTML = `
    <div class="relative">
      <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5"></div>
      <div class="space-y-8">
        ${experiences.map((exp, index) => {
    const isEven = index % 2 === 0;
    return `
            <div class="relative flex flex-col md:flex-row items-start gap-4 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}">
              <div class="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full md:-translate-x-1/2 ring-4 ring-background z-10"></div>
              <div class="ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isEven ? 'md:pr-8 md:text-right' : 'md:pl-8'}">
                <div class="experience-card">
                  <div class="flex items-center gap-2 mb-2 ${isEven ? 'md:justify-end' : ''}">
                    <span class="px-2 py-1 text-xs font-medium rounded-full border ${typeColors[exp.type]}">
                      ${typeIcons[exp.type]}
                      ${exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                    </span>
                  </div>
                  <h3 class="font-bold text-foreground text-lg">${escapeHtml(exp.title)}</h3>
                  <p class="text-primary font-medium text-sm">${escapeHtml(exp.company)}</p>
                  <p class="text-muted-foreground text-sm mb-3">${escapeHtml(exp.period)}</p>
                  <p class="text-muted-foreground text-sm">${escapeHtml(exp.description)}</p>
                </div>
              </div>
              <div class="hidden md:block md:w-[calc(50%-2rem)]"></div>
            </div>
          `;
  }).join('')}
      </div>
    </div>
  `;
}

// Navigation handling
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const sidebar = document.getElementById('sidebar');
  const sidebarClose = document.getElementById('sidebar-close');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  // Toggle sidebar function
  function toggleSidebar() {
    if (sidebar && sidebarOverlay) {
      const isOpen = sidebar.classList.contains('show');

      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    }
  }

  // Open sidebar function
  function openSidebar() {
    if (sidebar && sidebarOverlay) {
      sidebar.classList.add('show');
      sidebarOverlay.classList.add('show');

      // Prevent body scroll on mobile
      // Prevent body scroll on mobile
      if (window.innerWidth < 1024) {
        document.body.style.overflow = 'hidden';
        document.body.classList.add('sidebar-open');
        // Removed position: fixed to prevent scroll reset issues
      }
    }
  }

  // Close sidebar function
  function closeSidebar() {
    if (sidebar && sidebarOverlay) {
      sidebar.classList.remove('show');
      sidebarOverlay.classList.remove('show');
      document.body.style.overflow = '';
      document.body.classList.remove('sidebar-open');
      document.body.classList.remove('sidebar-open');
      // Reset position logic removed
    }
  }

  // Smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-section');
      const href = link.getAttribute('href');
      const sectionId = targetId || (href ? href.substring(1) : null);
      const targetSection = sectionId ? document.getElementById(sectionId) : null;

      if (targetSection) {
        if (window.innerWidth < 1024) {
          // Mobile: Close sidebar FIRST, then scroll
          closeSidebar();
          setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        } else {
          targetSection.scrollIntoView({ behavior: 'smooth' });
          closeSidebar(); // Ensure sidebar closed if desktop toggled (unlikely)
        }

        // Close old mobile menu if present
        if (mobileMenu) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });

  // Sidebar toggle button (mobile) - replaces old mobile menu
  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSidebar();
    });
  }

  // Sidebar close button
  if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
  }

  // Close sidebar when clicking overlay
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // Close sidebar on window resize if it becomes desktop
  function handleResize() {
    if (window.innerWidth >= 1024) {
      // On desktop, ensure sidebar is visible and remove show class
      if (sidebar) {
        sidebar.classList.remove('show');
      }
      closeSidebar();
    } else {
      // On mobile, ensure sidebar is hidden by default
      if (sidebar && !sidebar.classList.contains('show')) {
        sidebar.style.transform = 'translateX(-100%)';
      }
    }
  }

  // Use debounced resize handler for better performance
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 150);
  });

  // Initialize sidebar state on page load
  function initializeSidebar() {
    if (window.innerWidth < 1024) {
      // Mobile: ensure sidebar is hidden
      if (sidebar) {
        sidebar.classList.remove('show');
        sidebar.style.transform = 'translateX(-100%)';
      }
      if (sidebarOverlay) {
        sidebarOverlay.classList.remove('show');
      }
    } else {
      // Desktop: ensure sidebar is visible
      if (sidebar) {
        sidebar.classList.remove('show');
        sidebar.style.transform = 'translateX(0)';
      }
      closeSidebar();
    }
  }

  // Initialize on page load
  initializeSidebar();

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 1024) {
      const isClickInsideSidebar = sidebar && sidebar.contains(e.target);
      const isClickOnMenuButton = mobileMenuBtn && mobileMenuBtn.contains(e.target);
      const isClickOnOverlay = sidebarOverlay && e.target === sidebarOverlay;

      if (!isClickInsideSidebar && !isClickOnMenuButton && !isClickOnOverlay && sidebar && sidebar.classList.contains('show')) {
        closeSidebar();
      }
    }
  });

  // Active section highlighting
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === id || link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// Contact form handling
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Simulate form submission
    alert('Thank you for your message! I\'ll get back to you soon.');
    form.reset();
  });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  loadCertifications();
  loadEducation();
  loadExperience();
  initNavigation();
  initContactForm();

  // Certificate modal close functionality
  const modal = document.getElementById('certificate-modal');
  const closeBtn = document.getElementById('certificate-modal-close');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }
});

