pipeline {
    agent none

    stages{
        stage('Hello') {
            agent {
                label 'DEV'
            }
            steps {
                sh '''
                    touch file.txt
                    mkdir -p target
                    touch target/file2.jar
                    touch target/file3.war
                    tree
                '''
                stash(name: 'myStash', includes: '**/*.war')
            }
        }
        stage('check the file') {
            agent {
                label 'PROD'
            }
            steps{
                unstash 'myStash'
                sh 'tree'
            }
        }
    }
}