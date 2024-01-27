from openai import OpenAI
import json
client = OpenAI(api_key="")

example = {
    "language_use": {
        "formality": None,
        "technicality": None,
        "colloquialisms": None,
    },
    "sentence_structure": {
        "length": None,
        "complexity": None,
        "variety": None,
    },
    "vocabulary_level": {
        "basic_advanced_specialized": None,
        "abstract_concrete": None,
    },
    "tone_and_voice": {
        "emotional_tone": None,
        "author_personality": None,
    },
    "rhythm_and_flow": {
        "pacing": None,
        "stylistic_elements": None,
    },
    "literary_devices": {
        "metaphors_similes": None,
        "symbolism": None,
        "irony": None,
    },
    "rhetorical_strategies": {
        "persuasion_techniques": None,
        "argument_structure": None,
    },
    "formatting_and_presentation": {
        "paragraph_structure": None,
        "use_of_headings": None,
    },
    "audience_engagement": {
        "direct_address": None,
        "questions": None,
        "call_to_action": None,
    },
    "consistency_and_coherence": {
        "flow_of_ideas": None,
        "consistent_tense_style": None,
    },
    "content_theme": {
       
        "information_density": None,
        "factual_vs_anecdotal": None,
    },
    "content_purpose": {
        "informative_vs_entertaining": None,
        "educational_value": None,
      
    },
}


def anaylze_style(input_text):
    response = client.chat.completions.create(
    model="gpt-4-1106-preview",
    messages=[
        {
        "role": "system",
        "content": f"you are expert to analyze text. return result as python dict and keep current keys as it is. and value should be max 3 words. example response: {example}. important: return only python dict. Important:  while analyzing give 5 deegre for example informal, slighly informal or formal, slightl formal so on for every analyse."
        },
    
        {
        "role": "user",
        "content": f"Please analyze the following text in detail, focusing on the writing style. Pay attention to the language use (formality, technicality, colloquialisms), sentence structure (length, complexity, variety), vocabulary level (basic, advanced, specialized), tone and voice (emotional tone, author's personality), rhythm and flow (pacing, stylistic elements), use of literary devices (metaphors, similes, symbolism, irony), rhetorical strategies (persuasion techniques, argument structure), formatting and presentation (paragraph structure, use of headings), audience engagement (direct address, questions, call to action), and consistency and coherence (flow of ideas, consistent tense/style). Provide a comprehensive analysis of these elements to understand the author's unique writing style. Text:  {input_text}"
        },
    
    ],
    temperature=0,
    max_tokens=4096,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )

    result = response.choices[0].message.content
    if "```python" in result:
        result = result.replace("```python", "")

    if "```" in result:
        result = result.replace("```", "")

    if "'" in result:
        result = result.replace("'", '"')

    result = result.replace("\n", "")
   
    json_data = json.loads(result)
    return json_data


# result = anaylze_style(prompts["essay"])

# Writing style analysis from the response


# Text to be rewritten

def rewrite(style_analysis, text_to_rewrite):
    # style_analysis = anaylze_style(text_to_rewrite
    # Constructing the prompt dynamically with clearer instructions
    prompt_instructions = []

    # Language Use
    if style_analysis['language_use']['formality'] != "None":
        prompt_instructions.append(f"Use {style_analysis['language_use']['formality'].lower()} language")

    if style_analysis['language_use']['technicality'] != "None":
        prompt_instructions.append(f"Use {style_analysis['language_use']['technicality'].lower()} language")

    # Sentence Structure
    if style_analysis['sentence_structure']['length'] != "None":
        prompt_instructions.append(f"Write sentences of {style_analysis['sentence_structure']['length'].lower()} length")

    if style_analysis['sentence_structure']['complexity'] != "None":
        prompt_instructions.append(f"Write sentences with {style_analysis['sentence_structure']['complexity'].lower()} complexity")

    if style_analysis['sentence_structure']['variety'] != "None":
        prompt_instructions.append(f"Use a {style_analysis['sentence_structure']['variety'].lower()} of sentence structures")

    # Vocabulary Level
    if style_analysis['vocabulary_level']['basic_advanced_specialized'] != "None":
        prompt_instructions.append(f"Employ {style_analysis['vocabulary_level']['basic_advanced_specialized'].lower()} vocabulary")

    if style_analysis['vocabulary_level']['abstract_concrete'] != "None":
        prompt_instructions.append(f"Use {style_analysis['vocabulary_level']['abstract_concrete'].lower()} terms")

    # Tone and Voice
    if style_analysis['tone_and_voice']['emotional_tone'] != "None":
        prompt_instructions.append(f"Maintain a {style_analysis['tone_and_voice']['emotional_tone'].lower()} tone")

    if style_analysis['tone_and_voice']['author_personality'] != "None":
        prompt_instructions.append(f"Convey an {style_analysis['tone_and_voice']['author_personality'].lower()} personality")

    # Rhythm and Flow
    if style_analysis['rhythm_and_flow']['pacing'] != "None":
        prompt_instructions.append(f"Keep the pacing {style_analysis['rhythm_and_flow']['pacing'].lower()}")

    if style_analysis['rhythm_and_flow']['stylistic_elements'] != "None":
        prompt_instructions.append(f"Include {style_analysis['rhythm_and_flow']['stylistic_elements'].lower()} stylistic elements")

    # Rhetorical Strategies
    if style_analysis['rhetorical_strategies']['persuasion_techniques'] != "None":
        prompt_instructions.append(f"Use {style_analysis['rhetorical_strategies']['persuasion_techniques'].lower()} persuasion techniques")

    if style_analysis['rhetorical_strategies']['argument_structure'] != "None":
        prompt_instructions.append(f"Structure arguments {style_analysis['rhetorical_strategies']['argument_structure'].lower()}ly")

    # Formatting and Presentation
    if style_analysis['formatting_and_presentation']['paragraph_structure'] != "None":
        prompt_instructions.append(f"Organize paragraphs: {style_analysis['formatting_and_presentation']['paragraph_structure'].lower()}ly")

    if style_analysis['formatting_and_presentation']['use_of_headings'] != "None":
        prompt_instructions.append(f"Use {style_analysis['formatting_and_presentation']['use_of_headings'].lower()} headings")

    # Audience Engagement
    if style_analysis['audience_engagement']['direct_address'] != "None":
        prompt_instructions.append(f"Engage with the audience {style_analysis['audience_engagement']['direct_address'].lower()}ly")

    if style_analysis['audience_engagement']['questions'] != "None":
        prompt_instructions.append(f"Include {style_analysis['audience_engagement']['questions'].lower()} questions")

    if style_analysis['audience_engagement']['call_to_action'] != "None":
        prompt_instructions.append(f"Have a {style_analysis['audience_engagement']['call_to_action'].lower()} call to action")

    # Consistency and Coherence
    if style_analysis['consistency_and_coherence']['flow_of_ideas'] != "None":
        prompt_instructions.append(f"Ensure {style_analysis['consistency_and_coherence']['flow_of_ideas'].lower()} flow of ideas")

    if style_analysis['consistency_and_coherence']['consistent_tense_style'] != "None":
        prompt_instructions.append(f"Maintain {style_analysis['consistency_and_coherence']['consistent_tense_style'].lower()} tense and style")
    
    

    if style_analysis['content_theme']['information_density'] != "None":
        prompt_instructions.append(f"Maintain {style_analysis['content_theme']['information_density'].lower()} information density")

    if style_analysis['content_theme']['factual_vs_anecdotal'] != "None":
        prompt_instructions.append(f"Use {style_analysis['content_theme']['factual_vs_anecdotal'].lower()} content")

    # Content Purpose
    if style_analysis['content_purpose']['informative_vs_entertaining'] != "None":
        prompt_instructions.append(f"Write in a {style_analysis['content_purpose']['informative_vs_entertaining'].lower()} manner")

    if style_analysis['content_purpose']['educational_value'] != "None":
        prompt_instructions.append(f"Include {style_analysis['content_purpose']['educational_value'].lower()} educational value")

    

    # Joining the instructions into a single string
    formatted_instructions = ". ".join(prompt_instructions)

    # Final prompt
    prompt = f"Rewrite the given text according to specific writing guidelines: {formatted_instructions}."
   
    response = client.chat.completions.create(
    model="gpt-4-1106-preview",

    messages=[
        {
        "role": "system",
        "content": prompt
        },
    
        {
        "role": "user",
        "content": text_to_rewrite
        },
    
    ],
    temperature=0,
    max_tokens=4096,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )

    result = response.choices[0].message.content

    return result



