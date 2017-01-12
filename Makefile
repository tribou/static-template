# General project vars
SHELL := /bin/bash
NODE_ENV ?= production
PWD ?= .
PROJECT_NAME ?= $(shell node -p -e "require('./package.json').name")
VERSION ?= $(shell git tag --points-at HEAD)
COMMIT ?= $(shell git rev-parse --short HEAD)
NOW = $(shell date -u +"%Y-%m-%dT%H:%M:%SZ")

# Google Cloud vars
GC_PROJECT ?= project-name
GC_COMPUTE_ZONE ?= us-central1-b
GC_TIMEOUT ?= 10
GC_REPO ?= https://source.developers.google.com/p/$(GC_PROJECT)/r/services
GC_REPO_BRANCH ?= master
GC_REGISTRY = "us.gcr.io/$(GC_PROJECT)"

# Google Cloud commands
GC_FUNC_CMD = gcloud alpha functions
GC_PUBSUB_CMD = gcloud alpha pubsub


# Check if commands exist in PATH
.PHONY: check-git
check-git:
	@which git > /dev/null || (echo; echo 'Install git first'; echo; exit 1)


.PHONY: check-flow-typed
check-flow-typed:
	@which flow-typed > /dev/null || (echo; echo 'Install flow-typed first'; echo; exit 1)


.PHONY: check-npm
check-npm:
	@which npm > /dev/null || (echo; echo 'Install npm first'; echo; exit 1)


.PHONY: check-yarn
check-yarn:
	@which yarn > /dev/null || (echo; echo 'Install yarn first'; echo; exit 1)


# Update minor and patch versions for yarn dependencies
.PHONY: update-deps
update-deps: check-yarn check-npm
	rm -rf node_modules
	rm -rf .npm-packages-offline-cache
	rm yarn.lock
	yarn cache clean
	npm run yarn


# Build and export tarball
.PHONY: export
export: check-git
	@mkdir dist 2&> /dev/null || true
	@git archive --format=zip --output ./dist/$(PROJECT_NAME)-$(VERSION)-$(COMMIT).zip HEAD:build/public
