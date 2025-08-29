<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg#gh-dark-mode-only" width="50" alt="GitHub"/>
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

---

## 🔹 CI/CD & GitOps Flow

### **GitHub Actions**  
<p align="left">
  <img src="https://img.shields.io/badge/GitHub%20Actions-Automated%20CI-blue?style=flat&logo=githubactions&logoColor=white" alt="GitHub Actions" width="220"/>
</p>

- Triggers on code push to `frontend/` or `backend`  
- Runs security scans  
- Checks `version.txt`  
- Initiates Docker builds  

---

### **Security Scanning**  
<p align="left">
  <img src="https://img.shields.io/badge/Trivy-FS%20Scan-critical?style=flat&logo=trivy&logoColor=white" alt="Trivy FS Scan" width="120" style="margin-right:10px;"/>
  <img src="https://img.shields.io/badge/CodeQL-Static%20Analysis-green?style=flat&logo=github&logoColor=white" alt="CodeQL Static Analysis" width="180"/>
</p>

- **Trivy** scans for vulnerabilities  
- **CodeQL** performs static analysis  

---

### **Docker Build & Push**  
<p align="left">
  <img src="https://img.shields.io/badge/Docker-Versioned%20Images-blue?style=flat&logo=docker&logoColor=white" alt="Docker Build" width="200"/>
</p>

- Builds container images only if `version.txt` changes  
- Semantic tagging  
- Pushes to registry  

---

### **Jenkins Deployment**  
<p align="left">
  <img src="https://img.shields.io/badge/Jenkins-CD%20Pipeline-orange?style=flat&logo=jenkins&logoColor=white" alt="Jenkins Pipeline" width="180"/>
</p>

- Pulls latest Docker image  
- Updates Kubernetes manifests  
- Deploys to cluster via webhook  

---

### **ArgoCD GitOps Sync**  
<p align="left">
  <img src="https://img.shields.io/badge/ArgoCD-GitOps%20Sync-red?style=flat&logo=argo&logoColor=white" alt="ArgoCD Sync" width="180"/>
</p>

- Continuously syncs manifests from Git repo  
- Maintains desired state  
- Supports rollback  

---

## ✅ Highlights

- 🚀 Zero-touch deployment with GitOps principles  
- 🧩 Modular architecture for scalability  
- 🔐 Security-first CI (Trivy, CodeQL)  
- 📊 Real-time observability with Grafana dashboards  
- 🔄 Production-ready pipeline with rollback support  

---

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


### 🔹 GitHub Actions (CI)

**Triggered on push to `frontend/` or `backend/`**

- Run Trivy FS scan  
- Run CodeQL analysis  
- Check `version.txt`  
- Build & push Docker image (if version changed)  

📸 **Screenshots:**  
📸 **Screenshots:**  

**GitHub Actions Workflow**  
<img src="rsc/actions1.png" />  

**Build Artifacts**  
<img src="rsc/artifacts.png" />  

**Docker Build Info**  
<img src="rsc/dockerbuild.png" />  
 

### 🔸 Jenkins (CD)

**Triggered via GitHub Actions webhook (with secret token)**  

- Verify Docker image existence  
- Update Kubernetes manifests  
- Deploy to cluster  

📸 **Jenkins CD:** 
<img src="rsc/jenkins1.png"/>  

###  🔹 ArgoCD (GitOps)

- Auto-sync updated manifests from Git repo  
- Apply changes to Kubernetes  
- Maintain desired state  

📸 **ArgoCD Screenshots:**  
**ArgoCD Application View**  
<img src="rsc/argocd1.png" />  

**ArgoCD Dashboard**  
<img src="rsc/argocd2.png" />  



---

##  Application Output

🔓 **Login Page**  
<img src="rsc/login.png" />  

🏠 **Home Screen**  
<img src="rsc/application-home.png" />  

👤 **Profile View**  
<img src="rsc/appliactionprofile.png" />  

---

##  Monitoring

📸 **Grafana Dashboard:**  
<img src="rsc/grafana.png" />  

---

## 💡 Tips

- ✅ Enable ArgoCD Auto-Sync for zero-touch deployment  
- 🧹 Use Server-Side Apply + Prune Last for safe updates  
- 📈 Monitor app health via Grafana dashboards & Prometheus metrics  

---

<p align="center"> Made with ❤️ using GitOps principles, CI/CD automation, and cloud-native tools. </p>
