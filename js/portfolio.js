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

function renderProjects(projects) {
    const projectContainer = document.getElementById('projectsContainer');
    let html = '';

    projects.forEach((project, index) => {
        const techStack = project.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');
        const githubLink = project.github 
            ? `<a href="${project.github}" target="_blank" class="btn btn-primary btn-sm">
                <i class="bi bi-github"></i> Lihat Github
              </a>`
            : '<span class="btn btn-secondary btn-sm disabled">Private</span>';

        html += `
            <div class="col-lg-4 col-md-6 mb-4 fade-in" style="animation-delay: ${index * 0.1}s;">
                <div class="card project-card h-100">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h5 class="card-title mb-1">${project.name}</h5>
                                <small class="text-muted">${project.year}</small>
                            </div>
                            <span class="badge bg-info">${project.category}</span>
                        </div>
                    </div>
                    <img src="${project.image}" class="card-img-top mx-auto" alt="${project.name}">
                    <div class="card-body">
                        <p class="card-text">${project.description}</p>
                        <div class="tech-stack">
                            ${techStack}
                        </div>
                    </div>
                    <div class="card-footer">
                        ${githubLink}
                    </div>
                </div>
            </div>
        `;
    });

    projectContainer.innerHTML = html;
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

document.querySelectorAll('.fade-in, .slide-in').forEach(el => {
    observer.observe(el);
});
