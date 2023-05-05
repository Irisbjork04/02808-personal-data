# 02808-personal-data

This repository is the source code for a functional application developed for the course 02808 Personal Data Interaction for Mobile and Wearables at DTU.

# Devlopment RUN
## SetUP
### Run Backend CouchDB Database (Only For first time running follow this [doc](./LocalDB/Readme.md) )
1. Go to docker folder inside the project directory and open terminal
2. Run below command
```
docker compose up -d
```

## To run Using Expo Go
1. Open Terminal inside project root directory
2. Run below command
```
npx expo start
```
## Teardown
## When you want to Stop Database
1. Go to docker folder inside the project directory and open terminal
2. Run below command
```
docker compose down
```


# Creating Android Installer APK

## Reference
- https://docs.expo.dev/build/setup/
- https://docs.expo.dev/build-reference/apk/
- https://docs.expo.dev/build-reference/simulators/

### Configurarion needed for the first time:
1. Create an expo user -> https://expo.dev/signup
2. Install the latest EAS CLI  
 ```npm install -g eas-cli```
3. Login to expo account
 ```eas login```
4. Configure the project ```eas build:configure```

### Create a installable apk for android
 ```eas build -p android --profile preview```

 - Once your build is completed, copy the URL to the APK from the build details page or the link provided when eas build is done.
 - Send that URL to your device. Maybe by email? Up to you.
 - Open the URL on your device, install the APK and run it.

### Create a build for ios simulator
 ```eas build -p ios --profile preview```




