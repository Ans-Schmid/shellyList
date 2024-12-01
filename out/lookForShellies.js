// cycle through local ip range and collect response from all shellies
// [http://ip/]GET/shelly
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//todo: write all results in an object and store it
let ResultPromise = [];
function callHttpEndpoint(url, request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url + request);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json(); // Parse JSON response
            let data2 = {};
            data2 = Object.assign({ url }, data);
            console.log("Response data " + url + request + ":", data2);
            return data2;
        }
        catch (error) {
            console.error("Error calling the HTTP endpoint: ", url, ": ", error.message);
        }
    });
}
function Call_IPs(base24IP, startIP, endIP, request) {
    return __awaiter(this, void 0, void 0, function* () {
        // e.g. baseIP=192.168.1.,  startIP=100 , endIP=200, /shelly
        // call http://{{IPs-in-range}}/request
        // and return an object with valid JSON results {IP:{result}}
        for (let ip = startIP; ip < endIP; ip++) {
            const url = "http://" + base24IP + ip;
            console.log("checking url: ", url);
            ResultPromise.push(callHttpEndpoint(url, request));
        }
        const Result = yield Promise.all(ResultPromise);
        console.log(".");
        // remove undefined entries from non answering IPs
        for (let i = 0; i < Result.length; i++) {
            if (typeof Result[i] === 'undefined') {
                Result.splice(i, 1);
                console.log(i);
                i--;
            }
        }
        console.log(Result);
        return {};
    });
}
Call_IPs("192.168.81.", 99, 250, "/shelly");
//# sourceMappingURL=lookForShellies.js.map