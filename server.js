const request = require('request');

const url = "https://test.dazn.com";
const requestPromises = [];

function getResponse(url) {
    return new Promise((resolve, reject) => {
        request(url, (err, response, body) => {
            if (err) {
                return reject(err);
            }

            return resolve(body);
        });
    });
}

const pauseForThought = ms => new Promise(res => setTimeout(res, ms))
  
async function compareStrings(string1, string2) 
{
    await pauseForThought(100)    
    return string1 === string2 ? true : false;
}

async function areTheSame(downloadResults) 
{
    const resultpromises = [];
    
    for (var i = 0; i < downloadResults.length; i++) 
    {
        resultpromises.push(compareStrings(downloadResults[0], downloadResults[i]));
    }

    const results = await Promise.all(resultpromises).catch(error => console.log('Something went wrong when compairing:', error));

    if (results)
    {
        let allsame = true;

        for (var j = 0; j < results.length; j++) 
        {
            if (!results[j])
            {
                allsame = false;
                break;
            }
        }     

        console.log('Are they all the same?:', allsame ? "Yes" : "No");
    }
}

for(let i = 0; i < 100; i++)
{
    requestPromises[i] = getResponse(url);
}

Promise.all(requestPromises)
.then(downloadResults => { areTheSame(downloadResults); })
.catch(error => console.log('Something went wrong when downloading:', error));