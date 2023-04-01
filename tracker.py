import requests
import os 
  
def get_courses(department):  
    payload = f"dept={department}&maxRes=10000"
    headers = {
        "authority": "www.scu.edu",
        "accept": "*/*",
        "x-requested-with": "XMLHttpRequest",
        "user-agent": os.getenv("USER_AGENT"),
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-gpc": "1",
        "origin": "https://www.scu.edu",
        "sec-fetch-site": "same-origin",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        "accept-language": "en-US,en;q=0.9",
    }

    response = requests.request("POST", f"https://www.scu.edu/apps/ws/courseavail/search/4440/ugrad", headers=headers, data=payload)
    data = response.json()
    return data

def main():   
    # Fetch course data and add it to dict
    data = get_courses("POLI")
    for info in data["results"]:
        if info["class_nbr"] == '59098':
            print(f"Seats Remaining in Senzai's POLI 2: {info['seats_remaining']}")

main()