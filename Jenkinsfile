pipeline {
    agent any
    environment {      
        backupScript = '/data/jenkins/script'       
        sship = '112.80.18.246'
        devip = '192.168.1.110'
        testip = '192.168.1.23'
        qaip = '192.168.1.24'
        uatip = '192.168.1.100'
        serverport = '9021'              //服务的端口号
        jenkinstemptransfer = '/data/app/jenkins-temp-transfer/gpyh-back-old-microfront'     //临时存放运输文件路径
        webhome = '/data/app/jenkins-deploy/ecommerce/gpyh-back-old-microfront'      //项目路径
        webpath = 'dist'  //配置文件路径
        webname = 'gpyh-back-old-microfront'   //项目名称
   }
   
    stages {
       stage('构建') {
            steps {                                
               sh '''case $type in
                      deploy)
                         echo "type: $type"  
                         source  /etc/profile 
                         nvm use 16                       
                         node -v
                         npm install
                         npm run build:$environment                                                                                       
                          ;;
                      rollback)
                         echo "type: $type"
                         echo "version: $version"
                         rm -rf dist
                         cp -R ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${version}/archive/dist .
                         pwd && ls
                         ;;
                       *)
                       exit  
                         ;;
                       esac'''                                                                                                                                                                                                 
            }
       }

        stage('备份') {      
            steps {
                 archiveArtifacts artifacts: 'dist/'          
            }
        }

         stage('发布') {      
            steps{
               script{
                 echo "$environment"
                 if ("${environment}" == "dev") {
                 sshPublisher publishers: [sshPublisherDesc(configName: "$sship", transfers: [sshTransfer(execCommand: "scp -r $jenkinstemptransfer/$webpath yunwei@$devip:$jenkinstemptransfer ; rm -rf $jenkinstemptransfer/$webpath ; ssh yunwei@$devip 'mkdir -p $webhome ; rm -rf $webhome/$webpath ; mv  $jenkinstemptransfer/$webpath $webhome/ ' ", execTimeout: 240000, patternSeparator: '[, ]+',remoteDirectory: "$webname", removePrefix: '', sourceFiles: 'dist/')],  verbose: true)]                                                 
                 }

                 else if ("${environment}" == "test"){
                 sshPublisher publishers: [sshPublisherDesc(configName: "$sship", transfers: [sshTransfer(execCommand: "scp -r $jenkinstemptransfer/$webpath yunwei@$testip:$jenkinstemptransfer ; rm -rf $jenkinstemptransfer/$webpath ; ssh yunwei@$testip 'mkdir -p $webhome ; rm -rf $webhome/$webpath ; mv  $jenkinstemptransfer/$webpath $webhome/ ' ", execTimeout: 240000, patternSeparator: '[, ]+',remoteDirectory: "$webname", removePrefix: '', sourceFiles: 'dist/')],  verbose: true)]                      
                 }       

                 else if ("${environment}" == "qa"){
                 sshPublisher publishers: [sshPublisherDesc(configName: "$sship", transfers: [sshTransfer(execCommand: "scp -r $jenkinstemptransfer/$webpath yunwei@$qaip:$jenkinstemptransfer ; rm -rf $jenkinstemptransfer/$webpath ; ssh yunwei@$qaip 'mkdir -p $webhome ; rm -rf $webhome/$webpath ; mv  $jenkinstemptransfer/$webpath $webhome/ ' ", execTimeout: 240000, patternSeparator: '[, ]+',remoteDirectory: "$webname", removePrefix: '', sourceFiles: 'dist/')],  verbose: true)]
                 }        

                 else if ("${environment}" == "uat"){
                 sshPublisher publishers: [sshPublisherDesc(configName: "$sship", transfers: [sshTransfer(execCommand: "scp -r $jenkinstemptransfer/$webpath yunwei@$uatip:$jenkinstemptransfer ; rm -rf $jenkinstemptransfer/$webpath ; ssh yunwei@$uatip 'mkdir -p $webhome ; rm -rf $webhome/$webpath ; mv  $jenkinstemptransfer/$webpath $webhome/ ' ", execTimeout: 240000, patternSeparator: '[, ]+',remoteDirectory: "$webname", removePrefix: '', sourceFiles: 'dist/')],  verbose: true)]
                 }     

                 else if ("${environment}" == "prod"){
                 sshPublisher publishers: [sshPublisherDesc(configName: "$server1", transfers: [sshTransfer(execCommand: "mkdir -p $webhome ; rm -rf $webhome/$webpath ; mv $jenkinstemptransfer/$webpath $webhome/ ", execTimeout: 240000, patternSeparator: '[, ]+',remoteDirectory: "$webname", removePrefix: '', sourceFiles: 'dist/')],  verbose: true)] 
                    for  (i=0; i<30; i++) {                               
                    prodport = sh (script: "ssh  yunwei@$server1 netstat  -tnlp | grep $serverport | awk -F : '{print \$4}'  ",returnStdout:true).trim()
                    prodport2 = sh (script: "ssh  yunwei@$server1 netstat  -tnlp | grep $serverport | awk -F ':'  '{print \$2}' | awk -F ' ' '{print \$1}'  ",returnStdout:true).trim()
                    echo "$prodport"
                    echo "$prodport2"                   
                    if ("${prodport2}" == "$serverport" || "${prodport}" == "$serverport" ) {
                    echo "检测到服务启动，执行下一步"                                           
                    sshPublisher publishers: [sshPublisherDesc(configName: "$server2", transfers: [sshTransfer(execCommand: "mkdir -p $webhome ; rm -rf $webhome/$webpath ; mv $jenkinstemptransfer/$webpath $webhome/ ", execTimeout: 240000, patternSeparator: '[, ]+',remoteDirectory: "$webname", removePrefix: '', sourceFiles: 'dist/')],  verbose: true)]                                         
                    break;
                    }
                    else {
                        echo "Jenkins检查服务启动状态，服务还未启动成功，请耐心等待......"
                    }             
                      sleep 10                                                                         
                    }
                    if ("${prodport}" != "$serverport" && "${prodport2}" != "$serverport"  ) {  
                        echo "服务启动失败，请联系对应服务负责人或运维排查问题"
                        exit 1
                    }                                        
                 }
                else {
                echo "取消"
                }                                          
               }             
          }     
        }        

    }
 post {             
        success {      
            script{ 
              if ("${environment}" == "prod"){    
                 emailext (
                 subject: '''jenkins - ${PROJECT_NAME} - Build # ${BUILD_NUMBER} - ${BUILD_STATUS}!''',
                 body: '''<!DOCTYPE html>    
<html>    
<head>    
<meta charset="UTF-8">    
<title>${ENV, var="JOB_NAME"}-第${BUILD_NUMBER}次构建日志</title>    
</head>     
<body leftmargin="8" marginwidth="0" topmargin="8" marginheight="4"    
    offset="0">    
    <table width="95%" cellpadding="0" cellspacing="0"  style="font-size: 11pt; font-family: Tahoma, Arial, Helvetica, sans-serif">    
        <tr>    
            本邮件由系统自动发出，无需回复！<br/>            
            各位同事，大家好，以下为${PROJECT_NAME }项目构建信息</br> 
            <td><font color="#CC0000">构建结果 - ${BUILD_STATUS}</font></td>   
        </tr>    
        <tr>    
            <td><br />    
            <b><font color="#0B610B">构建信息</font></b>    
            <hr size="2" width="100%" align="center" /></td>    
        </tr>    
        <tr>    
            <td>    
                <ul>    
                    <li>项目名称 ： ${PROJECT_NAME}</li>    
                    <li>构建编号 ： 第${BUILD_NUMBER}次构建</li>    
                    <li>触发原因： ${CAUSE}</li>    
                    <li>构建状态： ${BUILD_STATUS}</li>    
                    <li>构建日志： <a href="${BUILD_URL}console">${BUILD_URL}console</a></li>    
                    <li>构建  Url ： <a href="${BUILD_URL}">${BUILD_URL}</a></li>    
                </ul>    

            </td>    
        </tr>    
    </table>    
</body>    
</html>''',

                    to: "loujinhe@gpyh.com wujianong@gpyh.com yanyanyong@gpyh.com"              
            )
              }
            }
        }
        failure {
            script {
              if ("${environment}" == "prod"){
                emailext (
                subject: '''jenkins - ${PROJECT_NAME} - Build # ${BUILD_NUMBER} - ${BUILD_STATUS}!''',
                body: '''<!DOCTYPE html>    
<html>    
<head>    
<meta charset="UTF-8">    
<title>${ENV, var="JOB_NAME"}-第${BUILD_NUMBER}次构建日志</title>    
</head>    
    
<body leftmargin="8" marginwidth="0" topmargin="8" marginheight="4"    
    offset="0">    
    <table width="95%" cellpadding="0" cellspacing="0"  style="font-size: 11pt; font-family: Tahoma, Arial, Helvetica, sans-serif">    
        <tr>    
            本邮件由系统自动发出，无需回复！<br/>            
            各位同事，大家好，以下为${PROJECT_NAME }项目构建信息</br> 
            <td><font color="#CC0000">构建结果 - ${BUILD_STATUS}</font></td>   
        </tr>    
        <tr>    
            <td><br />    
            <b><font color="#0B610B">构建信息</font></b>    
            <hr size="2" width="100%" align="center" /></td>    
        </tr>    
        <tr>    
            <td>    
                <ul>    
                    <li>项目名称 ： ${PROJECT_NAME}</li>    
                    <li>构建编号 ： 第${BUILD_NUMBER}次构建</li>    
                    <li>触发原因： ${CAUSE}</li>    
                    <li>构建状态： ${BUILD_STATUS}</li>    
                    <li>构建日志： <a href="${BUILD_URL}console">${BUILD_URL}console</a></li>    
                    <li>构建  Url ： <a href="${BUILD_URL}">${BUILD_URL}</a></li>    
                </ul>    

            </td>    
        </tr>    
    </table>    
</body>    
</html>''',

                    to: "loujinhe@gpyh.com wujianong@gpyh.com yanyanyong@gpyh.com"
            )

             }  
            }
        }      
 }
 
  
       
 
}