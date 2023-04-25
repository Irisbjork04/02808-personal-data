// function to calculate the frequency of each string item in a given array
export const frequencyDistribution = (dataSet) => {
    var i=0, x, count, item;

    const processedData = dataSet.map((item) => item.trim().toLowerCase());

    while(i < processedData.length){
        count = 1;
        item = processedData[i];
        x = i+1;

        while(x < processedData.length && (x=processedData.indexOf(item,x))!=-1){
            count+=1;
            processedData.splice(x,1);
            dataSet.splice(x,1);
        }

        dataSet[i] = { "keyword": dataSet[i], "frequency": count};
        ++i;
    }

    return dataSet;
}

// stop words list from https://gist.github.com/sebleier/554280
const stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'];

export const remove_stopwords = (str) => {
    let res = []
    let words = str.split(' ').filter((item) => item.length > 0)

    for(let i=0;i<words.length;i++) {
       let word_clean = words[i].split(".").join("")
       if(!stopwords.includes(word_clean.toLowerCase().trim())) {
           res.push(word_clean)
       }
    }
    
    return(res)
}

// function to generate a random color
const randomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// function to generate a random color without a given color
export const randomColorWithout = (color) => {
    let newColor = randomColor();
    while(newColor === color) {
        newColor = randomColor();
    }
    return newColor;
}