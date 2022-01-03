# NineChronicles Tx Monitoring Tool

This application monitors two nodes (source node, target node) to find out whether the transaction made by the **source** node is staged in the **target** node.


### Usage

1. Modify `src/prestart/env/development.env`'s GraphQL endpoints section.
2. Run following command:
```
$ yarn start:dev
```
3. Open http://localhost:3000


### Build and start

1. Modify `src/prestart/env/production.env`'s GraphQL endpoints section.
2. Run following commands:
```
$ yarn build
$ yarn start
```
3. Open http://localhost:8081
