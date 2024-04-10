# Include this if you want to use the variables defined in the .env file in the Makefile itself.
include .env.local
export

.PHONY: run
run:
	@echo "Loading environment variables..."
	@set -a; \
	source .env.local; \
	set +a; \
	echo "Starting application..."; \
	npm run start

.PHONY: ngrok

ngrok:
	@ngrok http http://localhost:3010
