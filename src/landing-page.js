const navbar = document.querySelector("nav");
const hamburger = document.querySelector("#hamburger");
const hamburgerIcon = document.querySelector("#hamburger-icon");
const menu = document.querySelector("#menu");
const btnMenu = document.querySelector("#btnMenu");

// Ensure the menu is hidden and hamburger icon is reset on page load
const initializeMenu = () => {
  if (window.innerWidth < 768) {
    menu.classList.add("hidden");
    btnMenu.classList.add("hidden");

    // Reset the hamburger icon to default state
    hamburger.setAttribute("data-state", "closed");
    hamburgerIcon.src = "./assets/hamburger.png";
    hamburger.classList.remove("rotate-180");

    // Reset navbar background if any
    if (window.scrollY <= 100) {
      navbar.classList.remove("bg-[#202020]");
    }
  }
};

// Toggle menu and handle hamburger icon
hamburger.addEventListener("click", () => {
  if (window.innerWidth < 768) {
    const isOpen = hamburger.getAttribute("data-state") === "open";
    menu.classList.toggle("hidden");
    btnMenu.classList.toggle("hidden");
    navbar.classList.add("bg-[#202020]");

    // Toggle between hamburger and closing icon
    hamburger.setAttribute("data-state", isOpen ? "closed" : "open");
    hamburgerIcon.src = isOpen ? "./assets/hamburger.png" : "./assets/closing-icon.png";

    // Add a rotation animation
    hamburger.classList.toggle("rotate-180");

    // Remove background only if menu is closed and scroll is at the top
    if (!isOpen && window.scrollY <= 100) {
      navbar.classList.remove("bg-[#202020]");
    }
  }
});

// Ensure the menu is visible for larger screens
const handleResize = () => {
  if (window.innerWidth >= 768) {
    menu.classList.remove("hidden");
    btnMenu.classList.remove("hidden");

    // Reset the hamburger icon to its default state
    hamburger.setAttribute("data-state", "closed");
    hamburgerIcon.src = "./assets/hamburger.png";
    hamburger.classList.remove("rotate-180");

    // Remove navbar background color
    navbar.classList.remove("bg-[#202020]");
  } else {
    initializeMenu(); // Reinitialize menu for smaller screens
  }
};

// Add a resize event listener to handle dynamic resizing
window.addEventListener("resize", handleResize);

// Initial setup when the page loads
window.addEventListener("DOMContentLoaded", () => {
  initializeMenu();
  handleResize();
});

// Add scroll effect to make navbar fixed after scrolling 100px
const handleScroll = () => {
  const isMobile = window.innerWidth < 768;
  const isMenuOpen = hamburger.getAttribute("data-state") === "open";

  if (window.scrollY > 100 || (isMobile && isMenuOpen)) {
    navbar.classList.add("fixed", "top-0", "left-0", "w-full", "z-50", "bg-[#202020]");
    navbar.classList.remove("relative");
  } else {
    navbar.classList.remove("fixed", "top-0", "left-0", "w-full", "z-50", "bg-[#202020]");
    navbar.classList.add("relative");
  }
};

// Add a scroll event listener
window.addEventListener("scroll", handleScroll);



document.addEventListener("DOMContentLoaded", () => {
  // Adjust animation duration for the USDT container
  const usdt = document.querySelector(".usdt-container");
  if (usdt) usdt.style.animationDuration = "15s";

  // Select elements for the carousel
  const slides = document.querySelectorAll(
    "#reviews-carousel .flex.flex-shrink-0"
  );
  const prevButton = document.querySelector(
    "#reviews-carousel svg:first-child"
  );
  const nextButton = document.querySelector("#reviews-carousel svg:last-child");
  const dots = document.querySelectorAll(".dots-container .dot");

  let currentSlide = 0;

  // Function to update the slider position
  function updateSlidePosition() {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
    });
  }

  // Function to show the correct slide and update active dot
  function showSlide(index) {
    dots.forEach((dot) => dot.classList.remove("active"));

    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }

    currentSlide = index;
    dots[currentSlide].classList.add("active");
    updateSlidePosition();
  }

  // Event listeners for navigation buttons
  nextButton.addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });

  prevButton.addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });

  // Event listeners for dot buttons
  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideIndex = parseInt(e.target.getAttribute("data-slide"));
      showSlide(slideIndex);
    });
  });

  showSlide(currentSlide); // Initial slide and dot setup

  // Select the SVG elements
  const prevButtonSvg = document.querySelector(".nav-button.prev path");
  const nextButtonSvg = document.querySelector(".nav-button.next path");

  // Function to change the fill color on click
  function changeFillColor(event) {
    prevButtonSvg.setAttribute("fill", "#AAAAAA");
    nextButtonSvg.setAttribute("fill", "#AAAAAA");
    event.target.setAttribute("fill", "#E8C36C");
  }

  prevButtonSvg.addEventListener("click", changeFillColor);
  nextButtonSvg.addEventListener("click", changeFillColor);

  // FAQs
  const faqs = [
    {
      question: "How Can I Trade Well?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Aliquam placerat dignissim adipiscing integer pharetra donec aliquet ut vitae.",
    },
    {
      question: "What is Forex Trading?",
      answer:
        "Forex trading is the process of buying and selling currencies to make a profit. It is a highly liquid and volatile market.",
    },
    {
      question: "How to Get Started?",
      answer:
        "To get started, you need to create a trading account with a broker, fund it, and start placing trades based on market analysis.",
    },
    {
      question: "What is the Minimum Deposit?",
      answer:
        "The minimum deposit varies depending on the broker, but generally, you can start with as little as $50 to $100.",
    },
  ];

  const questionButtons = document.querySelectorAll(".faq-question");
  const answerContent = document.querySelector(".answer-content");

  // Function to update the answer display
  function displayAnswer(index) {
    answerContent.innerHTML = `<p>${faqs[index].answer}</p>`;
    questionButtons.forEach((button) =>
      button.classList.remove("bg-[#E8C36C]", "text-black")
    );
    questionButtons[index].classList.add("bg-[#E8C36C]", "text-black");
  }

  questionButtons.forEach((button, index) => {
    button.addEventListener("click", () => displayAnswer(index));
  });

  displayAnswer(0); // Show the first FAQ answer by default
});
