window.addEventListener('load', async () => {
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      alert("Please install MetaMask or another Ethereum wallet.");
    }
  
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const contractABI = require('./build/contracts/SmartContract.json').abi;
  
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];
  
    updateBalance();
  
    async function updateBalance() {
      const balance = await contract.methods.balances(userAddress).call();
      document.getElementById('balance').textContent = web3.utils.fromWei(balance, 'ether');
    }
  
    async function deposit() {
      const amount = document.getElementById('amount').value;
      await contract.methods.deposit().send({ from: userAddress, value: web3.utils.toWei(amount, 'ether') });
      updateBalance();
    }
  
    async function withdraw() {
      const amount = document.getElementById('amount').value;
      await contract.methods.withdraw(web3.utils.toWei(amount, 'ether')).send({ from: userAddress });
      updateBalance();
    }
  });
  
