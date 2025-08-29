
<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="50" alt="GitHub" style="background:white; padding:5px; border-radius:8px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" height="50" alt="Jenkins"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" height="50" alt="Kubernetes"/>
  <img src="https://raw.githubusercontent.com/cncf/artwork/master/projects/argo/icon/color/argo-icon-color.svg" height="50" alt="ArgoCD"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height="50" alt="Docker"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" height="50" alt="Grafana"/>
</p>

<h1 align="center">Kubernetes GitOps Deployment with CI/CD Automation</h1>

<p align="center">
A production-grade <strong>GitOps-powered CI/CD pipeline</strong> for a Notes App using GitHub Actions, Jenkins, ArgoCD, Kubernetes, Docker, Prometheus & Grafana.
</p>

---


## ![Summary Icon](https://img.shields.io/badge/Summary-Project%20Overview-blue?style=flat-square&logo=readme&logoColor=white)

This project delivers a production-grade **GitOps CI/CD pipeline** for a Notes Application, combining automation, security, and observability across every stage of deployment.


### 🔹 CI/CD & GitOps Flow

**GitHub Actions**  
<p align="left">
  <img src="https://img.shields.io/badge/GitHub%20Actions-Automated%20CI-blue?style=flat&logo=githubactions&logoColor=white" alt="GitHub Actions" width="220"/>
</p>
Triggers on code push to `frontend/` or `backend`, runs security scans, checks `version.txt`, and initiates Docker builds.

**Security Scanning**  
<p align="left">
  <img src="https://img.shields.io/badge/Trivy-FS%20Scan-critical?style=flat&logo=trivy&logoColor=white" alt="Trivy FS Scan" width="120" style="margin-right:10px;"/>
  <img src="https://img.shields.io/badge/CodeQL-Static%20Analysis-green?style=flat&logo=github&logoColor=white" alt="CodeQL Static Analysis" width="180"/>
</p>
Trivy scans for vulnerabilities, CodeQL performs static analysis to ensure code quality before build.

**Docker Build & Push**  
<p align="left">
  <img src="https://img.shields.io/badge/Docker-Versioned%20Images-blue?style=flat&logo=docker&logoColor=white" alt="Docker Build" width="200"/>
</p>
Builds container images only if `version.txt` changes. Tags semantically and pushes to registry.

**Jenkins Deployment**  
<p align="left">
  <img src="https://img.shields.io/badge/Jenkins-CD%20Pipeline-orange?style=flat&logo=jenkins&logoColor=white" alt="Jenkins Pipeline" width="180"/>
</p>
Pulls latest Docker image, updates Kubernetes manifests, and deploys to cluster via webhook.

**ArgoCD GitOps Sync**  
<p align="left">
  <img src="https://img.shields.io/badge/ArgoCD-GitOps%20Sync-red?style=flat&logo=argo&logoColor=white" alt="ArgoCD Sync" width="180"/>
</p>
Continuously syncs manifests from Git repo to Kubernetes. Maintains desired state and supports rollback.


## Monitoring & Observability

<p align="left">
  <img src="https://img.shields.io/badge/Grafana-Dashboard-yellow?style=flat&logo=grafana&logoColor=white" alt="Grafana Dashboard" width="160" style="margin-right:15px;"/>
  <img src="https://img.shields.io/badge/Prometheus-Metrics-orange?style=flat&logo=prometheus&logoColor=white" alt="Prometheus Metrics" width="160"/>
</p>
  
Tracks app health, resource usage, and performance metrics with real-time dashboards and alerts.



### ✅ Highlights
- Zero-touch deployment with GitOps principles  
- Modular architecture for scalability  
- Real-time observability with custom dashboards  
- Built for clarity, automation, and production-readiness

## 📁 Project Structure

```plaintext
notes-app/
├── 📦 backend/       → Node.js backend service (API, business logic, Dockerfile, version.txt)
├── 🎨 frontend/      → React frontend (UI, assets, Dockerfile, version.txt)
├── 🔄 gitops/        → GitOps automation configs (Jenkins jobs)
├── 📜 manifests/     → Kubernetes manifests (Deployments, Services, Ingress, etc.)
├── 🗂️ rsc/           → Resources (monitoring configs, Grafana dashboards, images, docs)
```



## ⚙️ CI/CD Workflow

<details> <summary><strong>🔹 GitHub Actions (CI)</strong></summary>

Triggered on push to `frontend/` or `backend/`.

**Steps:**

-   Run Trivy FS scan
-   Run CodeQL analysis
-   Check `version.txt`
-   Build & push Docker image (if version changed)

📸 
CI  PIPELINE: <img src="src/actions.png" width="600"/> </details>
CI  PIPELINE: <img src="src/github-build-artifacts.png" width="600"/> </details>
CI  PIPELINE: <img src="src/dockerbuild-info.png" width="600"/> </details>
	

<details> <summary><strong>🔸 Jenkins (CD)</strong></summary>

Triggered via  Github Actions Jenkins url  with secret token.

**Steps:**

-   Verify Docker image existence
-   Update Kubernetes manifests
-   Deploy to cluster

📸 Jenkins CD: <img src="src/jenkins.png" width="600"/> <img src="jnkins-ec2.png" width="600"/> </details>

<details> <summary><strong>🔹 ArgoCD (GitOps)</strong></summary>

**Steps:**

-   Auto-sync updated manifests from Git repo
-   Apply changes to Kubernetes
-   Maintain desired state

📸 ArgoCD Screenshots: <img src="src/argocd-application.png" width="600"/> <img src="argocd.png" width="600"/> </details>

----------

## 🧪 Application Screens

Feature

Screenshot

🔓 Login Page
<img src="src/login.png" width="400"/>

🏠 Home Screen

<img src="src/application-home.png" width="400"/>

👤 Profile View

<img src="src/appliactionprofile.png" width="400"/>

----------

## 📊 Monitoring

**Grafana Dashboard:** <img src="src/grafana.png" width="600"/>


## 💡 Tips

-   ✅ Enable ArgoCD Auto-Sync for zero-touch deployment
-   🧹 Use Server-Side Apply + Prune Last for safe updates
-   📈 Monitor app health via Grafana dashboards & Prometheus metrics

----------

<p align="center"> Made with ❤️ using GitOps principles, CI/CD automation, and cloud-native tools. </p>
