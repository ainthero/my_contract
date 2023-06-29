const Web3 = require("web3");
const fs = require("fs");
require("dotenv").config();
const { abi } = JSON.parse(fs.readFileSync("MyContract.json"));

async function getEvents(contractAddress, abi, eventName, filter, infuraUrl) {
    const web3 = new Web3(process.env.INFURA_API_KEY);
    const contract = new web3.eth.Contract(abi, contractAddress);

    const events = await contract.getPastEvents(eventName, {
        filter,
        fromBlock: 0,
        toBlock: 'latest'
    });

    return events;
}

async function main() {
  
  const network = 'sepolia';
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
        process.env.INFURA_API_KEY,
      ),
  );
  
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY,
  );
  web3.eth.accounts.wallet.add(signer);
  
  const contract = new web3.eth.Contract(
    abi,
    
    process.env.CONTRACT,
  );

  const addressKey = process.env.CONTRACT;
  const number = 10;
  const text = 'Some text';
  const flag = true;
  
  const tx = contract.methods.addData(addressKey, number, text, flag);
  const receipt = await tx
    .send({
      from: signer.address,
      gas: await tx.estimateGas(),
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });
  
  console.log(`Mined in block ${receipt.blockNumber}`);
}

require("dotenv").config();
main();