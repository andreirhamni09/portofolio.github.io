// Portfolio Dynamic Renderer
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        renderProjects(projects);
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function escapeHtml(str) {
    return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '<')
        .replaceAll('>', '>')
        .replaceAll('"', '"')
        .replaceAll("'", '&#039;');
}

function renderProjects(projects) {
    const projectContainer = document.getElementById('projectsContainer');

    if (!projectContainer) return;

    const html = projects.map((project, index) => {
        const name = escapeHtml(project.name ?? 'Untitled');
        const year = escapeHtml(project.year ?? '');
        const category = escapeHtml(project.category ?? '');
        const description = escapeHtml(project.description ?? '');

        const image = escapeHtml(project.image ?? '');

        const techStack = Array.isArray(project.tech) ? project.tech : [];
        const techBadges = techStack
            .map((t) => `<span class="service-badge">${escapeHtml(t)}</span>`)
            .join('');

        const hasGithub = Boolean(project.github && String(project.github).trim());
        const githubLink = hasGithub
            ? `<a href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Open ${name} repository on GitHub">Repository</a>`
            : `<span class="service-badge" aria-label="Repository not available">Private</span>`;

        // Demo link tidak ada pada projects.json saat ini, jadi hanya tampilkan repository.
        return `
            <article class="project-card fade-in" style="animation-delay: ${index * 0.08}s" aria-label="Project: ${name}">
                <div class="project-image">
                    ${image ? `<img src="${image}" loading="lazy" decoding="async" alt="${name} thumbnail">` : ''}
                </div>

                <div class="project-content">
                    <div class="project-meta">
                        <h3 class="project-title">${name}</h3>
                        ${year ? `<div class="project-year">${year}</div>` : ''}
                        ${category ? `<div class="project-category">${category}</div>` : ''}
                    </div>

                    <p class="project-description">${description}</p>

                    <div class="project-services" aria-label="Tech stack">${techBadges}</div>

                    <div class="project-links">${githubLink}</div>
                </div>
            </article>
        `;
    });

    projectContainer.innerHTML = html.join('');
}


// Initialize on page load
document.addEventListener('DOMContentLoaded', loadProjects);

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .project-card, .slide-in').forEach((el) => {
    observer.observe(el);
});
