module.exports = {

  name: "Store Voice Channel Info",
  section: "Channel Control",
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Brazil/mods',
    downloadURL: 'https://github.com/DBM-Brazil/mods',
    },


  subtitle(data, presets) {
    const info = [
      "Voice Channel Object",
      "Voice Channel ID",
      "Voice Channel Name",
      "Voice Channel Position",
      "Voice Channel User Limit",
      "Voice Channel Bitrate",
      "Voice Channel Members",
      "Voice Channel Members Count",
      "Can you talk?",
      "Can you Connecting?",
      "Is it Deletable?",
      "Voice Channel Creation Date",
      "Voice Channel Creation Timestamp",
      "Voice Channel Category ID",
      "List of voice channel invitations",
    ];
    return `${presets.getVoiceChannelText(data.channel, data.varName)} - ${info[parseInt(data.info, 10)]}`;
  },


  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Unknown Type";
    switch (info) {
      case 0:
        dataType = "Voice Channel";
        break;
      case 1:
        dataType = "Voice Channel ID";
        break;
      case 2:
        dataType = "Text";
        break;
      case 3:
      case 4:
      case 5:
        dataType = "Number";
        break;
      case 6:
        dataType = "List";
          break;
      case 7:
          dataType = "Number";
            break;
      case 8:
          dataType = "True or False";
              break;
      case 9:
          dataType = "True or False";
                break;
      case 10:
          dataType = "True or False";
                  break;
      case 11:
          dataType = "Date";
                    break;
      case 12:
          dataType = "Timestamp";
                      break;
      case 13:
          dataType = "Category ID";
                        break;
      case 14:
          dataType = "List";
                          break;
    }
    return [data.varName2, dataType];
  },


  fields: ["channel", "varName", "info", "storage", "varName2"],


  html(isEvent, data) {
    return `
<voice-channel-input dropdownLabel="Source Channel" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName" selectWidth="45%" variableInputWidth="50%"></voice-channel-input>

<br><br><br>

<div style="padding-top: 8px;">
	<span class="dbminputlabel">Source information</span><br>
	<select id="info" class="round">
		<option value="0" selected>Voice Channel Object</option>
		<option value="1">Voice Channel ID</option>
		<option value="2">Voice Channel Name</option>
		<option value="3">Voice Channel Position</option>
		<option value="4">Voice Channel User Limit</option>
		<option value="5">Voice Channel Bitrate</option>
    <option value="6">Voice Channel Members</option>
    <option value="7">Voice Channel Members Count</option>
    <option value="8">Can you talk?</option>
    <option value="9">Can you Connecting?</option>
    <option value="10">Is it Deletable?</option>
    <option value="11">Voice Channel Creation Date</option>
    <option value="12">Voice Channel Creation Timestamp</option>
    <option value="13">Voice Channel Category ID</option>
    <option value="14">List of voice channel invitations</option>
    
	</select>
</div>

<br>

<store-in-variable dropdownLabel="Armazenar em" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
  },


  init() {},



  async action(cache) {
    const data = cache.actions[cache.index];
    const targetChannel = await this.getVoiceChannelFromData(data.channel, data.varName, cache);
    
    if (!targetChannel) {
      this.callNextAction(cache);
      return;
    }

    const info = parseInt(data.info, 10);

    let result;
    switch (info) {
      case 0:
        result = targetChannel;
        break;
      case 1:
        result = targetChannel.id;
        break;
      case 2:
        result = targetChannel.name;
        break;
      case 3:
        result = targetChannel.position;
        break;
      case 4:
        result = targetChannel.userLimit;
        break;
      case 5:
        result = targetChannel.bitrate;
        break;
      case 6:
          result = targetChannel.members.filter(member => member).map(member => member.user).join(",");
          break;
      case 7:
        result = targetChannel.members.size;
            break;
      case 8:
            result = targetChannel.speakable;
            break;
      case 9:
            result = targetChannel.joinable;
            break;
      case 10:
            result = targetChannel.deletable;
            break;
      			case 11:
				result = targetChannel.createdAt;
				break;
			case 12:
				result = targetChannel.createdTimestamp;
				break;
			case 13:
				result = targetChannel.parentId;
				break;
			case 14:
				const invites = await targetChannel.fetchInvites();
				if(invites.size == 0) {
					result = "No invitations"
				} else {
					result = invites.filter(code => code).map(code => code).join(", ");
				}
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
