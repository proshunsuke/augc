NODE_MODULUES_BIN_DIR :=  ./node_modules/.bin

webpack/build:
	$(NODE_MODULUES_BIN_DIR)/webpack

clasp/login:
	$(NODE_MODULUES_BIN_DIR)/clasp login

clasp/push: webpack/build
	$(NODE_MODULUES_BIN_DIR)/clasp push -f

clasp/run:
	$(NODE_MODULUES_BIN_DIR)/clasp run

clasp/open:
	$(NODE_MODULUES_BIN_DIR)/clasp open

clasp/logs:
	$(NODE_MODULUES_BIN_DIR)/clasp logs
