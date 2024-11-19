# owl

## Development

No matter what we do, we have to firstly build the compiler application:

```console
$ npm run build
```

To validate the syntax rules, run the following command:

```console
$ npm run validate-syntax
```

There is a set of test source files in the `example` folder. To test the compiler, do:

```console
$ npm run app -- -o example.out example/main.owl
```
