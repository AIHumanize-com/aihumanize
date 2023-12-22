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
			aiButton.style.backgroundColor = 'white';
			aiButton.style.border = "2px solid #6a4dff";
			aiButton.style.color = '#6a4dff';
			aiButton.style.fontWeight = "400";
			// Reset opacity when enabled
		} else {
			aiButton.disabled = true;
			aiButton.style.cursor = 'not-allowed';
			aiButton.style.opacity = '0.77';
			aiButton.style.backgroundColor = '#6a4dff';
			aiButton.style.color = 'white';
		}
	});
});
var updateWordCount; // Declare the function globally

document.addEventListener('DOMContentLoaded', function () {
	var textarea = document.getElementById('input-text');
	var wordCountSpan = document.getElementById('word-count');

	updateWordCount = function () {
		var text = textarea.value.trim();
		var wordCount = text.split(/\s+/).filter(function (word) {
			return word.length > 0;
		}).length;
		if (wordCount >= 30){
			document.getElementById("min_word_error").style.display = "none"
			
		}
		wordCountSpan.textContent = wordCount;
	};

	textarea.addEventListener('input', updateWordCount);
	textarea.addEventListener('keydown', updateWordCount);

	// Initialize word count on page load
	updateWordCount();
});

document.querySelector('.text-area-btn-2').addEventListener('click', function (event) {
	var pasteDiv = event.currentTarget;

	navigator.clipboard.readText()
		.then(text => {
			if (typeof text === 'string') { // Check if the copied content is a string (text)
				document.getElementById('input-text').value = text;
				updateWordCount();
				pasteDiv.style.display = 'none'; // Hide or remove the paste button div
				document.getElementById('ai-btn').style = "cursor: pointer; opacity: 1; background-color: white; border: 2px solid rgb(106, 77, 255); color: rgb(106, 77, 255); font-weight: 400;"
			} else {
				console.log('Copied content is not text.');
			}
		})
		.catch(err => {
			console.error('Failed to read clipboard contents: ', err);
		});
});




var humanizeButton = document.getElementById('hummani-main-btn');
var purpose = document.getElementById('purpose');
// var readability = document.getElementById('readability');
// var level = document.getElementById('level');
humanizeButton.addEventListener('click', function () {
	var textareaContent = document.getElementById('input-text').value;
	var wordCount = textareaContent.split(/\s+/).filter(function (n) { return n != '' }).length;

	if (wordCount < 30) {
		let error_p = document.getElementById("min_word_error")
		error_p.style.display = ''
		return;
	}
	// Identify the selected model
    var selectedModel = '';
    if (document.querySelector('.ninja-box').classList.contains('active')) {
        selectedModel = 'Falcon';
    } else if (document.querySelector('.ghost-box').classList.contains('active')) {
        selectedModel = 'Maestro';
    }
	console.log(selectedModel)
	// Disable the button and add spinner
	humanizeButton.disabled = true;
	humanizeButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
	
	// let level = document.getElementById("level").value
	// let readability = document.getElementById("readability").value

	
	fetch('humanizer/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ text: textareaContent, model: selectedModel }),
	})
		.then(response => response.json())
		.then(data => {
			if (data.error) {
				console.log(data.error)
				if (data.error == 'word_limit_reached') {
					let errorMessageP = document.getElementById('error-message');
					errorMessageP.textContent = "Now we can proccess up to 1000 words. Please enter fewer words";
					humanizeButton.disabled = false;
					humanizeButton.innerHTML = 'Humanize';
					return
				}
				else{
					var wordLimitModal = new bootstrap.Modal(document.getElementById('wordLimitModal'));
				wordLimitModal.show();
				// Other necessary actions
				humanizeButton.disabled = false;
				humanizeButton.innerHTML = 'Humanize';
				return;
				}
				// Display the modal for word limit reached
				
			}
			let result_text_area = document.querySelector('.reult-p');
			let resultRow = document.getElementById('result-row')
			result_text_area.textContent = '';
			result_text_area.textContent = data.text
			resultRow.style.display = 'block';


			resultRow.scrollIntoView({ behavior: 'smooth', block: 'start' });

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


document.querySelector('img[alt="copy"]').addEventListener('click', function () {
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


document.getElementById("ai-btn").addEventListener("click", function () {
    var button = this;
    
    // Disable the button
    button.disabled = true;
	var detectorAnswer = document.getElementById("detector-answer");
	var tableDiv = document.getElementById("tableDiv");
	var aiAvarage = document.getElementById("aiAvarage");
	var humanAvarage = document.getElementById("humanAvarage");
	detectorAnswer.style.display = "none";
	tableDiv.style.display = "none";
    // Create and append the spinner element
    var spinner = document.createElement("span");
    spinner.classList.add("spinner-border", "spinner-border-sm");
    spinner.setAttribute("role", "status");
    spinner.setAttribute("aria-hidden", "true");
    
    // Text to display while loading
    var loadingText = document.createTextNode(" Loading...");
    
    // Clear the button's content and append the spinner and loading text
    button.innerHTML = '';
    button.appendChild(spinner);
    button.appendChild(loadingText);

    var inputText = document.getElementById("input-text").value;
    var wordCount = inputText.split(/\s+/).filter(Boolean).length;

    if (wordCount < 30) {
        // Show an error message
        document.getElementById("error-message").textContent = "Word count must be at least 30.";
        button.disabled = false;
        button.innerHTML = "Check for AI"; // Restore the original button text
        return;
    }

    // Hide the error message
    document.getElementById("error-message").textContent = "";
	const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
	
    // Send a request to the AI backend
    fetch("/detect/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
			"X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({ text: inputText }),
    })
        .then(function (response) {
            return response.json();
        })
	
        .then(function (data) {
            // Handle the response from the AI backend
			
            if (data.error) {
				// Show an error message
				 // Show Bootstrap modal if the limit is reached
				 var limitReachedModal = new bootstrap.Modal(document.getElementById('limitReachedModal'));
				 limitReachedModal.show();
		 
				 // Reset the button state
				 button.disabled = false;
				 button.innerHTML = "Check for AI"; // Restore the original button text
				 return;
			}

            // Set the text color based on the detector_result
            

            // Set the result text
            detectorAnswer.innerHTML = data.result_text;
			
            tableDiv.style.display = "block";
			console.log(data)
            // Show the detector-answer element
			aiAvarage.innerHTML = `${data.ai_avarage}%`;
			humanAvarage.innerHTML = `${data.human_avarage}%`;
            detectorAnswer.style.display = "block";

            // Re-enable the button and remove the spinner
            button.disabled = false;
            button.innerHTML = "Check for AI"; // Restore the original button text

			detectorAnswer.scrollIntoView({ behavior: 'smooth', block: 'start' });

        })
        .catch(function (error) {
            console.error("Error:", error);
			
            // Re-enable the button and remove the spinner in case of error
            button.disabled = false;
            button.innerHTML = "Check for AI"; // Restore the original button text
        });
});



document.getElementById('input-file').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    let inputTextArea = document.getElementById('input-text');
	let pasteDiv = document.querySelector('.text-area-btn-2');
    if (file.type === 'application/pdf') {
        // Handle PDF file
        const fileReader = new FileReader();
        fileReader.onload = function() {
            const typedarray = new Uint8Array(this.result);
			
            pdfjsLib.getDocument(typedarray).promise.then(pdf => {
                let text = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    pdf.getPage(i).then(page => {
                        page.getTextContent().then(content => {
                            content.items.forEach(item => {
                                text += item.str + ' ';
                            });

                            if (i === pdf.numPages) {
								// Set the textarea value and hide the paste button div
								
								pasteDiv.style.display = 'none';
                                inputTextArea.value = text;
                            }
                        });
                    });
                }
            });
        };
        fileReader.readAsArrayBuffer(file);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // Handle Word file (.docx)
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            const arrayBuffer = event.target.result;

            mammoth.extractRawText({ arrayBuffer: arrayBuffer })
                .then(result => {
					pasteDiv.style.display = 'none';
                    inputTextArea.value = result.value;
                })
                .catch(err => {
                    console.error('Error reading .docx file:', err);
                });
        };
        fileReader.readAsArrayBuffer(file);
    } else {
        inputTextArea.value = 'Unsupported file type.';
    }
});

function updatePrice() {
	var words = parseInt(document.getElementById('customNumber').value, 10);
	var costPerWord = 0.0004495;
	var newPrice = (words * costPerWord).toFixed(2);
	document.getElementById('monthlyPrice').innerText = `$${newPrice}`;
	document.getElementById('listWordsCount').innerText = words.toLocaleString(); // Formats the number with commas

}

function updatePriceBusines() {
	var words = parseInt(document.getElementById('customNumberBusiness').value, 10);
	var costPerWord = 0.0002;
	var newPrice = (words * costPerWord).toFixed(2);
	document.getElementById('monthlyPriceBusiness').innerText = `$${newPrice}`;
	document.getElementById('listWordsCountBusiness').innerText = words.toLocaleString(); // Formats the number with commas

}

function updatePriceYearly() {
	var words = parseInt(document.getElementById('customNumberYearly').value, 10);
	
	var costPerWord = 0.0002495;
	var newPrice = (words * costPerWord).toFixed(2);
	var yearly_price = (newPrice * 12).toFixed(2);
	document.getElementById('YearlyPrice').innerText = `$${newPrice}`;
	document.getElementById('listWordsCountYearly').innerText = words.toLocaleString(); // Formats the number with commas
	document.getElementById('annualChargePrice').innerText = `$${yearly_price}`; // Formats the number with commas
	words *= 12;
	document.getElementById('listWordsCountYearlyTotal').innerText = words.toLocaleString(); // Formats the number with commas

}
function setDefaultIfEmpty(element) {
	var value = parseFloat(element.value); 
	value = Math.round(value); 
	if (isNaN(value) || value < 20000) {
		element.value = 20000;
	} else {
		element.value = value;
	}
	updatePrice(); // Update the price whenever the input field loses focus
}

function setDefaultIfEmptyBusiness(element) {
	var value = parseFloat(element.value); 
	value = Math.round(value); 
	if (isNaN(value) || value < 1000000) {
		element.value = 1000000;
	} else {
		element.value = value;
	}
	updatePriceBusines(); // Update the price whenever the input field loses focus
}

function increment() {
    var inputField = document.getElementById('customNumber');
    var value = parseInt(inputField.value, 10);
    value = isNaN(value) ? 20000 : value;
    value += 2000;
    inputField.value = value < 20000 ? 20000 : value;
	updatePrice(); 
}

function decrement() {
    var inputField = document.getElementById('customNumber');
    var value = parseInt(inputField.value, 10);
    value = isNaN(value) ? 20000 : value;
    value -= 2000;
    inputField.value = value < 20000 ? 20000 : value;
	updatePrice(); 
}


function incrementBusiness() {
    var inputField = document.getElementById('customNumberBusiness');
    var value = parseInt(inputField.value, 10);
    value = isNaN(value) ? 1000000 : value;
    value += 10000;
    inputField.value = value < 1000000 ? 1000000 : value;
	updatePriceBusines(); 
}

function decrementBusiness() {
    var inputField = document.getElementById('customNumberBusiness');
    var value = parseInt(inputField.value, 10);
    value = isNaN(value) ? 1000000 : value;
    value -= 10000;
    inputField.value = value < 1000000 ? 1000000 : value;
	updatePriceBusines(); 
}


function incrementYearly() {
    var inputField = document.getElementById('customNumberYearly');
    var value = parseInt(inputField.value, 10);
    value = isNaN(value) ? 20000 : value;
    value += 2000;
    inputField.value = value < 20000 ? 20000 : value;
	updatePriceYearly();
}

function decrementYearly() {
    var inputField = document.getElementById('customNumberYearly');
    var value = parseInt(inputField.value, 10);
    value = isNaN(value) ? 20000 : value;
    value -= 2000;
    inputField.value = value < 20000 ? 20000 : value;
	updatePriceYearly();
}

// Enforce integer-only input and enforce minimum value
function onInputUpdate() {
	var inputField = document.getElementById('customNumber');
	var value = Math.round(parseFloat(inputField.value));
	// Enforce minimum and maximum limits
	value = isNaN(value) ? 20000 : value;
	value = value < 20000 ? 20000 : value;
	value = value > 10000000 ? 10000000 : value;
	inputField.value = value;
	updatePrice();
}

function onInputUpdateBusiness() {
	var inputField = document.getElementById('customNumberBusiness');
	var value = Math.round(parseFloat(inputField.value));
	// Enforce minimum and maximum limits
	value = isNaN(value) ? 1000000 : value;
	value = value < 1000000 ? 1000000 : value;
	value = value > 10000000 ? 10000000 : value;
	inputField.value = value;
	updatePrice();
}


function onInputUpdateYearly() {
	var inputField = document.getElementById('customNumberYearly');
	var value = Math.round(parseFloat(inputField.value));
	// Enforce minimum and maximum limits
	value = isNaN(value) ? 20000 : value;
	value = value < 20000 ? 20000 : value;
	value = value > 10000000 ? 10000000 : value;
	inputField.value = value;
	updatePriceYearly();
}



document.addEventListener('DOMContentLoaded', function () {
    var ninjaBox = document.querySelector('.ninja-box');
    var ghostBox = document.querySelector('.ghost-box');
	var masteroInfo = document.getElementById("masteroInfo")
	// var readabilityButton = document.getElementById("readabilityButton")
	// var levelButton = document.getElementById("levelButton")
    ninjaBox.addEventListener('click', function () {
        // Remove 'active' class from ghost box and add to ninja box
        ghostBox.classList.remove('active');
        ninjaBox.classList.add('active');
		masteroInfo.style.display = "none"
		// readabilityButton.style.display = "none"
		// levelButton.style.display = "none"
    });

    ghostBox.addEventListener('click', function () {
        // Check if the ghost box is disabled
        if (!ghostBox.classList.contains('disabled')) {
            // If not disabled, toggle the 'active' class
            ninjaBox.classList.remove('active');
            ghostBox.classList.add('active');
			masteroInfo.style.display = "block"
			// readabilityButton.style.display = "block"
			// levelButton.style.display = "block"
        }
        // If it is disabled, do nothing (this prevents toggling when disabled)
    });
});

document.addEventListener('DOMContentLoaded', function() {
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.forEach(function (popoverTriggerEl) {
    new bootstrap.Popover(popoverTriggerEl, {
      trigger: 'hover'
    });
  });
});
