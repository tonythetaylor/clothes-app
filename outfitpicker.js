
let shoeData = [
    {
        'style': '57571',
        'colorway': 'White/Blue',
        'release': 1986,
        'brand' : 'jordan'
    },
    {
        'style': '9701',
        'colorway': 'White/Black-Red',
        'release': 1986,
        'brand' : 'jordan'
    },
    {
        'style': '130207 - 101',
        'colorway': 'White / Black - Red',
        'release': 1994,
        'brand' : 'jordan'
    },
    {
        'style': '132202 - 101',
        'colorway': 'Blue / Black - Red',
        'release': 2000,
        'brand' : 'jordan'
    }
]

let shirtData = [
    {
        'style': 'crew',
        'color': 'grey',
        'brand': 'H&M'
    },
    {
        'style': 'v-neck',
        'color': 'blue',
        'brand': 'Hanes'
    },
    {
        'style': 'cow',
        'color': 'white',
        'brand': 'Forever 21'
    }
]

let pantsData = [
    {
        'style': 'Slim',
        'color': 'grey',
        'brand': 'H&M'
    },
    {
        'style': 'Skinny',
        'color': 'blue',
        'brand': 'Hanes'
    },
    {
        'style': 'Hoochie',
        'color': 'white',
        'brand': 'Forever 21'
    }
]

const COLORS = ['white', 'blue', 'red', 'black', 'whitesmoke']

var stringToColour = function(str) {
    var hash = 0;
    if (str !== undefined) {
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(2);
    }}
    return colour;
  }

  const getComplementaryColor = (arr) => {
    let tempHold = []
    const compcolors = []
    arr.forEach((element,idx) => {
        tempHold.push(arr[idx].replace('#',''));
    });
   const colorPart = tempHold.slice(',');
   colorPart.forEach(element => {
    const ind = parseInt(element, 16);
    let iter = ((1 << 4 * arr.length) - 1 + ind).toString(16);
    while (iter.length < colorPart.length) {
        iter = '0' + iter;
    };
    return compcolors.push('#' + iter)
   });
   return compcolors
};

const hashString = (string) => string
  .split(/\s[/\s]+|[-]+/)
  .map((char) => char.charCodeAt(0))
  .reduce((a, b) => a + b, 0)

const stringToColor = (string) => COLORS[hashString(string) % COLORS.length];

class Shoe {
    constructor(shoeData) {
        this.style = shoeData.style;
        this.colorway = stringToColor(shoeData.colorway);
        this.release = shoeData.release;
        this.brand = shoeData.brand
    }
}

class Shirt {
    constructor(shirtData) {
        this.style = shirtData.style;
        this.color = stringToColor(shirtData.color);
        this.brand = shirtData.brand;
    }
}

class Pants {
    constructor(pantsData) {
        this.style = pantsData.style
        this.color = stringToColor(pantsData.color);
        this.brand = pantsData.brand;
    }
}

class ComplimentColors {
    constructor(colors) {
        this.colors = colors;
    }
}

function matchColors(shoe, shirt, pants) {
    let temp = []
    shoeColor = stringToColour(shoe.colorway)
    shirtColor = stringToColour(shirt.color)
    pantsColor = stringToColour(pants.color)

    temp.push(shoeColor, shirtColor, pantsColor)
    return getComplementaryColor(temp)
}

function getShoe(shoe) {
    const values = Object.values(shoe)
    const pickedShoe = values[Math.floor(Math.random() * values.length)]
    return pickedShoe
}

function getShirt(shirt) {
    const values = Object.values(shirt)
    const pickedShirt = values[Math.floor(Math.random() * values.length)]
    return pickedShirt
}

function getPants(pants) {
    const values = Object.values(pants)
    const pickedPants = values[Math.floor(Math.random() * values.length)]
    return pickedPants
}

function getOutfit(shoe, shirt, pants) {
    shoe = new Shoe(getShoe(shoe))
    shirt = new Shirt(getShirt(shirt))
    pants = new Pants(getPants(pants))
    compcolors = new ComplimentColors(matchColors(shoe, shirt, pants))
    matchColors(shoe, shirt, pants)
    console.log(shoe, shirt, pants, compcolors)
    return shoe, shirt, pants
}

getOutfit(shoeData, shirtData, pantsData)