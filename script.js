const menuToggle = document.getElementById('menu-toggle');
const navLinksMobile = document.getElementById('nav-links-mobile');

menuToggle.addEventListener('click', () => {
    navLinksMobile.classList.toggle('active');
});






const rainContainer = document.getElementById("rain-container");

// Function to create raindrops
function createRain() {
  // Determine the number of raindrops based on screen size
  const totalDrops = 80; // Adjust the number of drops as needed

  for (let i = 0; i < totalDrops; i++) {
    const rainDrop = document.createElement("div");
    rainDrop.classList.add("rain-drop");

    // Randomize position and animation delay
    rainDrop.style.left = `${Math.random() * 100}vw`; // Random horizontal position
    rainDrop.style.animationDelay = `${Math.random() * 0.5}s`; // Random animation start time
    rainDrop.style.animationDuration = `${2 + Math.random() * 1}s`; // Random animation speed

    // Append to container
    rainContainer.appendChild(rainDrop);
  }
}

// Ensure rain adjusts to scrolling
function updateRainHeight() {
  const docHeight = document.body.scrollHeight; // Full page height
  rainContainer.style.height = `${docHeight}px`; // Match container height to document height
}

// Initialize rain effect
createRain();
updateRainHeight();

// Update on window resize or content change
window.addEventListener("resize", updateRainHeight);
window.addEventListener("scroll", updateRainHeight);







// Select cursor elements
const cursor = document.querySelector('.cursor');
const cursorFollow = document.querySelector('.cursor-follow');

// Smooth cursor-follow animation with GSAP
document.addEventListener('mousemove', (e) => {
    // Move the small cursor instantly
    gsap.to(cursor, { x: e.pageX, y: e.pageY, duration: 0.1, ease: "power2.out" });

    // Create a smooth trailing effect for the follow cursor
    gsap.to(cursorFollow, {
        x: e.pageX,
        y: e.pageY,
        duration: 0.5, // Increase duration for a smoother trailing
        ease: "power3.out"
    });
});





// 
// vars
'use strict'
var	testim = document.getElementById("testim"),
		testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 4500,
    currentSlide = 0,
    currentActive = 0,
    testimTimer,
		touchStartPos,
		touchEndPos,
		touchPosDiff,
		ignoreTouch = 30;
;

window.onload = function() {

    // Testim Script
    function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");
            testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length-1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive");            
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;
    
        clearTimeout(testimTimer);
        testimTimer = setTimeout(function() {
            playSlide(currentSlide += 1);
        }, testimSpeed)
    }

    testimLeftArrow.addEventListener("click", function() {
        playSlide(currentSlide -= 1);
    })

    testimRightArrow.addEventListener("click", function() {
        playSlide(currentSlide += 1);
    })    

    for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function() {
            playSlide(currentSlide = testimDots.indexOf(this));
        })
    }

    playSlide(currentSlide);

    // keyboard shortcuts
    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37:
                testimLeftArrow.click();
                break;
                
            case 39:
                testimRightArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            default:
                break;
        }
    })
		
		testim.addEventListener("touchstart", function(e) {
				touchStartPos = e.changedTouches[0].clientX;
		})
	
		testim.addEventListener("touchend", function(e) {
				touchEndPos = e.changedTouches[0].clientX;
			
				touchPosDiff = touchStartPos - touchEndPos;
			
				console.log(touchPosDiff);
				console.log(touchStartPos);	
				console.log(touchEndPos);	

			
				if (touchPosDiff > 0 + ignoreTouch) {
						testimLeftArrow.click();
				} else if (touchPosDiff < 0 - ignoreTouch) {
						testimRightArrow.click();
				} else {
					return;
				}
			
		})
}

