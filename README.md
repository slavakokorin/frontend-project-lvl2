Hi! В этом репозитории реализован учебный проект - программа, которая находит различия между двумя конфигурационными файлами. Поддерживаются форматы JSON и YAML. Вывод полученых данных возможен в трёх вариантах: плоский список, дерево, структурированный формат JSON. Используется commander - удобное решение для node.js интерфейсов. Разработка ведётся через создание тестов в фреймворке Jest.

##

### INSTALL

```sh
$ make install
```

##

### SELECT OUTPUT FORMAT

--format <type>

1. --rormat stylish - output differences as tree
2. --format plain   - output differences as list
3. --format json    - output as JSON

##

### Hexlet tests and linter status:

[![Actions Status](https://github.com/slavakokorin/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/slavakokorin/frontend-project-lvl2/actions)
[![Linter status](https://github.com/slavakokorin/frontend-project-lvl2/actions/workflows/Linter.yml/badge.svg)](https://github.com/slavakokorin/frontend-project-lvl2/actions/workflows/Linter.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/8fb60f90f2fddb0efe0a/maintainability)](https://codeclimate.com/github/slavakokorin/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8fb60f90f2fddb0efe0a/test_coverage)](https://codeclimate.com/github/slavakokorin/frontend-project-lvl2/test_coverage)

##

## Demonstration

### Example comparing flat json and yaml files

[![asciicast](https://asciinema.org/a/HorizHmHBN4AGtNdGQ14UBIKS.svg)](https://asciinema.org/a/HorizHmHBN4AGtNdGQ14UBIKS)

### Example comparing not flat json files

[![asciicast](https://asciinema.org/a/5LZ4okvj13PQqJGopkol0OlB7.svg)](https://asciinema.org/a/5LZ4okvj13PQqJGopkol0OlB7)

### Example selection of diff-formatters

[![asciicast](https://asciinema.org/a/1kyKxUhCEIMhz3ClrMeqLDck0.svg)](https://asciinema.org/a/1kyKxUhCEIMhz3ClrMeqLDck0)

### Example JSON output

[![asciicast](https://asciinema.org/a/Q3YXT8QDa61TqzcyJGImIdVQr.svg)](https://asciinema.org/a/Q3YXT8QDa61TqzcyJGImIdVQr)
