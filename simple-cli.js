// Create a Node JS Application that accepts command line parameters thus that a user can check their:

// - Computer Architecture
// - Computer CPU's
// - Computer RAM (total and available)
// - Computer Disk Space (total and available)
// - Computer Hostname
// - Computer IP Address

const CliModuleClass = require('./CliModuleClass');

const os = require('os');
const byteSize = require('byte-size');

let simpleCli = new CliModuleClass("simpleCli", [{
    Switch: "-arch",
    Message: "Returns the operating system CPU architecture for which the Node.js binary was compiled. Possible values are 'arm', 'arm64', 'ia32', 'mips', 'mipsel', 'ppc', 'ppc64', 's390', 's390x', 'x32', and 'x64'.",
    CallBack: function (Data) {
        console.log('CPU architecture:', os.arch());
    }
},
{
    Switch: "-cpu",
    Message: "Returns an array of objects containing information about each logical CPU core.",
    CallBack: function (Data) {
        const cpu = os.cpus();

        cpu.map(value => {
            console.log(`CPU: ${value.model}. Speed: ${value.speed}`)
        })
    }
},
{
    Switch: "-ram",
    Message: "Returns the free and total amount of system memory in bytes as an integer.",
    CallBack: function (Data) {
        console.log(`RAM: ${byteSize(os.freemem())} / ${byteSize(os.totalmem())}`);
    }
},
{
    Switch: "-hdd",
    Message: "Returns the free and total amount of disk space.",
    CallBack: function (Data) {
        const checkDiskSpace = require('check-disk-space').default;

        checkDiskSpace(__dirname).then((diskSpace) => {
            console.log(`Disk space: ${byteSize(diskSpace.free)} / ${byteSize(diskSpace.size)}`);

            // {
            //     diskPath: 'C:',
            //     free: 99999999,
            //     size: 99999999
            // }
            // Note: `free` and `size` are in bytes
        });
    }
},
{
    Switch: "-hostname",
    Message: "Returns the host name of the operating system as a string.",
    CallBack: function (Data) {
        console.log('Host name:', os.hostname());
    }
},
{
    Switch: "-ip",
    Message: "Returns the assigned IPv4 address.",
    CallBack: function (Data) {
        const networks = os.networkInterfaces();

        for (network in networks) {
            networks[network].map(value => {
                if (!value.internal && value.family === 'IPv4') console.log('IP address:', value.address)
            })
        }
    }
},
{
    Switch: "-h",
    Message: "Help for simple-cli. Press F1 for more details.",
    CallBack: function (Data) {
        console.log(`-arch: Returns the operating system CPU architecture for which the Node.js binary was compiled. Possible values are 'arm', 'arm64', 'ia32', 'mips', 'mipsel', 'ppc', 'ppc64', 's390', 's390x', 'x32', and 'x64'.
-cpu: Returns an array of objects containing information about each logical CPU core.
-ram: Returns the free and total amount of system memory in bytes as an integer.
-hostname: Returns the host name of the operating system as a string.
-ip: Returns the assigned IPv4 address.`);
    }
}])

simpleCli.checkParams();