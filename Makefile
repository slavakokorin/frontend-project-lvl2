install:
				npm ci

publish:
				npm publish --dry-run

lint:
				npx eslint .

test:
				node --experimental-vm-modules "node_modules/.bin/jest"