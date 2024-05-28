const app = Vue.createApp({
    data() {
        return {
            message: '',
            userInput: '',
            attempts: 0,
            cluesRevealed: 0,
            wrongAnswers: [],
            inputVisible: true,
            isCorrect: false,
            isFailed: false,
            datasets: [
                {"answer": "Cards", "words": ["Deck", "Shuffle", "Poker", "Hand", "Deal"]},
                {"answer": "Computer", "words": ["Binary", "Chip", "Algorithm", "Software", "Hardware"]},
                {"answer": "Piano", "words": ["Ivory", "Chord", "Concert", "Grand", "Accompaniment"]},
                {"answer": "Mountain", "words": ["Elevation", "Ascent", "Terrain", "Summit", "Expedition"]},
                {"answer": "Library", "words": ["Archives", "Volumes", "Catalog", "Librarian", "Reference"]},
                {"answer": "Ocean", "words": ["Marine", "Depths", "Waves", "Blue", "Saltwater"]},
                {"answer": "Desert", "words": ["Arid", "Dunes", "Oasis", "Sandstorm", "Mirage"]},
                {"answer": "Astronaut", "words": ["Space", "Orbit", "NASA", "Helmet", "Rocket"]},
                {"answer": "Volcano", "words": ["Lava", "Eruption", "Crater", "Magma", "Ash"]},
                {"answer": "Jungle", "words": ["Rainforest", "Wildlife", "Canopy", "Tropical", "Dense"]},
                {"answer": "Painting", "words": ["Canvas", "Brush", "Palette", "Gallery", "Frame"]},
                {"answer": "Opera", "words": ["Aria", "Libretto", "Tenor", "Soprano", "Overture"]},
                {"answer": "Cycling", "words": ["Bicycle", "Pedal", "Helmet", "Tour", "Gear"]},
                {"answer": "Basketball", "words": ["Dribble", "Hoop", "Dunk", "Court", "Referee"]},
                {"answer": "Photography", "words": ["Lens", "Exposure", "Shutter", "Focus", "Flash"]},
                {"answer": "Astronomy", "words": ["Telescope", "Star", "Galaxy", "Orbit", "Planet"]},
                {"answer": "Gardening", "words": ["Soil", "Seeds", "Plants", "Watering", "Fertilizer"]},
                {"answer": "Cooking", "words": ["Recipe", "Stir", "Bake", "Fry", "Ingredients"]},
                {"answer": "Sailing", "words": ["Boat", "Wind", "Anchor", "Sail", "Marina"]},
                {"answer": "Climbing", "words": ["Rope", "Harness", "Summit", "Rock", "Grip"]},
                {"answer": "Diving", "words": ["Underwater", "Scuba", "Mask", "Fins", "Reef"]},
                {"answer": "Chess", "words": ["Checkmate", "Board", "Knight", "Pawn", "Strategy"]},
                {"answer": "Football", "words": ["Goal", "Striker", "Referee", "Pitch", "League"]},
                {"answer": "Writing", "words": ["Manuscript", "Pen", "Draft", "Edit", "Publish"]},
                {"answer": "Traveling", "words": ["Passport", "Journey", "Destination", "Tourist", "Adventure"]}
            ],
            usedQuestions: [],
            currentDataset: {}
        };
    },
    computed: {
        isInputEmpty() {
            return this.userInput.trim() === '';
        }
    },
    methods: {
        startGame() {
            const savedState = JSON.parse(localStorage.getItem('pinPointGame'));
            if (savedState) {
                this.loadState(savedState);
            } else {
                this.nextQuestion();
            }
        },
        saveState() {
            const state = {
                message: this.message,
                userInput: this.userInput,
                attempts: this.attempts,
                cluesRevealed: this.cluesRevealed,
                wrongAnswers: this.wrongAnswers,
                inputVisible: this.inputVisible,
                isCorrect: this.isCorrect,
                isFailed: this.isFailed,
                usedQuestions: this.usedQuestions,
                currentDataset: this.currentDataset
            };
            localStorage.setItem('pinPointGame', JSON.stringify(state));
        },
        loadState(state) {
            this.message = state.message;
            this.userInput = state.userInput;
            this.attempts = state.attempts;
            this.cluesRevealed = state.cluesRevealed;
            this.wrongAnswers = state.wrongAnswers;
            this.inputVisible = state.inputVisible;
            this.isCorrect = state.isCorrect;
            this.isFailed = state.isFailed;
            this.usedQuestions = state.usedQuestions;
            this.currentDataset = state.currentDataset;
        },
        checkAnswer() {
            if (this.userInput.toLowerCase() === this.currentDataset.answer.toLowerCase()) {
                this.message = "Correct! " + this.currentDataset.answer;
                this.inputVisible = false;
                this.isCorrect = true;
            } else {
                this.wrongAnswers.push(this.userInput);
                this.attempts++;
                this.cluesRevealed = this.attempts;
                if (this.attempts >= 5) {
                    this.message = "Failed! Answer - " + this.currentDataset.answer;
                    this.inputVisible = false;
                    this.isFailed = true;
                } 
            }
            this.userInput = '';
            this.saveState();
        },
        nextQuestion() {
            if (this.datasets.length === this.usedQuestions.length) {
                this.message = "No more questions available.";
                this.inputVisible = false;
                return;
            }

            this.isCorrect = false;
            this.isFailed = false;
            this.message = '';
            this.userInput = '';
            this.attempts = 0;
            this.cluesRevealed = 0;
            this.wrongAnswers = [];
            this.inputVisible = true;

            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * this.datasets.length);
            } while (this.usedQuestions.includes(nextIndex));

            this.usedQuestions.push(nextIndex);
            this.currentDataset = this.datasets[nextIndex];

            this.saveState();
        }
    },
    created() {
        this.startGame();
    }
});

app.mount('#app');