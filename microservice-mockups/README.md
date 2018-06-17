# FDSB Microservices

## Start Backend Servers

```bash
json-server -p 2000 backend/secrets.json &
json-server -p 3000 backend/config.json &
json-server -p 4000 backend/identity.json &
json-server -p 5000 backend/messages.json &
json-server -p 7000 backend/documents.json &
```

## Start Frontend Servers

```bash
# Setup
sudo npm i -g create-react-app
# Create 0815 app
create-react-app identity
cd identity
npm i -s semantic-ui-css semantic-ui-react react-router-dom
npm i -S eslint-plugin-react
# Add eslint config
{
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module"
  },
  "parser": "babel-eslint",
  "rules": {
    "no-const-assign": "warn",
    "no-this-before-super": "warn",
    "no-undef": "warn",
    "no-unreachable": "warn",
    "no-unused-vars": "warn",
    "constructor-super": "warn",
    "valid-typeof": "warn",
    "no-console": "off",
    "react/prop-types": "off"
  },
  "globals": {
    "React": true
  },
  "plugins": ["react"],
  "extends": ["eslint:recommended", "plugin:react/recommended"]
}
npm start
# Go back
cd ..
```
