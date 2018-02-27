# CodeBuild SNS to Rocket Chat

> Lambda function that sends notification to Rocket Chat when triggered by a SNS message from CloudWatch CodeBuild events on AWS.

## Flow

<img src="./assets/codebuild-sns.png" width="750" />

- CodeBuild logs events to CloudWatch on build stage changes.
- CloudWatch triggers a SNS topic notification.
- SNS topic notification triggers lambda function since it's a subscriber.
- Lamba function authenticates with Rocket Chat and sends message to Rocket Chatchannel.

## Resources

- [Build Notifications Sample for AWS CodeBuild](https://docs.aws.amazon.com/codebuild/latest/userguide/sample-build-notifications.html)
- [How To Set Up A Slack Channel To Be An AWS SNS Subscriber](https://medium.com/cohealo-engineering/how-set-up-a-slack-channel-to-be-an-aws-sns-subscriber-63b4d57ad3ea)

## License

MIT
