import requests
import json
token = 'bWF1dGljdXNlcjojVGVtdXJpeTEyMTI='
headers = {"Authorization": f"Basic {token}", "Content-Type": "application/json"}

def get_contact(email):
    response  = requests.get(f"https://marketing.aihumanize.com/api/contacts?search={email}", headers=headers)
    data = response.json() 
    count_contacts = data['total']  
    if int(count_contacts) == 0:
        return False
    else:
        return data
    

def create_contact(*args, **kwargs):
    response  = requests.post(f"https://marketing.aihumanize.com/api/contacts/new", headers=headers, data=json.dumps(kwargs))
    

def update_contact(email, **kwargs):
    contact_id = list(get_contact(email)["contacts"].values())[0]['id']
    response  = requests.patch(f"https://marketing.aihumanize.com/api/contacts/{contact_id}/edit", headers=headers, data=json.dumps(kwargs))



# kwatgs keys should be
# is_subscription_active
# sub_start_date	
# sub_actual_end_date	
# subscription_end_date	
# words_remaining	
# words_used
# subscription_plan	
# firstname
# lastname	
# email
# last_active
    


