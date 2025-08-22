pipeline {
    agent any

    parameters {
        string(name: 'Frontend_Docker_TAG', defaultValue: 'latest', description: 'Tag for Frontend Docker Image')
        string(name: 'Backend_Docker_TAG', defaultValue: 'latest', description: 'Tag for Backend Docker Image')
    }

    stages {
        stage('Test Parameters') {
            steps {
                echo "Frontend Docker Tag: ${params.Frontend_Docker_TAG}"
                echo "Backend Docker Tag: ${params.Backend_Docker_TAG}"
            }
        }
    }
}
