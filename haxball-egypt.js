let roles = {};
let current = {};
let roomName = "null";
let password = "1";
let playerName = "B0T";
let token = "thr1.AAAAAGM9oyhuRo5yaY2aqQ.EmsjVlU4Db8";
let noPlayer = false;
let maxPlayers = 16;
let public = true;
let geo = {"lat": 31.2162,"lon": 29.9529,"code": "eg"};
let room = HBInit({
  roomName: roomName,
  public: public,
  password: password,
  playerName: playerName,
  token: token,
  geo: geo,
  noPlayer: noPlayer,
  maxPlayers: maxPlayers
})
roles.super = [];
roles.owner = [
  {
    name: "ONN",
    auth: "XtkMvzsGbxEJJkTiA2Zoff_Hk36asU7e5paWVxDDwNk"
  }
];
current.user = [];
current.admin = [];
current.super = [];
current.owner = [];
current.conns = [];
current.afks = [];

/*======================= 
  End Of Initialization
=========================*/

setInterval(() => {
  room.setTeamsLock(true);
}, 0)
;
room.onPlayerJoin = function (player) {
  !checkConn(player) && !setPlayerRole(player) && updatePlayerRoleList(player);
}
;
room.onPlayerLeave = function (player) {
  updateConnList(player);
}
;
room.onPlayerAdminChange = function (changedPlayer, byPlayer) {
  updateAdminList(changedPlayer);
}
;
room.onPlayerChat = function (player, message) {

}
;
function setPlayerRole(player) {
  for (const role in roles) {
    roles[role].forEach(p => {
      if (player.name === p.name && player.auth === p.auth) {
        player.role = role.capitalize();
      }
    });
  }
  if (!player.role) {
    player.role = "User";
  }
}
;
function updateConnList(player) {
  current.conns.forEach((p, i) => {
    if (player.id == p.id) {
      current.conns.splice(i, 1);
    }
  });
}
;
function checkConn(player) {
  let a = current.conns.find(p => player.conn == p.conn);
  if (a) {
    room.kickPlayer(player.id, "Only one user from your network is allowed.", false);
  } else {
    let p = {};
    p.name = player.name;
    p.id = player.id;
    p.conn = player.conn;
    current.conns.push(p);
    return false;
  }
  return true;
}
;
function updatePlayerRoleList(player) {
  current[player.role.toLowerCase()].push({
    name: player.name,
      id: player.id,
      auth: player.auth,
    });
}
;
function updateAdminList(player) {
  if (player.admin) {
    current.admin.push({
      name: player.name,
      id: player.id,
    });
  } else {
    current.admin.forEach((r, i) => {
      if (player.id === r.id) {
        current.admin.splice(i, 1);
      }
    });
  }
}
;
String.prototype.capitalize = function () {
  return this[0].toUpperCase() + this.slice(1);
}
