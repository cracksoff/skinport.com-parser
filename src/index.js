import { authorizationHeaderString, URL } from '#app/utils'
import got from 'got'
async function parseItems(auth, url) {
	try {
		let data = []
		const promises = []
		const optionsTradable = {
			method: 'GET',
			headers: {
				auth
			},
			searchParams: {
				app_id: 730,
				currency: 'USD',
				tradable: true
			}
		}

		const optionsNotTradable = {
			method: 'GET',
			headers: {
				auth
			},
			searchParams: {
				app_id: 730,
				currency: 'USD',
				tradable: false
			}
		}
		promises.push(await got(url, optionsTradable).json())
		promises.push(await got(url, optionsNotTradable).json())
		const results = await Promise.all(promises)
		const [dataTradable, dataNotTradable] = results

		for (let i = 0; i < dataTradable.length; i++) {
			data.push({ item_name: dataTradable[i].market_hash_name })
			data[i].min_tradable_price = dataTradable[i].min_price
			data[i].min_not_tradable_price = dataNotTradable[i].min_price
		}

		return data
	} catch (err) {
		console.log(err)
	}
}
parseItems(authorizationHeaderString, URL)
