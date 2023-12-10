
import os
import openai

def generate_content(topic, tone, keywords, language, max_words_count, min_words_count):
    openai_api_key = os.environ.get("OPEN_AI_KEY")


    client = openai.OpenAI(api_key=openai_api_key)

    

    # Updated system prompt
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-1106",  # You can experiment with different models
            messages=[
                {
                    "role": "system",
                    "content": f"Create a blog post incorporating the specified tone, keywords, language and words count. Ensure the post is coherent, engaging, and adheres to the provided guidelines. Include a clear introduction, body, and conclusion. Dont use markdown instead use html tags to format the post dont put html or body use tags itself like p, h etc. ",
                },
                {
                    "role": "user",
                    "content": f"Topic: {topic}. Tone: {tone}. Keywords: {keywords}. Language: {language}. Words count should be between {min_words_count} and {max_words_count}",
                },
            ],
        )

        return response.choices[0].message.content
    except Exception as e:
        print(f"An error occurred: {e}")
        return None


# result = generate_content("How to make a website. Comprehensive guide.", "Informative", "HTML, CSS, JavaScript", "English", 1000, 900)
# print(result)