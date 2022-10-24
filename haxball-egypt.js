let prefix = "!";
let roomName = "🦶 HaxBall EGYPT 🦿";
let password = null;
let public = true;
let token = null;
let maxPlayers = 20;
let noPlayer = false;
let playerName = "B0T";
let conns = [];
let commands = [
  {
    "name": "help",
    "syntax": /help/,
    "id": 1,
    "admin": false,
    "active": true,
    "permissions": [
      "User",
      "Super",
      "Owner"
    ]
  },
  {
    "name": "bb",
    "syntax": /bb/,
    "id": 2,
    "admin": false,
    "active": true,
    "permissions": [
      "User",
      "Super",
      "Owner"
    ]
  },
  {
    "name": "myrole",
    "syntax": /myrole/,
    "id": 3,
    "admin": false,
    "active": true,
    "permissions": [
      "User",
      "Super",
      "Owner"
    ]
  },
  {
    "name": "clearbans",
    "syntax": /clearbans/,
    "id": 4,
    "admin": true,
    "active": true,
    "permissions": [
      "Super",
      "Owner"
    ]
  },
  {
    "name": "admin",
    "syntax": /admin/,
    "id": 5,
    "admin": false,
    "active": true,
    "permissions": [
      "Super",
      "Owner"
    ]
  },
  {
    "name": "waive",
    "syntax": /waive/,
    "id": 6,
    "admin": true,
    "active": true,
    "permissions": [
      "User",
      "Super",
      "Owner"
    ]
  },
  {
    "name": "nop",
    "syntax": /nop/,
    "id": 7,
    "admin": false,
    "active": true,
    "permissions": [
      "User",
      "Super",
      "Owner"
    ]
  },
  {
    "name": "kickall",
    "syntax": /kickall/,
    "id": 8,
    "admin": true,
    "active": true,
    "permissions": [
      "Owner"
    ]
  },
  {
    "name": "mute",
    "syntax": /mute #\d+/,
    "id": 9,
    "admin": true,
    "active": false,
    "permissions": [
      "Super",
      "Owner"
    ]
  },
  {
    "name": "unmute",
    "syntax": /unmute #\d+/,
    "id": 10,
    "admin": true,
    "active": false,
    "permissions": [
      "Super",
      "Owner"
    ]
  },
  {
    "name": "afk",
    "syntax": /afk/,
    "id": 11,
    "admin": false,
    "active": false,
    "permissions": [
      "User",
      "Super",
      "Owner"
    ]
  },
  {
    "name": "afks",
    "syntax": /afks/,
    "id": 12,
    "admin": false,
    "active": false,
    "permissions": [
      "User",
      "Super",
      "Owner"
    ]
  },
  {
    "name": "re",
    "syntax": /re/,
    "id": 13,
    "admin": true,
    "active": false,
    "permissions": [
      "User",
      "Super",
      "Owner"
    ]
  },
  {
    "name": "submit",
    "syntax": /submit/,
    "id": 14,
    "admin": false,
    "active": true,
    "permissions": [
      "User",
      "Super",
      "Owner"
    ]
  },
];
let roles = {
  "super": [
    {
      "name": "zaghlloul99",
      "auth": "C2ya24CmJu9hqEHkuAFsB2D783MiqoqN6HwjaqJZ0sk"
    }
  ],
  "owner": [
    {
      "name": "ONN",
      "auth": "XtkMvzsGbxEJJkTiA2Zoff_Hk36asU7e5paWVxDDwNk"
    }
  ]
};
let colors = {
  "error": 0xAC5C5C,
  "sunglow": 0xFFC83D,
  "apple": 0x5CB85C,
  "caribbean green": 0x04CFAC
};
let current = {
  "players": [],
  "afks": [],
  "mutes": []
};
let geo = {
  "code": "eg",
  "lat": 31.2162,
  "lon": 29.9529
};
let room = HBInit({
  "roomName": roomName,
  "password": password,
  "public": public,
  "maxPlayers": maxPlayers,
  "noPlayer": noPlayer,
  "playerName": playerName,
  "token": token,
  "geo": geo,
});

room.onPlayerJoin = function (player) {
  window.localStorage.setItem(player.name, player.auth);
  check(player) && (setPlayerRole(player), updateConnList(player, true), updatePlayerList(player, true), printHelpMessage(player),
  room.sendAnnouncement("We urgently need new Super Admins for this room in the near future. If you want to apply, copy your ID from here:\nhttps://www.haxball.com/playerauth\nthen retype !submit <copied ID> or !submit (recommended),\nand Candidates will be reviewed at a later time.", player.id, colors.sunglow, "small", 2));
}

room.onPlayerLeave = function (player) {
  updateConnList(player);
  updatePlayerList(player);
}

room.onPlayerChat = function (player, message) {
  if (isCommandPrefix(message)) {
    if (getCommand(message)) {
      return runCommand(getCommand(message), player);
    } else {
      room.sendAnnouncement(message + " is not recognized or is mistyped", player.id, colors.error, "small", 2);
    }
  }
}

function check(player) {
  return !conns.find(a => player.conn === a.conn) || kick(player, "No more than one user from your network is allowed in this room");
}

function kick(player, reason) {
  room.kickPlayer(player.id, reason, false);
}

function updateConnList(player, isNew) {
  isNew && conns.push(player) || conns.forEach((a, i) => {
    player.id == a.id && conns.splice(i, 1);
  });
}

function setPlayerRole(player) {
  for (let r in roles) {
    for (let i = 0; i < roles[r].length; i++) {
      if (player.auth === roles[r][i].auth && player.name === roles[r][i].name) {
        player.role = r.capitalize();
      }
    }
  }
  player.role ??= "User";
}

function updatePlayerList(player, isNew) {
  isNew && current.players.push(player) || current.players.forEach((a, i) => {
    player.id == a.id && current.players.splice(i, 1);
  });
}

function printHelpMessage(player) {
  room.sendAnnouncement("Type " + prefix + getCommandName(1) + " to see all commands.", player.id, colors["caribbean green"], "normal", 1);
}

function getCommandName(commandId) {
  return commands.find(c => c.id == commandId).name;
}

function isCommandPrefix(txt) {
  return txt.length > 1 && txt.startsWith(prefix);
}

function getCommand(command) {
  return commands.find(c => command.slice(1).match(c.syntax) ? command.slice(1).match(c.syntax)["0"] === command.slice(1) : false);
}

function getPlayerRole(player) {
  return current.players.find(p => player.id == p.id).role;
}

function runCommand(command, player, message) {
  let a = command.id;
  if (!command.permissions.includes(getPlayerRole(player))) {
    room.sendAnnouncement("To use this " + prefix + command.name + " command, you must to be: " + command.permissions.join(", "), player.id, colors.error, "small", 2);
  } else {
    if (command.admin && !player.admin) {
      room.sendAnnouncement("You are not an admin.", player.id, colors.error, "small", 2);
    } else {
      if (!command.active) {
        room.sendAnnouncement("This " + prefix + command.name + " command is currently inactive!", player.id, colors.error, "small", 2);
      } else {
        switch (a) {
          case 1:
            room.sendAnnouncement(`Commands: ${commands.map(c => prefix + c.name + (c.admin ? "-[admin]" : "")).join(", ")}`, player.id, colors["caribbean green"], "small", 1);
          break;
          case 2:
            kick(player, "Good Bye!");
          break;
          case 3:
            room.sendAnnouncement("⚡ Your role is " + getPlayerRole(player), player.id, colors.sunglow, "small", 1);
          break;
          case 4:
            room.clearBans();
            room.sendAnnouncement("Banlist has been cleared by " + player.name + " #" + player.id, null, colors.apple, "normal", 1);
          break;
          case 5:
            room.setPlayerAdmin(player.id, true);
          break;
          case 6:
            room.setPlayerAdmin(player.id, false);
          break;
          case 7:
            room.sendAnnouncement("Number of players currently in the room [" + (current.players.length) + " / " + maxPlayers + "]", player.id, colors.sunglow, "small", 1);
          break;
          case 8:
            current.players.forEach(p => !(player.id == p.id) && kick(p, "Maintenance"));
          break;
          case 14:
            let s = JSON.parse(window.localStorage.getItem("supervision requests"));
            s.push(player);
            window.localStorage.setItem("supervision requests", JSON.stringify(s));
            room.sendAnnouncement("✅​ Your request has been successfully sent.", player.id, colors.sunglow, "small", 1);
          break;
        }
      }
    }
  }
  return false;
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
