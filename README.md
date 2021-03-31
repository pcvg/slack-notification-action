# Slack Notification Action

Send custom notifications to Slack from Github Actions. You can define the content of the message and the title in case of success or failure.

## 🚀 Running in GitHub Actions

Run this action in Github Actions by adding `pcvg/slack-notification-action@master` to your steps.

### Parameters

| Name                   | Meaning                                                        | Default | Required  | 
| ---                    | ---                                                            | ---     | ---   | 
| `SLACK_WEBHOOK_URL`    | Default webhook             | X       | true |  
| `SLACK_FAILURE_WEBHOOK_URL`    | Webhook in case of failure and cancellation     | `SLACK_WEBHOOK_URL`       | false |  
| `TITLE_SUCCESS`    | Title of the message in case of success               | X       | false |  
| `TITLE_FAIL`    | Title of the message in case of fail                    | X       | false | 
| `BODY_SUCCESS`    | Message content in case of success                  | X       | true |
| `BODY_FAIL`    | Message content in case of fail                     | X       | true |

### Example - How to use?

```yml
name: Notification example
on:
  push:
    branches:
      - master
  
jobs:
  slack-notify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Notify
        if: always()
        uses: pcvg/slack-notification-action@master
        with:
          SLACK_WEBHOOK_URL: https://hooks.slack.com/services/XXXX
          TITLE_SUCCESS: "Your build was completed successfully."
          TITLE_FAIL: "Your build failed."
          BODY_SUCCESS: "The build started by ${{ github.actor }} in API service was completed successfully"
          BODY_FAIL: "Failed - ${{ github.actor }}'s build failed - <https://github.com/${{ github.repository }}/commit/${{ github.sha }}/checks|${{ github.repository }}>"
```

### Considerations

- `SLACK_WEBHOOK_URL` will be used as failure and success webhook if `SLACK_FAILURE_WEBHOOK_URL` is not defined.
- `SLACK_FAILURE_WEBHOOK_URL` it is used when the workflow fails or is canceled.
- You can get the webhook URL from [Slack Apps](https://app.slack.com/apps-manage/)

## ⚙️ Local dev

You can re-build locally.

Install dependencies:

            $ npm i

Build:

            $ npm run build

Run tests:

            $ Coming soon!

## ⚖️ License
This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details