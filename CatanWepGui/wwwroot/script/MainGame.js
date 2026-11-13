// --- brett daten -> linie: [knoten, knoten], tile index: [knoten]
window.Board = window.Board || {
    pairs: {
        "top_grid_line_0": ["top_grid_1", "top_grid_4"],
        "top_grid_line_1": ["top_grid_2", "top_grid_5"],
        "top_grid_line_2": ["top_grid_3", "top_grid_7"],
        "top_grid_line_3": ["top_grid_4", "top_grid_7"],
        "top_grid_line_4": ["top_grid_4", "top_grid_8"],
        "top_grid_line_5": ["top_grid_5", "top_grid_8"],
        "top_grid_line_6": ["top_grid_5", "top_grid_9"],
        "top_grid_line_7": ["top_grid_6", "top_grid_9"],
        "top_grid_line_8": ["top_grid_7", "top_grid_11"],
        "top_grid_line_9": ["top_grid_8", "top_grid_12"],
        "top_grid_line_10": ["top_grid_9", "top_grid_13"],
        "top_grid_line_11": ["top_grid_10", "top_grid_15"],
        "top_grid_line_12": ["top_grid_11", "top_grid_15"],
        "top_grid_line_13": ["top_grid_11", "top_grid_16"],
        "top_grid_line_14": ["top_grid_12", "top_grid_16"],
        "top_grid_line_15": ["top_grid_12", "top_grid_17"],
        "top_grid_line_16": ["top_grid_13", "top_grid_17"],
        "top_grid_line_17": ["top_grid_13", "top_grid_18"],
        "top_grid_line_18": ["top_grid_14", "top_grid_18"],
        "top_grid_line_19": ["top_grid_15", "top_grid_19"],
        "top_grid_line_20": ["top_grid_16", "top_grid_20"],
        "top_grid_line_21": ["top_grid_17", "top_grid_21"],
        "top_grid_line_22": ["top_grid_18", "top_grid_22"],
        "top_grid_line_23": ["top_grid_19", "top_grid_23"],
        "top_grid_line_24": ["top_grid_19", "top_grid_24"],
        "top_grid_line_25": ["top_grid_20", "top_grid_24"],
        "top_grid_line_26": ["top_grid_20", "top_grid_25"],
        "top_grid_line_27": ["top_grid_21", "top_grid_25"],
        "top_grid_line_28": ["top_grid_21", "top_grid_26"],
        "top_grid_line_29": ["top_grid_22", "top_grid_26"],
        "top_grid_line_30": ["top_grid_22", "top_grid_27"],
        "top_grid_line_31": ["top_grid_24", "top_grid_28"],
        "top_grid_line_32": ["top_grid_25", "top_grid_29"],
        "top_grid_line_33": ["top_grid_26", "top_grid_30"],
        "top_grid_line_34": ["top_grid_28", "top_grid_31"],
        "top_grid_line_35": ["top_grid_28", "top_grid_32"],
        "top_grid_line_36": ["top_grid_29", "top_grid_32"],
        "top_grid_line_37": ["top_grid_29", "top_grid_33"],
        "top_grid_line_38": ["top_grid_30", "top_grid_33"],
        "top_grid_line_39": ["top_grid_30", "top_grid_34"],
        "top_grid_line_40": ["top_grid_32", "top_grid_35"],
        "top_grid_line_41": ["top_grid_33", "top_grid_36"]
    },
    tilePairs: {
        0: ["top_grid_1","top_grid_3","top_grid_4","top_grid_7"],
        1: ["top_grid_1","top_grid_2","top_grid_4","top_grid_5","top_grid_8"],
        2: ["top_grid_2","top_grid_5","top_grid_6","top_grid_9"],
        3: ["top_grid_3","top_grid_7","top_grid_10","top_grid_11","top_grid_15"],
        4: ["top_grid_4","top_grid_7","top_grid_8","top_grid_11","top_grid_12","top_grid_16"],
        5: ["top_grid_5","top_grid_8","top_grid_9","top_grid_12","top_grid_13","top_grid_17"],
        6: ["top_grid_6","top_grid_9","top_grid_13","top_grid_14","top_grid_18"],
        7: ["top_grid_10","top_grid_15","top_grid_19","top_grid_23"],
        8: ["top_grid_11","top_grid_15","top_grid_16","top_grid_19","top_grid_20","top_grid_24"],
        9: [],
        10: ["top_grid_13","top_grid_17","top_grid_18","top_grid_21","top_grid_22","top_grid_26"],
        11: ["top_grid_14","top_grid_18","top_grid_22","top_grid_27"],
        12: ["top_grid_19","top_grid_23","top_grid_24","top_grid_28","top_grid_31"],
        13: ["top_grid_20","top_grid_24","top_grid_25","top_grid_28","top_grid_29","top_grid_32"],
        14: ["top_grid_21","top_grid_25","top_grid_26","top_grid_29","top_grid_30","top_grid_33"],
        15: ["top_grid_22","top_grid_26","top_grid_27","top_grid_30","top_grid_34"],
        16: ["top_grid_28","top_grid_31","top_grid_32","top_grid_35"],
        17: ["top_grid_29","top_grid_32","top_grid_33","top_grid_35","top_grid_36"],
        18: ["top_grid_30","top_grid_33","top_grid_34","top_grid_36"]
    },
    owner: function (node) {
        const cls = [...node.classList].find(c => c.startsWith("#"))
        return cls ? cls.slice(1) : null
    },
    calm: function () {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    },
    // --- nein-wackeln wenn ein klick grad nix darf
    shake: function (target) {
        const el = typeof target == "string" ? document.querySelector(target) : target
        if (!el || this.calm()) return
        el.animate([
            { transform: "translateX(0)" },
            { transform: "translateX(-7px)" },
            { transform: "translateX(6px)" },
            { transform: "translateX(-4px)" },
            { transform: "translateX(3px)" },
            { transform: "translateX(0)" }
        ], { duration: 380, easing: "ease-in-out" })
    },
    // --- strassen sind rotiert -> rotation vorne dran sonst wachsen die schrägen schief
    pop: function (element, road) {
        if (this.calm()) return
        if (road) {
            const base = getComputedStyle(element).transform
            const rot = base == "none" ? "" : base + " "
            element.animate([
                { transform: rot + "scale(1, 0)" },
                { transform: rot + "scale(1, 1.15)" },
                { transform: rot + "scale(1, 1)" }
            ], { duration: 320, easing: "ease-out" })
        } else {
            element.animate([{ scale: "0.3" }, { scale: "1.3" }, { scale: "1" }], { duration: 320, easing: "ease-out" })
        }
    }
}

window.Change = window.Change || {
    changeElement: function (classId, color, firstPics, resourceCards) {
        var firstPicsSettlementBool = firstPics[0] > 0
        var firstPicsRoadBool = firstPics[1] > 0
        var pressedButton = document.querySelector(".butn.pressed")
        var building = pressedButton ? pressedButton.id : ""
        var spots = [...document.querySelectorAll(".intersec.active")]
        var roads = [...document.querySelectorAll(".bord.active")]
        var wasVisible = new Set([...spots, ...roads].filter(n => n.style.visibility == "visible"))

        for (const crown of document.querySelectorAll(".crownTemp")) {
            crown.remove()
        }
        for (const node of [...spots, ...roads]) {
            node.style.visibility = "hidden"
        }

        var show = []
        if (building == "Settlement") {
            show = spots.filter(node => Place.canPlaceSettlement("Settlement", node.id, color, firstPicsSettlementBool, resourceCards))
        } else if (building == "Road") {
            show = roads.filter(node => Place.canPlace(node.id, color, firstPicsRoadBool, resourceCards))
        } else if (building == "City") {
            for (const node of document.querySelectorAll(".intersec.Settlement")) {
                if (Place.canPlaceSettlement("City", node.id, color, firstPicsSettlementBool, resourceCards)) {
                    this.createCrown(node, "#00A0FF80", false)
                }
            }
        }
        for (const node of show) {
            node.style.visibility = "visible"
            if (!wasVisible.has(node) && !Board.calm()) {
                node.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: "ease-out" })
            }
        }
    },
    createCrown: function (node,color, real) {
        const crown = document.createElement('div');
        if(real) {
            crown.classList.add("crown")
        } else{
            crown.classList.add("crownTemp")
            crown.classList.add("active")
        }
        crown.style.position = 'relative';
        crown.style.top = "-7px";
        crown.style.left = "1px";
        crown.style.width = '18px';
        crown.style.height = '12px';
        crown.style.backgroundColor = color;
        crown.style.clipPath = `polygon(0% 100%, 0% 60%, 16% 0%, 33% 60%, 50% 0%, 66% 60%, 83% 0%, 100% 60%, 100% 100%)`;
        node.appendChild(crown)
        if (real && !Board.calm()) {
            crown.animate([{ transform: "translateY(-10px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }], { duration: 260, easing: "ease-out" })
        }
    }

    }

window.Place = window.Place || {
    placeBuilding: function (location,building, color, FirstPicValue, resourceCards) {
        var element = document.getElementById(location);
        if(building.id == 1){
            building = "Settlement"
            element.classList.remove("active");
            element.classList.add(building);
            element.style.height = "20px";
            element.style.width = "20px";
            element.style.left = (element.style.left).toString().split("px")[0] - 5 + "px";
            for (let i = element.id.split("_")[2] - 1 + 1; i < document.querySelectorAll(".intersec").length; i++) {
                const elementPlus = document.querySelectorAll(".intersec")[i]
                elementPlus.style.left = (elementPlus.style.left).toString().split("px")[0] - 10 + "px";
            }
            element.style.backgroundColor = color;
            element.classList.add(color);
            Board.pop(element, false)
        } else{
            element.classList.remove("Settlement")
            element.classList.add("City")
            Change.createCrown(element,"gold",true)
        }
    },

    canPlaceSettlement: function (building, location, color, firstpics, resourceCards) {
        const pairs = Board.pairs
        if(building == "Settlement"){
        // Alle Linien, die mit diesem Knoten verbunden sind
        const connectedLines = Object.entries(pairs)
            .filter(([_, nodes]) => nodes.includes(location))
            .map(([lineId]) => lineId);

        if (connectedLines.length === 0 && !firstpics) return false;
        // Startphase: nur sicherstellen, dass keine fremden Gebäude nebenan
        // Normale Phase: prüfen, ob eine verbundene Linie der eigenen Farbe ist
        let hasOwnRoad = false;
        for (const line of connectedLines) {
            const lineEl = document.getElementById(line);
            if (!lineEl.classList.contains("active") && lineEl.classList.contains(color)) {
                hasOwnRoad = true;
            } else if (!lineEl.classList.contains("active") && !lineEl.classList.contains(color)) {
                return false;
            }
        }
        if (!hasOwnRoad && !firstpics) return false;
        if(!firstpics) {
            const hasResources = resourceCards.filter(f => f == "Wheat").length > 0 &&
                resourceCards.filter(f => f == "Clay").length > 0 &&
                resourceCards.filter(f => f == "Sheep").length > 0 &&
                resourceCards.filter(f => f == "Wood").length > 0;
            return hasResources;
        } else{
            return true
            }
        } else{
            if(firstpics) return false
            var origin = document.getElementById(location)
            if (!origin) return false
            const hasResources = resourceCards.filter(f => f == "Stone").length > 2 &&
                resourceCards.filter(f => f == "Wheat").length > 1;
            return !origin.classList.contains("active") && origin.classList.contains("Settlement") && origin.classList.contains(color) && hasResources;

        }
    },

    canPlace: function (location, color, firstpics, resourceCards) {
        const pairs = Board.pairs
        if (!pairs[location]) return false;

        const neighbors = {};
        for (const [line, nodes] of Object.entries(pairs)) {
            for (const node of nodes) {
                for (const [otherLine, otherNodes] of Object.entries(pairs)) {
                    if (line !== otherLine && otherNodes.includes(node)) {
                        if (!neighbors[line]) neighbors[line] = new Set();
                        neighbors[line].add(otherLine);
                    }
                }
            }
        }
        for (const line in neighbors) {
            neighbors[line] = Array.from(neighbors[line]);
        }
            const currentNodes = pairs[location];

            const [node1, node2] = currentNodes.map(id => document.getElementById(id));
            if (!node1 || !node2) return false;

            const ownedInactive = [node1, node2].some(node => !node.classList.contains("active") && node.classList.contains(color));
            const enemyInactive = [node1, node2].some(node => !node.classList.contains("active") && !node.classList.contains(color));
            const neighborLines = neighbors[location] || [];
            const connectedToOwnRoad = neighborLines.some(lineId => {
                const lineElement = document.getElementById(lineId);
                return lineElement && !lineElement.classList.contains("active") && lineElement.classList.contains(color);
            })
            if(firstpics){
                return (ownedInactive || connectedToOwnRoad) && !enemyInactive;
            } else{
                if (resourceCards.filter(f => f == "Wood").length > 0 && resourceCards.filter(f => f == "Clay").length > 0){
                    return (ownedInactive || connectedToOwnRoad) && !enemyInactive;
                }
                else{
                    return false;
                }
            }
    },

    placeStreet: function (location, color) {
        var element = document.getElementById(location);
        if (element && element.classList.contains("active")) {
            element.classList.remove("active");
            element.style.backgroundColor = color;
            element.classList.add(color);
            Board.pop(element, true)
        }
    }
}


window.Butn = window.Butn || {
    butnn: function () {
        let buttons = document.getElementsByClassName("butn");
        function removeBackgroundColor() {
            for (const button of buttons) {
                button.style.backgroundColor = "#83634A"
                button.classList.remove("pressed")
            }
        }

        for (const button of buttons) {
            button.addEventListener("click", function () {
                if (button.hasAttribute("data-locked")) {
                    Thief.blocked(button)
                    return
                }
                if(!button.classList.contains("pressed")){
                    removeBackgroundColor()
                    button.style.backgroundColor = "#af7e69";
                    button.classList.add("pressed")
                } else{
                    button.style.backgroundColor = "#83634A"
                    button.classList.remove("pressed")
                }
            })
        }
    },
    // --- bau auswahl weg -> buttons raus, spots + kronen verstecken
    reset: function () {
        for (const button of document.getElementsByClassName("butn")) {
            button.style.backgroundColor = "#83634A"
            button.classList.remove("pressed")
        }
        for (const node of document.querySelectorAll(".intersec.active, .bord.active")) {
            node.style.visibility = "hidden"
        }
        for (const crown of document.querySelectorAll(".crownTemp")) {
            crown.remove()
        }
    }
}

window.Ertrag = window.Ertrag || {
    erwirtschaftung: function (roll, thiefTile) {
        const tiles = [...document.getElementsByClassName("tile")];
        const ernte = {
            Wood : [],
            Sheep : [],
            Stone : [],
            Wheat : [],
            Clay : []
        }
        tiles.forEach((tile, i) => {
            if (i === thiefTile || !Board.tilePairs[i].length) return
            if (!tile.children[0] || tile.children[0].textContent != roll) return
            const resource = tile.style.backgroundImage.split("/")[2].split(".")[0]
            if (!ernte[resource]) return

            for (const id of Board.tilePairs[i]) {
                const node = document.getElementById(id)
                if (node.classList.contains("active")) continue
                const owner = Board.owner(node)
                if (!owner) continue
                ernte[resource].push(owner)
                if (node.classList.contains("City")) {
                    ernte[resource].push(owner)
                }
            }
        })
        return ernte
    }
}
window.Win = window.Win || {
    hasWon:function(winnerName, playerColor){
        document.getElementById("winnerOverlay").style.display = "flex";
        document.getElementById("winnerName").textContent = winnerName + " hat gewonnen!";

        const placed = cls => [...document.getElementsByClassName(cls)]
            .filter(s => !s.classList.contains("active"))
            .filter(s => Board.owner(s) === playerColor).length;

        document.getElementById("streetsPlaced").textContent = "Gebaute Straßen: " + placed("bord");
        document.getElementById("settlementsPlaced").textContent = "Gebaute Siedlungen: " + placed("Settlement");
        document.getElementById("citiesPlaced").textContent = "Gebaute Städte: " + placed("City");

    }
}
window.Thief = window.Thief || {
    createThief: function (index, animate){
        var location = document.getElementsByClassName("tile")[index]
        if (!location) return
        var old = document.querySelector(".thief")
        var from = old ? old.getBoundingClientRect() : null
        if (old) old.remove()

        var thief = document.createElement("div")
        thief.style.position = "absolute"
        thief.style.top = "49px"
        thief.style.left = "40px"
        thief.style.height = "50px"
        thief.style.width = "50px"
        thief.style.borderRadius = "50%"
        thief.style.backgroundColor = "black"
        thief.style.zIndex = "1"
        thief.classList.add("thief")
        location.appendChild(thief)

        if (!animate || !from || Board.calm()) return
        this.fly(thief, from)
    },
    // --- tiles sind geclippt -> fixed ghost fliegt rüber, echter räuber erst danach sichtbar
    fly: function (thief, from) {
        var to = thief.getBoundingClientRect()
        var dx = to.left - from.left
        var dy = to.top - from.top
        var ghost = thief.cloneNode()
        ghost.classList.remove("thief")
        ghost.style.position = "fixed"
        ghost.style.top = from.top + "px"
        ghost.style.left = from.left + "px"
        ghost.style.zIndex = "50"
        ghost.style.pointerEvents = "none"
        document.body.appendChild(ghost)
        thief.style.visibility = "hidden"

        var anim = ghost.animate([
            { transform: "translate(0, 0) scale(1)", boxShadow: "0 0 0 rgba(0,0,0,0)" },
            { transform: `translate(${dx / 2}px, ${dy / 2 - 40}px) scale(1.25)`, boxShadow: "0 18px 14px rgba(0,0,0,0.35)", offset: 0.5 },
            { transform: `translate(${dx}px, ${dy}px) scale(1)`, boxShadow: "0 0 0 rgba(0,0,0,0)" }
        ], { duration: Math.min(750, 320 + Math.hypot(dx, dy) * 0.6), easing: "ease-in-out" })

        var land = () => {
            ghost.remove()
            thief.style.visibility = ""
            thief.animate([{ transform: "scale(1.15, 0.85)" }, { transform: "scale(1)" }], { duration: 180, easing: "ease-out" })
        }
        anim.onfinish = land
        anim.oncancel = land
    },
    // --- farben von allen die am tile eine siedlung/stadt haben
    neighbours: function (index) {
        var owners = (Board.tilePairs[index] || [])
            .map(id => document.getElementById(id))
            .filter(node => node && !node.classList.contains("active"))
            .map(node => Board.owner(node))
            .filter(Boolean)
        return [...new Set(owners)]
    },
    // --- geklickter button wackelt + räuber button pulst damit man sieht warum
    blocked: function (target) {
        Board.shake(target)
        if (Board.calm()) return
        document.getElementById("Raider").animate([
            { transform: "scale(1)" },
            { transform: "scale(1.15)" },
            { transform: "scale(1)" },
            { transform: "scale(1.15)" },
            { transform: "scale(1)" }
        ], { duration: 600, easing: "ease-in-out" })
    },
    lock: function () {
        Butn.reset()
        var raiderButton = document.getElementById("Raider")
        raiderButton.style.backgroundColor = "#af7e69"
        raiderButton.disabled = true
    },
    unlock: function () {
        var raiderButton = document.getElementById("Raider")
        raiderButton.style.backgroundColor = "#83634A"
        raiderButton.disabled = false
    }
}
