import * as core from '@actions/core';
import { IncomingWebhook } from '@slack/webhook';

async function run() {
  try {
    if (process.env.SLACK_WEBHOOK_URL === undefined) {
      throw new Error('SLACK_WEBHOOK_URL is not set');
    }
    const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
    if (process.env.JOB_STATUS == "Failure") {
      var payload = eval("payload = " + '{ "attachments": [{"title": "' + process.env.TITLE_MSG_FAIL + '","title_link": "' + process.env.URL_WORKFLOW + '","text": "' + process.env.FOOTER_MSG_FAIL + '","color": "danger"}]}');
    }
    if (process.env.JOB_STATUS == "Success") {
      var payload = eval("payload = " + '{ "attachments": [{"title": "' + process.env.TITLE_MSG_SUCCESS + '","title_link": "' + process.env.URL_WORKFLOW + '","text": "' + process.env.FOOTER_MSG_SUCCESS + '","color": "good"}]}');
    }
    if (process.env.JOB_STATUS == "Cancelled") {
      var payload = eval("payload = " + '{ "attachments": [{"title": "' + process.env.TITLE_MSG_CANCELLED + '","title_link": "' + process.env.URL_WORKFLOW + '","text": "' + process.env.FOOTER_MSG_CANCELLED + '","color": "warning"}]}');
    }
    await webhook.send(JSON.parse(JSON.stringify(payload)));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
