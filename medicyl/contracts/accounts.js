// contract address
const acc_address = 0x06693680d53765ec3a071db0ae453a5e875dfa79

// ABI
const acc_abi=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "username",
				"type": "string"
			},
			{
				"name": "secret",
				"type": "string"
			}
		],
		"name": "set",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "username",
				"type": "string"
			}
		],
		"name": "get_secret",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

module.exports.acc_address=acc_address;
module.exports.acc_abi=acc_abi;