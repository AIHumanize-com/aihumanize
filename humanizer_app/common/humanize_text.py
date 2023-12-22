import openai
from .purposes_data import purposes, strength_levels, readability_levels, prompts
import os
# client = OpenAI()




def rewrite_text(original_text, purpose, readability, strength, model_name):
    openai_api_key = os.environ.get("OPEN_AI_KEY")
    print(purpose, readability, strength)
    if purpose not in purposes:
        raise ValueError(
            "Unsupported text type. Please choose from 'essay', 'article', etc."
        )

    client = openai.OpenAI(api_key=openai_api_key)
    strength_description = strength_levels.get(strength, "Balanced") 
    readability_description = readability_levels.get(readability, "High School level, suitable for a general audience with clear and straightforward language.")  # Default to "high_school" if not found

    strength_prompt = f"The paraphrasing should be '{strength_description}' in nature."
    readability_prompt = f"This text should be written at a {readability_description}"
    if model_name == "Falcon":
        model = "gpt-3.5-turbo-1106"
        system_prompt = purposes[purpose]  + " " + "keep wiriting style and tone"
    elif model_name == "Maestro":
        model = "gpt-4-1106-preview"
        system_prompt = prompts[purpose] + " " + "keep wiriting style and tone"

    print(system_prompt)
    # Updated system prompt
    print(model)
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

