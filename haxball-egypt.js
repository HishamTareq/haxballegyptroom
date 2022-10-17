let commands = [];
let conn = [];
let colors = {};
let roles = {};
let geo = {};
let current = {};
let prefix = "!";
let roomName = "🦶 HaxBall EGYPT v1.0 🦿";
let password = "1";
let public = true;
let token = null;
let maxPlayers = 10;
let noPlayer = false;
let playerName = "B0T";
geo.code = "eg";
geo.lat = 31.2162;
geo.lon = 29.9529;
current.players = [];
colors["error"] = 0xAC5C5C;
colors["Caribbean Green"] = 0x04CFAC;
roles.super = [];
roles.owner = [];
roles.owner[0] = {name: "ONN", auth: "XtkMvzsGbxEJJkTiA2Zoff_Hk36asU7e5paWVxDDwNk"};
commands[0] = {name: "help", id: 1, admin: false, active: true, permissions: ["User", "Super", "Owner"]};
let room = HBInit({
  roomName: roomName,
  password: password,
  public: public,
  maxPlayers: maxPlayers,
  noPlayer: noPlayer,
  playerName: playerName,
  token: token,
  geo: geo,
});

/*=======================
  End Of Initialization
=========================*/

room.onPlayerJoin = function (player) {
  check(player) && (setPlayerRole(player), updateConnList(player, true),
  updatePlayerList(player, true), alertHelpMessage(player));
}
;
room.onPlayerLeave = function (player) {
  updateConnList(player);
  updatePlayerList(player);
}
;
room.onPlayerChat = function (player, message) {
  if (isCommandSyntax(message)) {
    if (getCommand(message)) {
      return runCommand(getCommand(message), player);
    } else {
      room.sendAnnouncement(message + " is not recognized as command", player.id, colors.error, "small", 2);
      return false;
    };
  }
}
;
function updateConnList(player, isNew) {
  conn.find((p, i) => (player.id == p.id ? conn.splice(i, 1) : false)) || (isNew && conn.push(player));
}
;
function check(player) { 
  return conn.find(p => player.conn == p.conn) ? kick(player, "No more than one user from your network is allowed in this room") : true;
}
;
function kick(player, reason) {
  room.kickPlayer(player.id, reason, false);
}
;
function updatePlayerList(player, isNew) {
  current.players.find((p, i) => (player.id == p.id ? current.players.splice(i, 1) : false)) || (isNew && current.players.push(player));
}
;
function setPlayerRole(player) {
  for (const r in roles) {
    roles[r].forEach(p => {
      (p.auth === player.auth) && (p.name === player.name) && (player.role = r.capitalize());
    });
  }
  player.role ??= "User";
}
;
function isCommandSyntax(txt) {
  return txt.length > 1 && txt.startsWith(prefix);
}
;
function getCommand(message) {
  return commands.find(c => message.slice(1) === c.name);
}
;
function runCommand(command, player) {
  let a = command.id;
  if (!command.permissions.includes("Owner")) {
    room.sendAnnouncement("To use this " + prefix + command.name + " command, you must to be: " + command.permissions.join(", "), player.id, colors.error, "small", 2);
  } else {
    if (command.admin && !player.admin) {
      room.sendAnnouncement("You are not an admin.", player.id, colors.error, "small", 2);
    } else {
      if (!command.active) {
        room.sendAnnouncement("This " + prefix + command.name + " command is currently inactive!", player.id, colors.error, "small", 2);
      } else {
        if (a == 1) {
          room.sendAnnouncement(`Commands: ${commands.map(c => prefix + c.name + (c.admin ? "-[admin]" : "")).join(", ")}`, player.id, colors["Caribbean Green"], "small", 1);
        }
      }
    }
  }
  return false;
}
;
function alertHelpMessage(player) {
  room.sendAnnouncement("Type " + prefix + getCommandName(1) + " to see all commands.", player.id, colors["Caribbean Green"], "normal", 1);
}
;
function getCommandName(commandId) {
  return commands.find(c => c.id == commandId).name;
}
;
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
