import anthropic
def human_writer(prompt):
    client = anthropic.Anthropic(
        # defaults to os.environ.get("ANTHROPIC_API_KEY")
        api_key="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",
    )
    message = client.messages.create(
        model="claude-3-sonnet-20240229",
        max_tokens=4096,
    
        messages=[
            {"role": "user", "content": f"While generating text follow to these guidelines: prioritize short words with minimal syllables, opting for simpler vocabulary. Craft sentences of varied lengths and incorporate diverse sentence structures. Whenever feasible. Based on these rules {prompt}. Output only the genereted text without any additional explanations or introductions."}
        ]
    )

    return message.content[0].text



# result = human_writer("write essay about web technologies")
# print(result)