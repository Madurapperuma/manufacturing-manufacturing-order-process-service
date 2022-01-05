## Guide to Refactor from previous template

### 1. prerequisites

#### 1.1 Framework (s)

##### 1.1.1 Node

```
Krish$: node --version
v14.16.0
```

##### 1.1.2 NPM

Having NPM version 7.x is very important as otherwise it will not install peer dependancies automatically.

```
Krish$: npm --version
7.20.1
```

if you do not have npm version 7 you can use bellow command to update

```
npm i -g npm@latest
```

##### 1.1.3 Nest

we have changed project Nest version to Nest 8 as it has added features including RxJS 7. make sure nest CLI is updates to version 8

```
Krish$: nest --version
8.0.2
```

if you do not have Nest 8 CLI you can use bellow command to update

```
npm install -g @nestjs/cli
```

##### 1.1.4 ESLint

we have included ESLint rules to govern naming convention and style. we use Airbnb and ESLint recommended style guides as baseline.

```
Krish$: eslint --version
v7.31.0
```

if you do not have ESLint installed you can install as bellow.

```
npm i eslint
```

##### 1.1.5 Postgres

you should have credential to a postgres database (preferably local)

##### 1.1.6 Redis

yous should have URL to a valid redis instance. if you do not have you can use redis docker

```
Krish$: docker pull redis

Krish$: docker run -p 6379:6379 --name redis -d redis
c7d96445028fe5c0060bb26ccb0c1f04735c7afd68060f2fd488ce3cc0ac03f7
```

it should run as bellow with port forwarding

```
Krish$: docker ps -a

CONTAINER ID  IMAGE COMMAND  CREATED STATUS  PORTS  NAMES
c7d96445028f  redis "docker-entrypoint.s…" 46 seconds ago  Up 45 seconds 0.0.0.0:6379->6379/tcp redis
```

#### 1.2 IDE and plugins

##### 1.2.1 IDE

you should have install [visual studio code](https://code.visualstudio.com/) (recommended) latest version.

##### 1.2.2 plugins

it is required to install bellow plugins

12.2.1 ESLint
https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

12.2.1 Prettier
https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

### 2. Preparation

Merge latest code into `main` branch.
if you see other teams commits on the repository make sure you are communicate to them and inform about refactoring.

#### 2.1 create directory structure

This command may not exactly same on windows. make sure substitute as need.

```
//create main directory
Krish$: mkdir refactor //create main directory

Krish$: cd refactor

//create 2 directories inside main directory
Krish$: mkdir copy1

Krish$: mkdir copy2

Krish$: ls -la

total 0

drwxr-xr-x  4 kdinesh  1992551670  128 Jul 30 03:51 .
drwxr-xr-x  3 kdinesh  1992551670 96 Jul 30 03:51 ..
drwxr-xr-x  2 kdinesh  1992551670 64 Jul 30 03:51 copy1
drwxr-xr-x  2 kdinesh  1992551670 64 Jul 30 03:51 copy2
```

now move in to `copy1` directory and clone your repository.

```
Krish$: cd copy1

Krish$: git clone https://github.com/brandix-ict/product-style-service.git

Cloning into 'product-style-service'...
remote: Enumerating objects: 115, done.
remote: Counting objects: 100% (115/115), done.
remote: Compressing objects: 100% (76/76), done.
remote: Total 115 (delta 28), reused 104 (delta 20), pack-reused 0
Receiving objects: 100% (115/115), 345.51 KiB | 498.00 KiB/s, done.
Resolving deltas: 100% (28/28), done.
```

make sure you are in correct branch

```
Krish$: cd product-style-service
Krish$: git branch
* main
```

go back to copy 2 directory and do the same

```
Krish$: cd ../../copy2

Krish$: git clone https://github.com/brandix-ict/product-style-service.git

Cloning into 'product-style-service'...
remote: Enumerating objects: 115, done.
remote: Counting objects: 100% (115/115), done.
remote: Compressing objects: 100% (76/76), done.
remote: Total 115 (delta 28), reused 104 (delta 20), pack-reused 0
Receiving objects: 100% (115/115), 345.51 KiB | 482.00 KiB/s, done.
Resolving deltas: 100% (28/28), done.
```

make sure you are in correct branch

```
Krish$: cd product-style-service
Krish$: git branch
* main
```

go back to `copy1` level and create new directory as `example`

```
Krish$: cd ../
Krish$: ls
copy1  copy2

Krish$: mkdir example
```

go inside that and clone `rapid-example-service`

```
Krish$: cd example
Krish$: git clone https://github.com/brandix-ict/rapid-example-service.git

Cloning into 'rapid-example-service'...
remote: Enumerating objects: 121, done.
remote: Counting objects: 100% (121/121), done.
remote: Compressing objects: 100% (79/79), done.
remote: Total 121 (delta 58), reused 98 (delta 38), pack-reused 0
Receiving objects: 100% (121/121), 329.83 KiB | 438.00 KiB/s, done.
Resolving deltas: 100% (58/58), done.
```

#### 2.2 move project

## WARNING

### Make sure you follow bellow step exactly in same order. make sure you follow the instructions about files start with `.` as operating system may treat those as hidden

#### move in to `copy2` directory. your files should look similar to this.

```
Krish$: cd ../copy2/product-style-service

Krish$: ls -la

total 16
drwxr-xr-x 6 kdinesh  1992551670  192 Jul 30 04:00 .
drwxr-xr-x 3 kdinesh  1992551670 96 Jul 30 04:00 ..
drwxr-xr-x  12 kdinesh  1992551670  384 Jul 30 04:00 .git
-rw-r--r-- 1 kdinesh  1992551670 38 Jul 30 04:00 README.md
drwxr-xr-x  15 kdinesh  1992551670  480 Jul 30 04:00 product-style-service
-rw-r--r-- 1 kdinesh  1992551670  230 Jul 30 04:00 product-style-service.yml
```

#### DELETE everything EXCEPT `.git` directory. (_recomended to use command line_)

```
Krish$: rm -rf product-style-service

Krish$: rm -f product-style-service.yml

Krish$: rm -f README.md
```

Now files should look like this

```
Krish$: ls -la

total 0

drwxr-xr-x 3 kdinesh  1992551670 96 Jul 30 04:11 .
drwxr-xr-x 3 kdinesh  1992551670 96 Jul 30 04:00 ..
drwxr-xr-x  12 kdinesh  1992551670  384 Jul 30 04:00 .git
```

#### Now navigate to `rapid-example-service` directory inside example directory

```
Krish$: cd ../../example/rapid-example-service
```

#### Now DELETE `.git` directory. (opposite of last step. - this time we remove it)

```
Krish$: ls -la

total 2208

drwxr-xr-x  16 kdinesh  1992551670  512 Jul 30 04:04 .
drwxr-xr-x 3 kdinesh  1992551670 96 Jul 30 04:04 ..

-rw-r--r-- 1 kdinesh  1992551670 3598 Jul 30 04:04 .eslintrc.json
drwxr-xr-x  12 kdinesh  1992551670  384 Jul 30 04:04 .git
-rw-r--r-- 1 kdinesh  1992551670  375 Jul 30 04:04 .gitignore
-rw-r--r-- 1 kdinesh  1992551670 51 Jul 30 04:04 .prettierrc
-rw-r--r-- 1 kdinesh  1992551670  737 Jul 30 04:04 Dockerfile
-rw-r--r-- 1 kdinesh  1992551670 3339 Jul 30 04:04 README.md
-rw-r--r-- 1 kdinesh  1992551670 64 Jul 30 04:04 nest-cli.json
-rw-r--r-- 1 kdinesh  1992551670  1087609 Jul 30 04:04 package-lock.json
-rw-r--r-- 1 kdinesh  1992551670 4025 Jul 30 04:04 package.json
drwxr-xr-x  10 kdinesh  1992551670  320 Jul 30 04:04 src
-rw-r--r-- 1 kdinesh  1992551670  276 Jul 30 04:04 stack.yml
drwxr-xr-x 4 kdinesh  1992551670  128 Jul 30 04:04 test
-rw-r--r-- 1 kdinesh  1992551670 97 Jul 30 04:04 tsconfig.build.json
-rw-r--r-- 1 kdinesh  1992551670  365 Jul 30 04:04 tsconfig.json
```

```
Krish$: rm -rf .git
```

Now if you check you should not be able to see `.git` directory

#### Now move everything to your service directory inside `copy2` directory. (recommend to use command line)

```
Krish$: mv * ../../copy2/product-style-service
```

above command will move everything except hidden / system files which are starting with `.`

```
Krish$: ls -la

total 24

drwxr-xr-x  5 kdinesh  1992551670 160 Jul 30 04:20 .
drwxr-xr-x  3 kdinesh  1992551670  96 Jul 30 04:04 ..
-rw-r--r--  1 kdinesh  1992551670  3598 Jul 30 04:04 .eslintrc.json
-rw-r--r--  1 kdinesh  1992551670 375 Jul 30 04:04 .gitignore
-rw-r--r--  1 kdinesh  1992551670  51 Jul 30 04:04 .prettierrc
```

#### move those files manually

```
Krish$: mv .eslintrc.json ../../copy2/product-style-service

Krish$: mv .gitignore ../../copy2/product-style-service

Krish$: mv .prettierrc ../../copy2/product-style-service
```

Now your current directory should be empty

```
Krish$: ls -la

total 0
drwxr-xr-x  2 kdinesh  1992551670  64 Jul 30 04:23 .
drwxr-xr-x  3 kdinesh  1992551670  96 Jul 30 04:04 ..
Krish$:
```

#### 2.3 move modules

Now move in to your service at `copy2`

```
cd ../../copy2/product-style-service
```

it should look like this

```
Krish$: ls -la

total 2208

drwxr-xr-x  16 kdinesh  1992551670  512 Jul 30 04:23 .
drwxr-xr-x 3 kdinesh  1992551670 96 Jul 30 04:00 ..
-rw-r--r-- 1 kdinesh  1992551670 3598 Jul 30 04:04 .eslintrc.json
drwxr-xr-x  12 kdinesh  1992551670  384 Jul 30 04:00 .git
-rw-r--r-- 1 kdinesh  1992551670  375 Jul 30 04:04 .gitignore
-rw-r--r-- 1 kdinesh  1992551670 51 Jul 30 04:04 .prettierrc
-rw-r--r-- 1 kdinesh  1992551670  737 Jul 30 04:04 Dockerfile
-rw-r--r-- 1 kdinesh  1992551670 3339 Jul 30 04:04 README.md
-rw-r--r-- 1 kdinesh  1992551670 64 Jul 30 04:04 nest-cli.json
-rw-r--r-- 1 kdinesh  1992551670  1087609 Jul 30 04:04 package-lock.json
-rw-r--r-- 1 kdinesh  1992551670 4025 Jul 30 04:04 package.json
drwxr-xr-x  10 kdinesh  1992551670  320 Jul 30 04:04 src
-rw-r--r-- 1 kdinesh  1992551670  276 Jul 30 04:04 stack.yml
drwxr-xr-x 4 kdinesh  1992551670  128 Jul 30 04:04 test
-rw-r--r-- 1 kdinesh  1992551670 97 Jul 30 04:04 tsconfig.build.json
-rw-r--r-- 1 kdinesh  1992551670  365 Jul 30 04:04 tsconfig.json
```

make sure remote is set properly

```
Krish$: git remote -v

origin  https://github.com/brandix-ict/product-style-service.git (fetch)

origin  https://github.com/brandix-ict/product-style-service.git (push)
```

make sure branch is set properly

```
Krish$: git branch
* main
```

now if you want you can commit your changed to main branch and move modules after that.

```
Krish$: git push origin main
```

Now open two visual studio code instances at service inside `copy1` and service inside `copy2`

`copy2` -> is Nest8 new template
`copy1` -> is Nest7 old template

Now install dependancies on Nest8 project

```
Krish$: npm i
```

create required modules

## Important...

1. module name should be M3 table name. (if module for M3 table)
2. service / resolver / controller name should be convenient name
3. follow the naming convention guideline shared before.
4. you have employee module inside this new project where you can follow as a guide.
5. copy entity / types/ services/ resolvers where it belongs to and make sure update paths as required
6. fix ESLint style issues

### Configuration service

it is required to have HTTP based configuration service running for inject the configuration. you can use bellow service for that. just clone and run on your local.
https://github.com/brandix-ict/configuration-mock-service

you can go to service class of that project and update configuration as you need.

if you follow everything exactly same now it should work.

## Example...

you can refer below service as guideline to migration
https://github.com/brandix-ict/sales-customer-order-service
