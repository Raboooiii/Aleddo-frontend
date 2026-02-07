// UPDATED Navbar visibility control - Shows at start, hides on scroll down, shows on scroll up
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const scrollThreshold = 100; // Pixels to scroll before navbar starts hiding

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // If scrolled down more than threshold and scrolling down
  if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
    // Scrolling down - hide navbar
    navbar.classList.add('hidden');
  } else {
    // Scrolling up or at top - show navbar
    navbar.classList.remove('hidden');
  }
  
  lastScrollTop = scrollTop;
});

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.querySelector('.navbar nav');

mobileMenuBtn.addEventListener('click', function() {
  navMenu.classList.toggle('active');
  mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.navbar nav a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Logo click functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Enhanced animations for all sections - UPDATED
function initScrollAnimations() {
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animate class to the section
        entry.target.classList.add('animate');
        
        // Animate child elements with staggered delay
        const elementsToAnimate = entry.target.querySelectorAll('.enterprise-item, .engagement-card, .location-card, .process-step, .complete-ai-suite, .privacy-section, .why-choose-metrics, .tablet-container, .about-content, .dubai-left, .dubai-right, .case-study-heading, .case-study-nav, .story-container, .section-title, .sponsors-carousel, .whats-next, .contact-intro, .contact-form-container');
        
        elementsToAnimate.forEach((element, index) => {
          setTimeout(() => {
            element.classList.add('animate');
          }, index * 100);
        });
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });
  
  sections.forEach(section => {
    if (section.id !== 'home') { // Skip hero section
      observer.observe(section);
    }
  });
}

// UPDATED Social Media Flower - Simple pop-out on right side, no movement animations
function initSocialFlower() {
  const socialMainBtn = document.getElementById('socialMainBtn');
  const socialPetals = document.querySelectorAll('.social-petal');
  const socialOverlay = document.getElementById('socialOverlay');
  let isOpen = false;
  
  // Toggle flower bloom
  socialMainBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    isOpen = !isOpen;
    
    // Toggle main button rotation
    socialMainBtn.classList.toggle('active');
    
    // Toggle petals with staggered animation
    socialPetals.forEach((petal, index) => {
      setTimeout(() => {
        petal.classList.toggle('active');
      }, index * 100);
    });
    
    // Toggle overlay
    socialOverlay.classList.toggle('active');
  });
  
  // Close flower when clicking overlay
  socialOverlay.addEventListener('click', function() {
    if (isOpen) {
      isOpen = false;
      socialMainBtn.classList.remove('active');
      
      // Close petals with reverse stagger
      socialPetals.forEach((petal, index) => {
        setTimeout(() => {
          petal.classList.remove('active');
        }, (socialPetals.length - index - 1) * 50);
      });
      
      socialOverlay.classList.remove('active');
    }
  });
  
  // Close flower when clicking outside
  document.addEventListener('click', function(e) {
    if (isOpen && !e.target.closest('.social-flower')) {
      isOpen = false;
      socialMainBtn.classList.remove('active');
      
      // Close petals with reverse stagger
      socialPetals.forEach((petal, index) => {
        setTimeout(() => {
          petal.classList.remove('active');
        }, (socialPetals.length - index - 1) * 50);
      });
      
      socialOverlay.classList.remove('active');
    }
  });
  
  // Close flower with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isOpen) {
      isOpen = false;
      socialMainBtn.classList.remove('active');
      
      socialPetals.forEach(petal => {
        petal.classList.remove('active');
      });
      
      socialOverlay.classList.remove('active');
    }
  });
  
  // Special handling for call button
  const callBtn = document.querySelector('.call-btn');
  if (callBtn) {
    callBtn.addEventListener('click', function(e) {
      // Smooth scroll to contact section
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        window.scrollTo({
          top: contactSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
      
      // Close flower after click
      isOpen = false;
      socialMainBtn.classList.remove('active');
      socialPetals.forEach(petal => {
        petal.classList.remove('active');
      });
      socialOverlay.classList.remove('active');
    });
  }
}

// Mouse move effects
window.addEventListener("mousemove", (e) => {
  const hero = document.querySelector(".hero");
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
  
  // Add subtle movement to robot
  const robot = document.querySelector('.robot-background');
  const robotX = (e.clientX / window.innerWidth - 0.5) * 15;
  const robotY = (e.clientY / window.innerHeight - 0.5) * 10;
  robot.style.transform = `translate(-50%, -50%) translate(${robotX}px, ${robotY}px)`;
});

// Get Started button functionality
const getStartedBtn = document.getElementById('getStartedBtn');

getStartedBtn.addEventListener('click', function(e) {
  e.preventDefault();
  
  // Click animation
  this.style.transform = 'translateY(-1px) scale(0.96)';
  this.style.transition = 'transform 0.15s ease';
  this.style.boxShadow = '0 4px 15px rgba(104, 128, 237, 0.3)';
  
  setTimeout(() => {
    this.style.transform = 'translateY(-3px) scale(1)';
    this.style.boxShadow = '0 8px 25px rgba(104, 128, 237, 0.4)';
  }, 150);
  
  // Smooth scroll to contact section
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    window.scrollTo({
      top: contactSection.offsetTop - 80,
      behavior: 'smooth'
    });
  }
});

// Adjust robot size based on screen size
function adjustRobotSize() {
  const robotBackground = document.querySelector('.robot-background');
  
  if (window.innerWidth < 480) {
    robotBackground.style.width = '350px';
    robotBackground.style.height = '350px';
    robotBackground.style.top = '18%';
  } else if (window.innerWidth < 600) {
    robotBackground.style.width = '400px';
    robotBackground.style.height = '400px';
    robotBackground.style.top = '20%';
  } else if (window.innerWidth < 768) {
    robotBackground.style.width = '550px';
    robotBackground.style.height = '550px';
    robotBackground.style.top = '20%';
  } else if (window.innerWidth < 900) {
    robotBackground.style.width = '700px';
    robotBackground.style.height = '700px';
    robotBackground.style.top = '25%';
  } else if (window.innerWidth < 1024) {
    robotBackground.style.width = '800px';
    robotBackground.style.height = '800px';
    robotBackground.style.top = '25%';
  } else if (window.innerWidth < 1200) {
    robotBackground.style.width = '850px';
    robotBackground.style.height = '850px';
    robotBackground.style.top = '25%';
  } else {
    robotBackground.style.width = '1000px';
    robotBackground.style.height = '1000px';
    robotBackground.style.top = '30%';
  }
}

window.addEventListener('resize', adjustRobotSize);
window.addEventListener('load', adjustRobotSize);

// Typing Animation for About Section
function initTypingAnimation() {
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    typingElement.classList.add('typing-animation');
    
    // Set the animation duration based on text length
    typingElement.style.animationDuration = '3s';
    
    // Animate text character by character
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        // After animation completes, remove the cursor
        setTimeout(() => {
          typingElement.style.borderRight = 'none';
          typingElement.style.animation = 'none';
        }, 1000);
      }
    };
    
    // Start typing after a delay
    setTimeout(typeWriter, 500);
    
    // Animate tech pills
    const techPills = document.querySelectorAll('.tech-pill');
    techPills.forEach((pill, index) => {
      setTimeout(() => {
        pill.classList.add('visible');
      }, 1000 + (index * 200));
    });
  }
}

// Enhanced Enterprise Item Animations
function initEnterpriseAnimations() {
  const enterpriseItems = document.querySelectorAll('.enterprise-item');
  
  enterpriseItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('animate');
      
      // Animate list items
      const listItems = item.querySelectorAll('.enterprise-list li');
      listItems.forEach((li, liIndex) => {
        setTimeout(() => {
          li.style.opacity = '1';
          li.style.transform = 'translateX(0)';
        }, (index * 200) + (liIndex * 100) + 300);
      });
      
      // Animate button
      const button = item.querySelector('.view-more-btn');
      setTimeout(() => {
        button.style.opacity = '1';
        button.style.transform = 'translateY(0)';
      }, (index * 200) + 600);
    }, index * 200);
  });
}

// Enhanced tablet animation
function initTabletAnimation() {
  const tablet = document.querySelector('.tablet-frame');
  const tabletShadow = document.querySelector('.tablet-shadow');
  
  if (tablet) {
    // Enhanced hover effect
    tablet.addEventListener('mouseenter', () => {
      tablet.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(-5deg) translateY(-10px) scale(1.02)';
      tabletShadow.style.opacity = '0.5';
      tabletShadow.style.transform = 'translateY(-15px) scale(1.05)';
    });
    
    tablet.addEventListener('mouseleave', () => {
      tablet.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
      tabletShadow.style.opacity = '0.3';
      tabletShadow.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add click effect for tablet
    tablet.addEventListener('click', () => {
      tablet.style.transform = 'scale(0.95)';
      setTimeout(() => {
        tablet.style.transform = 'scale(1)';
      }, 150);
    });
  }
}

// Case Study Instagram Story Functionality
function initCaseStudyStories() {
  const navButtons = document.querySelectorAll('.case-study-nav-btn');
  const storyContents = document.querySelectorAll('.story-content');
  const storyDots = document.querySelectorAll('.story-dot');
  const prevBtn = document.getElementById('storyPrev');
  const nextBtn = document.getElementById('storyNext');
  const progressBars = document.querySelectorAll('.story-progress-fill');
  
  let currentStory = 0;
  let autoPlayInterval;
  const totalStories = storyContents.length;
  const storyDuration = 8000; // 8 seconds per story
  
  // Reset all stories
  function resetAllStories() {
    storyContents.forEach(content => {
      content.classList.remove('active');
      content.style.opacity = '0';
      content.style.transform = 'translateY(20px)';
    });
    
    navButtons.forEach(btn => btn.classList.remove('active'));
    storyDots.forEach(dot => dot.classList.remove('active'));
    
    // Reset progress bars
    progressBars.forEach(bar => {
      bar.style.width = '0%';
    });
  }
  
  // Show specific story
  function showStory(index) {
    resetAllStories();
    
    // Ensure index is within bounds
    if (index < 0) index = totalStories - 1;
    if (index >= totalStories) index = 0;
    
    currentStory = index;
    
    // Show selected story
    storyContents[index].classList.add('active');
    setTimeout(() => {
      storyContents[index].style.opacity = '1';
      storyContents[index].style.transform = 'translateY(0)';
    }, 50);
    
    // Update navigation buttons
    navButtons.forEach((btn, i) => {
      if (btn.dataset.category === storyContents[index].dataset.category) {
        btn.classList.add('active');
      }
    });
    
    // Update dots
    storyDots[index].classList.add('active');
    
    // Animate progress bar
    progressBars.forEach((bar, i) => {
      if (i === index) {
        bar.style.transition = `width ${storyDuration}ms linear`;
        bar.style.width = '100%';
      } else if (i < index) {
        bar.style.width = '100%';
      } else {
        bar.style.width = '0%';
      }
    });
    
    // Scroll to active nav button on mobile
    if (window.innerWidth < 768) {
      const activeBtn = document.querySelector(`.case-study-nav-btn[data-category="${storyContents[index].dataset.category}"]`);
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }
  }
  
  // Next story
  function nextStory() {
    showStory(currentStory + 1);
  }
  
  // Previous story
  function prevStory() {
    showStory(currentStory - 1);
  }
  
  // Auto-play stories
  function startAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextStory, storyDuration);
  }
  
  // Stop auto-play
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }
  
  // Event listeners for navigation buttons
  navButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      const targetStory = Array.from(storyContents).findIndex(content => content.dataset.category === category);
      if (targetStory !== -1) {
        showStory(targetStory);
        startAutoPlay();
      }
    });
  });
  
  // Event listeners for navigation arrows
  prevBtn.addEventListener('click', () => {
    prevStory();
    startAutoPlay();
  });
  
  nextBtn.addEventListener('click', () => {
    nextStory();
    startAutoPlay();
  });
  
  // Event listeners for dots
  storyDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showStory(index);
      startAutoPlay();
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevStory();
      startAutoPlay();
    } else if (e.key === 'ArrowRight') {
      nextStory();
      startAutoPlay();
    }
  });
  
  // Pause on hover
  const storyContainer = document.querySelector('.story-container');
  storyContainer.addEventListener('mouseenter', stopAutoPlay);
  storyContainer.addEventListener('mouseleave', startAutoPlay);
  
  // Initialize first story
  showStory(0);
  startAutoPlay();
}

// NEW Privacy Cards Rotation with Diagonal Overlap Carousel
function initPrivacyCards() {
  const privacyCards = document.querySelectorAll('.privacy-card');
  const cardDots = document.querySelectorAll('.card-dot');
  const cardPrevBtn = document.getElementById('cardPrev');
  const cardNextBtn = document.getElementById('cardNext');
  
  let currentCardIndex = 0;
  let autoRotateInterval;
  const totalCards = privacyCards.length;
  
  // Show specific card with diagonal positioning
  function showCard(index) {
    // Reset all cards
    privacyCards.forEach((card, i) => {
      card.classList.remove('active', 'prev', 'next');
      
      // Set initial positions for diagonal overlap
      if (i === 0) {
        card.style.transform = 'translateX(0) translateY(0) rotate(-4deg)';
      } else if (i === 1) {
        card.style.transform = 'translateX(30px) translateY(25px) rotate(-1deg)';
      } else if (i === 2) {
        card.style.transform = 'translateX(60px) translateY(50px) rotate(2deg)';
      }
      
      card.style.opacity = '0';
      card.style.zIndex = i + 1;
    });
    
    cardDots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show selected card (front and center)
    privacyCards[index].classList.add('active');
    privacyCards[index].style.opacity = '1';
    privacyCards[index].style.transform = 'translateX(0) translateY(0) rotate(0deg) scale(1)';
    privacyCards[index].style.zIndex = '10';
    privacyCards[index].style.filter = 'blur(0px)';
    
    // Set previous card (left side)
    const prevIndex = (index - 1 + totalCards) % totalCards;
    privacyCards[prevIndex].classList.add('prev');
    privacyCards[prevIndex].style.opacity = '0.6';
    privacyCards[prevIndex].style.transform = 'translateX(-120px) translateY(15px) rotate(-6deg) scale(0.85)';
    privacyCards[prevIndex].style.zIndex = '8';
    privacyCards[prevIndex].style.filter = 'blur(1px)';
    
    // Set next card (right side)
    const nextIndex = (index + 1) % totalCards;
    privacyCards[nextIndex].classList.add('next');
    privacyCards[nextIndex].style.opacity = '0.6';
    privacyCards[nextIndex].style.transform = 'translateX(120px) translateY(15px) rotate(6deg) scale(0.85)';
    privacyCards[nextIndex].style.zIndex = '8';
    privacyCards[nextIndex].style.filter = 'blur(1px)';
    
    // Update dots
    cardDots[index].classList.add('active');
    
    currentCardIndex = index;
  }
  
  // Next card
  function nextCard() {
    const nextIndex = (currentCardIndex + 1) % totalCards;
    showCard(nextIndex);
  }
  
  // Previous card
  function prevCard() {
    const prevIndex = (currentCardIndex - 1 + totalCards) % totalCards;
    showCard(prevIndex);
  }
  
  // Auto rotate cards
  function startAutoRotate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(nextCard, 5000);
  }
  
  // Stop auto rotation
  function stopAutoRotate() {
    clearInterval(autoRotateInterval);
  }
  
  // Event listeners for card dots
  cardDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showCard(index);
      startAutoRotate();
    });
  });
  
  // Event listeners for navigation arrows
  if (cardPrevBtn) {
    cardPrevBtn.addEventListener('click', () => {
      prevCard();
      startAutoRotate();
    });
  }
  
  if (cardNextBtn) {
    cardNextBtn.addEventListener('click', () => {
      nextCard();
      startAutoRotate();
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevCard();
      startAutoRotate();
    } else if (e.key === 'ArrowRight') {
      nextCard();
      startAutoRotate();
    }
  });
  
  // Pause rotation on hover
  const privacyCardsContainer = document.querySelector('.privacy-cards-container');
  if (privacyCardsContainer) {
    privacyCardsContainer.addEventListener('mouseenter', stopAutoRotate);
    privacyCardsContainer.addEventListener('mouseleave', startAutoRotate);
  }
  
  // Initialize first card and start rotation
  showCard(0);
  startAutoRotate();
}

// Contact Form Submission
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!firstName || !lastName || !email || !mobile) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // In a real application, you would send this data to a server
    // For now, we'll show a success message
    const submitBtn = contactForm.querySelector('.contact-submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = 'SENDING...';
    submitBtn.style.opacity = '0.8';
    submitBtn.style.cursor = 'not-allowed';
    
    // Simulate API call
    setTimeout(() => {
      // Show success message
      alert(`Thank you ${firstName} ${lastName}! We have received your message and will contact you at ${email} within 24 hours.`);
      
      // Reset form
      contactForm.reset();
      
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.style.opacity = '1';
      submitBtn.style.cursor = 'pointer';
    }, 1500);
  });
}

// Enterprise modal functionality
const enterpriseModal = document.getElementById('enterpriseModal');
const closeModalBtn = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

// Updated Modal content data with your specifications
const modalContents = {
  'ai-solutions': {
    title: 'CUSTOM AI SOLUTIONS',
    content: `
      <p><strong>CUSTOM AI SOLUTIONS</strong></p>
      <p>We build AI solutions tailored to your unique business requirements, that automate, optimize, and scale your operations, from Predictive Analytics and Machine Learning Model Development to Computer Vision, Natural Language Processing (NLP), AI-Powered RPA, Generative AI, Document Processing & OCR Automation.</p>
      
      <p><strong>Business Intelligence, Advanced Analytics & Data Engineering</strong></p>
      <p>Uncover actionable insights from complex data and drive smarter, data-driven decisions with seamless visualization and analysis using Power BI, Tableau, or Alteryx. Monitor key performance metrics in real time, automate reporting, and leverage a robust, scalable data foundation that grows with your organization.</p>
      
      <p><strong>AI Automation, Conversational AI Chatbots & Voice Agents</strong></p>
      <p>Enabling businesses to automate, streamline operations and reduce manual effort across both customer facing and internal workflows. This includes intelligent document processing that can read and extract data from PDFs, Excel files, scanned documents, invoices, and forms, applying your specific business rules for validation and automation while escalating to human review whenever required.</p>
      
      <p>From AI voice agents that handle outbound cold calling to custom trained AI chatbots built with NLP, RAG, and domain-specific models, we develop intelligent assistants that deliver fast, accurate, and human like responses. These agents can handle real-time customer queries like "Where is my order?" or "How can I request a quote?", while internal AI assistants help employees with operational tasks such as "Show me all user access changes in the financial system between April and June 2025."</p>
    `
  },
  'web-development': {
    title: 'CUSTOM WEB & SOFTWARE DEVELOPMENT',
    content: `
      <p><strong>CUSTOM WEB & SOFTWARE DEVELOPMENT</strong></p>
      <p>Build scalable, high-performance web and software solutions tailored to your business needs from enterprise platforms to custom applications that enhance efficiency, user experience, and digital growth.</p>
      
      <p><strong>Key Services:</strong></p>
      <ul>
        <li>Custom Web Applications & Enterprise Software</li>
        <li>Mobile App Development (iOS & Android)</li>
        <li>E-commerce Solutions & CMS Development</li>
      </ul>
      
      <p>Our development approach combines cutting-edge technologies with industry best practices to deliver solutions that are not only visually compelling but also highly functional, secure, and scalable. We work closely with your team to understand your unique requirements and deliver solutions that drive tangible business results.</p>
      
      <p>Whether you need a customer-facing web application, an internal enterprise platform, or a mobile app to reach your customers on the go, we have the expertise to bring your vision to life.</p>
    `
  },
  'data-analytics': {
    title: 'DATA ANALYTICS',
    content: `
      <p><strong>DATA ANALYTICS</strong></p>
      <p>Transform raw data into actionable business intelligence with our comprehensive data analytics solutions. We help organizations make informed decisions, optimize operations, and uncover hidden opportunities through advanced analytics.</p>
      
      <p><strong>Advanced Data Analytics & Business Intelligence</strong></p>
      <p>We provide end-to-end data analytics solutions that transform complex datasets into clear, actionable insights. Our services include data mining, statistical analysis, and predictive modeling to help you understand trends, patterns, and correlations in your data.</p>
      
      <p><strong>Predictive Modeling & Machine Learning</strong></p>
      <p>Leverage the power of machine learning to forecast future trends, customer behavior, and business outcomes. Our predictive models help you stay ahead of market changes, optimize resource allocation, and make proactive decisions.</p>
      
      <p><strong>Real-time Dashboards & Reporting</strong></p>
      <p>Access critical business metrics through intuitive, real-time dashboards and automated reporting systems. We create customized visualization tools that provide stakeholders at all levels with the information they need to drive performance and growth.</p>
      
      <p>Our data analytics solutions are designed to scale with your business, ensuring that you continue to derive value from your data as your organization grows and evolves.</p>
    `
  },
  'consulting': {
    title: 'CONSULTING SERVICES',
    content: `
      <p><strong>CONSULTING SERVICES</strong></p>
      <p>Navigate the complexities of digital transformation and AI implementation with expert guidance and strategic planning from our experienced consultants.</p>
      
      <p><strong>AI Strategy & Digital Transformation</strong></p>
      <p>Develop a comprehensive AI strategy aligned with your business objectives. We help you assess your current technology landscape, identify opportunities for AI adoption, and create a roadmap for successful digital transformation.</p>
      
      <p><strong>Technology Consulting & Implementation</strong></p>
      <p>Get expert guidance on technology selection, architecture design, and implementation planning. We help you choose the right tools and platforms for your needs and ensure successful deployment with minimal disruption to your operations.</p>
      
      <p><strong>Training & Support Services</strong></p>
      <p>Empower your team with comprehensive training programs and ongoing support. We help your organization build internal capabilities and ensure that you can maximize the value of your technology investments over the long term.</p>
      
      <p>Our consulting approach combines deep industry expertise with practical implementation experience. We work as an extension of your team to deliver sustainable results and measurable business impact, ensuring that your digital transformation journey is both successful and aligned with your strategic goals.</p>
    `
  }
};

// Open modal when "View more" is clicked
document.querySelectorAll('.view-more-btn').forEach(button => {
  button.addEventListener('click', function() {
    const solutionType = this.getAttribute('data-type');
    const content = modalContents[solutionType];
    
    if (content) {
      modalTitle.textContent = content.title;
      modalBody.innerHTML = content.content;
      enterpriseModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
  });
});

// Close modal
closeModalBtn.addEventListener('click', function() {
  enterpriseModal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside content
enterpriseModal.addEventListener('click', function(e) {
  if (e.target === this) {
    enterpriseModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && enterpriseModal.classList.contains('active')) {
    enterpriseModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  }
});

// Smooth scroll for navigation links
function initSmoothScroll() {
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Engagement button interactions
  document.querySelectorAll('.engagement-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Smooth scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        window.scrollTo({
          top: contactSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize sponsors carousel
  const sponsorsCarousel = new Splide('#sponsorsCarousel', {
    type: 'loop',
    perPage: 4,
    perMove: 1,
    gap: '40px',
    autoplay: true,
    interval: 2000,
    pauseOnHover: true,
    pauseOnFocus: false,
    speed: 2000,
    easing: 'linear',
    drag: true,
    arrows: false,
    pagination: false,
    breakpoints: {
      1200: {
        perPage: 3,
        gap: '30px',
      },
      768: {
        perPage: 2,
        gap: '20px',
      },
      480: {
        perPage: 1,
        gap: '15px',
      },
    },
  });
  
  sponsorsCarousel.mount();
  
  // Wait for logo animation to complete
  setTimeout(() => {
    initTypingAnimation();
    initEnterpriseAnimations();
    initTabletAnimation();
    initCaseStudyStories();
    initPrivacyCards();
    initSocialFlower();
    initContactForm();
    initSmoothScroll();
    initScrollAnimations();
  }, 3500);
});