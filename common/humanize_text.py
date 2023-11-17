import openai


# client = OpenAI()


def rewrite_text(original_text, text_type):
    """
    Rewrite the given text according to the specified type to make it seem more human-written.

    Args:
    original_text (str): The text to be rewritten.
    text_type (str): The type of text to rewrite ('essay', 'article', 'story', etc.).
    openai_api_key (str): Your OpenAI API key.

    Returns:
    str: The rewritten text.
    """
    openai_api_key = "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"


    prompts = {
        "essay": "You are an AI skilled in natural language processing with an understanding of academic and formal writing standards. Your task is to rewrite the following text to align with these standards for an academic essay. Ensure the text is precise, formally structured, and adheres to academic language conventions. Avoid colloquialisms and maintain the factual accuracy and integrity of the original content.",
        "article": "Transform this text into a continuous article format, suitable for publication. The article should be engaging, informative, and appropriate for the target audience without using distinct headers or section titles. Use a professional yet accessible tone, include relevant facts, and ensure the text flows smoothly from introduction to conclusion. Tailor the content to appeal to and inform readers interested in the topic, maintaining a cohesive narrative throughout.",
        "story": "Rewrite this text as a compelling story. Focus on creating vivid imagery, developing characters, and building an engaging narrative arc. Use descriptive language to set the scene and convey emotions, and ensure the story flows smoothly from beginning to end, capturing the reader’s interest throughout.",
        "cover_letter": "Adapt this text for a cover letter. It should be professional and concise, highlighting relevant skills and experiences. Tailor the content to address the specific job and company, showing why the candidate is a good fit. Keep the tone formal yet personable, and ensure it includes a courteous introduction and a strong closing statement.",
        "report": "Revise this text to fit the structure of a formal report. It should be clear, concise, and factual. Organize the content into sections with headings, include data and analysis where appropriate, and summarize the findings in a concluding section. The language should be formal and professional, suitable for a business or academic setting.",
        "business_material": "Modify this text to be suitable for business material. The tone should be professional and to the point, focusing on clarity and efficiency. Highlight key points, use bullet points or numbered lists for easy readability, and ensure the language is appropriate for a business audience. Include calls to action or conclusions as needed.",
        "legal_material": "Convert this text into a format appropriate for legal material. Use precise and formal legal language, and ensure the content is thorough and detailed. The text should be clear, objective, and maintain a tone suitable for legal documents. Ensure all legal terms are used correctly and the text complies with relevant legal standards and formats.",
        "gpt3": "You are a expert to rewrite the text in a more natural and human-like manner",
        "general": "You are a expert to  rewrite the text in a more natural and human-like manner to avoid ai detectors while keeping original writing style. use html p tag instead of new line.",
        "easy": "Rewrite the following text with minimal changes, focusing on replacing a few keywords and phrases to make it slightly different. Maintain the original sentence structure and style. The goal is to lightly paraphrase the text without altering its core meaning.",
        "medium": "Please modify the following text by altering its sentence structure moderately and using synonyms more liberally. The core message should remain clear, but the text should be noticeably different from the original while retaining a similar style.",
        "aggresive": "Extensively rewrite the following text, changing both its sentence structure and vocabulary significantly. The essential meaning and style should be retained, but the paraphrased text should be substantially different from the original"


    }

    if text_type not in prompts:
        raise ValueError(
            "Unsupported text type. Please choose from 'essay', 'article', etc."
        )

    client = openai.OpenAI(api_key=openai_api_key)

    try:
        response = client.chat.completions.create(
            model="gpt-4-1106-preview",  # You can experiment with different models
            messages=[
                {
                    "role": "system",
                    "content": prompts[text_type] + "write in human manner",
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


# Example usage


# Example usage
# original_text = """Basketball is a team sport played by two teams of five players each. The primary objective is to score points by shooting the basketball through the opponent's hoop, which is mounted on a backboard 10 feet (3.048 meters) above the ground. The team with the most points at the end of the game wins. Basketball is played on a rectangular court, typically indoors, with a surface made of wood or synthetic materials. The rules and regulations are governed by various organizations, such as FIBA (International Basketball Federation) and the NBA (National Basketball Association). The following is a general outline of the basic rules of basketball:
# 1. Game duration: A regulation basketball game is divided into four quarters, each lasting 12 minutes in the NBA and 10 minutes in FIBA play. College basketball in the US has two 20-minute halves. If the game is tied at the end of regulation, overtime periods are played until a winner is determined.
# 2. Starting play: The game begins with a jump ball at the center of the court, where the referee throws the ball into the air, and one player from each team tries to gain possession by tapping it to a teammate.
# 3. Scoring: Points are scored by shooting the ball through the hoop. A field goal made from inside the three-point arc is worth two points, while a field goal made from outside the arc is worth three points. Free throws, awarded after a foul, are worth one point each.
# 4. Possession and dribbling: A player in possession of the ball must either pass it to a teammate or dribble (bounce) the ball while moving.
# """
# rewritten_text = rewrite_text(original_text, "essay", api_key)
# print(rewritten_text)
