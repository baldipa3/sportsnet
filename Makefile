# Author: Pablo Baldini
# Date Created: 07 May 2025
# Last Modified: 04 Jun 2025
# Description:
# Set of commands to setup and build sportsnet application

ARGS=$(filter-out $@,$(MAKECMDGOALS))

npm:
	@echo "Installing Node.js dependencies inside Docker..." && \
	docker exec frontend npm $(ARGS) && \
	echo "Installing Node.js dependencies locally..." && \
	npm $(ARGS)

up:
	@echo "Starting frontend container..." && \
	docker start frontend

restart:
	@echo "Restarting frontend container..." && \
	docker restart frontend

down:
	@echo "Stopping frontend container..." && \
	docker stop frontend

test:
	@echo "Running tests inside Docker..." && \
	docker exec frontend npx vitest
	
update-schema:
	@echo "Generating GraphQL schema..." && \
	docker exec backend mix absinthe.schema.sdl --schema SportsnetApiWeb.Schema 2>/dev/null && \
	docker cp backend:/app/schema.graphql ./src/schema.graphql && \
	docker exec backend rm /app/schema.graphql && \
	echo "Schema copied to src/schema.graphql"

relay-compile:
	docker exec frontend npx relay-compiler
