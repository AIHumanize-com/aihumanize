import os
import openai


def generate_content_gpt(prompt):
    openai_api_key = os.environ.get("OPEN_AI_KEY_AIHUMANIZE")
    client = openai.OpenAI(api_key=openai_api_key)
    # Framing the AI as an expert in the given field
 

    try:
        response = client.chat.completions.create(
            model="gpt-4",  
       
            messages=[
             
                {
                    "role": "user",
                    "content": f"While generating text follow to these guidelines: prioritize short words with minimal syllables, opting for simpler vocabulary. Craft sentences of varied lengths and incorporate diverse sentence structures. Whenever feasible, employ the 100 most common words in the English language. Based on these rules {prompt}. Output only the genereted text without any additional explanations or introductions.",
                },
            ],
        )

        return response.choices[0].message.content
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
    

# result = generate_content_gpt("write essay about web technologies")
# print(result)