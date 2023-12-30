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





var purpose = document.getElementById('purpose');
// var readability = document.getElementById('readability');
// var level = document.getElementById('level');


function handleHumanizeText(event){

	var textareaContent = document.getElementById('input-text').value;
	var wordCount = textareaContent.split(/\s+/).filter(function (n) { return n != '' }).length;
	let resultDivDetect = document.getElementById("result-row-detect");
	resultDivDetect.style.display = "none";
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
	clickedButton = event.currentTarget;
	clickedButton.disabled = true;
	clickedButton.innerHTML = '<span class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span> Loading...';
	
	// let level = document.getElementById("level").value
	// let readability = document.getElementById("readability").value

	
	fetch('humanizer/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ text: textareaContent, model: selectedModel, purpose: purpose.value }),

	})
		.then(response => response.json())
		.then(data => {
			if (data.error) {
				console.log(data.error)
				if (data.error == 'word_limit_reached') {
					let errorMessageP = document.getElementById('error-message');
					errorMessageP.textContent = "Now we can proccess up to 1000 words. Please enter fewer words";
					clickedButton.disabled = false;
					clickedButton.innerHTML = 'Humanize';
					return
				}
				else{
					var wordLimitModal = new bootstrap.Modal(document.getElementById('wordLimitModal'));
				wordLimitModal.show();
				// Other necessary actions
				clickedButton.disabled = false;
				clickedButton.innerHTML = 'Humanize';
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
			clickedButton.disabled = false;
			if (clickedButton.id == "humanize-btn"){
				clickedButton.innerHTML = '<span><img width="24" height="24" src="https://aihumanize.com/static/assets/images/icon2.svg" /></span>  Humanize Again';
			} else {
				clickedButton.innerHTML = `<span><img width="24" height="24" src="https://aihumanize.com/static/assets/images/icon2.svg" /></span> Humanize`;
			}
			
		})
		.catch(error => {
			console.error('Error:', error);

			// Re-enable the button and remove spinner in case of error
			clickedButton.disabled = false;
			clickedButton.innerHTML = 'Humanize';
		});
}
var humanizeButton = document.getElementById('hummani-main-btn');
var resultHumanizeButton = document.getElementById("humanize-btn")
humanizeButton.addEventListener('click', handleHumanizeText);
resultHumanizeButton.addEventListener('click', handleHumanizeText);

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


// document.getElementById("ai-btn").addEventListener("click", function () {
//     var button = this;
    
//     // Disable the button
//     button.disabled = true;
// 	var detectorAnswer = document.getElementById("detector-answer");
// 	var tableDiv = document.getElementById("tableDiv");
// 	var aiAvarage = document.getElementById("aiAvarage");
// 	var humanAvarage = document.getElementById("humanAvarage");
// 	detectorAnswer.style.display = "none";
// 	tableDiv.style.display = "none";
//     // Create and append the spinner element
//     var spinner = document.createElement("span");
//     spinner.classList.add("spinner-border", "spinner-border-sm");
//     spinner.setAttribute("role", "status");
//     spinner.setAttribute("aria-hidden", "true");
    
//     // Text to display while loading
//     var loadingText = document.createTextNode(" Loading...");
    
//     // Clear the button's content and append the spinner and loading text
//     button.innerHTML = '';
//     button.appendChild(spinner);
//     button.appendChild(loadingText);

//     var inputText = document.getElementById("input-text").value;
//     var wordCount = inputText.split(/\s+/).filter(Boolean).length;

//     if (wordCount < 30) {
//         // Show an error message
//         document.getElementById("error-message").textContent = "Word count must be at least 30.";
//         button.disabled = false;
//         button.innerHTML = "Check for AI"; // Restore the original button text
//         return;
//     }

//     // Hide the error message
//     document.getElementById("error-message").textContent = "";
// 	const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
	
//     // Send a request to the AI backend
//     fetch("/detect/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
// 			"X-CSRFToken": csrftoken,
//         },
//         body: JSON.stringify({ text: inputText }),
//     })
//         .then(function (response) {
//             return response.json();
//         })
	
//         .then(function (data) {
//             // Handle the response from the AI backend
			
//             if (data.error) {
// 				// Show an error message
// 				 // Show Bootstrap modal if the limit is reached
// 				 var limitReachedModal = new bootstrap.Modal(document.getElementById('limitReachedModal'));
// 				 limitReachedModal.show();
		 
// 				 // Reset the button state
// 				 button.disabled = false;
// 				 button.innerHTML = "Check for AI"; // Restore the original button text
// 				 return;
// 			}

//             // Set the text color based on the detector_result
            

//             // Set the result text
//             detectorAnswer.innerHTML = data.result_text;
			
//             tableDiv.style.display = "block";
// 			console.log(data)
//             // Show the detector-answer element
// 			aiAvarage.innerHTML = `${data.ai_avarage}%`;
// 			humanAvarage.innerHTML = `${data.human_avarage}%`;
//             detectorAnswer.style.display = "block";

//             // Re-enable the button and remove the spinner
//             button.disabled = false;
//             button.innerHTML = "Check for AI"; // Restore the original button text

// 			detectorAnswer.scrollIntoView({ behavior: 'smooth', block: 'start' });

//         })
//         .catch(function (error) {
//             console.error("Error:", error);
			
//             // Re-enable the button and remove the spinner in case of error
//             button.disabled = false;
//             button.innerHTML = "Check for AI"; // Restore the original button text
//         });
// });



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


function renderGauge(renderTo, value, label, description, colors) {
                Highcharts.chart(renderTo, {
                    chart: {
                        type: 'solidgauge',
                        height: '110%',
                        events: {
                            render: function () {
                                if (!this.customLabel) {
                                    this.customLabel = this.renderer.label(description,
                                        this.plotLeft,
                                        this.plotTop + this.plotHeight + 15,
                                        'rect',
                                        0,
                                        0,
                                        false,
                                        false,
                                        {
                                            align: 'center',
                                            zIndex: 5
                                        })
                                        .css({
                                            width: this.plotWidth + 'px',
                                        })
                                        .add();
                                }
                            }
                        }
                    },
                    title: {text: label },
                    tooltip: {
                        enabled: false
                    },
                    pane: {
                        startAngle: -90,
                        endAngle: 90,
                        background: {
                            backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
                            innerRadius: '60%',
                            outerRadius: '100%',
                            shape: 'arc'
                        }
                    },
                    yAxis: {
                        stops: colors
                        ,
                        lineWidth: 0,
                        tickWidth: 0,
                        minorTickInterval: null,
                        tickAmount: 2,
                        title: {
                            y: -70
                        },
                        labels: {
                            y: 16
                        },
                        min: 0,
                        max: 100,
                        title: {
                            text: ''
                        }
                    },
                    plotOptions: {
                        solidgauge: {
                            dataLabels: {
                                y: -50,
                                borderWidth: 0,
                                useHTML: true
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: label,
                        data: [value],
                        dataLabels: {
                            format: '<div style="text-align:center"><span style="font-size:16px;">{y}</span><br/></div>'
                        }
                    }]
                });
            }
function updateRadarChart(newDataValues) {
    const categoryNames = ['Perplexity', 'Sentence Length', 'Length Variation', 'Length Normality'];

    // Function to determine the label based on the value and category
    function getLabelForValue(value, categoryName) {
        let isReverse = categoryName === 'Sentence Length' || categoryName === 'Length Normality';

        // For reverse categories: Low values are good (green), high values are bad (red)
        if (isReverse) {
            if (value <= 50) {
                return '<span style="font-weight: bold; color: green;">Low: ' + value + '</span>';
            } else if (value > 50 && value <= 80) {
                return '<span style="font-weight: bold; color: orange;">Moderate: ' + value + '</span>';
            } else {
                return '<span style="font-weight: bold; color: red;">High: ' + value + '</span>';
            }
        }
        // For standard categories: High values are good (green), low values are bad (red)
        else {
            if (value > 80) {
                return '<span style="font-weight: bold; color: green;">High: ' + value + '</span>';
            } else if (value > 50 && value <= 80) {
                return '<span style="font-weight: bold; color: orange;">Moderate: ' + value + '</span>';
            } else {
                return '<span style="font-weight: bold; color: red;">Low: ' + value + '</span>';
            }
        }
    }

    // Map categories to their values with labels
    const categoriesWithValues = categoryNames.map((name, i) => {
        return name + '<br>' + getLabelForValue(newDataValues[i], name);
    });

    Highcharts.chart('myRadarChart', {
        chart: {
            polar: true,
            type: 'area'
        },
        title: {
            text: 'Text Analysis Metrics'
        },
        pane: {
            startAngle: 0,
            endAngle: 360
        },
        xAxis: {
            categories: categoriesWithValues,
            labels: {
                useHTML: true // This will allow HTML in the labels
            },
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
        yAxis: {
            min: 0,
            max: 100,
            endOnTick: false,
            showLastLabel: true,
            title: {
                text: null
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            },
            reversedStacks: false
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                shadow: false,
                groupPadding: 0,
                pointPlacement: 'on'
            }
        },
        series: [{
            name: 'Metrics',
            data: newDataValues,
            pointPlacement: 'on'
        }],
        credits: {
            enabled: false // Disable the Highcharts.com credit
        }
    });
}


function displayDetailedBreakdown(breakdown) {
    const breakdownContainer = document.getElementById('breakdown-container');
    breakdownContainer.innerHTML = ''; // Clear previous content

    breakdown.forEach(wordScorePair => {
        const word = wordScorePair[0];
        const score = wordScorePair[1];

        // Create a span element for each word
        const span = document.createElement('span');
        span.textContent = word + ' ';

        // Calculate the color based on the score: Lower score gets more intense red
		
        const backgroundColor = `rgba(144, 238, 144, ${score})`;

        // Apply styles to the span
        span.style.backgroundColor = backgroundColor;
        span.style.margin = '0 2px';
        span.style.padding = '2px';

        // Append the span to the container
        breakdownContainer.appendChild(span);
    });
}


function renderAIDetectionGauge(score) {
    // Define colors based on the AI score ranges
     let color;
		if (score >= 50) {
			color = '#F60004'; // Light red for AI probability above 50%
		} else if (score >= 20) {
			color = '#4CAF50'; // Green for moderate AI probability (20-49%)
		} else {
			color = '#8BC34A'; // Lime for low AI probability (below 20%)
		}

    // Define text based on the AI score
    let text;
    if (score < 50) {
        text = `<h5 class="mt-9">This text is likely to be written by a <span style="color:${color}">Human</span></h5>
                <p>There is a ${score}% probability this text was entirely written by <span style="color:${color}">AI</span></p>`;
    } else {
        text = `<h5 class="mt-9">This text is likely to be written by <span style="color:${color}">AI</span></h5>
                <p>There is a ${score}% probability this text was entirely written by <span style="color:${color}">AI</span></p>`;
    }

    // Render the gauge chart
    Highcharts.chart('ai-detection-gauge', {
        chart: {
            type: 'solidgauge',
            height: '110%',
        },
        title: null,
        pane: {
            startAngle: 0,
            endAngle: 360,
            background: {
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
                innerRadius: '80%',
                outerRadius: '100%',
                shape: 'arc',
                borderColor: 'transparent'
            }
        },
        tooltip: {
            enabled: false
        },
        yAxis: {
            stops: [
                [1, color] // Use the determined color
            ],
            lineWidth: 0,
            tickPositions: [],
            min: 0,
            max: 100,
            labels: {
                enabled: false
            }
        },
        plotOptions: {
            solidgauge: {
				
                dataLabels: {
                    y: -20,
                    borderWidth: 0,
                    useHTML: true,
                    format: '<div style="text-align:center"><span style="font-size:2em;color:' + color + '">{y}%</span></div>'
                },
				
				
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            data: [score],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:2em;color:' + color + '">{y}%</span></div>'
            },
			radius: '100%',        // Adjust these values to change the thickness of the gauge line
    		innerRadius: '80%',
        }]
    });

    // Update the text element
    document.getElementById('ai-detection-text').innerHTML = text;
}


function handleAICheck(event){
		const clickedButton = event.currentTarget;
		if (clickedButton.id == "checkAiInresult"){
			var inputText = document.getElementById("humanizedResult").textContent;
		} else{
			var inputText = document.getElementById("input-text").value;
		}
		
	    var wordCount = inputText.split(/\s+/).filter(Boolean).length;
		var spinner = document.createElement("span");
		let resultDivDetect = document.getElementById("result-row-detect");
		resultDivDetect.style.display = "none";
		spinner.classList.add("spinner-border", "spinner-border-sm");
		spinner.setAttribute("role", "status");
		spinner.setAttribute("aria-hidden", "true");
		
		// Text to display while loading
		var loadingText = document.createTextNode(" Loading...");
		
		// Clear the button's content and append the spinner and loading text
		clickedButton.innerHTML = '';
		clickedButton.appendChild(spinner);
		clickedButton.appendChild(loadingText);
		clickedButton.disabled = true;
		if (wordCount < 30) {
			// Show an error message
			document.getElementById("error-message").textContent = "Word count must be at least 30.";
			clickedButton.disabled = false;
			clickedButton.innerHTML = "Check for AI"; // Restore the original button text
			return;
		}
       const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
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
				console.log(data)
                // Handle the response from the AI backend
                if (data.error) {
                    // Show an error message
                    // Show Bootstrap modal if the limit is reached
                    var limitReachedModal = new bootstrap.Modal(document.getElementById('limitReachedModal'));
                    limitReachedModal.show();

                    // Reset the button state
                    clickedButton.disabled = false;
                    clickedButton.innerHTML = "Check for AI"; // Restore the original button text
                    return;
                }
				console.log(data)
				const metrics = data[0][1];
				let aiScorePrex = data[0][0]["AI"];
				
				let roundedAIScore = Math.round(aiScorePrex * 100);
				renderAIDetectionGauge(roundedAIScore);
				displayDetailedBreakdown(data[0][2]);
				const updatedValues = Object.values(metrics).map(val => Math.round(val * 100));
				updateRadarChart(updatedValues);
				
				resultDivDetect.style.display = "block";
				resultDivDetect.scrollIntoView({ behavior: 'smooth', block: 'start' });
				// Update each gauge with new values
				

				prex_colors = [[0.1, '#FFC107'], [0.5, '#03A9F4'], [0.9, '#4DB6AC']] 
				sentence_length_colors = [[0.9, '#4DB6AC'], [0.5, '#03A9F4'], [0.1, '#FFC107']]
				renderGauge('gaugePerplexity', updatedValues[0], 'Perplexity', 'How familiar a piece of text is to large language models like ChatGPT.', prex_colors);
				renderGauge('gaugeSentenceLength', updatedValues[1], 'Sentence Length', 'Average length of sentences in a text.', sentence_length_colors);
				renderGauge('gaugeLengthVariation', updatedValues[2], 'Length Variation', 'Variability of sentence lengths in the text.', prex_colors);
				renderGauge('gaugeLengthNormality', updatedValues[3], 'Length Normality', 'Conformity of sentence lengths to typical patterns.', sentence_length_colors);
                
                

              
               

                // Re-enable the button and remove the spinner
                clickedButton.disabled = false;
                clickedButton.innerHTML = "Check for AI"; // Restore the original button text

                

            })
            .catch(function (error) {
                console.error("Error:", error);

                // Re-enable the button and remove the spinner in case of error
                clickedButton.disabled = false;
                clickedButton.innerHTML = "Check for AI"; // Restore the original button text
            });
}

document.getElementById("ai-btn").addEventListener("click", handleAICheck);
document.getElementById("checkAiInresult").addEventListener("click", handleAICheck);
