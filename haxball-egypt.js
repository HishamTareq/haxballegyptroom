const roomName = "🦶 HaxBall EGYPT v1.0 🦿";
const playerName = "B0T";
const password = null;
const public = true;
const noPlayer = false;
const maxPlayers = 20;
const token = "thr1.AAAAAGM9oyhuRo5yaY2aqQ.EmsjVlU4Db8";
const geo = {"lat": 31.2162,"lon": 29.9529,"code": "eg"};
const maxAdmins = 5;
const prefix = "!";
const errorColor = 0xff3333;
const warningColor = 0xdec11e;
const players = [];
const afks = [];
const spectators = 0;
const roles = [
    {
        name: "Admin",
        players: []
    },
    {
        name: "Super",
        players: []
    },
    {
        name: "Owner",
        players: [{nickname: "ONN", auth: "XtkMvzsGb xEJJkTiA2Zoff_Hk36asU7e5paWVxDDwNk"}]
    }
];
const commands = [
    {
        name: "commands",
        id: 90,
        active: true,
        roles: [
            "User",
            "Admin",
            "Super",
            "Owner",
        ]
    },
    {
        name: "bb",
        id: 171,
        active: true,
        roles: [
            "User",
            "Admin",
            "Super",
            "Owner",
        ]
    },
    {
        name: "myrole",
        id: 80,
        active: true,
        roles: [
            "User",
            "Admin",
            "Super",
            "Owner",
        ]
    },
    {
        name: "clearbans",
        id: 199,
        active: true,
        roles: [
            "Admin",
            "Super",
            "Owner",
        ]
    },
    {
        name: "admin",
        id: 105,
        active: true,
        roles: [
            "User",
            "Admin",
            "Super",
            "Owner",
        ]
    },
    {
        name: "mute",
        id: 56,
        active: false,
        roles: [
            "Super",
            "Owner",
        ]
    },
    {
        name: "unmute",
        id: 177,
        active: false,
        roles: [
            "Super",
            "Owner",
        ]
    },
    {
        name: "nop",
        id: 6,
        active: true,
        roles: [
            "User",
            "Admin",
            "Super",
            "Owner",
        ]
    },
    {
        name: "afk",
        id: 236,
        active: true,
        roles: [
            "User",
            "Admin",
            "Super",
            "Owner",
        ]
    },
    {
        name: "kickall",
        id: 255,
        active: false,
        roles: [
            "Owner",
        ]
    },
    {
        name: "ban",
        id: 212,
        active: false,
        roles: [
            "Super",
            "Owner",
        ]
    },
    {
        name: "afks",
        id: 240,
        active: true,
        roles: [
            "User",
            "Admin",
            "Super",
            "Owner",
        ]
    },
    {
        name: "re",
        id: 200,
        active: false,
        roles: [
            "Admin",
            "Super",
            "Owner",
        ]
    }
];
const room = HBInit({
    playerName: playerName,
    password: password,
    public: public,
    maxAdmins: maxAdmins,
    geo: geo,
    token: token,
    noPlayer: noPlayer,
    roomName: roomName
});

room.setTeamsLock(true);
room.onPlayerJoin = player => {
    if (commands.length > 0) {
        room.sendAnnouncement("⌨️​ Type " + prefix + getCommandName(90) + " to see all commands!", player.id, 0xb9b9b9, "small", 1);
    }
    const p = {};
    p.id = player.id;
    p.auth = player.auth;
    p.role = (() => {
        let a;
        roles.forEach(r => {
            r.players.forEach(p => {
                player.auth === p.auth && player.name === p.nickname && (a = r.name);
            });
        });
        return a || "User";
    })();
    players.push(p);
}
;
room.onPlayerLeave = (player) => {
    afks.forEach((a, i) => {
        if (a.id == player.id) {
            afks.splice(i, 1);
        }
    });
}
;
room.onPlayerChat = (player, message) => {
    if (message.startsWith(prefix)) {
        message = message.slice(1);
        (() => {
            let isDefined;
            let ids = commands.map(c => c.id);
            for (let i = 0; i < commands.length; i++) {
                if (message === getCommandName(ids[i])) {
                    isDefined = true;
                    if (getCommandRoles(ids[i]).includes(getPlayerRole(player))) {
                        if (isCommandActive(ids[i])) {
                            if (ids[i] == 90) {
                                room.sendAnnouncement("Commands: " + commands.map(c => prefix + c.name).join(", "), player.id, 65535, "small", 1)
                            }
                            if (ids[i] == 171) {
                                room.kickPlayer(player.id, "Good Bye!", false);
                            }
                            if (ids[i] == 80) {
                                room.sendAnnouncement("⚡ Your role is " + getPlayerRole(player), player.id, 0xffc83d, "small", 1);
                            }
                            if (ids[i] == 199) {
                                room.clearBans();
                                room.sendAnnouncement("🧹 Banlist has been cleared by " + player.name + " #" + player.id, null, 0xff9800, "normal", 1);
                            }
                            if (ids[i] == 105) {
                                room.setPlayerAdmin(player.id, true);
                            }
                            if (ids[i] == 6) {
                                room.sendAnnouncement("🎽 Number of players currently in the room [" + (room.getPlayerList().length - 1) + " / " + maxPlayers + "]", player.id, 0x31d2f7, "small", 1);
                            }
                            if (ids[i] == 236) {
                                let isAFK;
                                afks.forEach((a, i) => {
                                    if (a.id == player.id) {
                                        isAFK = true;
                                        afks.splice(i, 1);
                                        room.sendAnnouncement("💤​ " + player.name + " is back from AFK.", null, 0x00bcf2, "normal", 1);
                                    }
                                });
                                if (!isAFK) {
                                    afks.push({
                                        nickname: player.name,
                                        id: player.id
                                    });
                                    room.setPlayerTeam(player.id, spectators);
                                    room.sendAnnouncement("💤​ " + player.name + " is now AFK.", null, 0x00bcf2, "normal", 1);
                                }
                            }
                            if (ids[i] == 240) {
                                if (afks.length > 0) {
                                    room.sendAnnouncement("💤 [" + afks.map(p => p.nickname).join(", ") + "]", player.id, 0x00bcf2, "small", 1);
                                } else {
                                    room.sendAnnouncement("@" + player.name + " There is no player AFK!", null, 0xb9b9b9, "normal", 1);
                                }
                            }
                        } else {
                            room.sendAnnouncement("This " + prefix + message + " command is currently inactive!", player.id, errorColor, "small", 2);
                        }
                    } else {
                        room.sendAnnouncement("To use this " + prefix + message + " command, you must have one of the following roles: " + getCommandRoles(ids[i]).join(", "), player.id, warningColor, "small", 2);
                    }
                }
            }
            if (!isDefined) {
                room.sendAnnouncement("You are trying to use this " + prefix + message + " command but it is not defined!", player.id, errorColor, "small", 2);
            }
        })();
        return false;
    }
}
;
room.onPlayerTeamChange = (changedPlayer , byPlayer) => {
    if (byPlayer.id != 0) {
        afks.forEach((a) => {
            if (a.id == changedPlayer.id) {
                room.setPlayerTeam(changedPlayer.id, spectators);
                room.sendAnnouncement("🧲" + changedPlayer.name + " is AFK, can not play!", null, 0x00bcf2, "normal", 1);
            }
        });
    }
    if (changedPlayer.id == 0 ) {
        room.setPlayerTeam(0, 0);
    }
}
;
room.onPlayerAdminChange = (changedPlayer) => {
    let players = room.getPlayerList();
    let roomAdmins = 0;
    for (let i = 0; i < players.length; i++) {
        if (players[i].admin) {
            roomAdmins += 1;
        }
    }
    if (roomAdmins > maxAdmins + 1) {
        room.setPlayerAdmin(changedPlayer.id, false);
        room.sendAnnouncement("🔒" + " The maximum admins is " + maxAdmins + ".", null, 0xcddc39, 'small', 1);
    }
}
;
function getPlayerRole(player) {
    for (let i = 0; i < players.length; i++) {
        if (player.id === players[i].id) return players[i].role;
    }
}
;
function getCommandName(commandId) {
    for (let i = 0; i < commands.length; i++) {
        if (commandId == commands[i].id) {
            return commands[i].name;
        }
    }
}
;
function getCommandRoles(commandId) {
    for (let i = 0; i < commands.length; i++) {
        if (commands[i].id == commandId) {
            return commands[i].roles;
        }
    }
}
;
function isCommandActive(commandId) {
    for (let i = 0; i < commands.length; i++) {
        if (commands[i].id == commandId) {
            return commands[i].active;
        }
    }
}
