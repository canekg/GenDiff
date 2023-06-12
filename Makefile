install:
	npm ci

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test:
	npm test

lint:
	npx eslint .

fix:
		npx eslint . --fix