pipeline {
    agent any

    stages {
        stage('Build Frontend & Backend Images') {
            steps {
                echo 'Building Docker images...'
                sh 'docker build -t devstackproject-frontend:latest ./frontend'
                sh 'docker build -t devstackproject-backend:latest ./backend'
            }
        }
        
        stage('Pipeline Status') {
            steps {
                echo 'CI Pipeline completed successfully! Ready for K8s deployment.'
            }
        }
    }
}