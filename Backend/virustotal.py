import ipaddress
import os

import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("VIRUSTOTAL_API_KEY")
BASE_URL = "https://www.virustotal.com/api/v3"


def check_ip_reputation(ip_address):
    """Check VirusTotal for an IP's available reputation information."""

    if not API_KEY:
        return {"status": "ERROR", "message": "VirusTotal API key is missing."}

    try:
        ip = ipaddress.ip_address(ip_address)
    except ValueError:
        return {"status": "ERROR", "message": "Invalid IP address."}

    if not ip.is_global:
        return {
            "status": "SKIPPED",
            "message": "Non-public IP addresses are not submitted."
        }

    try:
        response = requests.get(
            f"{BASE_URL}/ip_addresses/{ip}",
            headers={"x-apikey": API_KEY},
            timeout=15,
        )

        if response.status_code == 200:
            data = response.json()["data"]["attributes"]
            return {
                "status": "SUCCESS",
                "ip_address": str(ip),
                "reputation": data.get("reputation"),
                "malicious_detections": data.get("last_analysis_stats", {}).get(
                    "malicious", 0
                ),
                "suspicious_detections": data.get("last_analysis_stats", {}).get(
                    "suspicious", 0
                ),
            }

        if response.status_code == 401:
            return {"status": "ERROR", "message": "API key was rejected."}

        if response.status_code == 403:
            return {
                "status": "ERROR",
                "message": "API access denied or account quota/permissions restricted.",
            }

        if response.status_code == 429:
            return {
                "status": "ERROR",
                "message": "Rate limit reached. Try again later.",
            }

        return {
            "status": "ERROR",
            "message": f"VirusTotal returned HTTP {response.status_code}.",
        }

    except requests.RequestException:
        return {"status": "ERROR", "message": "Could not reach VirusTotal."}


if __name__ == "__main__":
    # Documentation-only public IP for a safe initial test.
    result = check_ip_reputation("8.8.8.8")

    print("\n===== TRUSTNET VIRUSTOTAL CHECK =====")
    print(result)