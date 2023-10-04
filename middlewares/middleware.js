const axios = require('axios')
const _ = require("lodash")
const fs = require('fs');

async function callapi() {
    try {
        const res = await axios.get(process.env.URL, {
            headers: {
                'x-hasura-admin-secret': process.env.HEADER
            }
        })
        if (res) return (res.data.blogs)
        else return 0;
    }
    catch (error) {
        console.log(error);
    }
}

 

function searchQuery(query, array) {

    const indxOfsubStr = _.flatMap(_.map(array, _.toLower), (str, index) => {
        const substrings = _.split(str, query);
        return substrings.length > 1 ? _.times(substrings.length - 1, (i) => index + i) : [];
    });
    return indxOfsubStr;
}




const fetchData = _.memoize(callapi)
const search = _.memoize(searchQuery)





exports.status = async (req, res) => {
    try {
        const data = await fetchData();
        if (!data) {
            res.status(500).send({ massage: "data providing server is not working.... wait for a while" })
        }
        else {
            const title = _.map(data, "title")
            const unique_titles = _.uniq(title);
            const substr = "privacy"
            const foundStrings = _.map(search(substr, title), (item => {
                return (data[item])
            }));
            const index_longest_title = (array) => {
                let aux_max = [0, 0];
                for (let i = 0; i < array.length; i++) {
                    if (aux_max[0] < array[i].length) {
                        aux_max[0] = array[i].length
                        aux_max[1] = i
                    }
                }
                return aux_max[1];
            }
            const details = {
                total_blogs: data.length,
                longest_title: data[index_longest_title(title)].title,
                noBlogWithTitle_Privacy: foundStrings.length ? foundStrings : `Not Found '${substr}' in Titles`,
                unique_titles,
            }
            res.status(201).send(details)
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
exports.search = async (req, res) => {

    try {
        const query = req.query.query
        if (!query) {
            res.status(400).send({ msg: "query is not present" })
        }
        else {
          
            fs.readFile('time.json', 'utf8', async (err, time) => {
                if (err) {
                  console.error('Error reading file:', err);
                  return ;
                }
              const  preTime = Number(time);
              
        
            
            const now = new Date()
            if((now.getTime()-preTime)>1000*60){
              fetchData.cache.clear();
              search.cache.clear();
                fs.writeFile("time.json", JSON.stringify(now.getTime()), (err) => {
                    if (err) console.error(err);
                    else console.log('Time Has Updated');
                })
            }
            const data =  await fetchData();
            //require("../myArrayFile.json")

            if (!data) {
                res.status(500).send({ massage: "data providing server is not working.... wait for a while" })
            }
            else {
                const title = _.map(data, "title")

                const foundStrings = _.map(search(_.toLower(query), title), (item => {
                    return (data[item])
                }));
                if (foundStrings.length) res.send(foundStrings).status(201)
                else { res.status(400).send({ massage: `${query} is not founds in titles` }) }
            }
        })
    }
    
    }
    catch (error) {
        res.status(500).send(error)
    }
}
