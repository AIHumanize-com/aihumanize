
function handleGenerateText(event){
   
	var prompt = document.getElementById('prompt').value;
	var wordCount = prompt.split(/\s+/).filter(function (n) { return n != '' }).length;
    let resultDivDetect = document.getElementById("result-row-detect");

	
	resultDivDetect.style.display = "none";
	if (wordCount < 1) {
		let error_p = document.getElementById("min_word_error")
		error_p.style.display = ''
		return;
	}
	else if (wordCount > 400) {
		let error_p = document.getElementById("min_word_error")
		error_p.style.display = ''
		return;
	
	}
	// Identify the selected model
	// Disable the button and add spinner
	clickedButton = event.currentTarget;
	clickedButton.disabled = true;
	clickedButton.innerHTML = '<span class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span> Loading...';
	
	var requestUrl = window.location.href;
	fetch(requestUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ prompt: prompt }),
	})
		.then(response => response.json())
		.then(data => {
			if (data.error) {
				console.log(data.error)
				if (data.error == 'word_limit_reached') {
					let errorMessageP = document.getElementById('error-message');
					errorMessageP.textContent = "Now we can proccess up to 1000 words. Please enter fewer words";
					clickedButton.disabled = false;
					
					clickedButton.innerHTML = 'Generate';
					return
				}
				else{
					var wordLimitModal = new bootstrap.Modal(document.getElementById('wordLimitModal'));
				wordLimitModal.show();
				// Other necessary actions
				clickedButton.disabled = false;
				
				clickedButton.innerHTML = 'Generate';
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
			
			if (clickedButton.id == "humman-writer-main-btn"){
				
					clickedButton.innerHTML = '<span><img width="24" height="24" src="https://aihumanize.com/static/assets/images/icon2.svg" /></span>  Generate ';
				
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

let hummanWriterMainButton = document.getElementById('humman-writer-main-btn');
hummanWriterMainButton.addEventListener('click', handleGenerateText);


function handleAICheckWriter(event){
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

document.getElementById("checkAiInresult").addEventListener("click", handleAICheck);

function handleHumanizeGeneretedText(event){

	var textareaContent = document.getElementById('humanizedResult').innerText;
	var wordCount = textareaContent.split(/\s+/).filter(function (n) { return n != '' }).length;
	let resultDivDetect = document.getElementById("result-row-detect");
	let styleSelect = document.getElementById('style_id');


	let styleId = styleSelect && styleSelect.value ? styleSelect.value : null;


	
	resultDivDetect.style.display = "none";
	
	// Identify the selected model
    var selectedModel = 'Falcon';
    

	// Disable the button and add spinner
	clickedButton = event.currentTarget;
	clickedButton.disabled = true;
	clickedButton.innerHTML = '<span class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span> Loading...';
    var protocol = window.location.protocol;
    var hostname = window.location.hostname;
    var port = window.location.port;

    // Construct the new URL
    var newUrl = protocol + '//' + hostname + (port ? ':' + port : '') + '/humanizer/';
   
	fetch(newUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ text: textareaContent, model: selectedModel,  style_id: null }),
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
				
					clickedButton.innerHTML = '<span><img width="24" height="24" src="https://aihumanize.com/static/assets/images/icon2.svg" /></span>  Humanize More';
				
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
var resultHumanizeButton = document.getElementById("humanize-btn")
resultHumanizeButton.addEventListener('click', handleHumanizeGeneretedText);

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('.reult-p').addEventListener('mouseup', function(event) {
        const selectedText = window.getSelection().toString();
        const wordCount = selectedText.split(/\s+/).filter(n => n !== '').length;

        if (wordCount >= 1) {
		
            // If the selected text is at least 2 words, fetch alternatives
            fetchAlternatives(selectedText);
        }
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


let featureToggleGenereted = document.getElementById('featureToggle');
featureToggleGenereted.addEventListener('change', function() {
	let alternative_tip = document.getElementById('alternative_tip');
	if (featureToggleGenereted.checked) {
		alternative_tip.style.display = "block";
	}
	else {
		alternative_tip.style.display = "none";
	}
});


