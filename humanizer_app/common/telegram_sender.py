
import requests 

def send_telegram_message( message):
    url = f"https://api.telegram.org/bot5222427534:AAHtRQkuS6dGyhesgTyq5YXI8zuncQAXcc0/sendMessage?chat_id=516270172&text={message}"
    response = requests.get(url)
    print(response.content)


# print(send_telegram_message("Hello world"))




