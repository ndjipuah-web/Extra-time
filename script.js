(function () {
    /* Elements */
    const menuToggle = document.getElementById('menuToggle');
    const leftNav = document.getElementById('siteLeftNav');
    const themeToggle = document.getElementById('themeToggle');
    const darkBtn = document.getElementById('darkBtn');
    const lightBtn = document.getElementById('lightBtn');
    const refreshFeedBtn = document.getElementById('refreshFeedBtn');
    const socialFeedContainer = document.getElementById('social-feed-container');
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMsg = document.getElementById('newsletterMsg');
    const liveClock = document.getElementById('liveClock');

    /* MOBILE MENU */
    if (menuToggle && leftNav) {
        menuToggle.addEventListener('click', () => {
            const open = leftNav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', String(open));
            // Toggle menu icon
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = open ? 'fas fa-times' : 'fas fa-bars';
            }
        });
    }

    /* THEME TOGGLING */
    const applyLight = () => {
        document.documentElement.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    };

    const applyDark = () => {
        document.documentElement.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    };

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        applyLight();
    } else {
        applyDark();
    }

    if (darkBtn) darkBtn.addEventListener('click', applyDark);
    if (lightBtn) lightBtn.addEventListener('click', applyLight);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (document.documentElement.classList.contains('light-mode')) {
                applyDark();
            } else {
                applyLight();
            }
        });
    }

    /* Social feed simulation */
    function fetchSocialSimulated() {
        const now = new Date();
        const minute = now.getMinutes();
        return [
            {
                text: 'Brave Warriors training session highlights 🔥',
                source: 'Twitter',
                time: 'Now',
                likes: Math.floor(100 + Math.random() * 900)
            },
            {
                text: 'Welwitschias announce traveling squad for qualifiers',
                source: 'Instagram',
                time: `${Math.max(1, minute % 60)}m`,
                likes: Math.floor(20 + Math.random() * 300)
            },
            {
                text: 'Local grassroots tournament this weekend — free entry!',
                source: 'Facebook',
                time: `${Math.max(1, (minute + 3) % 60)}m`,
                likes: Math.floor(5 + Math.random() * 120)
            }
        ];
    }

    function renderSocialFeed(items) {
        if (!socialFeedContainer) return;

        socialFeedContainer.innerHTML = '';
        const list = document.createElement('div');
        list.style.display = 'flex';
        list.style.flexDirection = 'column';
        list.style.gap = '8px';

        items.forEach(item => {
            const el = document.createElement('div');
            el.style.padding = '8px';
            el.style.borderRadius = '8px';
            el.style.background = 'linear-gradient(90deg, rgba(255,123,0,0.02), transparent)';
            el.style.border = '1px solid var(--border)';
            el.innerHTML = `
                <div style="display:flex;justify-content:space-between;align-items:center">
                    <div>
                        <div style="font-weight:800">${item.text}</div>
                        <div class="muted small">${item.source} • ${item.time}</div>
                    </div>
                    <div class="muted small">${item.likes} ❤</div>
                </div>
            `;
            list.appendChild(el);
        });

        socialFeedContainer.appendChild(list);
    }

    // Initialize social feed
    setTimeout(() => {
        if (socialFeedContainer) {
            renderSocialFeed(fetchSocialSimulated());
        }
    }, 700);

    if (refreshFeedBtn) {
        refreshFeedBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const icon = refreshFeedBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-spin');
                setTimeout(() => {
                    renderSocialFeed(fetchSocialSimulated());
                    icon.classList.remove('fa-spin');
                }, 900);
            }
        });
    }

    /* Newsletter */
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = document.getElementById('newsletterEmail');
            const email = emailInput ? emailInput.value.trim() : '';

            if (!newsletterMsg) return;

            if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
                newsletterMsg.style.display = 'block';
                newsletterMsg.textContent = 'Please enter a valid email address.';
                newsletterMsg.style.color = '#ff6b6b';
                return;
            }

            newsletterMsg.style.display = 'block';
            newsletterMsg.textContent = 'Thanks — subscribing...';
            newsletterMsg.style.color = 'var(--muted)';

            setTimeout(() => {
                newsletterMsg.textContent = 'Subscribed! Check your inbox for confirmation.';
                newsletterMsg.style.color = 'var(--accent)';
                if (newsletterForm) newsletterForm.reset();
            }, 900);
        });
    }

    /* Live clock simulation */
    let minuteCounter = 75;
    if (liveClock) {
        setInterval(() => {
            minuteCounter = Math.min(95, minuteCounter + Math.floor(Math.random() * 2));
            liveClock.textContent = 'Live ' + minuteCounter + "'";
        }, 7000);
    }

    /* SPORTS NAV: mobile behavior */
    document.querySelectorAll('.sports-inline-list .dropdown > a').forEach(link => {
        link.addEventListener('click', function (e) {
            if (window.innerWidth < 960) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('open');
                const expanded = parent.classList.contains('open');
                this.setAttribute('aria-expanded', String(expanded));
                const menu = parent.querySelector('.mega-menu');
                if (menu) {
                    menu.style.display = expanded ? 'flex' : 'none';
                }
            }
        });
    });

    /* Close mobile menu when clicking on a link */
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 820 && leftNav) {
                leftNav.classList.remove('open');
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    const icon = menuToggle.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                }
            }
        });
    });

    /* On resize */
    window.addEventListener('resize', function () {
        // Handle sports inline nav
        if (window.innerWidth < 960) {
            document.querySelectorAll('.sports-inline-list .mega-menu').forEach(m => {
                m.style.display = 'none';
            });
            document.querySelectorAll('.sports-inline-list .dropdown').forEach(d => {
                d.classList.remove('open');
            });
        } else {
            document.querySelectorAll('.sports-inline-list .dropdown.open').forEach(d => {
                d.classList.remove('open');
            });
        }

        // Handle sidebar
        if (window.innerWidth > 820 && leftNav && leftNav.classList.contains('open')) {
            leftNav.classList.remove('open');
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        }
    });

    /* Keyboard shortcut 't' toggles theme */
    window.addEventListener('keydown', function (e) {
        if ((e.key === 't' || e.key === 'T') && themeToggle) {
            themeToggle.click();
        }
    });

    /* Close menus when clicking outside */
    document.addEventListener('click', function (e) {
        // Close sports mega menus
        const isInsideSports = e.target.closest('.sports-inline-nav');
        if (!isInsideSports) {
            document.querySelectorAll('.sports-inline-list .mega-menu').forEach(m => {
                m.style.display = 'none';
            });
            document.querySelectorAll('.sports-inline-list .dropdown').forEach(d => {
                d.classList.remove('open');
            });
        }

        // Close mobile menu when clicking outside
        if (window.innerWidth < 820 && leftNav && leftNav.classList.contains('open')) {
            const isClickInsideNav = e.target.closest('.sidebar-left');
            const isClickOnToggle = e.target.closest('.mobile-menu-toggle');

            if (!isClickInsideNav && !isClickOnToggle) {
                leftNav.classList.remove('open');
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    const icon = menuToggle.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                }
            }
        }
    });

    /* Accessibility: enable menu show on focus */
    document.querySelectorAll('.sports-inline-list li > a').forEach(a => {
        a.addEventListener('focus', () => {
            if (window.innerWidth >= 960) {
                const menu = a.parentElement.querySelector('.mega-menu');
                if (menu) menu.style.display = 'flex';
            }
        });

        a.addEventListener('blur', () => {
            if (window.innerWidth >= 960) {
                const menu = a.parentElement.querySelector('.mega-menu');
                if (menu) setTimeout(() => {
                    if (!menu.matches(':focus-within')) {
                        menu.style.display = '';
                    }
                }, 150);
            }
        });
    });

    /* Set active page in sidebar */
    function setActiveSidebarLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === 'index.html' && href === '#')) {
                link.classList.add('active');
            }
        });
    }

    // Initialize active sidebar link
    setActiveSidebarLink();

    console.log('Extra-Time NamibiaSports initialized successfully.');
})();
