# Slack Notification Action

Send custom notifications to Slack from Github Actions. You can define the content of the message and the title in case of success or failure.

## 🚀 Running in GitHub Actions

Run this action in Github Actions by adding `pcvg/slack-notification-action@main` to your steps.

### Parameters

| Name                | Meaning                                                                                             | Default                                                                       | Required | 
|---------------------|-----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|----------| 
| `SLACK_WEBHOOK_URL` | Default webhook                                                                                     | X                                                                             | true     |
| `NOTIFICATION_TYPE` | Type of the notification. Available values: `success`, `warning`, `failure`, `information`, `debug` | success                                                                       | false    | 
| `TITLE`             | Title of the message                                                                                | X                                                                             | false    | 
| `BODY`              | Message content                                                                                     | X                                                                             | true     |
| `URL_WORKFLOW`      | Link to workflow run                                                                                | `https://github.com/${{ github.repository }}/commit/${{ github.sha }}/checks` | false    |

### Example - How to use?

```yml
name: Notification example
on:
  push:
    branches:
      - main
  
jobs:
  some-job:
    runs-on: ubuntu-latest
    steps:
      run: exit 0

  slack-notify:
    needs: [some-job]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Notify
        if: success()
        uses: pcvg/slack-notification-action@main
        with:
          NOTIFICATION_TYPE: ${{ needs.some-job.status }}
          SLACK_WEBHOOK_URL: https://hooks.slack.com/services/XXXX
          TITLE: ""
          BODY: ${{ env.SLACK_MSG }}

  slack-notify-success:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Notify
        if: success()
        uses: pcvg/slack-notification-action@main
        with:
          NOTIFICATION_TYPE: 'success'
          SLACK_WEBHOOK_URL: https://hooks.slack.com/services/XXXX
          TITLE: "Your build was completed successfully."
          BODY: "The build started by ${{ github.actor }} in API service was completed successfully"  

  slack-notify-fail:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Notify
        if: failure()
        uses: pcvg/slack-notification-action@main
        with:
          NOTIFICATION_TYPE: 'failure'
          SLACK_WEBHOOK_URL: https://hooks.slack.com/services/XXXX
          TITLE: "Your build failed."
          BODY_FAIL: "Failed - ${{ github.actor }}'s build failed - <https://github.com/${{ github.repository }}/commit/${{ github.sha }}/checks|${{ github.repository }}>"
```

### Considerations

- You can get the webhook URL from [Slack Apps](https://app.slack.com/apps-manage/)

## ⚙️ Local dev

You can re-build locally.

Install dependencies:

            $ npm i

Build:

            $ npm run build

Run tests:

            $ Coming soon!

Local testing:

```sh
INPUT_SLACK_WEBHOOK_URL='https://hooks.slack.com/services/XXXX' \
NOTIFICATION_TYPE='debug' \
INPUT_TITLE='Build Success' \
INPUT_BODY='Your build completed successfully!' \
INPUT_URL_WORKFLOW='https://github.com/test/repo/actions/runs/123' \
  node dist/index.js
```

## ⚖️ License
This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details
