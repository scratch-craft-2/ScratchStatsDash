// Name: ScratchStats
// ID: ApiStatsDash
// Description: This extension adds modal dialog boxes.
// By: scratch_craft_2 <https://scratch.mit.edu/users/scratch_craft_2/>
// License: MPL-2.0

(function (Scratch) {
    "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This Extension must run unsandboxed");
  }

    class ScratchStats {
      getInfo() {
        return {
          id: "ApiStatsDash",
          name: "ScratchStats",
          color1: "#ffba70",
          blocks: [
            {
              opcode: "messages",
              blockType: Scratch.BlockType.REPORTER,
              text: "alert [textia]",
              arguments: {
                username: {
                  defaultValue: "scratch_craft_2",
                  type: Scratch.ArgumentType.STRING,
                },
            },
           },
          {
              opcode: "Follow",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "Пользователь [usernameget] Подписан на пользователя [usernamefollow] ?",
              arguments: {
                usernameget: {
                  defaultValue: "scratch_craft_2",
                  type: Scratch.ArgumentType.STRING,
                },
                  usernamefollow: {
                  defaultValue: "Den4ik-12",
                  type: Scratch.ArgumentType.STRING,
                },
            },
           }
          ],
        };
      }
messages(args) {
  try {
    return (await (await fetch(`https://api.scratch.mit.edu/users/${args.username}/messages/count`)).json()).count;
  } catch (error) {
    return ('Ошибка:', error);
    throw error;
}}
Follow(args) {
  return fetch(`https://api.scratch.mit.edu/users/${args.usernameget}/following/`)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(data => Array.isArray(data)
      ? data.some(user =>
          user.hasOwnProperty('username') &&
          user.username.toLowerCase() === args.usernamefollow.toLowerCase()
        )
      : (() => { throw new Error('Expected an array of users in the response'); })()
    )
    .catch(error => {
      console.error('Error checking following list:', error);
      return false;
    });
}
    }
    Scratch.extensions.register(new modals());
  })(Scratch);
