/**
 * WIN TECH DIGITAL PARTNER - JAVASCRIPT INTERACTIONS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header with Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  
  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('open');
      mobileNavDrawer.classList.toggle('open');
      const isExpanded = mobileMenuBtn.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when clicking a link
    mobileNavDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('open');
        mobileNavDrawer.classList.remove('open');
      });
    });
  }

  // 3. Enquiry Modal Functionality
  const enquiryModal = document.getElementById('enquiryModal');
  const openEnquiryBtns = document.querySelectorAll('.trigger-enquiry-modal');
  const closeEnquiryBtn = document.getElementById('closeEnquiryModal');
  const enquiryForm = document.getElementById('enquiryForm');
  const enquirySuccessMsg = document.getElementById('enquirySuccessMsg');

  function openEnquiry() {
    enquiryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeEnquiry() {
    enquiryModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openEnquiryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openEnquiry();
    });
  });

  if (closeEnquiryBtn) {
    closeEnquiryBtn.addEventListener('click', closeEnquiry);
  }

  if (enquiryModal) {
    enquiryModal.addEventListener('click', (e) => {
      if (e.target === enquiryModal) {
        closeEnquiry();
      }
    });
  }

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = enquiryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        enquiryForm.reset();
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
        enquirySuccessMsg.style.display = 'block';
        setTimeout(() => {
          enquirySuccessMsg.style.display = 'none';
          closeEnquiry();
        }, 2200);
      }, 700);
    });
  }

  // 4. Search Modal & Live Filtering
  const searchModal = document.getElementById('searchModal');
  const openSearchBtn = document.getElementById('openSearchBtn');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const searchInput = document.getElementById('searchInput');
  const searchResultsList = document.getElementById('searchResultsList');

  const searchableItems = [
    { title: 'MERN Stack Development', type: 'IT Course', link: '#courses' },
    { title: 'Python Programming & Data Structures', type: 'IT Course', link: '#courses' },
    { title: 'Java Full Stack Development', type: 'IT Course', link: '#courses' },
    { title: 'Generative AI & Prompt Engineering', type: 'IT Course', link: '#courses' },
    { title: 'AI & Machine Learning Specialization', type: 'IT Course', link: '#courses' },
    { title: 'Full Stack Web Development', type: 'IT Course', link: '#courses' },
    { title: 'Frontend Web Development (React / HTML / CSS)', type: 'IT Course', link: '#courses' },
    { title: 'WordPress CMS Development', type: 'IT Course', link: '#courses' },
    { title: 'Digital Marketing & SEO', type: 'IT Course', link: '#courses' },
    { title: 'Website Design & Development', type: 'IT Service', link: '#services' },
    { title: 'Mobile App Development (iOS & Android)', type: 'IT Service', link: '#services' },
    { title: 'Custom Software Development', type: 'IT Service', link: '#services' },
    { title: 'AI Automation & Chatbots', type: 'IT Service', link: '#services' },
    { title: 'Graphic & UI/UX Design', type: 'IT Service', link: '#services' },
    { title: 'UGC Approved Distance Degree Programmes', type: 'Distance Edu', link: '#distance' },
    { title: 'Distance MBA & MCA Guidance', type: 'Distance Edu', link: '#distance' },
    { title: 'Undergraduate (BBA, BCA, B.Com) Distance Education', type: 'Distance Edu', link: '#distance' }
  ];

  function openSearch() {
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 100);
    renderSearchResults('');
  }

  function closeSearch() {
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderSearchResults(filterTerm) {
    searchResultsList.innerHTML = '';
    const filtered = searchableItems.filter(item => 
      item.title.toLowerCase().includes(filterTerm.toLowerCase()) || 
      item.type.toLowerCase().includes(filterTerm.toLowerCase())
    );

    if (filtered.length === 0) {
      searchResultsList.innerHTML = `
        <div style="text-align: center; padding: 24px 0; color: #64748b; font-size: 0.9rem;">
          No matching courses or services found.
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const a = document.createElement('a');
      a.href = item.link;
      a.className = 'search-result-item';
      a.innerHTML = `
        <span style="font-weight: 600; color: #1e293b; font-size: 0.88rem;">${item.title}</span>
        <span class="search-item-badge">${item.type}</span>
      `;
      a.addEventListener('click', () => {
        closeSearch();
      });
      searchResultsList.appendChild(a);
    });
  }

  if (openSearchBtn) openSearchBtn.addEventListener('click', openSearch);
  if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value.trim());
    });
  }
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }

  // Keyboard shortcut Esc to close any open modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeEnquiry();
      closeSearch();
    }
  });

  // 5. Testimonial Carousel
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  let currentSlide = 0;
  let carouselInterval;

  function goToSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'), 10);
      goToSlide(index);
      resetInterval();
    });
  });

  function startInterval() {
    carouselInterval = setInterval(nextSlide, 5000);
  }

  function resetInterval() {
    clearInterval(carouselInterval);
    startInterval();
  }

  if (slides.length > 0) {
    startInterval();
  }

  // 6. Number Counter Animation on Scroll
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1500;
          const stepTime = 25;
          const stepCount = duration / stepTime;
          const increment = target / stepCount;

          const counter = setInterval(() => {
            count += increment;
            if (count >= target) {
              stat.innerText = target + suffix;
              clearInterval(counter);
            } else {
              stat.innerText = Math.floor(count) + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
});
