pipeline {
    agent any
    
    stages {
        stage('Deploy to Kubernetes') {
            steps {
                echo 'Applying Kubernetes Manifests...'
                sh 'kubectl apply -f k8s/'
                
                echo 'Restarting Pods to fetch latest changes...'
                sh 'kubectl rollout restart deployment backend-deployment'
                sh 'kubectl rollout restart deployment frontend-deployment'
            }
        }
    }
}