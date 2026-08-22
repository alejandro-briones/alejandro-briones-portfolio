(() => {
    const sectionSelector =
        "#about, #experience, #projects, #technologies, #education, #contact";

    const app = document.getElementById("app");

    let initialized = false;

    function initRevealAnimations(sections) {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        sections.forEach(section => {
            section.classList.add("motion-reveal");
        });

        if (reducedMotion || !("IntersectionObserver" in window)) {
            sections.forEach(section => {
                section.classList.add("is-visible");
            });

            return;
        }

        const visibleThreshold = window.innerHeight * 0.9;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();

            if (rect.top < visibleThreshold && rect.bottom > 0) {
                section.classList.add("is-visible");
            }
        });

        document.documentElement.classList.add("motion-ready");

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -8% 0px"
            }
        );

        sections.forEach(section => {
            if (!section.classList.contains("is-visible")) {
                observer.observe(section);
            }
        });
    }

    function initStaggerAnimations() {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion || !("IntersectionObserver" in window)) {
            return;
        }

        const groups = [
            {
                sectionSelector: "#experience",
                itemSelector: ".experience-item",
                delayStep: 90
            },
            {
                sectionSelector: "#projects",
                itemSelector: ".project-card",
                delayStep: 90
            }
        ];

        groups.forEach(group => {
            const section = document.querySelector(group.sectionSelector);

            if (!section) {
                return;
            }

            const items = [
                ...section.querySelectorAll(group.itemSelector)
            ];

            items.forEach((item, index) => {
                item.classList.add("motion-stagger");

                item.style.setProperty(
                    "--stagger-delay",
                    `${index * group.delayStep}ms`
                );
            });

            const observer = new IntersectionObserver(
                entries => {
                    const entry = entries[0];

                    if (!entry.isIntersecting) {
                        return;
                    }

                    items.forEach(item => {
                        item.classList.add("is-stagger-visible");
                    });

                    observer.disconnect();
                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -8% 0px"
                }
            );

            observer.observe(section);
        });
    }

    function initializePortfolioMotion() {
        if (initialized) {
            return true;
        }

        const sections = [
            ...document.querySelectorAll(sectionSelector)
        ];

        if (sections.length !== 6) {
            return false;
        }

        initRevealAnimations(sections);
        initStaggerAnimations();

        initialized = true;

        return true;
    }

    if (!initializePortfolioMotion()) {
        const renderObserver = new MutationObserver(() => {
            if (initializePortfolioMotion()) {
                renderObserver.disconnect();
            }
        });

        renderObserver.observe(app, {
            childList: true,
            subtree: true
        });
    }
})();