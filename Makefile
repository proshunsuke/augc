NODE_MODULUES_BIN_DIR :=  ./node_modules/.bin

webpack/build:
	$(NODE_MODULUES_BIN_DIR)/webpack

cpasp/login:
	$(NODE_MODULUES_BIN_DIR)/clasp login

cpasp/push: webpack/build
	$(NODE_MODULUES_BIN_DIR)/clasp push -f

cpasp/open:
	$(NODE_MODULUES_BIN_DIR)/clasp open
