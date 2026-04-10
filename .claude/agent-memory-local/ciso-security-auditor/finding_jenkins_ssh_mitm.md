---
name: Jenkinsfile uses StrictHostKeyChecking=no on all SSH/SCP calls
description: All 12 SSH and SCP commands in Jenkinsfile disable host key verification, enabling MITM attacks during deployment
type: project
---

Jenkinsfile lines 152-222: every `ssh` and `scp` call includes `-o StrictHostKeyChecking=no`. This disables host key verification for the Raspberry Pi target (192.168.4.7). An attacker who can intercept the Jenkins-to-Raspberry network path (LAN, ARP poisoning) could intercept the .env.production file transfer and substitute malicious scripts.

**Why:** Convenience during initial setup. Known risk, not yet addressed.

**How to apply:** Remediation is to pre-populate Jenkins SSH known_hosts with the Raspberry Pi host key and remove the flag. Use `ssh-keyscan` in a setup stage instead.

Status: OPEN as of 2026-04-02.
