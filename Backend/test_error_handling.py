from unittest.mock import patch

from api import lookup_public_ips


def test_invalid_ip_is_skipped():
    alerts = [[
        {"source_ip": "not-an-ip"}
    ]]

    result = lookup_public_ips(alerts)

    assert result["invalid_indicators"] == 1
    assert result["public_ip_lookups"] == 0
    assert result["results"] == []

    print("PASS: Invalid IP is skipped")


def test_private_ip_is_skipped():
    alerts = [[
        {"source_ip": "192.168.1.10"}
    ]]

    result = lookup_public_ips(alerts)

    assert result["skipped_non_public_indicators"] == 1
    assert result["public_ip_lookups"] == 0
    assert result["results"] == []

    print("PASS: Private IP is not sent to VirusTotal")


def test_virus_total_error_is_handled():
    alerts = [[
        {"source_ip": "8.8.8.8"}
    ]]

    with patch(
        "api.check_ip_reputation",
        side_effect=RuntimeError("Simulated API failure"),
    ):
        result = lookup_public_ips(alerts)

    assert result["public_ip_lookups"] == 1
    assert result["lookup_errors"] == 1
    assert result["results"][0]["status"] == "ERROR"

    print("PASS: VirusTotal errors are handled")


if __name__ == "__main__":
    test_invalid_ip_is_skipped()
    test_private_ip_is_skipped()
    test_virus_total_error_is_handled()

    print("\nAll error-handling tests passed!")