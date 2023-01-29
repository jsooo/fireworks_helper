import { WechatyBuilder,log } from 'wechaty'
import qrcode from 'qrcode-terminal'

const wechaty = WechatyBuilder.build({
	ame: "wechat-assistant", // generate xxxx.memory-card.json and save login data for the next login
	puppetOptions: {
		uos: true, // 开启uos协议
	},
	// puppet: "wechaty-puppet-wechat",
}) // get a Wechaty instance

function onLogin(user) {
	log.info('StarterBot', 'User %s logged in', user.name())
}

function onLogout(user) {
	log.info('StarterBot', 'User %s logged out', user.name())
}

function onScan(qrcodeUrl, status) {
	if (status === 2) {
		log.info('StarterBot', 'Scan QR Code to login: %s', status)
  		qrcode.generate(qrcodeUrl)
    }
}

async function onMessaeg(message) {
	// log.debug('StarterBot', 'Message %s', message)
	const msg = message.text();
	var msgText = msg.replace(/\s*/g,"");
	// if (msgText.indexOf(" 拍了拍我")) {
	// 	await message.say("新年快乐[烟花]")
	// 	return
	// }
	if (!msgText.startsWith("嘛哩嘛哩哄")) {
		return
	}
	if (msgText === "嘛哩嘛哩哄help") {
		await message.say("烟花助手：\n你可以发：<a href='weixin://bizmsgmenu?msgmenucontent=烟花10连发&msgmenuid=1'>烟花10连发</a>、<a href='weixin://bizmsgmenu?msgmenucontent=爆竹10连发&msgmenuid=2'>爆竹10连发</a>、<a href='weixin://bizmsgmenu?msgmenucontent=炸弹10连发&msgmenuid=3'>炸弹10连发</a>、<a href='weixin://bizmsgmenu?msgmenucontent=混合10连发&msgmenuid=4'>混合10连发</a>、<a href='weixin://bizmsgmenu?msgmenucontent=混合10连发&msgmenuid=5'>庆祝10连发</a>，让我们一起来炸群吧")
	} else {
		var boomTimes= msgText.replace(/[^0-9]/ig,"");
		if (boomTimes > 50) {
			boomTimes = 50;
		}
		if (msgText.startsWith("嘛哩嘛哩哄烟花")) {
			for (let i = 0; i < boomTimes; i++) {
				await message.say("[烟花]")
			}
		} else if (msgText.startsWith("嘛哩嘛哩哄爆竹")) {
			for (let i = 0; i < boomTimes; i++) {
				await message.say("[爆竹]")
			}
		} else if (msgText.startsWith("嘛哩嘛哩哄炸弹")) {
			for (let i = 0; i < boomTimes; i++) {
				await message.say("[炸弹]")
			}
		} else if (msgText.startsWith("嘛哩嘛哩哄混合")) {
			var a = ["[烟花]","[爆竹]","[炸弹]","[庆祝]"];
			for (let i = 0; i < boomTimes; i++) {
				await message.say(a[i%a.length])
			}
		} else if (msgText.startsWith("嘛哩嘛哩哄庆祝")) {
			for (let i = 0; i < boomTimes; i++) {
				await message.say("[庆祝]")
			}
		}
	}
}

wechaty
  .on('scan', onScan)
  .on('login', onLogin)
  .on('logout', onLogout)
  .on('message', onMessaeg)
  .start()
  .catch(async (e) => {
    console.error('Bot start() fail:', e);
	log.error('StarterBot', 'Bot start() fail: %s', e)
    await bot.stop();
    process.exit(-1);
});
