const right_address="0x2233d86498a343f0dfbe2328685503da9c50a8a5";
                  

const right_abi=[
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doc",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "docname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "rights",
				"type": "string"
			}
		],
		"name": "AddPolicy",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			}
		],
		"name": "getUserPolicyCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "policy",
		"outputs": [
			{
				"internalType": "string",
				"name": "docname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doc",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "rights",
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
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "UserPolicyCountMap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];




module.exports.right_address=right_address;
module.exports.right_abi=right_abi;