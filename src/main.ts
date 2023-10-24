import * as core from '@actions/core';
import { IncomingWebhook } from '@slack/webhook';

function escapeCode(value: string) {
  let output = value.replace('"', '\"').replace("'", "\'").replace("`", "\`");
  return output;
}

async function run() {
  try {
    if (core.getInput('SLACK_WEBHOOK_URL') === undefined) {
      throw new Error('No webhook url found');
    } else {
      var SLACK_WEBHOOK = core.getInput('SLACK_WEBHOOK_URL');
    }
    if (core.getInput('JOB_STATUS') != "success") {
        if (core.getInput('SLACK_FAILURE_WEBHOOK_URL')) {
          var SLACK_WEBHOOK = core.getInput('SLACK_FAILURE_WEBHOOK_URL');
        }
        var payload = eval("payload = " + '{ "attachments": [{"title": "' + escapeCode(core.getInput('TITLE_FAIL')) + '","title_link": "' + core.getInput('URL_WORKFLOW') + '","text": "' + escapeCode(core.getInput('BODY_FAIL')) + '","color": "danger"}]}');
    } else {
        var payload = eval("payload = " + '{ "attachments": [{"title": "' + escapeCode(core.getInput('TITLE_SUCCESS')) + '","title_link": "' + core.getInput('URL_WORKFLOW') + '","text": "' + escapeCode(core.getInput('BODY_SUCCESS')) + '","color": "good"}]}');
    }
    const webhook = new IncomingWebhook(SLACK_WEBHOOK);
    await webhook.send(JSON.parse(JSON.stringify(payload)));
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
run();
