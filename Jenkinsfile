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
          stage("Git: Code update and push to GitHub"){
            steps{
                script{
                    withCredentials([gitUsernamePassword(credentialsId: 'Github-cred', gitToolName: 'Default')]) {
                        sh '''
                        echo "Checking repository status: "
                        git status
                    
                        echo "Adding changes to git: "
                        git add manifests/
                        
                        echo "Commiting changes: "
                        git commit -m "Updated environment variables"
                        
                        echo "Pushing changes to github: "
                        git push https://github.com/KARTIKNAIK18/GitOps-Workflow-using-ArgoCD-on-Kubernetes.git main
                    '''
                    }
                }
            }
    }
}
}