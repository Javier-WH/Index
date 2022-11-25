
function getSubjectName(seccion){

    let year;

    for (let i = 0 ; i < seccion.length -1 ; i++){
        
        if(seccion[i] === "1" || seccion[i] === "2" || seccion[i] === "3" || seccion[i] === "4" || seccion[i] === "5" || seccion[i] === "6" || seccion[i] === "7" || seccion[i] === "8" || seccion[i] === "9"){
            year = i
            break;
        }
    }

    return seccion.substring(0, year-1);

}


function getSchoolYear(seccion){

    let year;

    for (let i = 0 ; i < seccion.length -1 ; i++){
        
        if(seccion[i] === "1" || seccion[i] === "2" || seccion[i] === "3" || seccion[i] === "4" || seccion[i] === "5" || seccion[i] === "6" || seccion[i] === "7" || seccion[i] === "8" || seccion[i] === "9"){
            year = i
            break;
        }
    }
    return seccion[year];

}


function getSeccionName(seccion){

    let year;

    for (let i = 0 ; i < seccion.length -1 ; i++){
        
        if(seccion[i] === "1" || seccion[i] === "2" || seccion[i] === "3" || seccion[i] === "4" || seccion[i] === "5" || seccion[i] === "6" || seccion[i] === "7" || seccion[i] === "8" || seccion[i] === "9"){
            year = i
            break;
        }
    }

    return seccion.substring(year+1, seccion.length);

}

module.exports ={
    getSubjectName,
    getSchoolYear,
    getSeccionName
}