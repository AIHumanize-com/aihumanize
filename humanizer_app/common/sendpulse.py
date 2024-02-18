import requests

BASE_URL = "https://api.sendpulse.com"
# from fake_data  import contact_data
def get_token():
    url  = f"{BASE_URL}/oauth/access_token"
    client_id = "4305e42d88c0237d33ab3454814b9b9a"
    secret = "d98966db175eeba9a94a79a553c1312e"
    grant_type = "client_credentials"
    response = requests.post(url, data={"grant_type": grant_type, "client_id": client_id, "client_secret": secret})
    token = response.json()["access_token"]
    return token




def add_user(token, email, *args, **kwargs):
    url  = f"{BASE_URL}/addressbooks/545013/emails"
    data = {"emails": [{"email": email, "variables": kwargs}]}
    
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(url, headers=headers, json=data)
    return response.json()


# email = contact_data.pop("email")



def update_user(token, email, *args, **kwargs):
    url  = f"{BASE_URL}/addressbooks/545013/emails"
    data = {"emails": [{"email": email, "variables": kwargs}]}
    
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(url, headers=headers, json=data)
    return response.json()


def change_sendpulse_variable(email, variable_name, variable_value, token):
    url  = f"{BASE_URL}/addressbooks/545013/emails/variable"
    data = {"email": email, "variables":[ {
         "name":variable_name,
         "value":variable_value
        },  
      ]}
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(url, headers=headers, json=data)
    return response.json()
    


# result = change_sendpulse_variable("megamedia.uz@gmail.com", "words_remaining", 12, get_token())
# print(result)

def search_user(token, email):
    url  = f"{BASE_URL}/addressbooks/545013/emails/{email}"
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(url, headers=headers)
    return response.json()

# add_user_test = add_user(get_token(), email, **contact_data)
# search_test = search_user(get_token(), email)
# print(search_test)
# update_test = update_user(get_token(), email=email, **contact_data)
# print(update_test)




def send_contact(bearer_token, name, email, subject, message):
    url = "https://api.sendpulse.com/crm/v1/deals/"
    headers = {
        "Authorization": f"Bearer {bearer_token}",
        "Content-Type": "application/json"
    }
    data = {
        "pipelineId": 90777,
        "stepId": 312239,
        "responsibleId": 8571902,
        "name": subject,
        "attributes": [
            {"attributeId": 508904, "value": message},  # corrected typo 'mesage' to 'message'
            {"attributeId": 509570, "value": subject},
            {"attributeId": 509569, "value": email},
            {"attributeId": 509568, "value": name}
        ]
    }
    
    response = requests.post(url, json=data, headers=headers)
    return response.json()