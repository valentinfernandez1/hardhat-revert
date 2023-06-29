# Hardhat Revert
This project is used for testing purposes. It is configured to be used with a frontier node running on port 9944.

## How to use
Start a frontier-template-node by compiling it from the parity/frontier repo.
```bash
#On the frontier cloned repo
cargo build --release
./target/release/frontier-template-node --dev 
```
Then install the dependencies for this project
```bash
npm install
```
And execute the tests for the frontier network
```bash
./node_modules/.bin/hardhat test --network dev
```