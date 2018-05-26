# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

For Developing the Doctor Mobile Application

### How do I get set up? ###

Steps to run the project.

1) Cloning the project
	
	git clone https://{YOUR BITBUCKET USERNAME}@bitbucket.org/Digiklug_Admin/doctor_mobile_app.git
	
	eg:

	git clone https://omgitsrish@bitbucket.org/Digiklug_Admin/doctor_mobile_app.git

2) Installing dependancies

	npm install

3) Opening Emulator via cmd(If you do not have an emulator setup follow the steps here and get an emulator ready : https://facebook.github.io/react-native/docs/getting-started.html)

	3.1) First check the list of avds you have using

		C:\Users\{YOUR PC NAME}\AppData\Local\Android\sdk\tools\emulator -list-avds

		eg:

		C:\Users\dell\AppData\Local\Android\sdk\tools\emulator -list-avds

	3.2) If avd is present use this command to start the emulator

		C:\Users\{ YOUR PC NAME }\AppData\Local\Android\sdk\tools\emulator -avd {AVD NAME} -netdelay none -netspeed full 

		eg:

		C:\Users\dell\AppData\Local\Android\sdk\tools\emulator -avd Pixel_API_23 -netdelay none -netspeed full

4) Run the project(Goto the doctor_mobile_app repository and run the following command)

	react-native run-android


### Optional commands ###

1) If you recieve a debugger problem while run, execute this command

	adb reverse tcp:8081 tcp:8081

2) If you get an error like, "Cannot delete/clean {some file name}" error do this whilst being in the repo
	
	cd android
	gradlew clean

