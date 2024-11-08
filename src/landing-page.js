document.addEventListener('DOMContentLoaded', () => {
    // Adjust animation duration for the USDT container
    const usdt = document.querySelector('.usdt-container');
    if (usdt) usdt.style.animationDuration = '15s';

    // Select elements for the carousel
    const slides = document.querySelectorAll('#reviews-carousel .flex.flex-shrink-0');
    const prevButton = document.querySelector('#reviews-carousel svg:first-child');
    const nextButton = document.querySelector('#reviews-carousel svg:last-child');
    const dots = document.querySelectorAll('.dots-container .dot');
    
    let currentSlide = 0;

    // Function to update the slider position
    function updateSlidePosition() {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
        });
    }

    // Function to show the correct slide and update active dot
    function showSlide(index) {
        dots.forEach(dot => dot.classList.remove('active'));

        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }

        currentSlide = index;
        dots[currentSlide].classList.add('active');
        updateSlidePosition();
    }

    // Event listeners for navigation buttons
    nextButton.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    prevButton.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    // Event listeners for dot buttons
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideIndex = parseInt(e.target.getAttribute('data-slide'));
            showSlide(slideIndex);
        });
    });

    showSlide(currentSlide); // Initial slide and dot setup

    // Select the SVG elements
    const prevButtonSvg = document.querySelector('.nav-button.prev path');
    const nextButtonSvg = document.querySelector('.nav-button.next path');

    // Function to change the fill color on click
    function changeFillColor(event) {
        prevButtonSvg.setAttribute('fill', '#AAAAAA');
        nextButtonSvg.setAttribute('fill', '#AAAAAA');
        event.target.setAttribute('fill', '#E8C36C');
    }

    prevButtonSvg.addEventListener('click', changeFillColor);
    nextButtonSvg.addEventListener('click', changeFillColor);

    // FAQs
    const faqs = [
        { question: "How Can I Trade Well?", answer: "Lorem ipsum dolor sit amet consectetur. Aliquam placerat dignissim adipiscing integer pharetra donec aliquet ut vitae." },
        { question: "What is Forex Trading?", answer: "Forex trading is the process of buying and selling currencies to make a profit. It is a highly liquid and volatile market." },
        { question: "How to Get Started?", answer: "To get started, you need to create a trading account with a broker, fund it, and start placing trades based on market analysis." },
        { question: "What is the Minimum Deposit?", answer: "The minimum deposit varies depending on the broker, but generally, you can start with as little as $50 to $100." }
    ];

    const questionButtons = document.querySelectorAll('.faq-question');
    const answerContent = document.querySelector('.answer-content');

    // Function to update the answer display
    function displayAnswer(index) {
        answerContent.innerHTML = `<p>${faqs[index].answer}</p>`;
        questionButtons.forEach(button => button.classList.remove('bg-[#E8C36C]', 'text-black'));
        questionButtons[index].classList.add('bg-[#E8C36C]', 'text-black');
    }

    questionButtons.forEach((button, index) => {
        button.addEventListener('click', () => displayAnswer(index));
    });

    displayAnswer(0);  // Show the first FAQ answer by default
});
