# Gitweet2
Monitor github notifications

### Installation
```sh
git clone https://github.com/tborychowski/gitweet2.git
cd gitweet
npm i
npm start
```

### Config
Just create a `config.json` file in the root, as below:
```js
{
	"url": "https://github.mycompany.local/",
	"refreshEvery": 10,          // seconds
	"participating": true
}
```

### License
*MIT*
