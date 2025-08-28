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

        stage('upload to github') {
        steps {
            withCredentials([usernamePassword(credentialsId: 'GITHUB-TOKEN', gitToolName: 'Default')]) {
                sh '''
                    echo "cheacking git status"
                    git status
                    
                    echo "adding the files to the tree"
                    git add manifests/

                    echo "Commiting the changes"
                    git commit -m "Updated image versions in manifests" || echo "No changes to commit"
                    
                    echo "Pushing the changes to remote repository"
                    git push https://github.com/KARTIKNAIK18/GitOps-Workflow-using-ArgoCD-on-Kubernetes.git main
                '''
    
                }
            }
        }
    }
}