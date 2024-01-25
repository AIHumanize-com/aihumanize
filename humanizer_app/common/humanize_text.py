import openai
from .purposes_data import purposes, strength_levels, readability_levels, prompts
import os
# client = OpenAI()




def rewrite_text(original_text, purpose, readability, strength, model_name):
    
    if model_name == "Falcon":
        openai_api_key = os.environ.get("OPEN_AI_KEY_AIHUMANIZE")
    else:
        openai_api_key = os.environ.get("OPEN_AI_KEY")

    if purpose not in purposes:
        raise ValueError(
            "Unsupported text type. Please choose from 'essay', 'article', etc."
        )
    
    vocabulary_level_prompt = ""
    if strength == "basic_vocabulary":
        vocabulary_level_prompt = "The text should use basic vocabulary."
    elif strength == "inter_vocabulary":
        vocabulary_level_prompt = "The text should use intermediate vocabulary."
    elif strength == "advanced_vocabulary":
        vocabulary_level_prompt = "The text should use advanced vocabulary."



    client = openai.OpenAI(api_key=openai_api_key)
   

   
   
    if model_name == "Falcon":
        model = "gpt-3.5-turbo-1106"
        openai_api_key = os.environ.get("OPEN_AI_KEY_AIHUMANIZE")
        system_prompt = prompts[purpose]  + " " + vocabulary_level_prompt
    elif model_name == "Maestro":
        model = "gpt-4-1106-preview"
        system_prompt = prompts[purpose] + " " + vocabulary_level_prompt

    
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

