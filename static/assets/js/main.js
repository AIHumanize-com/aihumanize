/* ====================================
Template Name: GenAI
Description: AI Content Writing & Copywriting HTML5 Landing Page Template
Template URI: https://themeforest.net/item/genai-ai-based-copywriting-and-content-writing-landing-page-template/45150495
Author: Marvel Theme
Author URI: https://themeforest.net/user/marvel_theme
Version: 1.1
Published: 1 May 2023
Last Update: 9 May 2023
==================================== */

/* Table of contents
====================================
1. AOS initialization
2. Typing text animation
3. Video popup
4. Pricing switch
5. Review carousel
6. Review rolling carousel
7. Review rolling carousel reversed
8. Contact form
9. Sticky navbar

====================================
*/

(function () {
	// 1. AOS initialization
	AOS.init({
		disable: false,
		startEvent: "DOMContentLoaded",
		initClassName: "aos-init",
		animatedClassName: "aos-animate",
		useClassNames: false,
		disableMutationObserver: false,
		debounceDelay: 50,
		throttleDelay: 99,
		offset: 120,
		delay: 50,
		duration: 600,
		easing: "cubic-bezier(0.77, 0, 0.175, 1)",
		once: true,
		mirror: false,
		anchorPlacement: "top-bottom",
	});

	// 2. Typing text animation
	const typedElements = document.querySelectorAll(".typed-animation");
	if (typedElements.length > 0) {
		typedElements.forEach((typedElement) => {
			const typedAnimation = new Typed(typedElement, {
				strings: JSON.parse(typedElement.dataset.strings),
				typeSpeed: 80,
				backSpeed: 40,
				backDelay: 3000,
				startDelay: 1000,
				fadeOut: true,
				loop: true,
			});
		});
	}

	// 3. Video popup
	new VenoBox({
		selector: ".video-play-btn",
	});

	// 4. Pricing switch
	const tableWrapper = document.querySelector(".pricing-table");
	if (tableWrapper) {
		const switchInputs = document.querySelectorAll(".switch-wrapper input");
		const prices = tableWrapper.querySelectorAll(".price");
		const toggleClass = "d-none";

		switchInputs.forEach((switchInput) => {
			switchInput.addEventListener("input", function () {
				prices.forEach((price) => {
					price.classList.add(toggleClass);
				});

				const activePrices = tableWrapper.querySelectorAll(`.price.${switchInput.id}`);
				activePrices.forEach((activePrice) => {
					activePrice.classList.remove(toggleClass);
				});
			});
		});
	}

	// 5. Review carousel
	const reviewCarousel = new Swiper(".review-carousel", {
		loop: false,
		freemode: true,
		slidesPerView: 1,
		spaceBetween: 24,
		speed: 1000,
		autoplay: {
			delay: 3000,
			disableOnInteraction: true,
		},
		pagination: {
			el: ".review-carousel-container .swiper-pagination",
			type: "bullets",
			clickable: true,
		},
		breakpoints: {
			1: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 2,
			},
			1200: {
				slidesPerView: 3,
			},
		},
	});

	// 6. Review rolling carousel
	const reviewRollingCarousel = new Swiper(".review-rolling-carousel", {
		loop: true,
		freemode: true,
		slidesPerView: 1,
		spaceBetween: 24,
		centeredSlides: false,
		allowTouchMove: true,
		speed: 10000,
		autoplay: {
			delay: 1,
			disableOnInteraction: false,
		},
		breakpoints: {
			1: {
				slidesPerView: 1.1,
			},
			768: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 2.5,
			},
			1200: {
				slidesPerView: 3,
			},
			1400: {
				slidesPerView: 3.5,
			},
			1600: {
				slidesPerView: 4,
			},
			1900: {
				slidesPerView: 4.5,
			},
		},
	});

	// 7. Review rolling carousel reversed
	const reviewRollingCarouselReversed = new Swiper(".review-rolling-carousel-reversed", {
		loop: true,
		freemode: true,
		slidesPerView: 1,
		spaceBetween: 24,
		centeredSlides: false,
		allowTouchMove: true,
		speed: 8000,
		autoplay: {
			delay: 1,
			reverseDirection: true,
			disableOnInteraction: false,
		},
		breakpoints: {
			1: {
				slidesPerView: 1.1,
			},
			768: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 2.5,
			},
			1200: {
				slidesPerView: 3,
			},
			1400: {
				slidesPerView: 3.5,
			},
			1600: {
				slidesPerView: 4,
			},
			1900: {
				slidesPerView: 4.5,
			},
		},
	});

	// 8. Contact form
	const form = document.querySelector("#contact-form");

	if (form) {
		const formStatus = form.querySelector(".status");

		form.addEventListener("submit", function (e) {
			e.preventDefault();
			let formData = new FormData(form);

			let xhr = new XMLHttpRequest();
			xhr.open("POST", form.action);
			xhr.onload = function () {
				if (xhr.status === 200) {
					formStatus.classList.remove("d-none");
					formStatus.classList.remove("alert-danger");
					formStatus.classList.add("alert-success");
					formStatus.textContent = xhr.responseText;
					form.reset();
					setTimeout(() => {
						formStatus.classList.add("d-none");
					}, 6000);
				} else {
					formStatus.classList.remove("d-none");
					formStatus.classList.remove("alert-success");
					formStatus.classList.add("alert-danger");
					if (xhr.responseText !== "") {
						formStatus.textContent = xhr.responseText;
					} else {
						formStatus.textContent = "Oops! An error occurred and your message could not be sent.";
					}
					setTimeout(() => {
						formStatus.classList.add("d-none");
					}, 6000);
				}
			};
			xhr.send(formData);
		});
	}

	// 9. Sticky navbar
	const header = document.querySelector(".navbar");
	const htmlBody = document.querySelector("html");

	const headroomOptions = {
		// vertical offset in px before element is first unpinned
		offset: {
			up: 100,
			down: 50,
		},
		// scroll tolerance in px before state changes
		tolerance: {
			up: 5,
			down: 0,
		},
		// css classes to apply
		classes: {
			// when element is initialised
			initial: "headroom",
			// when scrolling up
			pinned: "headroom--pinned",
			// when scrolling down
			unpinned: "headroom--unpinned",
			// when above offset
			top: "headroom--top",
			// when below offset
			notTop: "headroom--not-top",
			// when at bottom of scroll area
			bottom: "headroom--bottom",
			// when not at bottom of scroll area
			notBottom: "headroom--not-bottom",
			// when frozen method has been called
			frozen: "headroom--frozen",
		},
	};

	if (header) {
		// Initialize headroom
		const headroom = new Headroom(header, headroomOptions);
		headroom.init();

		// body padding top of fixed header
		const onSectionTop = header.classList.contains("on-over");
		if (!onSectionTop) {
			const headerHeight = header.offsetHeight;
			htmlBody.style.paddingTop = headerHeight + "px";
			htmlBody.style.scrollPaddingTop = headerHeight + "px";
		}

		// Collapse navbar menu on scoll down
		if (window.matchMedia("(max-width: 991px)").matches) {
			const navbarCollapse = header.querySelector(".navbar-collapse");
			const navbarToggler = header.querySelector(".navbar-toggler");

			window.addEventListener("scroll", () => {
				const scrollPosition = window.scrollY;
				const isExpanded = navbarToggler.getAttribute("aria-expanded") === "true";

				if (isExpanded && scrollPosition > 0) {
					navbarCollapse.classList.remove("show");
					navbarToggler.setAttribute("aria-expanded", "false");
				}
			});
		}
	}
})();
//textarea function
// document.getElementById('humanize-btn').addEventListener('click', function() {
// 	var inputText = document.getElementById('input-text');
// 	var errorMessage = document.getElementById('error-message');

// 	if (inputText.value.trim() === '') {
// 	  inputText.classList.add('error-border');
// 	  errorMessage.textContent = 'Please enter a valid text.';
// 	  errorMessage.style.color='#d53737';
// 	  inputText.style.borderColor = '#d53737';   
// 	} else {
// 	  inputText.classList.remove('error-border');
// 	  errorMessage.textContent = '';
// 	  // Perform humanize action here if needed
// 	}
//   });
  //hidebuttons
  var textarea = document.getElementById('input-text');
  var textareaButtons = document.getElementById('textarea-buttons');

  textarea.addEventListener('input', function () {
	  // Check if the textarea has any input
	  if (textarea.value.trim() !== '') {
		  // If there is input, hide the textarea buttons
		  textareaButtons.style.display = 'none';
	  } else {
		  // If there is no input, show the textarea buttons and set flex direction to row
		  textareaButtons.style.display = 'flex';
		  textareaButtons.style.flexDirection = 'row';
	  }
  });
  //ai-btn
  document.addEventListener('DOMContentLoaded', function () {
    var textarea = document.getElementById('input-text');
    var aiButton = document.getElementById('ai-btn');

    textarea.addEventListener('input', function () {
        if (textarea.value.trim() !== '') {
			aiButton.disabled = false;
            aiButton.style.cursor = 'pointer'; // Set the cursor to pointer when enabled
            aiButton.style.opacity = '1';
			aiButton.style.backgroundColor ='white';
			aiButton.style.border="2px solid #6a4dff";
			aiButton.style.color = '#6a4dff';
			aiButton.style.fontWeight="400";
			 // Reset opacity when enabled
        } else {
			aiButton.disabled = true;
            aiButton.style.cursor = 'not-allowed';
            aiButton.style.opacity = '0.77';
			aiButton.style.backgroundColor ='#6a4dff';
			aiButton.style.color = 'white';
        }
    });
});
var updateWordCount; // Declare the function globally

document.addEventListener('DOMContentLoaded', function () {
    var textarea = document.getElementById('input-text');
    var wordCountSpan = document.getElementById('word-count');

    updateWordCount = function() {
        var text = textarea.value.trim();
        var wordCount = text.split(/\s+/).filter(function (word) {
            return word.length > 0;
        }).length;
        wordCountSpan.textContent = wordCount;
    };

    textarea.addEventListener('input', updateWordCount);
    textarea.addEventListener('keydown', updateWordCount);

    // Initialize word count on page load
    updateWordCount();
});

document.querySelector('.text-area-btn-2').addEventListener('click', function(event) {
	var pasteDiv = event.currentTarget;

	navigator.clipboard.readText()
		.then(text => {
			if (typeof text === 'string') { // Check if the copied content is a string (text)
				document.getElementById('input-text').value = text;
				updateWordCount(); 
				pasteDiv.style.display = 'none'; // Hide or remove the paste button div
			} else {
				console.log('Copied content is not text.');
			}
		})
		.catch(err => {
			console.error('Failed to read clipboard contents: ', err);
		});
});

var humanizeButton = document.getElementById('btn btn-lg btn-gradient-1 aos-init aos-animate');

    humanizeButton.addEventListener('click', function() {
        var textareaContent = document.getElementById('input-text').value;
        var wordCount = textareaContent.split(/\s+/).filter(function(n) { return n != '' }).length;

        if (wordCount < 30) {
            console.error('Error: Please enter at least 30 words.');
            return;
        }

        // Disable the button and add spinner
        humanizeButton.disabled = true;
        humanizeButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

        fetch('humanizer/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textareaContent }),
        })
        .then(response => response.json())
        .then(data => {
            let result_text_area = document.querySelector('.reult-p');
			result_text_area.innerHTML = data.text
            document.getElementById('result-row').style.display = 'block';


			result_text_area.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Re-enable the button and remove spinner
            humanizeButton.disabled = false;
            humanizeButton.innerHTML = 'Humanize';
        })
        .catch(error => {
            console.error('Error:', error);

            // Re-enable the button and remove spinner in case of error
            humanizeButton.disabled = false;
            humanizeButton.innerHTML = 'Humanize';
        });
    });


	document.querySelector('img[alt="copy"]').addEventListener('click', function() {
		let resultTextArea = document.querySelector('.reult-p');
		let textToCopy = resultTextArea.textContent || resultTextArea.innerText;
	
		// Copying text to clipboard
		navigator.clipboard.writeText(textToCopy).then(() => {
			// Change the image or its content temporarily
			let copyImage = this;
			let originalSrc = copyImage.src;
			copyImage.style.disable = 'none'; // Remove the src or hide the image
			copyImage.insertAdjacentHTML('afterend', '<span id="temp-copied">Copied!</span>');
	
			// Revert back to the original image after a short delay
			setTimeout(() => {
				document.getElementById('temp-copied').remove();
				copyImage.style.disable = '';
			}, 2000); // Adjust time as needed
		}).catch(err => {
			console.error('Error copying text: ', err);
		});
	});
	