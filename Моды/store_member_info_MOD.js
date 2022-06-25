module.exports = {
  name: "Store Member Info",
  section: "Member Control",
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
  },

  subtitle(data, presets) {
    const info = [
      "Member Object",
      "Member ID",
      "Username",
      "Displayname ",
      "Color",
      "Member server name",
      "Last Message Member (Removed)",
      "Highist Role",
      "Member lifting post",
      "Member's color position",
      "Member is owner?",
      "Is the limb mute?",
      "Is the member deaf?",
      "Is the member banable?",
      "Member game status name",
      "Member state",
      "Member avatar URL",
      "List of member positions",
      "Number of member positions",
      "Member voice channel",
      "Member discriminator",
      "Member Tag",
      "Member account created in",
      "Timestamp of the account created by the member",
      "Member joined server on",
      "Timestamp of the member that joined the server",
      "Last message ID (removed)",
      "Member whitelist",
      "List of member Badges",
      "Member client Status",
      "Custom member Status",
      "Member server Avatar URL",
      "Member expired on",
      "Member Timestamp expired",
      "Member banner URL",
      "Member server ID",
    ];
    return `${presets.getMemberText(data.member, data.varName)} - ${info[parseInt(data.info, 10)]}`;
  },


  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Unknown Type";
    switch (info) {
      case 0:
        dataType = "Server Member";
        break;
      case 1:
        dataType = "Member ID";
        break;
      case 2:
      case 3:
        dataType = "Text";
        break;
      case 4:
        dataType = "Color";
        break;
      case 5:
        dataType = "Server";
        break;
      case 7:
      case 8:
      case 9:
        dataType = "Role";
        break;
      case 10:
      case 11:
      case 12:
      case 13:
        dataType = "Boolean";
        break;
      case 14:
      case 15:
        dataType = "Text";
        break;
      case 16:
      case 31:
        dataType = "Image URL";
        break;
      case 17:
        dataType = "List of Roles";
        break;
      case 18:
        dataType = "Number";
        break;
      case 19:
        dataType = "Voice Channel";
        break;
      case 20:
        dataType = "Member Discriminator";
        break;
      case 21:
        dataType = "Member Tag";
        break;
      case 22:
        dataType = "Date";
        break;
      case 23:
        dataType = "Timestamp";
        break;
      case 24:
        dataType = "Date";
        break;
      case 25:
        dataType = "Timestamp";
        break;
      case 27:
      case 28:
      case 29:
        dataType = "List";
        break;
      case 30:
        dataType = "Text";
        break;
      case 31:
        dataType = "Date";
        break;
      case 32:
        dataType = "Timestamp";
        break;
      case 33:
          dataType = "Timestamp";
          break;
          case 34:
            dataType = "Image URL";
            break;
            case 35:
              dataType = "Server ID";
              break;
    }
    return [data.varName2, dataType];
  },

  fields: ["member", "varName", "info", "storage", "varName2"],

  html(isEvent, data) {
    return `
<member-input dropdownLabel="Membro" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>

<br><br><br>

<div style="padding-top: 8px;">
	<span class="dbminputlabel">Information</span><br>
	<select id="info" class="round">
  <option value="0" selecionado>Member Object</option>
  <option value="1">Member ID</option>
  <option value="2">Member Username</option>
  <option value="3">Member display name [nickname]</option>
  <option value="21">Member Tag</option>
  <option value="20">Member discriminator</option>
  <option value="4">Member color</option>
  <option value="15">Membership Status</option>
  <option value="16">Member avatar URL</option>
  <option value="34">Member banner URL</option>
  <option value="31">Member server Avatar URL</option>
  <option value="5">Member server name</option>
  <option value="35">Member server ID</option>
  <option value="6">Last post by member (removed)</option>
  <option value="26">Member's last message ID (removed)</option>
  <option value="7">Member's highest office</option>
  <option value="8">Member lifting post</option>
  <option value="9">Member's color position</option>
  <option value="17">List of member positions</option>
  <option value="18">Number of member positions</option>
  <option value="10">Is the member an owner?</option>
  <option value="11">Is the member muted?</option>
  <option value="12">Is the member deaf?</option>
  <option value="13">Can the Member be banned?</option>
  <option value="14">Member game status name</option>
  <option value="30">Custom member Status</option>
  <option value="19">Member voice channel</option>
  <option value="22">Member account created in</option>
  <option value="23">Timestamp of the account created by the member</option>
  <option value="24">Member joined server on</option>
  <option value="25">Timestamp of the member that joined the server</option>
  <option value="27">Member whitelist</option>
  <option value="28">List of member badges</option>
  <option value="29">Member customer Status [Web or Mobile]</option>
  <option value="32">Member time out in</option>
  <option value="33">Timestamp of expired member</option>
	</select>
</div>

<br>

<store-in-variable dropdownLabel="Store in" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
  },

  init() {},


  async action(cache) {
    const data = cache.actions[cache.index];
    const member = await this.getMemberFromData(data.member, data.varName, cache);

    if (!member) {
      this.callNextAction(cache);
      return;
    }

    const info = parseInt(data.info, 10);

    let result;
    switch (info) {
      case 0:
        result = member;
        break;
      case 1:
        result = member.id;
        break;
      case 2:
        result = member.user?.username;
        break;
      case 3:
        result = member.displayName;
        break;
      case 4:
        result = member.displayHexColor;
        break;
      case 5:
        result = member.guild;
        break;
      case 7:
        result = member.roles.highest;
        break;
      case 8:
        result = member.roles.hoist;
        break;
      case 9:
        result = member.roles.color;
        break;
      case 10:
        result = member.id === member.guild?.ownerId;
        break;
      case 11:
        result = member.voice.mute;
        break;
      case 12:
        result = member.voice.deaf;
        break;
      case 13:
        result = member.bannable;
        break;
      case 14:
        if (member.presence?.activities.length) {
          const status = member.presence.activities.filter((s) => s.type !== "CUSTOM");
          result = status[0]?.name;
        }
        break;
      case 15:
        if (member.presence?.status) {
          const status = member.presence.status;
          switch(status) {
            case "online": { result = "Online"; break; }
            case "offline": { result = "Offline"; break; }
            case "idle": { result = "Idle"; break; }
            case "dnd": { result = "Do Not Disturb"; break; }
          }
        }
        break;
      case 16:
        if (member.user) {
          result = member.user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 });
        }
        break;
      case 17:
        result = [...member.roles.cache.values()];
        break;
      case 18:
        result = member.roles.cache.size;
        break;
      case 19:
        result = member.voice.channel;
        break;
      case 20:
        result = member.user?.discriminator;
        break;
      case 21:
        result = member.user?.tag;
        break;
      case 22:
        result = member.user?.createdAt;
        break;
      case 23:
        result = member.user?.createdTimestamp;
        break;
      case 24:
        result = member.joinedAt;
        break;
      case 25:
        result = member.joinedTimestamp;
        break;
      case 27:
        result = member.permissions.toArray();
        break;
      case 28:
        result = member.user?.flags?.toArray() ?? (await member.user?.fetchFlags())?.toArray();
        break;
      case 29:
        const status = member.presence?.clientStatus;
        result = status && Object.keys(status);
        break;
      case 30:
        result = member.presence?.activities.find((s) => s.type === "CUSTOM")?.state;
        break;
      case 31:
        result = member.displayAvatarURL({ dynamic: true, format: "png", size: 4096 });
        break;
      case 32:
        result = member.communicationDisabledUntil;
        break;
      case 33:
        result = member.communicationDisabledUntilTimestamp;
        break;
      case 34:
        const user = await member.user.fetch();
        result = member.user.bannerURL({ fomart: "png", size: 4096, dynamic: true });
        break;
        case 35:
          result = member.guild.id;
          break;
      default:
        break;
    }

    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName2, cache);
      this.storeValue(result, storage, varName2, cache);
    }

    this.callNextAction(cache);
  },


  mod() {},
};
