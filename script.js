/* =========================================================
   REVOLUTION CLASSES — site script
   1. Content data        4. Scroll reveal + counters
   2. Faculty rendering   5. Navigation
   3. Gallery rendering   6. Enquiry form
   ========================================================= */

/* ---------- 1. Content data ---------- */
const FACULTY = [
  { no: "01", name: "Krishna Singh", qualification: "Ph.D. Maths", image: "assets/faculty-krishna-singh.jpg", description: "An experienced Mathematics mentor with a Ph.D. in the subject, known for breaking down complex problems into simple, exam-ready steps for every batch." },
  { no: "02", name: "Samrat Kohli", qualification: "M.A (English)", image: "assets/faculty-samrat.jpg", description: "Director of Revolution Classes and an M.A. in English, guiding students with a strong focus on language fundamentals, communication and overall academic growth." },
  { no: "03", name: "Shivam Kumar", qualification: "M.Sc (Physics)", image: "assets/faculty-shivam.jpg", description: "An M.Sc. Physics graduate who makes tricky concepts easy through practical examples, numericals and regular concept-testing sessions." },
  { no: "04", name: "Er. Ankit Kumar", qualification: "B.Tech (Mechanical)", image: "assets/faculty-ankit.jpg", description: "A Mechanical Engineering graduate bringing an application-based, real-world approach to teaching core science and technical subjects." },
  { no: "05", name: "Er. Aman Kumar", qualification: "B.Tech (Mechanical)", image: "assets/faculty-aman.jpg", description: "A B.Tech Mechanical Engineer focused on building strong fundamentals and problem-solving skills through structured practice." },
  { no: "06", name: "Ravikant Kumar", qualification: "B.Sc (Physics)", image: "assets/faculty-ravikant.jpg", description: "A B.Sc. Physics graduate dedicated to helping students strengthen their conceptual clarity through regular practice and doubt sessions." },
  { no: "07", name: "Kunal Kumar", qualification: "B.Ed, M.Sc (Mathematics)", image: "assets/faculty-kunal.jpg", description: "A B.Ed. and M.Sc. Mathematics faculty who combines strong subject knowledge with structured, student-friendly teaching methods." },
  { no: "08", name: "Digvijay Kumar", qualification: "BCA, MCA", image: "assets/faculty-digvijay.jpg", description: "A BCA and MCA graduate guiding students in computer science and technical subjects, with hands-on, project-based learning." },
  { no: "09", name: "Mansi Kumari", qualification: "B.Sc (Zoology) - Appearing", image: "assets/faculty-mansi.jpg", description: "Pursuing a B.Sc. in Zoology, bringing an enthusiastic and detail-oriented approach to teaching science to younger students." },
  { no: "10", name: "Rakhi Kumari", qualification: "B.Com", image: "assets/faculty-rakhi.jpg", description: "A B.Com graduate with a strong focus on commerce fundamentals, helping students build clarity in accounts, business and economics." },
  { no: "11", name: "Aryan Kumar", qualification: "M.A (English) • Gold Medalist", image: "assets/faculty-aryan.jpg", description: "A Gold Medalist M.A. English faculty who brings an award-winning academic record and a passion for strong language and communication skills." },
  { no: "12", name: "Sanaya Kumari", qualification: "B.A", image: "assets/faculty-sanaya.jpg", description: "A B.A. graduate committed to nurturing students with a friendly teaching style and personal attention to every learner's progress." },
  { no: "13", name: "Nidhi Kumari", qualification: "B.A (History)", image: "assets/faculty-nidhi.jpg", description: "A B.A. History graduate who makes history engaging through storytelling, timelines and regular revision practice." },
];

const GALLERY = [
  { icon: "🎉", title: "Celebration Together", text: "Happy moments with our Revolution Classes family.", image: "assets/gallery/gallery-1.jpg" },
  { icon: "📸", title: "Memorable Moments", text: "Capturing smiles, friendships and achievements.", image: "assets/gallery/gallery-2.jpg" },
  { icon: "🎂", title: "Special Celebration", text: "Sharing joy and unforgettable memories together.", image: "assets/gallery/gallery-3.jpg" },
  { icon: "🤝", title: "Growing Together", text: "A strong community of students and mentors.", image: "assets/gallery/gallery-4.jpg" },
  { icon: "🌟", title: "Student Community", text: "Confidence, learning and happiness in every journey.", image: "assets/gallery/gallery-5.jpg" },
  { icon: "🏆", title: "Team Spirit", text: "Celebrating milestones with our dedicated family.", image: "assets/gallery/gallery-6.jpg" },
  { icon: "🎓", title: "Academic Gathering", text: "Learning experiences that bring everyone closer.", image: "assets/gallery/gallery-7.jpg" },
  { icon: "💜", title: "Revolution Family", text: "Celebrating every step of our shared journey.", image: "assets/gallery/gallery-8.jpg" },
  { icon: "🎬", title: "Event Highlights", text: "Watch special moments from our celebration.", video: "assets/gallery/event-highlights.mp4", poster: "assets/gallery/gallery-1.jpg" },
];

const mobileQuery = window.matchMedia("(max-width: 767.98px)");
const isMobile = () => mobileQuery.matches;

/* ---------- 2. Faculty ---------- */
const facultyGrid = document.getElementById("facultyGrid");
const facultyDots = document.getElementById("facultyDots");

function renderFaculty() {
  if (!facultyGrid) return;

  // Cards live in one horizontal slider on every screen size.
  facultyGrid.innerHTML = FACULTY.map(
    (f, i) => `
      <div class="faculty-col">
        <article class="faculty-card" data-faculty-index="${i}" role="button" tabindex="0" aria-haspopup="dialog" aria-label="View details for ${f.name}">
          <div class="faculty-image">
            <img src="${f.image}" alt="${f.name}" loading="lazy" />
            <span class="faculty-number">${f.no}</span>
            <span class="faculty-view-overlay"><i class="bi bi-eye-fill"></i> View Details</span>
          </div>
          <div class="faculty-content">
            <h3 class="faculty-name">${f.name}</h3>
            <p class="faculty-qualification">${f.qualification}</p>
            <div class="faculty-bottom-line"></div>
          </div>
        </article>
      </div>`,
  ).join("");

  if (facultyDots) {
    facultyDots.innerHTML = FACULTY.map(
      (f, i) =>
        `<button type="button" class="${i === 0 ? "active" : ""}" aria-label="Show faculty ${i + 1}"></button>`,
    ).join("");
  }
}

/* Keep the mobile slider dots in sync with the swipe position. */
function setupFacultyDots() {
  if (!facultyGrid || !facultyDots) return;

  const dots = [...facultyDots.children];
  const cards = [...facultyGrid.children];
  if (!dots.length || !cards.length) return;

  const activate = (index) =>
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));

  let ticking = false;
  facultyGrid.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        activate(currentFacultyIndex());
        ticking = false;
      });
    },
    { passive: true },
  );

  dots.forEach((dot, i) =>
    dot.addEventListener("click", () => {
      scrollToCard(i);
      activate(i);
      startFacultyAutoplay();
    }),
  );
}

/* ---------- Faculty slider: arrows + autoplay ---------- */
const facultyPrev = document.getElementById("facultyPrev");
const facultyNext = document.getElementById("facultyNext");
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let facultyTimer = null;

function facultyCards() {
  return [...facultyGrid.children];
}

/* Phones centre the card; larger screens align it to the left edge. */
function cardAnchor(card) {
  return isMobile() ? card.offsetLeft + card.offsetWidth / 2 : card.offsetLeft;
}

function scrollToCard(index) {
  const cards = facultyCards();
  const card = cards[Math.max(0, Math.min(index, cards.length - 1))];
  if (!card) return;
  const padding = parseFloat(getComputedStyle(facultyGrid).paddingLeft) || 0;
  const left = isMobile()
    ? cardAnchor(card) - facultyGrid.clientWidth / 2
    : cardAnchor(card) - padding;
  facultyGrid.scrollTo({ left, behavior: "smooth" });
}

function currentFacultyIndex() {
  const cards = facultyCards();
  const padding = parseFloat(getComputedStyle(facultyGrid).paddingLeft) || 0;
  const probe = isMobile()
    ? facultyGrid.scrollLeft + facultyGrid.clientWidth / 2
    : facultyGrid.scrollLeft + padding;
  let nearest = 0;
  cards.forEach((card, i) => {
    if (Math.abs(cardAnchor(card) - probe) < Math.abs(cardAnchor(cards[nearest]) - probe)) nearest = i;
  });
  return nearest;
}

/* How many cards fit in view: 3 desktop, 2 tablet, 1 phone. */
function facultyPerView() {
  const cards = facultyCards();
  if (cards.length < 2) return 1;
  const step = cards[1].offsetLeft - cards[0].offsetLeft;
  return Math.max(1, Math.round(facultyGrid.clientWidth / step));
}

function facultyStep(direction) {
  const cards = facultyCards();
  const perView = facultyPerView();
  const last = Math.max(0, cards.length - perView);
  const current = currentFacultyIndex();
  let target = current + direction * perView;
  if (direction > 0 && current >= last) target = 0; // wrap to the start
  else if (direction < 0 && current <= 0) target = last; // wrap to the end
  target = Math.max(0, Math.min(target, last));
  scrollToCard(target);
}

function stopFacultyAutoplay() {
  clearInterval(facultyTimer);
  facultyTimer = null;
}

function startFacultyAutoplay() {
  stopFacultyAutoplay();
  if (reduceMotionQuery.matches || document.hidden) return;
  facultyTimer = setInterval(() => facultyStep(1), 4500);
}

let facultyNavBound = false;

function setupFacultySlider() {
  if (!facultyGrid || facultyNavBound) return;
  facultyNavBound = true;

  facultyPrev?.addEventListener("click", () => {
    facultyStep(-1);
    startFacultyAutoplay();
  });
  facultyNext?.addEventListener("click", () => {
    facultyStep(1);
    startFacultyAutoplay();
  });

  // Pause while the visitor is looking at or touching the slider.
  const slider = facultyGrid.closest(".faculty-slider") || facultyGrid;
  ["mouseenter", "pointerdown", "focusin", "touchstart"].forEach((evt) =>
    slider.addEventListener(evt, stopFacultyAutoplay, { passive: true }),
  );
  ["mouseleave", "focusout", "touchend"].forEach((evt) =>
    slider.addEventListener(evt, startFacultyAutoplay, { passive: true }),
  );
  document.addEventListener("visibilitychange", () =>
    document.hidden ? stopFacultyAutoplay() : startFacultyAutoplay(),
  );

  // Only cycle while the section is actually on screen.
  new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => (e.isIntersecting ? startFacultyAutoplay() : stopFacultyAutoplay())),
    { threshold: 0.3 },
  ).observe(slider);
}

/* Open the faculty detail modal with the clicked member's info. */
const facultyModalEl = document.getElementById("facultyModal");
let facultyModalInstance = null;

function openFacultyModal(index) {
  const f = FACULTY[index];
  if (!f || !facultyModalEl || !window.bootstrap) return;

  document.getElementById("facultyModalImg").src = f.image;
  document.getElementById("facultyModalImg").alt = f.name;
  facultyModalEl
    .querySelector(".faculty-modal-image")
    .style.setProperty("--modal-img", `url("${f.image}")`);
  document.getElementById("facultyModalNo").textContent = f.no;
  document.getElementById("facultyModalName").textContent = f.name;
  document.getElementById("facultyModalQualification").textContent = f.qualification;
  document.getElementById("facultyModalDescription").textContent = f.description || "";

  facultyModalInstance = facultyModalInstance || new bootstrap.Modal(facultyModalEl);
  facultyModalInstance.show();
}

let facultyClicksBound = false;

function setupFacultyCardClicks() {
  if (!facultyGrid || facultyClicksBound) return;
  facultyClicksBound = true;

  facultyGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".faculty-card");
    if (!card) return;
    openFacultyModal(Number(card.dataset.facultyIndex));
  });

  facultyGrid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".faculty-card");
    if (!card) return;
    e.preventDefault();
    openFacultyModal(Number(card.dataset.facultyIndex));
  });
}

function buildFaculty() {
  renderFaculty();
  setupFacultyDots();
  setupFacultyCardClicks();
  setupFacultySlider();
}

/* ---------- 3. Gallery ---------- */
const galleryTrack = document.getElementById("galleryTrack");
const galleryIndicators = document.getElementById("galleryIndicators");
const galleryCarousel = document.getElementById("galleryCarousel");
let galleryInstance = null;
let galleryPerSlide = null;

function galleryCardMarkup(item) {
  const media = item.video
    ? `<div class="gallery-media video-media">
         <video controls preload="metadata" poster="${item.poster}">
           <source src="${item.video}" type="video/mp4" />
           Your browser does not support the video tag.
         </video>
       </div>`
    : `<div class="gallery-media">
         <img src="${item.image}" alt="${item.title} at Revolution Classes" loading="lazy" />
       </div>`;

  return `
    <article class="gallery-card${item.video ? " gallery-video-card" : ""}">
      ${media}
      <div class="gallery-card-body">
        <span class="gallery-icon">${item.icon}</span>
        <div>
          <h4>${item.title}</h4>
          <p>${item.text}</p>
        </div>
      </div>
    </article>`;
}

function renderGallery() {
  if (!galleryTrack || !galleryIndicators) return;

  const perSlide = isMobile() ? 1 : 3;
  if (perSlide === galleryPerSlide) return; // layout unchanged, skip rebuild
  galleryPerSlide = perSlide;

  const colClass = perSlide === 1 ? "col-12" : "col-md-6 col-lg-4";
  const slides = [];
  for (let i = 0; i < GALLERY.length; i += perSlide) {
    slides.push(GALLERY.slice(i, i + perSlide));
  }

  galleryTrack.innerHTML = slides
    .map(
      (group, index) => `
        <div class="carousel-item${index === 0 ? " active" : ""}">
          <div class="row g-4 justify-content-center">
            ${group.map((item) => `<div class="${colClass}">${galleryCardMarkup(item)}</div>`).join("")}
          </div>
        </div>`,
    )
    .join("");

  galleryIndicators.innerHTML = slides
    .map(
      (_, index) =>
        `<button type="button" data-bs-target="#galleryCarousel" data-bs-slide-to="${index}"${
          index === 0 ? ' class="active" aria-current="true"' : ""
        } aria-label="Slide ${index + 1}"></button>`,
    )
    .join("");

  if (window.bootstrap && galleryCarousel) {
    bootstrap.Carousel.getInstance(galleryCarousel)?.dispose();
    galleryInstance = new bootstrap.Carousel(galleryCarousel, {
      interval: 4500,
      touch: true,
      wrap: true,
    });
  }
}

/* Only the visible slide should be able to play its video. */
if (galleryCarousel) {
  galleryCarousel.addEventListener("slide.bs.carousel", () => {
    galleryCarousel.querySelectorAll("video").forEach((video) => video.pause());
  });
}

/* ---------- 4. Scroll reveal + counters ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);

/* Siblings animate one after another instead of all at once. */
function observeReveals() {
  const groups = new Map();

  document.querySelectorAll(".reveal:not(.show)").forEach((el) => {
    if (el.dataset.revealReady) return;
    el.dataset.revealReady = "true";

    const parent = el.parentElement;
    const position = groups.get(parent) || 0;
    groups.set(parent, position + 1);
    el.style.setProperty("--delay", `${Math.min(position, 5) * 90}ms`);

    revealObserver.observe(el);
  });
}

function animateCounter(el) {
  const target = Number(el.dataset.count || 0);
  const suffix = el.dataset.suffix || "";
  const duration = 1600;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

function setupCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    counters.forEach((el) => (el.textContent = el.dataset.count + (el.dataset.suffix || "")));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.6 },
  );

  counters.forEach((el) => observer.observe(el));
}

/* ---------- 5. Navigation ---------- */
const mainNav = document.getElementById("mainNav");
const navProgress = document.getElementById("navProgress");
const navbarMenu = document.getElementById("navbarMenu");
const navLinks = [...document.querySelectorAll('#mainNav a[href^="#"]')];
const pageSections = [...document.querySelectorAll("main section[id]")];

function onScroll() {
  const scrolled = window.scrollY;
  mainNav.classList.toggle("scrolled", scrolled > 30);

  if (navProgress) {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    navProgress.style.width = `${height > 0 ? (scrolled / height) * 100 : 0}%`;
  }

  // Fast flicks on phones can jump past a section before the observer sees it;
  // anything already scrolled above the viewport is simply shown.
  document.querySelectorAll(".reveal:not(.show)").forEach((el) => {
    if (el.getBoundingClientRect().bottom < 0) el.classList.add("show");
  });

  const marker = scrolled + mainNav.offsetHeight + 90;
  let currentId = pageSections.length ? pageSections[0].id : "home";
  pageSections.forEach((section) => {
    if (marker >= section.offsetTop) currentId = section.id;
  });
  navLinks.forEach((link) =>
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`),
  );
}

function scrollToSection(selector) {
  const target = document.querySelector(selector);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - mainNav.offsetHeight - 8;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

/* Close the mobile menu first, then scroll — so the menu can never stay open over the page. */
function closeMenuThen(callback) {
  if (!navbarMenu || !navbarMenu.classList.contains("show")) {
    callback();
    return;
  }

  const collapse = bootstrap.Collapse.getOrCreateInstance(navbarMenu, { toggle: false });
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    callback();
  };

  navbarMenu.addEventListener("hidden.bs.collapse", finish, { once: true });
  collapse.hide();
  window.setTimeout(finish, 450);
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const selector = link.getAttribute("href");
    if (!document.querySelector(selector)) return;

    event.preventDefault();
    closeMenuThen(() => requestAnimationFrame(() => scrollToSection(selector)));
    history.replaceState(null, "", selector);
  });
});

/* ---------- 6. Enquiry form ---------- */
const form = document.getElementById("admissionForm");
const formMessage = document.getElementById("formMessage");
const submitBtn = document.getElementById("submitEnquiryBtn");

function showFormMessage(type, text) {
  formMessage.innerHTML = `<div class="alert alert-${type}">${text}</div>`;
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const mobile = document.getElementById("mobile").value.trim();
    if (!/^[0-9]{10}$/.test(mobile)) {
      showFormMessage("danger", "Enter a 10-digit mobile number so we can call you back.");
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";
    formMessage.innerHTML = "";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        showFormMessage("success", "Enquiry sent. Our team will contact you soon.");
        form.reset();
        form.classList.remove("was-validated");
      } else {
        const data = await response.json().catch(() => ({}));
        const detail = data.errors?.map((e) => e.message).join(" ");
        showFormMessage("danger", detail || "The enquiry did not go through. Please try again.");
      }
    } catch (error) {
      showFormMessage("danger", "No internet connection. Check your network and send again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

/* ---------- Start ---------- */
buildFaculty();
renderGallery();
observeReveals();
setupCounters();

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("load", onScroll);
onScroll();

/* Rebuild the gallery when switching between mobile and desktop layouts. */
/* Faculty markup is the same on every size, so only the gallery is rebuilt. */
mobileQuery.addEventListener("change", () => {
  renderGallery();
  observeReveals();
  scrollToCard(0);
});
