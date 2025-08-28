pipeline{
    agent any
    environment{
            DOCKER_USER = 'kartiknaik'
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
        stage('Git Push') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                        sh '''
                            # Configure git
                            git config user.email "kartiknaik560@gmail.com"
                            git config user.name "KARTIKNAIK18"
                            
                            # Check status and add changes
                            echo "Checking git status"
                            git status
                            
                            echo "Adding changes"
                            git add manifests/
                            
                            # Commit changes if any
                            git diff --staged --quiet || git commit -m "Updated manifests [skip ci]"
                            
                            # Set remote with token and push
                            git remote set-url origin https://${GITHUB_TOKEN}@github.com/KARTIKNAIK18/GitOps-Workflow-using-ArgoCD-on-Kubernetes.git
                            git push origin main
                        '''
                    }
                }
            }
        }

}
}