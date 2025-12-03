import * as core from '@actions/core';
import { IncomingWebhook } from '@slack/webhook';

function escapeCode(value: string) {
  return value.replace('"', '\"').replace("'", "\'").replace("`", "\`");
}

function isValidAttachmentsColor(hexColor: string): boolean {
  const hexRegex = /^(#?[0-9a-fA-F]{3}|#?[0-9a-fA-F]{6}|danger|warning|good)$/;
  return hexRegex.test(hexColor);
}

async function run() {
  try {
    let SLACK_WEBHOOK = core.getInput('SLACK_WEBHOOK_URL');
    if (!SLACK_WEBHOOK) {
      throw new Error('No webhook url found');
    }

    const isSuccess = core.getInput('JOB_STATUS') === 'success';
    let color: string;
    let title: string;
    let body: string;

    if (!isSuccess) {
      if (core.getInput('SLACK_FAILURE_WEBHOOK_URL')) {
        SLACK_WEBHOOK = core.getInput('SLACK_FAILURE_WEBHOOK_URL');
      }
      const colorInput = core.getInput('MSG_COLOR_FAIL');
      color = isValidAttachmentsColor(colorInput) ? colorInput : 'danger';
      title = core.getInput('TITLE_FAIL');
      body = core.getInput('BODY_FAIL');
    } else {
      const colorInput = core.getInput('MSG_COLOR_SUCCESS');
      color = isValidAttachmentsColor(colorInput) ? colorInput : 'good';
      title = core.getInput('TITLE_SUCCESS');
      body = core.getInput('BODY_SUCCESS');
    }

    const payload = {
      attachments: [{
        title: escapeCode(title),
        title_link: core.getInput('URL_WORKFLOW'),
        text: escapeCode(body),
        color: color
      }]
    };

    const webhook = new IncomingWebhook(SLACK_WEBHOOK);
    await webhook.send(payload);
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error));
  }
}

run();
