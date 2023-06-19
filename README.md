### Hexlet tests, Node CI, maintainability, test coverage:

[![Actions Status](https://github.com/canekg/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/canekg/frontend-project-46/actions)

[![Node CI](https://github.com/canekg/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/canekg/frontend-project-46/actions/workflows/nodejs.yml)

<a href="https://codeclimate.com/github/canekg/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/a76706bc4afe944ef2f9/maintainability" /></a>

<a href="https://codeclimate.com/github/canekg/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/a76706bc4afe944ef2f9/test_coverage" /></a>

## Difference Calculator
I present to you a diff calculator that compares two configuration files and shows you the difference. The calculator works with such file formats as: ".json", ".yml", ".yaml". The result of comparing two files can be obtained in the following formats: "stylish", "plain" and "json".

Below are the steps to install games, follow the instructions:

1. Install Node.js globally at least v19.8.1

2. Install package

### Package install command:

```bash
$ npm install @hexlet/code
```

### Display help for command

```bash
$ gendiff -h
```

### Start Difference Calculator

```bash
$ gendiff [options] <filepath1> <filepath2>
```

**Demo of the Difference Calculator (example input formats: .json, .yml)**
[![asciicast](https://asciinema.org/a/ohdvDnTNfjRcDkLNfISek6omN.svg)](https://asciinema.org/a/ohdvDnTNfjRcDkLNfISek6omN)

**Demo of the Difference Calculator (example output formats: 'stylish', 'plain', 'json')**
[![asciicast](https://asciinema.org/a/VAPYmfCVu1WdsI6y4sFcwXnl5.svg)](https://asciinema.org/a/VAPYmfCVu1WdsI6y4sFcwXnl5)
