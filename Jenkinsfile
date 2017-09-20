node('linux') {
	
	currentBuild.result = "SUCCESS"
	def nodeHome = tool 'node 6.9.1'
	
	try {

		// *************************** CHECKOUT ******************
	  
		stage('Checkout') {
			checkout([$class: 'GitSCM', branches: [[name: '*/develop']], 
			doGenerateSubmoduleConfigurations: false, extensions: [], 
			submoduleCfg: [], 
			userRemoteConfigs: [[credentialsId: 'JENKINS_CREDENTIAL_ID_HERE', 
				url: 'GIT_URL_HERE']]
			])
		}

		// *************************** INSTALL DEPENDENCIES ******************
		
		stage('FE::Install Dependencies'){
			sh 'npm install'
		}

		// *************************** FRONT END :: UNIT TESTS ****************************
	  
    stage('FE::Unit Tests'){
			sh 'npm run test:tap'
			step([$class: "TapPublisher", testResults: "*.tap"])		
		}

		// *************************** FRONT END :: UNIT TEST COVERAGE ********************
		
		stage('FE::Unit Test Coverage'){
			sh 'npm run coverage'
			publishHTML([
				allowMissing: false, 
				alwaysLinkToLastBuild: false, 
				keepAll: false, 
				reportDir: 'coverage/lcov-report', 
				reportFiles: 'index.html', 
				reportName: 'Front End Unit Test Coverage Report'
			])		
		}

		// *************************** FRONT END :: BUILD ********************
		
		stage('FE::Build'){
			sh 'npm run build'
		}

		// *************************** DOCUMENTATION :: BUILD ********************
		
		stage('DOCUMENTATION::Build'){
			sh 'npm run doc:build'
		}

		// *************************** EMAIL NOTIFICATION ********************
		emailext(
			body: '<p>Decoupling ${JOB_NAME} build <a href="${BUILD_URL}">${BUILD_NUMBER}</a> has finished.</p>',
			mimeType: 'text/html',
			replyTo: 'DEV_EMAIL_HERE',
			subject: 'APP_NAME ${JOB_NAME} Build ${BUILD_NUMBER} SUCCEEDED',
			to: 'DEV_EMAIL_HERE'
		)
	}
	
	catch (err) {
		currentBuild.result = "FAILURE"

		emailext(
			body: '<p>APP_NAME ${JOB_NAME} build <a href="${BUILD_URL}">${BUILD_NUMBER}</a> has finished.</p>',
			mimeType: 'text/html',
			replyTo: 'DEV_EMAIL_HERE',
			subject: 'APP_NAME ${JOB_NAME} Build ${BUILD_NUMBER} FAILED',
			to: 'DEV_EMAIL_HERE'
		)

		throw err
	} 
	
	finally {	
	    archive '_book/**,dist/**'
	}

}
