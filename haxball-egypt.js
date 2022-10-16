let prefix = "!";
let commands = [];
let roles = {};
roles.super = [];
roles.owner = [];
roles.super[0] = {name: "ONN", auth: "XtkMvzsGbxEJJkTiA2Zoff_Hk36asU7e5paWVxDDwNk"};
let conn = [];
let current = {};
current.players = [];
let roomName = "🦶 HaxBall EGYPT v1.0 🦿";
let password = "1";
let public = true;
let token = null;
let geo = {};
geo.code = "eg";
geo.lat = 31.2162;
geo.lon = 29.9529;
let maxPlayers = 10;
let noPlayer = false;
let playerName = "B0T";
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
room.onPlayerJoin = function (player) {
  check(player) && (setPlayerRole(player), updateConnList(player, true),
  updatePlayerList(player, true));
  console.log(player.role);
}
;
room.onPlayerLeave = function (player) {
  updateConnList(player);
  updatePlayerList(player);
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
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
