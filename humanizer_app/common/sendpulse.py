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