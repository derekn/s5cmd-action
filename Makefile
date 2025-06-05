.PHONY: build lint

build:
	@npm run build

lint:
	@prettier --check action.yml index.js lib
