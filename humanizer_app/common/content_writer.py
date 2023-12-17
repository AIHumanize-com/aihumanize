
import os
import openai


prompts = {
    "blog_title": lambda topic, keywords: f"Generate a catchy, SEO-friendly blog title for an article about '{topic}', incorporating keywords such as {keywords}.",
    "blog_outline": lambda topic, tone: f"Create an outline for a blog post discussing '{topic}'. The tone should be {tone}. Include an introduction, at least three main points, and a conclusion.",
    "blog_post": lambda topic, tone, keywords: f"Create a blog post about “{topic}”. Write it in a “{tone}” tone. Use transition words. Use active voice. Write over 200 words. Use very creative titles for the blog post. Add a title for each section. Ensure there are a minimum of 9 sections. Each section should have a minimum of two paragraphs. Include the following keywords: “{keywords}”. Create a good slug for this post and a meta description with a maximum of 100 words and add it to the end of the blog post.",
    "social_media_facebook": lambda topic, tone: f"Craft a Facebook post for a business promoting '{topic}'. The tone should be {tone} and inviting, including a call-to-action for followers.",
    "social_media_twitter": lambda topic, tone: f"Compose a concise and engaging Twitter post for a company announcing '{topic}'. The tweet should be {tone} and designed to generate excitement and interaction.",
    "ad_content": lambda topic, keywords: f"Generate ad copy for a promotion focusing on '{topic}'. The ad should highlight key aspects and create urgency, using keywords like {keywords}.",
    "email": lambda topic, tone: f"Write a professional email in relation to '{topic}'. The tone should be {tone}. The email should be concise, clear, and relevant."
}


def generate_content(content_type, topic, tone, keywords, language):
    openai_api_key = os.environ.get("OPEN_AI_KEY")
    client = openai.OpenAI(api_key=openai_api_key)
    print(content_type, topic, tone, keywords, language)
    # Framing the AI as an expert in the given field
    user_context = prompts[content_type](topic, tone, keywords)

    

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-1106",  # Experiment with different models as needed
            messages=[
                {
                    "role": "system",
                    "content": "You are proffesional writer and use html tags to format the content not markdown.",
                },
                {
                    "role": "user",
                    "content": user_context,
                },
            ],
        )

        return response.choices[0].message.content
    except Exception as e:
        print(f"An error occurred: {e}")
        return None


# content_type = "blog_post"
# topic = "sustainable living practices"
# tone = "informative and engaging"
# keywords = "eco-friendly, green energy, recycling"

# content = generate_content(content_type, topic, tone, keywords)
# print(content)
# result = generate_content("How to make a website. Comprehensive guide.", "Informative", "HTML, CSS, JavaScript", "English", 1000, 900)
# print(result)
    

def extend_text(text, tone, keywords, language, max_words_count, min_words_count):
    openai_api_key = os.environ.get("OPEN_AI_KEY")


    client = openai.OpenAI(api_key=openai_api_key)

    

    # Updated system prompt
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-1106",  # You can experiment with different models
            messages=[
                {
                    "role": "system",
                    "content": f"You are a skilled content writer. Continue the given text with a short, engaging, and informative paragraph.",
                },
                {
                    "role": "user",
                    "content": text,
                },
            ],
        )

        return response.choices[0].message.content
    except Exception as e:
        print(f"An error occurred: {e}")
        return None