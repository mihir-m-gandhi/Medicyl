// contract address
const acc_address = "0x05497ff61f630252a0d576b70dde6bfdb57803f4";

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
			},
			{
				"name": "passhash",
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
		"name": "get_passhash",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
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