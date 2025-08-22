pipline{
    agent any
    
    parameters{
        string(name: 'Frontned_Docker_TAG', defaultValue: '', description: 'Enter the tag for Frontend Docker Image')
        string(name: 'Backend_Docker_TAG', defaultvalue: '', description: 'Enter the tag for Frontend Docker Image')
    }

    steps{
        step("Clean Workspace"){
            script{
                echo "cleaning workspace"
                cleanWs()
                }
            }
        }

}