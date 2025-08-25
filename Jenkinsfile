pipeline {
    agent any

    parameters {
        string(name: 'Frontend_Docker_TAG', defaultValue: 'latest', description: 'Tag for Frontend Docker Image')
        string(name: 'Backend_Docker_TAG', defaultValue: 'latest', description: 'Tag for Backend Docker Image')
    }

    stages {
        stage('Validate parmeters) {
            steps{
                if (param.Frontend_Docker_TAG == '' && param.Backend_Docker_TAG == '')
                    error('pararmeters cannot be empty')
            }
        }
        stage('Checkout') {
            steps{
                git checkout: branch: 'main', url 'https://github.com/KARTIKNAIK18/GitOps-Workflow-using-ArgoCD-on-Kubernetes.git'
                sh  'ls -l'
            }
        }
        stage('Docker Build') {
            steps {
                
                echo "Backend Docker Tag: ${params.Backend_Docker_TAG}"
                sh    'docker build -t ${DOCKERHUB_USERNAME}/notes-app-frontend:$params.Frontend_Docker_TAG -f ./frontend/Dockerfile .'
                sh    'docker build -t ${DOCKERHUB_USERNAME}/notes-app-backend:$params.Frontend_Docker_TAG -f ./backend/Dockerfile .'
            }
        }
    }
}
