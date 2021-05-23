const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
module.exports = {
    paths: function(paths, env) {
        paths.appSrc              = resolveApp('.');
        paths.appBuild            = resolveApp('build/core');
        paths.appIndexJs          = resolveApp('pages/index.tsx');
        paths.appTypeDeclarations = resolveApp('pages/react-app-env.d.ts');
        return paths;
    }
}
