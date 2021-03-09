setup:
	$(MAKE) yarn/install

install:
	yarn install

build: install
	yarn webpack

watch:
	ENV=local yarn webpack watch

server:
	yarn run functions-framework --target=getKeyakiSchedule --source=./gcpFunctions/getKeyakiSchedule

run/setSchedule:
	node -e 'require("./dist/index.js");global.setSchedule();'

clasp/login:
	yarn clasp login

clasp/push: build
	yarn clasp push -f

clasp/run:
	yarn clasp run execute

clasp/open:
	yarn clasp open

clasp/logs:
	yarn clasp logs

test:
	ENV=production yarn jest

test/ci:
	$(MAKE) build
	ENV=production yarn jest --coverage
