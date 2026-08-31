pipeline {
    agent any
    
    stages {
        stage('Build & Test') {
            steps {
                echo 'Code fetched from GitHub successfully!'
                echo 'Running tests...'
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                echo 'Simulating Kubernetes Deployment...'
                echo 'Note: Since Jenkins is in a Docker container without K8s access, manual restart is required locally.'
            }
        }
    }
}