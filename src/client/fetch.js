export default async function validateUser({ user, pass, type }) {

    if (user === undefined || user.length === 0) {
        return  {error:"No ha suministrado un nombre de usuario"};
    }
    if (pass === undefined || pass.length === 0) {
        return {error:"No ha suministrado ninguna contraseña"};
    }

    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
         user,
         pass,
         type
       });
       /*
      let response = await fetch("/login", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.json();
      */
       return {code: 1};
}