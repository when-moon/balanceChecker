Template.checkBalance.helpers({
    walletBallance: function () {
        return Session.get("walletBallance");
    }
});

Template.currentWallet.helpers({
    walletAddress: function(){
        return Session.get("currentAddress");
    },
    walletValue: function(){
        return Session.get("walletValue");
    }
});

let Address;
Template.checkBalance.events({
    "submit form": function () {
        event.preventDefault();
        let address = event.target.address.value;
        TemplateVar.set("address", address);
        web3.eth.getBalance(address, function (err, res) {
            let ethBlance = Math.round(web3.fromWei(res, "ether") * 10000) / 10000;
            Session.set("walletBallance", ethBlance);
        });
    }
});

Template.currentWallet.events({
    'click .search': function (event) {
        web3.eth.getAccounts(function (err, res) {
            if (!err) {
                Address = res[0];
                console.log(Address);
                Session.set("currentAddress", Address);
            }
        });
        web3.eth.getBalance(Address, function (err, res) {
            Session.set("walletValue", Math.round(web3.fromWei(res, "ether") * 10000) / 10000);
        });
    }
});