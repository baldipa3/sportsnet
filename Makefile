# Author: Pablo Baldini
# Date Created: 07 May 2025
# Last Modified: 07 May 2025
# Description:
# Set of commands to setup and build sportsnet application

ARGS=$(filter-out $@,$(MAKECMDGOALS))

npm:
	@echo "Installing Node.js dependencies inside Docker..." && \
	docker exec frontend npm $(ARGS) && \
	echo "Installing Node.js dependencies locally..." && \
	npm $(ARGS)
