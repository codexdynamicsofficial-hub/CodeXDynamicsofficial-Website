document.addEventListener("DOMContentLoaded", () => {

  /* ===================== Hamburger Menu ===================== */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if(hamburger && navLinks){
    hamburger.addEventListener("click", (e) => {
      navLinks.classList.toggle("active");
      e.stopPropagation();

      const reviewBox = document.getElementById('floatingReviewBox');
      const toggleBtn = document.getElementById('toggleReviewBtn');
      if(reviewBox) {
          reviewBox.classList.remove('show-up');
          if(toggleBtn) toggleBtn.style.display = 'block';
      }

      document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "auto";
    });

    document.addEventListener("click", (e) => {
      if(!navLinks.contains(e.target) && !hamburger.contains(e.target)){
        navLinks.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  }

  /* ===================== Animations ===================== */
  const slideObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add("show");
        entry.target.classList.add("active");
        entry.target.classList.add("animate");
      }
    });
  }, { threshold: 0.2 });

  const animatedElements = document.querySelectorAll(".slide-left, .slide-right, .reveal, .about-content, .icon-box, .portfolio-card");
  animatedElements.forEach(el => slideObserver.observe(el));

  // Portfolio Staggered Animation
  const portfolioCards = document.querySelectorAll(".portfolio-card");
  portfolioCards.forEach((card, index) => {
    const pObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add("show"), index * 100);
                pObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    pObserver.observe(card);
  });

  /* ===================== Expertise Slider ===================== */
  const slider = document.getElementById("expertiseSlider");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if(slider){
    const getScrollAmount = () => {
        const card = slider.querySelector(".expert-box");
        return card ? card.offsetWidth + 20 : 280;
    };

    if(prevBtn && nextBtn){
      nextBtn.addEventListener("click", () => {
        slider.scrollLeft += getScrollAmount();
      });
      prevBtn.addEventListener("click", () => {
        slider.scrollLeft -= getScrollAmount();
      });
    }
  }

  /* ===================== Portfolio Slider ===================== */
  const portfolioSlider = document.getElementById("portfolioSlider");
  
  if(portfolioSlider){
      const pPrevBtn = portfolioSlider.parentElement.querySelector(".prev-btn");
      const pNextBtn = portfolioSlider.parentElement.querySelector(".next-btn");

      const getScrollAmount = () => {
          const card = portfolioSlider.querySelector(".portfolio-card");
          return card ? card.offsetWidth + 25 : 385; 
      };

      if(pPrevBtn && pNextBtn){
          pNextBtn.addEventListener("click", () => {
              portfolioSlider.scrollLeft += getScrollAmount();
          });
          pPrevBtn.addEventListener("click", () => {
              portfolioSlider.scrollLeft -= getScrollAmount();
          });
      }
  }

  /* ===================== Counters ===================== */
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const speed = 200;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };
    
    const observer = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
        updateCount();
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });

  /* ===================== Contact Form Submit (Merged & Fixed) ===================== */
  const contactForm = document.getElementById("contactForm");
  
  if(contactForm){
    contactForm.addEventListener("submit", function(e){
      e.preventDefault();

      const nameEl = document.getElementById("name");
      const emailEl = document.getElementById("email");
      const phoneEl = document.getElementById("phone");
      const businessEl = document.getElementById("business");
      const websiteEl = document.getElementById("website");
      const methodEl = document.getElementById("contactMethod");
      const timeEl = document.getElementById("time");
      const detailsEl = document.getElementById("details");

      if(!nameEl || !emailEl) return;

      const name = nameEl.value;
      const email = emailEl.value;
      const phone = phoneEl ? phoneEl.value : '';
      const business = businessEl ? businessEl.value : '';
      const website = websiteEl ? websiteEl.value : '';
      const method = methodEl ? methodEl.value : 'email';
      const time = timeEl ? timeEl.value : '';
      const details = detailsEl ? detailsEl.value : '';

      const thankYou = document.getElementById("thankYouMsg");

      if(method === "whatsapp"){
        // WhatsApp ka formatted message
        let waMessage = `Hello CodeXDynamics!%0A`; 
        waMessage += `*Name:* ${name}%0A`;
        waMessage += `*Email:* ${email}%0A`;
        waMessage += `*Phone:* ${phone}%0A`;
        if(business) waMessage += `*Business:* ${business}%0A`;
        if(website) waMessage += `*Website:* ${website}%0A`;
        if(time) waMessage += `*Best Time:* ${time}%0A`;
        if(details) waMessage += `*Details:* ${details}%0A`;

        const whatsappNumber = "923223922370"; 
        const url = `https://wa.me/${whatsappNumber}?text=${waMessage}`;
        window.open(url, "_blank"); 

        if(thankYou) {
            contactForm.style.display = 'none';
            thankYou.style.display = "block";
            thankYou.innerHTML = "✅ Thank you! Aap WhatsApp par redirect ho rahe hain. Hamari team jaldi aap se contact karegi.";
        }
      } else {
        // Email ka message
        let subject = `New Contact Request from ${name}`;
        let body = `Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0ABusiness: ${business}%0AWebsite: ${website}%0ABest Time: ${time}%0ADetails: ${details}`;
        
        const mailtoLink = `mailto:codexdynamicsofficial@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        window.location.href = mailtoLink;

        if(thankYou) {
            contactForm.style.display = 'none';
            thankYou.style.display = "block";
            thankYou.innerHTML = "✅ Thank you! Aapka email client khul raha hai. Hamari team jaldi aap se contact karegi.";
        }
      }
    });
  }

  /* ===================== More Details Toggle ===================== */
  const moreBtn = document.querySelector(".more-details-btn");
  const moreDetails = document.querySelector(".more-details");
  if(moreBtn && moreDetails){
    moreBtn.addEventListener("click", ()=>{
      moreDetails.classList.toggle("show");
      moreBtn.textContent = moreDetails.classList.contains("show") ? "Less Details ▲" : "More Details ▼";
    });
  }

  /* ===================== Current Year ===================== */
  const yearEl = document.getElementById("year");
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===================== REVIEW BOX LOGIC ===================== */
  const reviewBox = document.getElementById('floatingReviewBox');
  const closeBtn = document.getElementById('closeReviewBtn');
  const toggleBtn = document.getElementById('toggleReviewBtn');
  const reviewList = document.getElementById('userReviewsList');

  if (reviewBox && closeBtn && toggleBtn) {
      loadReviews();
      setTimeout(() => { reviewBox.classList.add('show-up'); }, 2000);

      window.addEventListener('scroll', function() {
          if (window.scrollY > 300) {
              reviewBox.classList.remove('show-up');
              toggleBtn.style.display = 'block';
          }
      });

      closeBtn.addEventListener('click', function(e) {
          e.preventDefault();
          reviewBox.classList.remove('show-up');
          toggleBtn.style.display = 'block';
      });

      toggleBtn.addEventListener('click', function() {
          reviewBox.classList.add('show-up');
          toggleBtn.style.display = 'none';
      });
  }

  function saveToLocalStorage(reviews) {
      try { localStorage.setItem('codexReviews', JSON.stringify(reviews)); } 
      catch (e) { console.warn("LocalStorage full"); }
  }

  function getFromLocalStorage() {
      try { return JSON.parse(localStorage.getItem('codexReviews')) || []; } 
      catch (e) { return []; }
  }

  function loadReviews() {
      if (!reviewList) return;
      reviewList.innerHTML = "";
      const reviews = getFromLocalStorage();
      if (reviews.length === 0) {
           reviewList.innerHTML = '<div class="review-item"><div class="text">No reviews yet. Be the first!</div></div>';
           return;
      }
      reviews.forEach(review => {
          const newReview = document.createElement('div');
          newReview.className = 'review-item';
          newReview.innerHTML = `<div class="author">${review.name}</div><div class="text">${review.text}</div>`;
          reviewList.appendChild(newReview);
      });
  }

  window.submitUserReview = function() {
      const nameInput = document.getElementById('revName');
      const textInput = document.getElementById('revText');
      if (!nameInput || !textInput) return;
      const name = nameInput.value.trim();
      const text = textInput.value.trim();
      if (name === "" || text === "") { alert("Please fill all fields"); return; }
      let reviews = getFromLocalStorage();
      reviews.unshift({ name, text });
      saveToLocalStorage(reviews);
      loadReviews();
      nameInput.value = "";
      textInput.value = "";
  };

  /* ===================== LAZY LOAD BACKGROUND IMAGES ===================== */
  let lazyBackgrounds = document.querySelectorAll(".lazy-bg");
  let lazyObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
          if (entry.isIntersecting) {
              let element = entry.target;
              let imgSrc = element.getAttribute("data-bg");
              if (imgSrc) {
                  let img = new Image();
                  img.src = imgSrc;
                  img.onload = function() {
                      element.style.backgroundImage = "url('" + imgSrc + "')";
                      element.classList.remove("lazy-load-placeholder");
                  };
              }
              observer.unobserve(element);
          }
      });
  });
  lazyBackgrounds.forEach(function(bg) { lazyObserver.observe(bg); });

});