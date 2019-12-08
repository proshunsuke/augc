NODE_MODULUES_BIN_DIR :=  ./node_modules/.bin

setup:
	yarn install

webpack/build:
	$(NODE_MODULUES_BIN_DIR)/webpack

clasp/login:
	$(NODE_MODULUES_BIN_DIR)/clasp login

clasp/push: webpack/build
	$(NODE_MODULUES_BIN_DIR)/clasp push -f

clasp/run:
	$(NODE_MODULUES_BIN_DIR)/clasp run execute

clasp/open:
	$(NODE_MODULUES_BIN_DIR)/clasp open

clasp/logs:
	$(NODE_MODULUES_BIN_DIR)/clasp logs

test:
	$(NODE_MODULUES_BIN_DIR)/jest
	$(MAKE) webpack/build
