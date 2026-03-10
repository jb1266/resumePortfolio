# ☁️ John Barr — Cloud Portfolio Website

A personal portfolio website built to showcase my cloud computing experience, certifications, AWS projects, and what I'm actively pursuing in the cloud engineering space. Deployed entirely on AWS using a secure, production-grade infrastructure pipeline.

---

## 🌐 About the Project

This site serves as a living portfolio that highlights:

- **Cloud architecture experience** — hands-on AWS projects with real infrastructure diagrams
- **Certifications** — AWS Certified Cloud Practitioner, AWS Solutions Architect Associate, and Microsoft Azure Fundamentals (AZ-900)
- **Areas of focus** — Cloud security, CI/CD, containerization, advanced networking, and open-source AI tools
- **Work history & education** — IT internship experience and a cloud-focused academic background at NOVA and Purdue University Global

---

## 🏗️ Cloud Infrastructure

The site is deployed on AWS using a fully automated, secure pipeline. No manual uploads — every push to this repo triggers an automatic deployment.

### Architecture Overview

```
GitHub Repo
     │
     ▼
AWS CodePipeline
     │  (Source Stage → this repo)
     │  (Deploy Stage → S3 Bucket)
     ▼
Amazon S3 Bucket
     │  (Static website hosting)
     │  (Public access: BLOCKED)
     │  (IAM policy: CloudFront-only access)
     ▼
Amazon CloudFront Distribution
     │  (Global CDN edge delivery)
     │  (HTTPS enforcement)
     │  (WAF attached)
     ▼
AWS WAF (Web Application Firewall)
     │  (Protects against common web exploits)
     │  (Attached at the CloudFront distribution level)
     ▼
Amazon CloudWatch
     (Metrics, monitoring, and observability)
```

---

### 🔧 Services Used

| Service | Role |
|---|---|
| **AWS CodePipeline** | CI/CD pipeline — source stage watches this GitHub repo, deploy stage pushes to S3 |
| **Amazon S3** | Hosts the static site files (`index.html`). Public access is fully blocked. |
| **Amazon CloudFront** | CDN distribution serving the site globally over HTTPS from S3 |
| **AWS IAM** | IAM role grants CloudFront-only access to the S3 bucket — no direct public S3 access |
| **AWS WAF** | Web Application Firewall attached to the CloudFront distribution for threat protection |
| **Amazon CloudWatch** | Monitors CloudFront distribution metrics — requests, error rates, cache hit ratio, and more |

---

### 🔒 Security Design

- **S3 bucket is not publicly accessible** — all `Block Public Access` settings are enabled
- **CloudFront uses an Origin Access Control (OAC)** with a scoped IAM bucket policy, so only the CloudFront distribution can retrieve objects from S3
- **AWS WAF** is attached at the CloudFront layer to filter malicious traffic before it reaches the origin
- **HTTPS is enforced** — HTTP requests are redirected to HTTPS at the CloudFront level
- All infrastructure follows **AWS least-privilege principles**

---

### ⚙️ CI/CD Pipeline

Every commit pushed to this repository automatically triggers the CodePipeline:

1. **Source Stage** — CodePipeline detects the new commit from this GitHub repo
2. **Deploy Stage** — The updated `index.html` is deployed directly to the S3 bucket
3. **CloudFront** serves the latest version from the edge within seconds

No manual intervention required after the initial pipeline setup.

---

## 📁 Repository Structure

```
/
└── index.html      # Complete single-file portfolio (HTML + CSS + JS)
└── README.md       # This file
```

---

## 📬 Contact

- 🔗 [LinkedIn](https://www.linkedin.com/in/john-barr-539643393/)
- 🐙 [GitHub](https://github.com/jb1266)
- 📧 johnbarrz126@gmail.com
- 📍 Oakton, VA