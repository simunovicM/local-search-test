import { propToFnc } from "./common";

var createValue = (data, prop, useScale) => data
  .map(f => ({
    value: f[prop] * (useScale ? f.reporting_scale : 1),
    currency: f.reporting_currency,
    date: f.period_end_date,
  }));

var createValueAll = (data, prop) => {
  var propFnc = propToFnc(prop);
  return calculateAll(data)
    .map(f => ({
      value: propFnc(f),
      currency: f.currency,
      date: f.date,
    }));
}


export const revenues = data => createValue(data.incomeStatement, 'total_rev_as_reported', true);
export const ppes = data => createValue(data.balanceSheet, 'nppe', true);
export const sharesOutstandings = data => createValue(data.incomeStatement, 'shares_out_diluted_wavg', true);
export const epss = data => createValue(data.incomeStatement, 'eps_diluted_cont', false);
export const netIncomesCompany = data => createValue(data.incomeStatement, 'ni_company', true);
export const netIncomesExcludingExtras = data => createValue(data.incomeStatement, 'ni_avail_excl', true);
export const netIncomes = data => createValue(data.cashflowStatement, 'ni', true);
export const ebits = data => createValue(data.incomeStatement, 'ebit', true);
export const grossProfits = data => createValue(data.incomeStatement, 'gp', true);
export const grossProfitMargins = data => createValue(data.incomeStatement, 'gp_margin', false);
export const operatingIncomes = data => createValue(data.incomeStatement, 'operating_income', true);
export const operatingExpenses = data => createValue(data.incomeStatement, 'total_operating_exp', true);
export const longTermInvestments = data => createValue(data.balanceSheet, 'long_term_inv', true);
export const cash = data => createValue(data.balanceSheet, 'cash', true);
export const shortTermInvestments = data => createValue(data.balanceSheet, 'st_invest', true);
export const longTermDebts = data => createValue(data.balanceSheet, 'lt_debt', true);
export const inventories = data => createValue(data.balanceSheet, 'inventory', true);
export const equities = data => createValue(data.balanceSheet, 'total_equity', true);
export const operatingCashFlows = data => createValue(data.cashflowStatement, 'cash_from_operations', true);
export const freeCashFlows = data => createValue(data.cashflowStatement, 'fcf_levered', true);
export const trueCash = data => createValueAll(data, f => f.cash + f.shortTermInvestments + f.longTermInvestments);

export const calculateAll = data => {
  var dates = revenues(data).map(f => f.date);
  return dates.map(date => ({
    date,
    currency: data.balanceSheet.first().reporting_currency,
    revenue: revenues(data).find(f => f.date === date).value,
    operatingIncome: operatingIncomes(data).find(f => f.date === date).value,
    longTermInvestment: longTermInvestments(data).find(f => f.date === date).value,
    longTermDebt: longTermDebts(data).find(f => f.date === date).value,
    ppe: ppes(data).find(f => f.date === date).value,
    sharesOutstanding: sharesOutstandings(data).find(f => f.date === date).value,
    netIncomeCompany: netIncomesCompany(data).find(f => f.date === date).value,
    netIncomeExcludingExtras: netIncomesExcludingExtras(data).find(f => f.date === date).value,
    inventory: inventories(data).find(f => f.date === date).value,
    equity: equities(data).find(f => f.date === date).value,
    operatingCashFlow: operatingCashFlows(data).find(f => f.date === date).value,
    freeCashFlow: freeCashFlows(data).find(f => f.date === date).value,
    netIncome: netIncomes(data).find(f => f.date === date).value,
    grossProfit: grossProfits(data).find(f => f.date === date).value,
    operatingExpense: operatingExpenses(data).find(f => f.date === date).value,
    cash: cash(data).find(f => f.date === date).value,
    shortTermInvestments: shortTermInvestments(data).find(f => f.date === date).value,
    longTermInvestments: longTermInvestments(data).find(f => f.date === date).value,
  }));
};