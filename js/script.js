/* ============================================
   WEDDING INVITATION - MAIN SCRIPT
   ============================================ */

(function () {
  'use strict';

  /* ---------- DOM Ready ---------- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    populateEnvelopeCard();
    populateDoaPembuka();
    populateMempelai();
    populateCountdownLabel();
    startCountdown();
    populateLoveStory();
    populateAkad();
    populateResepsi();
    populateGifts();
    populateGuestbook();
    populatePenutup();
    createFloatingPetals();
    setupEnvelopeOpening();
    setupMusicToggle();
    setupScrollReveal();
    setupParallax();
    setupScrollProgress();
    setupPhotoReveal();
    setupCardReveal();
    setupSectionReveal();
  }

  /* ============================================
     ENVELOPE CARD (Inner card names)
     ============================================ */
  function populateEnvelopeCard() {
    var namesEl = document.getElementById('envelopeCardNames');
    if (namesEl) {
      namesEl.textContent = CONFIG.groom.name + ' & ' + CONFIG.bride.name;
    }
  }

  /* ============================================
     ENVELOPE OPENING (Fast — 1.5s)
     ============================================ */
  function setupEnvelopeOpening() {
    var envelope = document.getElementById('envelope');
    var flap = document.getElementById('envelopeFlap');
    var card = document.getElementById('envelopeCard');
    var seal = document.getElementById('openInvitation');
    var cover = document.getElementById('cover');
    var main = document.getElementById('mainContent');
    var musicToggle = document.getElementById('musicToggle');
    var overlay = document.getElementById('overlay');
    if (!envelope || !cover || !main) return;

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function startJourney() {
      if (prefersReducedMotion) {
        cover.classList.add('hidden');
        main.classList.add('visible');
        if (musicToggle) musicToggle.classList.add('active');
        startMusic();
        window.scrollTo(0, 0);
        return;
      }

      // Step 1: Seal press + flap open
      if (envelope) envelope.classList.add('envelope--seal-pressed');
      if (envelope) envelope.classList.add('envelope--flap-open');

      // Step 2: Cover fade out (300ms)
      setTimeout(function () {
        if (cover) cover.classList.add('cover--fading');
      }, 300);

      // Step 3: Cover hidden + main visible (600ms)
      setTimeout(function () {
        cover.classList.add('hidden');
        main.classList.add('visible');
        if (musicToggle) musicToggle.classList.add('active');
        startMusic();
        window.scrollTo(0, 0);
      }, 600);

      // Step 4: Overlay fade (1000ms)
      setTimeout(function () {
        if (overlay) overlay.classList.remove('active');
      }, 1000);
    }

    // Check URL hash for direct access
    if (window.location.hash && window.location.hash !== '#cover') {
      cover.classList.add('hidden');
      main.classList.add('visible');
      if (musicToggle) musicToggle.classList.add('active');
      return;
    }

    if (seal) {
      seal.addEventListener('click', startJourney);
    }
  }

  /* ============================================
     MUSIC
     ============================================ */
  var audio = null;
  var isPlaying = false;

  function startMusic() {
    var src = CONFIG.music.src;
    if (!src) return;

    audio = new Audio(src);
    audio.volume = 0.5;
    audio.preload = 'metadata';

    var startSec = CONFIG.music.startSeconds || 0;

    audio.addEventListener('loadedmetadata', function() {
      audio.currentTime = startSec;
    });

    audio.addEventListener('timeupdate', function() {
      if (audio.duration && audio.currentTime >= audio.duration - 1) {
        audio.currentTime = startSec;
      }
    });

    audio.play().then(function () {
      isPlaying = true;
      updateMusicButton();
    }).catch(function () {
      isPlaying = false;
      updateMusicButton();
    });
  }

  function setupMusicToggle() {
    var btn = document.getElementById('musicToggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
      if (!audio) {
        startMusic();
        return;
      }

      if (isPlaying) {
        audio.pause();
        isPlaying = false;
        updateMusicButton();
      } else {
        audio.play().then(function () {
          isPlaying = true;
          updateMusicButton();
        }).catch(function () {});
      }
    });
  }

  function updateMusicButton() {
    var btn = document.getElementById('musicToggle');
    if (!btn) return;

    if (isPlaying) {
      btn.classList.add('playing');
    } else {
      btn.classList.remove('playing');
    }
  }

  /* ============================================
   MEMPELAI
   ============================================ */
  function renderParents(el, parents) {
    el.innerHTML =
      '<span class="couple-parents-prefix">' + escapeHtml(parents.prefix) + '</span>' +
      '<span class="couple-parents-father">' + escapeHtml(parents.father) + '</span>' +
      '<span class="couple-parents-separator">&</span>' +
      '<span class="couple-parents-mother">' + escapeHtml(parents.mother) + '</span>';
  }

  function populateMempelai() {
    setText('groomFullName', CONFIG.groom.fullName);
    setText('groomQuote', '"' + CONFIG.groom.quote + '"');
    setText('brideFullName', CONFIG.bride.fullName);
    setText('brideQuote', '"' + CONFIG.bride.quote + '"');

    // Parents
    var groomParents = document.getElementById('groomParents');
    var brideParents = document.getElementById('brideParents');
    if (groomParents && CONFIG.groom.parents) {
      renderParents(groomParents, CONFIG.groom.parents);
    }
    if (brideParents && CONFIG.bride.parents) {
      renderParents(brideParents, CONFIG.bride.parents);
    }

    // Photos
    var groomPhoto = document.getElementById('groomPhoto');
    var bridePhoto = document.getElementById('bridePhoto');
    if (groomPhoto && CONFIG.groom.photo) {
      groomPhoto.innerHTML = '<img src="' + CONFIG.groom.photo + '" alt="Foto ' + CONFIG.groom.name + '">';
    }
    if (bridePhoto && CONFIG.bride.photo) {
      bridePhoto.innerHTML = '<img src="' + CONFIG.bride.photo + '" alt="Foto ' + CONFIG.bride.name + '">';
    }
  }

  /* ============================================
     WEDDING DATE
     ============================================ */
  /* ============================================
     COUNTDOWN
     ============================================ */
  function populateCountdownLabel() {
    setText('countdownLabel', CONFIG.wedding.countdownLabel);
  }

  function startCountdown() {
    var target = new Date(CONFIG.wedding.date).getTime();
    var daysEl = document.getElementById('countDays');
    var hoursEl = document.getElementById('countHours');
    var minutesEl = document.getElementById('countMinutes');
    var secondsEl = document.getElementById('countSeconds');

    function update() {
      var now = new Date().getTime();
      var diff = target - now;

      if (diff <= 0) {
        if (daysEl) daysEl.textContent = '0';
        if (hoursEl) hoursEl.textContent = '0';
        if (minutesEl) minutesEl.textContent = '0';
        if (secondsEl) secondsEl.textContent = '0';
        setText('countdownLabel', 'Acara telah berlangsung');
        return;
      }

      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (daysEl) animateNumber(daysEl, days);
      if (hoursEl) animateNumber(hoursEl, hours);
      if (minutesEl) animateNumber(minutesEl, minutes);
      if (secondsEl) animateNumber(secondsEl, seconds);
    }

    update();
    setInterval(update, 1000);
  }

  function animateNumber(el, value) {
    var current = el.textContent;
    var newVal = String(value);
    if (current !== newVal) {
      el.style.transform = 'scale(1.1)';
      el.textContent = newVal;
      setTimeout(function () {
        el.style.transform = 'scale(1)';
      }, 150);
    }
  }

  /* ============================================
     LOVE STORY
     ============================================ */
  function populateLoveStory() {
    var container = document.getElementById('timeline');
    if (!container) return;

    var html = '';
    CONFIG.loveStory.forEach(function (item, i) {
      html += '<div class="timeline-item reveal" role="listitem" style="transition-delay: ' + (i * 0.1) + 's">';
      html += '  <div class="timeline-dot"></div>';
      html += '  <p class="timeline-year">' + escapeHtml(item.year) + '</p>';
      html += '  <h3 class="timeline-title">' + escapeHtml(item.title) + '</h3>';
      html += '  <p class="timeline-desc">' + escapeHtml(item.description) + '</p>';
      if (item.photo) {
        html += '  <div class="timeline-photo">';
        html += '    <img src="' + item.photo + '" alt="' + escapeHtml(item.title) + '" loading="lazy">';
        html += '  </div>';
      }
      html += '</div>';
    });

    container.innerHTML = html;
    setupScrollReveal();
  }

  /* ============================================
     EVENTS
     ============================================ */
  function populateAkad() {
    var w = CONFIG.wedding.akad;
    setText('akadTitle', w.title);
    setText('akadDate', w.date);
    setText('akadTime', w.time);
    setText('akadVenue', w.venue);
    setText('akadAddress', w.address);
    setMapLink('akadMap', w.mapsQuery);
  }

  function populateResepsi() {
    var w = CONFIG.wedding.resepsi;
    setText('resepsiTitle', w.title);
    setText('resepsiDate', w.date);
    setText('resepsiTime', w.time);
    setText('resepsiVenue', w.venue);
    setText('resepsiAddress', w.address);
    setMapLink('resepsiMap', w.mapsQuery);
  }

  function setMapLink(id, query) {
    var el = document.getElementById(id);
    if (!el || !query) return;
    el.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
  }

  /* ============================================
     DOA & PEMBUKA (MERGED)
     ============================================ */
  function populateDoaPembuka() {
    setText('doaArabic', CONFIG.doaPembuka.arabic);
    setText('doaLatin', CONFIG.doaPembuka.latin);
    setText('pembukaSalam', CONFIG.doaPembuka.salam);
    setText('pembukaText', CONFIG.doaPembuka.text);
    var namesEl = document.getElementById('pembukaNames');
    if (namesEl) {
      var names = CONFIG.doaPembuka.names
        .replace('{{groom}}', CONFIG.groom.fullName)
        .replace('{{bride}}', CONFIG.bride.fullName);
      namesEl.textContent = names;
    }
  }

  /* ============================================
     WEDDING GIFT
     ============================================ */
  function populateGifts() {
    var container = document.getElementById('giftCards');
    if (!container) return;

    var html = '';
    CONFIG.gifts.forEach(function (gift, i) {
      html += '<div class="gift-card reveal" style="transition-delay: ' + (i * 0.08) + 's">';
      html += '  <div class="gift-card-header">';
      html += '    <div class="gift-card-icon">';
      if (gift.type === 'e-wallet') {
        html += '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20">';
        html += '        <rect x="2" y="4" width="20" height="16" rx="2"/>';
        html += '        <path d="M2 10h20"/>';
        html += '      </svg>';
      } else {
        html += '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20">';
        html += '        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/>';
        html += '        <path d="M3 9l2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/>';
        html += '        <path d="M12 3v6"/>';
        html += '      </svg>';
      }
      html += '    </div>';
      html += '    <h3 class="gift-card-bank">' + escapeHtml(gift.bank) + '</h3>';
      html += '  </div>';
      html += '  <div class="gift-card-body">';
      html += '    <p class="gift-card-number">' + escapeHtml(gift.number) + '</p>';
      html += '    <p class="gift-card-name">a.n. ' + escapeHtml(gift.name) + '</p>';
      html += '    <button class="gift-copy-btn" data-copy="' + escapeHtml(gift.number) + '" data-index="' + i + '">';
      html += '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">';
      html += '        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>';
      html += '        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>';
      html += '      </svg>';
      html += '      <span>Salin</span>';
      html += '    </button>';
      html += '  </div>';
      html += '</div>';
    });

    container.innerHTML = html;
    setupScrollReveal();
    setupCopyButtons();
  }

  function setupCopyButtons() {
    document.querySelectorAll('.gift-copy-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy');
        if (!text) return;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            showCopied(btn);
          }).catch(function () {
            fallbackCopy(text, btn);
          });
        } else {
          fallbackCopy(text, btn);
        }
      });
    });
  }

  function fallbackCopy(text, btn) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showCopied(btn);
    } catch (e) {
      showToast('Gagal menyalin');
    }
    document.body.removeChild(ta);
  }

  function showCopied(btn) {
    var span = btn.querySelector('span');
    var originalText = span ? span.textContent : 'Salin';
    if (span) span.textContent = 'Tersalin!';
    btn.classList.add('copied');
    showToast('Nomor rekening berhasil disalin');

    setTimeout(function () {
      if (span) span.textContent = originalText;
      btn.classList.remove('copied');
    }, 2000);
  }

  /* ============================================
     GUESTBOOK
     ============================================ */
  function populateGuestbook() {
    var track = document.getElementById('guestbookTrack');
    var empty = document.getElementById('guestbookEmpty');
    if (!track) return;

    var storageKey = 'wedding_guestbook';
    var stored = localStorage.getItem(storageKey);
    var messages = stored ? JSON.parse(stored) : [];

    if (messages.length === 0 && CONFIG.guestbookInitial && CONFIG.guestbookInitial.length > 0) {
      messages = CONFIG.guestbookInitial.slice();
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }

    if (messages.length === 0) {
      var carousel = document.getElementById('guestbookCarousel');
      if (carousel) carousel.style.display = 'none';
      if (empty) empty.style.display = 'block';
      return;
    }

    if (empty) empty.style.display = 'none';
    var carousel = document.getElementById('guestbookCarousel');
    if (carousel) carousel.style.display = 'block';

    var html = '';
    messages.forEach(function (item, i) {
      var initial = item.name ? item.name.charAt(0).toUpperCase() : '?';
      html += '<div class="guestbook-card">';
      html += '  <div class="guestbook-card-header">';
      html += '    <div class="guestbook-avatar">' + escapeHtml(initial) + '</div>';
      html += '    <div class="guestbook-meta">';
      html += '      <p class="guestbook-name">' + escapeHtml(item.name) + '</p>';
      html += '      <p class="guestbook-time">' + escapeHtml(item.time) + '</p>';
      html += '    </div>';
      html += '  </div>';
      html += '  <p class="guestbook-message">' + escapeHtml(item.message) + '</p>';
      html += '</div>';
    });

    track.innerHTML = html;
    setupGuestbookCarousel();
    setupGuestbookForm();
  }

  function setupGuestbookCarousel() {
    var track = document.getElementById('guestbookTrack');
    var dotsContainer = document.getElementById('guestbookDots');
    if (!track || !dotsContainer) return;

    var carouselIndex = 0;
    var carouselInterval = null;
    var isMobile = window.innerWidth <= 768;

    // Build mobile slides if needed
    if (isMobile) {
      buildMobileSlides();
    }

    var slidesOrCards = isMobile
      ? track.querySelectorAll('.guestbook-slide')
      : track.querySelectorAll('.guestbook-card');
    var totalItems = slidesOrCards.length;
    var totalPages = isMobile
      ? totalItems
      : Math.ceil(totalItems / 5);

    if (totalPages <= 1) {
      dotsContainer.innerHTML = '';
      return;
    }

    // Render dots
    var dotsHtml = '';
    for (var i = 0; i < totalPages; i++) {
      dotsHtml += '<div class="guestbook-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '"></div>';
    }
    dotsContainer.innerHTML = dotsHtml;

    // Dot click handler
    dotsContainer.querySelectorAll('.guestbook-dot').forEach(function(dot) {
      dot.addEventListener('click', function() {
        goToSlide(parseInt(this.dataset.index));
      });
    });

    // Go to slide — always horizontal
    function goToSlide(index) {
      carouselIndex = index;
      var gap = 16;

      if (isMobile) {
        // Mobile: slide antar .guestbook-slide (horizontal)
        var slide = track.querySelector('.guestbook-slide');
        var slideWidth = slide.offsetWidth;
        var offset = index * (slideWidth + gap);
        track.style.transform = 'translateX(-' + offset + 'px)';
      } else {
        // Desktop: slide antar card (horizontal)
        var cards = track.querySelectorAll('.guestbook-card');
        var cardWidth = cards[0].offsetWidth;
        var offset = index * 5 * (cardWidth + gap);
        track.style.transform = 'translateX(-' + offset + 'px)';
      }

      dotsContainer.querySelectorAll('.guestbook-dot').forEach(function(dot, i) {
        dot.classList.toggle('active', i === index);
      });
    }

    // Auto-slide every 10 seconds
    function startAutoSlide() {
      carouselInterval = setInterval(function() {
        carouselIndex = (carouselIndex + 1) % totalPages;
        goToSlide(carouselIndex);
      }, 3000);
    }
    startAutoSlide();

    // Pause on hover
    track.addEventListener('mouseenter', function() {
      clearInterval(carouselInterval);
    });
    track.addEventListener('mouseleave', function() {
      startAutoSlide();
    });

    // Update on resize
    window.addEventListener('resize', function() {
      var wasMobile = isMobile;
      isMobile = window.innerWidth <= 768;

      if (wasMobile !== isMobile) {
        if (isMobile) {
          buildMobileSlides();
        } else {
          removeMobileSlides();
        }
      }

      slidesOrCards = isMobile
        ? track.querySelectorAll('.guestbook-slide')
        : track.querySelectorAll('.guestbook-card');
      totalItems = slidesOrCards.length;
      totalPages = isMobile
        ? totalItems
        : Math.ceil(totalItems / 5);

      // Re-render dots
      if (totalPages <= 1) {
        dotsContainer.innerHTML = '';
      } else {
        var dotsHtml = '';
        for (var i = 0; i < totalPages; i++) {
          dotsHtml += '<div class="guestbook-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '"></div>';
        }
        dotsContainer.innerHTML = dotsHtml;
        dotsContainer.querySelectorAll('.guestbook-dot').forEach(function(dot) {
          dot.addEventListener('click', function() {
            goToSlide(parseInt(this.dataset.index));
          });
        });
      }

      carouselIndex = 0;
      goToSlide(0);
    });

    // Build mobile: wrap every 2 cards in a slide
    function buildMobileSlides() {
      var allCards = Array.from(track.querySelectorAll('.guestbook-card'));
      if (track.querySelector('.guestbook-slide')) return;

      track.innerHTML = '';
      for (var i = 0; i < allCards.length; i += 2) {
        var slide = document.createElement('div');
        slide.className = 'guestbook-slide';
        slide.appendChild(allCards[i]);
        if (allCards[i + 1]) slide.appendChild(allCards[i + 1]);
        track.appendChild(slide);
      }
    }

    // Remove mobile: flatten back to cards
    function removeMobileSlides() {
      var slides = track.querySelectorAll('.guestbook-slide');
      if (slides.length === 0) return;

      track.innerHTML = '';
      slides.forEach(function(slide) {
        while (slide.firstChild) {
          track.appendChild(slide.firstChild);
        }
      });
    }
  }

  function setupGuestbookForm() {
    var submitBtn = document.getElementById('guestbookSubmitBtn');
    var nameInput = document.getElementById('guestbookName');
    var messageInput = document.getElementById('guestbookMessage');
    if (!submitBtn || !nameInput || !messageInput) return;

    submitBtn.addEventListener('click', function () {
      var name = nameInput.value.trim();
      var message = messageInput.value.trim();
      if (!name || !message) {
        alert('Mohon isi nama dan ucapan Anda.');
        return;
      }

      var storageKey = 'wedding_guestbook';
      var stored = localStorage.getItem(storageKey);
      var messages = stored ? JSON.parse(stored) : [];

      messages.unshift({
        name: name,
        message: message,
        time: 'Baru saja'
      });

      localStorage.setItem(storageKey, JSON.stringify(messages));
      nameInput.value = '';
      messageInput.value = '';
      populateGuestbook();
    });
  }

  /* ============================================
     CLOSING
     ============================================ */
  function populatePenutup() {
    var el = document.getElementById('penutupNames');
    if (el) {
      el.textContent = CONFIG.groom.name + ' & ' + CONFIG.bride.name;
    }
  }

  /* ============================================
     FLOATING PETALS
     ============================================ */
  function createFloatingPetals() {
    var container = document.getElementById('floatingPetals');
    if (!container) return;

    var petalCount = 30;
    var html = '';

    for (var i = 0; i < petalCount; i++) {
      var cls = 'petal petal--' + ((i % 8) + 1);
      var left = (Math.random() * 95 + 2) + '%';
      var delay = (Math.random() * 12) + 's';
      var duration = (Math.random() * 10 + 8) + 's';
      var size = (Math.random() * 8 + 6) + 'px';

      html += '<div class="' + cls + '" style="left:' + left + ';animation-delay:' + delay + ';animation-duration:' + duration + ';width:' + size + ';height:' + size + '"></div>';
    }

    container.innerHTML = html;
  }

  /* ============================================
     SCROLL REVEAL
     ============================================ */
  function setupScrollReveal() {
    var reveals = document.querySelectorAll('.reveal:not(.visible)');

    if (!('IntersectionObserver' in window)) {
      // Fallback: show all
      reveals.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================================
     TOAST
     ============================================ */
  var toastTimer = null;

  function showToast(message) {
    var toast = document.getElementById('toast');
    var msgEl = document.getElementById('toastMessage');
    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 2500);
  }

  /* ============================================
     UTILITIES
     ============================================ */
  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ============================================
     BOTANICAL PARALLAX (3-Layer)
     ============================================ */
  function setupParallax() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    var botanicalBg = document.querySelectorAll('.botanical-bg');
    var botanicalMid = document.querySelectorAll('.botanical-mid');
    var botanicalFg = document.querySelectorAll('.botanical-fg');
    var floralHero = document.querySelectorAll('.floral--hero');
    var floralSupporting = document.querySelectorAll('.floral--supporting');

    if (botanicalBg.length === 0 && floralHero.length === 0) return;

    var ticking = false;

    function updateParallax() {
      var scrollY = window.pageYOffset;
      var windowHeight = window.innerHeight;

      // Background layer - very slow
      botanicalBg.forEach(function(el) {
        var rect = el.parentElement.getBoundingClientRect();
        var elementCenter = rect.top + rect.height / 2;
        var viewportCenter = windowHeight / 2;
        var distance = (elementCenter - viewportCenter) * 0.1;
        el.style.transform = 'translateY(' + distance + 'px)';
      });

      // Midground flowers - moderate speed
      floralHero.forEach(function(el) {
        var rect = el.parentElement.getBoundingClientRect();
        var elementCenter = rect.top + rect.height / 2;
        var viewportCenter = windowHeight / 2;
        var distance = (elementCenter - viewportCenter) * 0.06;
        el.style.transform = el.style.transform || '';
        // Preserve existing transform and add parallax
        var currentTransform = el.style.transform.replace(/translateY\([^)]*\)/g, '');
        el.style.transform = currentTransform + ' translateY(' + distance + 'px)';
      });

      // Supporting flowers - slightly faster
      floralSupporting.forEach(function(el) {
        var rect = el.parentElement.getBoundingClientRect();
        var elementCenter = rect.top + rect.height / 2;
        var viewportCenter = windowHeight / 2;
        var distance = (elementCenter - viewportCenter) * 0.04;
        var currentTransform = el.style.transform.replace(/translateY\([^)]*\)/g, '');
        el.style.transform = currentTransform + ' translateY(' + distance + 'px)';
      });

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    updateParallax();
  }

  /* ============================================
     SCROLL PROGRESS INDICATOR
     ============================================ */
  function setupScrollProgress() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Create progress bar
    var progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progressBar);

    // Add CSS for progress bar
    var style = document.createElement('style');
    style.textContent = '\
      .scroll-progress {\
        position: fixed;\
        top: 0;\
        left: 0;\
        width: 0;\
        height: 2px;\
        background: linear-gradient(90deg, var(--champagne-gold), var(--sage));\
        z-index: 9999;\
        transition: width 0.1s ease;\
        pointer-events: none;\
      }\
    ';
    document.head.appendChild(style);

    function updateProgress() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ============================================
     PHOTO REVEAL ANIMATION
     ============================================ */
  function setupPhotoReveal() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    var photos = document.querySelectorAll('.couple-photo img, .timeline-photo img');

    if (!('IntersectionObserver' in window)) {
      photos.forEach(function(img) {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
        img.style.filter = 'blur(0)';
      });
      return;
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.style.transition = 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
          img.style.opacity = '1';
          img.style.transform = 'scale(1)';
          img.style.filter = 'blur(0)';
          observer.unobserve(img);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -20px 0px'
    });

    photos.forEach(function(img) {
      img.style.opacity = '0';
      img.style.transform = 'scale(0.96)';
      img.style.filter = 'blur(4px)';
      observer.observe(img);
    });
  }

  /* ============================================
     CARD REVEAL ANIMATION
     ============================================ */
  function setupCardReveal() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    var cards = document.querySelectorAll('.event-card, .gift-card, .guestbook-card');

    if (!('IntersectionObserver' in window)) {
      cards.forEach(function(card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      });
      return;
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var card = entry.target;
          card.style.transition = 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
          observer.unobserve(card);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    cards.forEach(function(card, index) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px) scale(0.98)';
      card.style.transitionDelay = (index * 0.08) + 's';
      observer.observe(card);
    });
  }

  /* ============================================
     SECTION REVEAL (Per-Section with Stagger)
     ============================================ */
  function setupSectionReveal() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-page, .reveal-card, .reveal-portrait, .reveal-paper, .reveal-timeline, .reveal-event, .reveal-message, .reveal-closing').forEach(function(el) {
        el.classList.add('visible');
      });
      return;
    }

    var selectors = [
      { sel: '.reveal-page', stagger: true },
      { sel: '.reveal-card', stagger: true },
      { sel: '.reveal-portrait', stagger: false },
      { sel: '.reveal-paper', stagger: true },
      { sel: '.reveal-timeline', stagger: true },
      { sel: '.reveal-event', stagger: true },
      { sel: '.reveal-message', stagger: true },
      { sel: '.reveal-closing', stagger: false }
    ];

    selectors.forEach(function(config) {
      var els = document.querySelectorAll(config.sel);
      if (els.length === 0) return;

      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
      });

      els.forEach(function(el, i) {
        if (config.stagger) {
          el.style.transitionDelay = (i * 0.12) + 's';
        }
        observer.observe(el);
      });
    });
  }

})();
