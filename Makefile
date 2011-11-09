NODE = node
TEST = vows
TESTS ?= test/*-test.js test/**/*-test.js

test:
	@NODE_ENV=test NODE_PATH=lib $(TEST) $(TEST_FLAGS) $(TESTS)

docs: docs/api.html

docs/api.html: lib/connect-lrdd/*.js
	dox \
		--title connect-lrdd \
		--desc "Link-based Resource Descriptor Document (LRDD) middleware for Connect" \
		$(shell find lib/connect-lrdd/* -type f) > $@

docclean:
	rm -f docs/*.{1,html}

.PHONY: test docs docclean
