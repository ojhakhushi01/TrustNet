import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("VIRUSTOTAL_API_KEY")

if not API_KEY:
    print("ERROR: API key not found in .env")
    raise SystemExit(1)

url = "https://www.virustotal.com/api/v3/users/current"

headers = {
    "x-apikey": API_KEY
}

try:
    response = requests.get(
        url,
        headers=headers,
        timeout=15
    )

    if response.status_code == 200:
        print("SUCCESS: VirusTotal API connection works!")
        print("Your API key was accepted.")
    elif response.status_code == 401:
        print("ERROR: API key is invalid or unauthorized.")
    elif response.status_code == 403:
        print("ERROR: Access forbidden. Check API permissions.")
    else:
        print("HTTP status:", response.status_code)
        print("Response:", response.text[:300])

except requests.RequestException as error:
    print("Connection error:", error)