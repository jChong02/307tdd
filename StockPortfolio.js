class StockPortfolio {
    constructor(){
        this.portfolio = {};
    };

    getPortfolio() {return this.portfolio;}

    isEmpty(){
        return Object.keys(this.portfolio).length === 0;
    }

    countSymbols(){
        return Object.keys(this.portfolio).length;
    }

    makePurchase(symbol, numShares){
        if (numShares <= 0)
            throw new Error('numShares must be a positive value');
        if (symbol in this.portfolio)
            this.portfolio[symbol] += numShares;
        else
            this.portfolio[symbol] = numShares;
    }

    makeSale(symbol, numShares) {
        if (!(symbol in this.portfolio))
            throw new Error('no shares in ' + symbol)
        if (numShares > this.portfolio[symbol])
            throw new Error('ShareSaleException')
        this.portfolio[symbol] -= numShares;

        if (this.portfolio[symbol] === 0)
            delete this.portfolio[symbol];
    }

    getNumShares(symbol) {
        if (!(symbol in this.portfolio))
            throw new Error('no shares in ' + symbol)
        return this.portfolio[symbol];
    }
}

module.exports = StockPortfolio;