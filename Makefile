setup:
	$(MAKE) yarn/install

install:
	yarn install

build: install
	ENV=production yarn webpack

watch:
	ENV=local yarn webpack watch

server:
	yarn run functions-framework --target=getKeyakiSchedule --source=./gcpFunctions/getKeyakiSchedule

run/setSchedule:
	node -e 'require("./dist/index.js");global.setSchedule();'

login:
	yarn clasp login

push: build
	yarn clasp push -f

run:
	yarn clasp run execute

open:
	yarn clasp open

logs:
	yarn clasp logs

test:
	ENV=production yarn jest

test/ci:
	$(MAKE) build
	ENV=production yarn jest --coverage

lint:
	yarn eslint "src/**/*.ts"

fix:
	$(MAKE) fix/prettier
	$(MAKE) fix/eslint

fix/eslint:
	yarn eslint "src/**/*.ts" --fix

fix/prettier:
	yarn prettier --check --write "src/**/*.ts"
