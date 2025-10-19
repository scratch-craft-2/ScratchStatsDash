// Name: ScratchStats
// ID: scratchcraft2ScratchStats
// Description: Interact with Scratch API directly in Dash!
// By: scratch_craft_2 <https://scratch.mit.edu/users/scratch_craft_2/>,
// Den4ik-12 <https://scratch.mit.edu/users/Den4ik-12/>,
// damir2809 <https://scratch.mit.edu/users/damir2809/>

(function (Scratch) {
    "use strict";

    if (!Scratch.extensions.unsandboxed) {
        throw new Error("This extension must run unsandboxed!");
    }

    class ScratchStats {
        getInfo() {
            return {
                id: "scratchcraft2ScratchStats",
                name: "ScratchStats",
                color1: "#ffba70",
                blocks: [
                    {
                        opcode: "getMessages",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "messages number of user [USERNAME]",
                        arguments: {
                            USERNAME: {
                                defaultValue: "scratch_craft_2",
                                type: Scratch.ArgumentType.STRING,
                            },
                        },
                    },
                    {
                        opcode: "isFollows",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "user [USERNAME1] follows user [USERNAME2]?",
                        arguments: {
                            USERNAME1: {
                                defaultValue: "scratch_craft_2",
                                type: Scratch.ArgumentType.STRING,
                            },
                            USERNAME2: {
                                defaultValue: "Den4ik-12",
                                type: Scratch.ArgumentType.STRING,
                            },
                        },
                    }
                ],
            };
        }
        async getMessages(args) {
            try {
                return await fetch(`https://api.scratch.mit.edu/users/${args.USERNAME}/messages/count`).json().count;
            } catch (_) {return 0};
        }
        async isFollows(args) {
            return await fetch(`https://api.scratch.mit.edu/users/${args.USERNAME1}/following/`)
                .then(response => {
                    if (!response.ok) return false;
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data)) {
                        return data.some(user =>
                            user.hasOwnProperty('username') &&
                            user.username.toLowerCase() === args.USERNAME2.toLowerCase()
                        );
                    // Expected an array of users in the response
                    } else return false;
                })
                .catch(_ => {return false});
        }
    }
    Scratch.extensions.register(new ScratchStats());
})(Scratch);
