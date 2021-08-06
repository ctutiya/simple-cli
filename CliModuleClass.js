'use strict';

class CliModule {
    // static generateARandomID(min, max) {
    //     let newID = Math.floor(Math.random() * (max - min) + min);
    //     if (this.ids[newID] != undefined) {
    //         this.ids.push(this.generateARandomID(newID++, (newID + max)));
    //     }
    //     else {
    //         this.ids.push(newID);
    //         return newID;
    //     }
    // }

    // static ids = [];

    startupTime = undefined;   
    // ApplicationID = generateARandomID(0, 1000);

    NodeExecutable = undefined;
    ModuleName = undefined;

    suppliedParameters = [];

    supportedParameters = [{
        Switch: "-v",
        Message: "simple-cli - version 1.0",
        CallBack: function (Data) { console.log(this.Message) }
    }]

    constructor(ApplicationName, NodeExecutable, ModuleName) {
        this.startupTime = Date.now();

        this.ApplicationName = ApplicationName;
        this.NodeExecutable = NodeExecutable;
        this.ModuleName = ModuleName;

        if (process.argv.length > 2) {
            // for (let i = 2; i < process.argv.length; i++) {
            //     this.suppliedParameters.push(process.argv[i]);
            // }

            process.argv.forEach((value, index) => {
                if (index > 1) this.suppliedParameters.push(value);
            });
        }
    }

    checkParams() {
        for (let i = 0; i < this.suppliedParameters.length; i++) {
            for (let j = 0; j < this.supportedParameters.length; j++) {
                if (this.suppliedParameters[i] === this.supportedParameters[j].Switch) {
                    this.supportedParameters[j].CallBack(this);
                }
            }
        }
    }
}

class CliModuleClass extends CliModule {
    constructor(NameOfMyApplication, supportedParams) {
        super(NameOfMyApplication, process.argv[0], process.argv[1])

        // for (let i = 0; i < supportedParams.length; i++) {
        //     this.supportedParameters.push(supportedParams[i])
        // }

        supportedParams.forEach((value) => {
            this.supportedParameters.push(value);
        });
    }
}

module.exports = CliModuleClass