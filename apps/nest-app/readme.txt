# Project setup monorepo
--
## Install @nestjs/cli
    npm install -g @nestjs/cli
## Create project with nest/cli
    nest new [project_name]
## Start project
    npm run start 
## Generate common share libs for micro service
    nest g library [module_name]
## Generate share module database and config
    nest g module database -p common
    nest g module config -p common
## Install packages for connect to database
    npm install @nestjs/config pg typeorm