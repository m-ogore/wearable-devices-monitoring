# Wearable Devices Monitoring

## Context

This monitoring app is developed in the context of a project to prototype a wearable device that collects different geo-localised information such as vital signs (temperature, heart rate, Spo2, ...), cough sound classification, social distances and so on. The purpose of this device is to support healthcare public authorities to control the spreading of human-to-human contagious respiratory diseases.

The main functionalities of this monitoring app are the following: 
- Register users (wearers)
- Manage wearable devices (Create and assign to wearers)
- Visualise collected data

## Development technologies 

This wearable devices monitoring application is developed using the NextJS framework. The following lists the underlying web development languages and tools used to build this application:
- React for building UI frontend components 
- TailwindCSS for styling, 
- nextAuth for managing the authentication
- API routes feature to create REST API interface
- Prisma ORM to abstract away the underlying datastore
- MongoDB as datastore

## Deployment

To easy the deployment, this application will be packaged as a docker-based microservices with 2 containers:
- MongoDB server container
- Fullstack NextJS app container
