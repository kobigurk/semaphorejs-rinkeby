# semaphorejs-rinkeby

A prebuilt package for experimenting with [semaphorejs](https://github.com/kobigurk/semaphorejs).

To install:

`curl -o- https://raw.githubusercontent.com/kobigurk/semaphorejs-rinkeby/install.sh | bash`

To generate an identity:
`npx semaphorejs-client generate_identity`

To broadcast a signal (after an admin added your identity to semaphore):
`npx semaphorejs-client signal "Hello!"`
