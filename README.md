# Beer Me - Simple Meteor app

due to issues with browserify and twilio dependencies I decided to just make this a simple meteor app since I wanted something up and running fast :D

## Up and running:

Create a `settings.json` file in the root directory with the following information:

```
{
  "twilio": {
    "ACCOUNT_SID": "",
    "AUTH_TOKEN": "",
    "NUMBER": ""
  }
}
```

I used twilio, you can create an account online and purchase a number (it's only a dollar for a local number).

then run `meteor --settings settings.json` and you can start texting!

I used mup for deployment. Make sure you set the node version to `0.10.40` if you run into issues with deploy
