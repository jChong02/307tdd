const myStockPortfolio = require('./StockPortfolio')
var stockPortfolio;

beforeEach(() => {
    stockPortfolio = new myStockPortfolio();
});

afterEach(() => {
    stockPortfolio = null;
});

test('Testing create stock portfolio -- Success', () => {
    expect(stockPortfolio).toBeDefined();
});

test('Testing empty initial stock portfolio -- Success', () => {
    expect(stockPortfolio.isEmpty()).toBeTruthy();
});

test('Testing make purchase -- Success', () => {
    stockPortfolio.makePurchase("GME", 300);
    const result = stockPortfolio.getPortfolio();
    const expected = {"GME" : 300};
    expect(result).toMatchObject(expected);
});

test('Testing multiple purchases of same symbol -- Success', () => {
    stockPortfolio.makePurchase("GME", 300);
    stockPortfolio.makePurchase("GME", 200);
    const result = stockPortfolio.getPortfolio();
    const expected = {"GME" : 500};
    expect(result).toMatchObject(expected);
});

test('Testing multiple purchases of different symbols -- Success', () => {
    stockPortfolio.makePurchase("GME", 300);
    stockPortfolio.makePurchase("TSLA", 200);
    const result = stockPortfolio.getPortfolio();
    const expected = {"GME" : 300, "TSLA" : 200};
    expect(result).toMatchObject(expected);
});

test('Testing make purchase with negative numShares -- Error', () => { 
    expect(() => stockPortfolio.makePurchase("GME", -300)).toThrow(Error);
});

test('Testing count unique ticker symbols, no symbols -- Success', () => {
    const result = stockPortfolio.countSymbols();
    const expected = 0;
    expect(result).toBe(expected);
});

test('Testing count unique ticker symbols, two symbols -- Success', () => {
    stockPortfolio.makePurchase("GME", 300);
    stockPortfolio.makePurchase("TSLA", 200);
    const result = stockPortfolio.countSymbols();
    const expected = 2;
    expect(result).toBe(expected);
});

test('Testing making sale -- Success', () => {
    stockPortfolio.makePurchase("GME", 300);

    stockPortfolio.makeSale("GME", 200);
    const result = stockPortfolio.getPortfolio();
    const expected = {"GME" : 100};
    expect(result).toMatchObject(expected);
});

test('Testing making sale, no existing shares -- Error', () => {
    expect(() => stockPortfolio.makeSale("TSLA", 200)).toThrow(Error);
});

test('Testing making sale, selling more shares than held -- Error', () => {
    stockPortfolio.makePurchase("GME", 300);
    expect(() => stockPortfolio.makeSale("GME", 301)).toThrow('ShareSaleException');
});

test('Testing get share count for given symbol -- Success', () => {
    stockPortfolio.makePurchase("GME", 300);
    const result = stockPortfolio.getNumShares("GME");
    const expected = 300;
    expect(result).toBe(expected);
});

test('Testing get share count for given symbol, no shares -- Error', () => {
    expect(() => stockPortfolio.getNumShares("GME")).toThrow(Error);
});

test('Testing portfolio only holds symbols with shares -- Success', () => {
    stockPortfolio.makePurchase("GME", 300);
    stockPortfolio.makePurchase("TSLA", 50);
    
    stockPortfolio.makeSale("TSLA", 50);
    const result = stockPortfolio.getPortfolio();
    const expected = {"GME" : 300};
    expect(result).toMatchObject(expected);
});


