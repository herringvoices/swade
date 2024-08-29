let character = {
    name: "",
    rank: "",
    bennies: 3, // Assign a starting value or define elsewhere
    money: 0,  // Assign a starting value or define elsewhere
    wounds: 0,    // Number of current wounds
    fatigue: 0,    // Number of current fatigue levels
    attributes: {
        agility: { die: 4, bonus: 0 },
        smarts: { die: 4, bonus: 0 },
        spirit: { die: 4, bonus: 0 },
        strength: { die: 4, bonus: 0 },
        vigor: { die: 4, bonus: 0 }
    },
    skills: [
        { name: "Athletics", die: 4, bonus: 0, attribute: "strength" },
        { name: "Common Knowledge", die: 4, bonus: 0, attribute: "smarts" },
        { name: "Notice", die: 4, bonus: 0, attribute: "smarts" },
        { name: "Stealth", die: 4, bonus: 0, attribute: "agility" },
    ],
    derived: {
        pace: {
            running: 6,
            flying: 0,  // 0 means the character cannot fly
            swimming: 2,
            burrowing: 0 // 0 means the character cannot burrow
        },
        parry: 6,
        toughness: 7
    },
    edges: [
        //Example structure:
        // {
        //     name: "Brawler",
        //     rank: "Seasoned",
        //     description: "Your character gains +2 to damage when fighting unarmed.",
        //     running: 0,
        //     flying: 0,
        //     climb: 0,
        //     burrowing: 0,
        //     swimming: false,
        //     parry: 0,
        //     toughness: 0,
        //     attributes: 0,
        //     skills: 0,
        //     edges: 0,
        //     arcaneBackground: "none",
        //     linguist: false
        // }
    ],
    hindrances: [
        //Example structure:
        // {
        //     name: "Cautious",
        //     type: "Minor",
        //     description: "Your character tends to overthink decisions and be overly cautious.",
        //     running: 0,
        //     flying: 0,
        //     climb: 0,
        //     burrowing: 0,
        //     swimming: false,
        //     parry: 0,
        //     toughness: 0,
        //     attributes: 0,
        //     skills: 0,
        //     edges: 0
        // }
    ],
    weapons: [
        // Example structure:
        // {
        //     name: "Sword",
        //     damage: "Str+d6",
        //     ap: 0,
        //     range: null,   // If applicable
        //     rateOfFire: null,  // If applicable for ranged weapons
        //     parry: 0,
        //     notes: "Medium sword for melee combat.",
        //     running: 0,
        //     flying: 0,
        //     climb: 0,
        //     burrowing: 0,
        //     swimming: false,
        //     toughness: 0,
        //     attributes: 0,
        //     skills: 0,
        //     edges: 0
        // }
    ],
    items: [
        //Example structure:
        // {
        //     name: "Leather Armor",
        //     type: "Armor",
        //     armor: 1,
        //     notes: "Provides +1 to armor.",
        //     running: 0,
        //     flying: 0,
        //     climb: 0,
        //     burrowing: 0,
        //     swimming: false,
        //     parry: 0,
        //     toughness: 0,
        //     attributes: 0,
        //     skills: 0,
        //     edges: 0
        // }
    ],
    ancestry: {
        ancestry: {
            name: "Human",
            abilities: [
                { 
                    value: 2, 
                    name: "Adaptable", 
                    notes: "Humans gain a free edge at character creation.",
                    running: 0,
                    flying: 0,
                    climb: 0,
                    burrowing: 0,
                    swimming: false,
                    parry: 0,
                    toughness: 0,
                    attributes: 0,
                    skills: 0,
                    edges: 0,
                    superAbility: false,  // Indicates if the ancestry grants a super ability
                    sp: 0                 // Super power points (sp) granted by the ancestry
                }
            ]
        }
    },
    advances:
        {
            attributes: 0,
            skills: 0,
            edges: 0,
            hindrancesRemoved: 0
        },
    background: {
        description: "",
    },
    powers: [
// Example structure:
        // { 
        //     level: null, 
        //     name: "Bolt", 
        //     range: "12/24/48", 
        //     damage: "2d6", 
        //     duration: "instant", 
        //     ap: 0, 
        //     notes: "Standard energy bolt power", 
        //     cost: 1, 
        //     class: "Magic",
        //     running: 0,
        //     flying: 0,
        //     climb: 0,
        //     burrowing: 0,
        //     swimming: false,
        //     parry: 0,
        //     toughness: 0,
        //     attributes: 0,
        //     skills: 0,
        //     edges: 0
        // }
    ],
    points: {
        attribute: 5,
        skill: 12,
        edge: 1,
        powerNumber: 0,
        powerPoints: 0,
        ancestry: 0
    }
};

function updateEdgePoints() {
    document.getElementById('edge-points').textContent = character.points.edge;
}

// HIDDEN EDGES
document.addEventListener("DOMContentLoaded", function () {
    const edgesModal = document.getElementById('edges-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const edgesList = document.getElementById('edges-list');
    const closeModalButton = document.getElementById('close-modal');
    const addEdgeButton = document.getElementById("add-edges"); // Assuming the Add Edges button has the add-button class
    const edgesContainer = document.getElementById('edges'); // Use the div with id="edges"

    // Function to fetch edges from the JSON file
    function loadEdges() {
        fetch('edges.json')
            .then(response => response.json())
            .then(data => {
                const edges = data.edges;
                // Populate the list with edges from the JSON
                edges.forEach(edge => {
                    const li = document.createElement('li');
                    li.textContent = edge.name;
                    li.dataset.description = edge.description;
                    edgesList.appendChild(li);
                });
            })
            .catch(error => console.error('Error loading edges:', error));
    }

    // Load edges when the page loads
    loadEdges();

    // Show the modal when the Add Edges button is clicked
    addEdgeButton.addEventListener('click', function () {
        edgesModal.style.display = 'block';
        modalOverlay.style.display = 'block';
    });

    // Hide the modal when the overlay or close button is clicked
    closeModalButton.addEventListener('click', function () {
        edgesModal.style.display = 'none';
        modalOverlay.style.display = 'none';
    });

    modalOverlay.addEventListener('click', function () {
        edgesModal.style.display = 'none';
        modalOverlay.style.display = 'none';
    });

    // Add selected edge to the #edges container
    edgesList.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI' && character.points.edge > 0) {
            const edge = JSON.parse(e.target.dataset.edge);
            
            // Find the edge in the character.edges array and mark it as selected
            const edgeToSelect = character.edges.find(e => e.name === edge.name);
            if (edgeToSelect) {
                edgeToSelect.selected = true;
            }
    
            // Decrease edge points by 1
            character.points.edge -= 1;
            updateEdgePoints();
    
            updateCharacterSheetUI();  // Update the UI to reflect changes
    
            saveCharacterToFile();  // Save the character state after the change
        }
    });

    // Allow deletion of edges
    edgesContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-button')) {
            const edgeDiv = e.target.closest('.mini-blue');
            const edgeName = edgeDiv.querySelector('h4').textContent;
    
            // Find the edge in the character.edges array and mark it as not selected
            const edgeToDeselect = character.edges.find(e => e.name === edgeName);
            if (edgeToDeselect) {
                edgeToDeselect.selected = false;
            }
    
            // Increase edge points by 1
            character.points.edge += 1;
            updateEdgePoints();
    
            updateCharacterSheetUI();  // Update the UI to reflect changes
    
            saveCharacterToFile();  // Save the character state after the change
        }
    });
});



// DELETE LATER
function saveCharacterToFile() {
    const characterData = JSON.stringify(character, null, 2); // Convert character object to JSON string
    const blob = new Blob([characterData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'character.json'; // File name
    a.click();

    URL.revokeObjectURL(url); // Clean up the URL object
}


// Example button to trigger saving the file
const saveButton = document.getElementById('save-character');
saveButton.addEventListener('click', saveCharacterToFile);

function loadCharacterFromFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const loadedCharacter = JSON.parse(e.target.result);
            Object.assign(character, loadedCharacter);
            updateCharacterSheetUI();  // Update the UI to reflect the loaded character
        };
        reader.readAsText(file);
    }
}

// Example input element to trigger loading the file
const loadInput = document.getElementById('load-character');
loadInput.addEventListener('change', loadCharacterFromFile);

function updateCharacterSheetUI() {
    updateEdgePoints();  // Update edge points display

    // Clear and repopulate selected edges
    edgesContainer.innerHTML = ''; // Clear existing selected edges
    character.edges.forEach(edge => {
        if (edge.selected) {
            const edgeDiv = document.createElement('div');
            edgeDiv.className = 'mini-blue';

            edgeDiv.innerHTML = `
                <h4>${edge.name}</h4>
                <p>${edge.description}</p>
                <div style="text-align: center; margin: 3px;">
                    <button class="delete-button">X</button>
                </div>`;

            edgesContainer.appendChild(edgeDiv);
        }
    });

    // Clear and repopulate edges-list
    const edgesList = document.getElementById('edges-list');
    edgesList.innerHTML = ''; // Clear existing list
    character.edges.forEach(edge => {
        if (!edge.selected) {
            const li = document.createElement('li');
            li.textContent = edge.name;
            li.dataset.edge = JSON.stringify(edge); // Store the entire edge object as a JSON string
            edgesList.appendChild(li);
        }
    });
}
