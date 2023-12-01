import openai
from .purposes_data import purposes, strength_levels, readability_levels

# client = OpenAI()




def rewrite_text(original_text, purpose, readability, strength):
    openai_api_key = "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"

    if purpose not in purposes:
        raise ValueError(
            "Unsupported text type. Please choose from 'essay', 'article', etc."
        )

    client = openai.OpenAI(api_key=openai_api_key)
    strength_description = strength_levels.get(strength, "Balanced") 
    readability_description = readability_levels.get(readability, "High School level, suitable for a general audience with clear and straightforward language.")  # Default to "high_school" if not found

    strength_prompt = f"The paraphrasing should be '{strength_description}' in nature."
    readability_prompt = f"This text should be written at a {readability_description}"

    # Updated system prompt
    system_prompt = purposes[purpose]  + " " + "change words and terms with snonymous"
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-1106",  # You can experiment with different models
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

