# TRUSTNET Backend
### Privacy-Preserving Collaborative Threat Detection

TRUSTNET is a cybersecurity prototype that helps organizations identify shared threat patterns while protecting sensitive information.

## Features

- Threat detection from organization log data
- Privacy filtering and sensitive-data redaction
- Cross-organization threat-category comparison
- Threat fingerprint matching
- VirusTotal IP reputation integration
- FastAPI REST API
- Automated testing and error handling

## Technology Stack

- Python
- FastAPI
- Uvicorn
- Requests
- python-dotenv
- VirusTotal API

## Project Structure

```text
TrustNet/
├── api.py
├── detector.py
├── privacy.py
├── fingerprint.py
├── collaboration.py
├── virustotal.py
├── test_detector.py
├── test_error_handling.py
├── test_virustotal.py
├── trustnet_summary.json
└── sample_data/
    ├── organization_a.csv
    └── organization_b.csv
