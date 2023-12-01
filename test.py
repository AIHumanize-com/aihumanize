import nltk
from textblob import TextBlob
import re

nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')

from nltk.corpus import wordnet

def replace_adjective(word):
    synonyms = []
    for syn in wordnet.synsets(word):
        for lemma in syn.lemmas():
            if lemma.name().lower() != word.lower():
                synonyms.append(lemma.name())
    if synonyms:
        return synonyms[0]
    else:
        return word

def replace_adverb(word):
    synonyms = []
    for syn in wordnet.synsets(word):
        for lemma in syn.lemmas():
            if lemma.name().lower() != word.lower():
                synonyms.append(lemma.name())
    if synonyms:
        return synonyms[0]
    else:
        return word

def humanize_text(text):
    # Split text into sentences while preserving symbols
    sentences = re.findall(r'[^.!?]+[.!?]+|[^\w\s]+', text)

    # Iterate over each sentence and humanize it
    humanized_sentences = []
    for sentence in sentences:
        # Split sentence into words while preserving symbols
        words = re.findall(r'\w+|[^\w\s]+', sentence)

        # Use TextBlob to get the part-of-speech tags for each word in the sentence
        tags = TextBlob(sentence).tags

        # Replace adjectives and adverbs with more human-like alternatives
        humanized_words = []
        for word, tag in tags:
            if tag.startswith('JJ'):
                humanized_word = replace_adjective(word)
                if humanized_word:
                    humanized_words.append(humanized_word)
                else:
                    humanized_words.append(word)
            elif tag.startswith('RB'):
                humanized_word = replace_adverb(word)
                if humanized_word:
                    humanized_words.append(humanized_word)
                else:
                    humanized_words.append(word)
            else:
                humanized_words.append(word)

        # Join the humanized words back into a sentence with symbols
        humanized_sentence = ''
        for i in range(len(words)):
            if words[i].isalpha() and i < len(humanized_words):
                humanized_sentence += humanized_words[i] + ' '
            else:
                humanized_sentence += words[i]
        humanized_sentences.append(humanized_sentence)

    # Join the humanized sentences back into a single text with symbols
    humanized_text = ' '.join(humanized_sentences)

    # Remove extra spaces and unusual symbol placement
    # humanized_text = re.sub(r'\s+', ' ', humanized_text)
    # humanized_text = re.sub(r'\s([^\w\s])', r'\1', humanized_text)
    # humanized_text = re.sub(r'([^\w\s])\s', r'\1', humanized_text)

    return humanized_text.strip()

# Example usage
ai_generated_text = """The advent of electric vehicles has been touted as a cornerstone in the transition towards sustainable transportation. With global efforts to reduce carbon emissions and mitigate climate change, EVs have gained substantial attention and investment. This paper aims to dissect the multifaceted nature of EVs, weighing their advantages against the inherent limitations.

Benefits of Electric Vehicles:

Environmental Impact:
EVs offer a substantial reduction in greenhouse gas emissions, especially when powered by renewable energy sources. The absence of tailpipe emissions contributes significantly to improving air quality in urban areas.

Energy Efficiency:
Electric vehicles are inherently more efficient than their internal combustion engine counterparts. The direct conversion of electrical energy to power provides a higher efficiency rate, reducing overall energy consumption.

Performance Advantages:
Electric motors can provide instant torque, offering a smooth and swift acceleration. This feature, combined with low center of gravity designs, often results in superior handling and an enhanced driving experience.

Drawbacks of Electric Vehicles:

Limited Range and Range Anxiety:
Despite advancements, most EVs still offer a limited range compared to gasoline vehicles. This limitation, coupled with long charging times, contributes to range anxiety among potential consumers.

Charging Infrastructure:
The lack of widespread and uniform charging infrastructure remains a significant barrier. The variability in charging station availability, especially in rural or underserved urban areas, poses a challenge for long-distance travel.

Conclusion:
Electric vehicles present a promising avenue towards a more sustainable future in personal transportation. They offer substantial environmental benefits, improved efficiency, and performance advantages. However, challenges like limited range, underdeveloped charging infrastructure, battery issues, high upfront costs, and the potential impact on the power grid remain substantial hurdles. Addressing these challenges is crucial for the widespread adoption and long-term success of electric vehicles. As technology advances and infrastructure improves, the balance of these factors may shift further in favor of EVs, solidifying their position as a viable alternative to traditional combustion engines.
"""
print("here's the result!")
humanized_text = humanize_text(ai_generated_text)
print(humanized_text)