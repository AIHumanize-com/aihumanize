import openai
from .purposes_data import purposes, strength_levels, readability_levels, prompts
import os
# client = OpenAI()

def humanize_text(AI_text, model_ft_name):
  openai_api_key = os.environ.get("OPEN_AI_KEY_AIHUMANIZE")
  client = openai.OpenAI(api_key=openai_api_key)

  """Humanizes the provided AI text using the fine-tuned model."""
  response = completion = client.chat.completions.create(
  model=model_ft_name,
  messages=[
    {"role": "system", "content": """
    You are a text humanizer.
    You humanize AI generated text.
    The text must appear like humanly written.
    THE INPUT AND THE OUTPUT TEXT SHOULD HAVE THE SAME FORMAT.
    THE HEADINGS AND THE BULLETS IN THE INPUT SHOULD REMAIN IN PLACE"""},
    {"role": "user", "content": f"THE LANGUAGE OF THE INPUT AND THE OUTPUT MUST BE SAME. THE SENTENCES SHOULD NOT BE SHORT LENGTH - THEY SHOULD BE SAME AS IN THE INPUT. ALSO THE PARAGRAPHS SHOULD NOT BE SHORT EITHER - PARAGRAPHS MUST HAVE THE SAME LENGTH"},
    {"role": "user", "content": f"Humanize the text. Keep the output format i.e. the bullets and the headings as it is and dont use the list of words that are not permissible. \nTEXT: {AI_text}"}
  ]
  )
  return response.choices[0].message.content.strip()




def rewrite_text(original_text, model_version, model_name):
    
    if model_name == "Falcon":
        openai_api_key = os.environ.get("OPEN_AI_KEY_AIHUMANIZE")
    else:
        openai_api_key = os.environ.get("OPEN_AI_KEY")


    client = openai.OpenAI(api_key=openai_api_key)
   

   
    if model_name == "Falcon":
        model = "gpt-3.5-turbo-1106"
        system_prompt = prompts["general"] 
        print(model_version)
        if model_version == "falcon_2":
            return humanize_text(original_text, "ft:gpt-3.5-turbo-0125:temuriydevs-ltd::9eqcMVov")
        
    elif model_name == "Maestro":
        model = "gpt-4-1106-preview"
        system_prompt = prompts["general"] 
        if model_version == "maestro_2":
            return humanize_text(original_text, "ft:gpt-3.5-turbo-0125:temuriydevs-ltd::9fOPQ1HZ")

    
    # Updated system prompt
   
    
    try:
        response = client.chat.completions.create(
            model=model,  # You can experiment with different models
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": original_text,
                },
            ],
        )
        
        return response.choices[0].message.content
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

