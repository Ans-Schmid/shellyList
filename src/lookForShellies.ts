// cycle through local ip range and collect response from all shellies
// [http://ip/]GET/shelly


//todo: write all results in an object and store it
let ResultPromise:object[]=[];

async function callHttpEndpoint(url:string, request:string ) {
    try {
      const response = await fetch(url+request);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); // Parse JSON response
      let data2 = {};
      data2 = {url,...data};
      console.log("Response data "+url+request+":", data2);
      return data2;
    } catch (error) {
      console.error("Error calling the HTTP endpoint: ",url,": ", error.message);
    }
  }
  
async function Call_IPs(base24IP:string, startIP:number, endIP:number, request:string) {
  // e.g. baseIP=192.168.1.,  startIP=100 , endIP=200, /shelly
  // call http://{{IPs-in-range}}/request
  // and return an object with valid JSON results {IP:{result}}
  for(let ip=startIP;ip<endIP;ip++){
    const url = "http://"+base24IP+ip;
    console.log("checking url: ", url)
    ResultPromise.push(callHttpEndpoint(url,request));
  }
  const Result = await Promise.all(ResultPromise);
  
  console.log(".");
// remove undefined entries from non answering IPs
  for (let i=0; i<Result.length; i++) {
    
    if (typeof Result[i] === 'undefined') {
      Result.splice(i,1);
      console.log(i);
      i--;
    }

  }
  console.log(Result);
  return {};
}


Call_IPs("192.168.81.",99,250,"/shelly");