// cycle through local ip range and collect response from all shellies
// [http://ip/]GET/shelly





async function callHttpEndpoint() {
    const baseURL="http://192.168.81."
    for(let ip=20;ip<255;ip++){
      const url = baseURL+ip+"/shelly";
      console.log("checking url: ", url)
      try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); // Parse JSON response
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error calling the HTTP endpoint:", error.message);
    }}
  }
  
  callHttpEndpoint();