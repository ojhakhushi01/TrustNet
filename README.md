# TRUSTNET
### Privacy-Preserving Collaborative Threat Intelligence

TRUSTNET is a cybersecurity prototype designed to help organizations detect suspicious activity in their security logs and identify shared threat patterns while reducing the exposure of sensitive information.

The project combines a Python-based threat analysis backend with a React dashboard to demonstrate a privacy-aware collaborative threat intelligence workflow.

## Key Features

- **Threat Detection:** Identifies suspicious events such as repeated failed logins, flagged destination ports, potential port scanning, and unusually large outbound transfers.
- **Privacy Filtering:** Removes common sensitive identifiers from alert data and checks sanitized outputs for potential IP address and email leaks.
- **Threat Fingerprinting:** Generates SHA-256 fingerprints based on normalized event categories.
- **Cross-Organization Matching:** Compares threat categories identified by two sample organizations.
- **VirusTotal Integration:** Supports optional reputation lookups for public IP addresses without submitting complete security logs.
- **REST API:** Exposes backend analysis results through FastAPI.
- **Interactive Dashboard:** Provides screens for threat detection, privacy and sharing, and illustrative threat matches.

## Technology Stack

**Frontend**
- React
- Vite
- JavaScript
- CSS
- Lucide React icons

**Backend**
- Python
- FastAPI
- Uvicorn
- CSV processing
- SHA-256 hashing
- Requests
- python-dotenv
- VirusTotal API (optional)

## Project Structure

```text
TrustNet/
├── Backend/
│   ├── api.py
│   ├── collaboration.py
│   ├── detector.py
│   ├── fingerprint.py
│   ├── privacy.py
│   ├── virustotal.py
│   ├── test_detector.py
│   ├── test_error_handling.py
│   ├── test_virustotal.py
│   ├── trustnet_summary.json
│   └── sample_data/
│       ├── organization_a.csv
│       └── organization_b.csv
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Install the following before running the project:

- Python 3
- Node.js and npm
- Git (optional, for cloning the repository)

### 1. Set Up the Backend

Open a terminal in the TRUSTNET project directory (the folder containing `api.py`) and run:

```powershell
python -m venv .venv

Activate the virtual environment on Windows:

.\.venv\Scripts\Activate.ps1

Install the required Python packages:

python -m pip install fastapi "uvicorn[standard]" requests python-dotenv

Start the backend API:

python -m uvicorn api:app --reload --host 127.0.0.1 --port 8000

The API will be available at http://127.0.0.1:8000.

Interactive API documentation is available at http://127.0.0.1:8000/docs.
```

### 2. Set Up the Frontend

Open a second terminal in the project directory:

powershell
npm install
npm run dev
```
```
Open the local URL printed by Vite in your terminal, usually `http://localhost:5173`.

### 3. Optional: Configure VirusTotal

VirusTotal integration requires an API key. If you choose to enable it, create a `.env` file in the backend project directory and add:

```env
VIRUSTOTAL_API_KEY=your_virustotal_api_key
```

**Security:** Never commit your `.env` file or expose your API key publicly.
```

Replace the placeholder with your own key. Never commit your `.env` file or publish your API key.

Without a configured key, VirusTotal lookups will return an error status; the integration is optional.

## API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Basic API status and endpoint information |
| GET | `/api/summary` | Analyze the two sample organizations and return summary results |

## Testing

From the `Backend` directory, run the error-handling checks:

```powershell
python test_error_handling.py
```

To inspect the threat detection results for the sample organizations:

```powershell
python test_detector.py
```

The VirusTotal connection test requires a valid API key and internet access. Use it only when you intend to test the external integration.

## Current Project Status

TRUSTNET is a prototype. The backend analysis pipeline and the frontend dashboard are separate at present. The dashboard uses illustrative sample records and does not yet retrieve live results from the backend API.

Fingerprint matches indicate shared event categories; they do not independently establish that two organizations experienced the same attack. Privacy filtering covers common identifiers and patterns, but it is not a guarantee of complete anonymization or production-grade security.

The sample datasets are intended for demonstration and testing, not as evidence of live cyberattacks.

## Future Improvements

- Connect the React dashboard to the FastAPI backend.
- Display live threat analysis and privacy-validation results.
- Improve fingerprinting to compare richer threat characteristics.
- Expand privacy tests and validation for outgoing data.
- Add further tests and deployment documentation.

## License

No license has been specified yet. Reuse and redistribution permissions should be defined before the project is distributed publicly.
