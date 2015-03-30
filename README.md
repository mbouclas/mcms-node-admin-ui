# mcms-node-admin-ui

A UI for the mcms-node-admin component

# Install

```
npm install mcms-node-admin-ui
```

Then change the admin.json to have "mcms-node-admin-ui" under the theme property. The config should be published via the
"publish command" like so :

```
node commander publish mcms-node-admin
```

This theme is written in nunjucks so make sure that your default express template engine is nunjucks. Upon installation
the theme will run a "bower install" command so make sure that bower is available.