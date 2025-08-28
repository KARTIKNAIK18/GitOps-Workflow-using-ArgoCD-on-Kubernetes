pipeline{
    agent any
    environment{
        DOCKER_USER = credentials('DOCKER_USER')
        GITHUB_USER = credentials('Github-user')
        GITHUB_EMAIL = credentials('github-email')
    }
    stages{
        stage('Cheackout'){
            steps{
                git branch: 'main', url: 'https://github.com/KARTIKNAIK18/GitOps-Workflow-using-ArgoCD-on-Kubernetes.git' 
            }
        }
        stage('Read Files'){
            steps{
                script{
                    FRONTEND_VERSION = readFile ('frontend/version.txt').trim()
                    BACKEND_VERSION = readFile ('backend/version.txt').trim()

                    FRONTENDIMAGE = "${env.DOCKER_USER}/note-app-frontend:${FRONTEND_VERSION}"
                    BACKENDIMAGE = "${env.DOCKER_USER}/note-app-backend:${BACKEND_VERSION}"
                }
            }
        }
        stage('Update Manifests'){
            steps{
                sh '''
                    sed -i "s|image: .*|image: ${FRONTENDIMAGE}|g" manifests/frontend.yml
                    sed -i "s|image: .*|image: ${BACKENDIMAGE}|g" manifests/backend.yml
                '''
                sh 'cat manifests/frontend.yml'
                sh 'cat manifests/backend.yml'
            }

        }    

        stage('Upload to GitHub') {
            steps {
                withCredentials([string(credentialsId: 'GITHUB-TOKEN', variable: 'GITHUB_TOKEN')]) {
                    sh '''
                        git config --global user.email "${GITHUB_EMAIL}"
                        git config --global user.name "${GITHUB_USER}"
                        
                        echo "Checking git status"
                        git status
                        
                        echo "Adding the manifests files"
                        git add manifests/
                        
                        echo "Committing the changes"
                        git diff --quiet && git diff --staged --quiet || git commit -m "Updated image versions in manifests [skip ci]"
                        
                        echo "Pushing to GitHub"
                        git remote set-url origin https://${GITHUB_TOKEN}@github.com/KARTIKNAIK18/GitOps-Workflow-using-ArgoCD-on-Kubernetes.git
                        git push origin main
                    '''
                }
            }
        }
    }
}