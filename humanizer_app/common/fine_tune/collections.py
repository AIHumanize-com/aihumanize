from test_data import input_text, paraphrased
import nltk
from nltk.tokenize import sent_tokenize
nltk.download('punkt')
def create_dataset_for_sentences(original_text, paraphrased_text):
    """
    Splits the original and paraphrased texts into sentences and creates a dataset in the format 
    required for OpenAI fine-tuning, with each pair of sentences.

    :param original_text: The full original text to be paraphrased.
    :param paraphrased_text: The full paraphrased version of the original text.
    :return: A list of dictionaries, each in the specified format for OpenAI fine-tuning.
    """
    # Splitting the texts into sentences
    original_sentences = sent_tokenize(original_text)
    paraphrased_sentences = sent_tokenize(paraphrased_text)

    # Check if both texts have the same number of sentences
    if len(original_sentences) != len(paraphrased_sentences):
        raise ValueError("The number of sentences in original and paraphrased text must be the same.")

    # Creating dataset entries for each pair of sentences
    dataset = []
    for original, paraphrased in zip(original_sentences, paraphrased_sentences):
        entry = {
            "messages": [
                {"role": "system", "content": "Paraphrase the following sentence."},
                {"role": "user", "content": original},
                {"role": "assistant", "content": paraphrased}
            ]
        }
        dataset.append(entry)

    return dataset

result = create_dataset_for_sentences(input_text, paraphrased)
print(result)