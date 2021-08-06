var CliModuleClass = require('./CliModuleClass');

var os = require('os');

let simpleCli = new CliModuleClass("simpleCli", [{
    Switch: "showOs",
    Message: "Returns the operating system name. For example, it returns 'Linux' on Linux, 'Darwin' on macOS, and 'Windows_NT' on Windows.",
    CallBack: function (Data) {
        console.log('Operating system:', os.type());
    }
},
{
    Switch: "showArch",
    Message: "Returns the operating system CPU architecture for which the Node.js binary was compiled. Possible values are 'arm', 'arm64', 'ia32', 'mips', 'mipsel', 'ppc', 'ppc64', 's390', 's390x', 'x32', and 'x64'.",
    CallBack: function (Data) {
        console.log('CPU architecture:', os.arch());
    }
},
{
    Switch: "-h",
    Message: "Help for simple-cli. Press F1 for more details.",
    CallBack: function (Data) {
        console.log(`- showOs: Returns the operating system name. For example, it returns 'Linux' on Linux, 'Darwin' on macOS, and 'Windows_NT' on Windows.
- showArch: Returns the operating system CPU architecture for which the Node.js binary was compiled. Possible values are 'arm', 'arm64', 'ia32', 'mips', 'mipsel', 'ppc', 'ppc64', 's390', 's390x', 'x32', and 'x64'.`);
    }
}])

simpleCli.checkParams();