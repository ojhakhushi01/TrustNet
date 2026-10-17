import hashlib
import json


def generate_fingerprint(alert):
    """
    Generate a normalized fingerprint based on the threat category.
    Ignores IP addresses, timestamps, and differences in alert wording.
    """
    event_type = str(alert.get("event_type", "unknown")).strip().lower()

    # Normalize the threat category
    normalized_alert = {
        "event_type": event_type
    }

    canonical_data = json.dumps(
        normalized_alert,
        sort_keys=True,
        separators=(",", ":")
    )

    return hashlib.sha256(
        canonical_data.encode("utf-8")
    ).hexdigest()


def match_fingerprints(alerts_a, alerts_b):
    """Find threat categories shared by both organizations."""

    fingerprints_a = {
        generate_fingerprint(alert): alert
        for alert in alerts_a
    }

    fingerprints_b = {
        generate_fingerprint(alert): alert
        for alert in alerts_b
    }

    common_fingerprints = fingerprints_a.keys() & fingerprints_b.keys()

    matches = []

    for fingerprint in sorted(common_fingerprints):
        matches.append({
            "fingerprint": fingerprint,
            "event_type": fingerprints_a[fingerprint].get(
                "event_type", "unknown"
            ),
            "match_status": "CATEGORY_MATCH"
        })

    return matches


if __name__ == "__main__":
    sample_a = [
        {"event_type": "outbound", "reasons": ["Large transfer detected"]},
        {"event_type": "port_scan", "reasons": ["Many ports accessed"]}
    ]

    sample_b = [
        {"event_type": "outbound", "reasons": ["Unusual outbound traffic"]},
        {"event_type": "port_scan", "reasons": ["Suspicious port activity"]}
    ]

    matches = match_fingerprints(sample_a, sample_b)

    print("\n===== TRUSTNET FINGERPRINTING =====")
    print("Matching threat categories:", len(matches))

    for match in matches:
        print("Event:", match["event_type"])
        print("Status:", match["match_status"])
        print("Fingerprint:", match["fingerprint"][:12] + "...")