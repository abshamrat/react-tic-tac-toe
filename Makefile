NEST:=$(shell npm list -g | grep nest || npm install -g @nestjs/cli)

default:
	echo "Making environment and services up...."
	echo $(NEST)
	cd tic-tac-toe && npm install
	cd api-service && npm install
	docker-compose up

start:
	docker-compose up

build:
	echo "Building..."