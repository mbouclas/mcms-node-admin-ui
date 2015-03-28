module.exports = (function(App){

    return {
        viewsDir : __dirname + '/views',
        //publicDir : App.baseDir + '/public/packages/mcms-admin',
        publicDir : __dirname + '/public',
        adminPackages : __dirname + '/admin-package.json'
    };
});