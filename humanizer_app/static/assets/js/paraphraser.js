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
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
	item.addEventListener('click', function () {
		dropdownItems.forEach(item => {
			item.classList.remove('light-background');
		});
		this.classList.add('light-background');
		dropdownItems.forEach(item => {
			const svg = item.querySelector('svg');
			if (svg) {
				svg.classList.add('hidden');
			}
		});
		const svg = this.querySelector('svg');
		if (svg) {
			svg.classList.remove('hidden');
		}
	});
});
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

var items = document.querySelectorAll('#modes li');
items.forEach(function (item) {
	item.addEventListener('click', function () {
		items.forEach(function (item) {
			item.classList.remove('active');
		});
		this.classList.add('active');
	});
});

document.getElementsByTagName('input')[0].addEventListener("input", function () {
	var min = this.min;
	var max = this.max;
	var val = this.value;

	this.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';

	if (this.value == 0) {
		this.setAttribute("class", "zero-input");
	} else {
		this.setAttribute("class", "");
	}

}, false);

const range = document.getElementById('range');
const synonym = document.getElementById('synonym');

range.addEventListener('mouseenter', () => {
	synonym.classList.remove('d-none');
})

range.addEventListener('mouseleave', () => {
	synonym.classList.add('d-none');
})

const range1 = document.getElementById('range1');
const synonym1 = document.getElementById('synonym1');

range1.addEventListener('mouseenter', () => {
	synonym1.classList.remove('d-none');
})

range1.addEventListener('mouseleave', () => {
	synonym1.classList.add('d-none');
})

const range2 = document.getElementById('range2');
const synonym2 = document.getElementById('synonym2');

range2.addEventListener('mouseenter', () => {
	synonym2.classList.remove('d-none');
})

range2.addEventListener('mouseleave', () => {
	synonym2.classList.add('d-none');
})

const range3 = document.getElementById('range3');
const synonym3 = document.getElementById('synonym3');

range3.addEventListener('mouseenter', () => {
	synonym3.classList.remove('d-none');
})

range3.addEventListener('mouseleave', () => {
	synonym3.classList.add('d-none');
})

const diamond = document.getElementById('diamond');
const diamondToolTip = document.getElementById('dimToolTip');

diamond.addEventListener('mouseenter', () => {
	diamondToolTip.classList.remove('d-none');
})
diamond.addEventListener('mouseleave', () => {
	diamondToolTip.classList.add('d-none');
})

diamondToolTip.addEventListener('mouseenter', () => {
	diamondToolTip.classList.remove('d-none');
})

document.addEventListener("DOMContentLoaded", function () {
	var listItems = document.querySelectorAll("#modes li");
	var contentDivs = document.querySelectorAll(".content");

	listItems.forEach(function (item, index) {
		item.addEventListener("click", function () {
			contentDivs.forEach(function (div) {
				div.style.display = "none";
			});
			contentDivs[index].style.display = "block";
			listItems.forEach(function (li) {
				li.classList.remove("active");
			});
			this.classList.add("active");
		});
	});
});


document.addEventListener("DOMContentLoaded", function () {
	const resizableDiv = document.getElementById('resizableDiv');
	const resizer = document.querySelector('.Resizer');
	const secColDiv = document.querySelector('.sec-col');

	let isResizing = false;
	let lastX = 0;

	resizer.addEventListener('mousedown', function (e) {
		isResizing = true;
		lastX = e.clientX;
	});

	document.addEventListener('mousemove', function (e) {
		if (!isResizing) return;
		const deltaX = e.clientX - lastX;
		resizableDiv.style.width = (resizableDiv.offsetWidth + deltaX) + 'px';
		secColDiv.style.width = (secColDiv.offsetWidth - deltaX) + 'px';
		lastX = e.clientX;
	});

	document.addEventListener('mouseup', function () {
		isResizing = false;
	});
});


document.addEventListener("DOMContentLoaded", function () {
	const resizableDiv = document.getElementById('resizableDiv1');
	const resizer = document.querySelector('.Resizer1');

	let isResizing = false;
	let lastX = 0;

	resizer.addEventListener('mousedown', function (e) {
		isResizing = true;
		lastX = e.clientX;
	});

	document.addEventListener('mousemove', function (e) {
		if (!isResizing) return;
		const deltaX = e.clientX - lastX;
		resizableDiv.style.width = (resizableDiv.offsetWidth + deltaX) + 'px';
		lastX = e.clientX;
	});

	document.addEventListener('mouseup', function () {
		isResizing = false;
	});
});

document.addEventListener("DOMContentLoaded", function () {
	const resizableDiv = document.getElementById('resizableDiv2');
	const resizer = document.querySelector('.Resizer2');

	let isResizing = false;
	let lastX = 0;

	resizer.addEventListener('mousedown', function (e) {
		isResizing = true;
		lastX = e.clientX;
	});

	document.addEventListener('mousemove', function (e) {
		if (!isResizing) return;
		const deltaX = e.clientX - lastX;
		resizableDiv.style.width = (resizableDiv.offsetWidth + deltaX) + 'px';
		lastX = e.clientX;
	});

	document.addEventListener('mouseup', function () {
		isResizing = false;
	});
});

document.addEventListener("DOMContentLoaded", function () {
	const resizableDiv = document.getElementById('resizableDiv3');
	const resizer = document.querySelector('.Resizer3');

	let isResizing = false;
	let lastX = 0;

	resizer.addEventListener('mousedown', function (e) {
		isResizing = true;
		lastX = e.clientX;
	});

	document.addEventListener('mousemove', function (e) {
		if (!isResizing) return;
		const deltaX = e.clientX - lastX;
		resizableDiv.style.width = (resizableDiv.offsetWidth + deltaX) + 'px';
		lastX = e.clientX;
	});

	document.addEventListener('mouseup', function () {
		isResizing = false;
	});
});

const textarea = document.getElementById('txtarea');
const textarea1 = document.querySelector('.txtarea1');
const textarea2 = document.querySelector('.txtarea2');
const textarea3 = document.querySelector('.txtarea3');


const deleteButton = document.getElementById('deleteText');
const deleteButton1 = document.getElementById('deleteText1');
const deleteButton2 = document.getElementById('deleteText2');
const deleteButton3 = document.getElementById('deleteText3');

const buttons = document.getElementById('buttons');
textarea.addEventListener('input', function () {
	if (this.value.trim() === '') {
		buttons.classList.remove('hidden');
	} else {
		buttons.classList.add('hidden');
	} paraBtn.disabled = false;
});

const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');

uploadBtn.addEventListener('click', function () {
	fileInput.click();
});

// You can also add an event listener to handle file selection if needed
fileInput.addEventListener('change', function (event) {
	const selectedFile = event.target.files[0];
	// Do something with the selected file
	console.log(selectedFile);
});

function toggleDeleteButtonVisibility() {
	if (textarea.value.trim() === '') {
		deleteButton.style.display = 'none';
	} else {
		deleteButton.style.display = 'block';
	}
}
textarea.addEventListener('input', toggleDeleteButtonVisibility);

function toggleDeleteButtonVisibility1() {
	if (textarea1.value.trim() === '') {
		deleteButton1.style.display = 'none';
	} else {
		deleteButton1.style.display = 'block';
	}
}

document.getElementById('deleteText').addEventListener('click', function () {
	document.getElementById('myModal').style.display = 'block';
});

// Close the modal when clicking on close button or outside the modal
var closeButtons = document.getElementsByClassName('close');
for (var i = 0; i < closeButtons.length; i++) {
	closeButtons[i].addEventListener('click', function () {
		document.getElementById('myModal').style.display = 'none';
	});
}

// Handle OK button click to delete text
document.getElementById('confirmDelete').addEventListener('click', function () {
	document.getElementById('txtarea').value = '';
	document.getElementById('myModal').style.display = 'none';
});

document.getElementById('txtarea').addEventListener('input', countWords);
function countWords() {
	var text = this.value.trim();
	var words = text.split(/\s+/).filter(function (word) {
		return word.length > 0;
	}).length;

	if (words > 0) {
		document.getElementById('uploadBtn').classList.add('d-none');
		document.getElementById('wordCount').innerText = words + ' Words';
		document.getElementById('wordCount').style.display = 'inline';
	} else {
		document.getElementById('uploadBtn').classList.remove('d-none');
		document.getElementById('wordCount').style.display = 'none';
	}
}


textarea1.addEventListener('input', toggleDeleteButtonVisibility1);

function toggleDeleteButtonVisibility2() {
	if (textarea2.value.trim() === '') {
		deleteButton2.style.display = 'none';
	} else {
		deleteButton2.style.display = 'block';
	}
}
textarea2.addEventListener('input', toggleDeleteButtonVisibility2);

function toggleDeleteButtonVisibility3() {
	if (textarea3.value.trim() === '') {
		deleteButton3.style.display = 'none';
	} else {
		deleteButton3.style.display = 'block';
	}
}
textarea3.addEventListener('input', toggleDeleteButtonVisibility3);

deleteButton1.addEventListener('click', () => {
	textarea1.value = '';
	deleteButton1.style.display = 'none';
});
deleteButton2.addEventListener('click', () => {
	textarea2.value = '';
	deleteButton2.style.display = 'none';
});
deleteButton3.addEventListener('click', () => {
	textarea3.value = '';
	deleteButton3.style.display = 'none';
});

const trySampleText = document.getElementById('sampleTextBtn')
trySampleText.addEventListener('click', function () {
	const sampleSentences = [
		"The quick brown fox jumps over the lazy dog.",
		"This paraphraser takes your sentences and makes changes.",
		"It was a dark and stormy night.",
		"To be, or not to be: that is the question.",
		"All happy families are alike; each unhappy family is unhappy in its own way."
	];
	const randomIndex = Math.floor(Math.random() * sampleSentences.length);
	document.getElementById('txtarea').value = sampleSentences[randomIndex];
	deleteButton.style.display = 'block';
	buttons.classList.add('hidden');
	countWords();
});
const pasteTxt = document.getElementById('pasteTextBtn')
pasteTxt.addEventListener('click', function () {
	deleteButton.style.display = 'block';
	navigator.clipboard.readText()
		.then(text => {
			document.getElementById('txtarea').value = text;
		})
		.catch(err => {
			console.error('Failed to read clipboard contents: ', err);
		});
	buttons.classList.add('hidden');
});

const iconss = document.getElementById('iconss');



function selectItem1(itemText) {
	document.getElementById('dropdownMenuButton1').innerText = itemText;
	var dropdownMenu = document.getElementById("dropdownMenu1");
	dropdownMenu.classList.remove("show");
}

function selectItem2(itemText) {
	document.getElementById('dropdownMenuButton2').innerText = itemText;
	var dropdownMenu = document.getElementById("dropdownMenu2");
	dropdownMenu.classList.remove("show");
} function selectItem3(itemText) {
	document.getElementById('dropdownMenuButton3').innerText = itemText;
	var dropdownMenu = document.getElementById("dropdownMenu3");
	dropdownMenu.classList.remove("show");
}



function toggleDropdown1() {
	var dropdownMenu = document.getElementById("dropdownMenu1");
	dropdownMenu.classList.toggle("show");
}

function toggleDropdown2() {
	var dropdownMenu = document.getElementById("dropdownMenu2");
	dropdownMenu.classList.toggle("show");
}

function toggleDropdown3() {
	var dropdownMenu = document.getElementById("dropdownMenu3");
	dropdownMenu.classList.toggle("show");
}

function copyToClipboard() {
	const textElement = document.getElementById("paraphraseTextResult");
	const range = document.createRange();
	range.selectNode(textElement);
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(range);
	document.execCommand("copy");
	window.getSelection().removeAllRanges();

}

window.onclick = function (event) {
	if (!event.target.matches('.dropdown-toggle')) {
		var dropdowns = document.getElementsByClassName("dropdown-menu");
		for (var i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}


async function rewriteText(txtarea, range, mode) {
	const url = 'https://par.aihumanize.com/rewrite/'; // Update with your actual endpoint URL
	const requestData = {
		original_text: txtarea,
		synonym_percentage: range,
		mode: mode
	};

	try {
		const response = await fetch(url, {
			method: 'POST', // Specify the method
			headers: {
				'Content-Type': 'application/json' // Specify the content type
			},
			body: JSON.stringify(requestData) // Convert the JavaScript object to a JSON string
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json(); // Parse the JSON response body
		return data; // This will be the paraphrased text result or any other data you return from your endpoint
	} catch (error) {
		console.error('Error fetching data: ', error);
	}
}

const paraBtn = document.getElementById('paraphrase');


let selectedMode = "standard";

function selectItem(itemText) {
	document.getElementById('dropdownMenuButton').innerText = itemText;
	var dropdownMenu = document.getElementById("dropdownMenu");
	document.addEventListener('click', function () {
		selectedMode = itemText.toLowerCase();
		console.log(selectedMode);
	});
	dropdownMenu.classList.remove("show");
	paraBtn.disabled = false;
}


function toggleDropdown() {
	var dropdownMenu = document.getElementById("dropdownMenu");
	dropdownMenu.classList.toggle("show");
}
document.addEventListener('click', function () {
	const modes = document.getElementById('modes').querySelectorAll('li');

	modes.forEach(mode => {
		mode.addEventListener('click', function () {
			selectedMode = this.textContent;
			paraBtn.disabled = false;
		});
	});
	const standardMode = document.querySelector('#modes .active');
	selectedMode = standardMode.textContent.toLowerCase();
});

async function paraphraseText() {
	const txtarea = document.getElementById("txtarea").value;
	const range = parseInt(document.getElementById("range").value);
	const paraphraseTextResultElement = document.getElementById("paraphraseTextResult");
	const countSentencesElement = document.getElementById("countSentences");
	const loadingIcon = document.getElementById("loading");
	const iconss = document.getElementById("iconss");
	paraBtn.classList.add('d-none');
	loadingIcon.classList.remove('d-none');
	iconss.classList.add('d-none');
	try {
		const data = await rewriteText(txtarea, range, selectedMode);
		const paraphraseTextResult = data
			.filter(item => item.status === "added" || item.status === "unchanged")
			.map(item => {
				if (item.status === "added") {
					return `<span onclick="updateSynonyms(event)"  style="color: rgb(227, 107, 0); cursor:pointer;">${item.text}</span>`;
				} else {
					return `<span onclick="updateSynonym(event)" class='sentence' style="cursor:pointer;">${item.text}</span>`;
				}
			})

		paraphraseTextResultElement.innerHTML = paraphraseTextResult.join(" ");

		const words = txtarea.match(/\b\w+\b/g) || [];
		const sentences = txtarea.split(/[.!?]+/).filter(sentence => sentence.trim() !== "");

		countSentencesElement.innerHTML = `Words: ${words.length}, Sentences: ${sentences.length}`;
	} catch (error) {
		console.error(error);
	} finally {
		paraBtn.classList.remove('d-none');
		paraBtn.disabled = true;
		loadingIcon.classList.add('d-none');
		iconss.classList.remove('d-none');
	}
}


document.getElementById("range").addEventListener("input", function () {
	paraBtn.classList.remove('d-none');
	paraBtn.disabled = false;
});


async function fetchSynonym(word, sentence) {
	const url = 'https://par.aihumanize.com/synonyms/?word=' + encodeURIComponent(word) + '&sentence=' + encodeURIComponent(sentence);

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching data: ', error);
	}
}

document.addEventListener('click', () => {
	const dropdownContent = document.querySelectorAll('.dropdown-content');
	dropdownContent.forEach(item => {
		item.style.display = 'none';
	})
})

async function updateSynonyms(event) {
    const clickedWord = event.target.textContent;
    const parentElement = event.target.parentElement;
    const sentence = parentElement.textContent;

    // Create a button with a Bootstrap spinner
    const loadingButton = document.createElement('button');
    loadingButton.className = 'btn btn-sm btn-outline-primary';
    loadingButton.disabled = true; // Disable button to prevent clicks while loading
    loadingButton.innerHTML = `
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
    `;
    event.target.replaceWith(loadingButton);

    try {
        const data = await fetchSynonym(clickedWord, sentence);
        if (data && data.synonyms && data.synonyms.synonyms) {
            const synonyms = data.synonyms.synonyms;

            // Create the dropdown to display synonyms, reusing parts of your existing logic
            const dropdown = document.createElement('div');
            dropdown.classList.add('dropdown');
            dropdown.classList.add('syn-drop');

            const originalWordSpan = document.createElement('span');
            originalWordSpan.textContent = clickedWord;
            originalWordSpan.style.color = 'rgb(227, 107, 0)';
            originalWordSpan.style.cursor = 'pointer';

            originalWordSpan.addEventListener('click', function () {
                updateSynonyms(event);
            });

            const synonymList = document.createElement('div');
            synonymList.classList.add('dropdown-content');
            synonyms.forEach(synonym => {
                const synonymOption = document.createElement('a');
                synonymOption.textContent = synonym;
                synonymOption.href = "#";
                synonymOption.addEventListener('click', function (event) {
                    event.preventDefault();
                    originalWordSpan.textContent = synonym;
                    synonymList.style.display = 'none';
                });
                synonymList.appendChild(synonymOption);
            });

            dropdown.appendChild(originalWordSpan);
            dropdown.appendChild(synonymList);

            loadingButton.replaceWith(dropdown);
        } else {
            console.error('Synonyms not found in the response');
            loadingButton.replaceWith(event.target); // Revert if no synonyms found
        }
    } catch (error) {
        console.error(error);
        loadingButton.replaceWith(event.target); // Revert in case of error
    }
}

async function updateSynonym(event) {
    const synonymWord = event.target.textContent;
    const sentence = event.target.parentElement.textContent;

    // Create a button with a Bootstrap spinner
    const loadingButton = document.createElement('button');
    loadingButton.className = 'btn btn-sm btn-outline-primary';
    loadingButton.disabled = true; // Disable button to prevent clicks while loading
    loadingButton.innerHTML = `
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
    `;
    event.target.replaceWith(loadingButton);

    try {
        const data = await fetchSynonym(synonymWord, sentence);
        if (data && data.synonyms && data.synonyms.synonyms) {
            const synonyms = data.synonyms.synonyms;

            // Create the dropdown to display synonyms
            const dropdown = document.createElement('div');
            dropdown.classList.add('dropdown');
            dropdown.classList.add('syn-drop');

            const originalWordSpan = document.createElement('span');
            originalWordSpan.textContent = synonymWord;
            originalWordSpan.style.cursor = 'pointer';
            originalWordSpan.setAttribute('onclick', 'updateSynonym(event)');

            // This seems to be an error in your original code: updateSynonyms should be updateSynonym
            originalWordSpan.addEventListener('click', function () {
                fetchSynonym(this.textContent, sentence)
                    .then(data => updateSynonym(event)) // Corrected to updateSynonym
                    .catch(error => console.error(error));
            });

            const synonymList = document.createElement('div');
            synonymList.classList.add('dropdown-content');
            synonyms.forEach(synonym => {
                const synonymOption = document.createElement('a');
                synonymOption.textContent = synonym;
                synonymOption.href = "#";
                synonymOption.addEventListener('click', function (event) {
                    event.preventDefault(); // Prevent the link from navigating
                    originalWordSpan.textContent = synonym;
                    // This line might cause an error since spanElement is not defined in your function
                    // spanElement.textContent = synonym;
                    synonymList.style.display = 'none';
                });
                synonymList.appendChild(synonymOption);
            });

            dropdown.appendChild(originalWordSpan);
            dropdown.appendChild(synonymList);

            loadingButton.replaceWith(dropdown);
        } else {
            console.error('Synonyms not found in the response');
            loadingButton.replaceWith(event.target); // Revert if no synonyms found
        }
    } catch (error) {
        console.error(error);
        loadingButton.replaceWith(event.target); // Revert in case of error
    }
}


async function replaceWithSynonym(selectedSynonym) {
	const originalWordSpan = document.querySelector('.dropdown > span');
	originalWordSpan.textContent = selectedSynonym;
	originalWordSpan.setAttribute('onclick', 'updateSynonyms(event)')
}

async function replaceWithSynonym(selectedSynonym) {
	const originalWordSpan = document.querySelector('.dropdown > span');
	originalWordSpan.textContent = selectedSynonym;
	originalWordSpan.setAttribute('onclick', 'updateSynonym(event)')
}
