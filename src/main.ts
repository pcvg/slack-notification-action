import * as core from '@actions/core';
import { IncomingWebhook } from '@slack/webhook';

function escapeCode(value: string) {
  return value.replace('"', '\"').replace("'", "\'").replace("`", "\`");
}

async function run() {
  try {
    let SLACK_WEBHOOK = core.getInput('SLACK_WEBHOOK_URL');
    if (!SLACK_WEBHOOK) {
      throw new Error('No webhook url found');
    }

    const colorMap: Record<string, string> = {
      success: 'good',
      warning: 'warning',
      failure: 'danger',
      information: '#2196F3',
      debug: '#808080'
    };

    let color: string;
    let title: string;
    let body: string;

    const notificationType = core.getInput('NOTIFICATION_TYPE').trim().toLowerCase();
    color = colorMap[notificationType] ?? colorMap['information'];
    
    if (!colorMap[notificationType]) {
      core.warning(`Unknown NOTIFICATION_TYPE: "${core.getInput('NOTIFICATION_TYPE')}". Using default color.`);
    }
    title = core.getInput('TITLE');
    body = core.getInput('BODY');

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
