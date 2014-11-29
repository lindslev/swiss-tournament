//put position arrays from python script or manual entry here
var def = ['WheresBaldo', 'Bongo', 'ScumBall', 'timeboy', 'Boombox', 'somegirl', 'Stormcrow', 'j0ules_', 'ballparts', 'Sun_Tzu', 'ibis', 'Kiki', 'quibble', 'Teal', 'P-d0g', 'lukemoo', 'Spiller', 'Heisenberg '];
var off = ['Jay', 'd0pe', 'Kamikaze', 'honeybear', 'noblord', 'JESUS', 'Dead Nan', 'Sunna', 'Shakalaka', "BallDon'tLie", 'DUBSTEP', 'BigMeaty', "sweg'", 'SirDan', 'espeluznante', 'Bucky_Ball', 'Deoxys', 'might dino', 'slide', 'Sundown', 'eee', 'Caduke'];
var defoff = ['Kitten Panda', 'Zvonvok', 'Nebuchanezar', 'dodsfall', 'BenM', 'Maurice', 'superdiglett', 'Theman', 'Dalek23', 'Pescis', 'The Ferret', 'Fairy', 'GriefSeeds', 'Walrus', 'Gem'];
var offdef = ['monkey', 'Altiger', 'sweater', 'boogy', 'dnninja', 'bad', 'Milk Steak', 'Tonto', 'Crees'];
//end position arrays - must be named def, off, defoff, offdef

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

defoff = shuffle(defoff);
offdef = shuffle(offdef);

function separate_dual_players() {
    defoff.forEach(function(p,idx){
       idx%2 === 0 && off.length < def.length ? off.push(p) : def.push(p);
    });
    offdef.forEach(function(p,idx){
        idx%2 === 0 && def.length > off.length ? off.push(p) : def.push(p);
    });
}

separate_dual_players();

def = shuffle(def);
off = shuffle(off);

var teams = [];

function get_defense() {
    if (def.length > 0) {
        return def.pop();
    } else {
        if (off.length > 0) {
            p = off.pop();
            console.log("Warning, putting offense player " + p + " on defense.");
            return p;
        }
    }
}

function get_offense(){
    if(off.length > 0) {
        return off.pop();
    } else {
        if (def.length > 0) {
            p = def.pop();
            console.log("Warning, putting defense player " + p + " on offense.");
            return p;
        }
    }
}

while(true) {
    total = def.length + off.length;
    if (total > 0 && total < 4) {
        console.log("Not enough names, the following were left over:");
        console.log(def);
        console.log(off);
        break;
    }
    if(total == 0) {
        console.log("Generation complete. Here are the teams.");
        break;
    }
    team = [];
    var x=2, y=2;
    while(x--) {
        team.push(get_defense());
    }
    while(y--) {
        team.push(get_offense());
    }
    teams.push(team);
}
 
function get_team(idx, team) {
    s = "";
    team.forEach(function(name){ 
      s += name + "\n";  
    });
    return s;
}

hd = "Teams\n\n"
teams.forEach(function(team,idx){
  hd += get_team(idx + 1, team);  
});

//output (un)formated for google doc
 
console.log(hd);
