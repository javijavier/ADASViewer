  
export default  fetch("../../../example/data.json")
    .then((response) =>  response.json()).then((jsonResponse) =>{
        
        return jsonResponse;

    });


