# CountBot
Simple self-hostable counting bot with easy configuration.
(Only works for one hardcoded channel)

## Guide
1. To self-host this bot, clone the repository and rename `config-template.json` to `config.json`.
2. Fill out the blanks in `config.json` with your token and channel ID.
3. Run the bot using `node .` from project root. If you are using PM2, you can use `pm2 start countbot.json` from project root.