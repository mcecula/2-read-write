

function saveData(jsonPath, outFolder, overwrite){
    const fs = require('fs');
    const path = require('path');
    let jPath = path.join(__dirname, jsonPath);

    fs.readFile(jPath, 'utf-8', (err, data) =>{
        if(err){
            console.log('Błąd odczytu pliku');
        }else{
            if(! fs.existsSync(outFolder)){
                fs.mkdir(outFolder, err =>{
                    if(err){
                        console.log(err);
                    }
    
                })
            }

            let userList = JSON.parse(data);
            let name=[];
            let line = '';
            let filename = '';
            userList.forEach( value=> {
                name =  (value.name).split(' ');
                line =  'Name: ' + name[0] + '\n';
                line  += 'Surname: ' + name[1]  + '\n';
                line += 'Street: ' + value.address.street + '\n';
                line += 'Zip Code: ' + value.address.zipcode + '\n';
                line += 'City: ' + value.address.city + '\n';
                line += 'Phone: ' + value.phone + '\n';
                filename =  path.join(outFolder,   value.id + '-' + name[0] + '-' + name[1] + '.txt' );
                if(fs.existsSync(filename) && overwrite){
                    fs.rmSync(filename);
                }

                if(!fs.existsSync(filename) || overwrite){
                    fs.writeFile(filename, line, err => { if(err) {console.log(err)} });
                }              
            })
        }
        
    } )



}

module.exports = {
    saveData: saveData
}