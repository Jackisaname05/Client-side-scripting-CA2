document.addEventListener('DOMContentLoaded', async function () {
    const categories = [//here is where i read in the data from the dnd api using 6 categories
        { id: 'classes', url: 'https://api.open5e.com/classes/', imageMap: classImages },//each category uses a different link in the API to get relevant data
        { id: 'races', url: 'https://api.open5e.com/races/', imageMap: raceImages },//they also include an imageMap which is used to add an image to the cards
        { id: 'conditions', url: 'https://api.open5e.com/conditions/', imageMap: conditionImages },
        { id: 'spells', url: 'https://api.open5e.com/spells/' },//since imageMap isnt in either the categories spells or feats they won't have images
        { id: 'feats', url: 'https://api.open5e.com/feats/' },
        { id: 'backgrounds', url: 'https://api.open5e.com/backgrounds/', imageMap: backgroundImages }
    ];

    for (const category of categories) {
        try {
            const response = await fetch(category.url);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            const container = document.querySelector(`#${category.id} .card-container`);
            data.results.slice(0, 8).forEach(item => { // I made it so that it renders the first 8 items in each category
                const hasImage = !!category.imageMap; //assign each item to the category imageMap
                const card = createCard(item, category.imageMap, hasImage);//creates a card for each item in each category
                container.appendChild(card);
            });
        } catch (error) {
            console.error(`Error fetching ${category.id}:`, error);//added an error message for if the site is unable to fetch data from the api
        }
    }
});

function createCard(item, imageMap, hasImage = true) {
    const card = document.createElement('div');//creates a div for each card
    card.classList.add('card');

    if (hasImage && imageMap) {
        const image = document.createElement('img');//adds an image to the card only if ImageMap is present in the category
        image.src = imageMap[item.name] || 'https://via.placeholder.com/300x200?text=No+Image';//I implemented a placeholder image for if i can't get an image for a card
        card.appendChild(image);
    }

    const title = document.createElement('h2');//creates a h2 element to display the title of the card
    title.textContent = item.name || item.title || 'No name.';//I also implemented a placeholder for the title of the card 
    card.appendChild(title);

    const description = document.createElement('p');//creates a paragraph to add the description in the card
    description.textContent = item.desc || item.short_desc || 'No description available.';//
    card.appendChild(description);

    return card;
}

// Here is the image maps for relevant images, again since the spells and feats categories don't have imageMap they dont have images
const classImages = {
    'Barbarian': 'https://www.dndbeyond.com/avatars/thumbnails/43940/614/420/618/638607453019977939.png',//each card has an image assigned to it using a link
    'Bard': 'https://www.dndbeyond.com/avatars/thumbnails/43940/759/420/618/638607457242601819.png',
    'Cleric': 'https://www.dndbeyond.com/avatars/thumbnails/43940/779/420/618/638607457550642172.png',
    'Druid': 'https://www.dndbeyond.com/avatars/thumbnails/43940/797/420/618/638607457905913506.png',
    'Fighter': 'https://www.dndbeyond.com/avatars/thumbnails/43940/812/420/618/638607458265993956.png',
    'Monk': 'https://www.dndbeyond.com/avatars/thumbnails/43940/743/420/618/638607456914661514.png',
    'Paladin': 'https://www.dndbeyond.com/avatars/thumbnails/43940/831/420/618/638607458603093196.png',
    'Ranger': 'https://www.dndbeyond.com/avatars/thumbnails/43940/840/420/618/638607458991513657.png'
};

const raceImages = {
    'Alseid': 'https://media-waterdeep.cursecdn.com/avatars/thumbnails/10836/223/1000/1000/637266331499216356.jpeg',
    'Catfolk': 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2020/07/pathfinder-catfolk-2e.jpg',
    'Darakhul': 'https://koboldpress.com/wp-content/uploads/2018/08/darakhul.jpg',
    'Derro': 'https://static.wikia.nocookie.net/forgottenrealms/images/d/dd/Derro_4e.jpg/revision/latest?cb=20210725120746',
    'Dragonborn': 'https://www.dndbeyond.com/attachments/9/41/chromatic-dragonborn.jpg',
    'Drow': 'https://blizzardwatch.com/wp-content/uploads/2021/12/DrowYay.png?ezimgfmt=ng%3Awebp%2Fngcb1%2Frs%3Adevice%2Frscb1-2',
    'Dwarf': 'https://www.dndbeyond.com/avatars/thumbnails/43940/449/420/618/638607448977617455.png',
    'Elf': 'https://www.dndbeyond.com/avatars/thumbnails/43940/467/420/618/638607449394457692.png'
};

const conditionImages = {
    'Blinded': 'https://bg3.wiki/w/images/thumb/1/1e/Blindness.webp/300px-Blindness.webp.png',
    'Charmed': 'https://bg3.wiki/w/images/thumb/1/11/Charm_Person.webp/300px-Charm_Person.webp.png',
    'Deafened': 'https://bg3.wiki/w/images/thumb/7/78/Silence_Icon.webp/144px-Silence_Icon.webp.png',
    'Exhaustion': 'https://bg3.wiki/w/images/thumb/c/c4/Sleep.webp/300px-Sleep.webp.png',
    'Frightened': 'https://bg3.wiki/w/images/thumb/1/1d/Fear.webp/300px-Fear.webp.png',
    'Grappled': 'https://bg3.wiki/w/images/thumb/6/6d/Generic_Control.webp/300px-Generic_Control.webp.png',
    'Incapacitated': 'https://bg3.wiki/w/images/thumb/d/d9/Toggle_Non-Lethal_Attacks.webp/300px-Toggle_Non-Lethal_Attacks.webp.png',
    'Invisible': 'https://bg3.wiki/w/images/thumb/f/f5/Greater_Invisibility.webp/300px-Greater_Invisibility.webp.png'
};

const backgroundImages = {
    'Acolyte': 'https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/background_acolyte_icon.png',
    'Artisan': 'https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/background_guild_artisan_icon.png',
    'Charlatan': 'https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/background_charlatan_icon.png',
    'Con Artist': 'https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/background_urchin_icon.png',
    'Court Servant': 'https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/background_entertainer_icon.png',
    'Crime Syndicate Member': 'https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/background_hauntedone_icon.png',
    'Criminal': 'https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/background_criminal_icon.png',
    'Desert Runner': 'https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/background_outlander_icon.png',
};
