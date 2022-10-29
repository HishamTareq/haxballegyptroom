const PREFIX = "!";

const MAX_ADMINS = 4;

const MATCH_MINUTES = 3;

const MATCH_SCORES = 3;

const SPECTATOR = 0;

const RED = 1;

const BLUE = 2;

const TEAMS_LOCK = true;

const AFKS = [];

const BANS = [];

const MUTES = [];

const PLAYERS = [];

const CONNS = [];

const CONFIG = {};

const COLORS = {
    error: 11295836,
    sunglow: 16762941,
    apple: 6076508,
    "caribbean green": 315308
};

const ROLES = {
    owner: [ {
        name: "ONN",
        auth: "XtkMvzsGbxEJJkTiA2Zoff_Hk36asU7e5paWVxDDwNk"
    } ],
    "super": [ {
        name: "zaghlloul99",
        auth: "C2ya24CmJu9hqEHkuAFsB2D783MiqoqN6HwjaqJZ0sk"
    } ]
};

const COMMANDS = [ {
    name: "help",
    syntax: /help/,
    id: 1,
    admin: false,
    active: true,
    permissions: [ "User", "Super", "Owner" ]
}, {
    name: "bb",
    syntax: /bb/,
    id: 2,
    admin: false,
    active: true,
    permissions: [ "User", "Super", "Owner" ]
}, {
    name: "myrole",
    syntax: /myrole/,
    id: 3,
    admin: false,
    active: true,
    permissions: [ "User", "Super", "Owner" ]
}, {
    name: "clearbans",
    syntax: /clearbans/,
    id: 4,
    admin: true,
    active: true,
    permissions: [ "Super", "Owner" ]
}, {
    name: "admin",
    syntax: /admin/,
    id: 5,
    admin: false,
    active: true,
    permissions: [ "Super", "Owner" ]
}, {
    name: "waive",
    syntax: /waive/,
    id: 6,
    admin: true,
    active: true,
    permissions: [ "User", "Super", "Owner" ]
}, {
    name: "nop",
    syntax: /nop/,
    id: 7,
    admin: false,
    active: true,
    permissions: [ "User", "Super", "Owner" ]
}, {
    name: "kickall",
    syntax: /kickall/,
    id: 8,
    admin: true,
    active: false,
    permissions: [ "Owner" ]
}, {
    name: "mute",
    syntax: /mute #\d+/,
    id: 9,
    admin: true,
    active: false,
    permissions: [ "Super", "Owner" ]
}, {
    name: "unmute",
    syntax: /unmute #\d+/,
    id: 10,
    admin: true,
    active: false,
    permissions: [ "Super", "Owner" ]
}, {
    name: "afk",
    syntax: /afk/,
    id: 11,
    admin: false,
    active: false,
    permissions: [ "User", "Super", "Owner" ]
}, {
    name: "afks",
    syntax: /afks/,
    id: 12,
    admin: false,
    active: false,
    permissions: [ "User", "Super", "Owner" ]
}, {
    name: "re",
    syntax: /re/,
    id: 13,
    admin: true,
    active: false,
    permissions: [ "User", "Super", "Owner" ]
}, {
    name: "submit",
    syntax: /submit/,
    id: 14,
    admin: false,
    active: false,
    permissions: [ "User", "Super", "Owner" ]
}, {
    name: "toTop",
    syntax: /toTop #\d+/,
    id: 15,
    admin: false,
    active: false,
    permissions: [ "Super", "Owner" ]
} ];

const ROOM = new HBInit(Object.assign(CONFIG, {
    roomName: "🦶 HaxBall EGYPT 🦿",
    password: "null",
    playerName: "B0T",
    token: null,
    "public": true,
    noPlayer: false,
    maxPlayers: 15,
    geo: {
        lat: 31.2162,
        lon: 29.9529,
        code: "eg"
    }
}));

ROOM.setTeamsLock(TEAMS_LOCK);

ROOM.setScoreLimit(MATCH_SCORES);

ROOM.setTimeLimit(MATCH_MINUTES);

ROOM.onPlayerJoin = function(a) {
    if (check(a)) ROOM.kickPlayer(a.id, "The maximum number of players from the same network is 1.", false); else {
        setPlayerRole(a);
        updateConnList(a, true);
        updatePlayerList(a, true);
        printHelpMessage(a);
        updateAdmin();
    }
};

ROOM.onPlayerLeave = function(a) {
    updateConnList(a);
    updatePlayerList(a);
    updateAdmin();
};

ROOM.onPlayerChat = function(a, b) {
    if (isCommandPrefix(b)) if (getCommand(b)) return runCommand(getCommand(b), a); else {
        ROOM.sendAnnouncement(b + " is not recognized or is mistyped", a.id, COLORS.error, "small", 2);
        return false;
    }
};

ROOM.onPlayerTeamChange = function(a) {
    if (0 == a.id) ROOM.setPlayerTeam(0, 0);
    if (a.team == SPECTATOR && 0 == a.id) {
        ROOM.reorderPlayers([ 0 ], true);
        ROOM.sendChat("Don't be stupid, How can I play while I'm a Bot ?", null);
    }
};

function isCommandPrefix(a) {
    return a.length > 1 && a.startsWith(PREFIX);
}

function check(a) {
    return CONNS.find(function(b) {
        return a.conn === b.conn;
    });
}

function setPlayerRole(a) {
    for (var b in ROLES) for (var c = 0; c < ROLES[b].length; c++) if (a.auth === ROLES[b][c].auth && a.name === ROLES[b][c].name) a.role = b.capitalize();
    if (void 0 === a.role) a.role = "User";
}

function updateConnList(a, b) {
    if (b) CONNS.push(a); else for (var c = 0; c < CONNS.length; c++) if (a.id == CONNS[c].id) CONNS.splice(c, 1);
}

function updatePlayerList(a, b) {
    if (b) PLAYERS.push(a); else for (var c = 0; c < PLAYERS.length; c++) if (a.id == PLAYERS[c].id) PLAYERS.splice(c, 1);
}

function printHelpMessage(a) {
    ROOM.sendAnnouncement("Type " + PREFIX + getCommandName(1) + " to see all commands.", a.id, COLORS["caribbean green"], "normal", 1);
}

function getCommand(a) {
    return COMMANDS.find(function(b) {
        if (a.slice(1).match(b.syntax)) return a.slice(1).match(b.syntax)["0"] === a.slice(1);
    });
}

function getPlayerRole(a) {
    return PLAYERS.find(function(b) {
        return a.id == b.id;
    }).role;
}

function getCommandName(a) {
    return COMMANDS.find(function(b) {
        return b.id == a;
    }).name;
}

function runCommand(a, b, c) {
    const d = a.id;
    if (!a.permissions.includes(getPlayerRole(b))) ROOM.sendAnnouncement("To use this " + PREFIX + a.name + " command, you must to be: " + a.permissions.join(", "), b.id, COLORS.error, "small", 2); else if (a.admin && !b.admin) ROOM.sendAnnouncement("You are not an admin.", b.id, COLORS.error, "small", 2); else if (!a.active) ROOM.sendAnnouncement("This " + PREFIX + a.name + " command is currently inactive!", b.id, COLORS.error, "small", 2); else switch (d) {
      case 1:
        ROOM.sendAnnouncement("Commands: " + COMMANDS.map(function(a) {
            return PREFIX + a.name + (a.admin ? "-[admin]" : "");
        }).join(", "), b.id, COLORS["caribbean green"], "small", 1);
        break;

      case 2:
        ROOM.kickPlayer(b.id, "Good Bye!", false);
        break;

      case 3:
        ROOM.sendAnnouncement("⚡ Your role is " + getPlayerRole(b), b.id, COLORS.sunglow, "small", 1);
        break;

      case 4:
        ROOM.clearBans();
        ROOM.sendAnnouncement("Banlist has been cleared by " + b.name + " #" + b.id, null, COLORS.apple, "normal", 1);
        break;

      case 5:
        ROOM.setPlayerAdmin(b.id, true);
        break;

      case 6:
        ROOM.setPlayerAdmin(b.id, false);
        break;

      case 7:
        ROOM.sendAnnouncement("Number of players currently in the room [" + PLAYERS.length + " / " + CONFIG.maxPlayers + "]", b.id, COLORS.sunglow, "small", 1);
        break;

      case 8:
        PLAYERS.forEach(function(a) {
            if (!(b.id == a.id)) ROOM.kickPlayer(a.id, "Maintenance", false);
        });
    }
    return false;
}

function updateAdmin(a) {
    if (!PLAYERS.find(function(a) {
        return a.admin;
    })) ROOM.setPlayerAdmin(PLAYERS[PLAYERS.length - 1].id, true);
}

String.prototype.capitalize = function() {
    const a = this.split(" ");
    for (var b = 0; b < a.length; b++) a[b] = a[b].charAt(0).toUpperCase() + a[b].slice(1);
    return a.join("");
};
