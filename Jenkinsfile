pipeline {
  agent any
  options { timestamps(); disableConcurrentBuilds() }
  stages {
    stage('Install') { steps { sh 'npm ci' } }
    stage('Typecheck') { steps { sh 'npm run typecheck' } }
    stage('Test') { steps { sh 'npm test' } }
    stage('Build') { steps { sh 'npm run build' } }
    stage('Compose') { steps { sh 'docker compose config --quiet' } }
  }
}
