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
function callHttpEndpoint() {
    return __awaiter(this, void 0, void 0, function* () {
        const baseURL = "http://192.168.81.";
        for (let ip = 20; ip < 255; ip++) {
            const url = baseURL + ip + "/shelly";
            console.log("checking url: ", url);
            try {
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = yield response.json(); // Parse JSON response
                console.log("Response data:", data);
            }
            catch (error) {
                console.error("Error calling the HTTP endpoint:", error.message);
            }
        }
    });
}
callHttpEndpoint();
//# sourceMappingURL=lookForShellies.js.map